import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-page404",
  templateUrl: "./page404.component.html",
  styleUrls: ["./page404.component.scss"]
})
export class Page404Component implements OnInit, OnDestroy {

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
