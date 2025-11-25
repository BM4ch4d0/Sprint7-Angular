import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AutenticacaoService, private router: Router) { }
  sidebarVisible = false;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
