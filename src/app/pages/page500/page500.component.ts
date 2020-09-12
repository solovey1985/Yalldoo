import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-page500",
  templateUrl: "./page500.component.html",
  styleUrls: ["./page500.component.scss"]
})
export class Page500Component implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
      const navbar = document.getElementsByTagName("nav")[0];
      navbar.classList.add("navbar-transparent");
  }
  ngOnDestroy() {
      const navbar = document.getElementsByTagName("nav")[0];
      navbar.classList.remove("navbar-transparent");
  }

}
