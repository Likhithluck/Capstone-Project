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
  }
  