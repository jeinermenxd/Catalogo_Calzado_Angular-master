import { Component, OnInit } from '@angular/core';
import { ConexFavService } from 'src/app/services/conexiones/conex-fav/conex-fav.service'
import { ConexProductosService, Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-info-modals',
  templateUrl: './info-modals.component.html',
  styleUrls: ['./info-modals.component.css']
})
export class InfoModalsComponent implements OnInit {

  /*
  cargar: any = {

    pk_id_producto: 0,
    codigo_producto: '',
    img: '',
    nombre_producto: '',
    descripcion: '',
    fk_marca: '',
    modelo: '',
    genero: '',
    talla: '',
    costo: '',
    oferta: '',
    fk_nombre_categoria: ''
  };
  

*/
  cargar: any = [];


  constructor(private ConexProdcutoService: ConexProductosService, private ConexFavsService: ConexFavService) {

    this.ConexProdcutoService.disparadorDetalle.subscribe(data => {
      this.ConexProdcutoService.getUnProducto(data).subscribe(
        res => {
          console.log(res)
          this.cargar = res;
        },
        err => console.log(this.cargar)
      );
    })
  }

  addToFavorites(producid: number) {
    // Obtener el email del token
    let email: string | null = null;

    // Lógica para obtener el email del token
    email = this.ConexFavsService.getEmailFromToken();
    if (email !== null) {
      // Usar el email para hacer la llamada al servicio
      // Llamar a la función del servicio que inserta en la tabla favoritos
      this.ConexFavsService.addFavorito(producid, email).subscribe(
        res => {
          console.log(res);
          swal.fire({
            title: 'Agregado!',
            text: 'Producto agregado a la lista de favoritos',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        err => {
          console.log(err);
          swal.fire({
            title: 'Error!',
            text: 'No se puede agregar un producto que ya este en la lista de favoritos.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo obtener el email del token'
      });
      console.log("No se pudo obtener el email del token");
    }
  }

  ngOnInit(): void {
  }
}
