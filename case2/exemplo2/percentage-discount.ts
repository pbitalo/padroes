import { DiscountStrategy } from "./discount-strategy";

export class PercentageDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.9;
  }
}
