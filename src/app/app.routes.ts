import { Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { autenticacaoGuard } from './services/autenticacao.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent, canActivate: [autenticacaoGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [autenticacaoGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];


