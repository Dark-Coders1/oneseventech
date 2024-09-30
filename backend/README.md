# Product Catalog Backend

This is the backend API for the Product Catalog, built with FastAPI.

## Features

- Serve product data
- Handle Stripe checkout sessions

## Setup

1. Install dependencies:

2. Set up environment variables:
   Create a `.env` file in the root of the backend directory and add:

3. Start the development server:

## API Endpoints

- `GET /api/products`: Fetch all products
- `POST /create-checkout-session`: Create a Stripe checkout session

## Project Structure

- `app/`: Main application package
  - `main.py`: FastAPI application and router definitions
  - `api/`: API route handlers
  - `models/`: Pydantic models for request/response schemas
- `tests/`: Test files
