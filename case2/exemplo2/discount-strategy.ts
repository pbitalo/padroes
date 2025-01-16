export interface DiscountStrategy {
  calculate(price: number): number;
}
