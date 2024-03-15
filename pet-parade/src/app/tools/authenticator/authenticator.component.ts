import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;
  constructor() {}

  ngOnInit(): void {}

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.LOGIN:
        return 'Login';
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
}
