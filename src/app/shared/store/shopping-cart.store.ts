import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/products.interface";

export interface CartStore {
    products: Product[];
    totalAmount: number;
    productsCount: number
}

const initialState: CartStore = {
    products: [],
    totalAmount: 0,
    productsCount: 0
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({products}) => ({
        productsCount: computed(() => calculatedProductCount(products())),
        totalAmount: computed(() => calculatedTotalAmount(products()))
    })),

    withMethods(({products, ...store}) => ({
        addToCart(product: Product) {
            const isProductCart = products().find(productItem => productItem.id == product.id);
            if (isProductCart) {
                isProductCart.qty++;
                isProductCart.subTotal = isProductCart.qty * isProductCart.price;
                patchState(store, { products: [...products()] })
            } else {
                patchState(store, { products: [...products(), product] })
            }
        },

        removeToCart(id: number) {
            const updateProducts = products().filter(product => product.id !== id);
            patchState(store, { products: updateProducts });
        },

        clearCart() {
            patchState(store, initialState)
        }
    }))

)

function calculatedTotalAmount(product: Product[]): number {
    return product.reduce((acc, product) => acc + product.price * product.qty, 0)
}

function calculatedProductCount(product: Product[]): number {
    return product.reduce((acc, product) => acc + product.qty, 0)
}