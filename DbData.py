from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict

# FastAPI application instance
app = FastAPI()

# MongoDB client connection
client = MongoClient("mongodb+srv://shalu25kumar:shalu25kumar@cluster0.cny9w3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Update with your MongoDB URI
db = client['sk']  # Replace with your database name
collection = db['sk25']  # Replace with your collection name

# Function to convert MongoDB _id to string
def convert_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, dict):
        return {k: convert_id(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [convert_id(i) for i in obj]
    return obj

# Route to get all documents from the collection
@app.get("/invoices", response_model=List[Dict])
async def get_invoices():
    # Fetch all documents from MongoDB collection
    invoices = list(collection.find())
    invoices = convert_id(invoices)  # Convert ObjectId to string
    return invoices

# Route to get a single document by its ID
@app.get("/invoice/{invoice_id}", response_model=Dict)
async def get_invoice(invoice_id: str):
    # Convert string to ObjectId for query
    try:
        invoice = collection.find_one({"_id": ObjectId(invoice_id)})
        if invoice:
            invoice = convert_id(invoice)  # Convert ObjectId to string
            return invoice
        else:
            raise HTTPException(status_code=404, detail="Invoice not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")
