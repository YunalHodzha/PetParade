import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;

  firebasetsAuth: FirebaseTSAuth; //To manage auth part of firebase

  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {}

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          alert('Logged In');
        },
        onFail: (err) => {
          alert(err);
        },
      });
    }
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAmatch(password, confirmPassword)
    ) {
      this.firebasetsAuth.createAccountWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          alert('Account Created!');
          registerEmail.value = '';
          registerPassword.value = '';
          registerConfirmPassword.value = '';
        },
        onFail: (err) => {
          alert('Failed to create the account.');
        },
      });
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAmatch(text: string, compareWith: string) {
    return text == compareWith;
  }

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
