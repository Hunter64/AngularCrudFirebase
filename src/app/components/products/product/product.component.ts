import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private _messagesEvents: MessagesService,
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm){
    console.log(productForm.value)
    if(productForm.value.$key == null){
      this.productService.insertProduct(productForm.value)
      this._messagesEvents.mensaje_generico('creado', 'error', 'Aviso', 'Producto Creado.');
    }
    
    else{
      this.productService.updateProduct(productForm.value)
    }
    
    this.resetForm(productForm)
  }

  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct_temporally = new Product();
    }
  }

}
