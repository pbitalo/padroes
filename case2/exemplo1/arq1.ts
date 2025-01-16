import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  calculateFinalPrice(basePrice: number, discountType: string): number {
    if (discountType === "percentage") {
      return basePrice * 0.9;
    } else if (discountType === "fixed") {
      return basePrice - 20;
    } else if (discountType === "none") {
      return basePrice;
    } else {
      throw new Error("Tipo de desconto não suportado");
    }
  }
}
