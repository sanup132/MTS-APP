import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User = {
    accountNumber: '',
    bank: '',
    balance: 0,
  };
  submitted = false;
  accountNumberIsValidCheck = false;
  accountNumberIsValidText = '';
  balanceIsValidCheck = false;
  balanceIsValidText = '';
  firstName!: String;
  lastName!: String;

  balanceForm = new FormGroup({
    balance: new FormControl()
  });

  constructor(private service: UserService, private router: Router, private keycloakService: KeycloakService) { }

  async ngOnInit() {
    let userDetails = await this.keycloakService.loadUserProfile();
    this.firstName = userDetails.firstName!;
    this.lastName = userDetails.lastName!;
  }

  registerUserProfile(): void {
    if (this.user.accountNumber != '' && this.user.bank != '') {
      const data = {
        fname: this.firstName,
        lname: this.lastName,
        userId: this.keycloakService.getUsername(),
        accountNumber: this.user.accountNumber,
        bank: this.user.bank,
        balance: this.user.balance,
      };

      this.service.updateProfile(data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            alert("Bank Details updated successfully")
            this.router.navigateByUrl("/")
          },
          error: (e) => console.error(e)
        });
    }
    else {
      alert("Insufficient or incomplete data")
    }
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      accountNumber: '',
      bank: '',
      balance: 0
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

  balanceValidation(event: any) {
    if (event != null) {
      if (event > 0) {
        this.balanceIsValidCheck = true;
      }
      else {
        this.balanceIsValidCheck = false;
        this.balanceIsValidText = 'Balance always be in Non-negative Numeric'
      }
    }
  }

  addBalance() {
    if (this.balanceForm.value.balance != null) {
      const data = {
        userId: this.keycloakService.getUsername(),
        balance: this.balanceForm.value.balance,
      };
      this.service.addBalance(data).subscribe((res: any) => {}, error => {
        alert(error.error.text)
      });
      this.router.navigateByUrl("")
    }
    else {
      alert("Please Enter Balance")
    }
  }

}
