import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../core/core.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordComponent } from './components/password/password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ModalTermsComponent } from './components/modal-terms/modal-terms.component';
import { WrapperFormComponent } from './components/wrapper-form/wrapper-form.component';
import { FormNavigationComponent } from './components/form-navigation/form-navigation.component';


import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare,} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    LayoutComponent,
    ModalTermsComponent,
    WrapperFormComponent,
    FormNavigationComponent,
    
  ],
  exports: [LoginComponent, RegisterComponent, PasswordComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule],
})
export class AuthModule {}
