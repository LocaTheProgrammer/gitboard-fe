import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endpoint:string=environment.apiURL+"/todolist/rest/category/";


  constructor(private HttpClient: HttpClient) { }


  getCategories(){
    return this.HttpClient.get<any>(`${this.endpoint}getCategories`)
  }
  
}
