import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import { Home1Component } from './home/home1/home1.component';

// Products
import { DashboardProdut } from './deal/dashboard/dashboard.component';
import { DetailDealComponent } from './deal/detail-product/detail-product.component';
import { Product3Component } from './deal/product3/product3.component';
import { ReceiptComponent } from './deal/receipt/receipt.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { SaveCardConfirmationComponent } from './save-card-confirmation/save-card-confirmation.component';

// ELements
import { DashboardELementComponent } from './element/dashboard-element/dashboard-element.component';
import { DealElement } from './element/product/deal.component';
import { FormControlComponent } from './element/form-control/form-control.component';
import { LayoutComponent } from './element/layout/layout.component';
import { ButtonComponent } from './element/button/button.component';
import { GridComponent } from './element/grid/grid.component';
import { TyphographyComponent } from './element/typhography/typhography.component';
import { HelperComponent } from './element/helper/helper.component';
import { CallbackComponent } from './callback/callback.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: Home1Component },
    { path: 'callback',  component: CallbackComponent },
    { path: 'product3', component: Product3Component },
    { path: 'p/:detail', component: DetailDealComponent },
    { path: 'element',  component: DashboardELementComponent, 
      children : [
        { path: '', redirectTo: '/element/product', pathMatch: 'full'  },
        { path: 'product', component: DealElement },
        { path: 'form', component: FormControlComponent },
        { path: 'layout', component: LayoutComponent },
        { path: 'button', component: ButtonComponent },
        { path: 'grid', component: GridComponent },
        { path: 'typography', component: TyphographyComponent },
        { path: 'helper', component: HelperComponent },
      ]  
    },
    { path: 'contact',  component: ContactComponent },
    { path: 'save-card-confirmation',  component: SaveCardConfirmationComponent },
    { path: '404',  component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}