import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductFilter } from '../model/productFilter';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProduct$ = new BehaviorSubject<Product | null>(null);

  private products$ = new BehaviorSubject<Product[]>([]);
  private productFilter$ = new BehaviorSubject<ProductFilter>({
    globalTextFilter: '',
    globalFieldFilter: null,
    orderType: null,
    sortField: null,
    sortFieldType: null,
  });

  constructor() {}

  public getProducts(): Observable<Product[]> {
    return this.products$.pipe(
      mergeMap((products) => {
        return this.productFilter$.pipe(
          map((filter) => {
            return products
              .filter((product) => {
                if (filter.globalTextFilter) {
                  const val = filter.globalTextFilter
                    .trim()
                    .toLocaleLowerCase();
                  const inDescription =
                    product.description.toLocaleLowerCase().indexOf(val) > -1;
                  const inName =
                    product.name.toLocaleLowerCase().indexOf(val) > -1;
                  return inName || inDescription;
                }
                return true;
              })
              .sort((a, b) => {
                if (filter.sortField) {
                  const aVal = a[filter.sortField];
                  const bVal = b[filter.sortField];
                  if (filter.sortFieldType === 'date') {
                    return this.compareDate(aVal, bVal, filter.orderType);
                  } else {
                    return this.compareDefault(aVal, bVal, filter.orderType);
                  }
                }
                return 0;
              });
          })
        );
      })
    );
  }

  public setProducts(products: Product[]): void {
    this.products$.next(products);
  }

  public deleteProduct(product: Product): void {
    const products: Product[] = this.products$.getValue();
    this.products$.next(products.filter((p) => p.id !== product.id));
  }

  public updateProduct(product: Product): void {
    const products: Product[] = this.products$.getValue();
    this.products$.next(
      products.map((p) => (p.id === product.id ? product : p))
    );
  }

  public addProduct(product: Product): void {
    const products: Product[] = this.products$.getValue();
    this.products$.next([
      ...products,
      {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
      },
    ]);
  }

  public getSelectedProduct(): Observable<Product> {
    return this.selectedProduct$;
  }

  public setSelectedProduct(product: Product | null): void {
    this.selectedProduct$.next(product);
  }

  public getProductFilter(): Observable<ProductFilter> {
    return this.productFilter$;
  }

  public setProductFilter(filter: ProductFilter): void {
    this.productFilter$.next(filter);
  }

  private compareDate(
    d1: Date | string,
    d2: Date | string,
    orderType: 'asc' | 'desc'
  ): number {
    if (orderType === 'asc') {
      return new Date(d1).getTime() - new Date(d2).getTime();
    } else {
      return new Date(d2).getTime() - new Date(d1).getTime();
    }
  }

  private compareDefault(a, b, orderType: 'asc' | 'desc'): number {
    return orderType === 'asc' ? a - b : b - a;
  }
}
