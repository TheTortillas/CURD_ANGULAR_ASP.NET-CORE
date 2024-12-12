import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

export interface User {
  email: string;
  password: string;
  name: string;
  last_name: string;
  second_last_name: string;
  birth_date: Date;
  phone_number: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface DeleteUser {
  email: string;
}

export interface ErrorResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) {}

  private URLBase = environment.apiURL;

  signUp(userData: User): Observable<User | ErrorResponse> {
    const url = this.URLBase + '/api/UserManagement/signup';
    return this.httpClient.post<User | ErrorResponse>(
      url,
      userData,
      HttpOptions
    );
  }

  signIn(userData: UserSignIn): Observable<UserSignIn | ErrorResponse> {
    const url = this.URLBase + '/api/UserManagement/signin';
    return this.httpClient.post<UserSignIn | ErrorResponse>(
      url,
      userData,
      HttpOptions
    );
  }

  deleteUser(userData: DeleteUser): Observable<DeleteUser | ErrorResponse> {
    const url = this.URLBase + '/api/UserManagement/deleteUser';
    return this.httpClient.post<DeleteUser | ErrorResponse>(
      url,
      userData,
      HttpOptions
    );
  }
}
