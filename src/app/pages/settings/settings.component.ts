import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'app/_services/validation/validation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  passwordForm: FormGroup;
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
    });
  }

  onPasswordSubmit() {
    console.log("On Password Submit");
  }

}