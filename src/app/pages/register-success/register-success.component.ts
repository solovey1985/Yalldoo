import { Component, OnInit, } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  goToApp() {
    this.router.navigate(["/feed"]);
  }

}
