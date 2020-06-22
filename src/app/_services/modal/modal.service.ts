import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModalComponent } from 'app/components/modal/date-time-picker-modal/date-time-picker-modal/date-time-picker-modal.component';

@Injectable({ providedIn: 'root' },

)
    
export class ModalService {
    constructor(private ngbModalService: NgbModal) {

     }
    
    openDateTimePicker(): void{
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "md";
        this.ngbModalService.open(DateTimePickerModalComponent, options);
    }
}