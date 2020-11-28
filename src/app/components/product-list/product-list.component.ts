import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { ProductFilter } from '../../model/productFilter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[];
  public filter: ProductFilter = null;
  public selectedProductId = null;

  private subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.http
        .get<Product[]>(
          'https://nisan250.github.io/products-filter-angular/assets/data.json'
        )
        .subscribe((products) => {
          this.productService.setProducts(products);
        })
    );

    this.subscription.add(
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
      })
    );

    this.subscription.add(
      this.productService.getProductFilter().subscribe((filter) => {
        this.filter = filter;
      })
    );
  }

  onProductSelect(product: Product): void {
    this.selectedProductId = product && product.id;
    this.productService.setSelectedProduct(product);
  }

  onDeleteProductClick(product: Product): void {
    this.productService.deleteProduct(product);
  }

  onNewProductClick(): void {
    this.productService.setSelectedProduct(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
