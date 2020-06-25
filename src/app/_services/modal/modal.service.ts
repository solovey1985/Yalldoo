import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModalComponent } from 'app/components/modal/date-time-picker-modal/date-time-picker-modal.component';
import { NgbDateTimeStruct, DateTimeModel } from 'app/components/date-time-picker/date-time.model';
import { of, Observable, from, Subject } from 'rxjs';

@Injectable(
    { providedIn: 'root' }
)
    
export class ModalService {
    constructor(private ngbModalService: NgbModal) {

     }
    
    openDateTimePicker(dateTime: Date): Observable<string> {
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "sm";
        var modalRef = this.ngbModalService.open(DateTimePickerModalComponent, options);

        var subject = new Subject<string>();
        const modal = <DateTimePickerModalComponent>modalRef.componentInstance;
        modal.dateString = dateTime.toLocaleString();
        const submitSubscription = modal.onSubmit.subscribe((result: string) => {
            subject.next(result);
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        const dismissSubscription = modal.onDismiss.subscribe(()=> {
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        return subject.asObservable()  
    }
}