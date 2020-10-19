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
  public hideBackToTopBtn:boolean = true;

  constructor(
    private builder: FormBuilder,
    private notify: NotifyService
  ) {}

  navbar_transparent = true;
  ngOnInit() {
    const rellaxHeader = new Rellax(".rellax-header");

    const navbar = document.getElementsByTagName("nav")[0];
    const body = document.getElementsByTagName("body")[0];
    const backToTop = document.getElementsByClassName('yld-landing-btt')[0];

    navbar.classList.add("navbar-transparent");
    body.classList.add("landing-page");

    const descriptionElement = document.querySelector(".js-yld-about");
    const teamElement = document.querySelector(".js-yld-team");
    const contactUsElement = document.querySelector(".js-yld-contact_us");

    body.addEventListener("scroll", function() {
      if ( body.scrollTop > 200 ) {
        navbar.classList.remove("navbar-transparent");
        backToTop.classList.remove("d-none");
      } else {
        navbar.classList.add("navbar-transparent");
        backToTop.classList.add("d-none");
      }

      if ((body.scrollTop - body.offsetHeight) > 2600 ) {
        navbar.classList.remove("nav-up");
        navbar.classList.add("nav-down");
        navbar.classList.add("navbar-transparent");
      }
    });

    function scrollToElement(element, to, duration) {
      if (duration <= 0) { return; }
      const difference = to - element.scrollTop;
      const perTick = difference / duration * 5;
      setTimeout(function() {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop === to) { return; }
          scrollToElement(element, to, duration - 5);
      }, 10);
    }
    backToTop.addEventListener("click", function() {
      scrollToElement(document.body, 0, 200);
    });

    [descriptionElement, teamElement, contactUsElement].map(function(element) {
      element.addEventListener("click", function() {
        const anchorClass = ".js-yld-anchor-" + this.attributes["data-anchor"].nodeValue;
        const elementToScroll = document.querySelector(anchorClass);
        const scrollPoint = elementToScroll.getBoundingClientRect().top + document.body.scrollTop;
        scrollToElement(document.body, scrollPoint, 200);
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
    if (this.form.valid) {
      console.log(this.form.value);
      // this.form.get('subject').setValue('');
      // this.form.get('message').setValue('');
      this.form.reset();
      this.notify.success('Your email has been sent!');
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
