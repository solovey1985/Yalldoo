import { Component, OnDestroy, OnInit } from "@angular/core";
import * as Rellax from "rellax";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit, OnDestroy {
    data: Date = new Date();

  constructor() { }

  ngOnInit() {
    const rellaxHeader = new Rellax(".rellax-header");

    const navbar = document.getElementsByTagName("nav")[0];
    const body = document.getElementsByTagName("body")[0];

    navbar.classList.add("navbar-transparent");
    body.classList.add("landing-page");

    const descriptionElement = document.querySelector(".js-yld-about");
    const teamElement = document.querySelector(".js-yld-team");

    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 200 ) {
        navbar.classList.remove("navbar-transparent");
      } else {
        navbar.classList.add("navbar-transparent");
      }

      if (body.scrollHeight - window.pageYOffset < 1100 ) {
        navbar.classList.remove("nav-up");
        navbar.classList.add("nav-down");
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
  }

  ngOnDestroy() {
    const navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
}
