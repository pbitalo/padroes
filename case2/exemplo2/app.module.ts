import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { OrderService } from "./order.service";
import { PercentageDiscount } from "./percentage-discount";
import { DiscountStrategy } from "./discount-strategy";
import { FixedDiscount } from "./fixed-discount";
import { NoDiscount } from "./no-discount";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: "DiscountStrategy", useClass: PercentageDiscount },
    {
      provide: OrderService,
      useFactory: (discountStrategy: DiscountStrategy) =>
        new OrderService(discountStrategy),
      deps: ["DiscountStrategy"],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
