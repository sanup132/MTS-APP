import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Payee } from 'src/app/models/payee';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent {

  payees!: Payee[]; 
  payerId: any;
  amountIsValidCheck = false;
  amountIsValidText = '';

  transactionForm = new FormGroup({
    payeeId: new FormControl(),
    amount: new FormControl(),
    transactionType: new FormControl(),
    remarks: new FormControl()
  });

  constructor(private userService: UserService, private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.getAllPayees();
    this.payerId = this.keycloakService.getUsername();
  }

  async getAllPayees() {
    await this.userService.getAllUserPayees(this.keycloakService.getUsername()).subscribe(res => {
      this.payees = res;
    })
  }

  createTransaction() {
    if (this.transactionForm.value.payeeId != '' && this.transactionForm.value.remarks != '' && this.transactionForm.value.amount != 0) {
      const data = {
        payerId: this.payerId,
        payeeId: this.transactionForm.value.payeeId,
        amount: this.transactionForm.value.amount,
        transactionType: this.transactionForm.value.transactionType,
        remarks: this.transactionForm.value.remarks,
      };
      this.userService.createTransaction(data).subscribe((res: any) => {
        if(res == null) {
          alert("Insufficient Balance to complete the transaction")
        }
        else {
          alert("Transaction success")
        }
      });
    }
    else {
      alert("Insufficient data")
    }
    this.router.navigateByUrl('');
  }

  amountValidation(event: any) {
    if (event != null) {
      if (event > 0) {
        this.amountIsValidCheck = true;
      }
      else {
        this.amountIsValidCheck = false;
        this.amountIsValidText = 'Balance cannot be negative'
      }
    }
  }

}
