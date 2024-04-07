import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { environment } from "@envs/environment";
import { Product } from "@shared/models/products.interface";
import { map, tap } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({ providedIn: 'root' })
export class ProductsService {
    public products = signal<Product[]>([])
    private readonly _http = inject(HttpClient)
    private readonly endpoint = environment.apiUrl;
    private readonly _injector = inject(EnvironmentInjector);

    constructor() {
        this.getproducts();
    }


    // getProducts
    public getproducts(): void {
        this._http.get<Product[]>(`${this.endpoint}/products/?sort=desc`)
        .pipe(
            map((products: Product[]) => products.map((product: Product) => ({...product, qty: 1}))),
            tap((products: Product[]) => this.products.set(products)))
        .subscribe()
    }

    //getProductById
    public getProductById(id: number) {
        return runInInjectionContext(this._injector, () =>
            toSignal<Product>(this._http.get<Product>(`${this.endpoint}/products/${id}`))
        )
    }
}