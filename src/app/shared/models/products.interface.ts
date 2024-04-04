interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: Rating;
    qty: number; // para la cantidad de productos en el cart
    subTotal: number;
}