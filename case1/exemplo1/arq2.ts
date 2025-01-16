import { Component, OnInit } from "@angular/core";
import { ProductService } from "./arq1";

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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
