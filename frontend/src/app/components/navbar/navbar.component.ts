import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username: any;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername()
  }

  logout() {
    this.keycloakService.logout()
  }

}
