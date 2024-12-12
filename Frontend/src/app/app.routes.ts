import { Routes } from '@angular/router';
import { HomeComponent } from './landing/pages/home/home.component';
import { WeatherForecastComponent } from './landing/pages/weather-forecast/weather-forecast.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DeleteAccountComponent } from './auth/delete-account/delete-account.component'; 

export const routes: Routes = [
    {
        path: 'auth',
        children: [
          {
            path: 'sign-up',
            title: 'Sign Up',
            component: SignUpComponent,
          },
          {
            path: 'sign-in',
            title: 'Sign in',
            component: SignInComponent,
          },
          {
            path: 'delete-account',
            title: 'Delete account',
            component: DeleteAccountComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'sign-in'
          }
        ]
    },
    
    {
        path: 'home',
        component: HomeComponent,
    },

    {
        path: 'weatherForecast',
        component: WeatherForecastComponent,
    },
    
    {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path:'**',
        redirectTo: 'home',
        pathMatch: 'full',
    }

];
