import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../@model/product.model';
import { ProductDTO } from '../@model/ProductDTO';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products/';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.productsUrl)
    // .pipe(
    //   retry(2),
    //   catchError((error: HttpErrorResponse) => {
    //     console.error(error);
    //     return throwError(error);
    //   })
    // );
  }

  createProduct(product: ProductDTO): Observable<Product> {
    // product.id = null;
    return this.http.post<Product>(this.productsUrl, product)
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     console.error(error);
    //     return throwError(error);
    //   })
    // )
  }

  editProduct(product: ProductDTO): Observable<any> {
    return this.http.put(this.productsUrl + product.id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.productsUrl + id);
  }
}