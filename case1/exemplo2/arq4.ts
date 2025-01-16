import { Component, OnInit, Inject } from "@angular/core";

import { IProductService } from "./arq1";

@Component({
  selector: "app-product",
  template: `
    <div *ngFor="let product of products">
      {{ product.name }} - {{ product.price }}
    </div>
  `,
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    @Inject("IProductService") private productService: IProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
