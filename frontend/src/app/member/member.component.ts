import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountRequest, RoleResponse } from '../models/account.model';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  accountForm!: FormGroup;
  isLogin = true;
  roles: RoleResponse[] = [];

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['stock']);
      return;
    }

    this.prepareForm();
    this.feedRoles();
  }

  feedRoles(): void {
    this.networkService.getRoles().subscribe(
      result => {
        this.roles = result;
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }

  prepareForm(): void {
    // !!! The key must match the request of the server
    this.accountForm = new FormGroup({
      // FormControl(Value, Validators...)
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    if (!this.isLogin) {
      this.accountForm.addControl('roleId', new FormControl('', Validators.required));
    }
  }

  onSubmitForm(): void {
    const account: AccountRequest = {
      ...this.accountForm.value
    };
    if (this.isLogin) {
      this.networkService.login(account).subscribe(
        result => {
          const token = result.token;
          if (token) {
            this.authService.setToken(token);
            this.router.navigate(['stock']);
            return
          }
          alert('token invalid');
        },
        error => {
          alert(JSON.stringify(error))
        }
      );
      return;
    }

    this.networkService.register(account).subscribe(
      result => {
        this.isLogin = !this.isLogin;
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }

  getUsernameErrorMessage(): string {
    const username = this.accountForm.get('username');
    if (username?.hasError('required')) {
      return 'You must enter a username';
    }
    return username?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    const password = this.accountForm.get('password');
    if (password?.hasError('required')) {
      return 'You must enter a password';
    }
    return password?.hasError('minlength') ? 'Password less than 8 character' : '';
  }

  getRoleErrorMessage(): string {
    const roleId = this.accountForm.get('roleId');
    return roleId?.hasError('required') ? 'You must select a role' : '';
  }

  onClickShowLogin(formGroupDirective: FormGroupDirective): void {
    formGroupDirective.resetForm();
    this.isLogin = !this.isLogin;
    this.prepareForm();
  }

}
