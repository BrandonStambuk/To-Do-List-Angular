import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  serviceUrl: string;
  constructor(private http: HttpClient ) { 
      this.serviceUrl= "http://localhost:3000/tasks"
  }
}
