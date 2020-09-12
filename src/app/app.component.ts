import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import { Location, PopStateEvent } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";

let didScroll;
const lastScrollTop = 0;
const delta = 5;
const navbarHeight = 0;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor() {}
}
