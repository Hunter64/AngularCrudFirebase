import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[];
  constructor(
    private productService: ProductService
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
    this.productService.deleteProduct($key);
  }

}