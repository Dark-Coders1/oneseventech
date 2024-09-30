import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.api.stripe import CheckoutItems, Item

client = TestClient(app)


def test_create_checkout_session():
    # Prepare test data
    test_items = [
        Item(
            id=1,
            title="Test Product",
            price=10.99,
            quantity=2,
            image="http://example.com/image.jpg",
        )
    ]
    checkout_items = CheckoutItems(items=test_items)

    # Make a POST request to the endpoint
    response = client.post("/create-checkout-session", json=checkout_items.dict())

    # Assert the response
    assert response.status_code == 200
    assert "id" in response.json()
    assert isinstance(response.json()["id"], str)


def test_create_checkout_session_invalid_data():
    # Prepare invalid test data
    invalid_items = [
        {
            "id": 1,
            "title": "Invalid Product",
            "price": "not a number",
            "quantity": 1,
            "image": "http://example.com/image.jpg",
        }
    ]

    # Make a POST request with invalid data
    response = client.post("/create-checkout-session", json={"items": invalid_items})

    # Assert the response
    assert response.status_code == 422  # Unprocessable Entity
