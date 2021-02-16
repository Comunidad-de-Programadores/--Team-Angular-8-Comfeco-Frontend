import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import { emailPattern } from '../../helpers/emailPattern';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService } from '../../../core/services/modal.service';
import { MyValidatorsService } from '../../../core/services/my-validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  isLoading = false;
  isChecked = false;
  iconCheck = faSquare;
  iconUncheck = faCheckSquare;

  get nickErrors() {
    const field = this.register.get('usuNickname');
    return !this.register.pristine && field.dirty && field.errors;
  }
  get emailErrors() {
    const field = this.register.get('usuCorreo');
    return !this.register.pristine && field.dirty && field.errors;
  }
  get passErrors() {
    const field = this.register.get('usuClave');
    return !this.register.pristine && field.dirty && field.errors;
  }
  get confirmErrors() {
    const field = this.register.get('usuClave2');
    return !this.register.pristine && field.dirty && field.errors;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: ModalService,
    private myValidators: MyValidatorsService
  ) {
    this.register = this.createForm();
  }

  ngOnInit(): void {}

  onChecked() {
    this.isChecked = !this.isChecked;
  }

  onClick() {
    this.modalService.openModal();
  }

  createForm() {
    return this.fb.group(
      {
        usuNickname: ['', [Validators.required, Validators.minLength(3)]],
        usuCorreo: [
          '',
          [Validators.required, Validators.pattern(emailPattern)],
        ],
        usuClave: ['', [Validators.required, Validators.minLength(6)]],
        usuClave2: ['', [Validators.required]],
      },
      {
        validators: this.myValidators.confirmPass('usuClave', 'usuClave2'),
      }
    );
  }

  onSubmit() {
    if (this.register.pristine || this.register.invalid) {
      this.register.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.initSwalInfo();
    this.authService.newUser(this.register.value).subscribe((data) => {
      if (data.error) {
        return this.failSwal(data.mensaje);
      }
      this.successSwal(data.mensaje);
      this.isLoading = false;
      this.register.reset();
    });
  }

  initSwalInfo() {
    return Swal.fire({
      icon: 'info',
      title: 'Registro enviado',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });
  }

  successSwal(data: string) {
    return Swal.fire({
      icon: 'success',
      title: '¡Gracias!',
      text: data,
      timer: 3500,
    });
  }
  failSwal(err: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Ups, algo salío mal',
      text: err,
    });
  }
}
