import { DiscountStrategy } from "./discount-strategy";

export class FixedDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price - 20;
  }
}
