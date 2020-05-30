import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-preference-card',
  templateUrl: './preference-card.component.html',
  styleUrls: ['./preference-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferenceCardComponent implements OnInit {

  @Input()
  id: number;
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  backgroundUrl: string;
  @Input()
  icon: string;
  @Input()
  selected: boolean;
  @Output()
  onCardSelected: EventEmitter<any>  =new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onCardClick():void {
    
  }

  onSelectClick() {
     this.onCardSelected.emit(this.id)
  }

}
