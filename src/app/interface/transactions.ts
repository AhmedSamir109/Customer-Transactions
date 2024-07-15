export interface Welcome {
    transactions: Transaction[];
}

export interface Transaction {
    id:          number;
    customer_id: number;
    date:        Date;
    amount:      number;
}
export interface CustomerTransaction {
    id:          number;
    customer_id: number;
    date:        Date;
    amount:      number;
    name:      string;
}

export interface TransactionDateAmount {
    date:        Date;
    amount:      number;
    
}

