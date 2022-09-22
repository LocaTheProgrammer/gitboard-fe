import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endpoint:string="http://localhost:8090/todolist/rest/category/";


  constructor(private HttpClient: HttpClient) { }


  getCategories(){
    return this.HttpClient.get<any>(`${this.endpoint}getCategories`)
  }
  
}
