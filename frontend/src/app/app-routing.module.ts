import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPayeeComponent } from './components/add-payee/add-payee.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionRecordsComponent } from './components/transaction-records/transaction-records.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewTransactionDetailsComponent } from './view-transaction-details/view-transaction-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent,},
  { path: 'view-profile', component:ViewProfileComponent, pathMatch: 'full' },
  { path: 'update-profile', component:ProfileComponent, pathMatch: 'full' },
  { path: 'transaction-records', component:TransactionRecordsComponent, pathMatch: 'full' },
  { path: 'create-transaction', component:CreateTransactionComponent, pathMatch: 'full' },
  { path: 'view-transaction-details/:transactionId/:payeeId', component:ViewTransactionDetailsComponent, pathMatch: 'full' },
  { path: 'add-payee', component:AddPayeeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }