import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public selectedProduct: Product;

  private subscription = new Subscription();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    const emptyProduct = {
      id: null,
      name: null,
      description: null,
      price: null,
      date: null
    };

    this.subscription.add(this.productService.getSelectedProduct().subscribe((product) => {
      this.selectedProduct = product ? {...product} : {...emptyProduct};
    }));
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.selectedProduct.id) {
        this.productService.addProduct(this.selectedProduct);
      } else {
        this.productService.updateProduct({...this.selectedProduct});
      }
      form.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
