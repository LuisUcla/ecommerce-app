import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { environment } from "@envs/environment.development";
import { Product } from "@shared/models/products.interface";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsService {
    public products = signal<Product[]>([])
    private readonly _http = inject(HttpClient)
    private readonly endpoint = environment.apiUrl

    constructor() {
        this.getproducts();
    }


    // getProducts
    public getproducts(): void {
        this._http.get<Product[]>(`${this.endpoint}/products/?sort=desc`)
        .pipe(tap((data: Product[]) => this.products.set(data)))
        .subscribe()
    }

    //getProductById
    public getProductById(id: number) {
        return this._http.get<Product>(`${this.endpoint}/products/${id}`);
    }
}