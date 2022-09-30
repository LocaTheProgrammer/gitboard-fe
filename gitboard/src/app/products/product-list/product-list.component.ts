import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../@model/ProductDTO';
import { ProductService } from '../@service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productName!:string

  product !: ProductDTO
  edit = true;
  add = false;
  products!: ProductDTO[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      console.log(this.products)
    });
  }

  addProduct() {
    const data = new ProductDTO(null, this.productName);
    this.productService.createProduct(data).subscribe(response => {
      console.log(response)
      this.getProducts();
    });
  }

  setProductEdit(product: ProductDTO) {
    this.product.name = product.name;
    if(product.id){
      this.product.id = product.id;
    }
    this.edit = false;
    this.add = true;
  }

  resetValues() {
    this.product= new ProductDTO(null, '')
    this.edit = true;
    this.add = false;
  }

  removeProduct(product: ProductDTO) {
    const id = product.id;
    console.log(product)
    this.productService.deleteProduct(id).subscribe(product => console.log(product));
    this.getProducts()
  }

  updateProduct(){
    this.productService.editProduct(this.product).subscribe(response => console.log(response));
    this.getProducts()
    this.resetValues()
  }
}