import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Payee } from 'src/app/models/payee';
import { Transaction } from 'src/app/models/transaction';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.css']
})
export class TransactionRecordsComponent implements OnInit {

  payeesInfos!: Payee[];
  allTransactions!: Transaction[];
  data: any;
  fileName = 'BankStatement.xlsx';

  showAllTransactionsFlag: Boolean = true;
  showLast10TransactionsFlag: Boolean = false;
  showCurrentMonthTransactionsFlag: Boolean = false;
  showLast3MonthsTransactionsFlag: Boolean = false;

  last10Transactions!: Transaction[];
  currentMonthTransactions!: Transaction[];
  last3MonthsTransactions!: Transaction[];

  constructor(private userService: UserService, private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.getAllUserTransactions(this.keycloakService.getUsername());
  }

  async getAllUserTransactions(payerId: string) {
    await this.userService.getAllUserTransactions(payerId).subscribe(async (response: any) => {
      this.allTransactions = response
    })
  }

  downloadFile(data: any, filename = 'data') {
    let csvData = this.ConvertToCSV(data, ['id', 'date', 'amount', 'transactionType', 'payerId', 'payeeId', 'remarks']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  
  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  downloadLast10Transactions() {
    this.downloadFile(this.last10Transactions);
  }

  downloadCurrentMonthTransactions() {
    this.downloadFile(this.currentMonthTransactions);
  }

  downloadLast3MonthsTransactions() {
    this.downloadFile(this.last3MonthsTransactions);
  }

  downloadAllTransactions() {
    this.downloadFile(this.allTransactions);
  }

  showLast10Transactions() {
    this.showLast10TransactionsFlag = true;
    this.showCurrentMonthTransactionsFlag = false;
    this.showLast3MonthsTransactionsFlag = false;
    this.showAllTransactionsFlag = false;
    this.userService.getLast10Transactions(this.keycloakService.getUsername()).subscribe(res => {
      this.last10Transactions = res;
    })
  }

  showCurrentMonthTransactions() {
    this.showLast10TransactionsFlag = false;
    this.showCurrentMonthTransactionsFlag = true;
    this.showLast3MonthsTransactionsFlag = false;
    this.showAllTransactionsFlag = false;
    this.userService.getCurrentMonthTransactions(this.keycloakService.getUsername()).subscribe(res => {
      this.currentMonthTransactions = res;
    })
  }

  showLast3MonthsTransactions() {
    this.showLast10TransactionsFlag = false;
    this.showCurrentMonthTransactionsFlag = false;
    this.showLast3MonthsTransactionsFlag = true;
    this.showAllTransactionsFlag = false;
    this.userService.getLast3MonthsTransactions(this.keycloakService.getUsername()).subscribe(res => {
      this.last3MonthsTransactions = res;
    })
  }

  showAllTransactions() {
    this.showLast10TransactionsFlag = false;
    this.showCurrentMonthTransactionsFlag = false;
    this.showLast3MonthsTransactionsFlag = false;
    this.showAllTransactionsFlag = true;
  }

}

