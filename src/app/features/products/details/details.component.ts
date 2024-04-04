import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/products.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit {
  productId = input<number>(0, { alias: 'id' })
  product!: Signal<Product | undefined>
  private readonly productService = inject(ProductsService);

  ngOnInit(): void {
    this.product = this.productService.getProductById(this.productId())
  }
  onAddToCart() {}
}
