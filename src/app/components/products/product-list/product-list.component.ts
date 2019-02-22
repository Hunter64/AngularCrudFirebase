import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[];
  public key: string;
  constructor(
    private productService: ProductService,
    private _messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productsList = [];
      item.forEach(element =>{
        var x = element.payload.toJSON();
        x['$key'] = element.key;
        this.productsList.push(x as Product)
      })
    })
  }

  onEdit(product: Product){
    //this.productService.selectedProduct_temporally = product;
    this.productService.selectedProduct_temporally = Object.assign({}, product);
  }

  onDelete($key: string){
    this.key = $key;
    this._messagesService.confirmacion_eliminacion('Registro')
    //this.productService.deleteProduct($key);
    //this._messagesService.mensaje_generico('msj-ng-in-product-list', 'success', 'Aviso', 'Producto Eliminado.')
  }

  confirmacion(){
    this.productService.deleteProduct(this.key);
    this._messagesService.clear('msj-ng-in-product-list-confirmation')
    this._messagesService.mensaje_generico('msj-ng-in-product-list', 'success', 'Aviso', 'Producto Eliminado.')
  }

  negacion() {
    this._messagesService.clear('msj-ng-in-product-list-confirmation')
  }

}
