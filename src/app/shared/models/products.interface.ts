interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: string;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    rating: Rating;
    qty: number;
    subtotal: number;
}