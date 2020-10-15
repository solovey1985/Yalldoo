import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { ValidationService } from "app/_services/validation/validation.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import * as Rellax from "rellax";

@Component({
selector: "app-landing",
templateUrl: "./landing.component.html",
styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  public form: FormGroup;
  public validation_messages: any;

  constructor(
    private builder: FormBuilder,
    private notify: NotifyService
) {}

navbar_transparent = true;
ngOnInit() {
  const rellaxHeader = new Rellax(".rellax-header");

  const navbar = document.getElementsByTagName("nav")[0];
  const body = document.getElementsByTagName("body")[0];

  navbar.classList.add("navbar-transparent");
  body.classList.add("landing-page");

  const descriptionElement = document.querySelector(".js-yld-about");
  const teamElement = document.querySelector(".js-yld-team");

  body.addEventListener("scroll", function() {
    if ( body.scrollTop > 200 ) {
      navbar.classList.remove("navbar-transparent");
    } else {
      navbar.classList.add("navbar-transparent");
    }

    if ((body.scrollTop - body.offsetHeight) > 2600 ) {
      navbar.classList.remove("nav-up");
      navbar.classList.add("nav-down");
      navbar.classList.add("navbar-transparent");
    }
  });

  function scrollTo(element, to, duration) {
    if (duration <= 0) { return; }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 5;
    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) { return; }
        scrollTo(element, to, duration - 5);
    }, 10);
  }

  [descriptionElement, teamElement].map(function(element) {
    element.addEventListener("click", function() {
      const anchorClass = ".js-yld-anchor-" + this.attributes["data-anchor"].nodeValue;
      const elementToScroll = document.querySelector(anchorClass);
      const scrollPoint = elementToScroll.getBoundingClientRect().top + window.scrollY;
      scrollTo(document.documentElement, scrollPoint, 200);
    });
  });

  this.form = this.builder.group(
    {
        name: ["", Validators.compose([
            Validators.maxLength(50),
            Validators.minLength(2),
            Validators.required
        ])],
        email: ["",  Validators.compose([
            Validators.required,
            ValidationService.emailPatternValidator
        ])],
        subject: ["", Validators.compose([
          Validators.maxLength(50)
        ])],
        message: ["", Validators.compose([
          Validators.maxLength(512),
          Validators.minLength(2),
          Validators.required
        ])]
    },
    { updateOn: "change" }
  );
}

formSubmit(event): void {

  let contactUsObj = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

    contactUsObj.name = this.form.get("name").value;
    contactUsObj.email = this.form.get("email").value;
    contactUsObj.subject = this.form.get("subject").value;
    contactUsObj.message = this.form.get("message").value;

  if (this.form.valid) {
    console.log('Name', contactUsObj.name);
    console.log('Email', contactUsObj.email);
    console.log('Subject', contactUsObj.subject);
    console.log('Message', contactUsObj.message);
    this.form.get("subject").setValue('');
    this.form.get("message").setValue('');
    this.notify.success("Your email has been sent!");
  }

}

isInvalid(control: AbstractControl): boolean {
  return control.invalid && control.touched
}

public get messages() {
  return this.validation_messages;
}

ngOnDestroy() {
  const navbar = document.getElementsByTagName("nav")[0];
  navbar.classList.remove("navbar-transparent");
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("landing-page");
}
}
