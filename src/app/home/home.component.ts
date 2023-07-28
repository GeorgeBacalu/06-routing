import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) { }

  onLoadServer(id: number): void { this.router.navigate(["servers", id, "edit"], { queryParams: { allowEdit: "true" }, fragment: "loading"}); }

  onLogin(): void { this.authService.login(); }

  onLogout(): void { this.authService.logout(); }
}
