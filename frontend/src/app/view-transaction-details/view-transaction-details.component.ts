import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-transaction-details',
  templateUrl: './view-transaction-details.component.html',
  styleUrls: ['./view-transaction-details.component.css']
})
export class ViewTransactionDetailsComponent {

  transactionId: any;
  payeeId: any;
  payerInfo: any;
  payeeInfo: any;
  currentUser: any;
  transactionInfo: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.currentUser = this.keycloakService.getUsername();
    this.transactionId = this.route.snapshot.params['transactionId'];
    this.payeeId = this.route.snapshot.params['payeeId'];

    this.getPayeeData();
    this.getPayerData();
    this.getTransactionData();
  }


  getPayerData() {
    this.userService.getUserById(this.keycloakService.getUsername()).subscribe(res => {
      this.payerInfo = res;
    })
  }

  getPayeeData() {
    this.userService.getPayeeById(this.payeeId).subscribe(res => {
      this.payeeInfo = res;
    })
  }

  getTransactionData() {
    this.userService.getTransactionById(this.transactionId).subscribe(res => {
      this.transactionInfo = res;
    })
  }

}
