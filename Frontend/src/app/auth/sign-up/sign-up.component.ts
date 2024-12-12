import { Component, signal } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { UserManagementService } from '../../services/user-management.service';
import Swal from 'sweetalert2';

// Las variables de la interface deben ser las mismas que el post de la API
export interface User {
  email: string;
  password: string;
  name: string;
  last_name: string;
  second_last_name: string;
  birth_date: Date;
  phone_number: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    BackButtonComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName1: new FormControl('', [Validators.required]),
    lastName2: new FormControl('', [Validators.required]),
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = signal(true);
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

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signUp(): void {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }

    const name = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName1')?.value;
    const secondLastName = this.form.get('lastName2')?.value;
    const birthDate = this.form.get('birthDate')?.value;
    const phoneNumber = this.form.get('phoneNumber')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    const userData: User = {
      email: email ?? '',
      password: password ?? '',
      name: name ?? '',
      last_name: lastName ?? '',
      second_last_name: secondLastName ?? '',
      birth_date: birthDate,
      phone_number: phoneNumber ?? '',
    };

    this.userManagementService.signUp(userData).subscribe({
      next: (response) => {
        console.log('El objeto a enviar es: ', userData);
        console.log(response);
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente.',
        }).then(() => {
          // Opcional: Redirigir o limpiar el formulario
          this.form.reset();
        });
      },
      error: (error) => {
        console.error(error);
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Ocurrió un problema al crear tu cuenta. Por favor, inténtalo nuevamente.',
        });
      },
    });
  }
}
