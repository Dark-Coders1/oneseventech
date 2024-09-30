from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)


def test_get_products():
    response = client.get("/api/products")
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)
    assert len(products) > 0
    assert all(isinstance(product, dict) for product in products)
    assert all("id" in product for product in products)
    assert all("title" in product for product in products)
    assert all("price" in product for product in products)
