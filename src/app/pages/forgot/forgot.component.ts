import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyService } from 'app/services/notify-service/notify.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  validation_messages: any;
  constructor(private builder: FormBuilder, private notifyService: NotifyService, private router: Router) {}

  ngOnInit() {
      this.form = this.builder.group({
          email: ["", Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)])],
      });
      this.initValidationMessages();
  }
  ngOnDestroy() {}

  onSubmit() {
    this.notifyService.info("Please, check your mail box. Email with recovery information was sent.")
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
  initValidationMessages() {
      this.validation_messages = {
          email: [
              { type: "required", message: "Email is required" },
              { type: "pattern", message: "Enter a valid email" }
          ]
      };
  }

}