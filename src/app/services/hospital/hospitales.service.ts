import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class HospitalesService {

  public url = URL_SERVICES;

  constructor(
    public _http: HttpClient,
    public _router: Router
  ) { }

  cargar(extension: string, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
     return this._http.get(`${this.url}/${extension}`, options);
  }

  obtener(id: string, extension: string, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
    return this._http.get(`${this.url}/${extension}/${id}`, options );
  }

  borrar(id: string, extension: string, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
    return this._http.delete(`${this.url}/${extension}/${id}`, options );
  }

  crear(nombre: string, extension: string, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
    return this._http.post(`${this.url}/${extension}`,  nombre , options );
  }

  buscar(termino: string, extension: string) {
    return this._http.get(`${this.url}/${extension}/${termino}`)
                .map( (resp: any) => {
                  return resp;
                });
  }

  actualizar( id: string, nombre: string, extension: string, token: string) {
    console.log(nombre)
    let headers = new HttpHeaders({ 'Authorization': token });
    let options = ({ headers: headers });
    return this._http.put(`${this.url}/${extension}/${id}`, {nombre}, options);
  }

  searchUser(term: string) {
    
  }

}
