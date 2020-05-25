import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './bare-layout.component.html',
  styleUrls: ['./bare-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BareLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
