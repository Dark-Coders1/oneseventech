from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import stripe

router = APIRouter()

stripe.api_key = "sk_test_51Q4k3lGGtr3eA1pyBpVKmaVgitVFD6mUmMGSgdzMovxTZbUuTaibZSEDkc1VjjTuf1nvIyYSFb5mGQuSZu85NxsC00s3gndHHs"


class Item(BaseModel):
    id: int
    title: str
    price: float
    quantity: int
    image: str


class CheckoutItems(BaseModel):
    items: List[Item]


@router.post("/create-checkout-session")
async def create_checkout_session(checkout_items: CheckoutItems):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": int(item.price * 100),
                        "product_data": {
                            "name": item.title,
                            "images": [item.image],
                        },
                    },
                    "quantity": item.quantity,
                }
                for item in checkout_items.items
            ],
            mode="payment",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )
        return {"id": checkout_session.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
