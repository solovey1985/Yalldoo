import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModalComponent } from 'app/components/modal/date-time-picker-modal/date-time-picker-modal.component';
import { NgbDateTimeStruct, DateTimeModel } from 'app/components/date-time-picker/date-time.model';
import { of, Observable, from, Subject } from 'rxjs';
import LocationDto from 'app/_models/location.dto';
import { LocationPickerModalComponent } from 'app/components/modal/location-picker-modal/location-picker-modal.component';
import { FriendsPickerModalComponent } from 'app/components/modal/friends-picker-modal/friends-picker-modal.component';
import { FirendListItem } from 'app/_models/friends/friend-list-item.model';
import { Category } from 'app/_models/category/category.model';
import { CategoriesPreferenceEditorComponent } from 'app/components/modal/categories-preference-editor-modal/categories-preference-editor-modal.component';

@Injectable(
    { providedIn: 'root' }
)
    
export class ModalService {
    constructor(private ngbModalService: NgbModal) {

     }
    
    openDateTimePicker(dateTime: Date, onlyDate?:boolean, title?: string): Observable<string> {
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "sm";
        var modalRef = this.ngbModalService.open(DateTimePickerModalComponent, options);

        var subject = new Subject<string>();
        const modal = <DateTimePickerModalComponent>modalRef.componentInstance;
        modal.dateString = dateTime.toLocaleString();
        modal.onlyDate = !!onlyDate;
        modal.title = title!!;
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
    
    openLocationPicker(location?: LocationDto):Observable<LocationDto> {
        var subject = new Subject<LocationDto>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        var modalRef = this.ngbModalService.open(LocationPickerModalComponent, options);
        const modal = <LocationPickerModalComponent>modalRef.componentInstance;
        modal.location  = location;
        const submitSubscription = modal.onSubmit.subscribe((result: LocationDto) => {
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

    openFriendsPicker():Observable<Array<FirendListItem>> {
        var subject = new Subject<Array<FirendListItem>>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        var modalRef = this.ngbModalService.open(FriendsPickerModalComponent, options);
        const modal = <FriendsPickerModalComponent>modalRef.componentInstance;
        const submitSubscription = modal.onSubmit.subscribe((result: Array<FirendListItem>) => {
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


    openCategoriesPrefernceEditor(categories?: Category[]) {
        var subject = new Subject<Array<Category>>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        var modalRef = this.ngbModalService.open(CategoriesPreferenceEditorComponent, options);
        const modal = <CategoriesPreferenceEditorComponent>modalRef.componentInstance;
        modal.selectedCategories = categories;
        const submitSubscription = modal.onSubmit.subscribe((result: Array<Category>) => {
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