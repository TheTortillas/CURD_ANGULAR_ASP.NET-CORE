import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { UserManagementService } from '../../services/user-management.service';
import Swal from 'sweetalert2';

export interface DeleteUser {
  email: string;
}

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage = signal('');
  successMessage = signal('');
  hide = signal(true);

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

  deleteAccount(): void {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que deseas eliminar tu cuenta?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const userData: DeleteUser = {
          email: this.form.get('email')?.value ?? '',
        };

        this.userManagementService.deleteUser(userData).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Cuenta eliminada',
              text: 'Tu cuenta ha sido eliminada correctamente.',
            }).then(() => {
              this.form.reset();
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Ocurrió un problema al eliminar tu cuenta. Por favor, inténtalo nuevamente.',
            });
          }
        );
      }
    });
  }
}
