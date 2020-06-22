import { Injectable, ComponentRef, Component, ComponentFactoryResolver, ComponentFactory, Injector, ɵComponentType } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerComponent } from 'app/components/date-time-picker/date-time-picker.component';

@Injectable({ providedIn: 'root' },

)
    
export class ModalService {

    constructor(private ngbModalService: NgbModal) {

     }
    openDateTimePicker(): void{
        this.ngbModalService.open(DateTimePickerComponent);
    }
}