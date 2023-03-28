import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransactionRecordsComponent } from './components/transaction-records/transaction-records.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { AddPayeeComponent } from './components/add-payee/add-payee.component';
import { HomeComponent } from './components/home/home.component';
import { initializeKeycloak } from './utility/app.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ProfileComponent } from './profile/profile.component';
import { ViewTransactionDetailsComponent } from './view-transaction-details/view-transaction-details.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TransactionRecordsComponent,
    CreateTransactionComponent,
    AddPayeeComponent,
    HomeComponent,
    ProfileComponent,
    ViewTransactionDetailsComponent,
    ViewProfileComponent,
   
   
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
