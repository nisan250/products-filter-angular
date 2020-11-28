import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductSortButtonComponent} from './product-sort-button.component';

describe('ProductSortButtonComponent', () => {
  let component: ProductSortButtonComponent;
  let fixture: ComponentFixture<ProductSortButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSortButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
