import { Observable } from "rxjs";

export interface IProductService {
  getProducts(): Observable<any[]>;
  getProductById(id: number): Observable<any>;
}
