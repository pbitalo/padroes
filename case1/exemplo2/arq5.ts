import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { ProductComponent } from "./arq4";
import { ProductService } from "./arq2";

@NgModule({
  declarations: [ProductComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{ provide: "IProductService", useClass: ProductService }],
})
export class AppModule {}
