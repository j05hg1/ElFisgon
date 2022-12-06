import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticia } from '../noticias/interface/Noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) {

  }

  getNoticias(param: String, param1: String, opc: number) {
    //defino la url donde esta el servicio    
    let url = 'http://localhost/ElFisgonService/NoticiaService.php?param=' + param + '&param1=' + param1 + '&opc=' + opc;
    // let url = 'http://localhost/ElFisgonService/NoticiaService.php?param=' + param + '&param1=' + param1 + '&opc=' + opc;
    let header = new HttpHeaders();
    header.append('Content-Type', 'aplication/json')
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Noticia[]>(url, { headers: header });
  }

  crearNoticia(noticia: Noticia) {
    //defino la url donde esta el servicio
    let url = 'http://localhost/ElFisgonService/NoticiaService.php';
    let header = new HttpHeaders();
    header.append('Content-Type', 'aplication/json')
    header.append('Access-Control-Allow-Methods', '"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.post(url, JSON.stringify(noticia), { headers: header });
  }
//falta completar el servicio editar
  editarNoticia(noticia:Noticia){
    //defino la url donde esta el servicio
    let url = 'http://localhost/ElFisgonService/NoticiaService.php';
       let header=new HttpHeaders();
       header.append('Content-Type','aplication/json')
       header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
       header.append('Access-Control-Allow-Origin','http://localhost');
       return this.http.put(url,JSON.stringify(noticia),{headers:header});
 }


}
