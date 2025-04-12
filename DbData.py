from sqlite3 import Date
from fastapi import Body, FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional


# FastAPI application instance
app = FastAPI()
# CORS configuration to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


class Item(BaseModel):
    item_name: str = Field(..., alias="Item Name")
    quantity: int = Field(..., alias="Quantity")
    unit_price: float = Field(..., alias="Unit Price")
    total_price: float = Field(..., alias="Total Price")


class Invoice(BaseModel):
    id: str = Field(..., alias="_id")
    invoice_number: str = Field(..., alias="Invoice Number")
    date: Optional[str] = Field(None, alias="Date")
    bill_to: Optional[str] = Field(None, alias="Bill To")
    ship_to: Optional[str] = Field(None, alias="Ship To")
    ship_mode: Optional[str] = Field(None, alias="Ship Mode")
    balance_due: Optional[float] = Field(0.0, alias="Balance Due")
    items: List[Item] = Field(default_factory=list, alias="Items")
    subtotal: Optional[float] = Field(0.0, alias="Subtotal")
    discount: Optional[float] = Field(0.0, alias="Discount")
    shipping: Optional[float] = Field(0.0, alias="Shipping")
    total: Optional[float] = Field(0.0, alias="Total")
    notes: Optional[str] = Field("", alias="Notes")
    order_id: str = Field("", alias="Order ID")

    class Config:
        allow_population_by_field_name = True 

# MongoDB client connection
client = MongoClient("mongodb+srv://shalu25kumar:shalu25kumar@cluster0.cny9w3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Update with your MongoDB URI
db = client['sk']  # Replace with your database name
collection = db['sk25']  # Replace with your collection name

def process_invoice_document(invoice: dict) -> Invoice:

    
    processed = {
        "_id": str(invoice["_id"]),
        "Invoice Number": invoice.get("Invoice Number", "").replace("# ", "").strip(),
        "Date": invoice.get("Date"),
        "Bill To": invoice.get("Bill To"),
        "Ship To": invoice.get("Ship To"),
        "Ship Mode": invoice.get("Ship Mode"),
        "Balance Due": invoice.get("Balance Due"),
        "Items": [{
            "Item Name": item["Item Name"],
            "Quantity": item["Quantity"],
            "Unit Price": item["Unit Price"],
            "Total Price": item["Total Price"]
        } for item in invoice.get("Items", [])],
        "Subtotal": invoice.get("Subtotal"),
        "Discount": invoice.get("Discount"),
        "Shipping": invoice.get("Shipping"),
        "Total": invoice.get("Total"),
        "Notes": invoice.get("Notes"),
        "Order ID": invoice.get("terms", {}).get("order_id") if "terms" in invoice else invoice.get("Order ID")
    }
    print("\nProcessed invoice data")
        
    # Print individual fields for debugging
    print(f"\nDebugging Info:")
    print(f"Invoice Number: {processed['Invoice Number']}")
    
    result = Invoice(**processed)
    print(f"Processed Invoice: {result}")
    print("\n" + "="*50 + "\n")
    
    return result

# Route to get all documents from the collection
@app.get("/invoices", response_model=List[Invoice], response_model_by_alias=False)
async def get_invoices():
    invoices = list(collection.find())
    return [process_invoice_document(invoice) for invoice in invoices]

@app.get("/invoice/{invoice_id}", response_model=Invoice, response_model_by_alias=False)
async def get_invoice(invoice_id: str):
    try:
        invoice = collection.find_one({"_id": ObjectId(invoice_id)})
        if invoice:
            return process_invoice_document(invoice)
        else:
            raise HTTPException(status_code=404, detail="Invoice not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

@app.put("/invoice/{invoice_id}", response_model=Invoice, response_model_by_alias=False)
async def update_invoice(invoice_id: str, updated_invoice: Invoice):
    try:
        # Convert invoice_id to ObjectId
        invoice_object_id = ObjectId(invoice_id)
        
        # Prepare the update data exactly matching MongoDB document structure
        update_data = {
            "_id": ObjectId(updated_invoice.id),
            "Invoice Number": updated_invoice.invoice_number,
            "Date": updated_invoice.date,
            "Bill To": updated_invoice.bill_to,
            "Ship To": updated_invoice.ship_to,
            "Ship Mode": updated_invoice.ship_mode,
            "Balance Due": updated_invoice.balance_due,
            "Items": [{
                "Item Name": item.item_name,
                "Quantity": item.quantity,
                "Unit Price": item.unit_price,
                "Total Price": item.total_price
            } for item in updated_invoice.items],
            "Subtotal": updated_invoice.subtotal,
            "Discount": updated_invoice.discount,
            "Shipping": updated_invoice.shipping,
            "Total": updated_invoice.total,
            "Notes": updated_invoice.notes,
            "Order ID": updated_invoice.order_id
        }
        
        # Update the invoice in the database
        result = collection.update_one(
            {"_id": invoice_object_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            updated_invoice_data = collection.find_one({"_id": invoice_object_id})
            return process_invoice_document(updated_invoice_data)
        else:
            raise HTTPException(status_code=404, detail="Invoice not found or no changes made")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/invoice/{invoice_id}")
async def delete_invoice(invoice_id: str):
    try:
        # Convert invoice_id to ObjectId
        invoice_object_id = ObjectId(invoice_id)
        
        # Delete the invoice from the database
        result = collection.delete_one({"_id": invoice_object_id})
        
        if result.deleted_count == 1:
            return {"message": "Invoice deleted successfully"}, 204
        else:
            raise HTTPException(status_code=404, detail="Invoice not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


