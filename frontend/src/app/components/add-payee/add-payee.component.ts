import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Payee } from 'src/app/models/payee';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-payee',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.css']
})
export class AddPayeeComponent {
  payee: Payee = {
    name: '',
    accountNumber: ''
  };
  submitted = false;
  accountNumberIsValidCheck = false;
  accountNumberIsValidText = '';

  constructor(private service: UserService, private router: Router, private keycloakService: KeycloakService) { }

  addPayee(): void {
    if (this.payee.name != '' && this.payee.accountNumber != '') {
      const data = {
        name: this.payee.name,
        accountNumber: this.payee.accountNumber,
        payerId: this.keycloakService.getUsername(),
      };
      this.service.addPayee(data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            this.router.navigateByUrl("");
          },
          error: (e) => console.error(e)
        });
    }
    else {
      alert("Invalid or incomplete data")
    }
  }

  newPayee(): void {
    this.submitted = false;
    this.payee = {
      name: '',
      accountNumber: ''
    };
  }

  accountNumberValidation(event: any) {
    if (event != null) {
      var len = event.toString().length;
      if (len == 12) {
        this.accountNumberIsValidCheck = true;
      }
      else {
        this.accountNumberIsValidCheck = false;
        this.accountNumberIsValidText = "Account Number should contain 12 digits"
      }
    }
  }


}
