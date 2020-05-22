import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    data : Date = new Date();

  constructor() { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200 ) {
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.add('navbar-transparent');
      }

      if (body.scrollHeight - window.pageYOffset < 1100 ) {
        navbar.classList.remove('nav-up');
        navbar.classList.add('nav-down');
      }
    });
    navbar.classList.add('navbar-landing');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }
  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-landing');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
