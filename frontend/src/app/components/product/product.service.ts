import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  ShowMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
      
    })
  }
  create(Product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, Product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  errorHandler(e: any): Observable<any> {
    this.ShowMessage('erro na página', true)
    return EMPTY
  }
   

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }
  readById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Product>(url)
  }
  update(product:Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }
  delete(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Product>(url)
  }
}
