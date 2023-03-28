import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  userId!: String;
  firstName!: String;
  lastName!: String;
  email!: String;
  userInfo!: User;

  constructor(private userService: UserService, private router: Router, private keycloakService: KeycloakService) { }

  async ngOnInit() {
    let userDetails = await this.keycloakService.loadUserProfile();
    this.userId = this.keycloakService.getUsername();
    this.firstName = userDetails.firstName!;
    this.lastName = userDetails.lastName!;
    this.email = userDetails.email!;

    this.getUserInfo();    
  }

  async getUserInfo() {
    await this.userService.getUserById(this.keycloakService.getUsername()).subscribe(res => {
      this.userInfo = res;
      console.log(this.userInfo)
    })
  }

}
