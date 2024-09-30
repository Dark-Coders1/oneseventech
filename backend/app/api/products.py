from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter()


@router.get("/products")
async def get_products():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://fakestoreapi.com/products")
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code, detail="Failed to fetch products"
            )
