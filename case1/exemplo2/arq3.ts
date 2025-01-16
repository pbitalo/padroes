import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { IProductService } from "./arq1";

@Injectable({
  providedIn: "root",
})
export class MockProductService implements IProductService {
  private products = [
    { id: 1, name: "Mock Product A", price: 100 },
    { id: 2, name: "Mock Product B", price: 150 },
  ];

  getProducts(): Observable<any[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<any> {
    return of(this.products.find((product) => product.id === id));
  }
}
