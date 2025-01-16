import { Injectable } from "@angular/core";

import { DiscountStrategy } from "./discount-strategy";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private discountStrategy: DiscountStrategy) {}

  calculateFinalPrice(basePrice: number): number {
    return this.discountStrategy.calculate(basePrice);
  }
}
