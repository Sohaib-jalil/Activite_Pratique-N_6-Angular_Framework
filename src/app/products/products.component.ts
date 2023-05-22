import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products : Array<Product> = [];
  public keyword : string = "";
  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(1, 3)
      .subscribe({
      next : data => {
        this.products = data
      },
      error : err => {
        console.log(err);
      }
    })
    //this.products = this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProducts(product).subscribe({
      next : updatedProduct => {
        product.checked=!product.checked;
        /*this.products.map(p => {
          if (p.id == product.id){
            return updatedProduct;
          } else {
            return p;
          }
        })*/
        // this.getProducts();
      }
    })

  }

  handleDelete(product: Product) {
    if (confirm("Are You Sure?"))
    this.productService.deleteProducts(product).subscribe({
      next : value => {
        //this.getProducts();
        this.products = this.products.filter(p => p.id != product.id)
      }
    });
  }

  searchProducts() {
this.productService.searchProducts(this.keyword).subscribe({
  next : data => {
        this.products = data;
  }
})
  }
}
