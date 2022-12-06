import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Noticia } from './noticias/interface/Noticia';
import { NoticiasService } from './servicios/servicios.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ElFisgon';

  //Creo un arreglo de tipo any
  public noticias: Array<Noticia> = [];
  //atributo para leer el campo
  public param: String = "0";
  public param1: String = "";
  public opc: number = 0;
  //valor booleano para mostrar el loading
  public nocarga: boolean = true;
  //actualizar
  public closeModal: string = "";

  @Output() noticia: Noticia = {
    oid: 0,
    titular: "",
    fecha: "",
    autor: "",
    contenido: ""
  }

  constructor(private notiService: NoticiasService, private modalService: NgbModal) {
    this.nocarga = false;
    this.opc = 0;
    //invoco el servicio
    this.notiService.getNoticias(this.param, this.param1, this.opc).subscribe((resp: any) => {
      this.nocarga = true;
      this.noticias = resp;
      console.log(resp);
    });
  }

  // eliminarSeleccion(): void{
  //   this.noticias = [];
  // }

  buscarNoticiasxAutor(): void {
    this.opc = 1;
    this.modalService.dismissAll();
    this.nocarga = false;    
    this.notiService.getNoticias(this.param, this.param1, this.opc)
      .subscribe(resp => {
        console.log(resp);
        this.noticias = resp;
        this.nocarga = true;
      });
  }

  buscarNoticiaxfecha(): void {
    this.opc = 2;
    this.modalService.dismissAll();
    this.nocarga = false;

    this.notiService.getNoticias(this.param, this.param1, this.opc).subscribe(resp => {
      console.log(resp);
      this.noticias = resp;
      this.nocarga = true;
    });
  }

  @Output() onCrear: EventEmitter<any> = new EventEmitter();

  crearNoticia() {
    console.log(this.noticia);
    this.notiService.crearNoticia(this.noticia).subscribe(resp => {
      this.noticia = {
        oid: 0,
        titular: "",
        fecha: "",
        autor: "",
        contenido: ""
      }
      this.onCrear.emit();
      this.notiService.getNoticias(this.param, this.param1, this.opc).subscribe((resp: any) => {
        this.nocarga = true;
        this.noticias = resp;
        console.log(resp);
      });
    });
  }

  //falta completar editar
  editarNoticia() {
    console.log(this.noticia);
    this.notiService.crearNoticia(this.noticia).subscribe(resp => {
      this.noticia = {
        oid: 0,
        titular: "",
        fecha: "",
        autor: "",
        contenido: ""
      }
      this.onCrear.emit();
      this.notiService.getNoticias(this.param, this.param1, this.opc).subscribe((resp: any) => {
        this.nocarga = true;
        this.noticias = resp;
        console.log(resp);
      });
    });
  }

  ngOnInit(): void {
  }

}
