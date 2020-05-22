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
    var body = document.getElementsByTagName('body')[0];

    var descriptionElement = document.querySelector('.js-yld-about');
    var teamElement = document.querySelector('.js-yld-team');
    var contactUsElement = document.querySelector('.js-yld-contactus');
    var loginElement = document.querySelector('.js-yld-login');

    function scrollTo(element, to, duration) {
      if (duration <= 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 5;
      setTimeout(function() {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop === to) return;
          scrollTo(element, to, duration - 5);
      }, 10);
    }

    [descriptionElement, teamElement, contactUsElement, loginElement].map(function(element){
      element.addEventListener('click', function() {
        var anchorClass = '.js-yld-anchor-' + this.attributes['data-anchor'].nodeValue;
        var elementToScroll = document.querySelector(anchorClass);
        var scrollPoint = elementToScroll.getBoundingClientRect().top + window.scrollY;
        scrollTo(document.documentElement, scrollPoint, 200);
      });
    });

    navbar.classList.add('navbar-transparent', 'navbar-landing');
    body.classList.add('landing-page');

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

    // element.scrollIntoView(alignToTop)
  }
  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-landing');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
