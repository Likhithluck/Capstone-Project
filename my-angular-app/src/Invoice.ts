export interface Item {
    item_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }
  
  export interface Invoice {
    id: string;
    invoice_number: string;
    date: string;
    bill_to: string;
    ship_to?: string;
    ship_mode: string;
    balance_due: number;
    items: Item[];
    subtotal: number;
    discount?: number;
    shipping: number;
    total: number;
    notes: string;
    order_id: string;
    isEditable: boolean; // New property to track editability
  }

  /*
  export interface InvoiceBody {
    "_id": string;
    "Invoice Number": string;
    Date: string;
    "Bill To":  string;
    "Ship To": string;
    Items: Item[];
    "Ship Mode": string;
    "Balance Due":number;
    Subtotal:  number;
    Discount: number;
    Shipping: number;
    Total: number;
    Notes: string;
    "Order ID": string;
  }*/

  export interface ItemBody {
    "Item Name": string;  // Match the JSON key exactly
    "Quantity": number;    // Match the JSON key exactly
    "Unit Price": number;  // Match the JSON key exactly
    "Total Price": number;  // Match the JSON key exactly
}

export interface InvoiceBody {
    "_id": string;                // Match the JSON key exactly
    "Invoice Number": string;     // Match the JSON key exactly
    "Date": string;               // Match the JSON key exactly
    "Bill To": string;            // Match the JSON key exactly
    "Ship To": string;            // Match the JSON key exactly
    "Items": ItemBody[];              // Use the Item interface
    "Ship Mode": string;          // Match the JSON key exactly
    "Balance Due": number;        // Match the JSON key exactly
    "Subtotal": number;           // Match the JSON key exactly
    "Discount": number;           // Match the JSON key exactly
    "Shipping": number;           // Match the JSON key exactly
    "Total": number;              // Match the JSON key exactly
    "Notes": string;              // Match the JSON key exactly
    "Order ID": string;           // Match the JSON key exactly
}