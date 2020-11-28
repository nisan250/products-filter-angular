import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-product-sort-button',
  templateUrl: './product-sort-button.component.html',
  styleUrls: ['./product-sort-button.component.scss']
})
export class ProductSortButtonComponent {
  @Input() field: string;
  @Input() orderType: string;
  @Input() sortField: string;
  @Input() sortFieldType: string;
  @Output() sort = new EventEmitter();
}
