import { DiscountStrategy } from "./discount-strategy";

export class NoDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price;
  }
}
