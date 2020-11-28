import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductContainerComponent} from './components/product-container/product-container.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductFilterComponent} from './components/product-filter/product-filter.component';
import {ProductSortButtonComponent} from './components/product-sort-button/product-sort-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductContainerComponent,
    ProductFilterComponent,
    ProductSortButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
