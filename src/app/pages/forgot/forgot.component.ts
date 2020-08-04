import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyService } from 'app/services/notify-service/notify.service';
import { Router } from '@angular/router';
import { ValidationService } from 'app/_services/validation/validation.service';

@Component({
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  public isConfirmed: boolean;
  validation_messages: any;
  constructor(private builder: FormBuilder, private notifyService: NotifyService, private router: Router) {}

  ngOnInit() {
      this.form = this.builder.group({
          email: ["", Validators.compose([Validators.required, ValidationService.emailPatternValidator])],
      });
    
  }
  ngOnDestroy() {}

  onSubmit() {
    this.isConfirmed = true;
  }
}
