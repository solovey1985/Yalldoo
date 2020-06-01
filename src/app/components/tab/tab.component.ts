import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  @Input('tabTitle') title: string;
  @Input() active = false;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
