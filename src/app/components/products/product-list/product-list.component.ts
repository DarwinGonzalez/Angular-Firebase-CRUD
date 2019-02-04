import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/product';
import { element } from '@angular/core/src/render3';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  productList: Product[];
  constructor(
    private serviceProduct: ProductService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.serviceProduct.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.serviceProduct.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.serviceProduct.deleteProduct($key);
      this.toastr.success('Successfull Operation', 'Product Deleted');
    }
  }

}
