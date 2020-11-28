import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductFilter} from '../../model/productFilter';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  public filter: ProductFilter;
  private subscription = new Subscription();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.productService.getProductFilter().subscribe((filter) => {
      this.filter = filter;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFilterTextChange($event: string): void {
    this.productService.setProductFilter({...this.filter, globalTextFilter: $event});
  }

  onSortButtonClick(field: string): void {
    const orderType = this.filter && this.filter.orderType === 'asc' ? 'desc' : 'asc';
    const sortFieldType = field === 'date' ? 'date' : 'default';
    this.productService.setProductFilter({...this.filter, sortField: field, orderType, sortFieldType});
  }
}

