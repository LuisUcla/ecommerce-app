import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);

  private readonly _checkoutService = inject(CheckoutService)

  onProceedToPay(): void {
    this._checkoutService.onProceedToPay()
  }

  removeItem(id: number): void {
    this.cartStore.removeToCart(id)
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
