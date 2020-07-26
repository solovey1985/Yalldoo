import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  date = new Date(2020, 8, 24, 12, 20, 0);
  constructor() { }
  actionItems = ["Join", "Follow", "Invite"]
  ngOnInit(): void {
  }

}
