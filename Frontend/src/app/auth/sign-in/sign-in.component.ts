import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { UserManagementService } from '../../services/user-management.service';

export interface UserSignIn {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    BackButtonComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // Login(){
  //   if(this.form.get("email")?.value == 'ecc@g.com'){
  //       this.route.navigateByUrl("home");
  //   }
  // }

  errorMessage = signal('');
  constructor(private userManagementService: UserManagementService) {}

  updateErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      this.errorMessage.set('Debes ingresar un correo válido');
    } else if (this.form.get('email')?.hasError('email')) {
      this.errorMessage.set('Correo inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signIn() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    const user: UserSignIn = {
      email: email,
      password: password,
    };

    this.userManagementService.signIn(user).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión correctamente.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error del servidor',
          text: 'Ocurrió un problema al conectarse al servidor.',
        });
      }
    );
  }
}
