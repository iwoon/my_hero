import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberComponent } from './member/member.component';
import { AuthGuard } from './services/auth.guard';
import { ShopComponent } from './shop/shop.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';

const routes: Routes = [
  {
    path: 'stock', children: [
      { path: '', component: StockHomeComponent },
      { path: 'form', component: StockFormComponent },
      { path: 'form/:id', component: StockFormComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'member', component: MemberComponent },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'member' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
