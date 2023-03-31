import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Money-Transfer-System';

  constructor(private service: ConfigService, private keycloakService: KeycloakService) {

  }

  callGet(): void {
    console.log('called get')
    this.service.get();
  }

}
