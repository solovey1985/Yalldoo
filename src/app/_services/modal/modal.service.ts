import { Injectable } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { DateTimePickerModalComponent } from "app/components/modal/date-time-picker-modal/date-time-picker-modal.component";
import { NgbDateTimeStruct, DateTimeModel } from "app/components/date-time-picker/date-time.model";
import { of, Observable, from, Subject } from "rxjs";
import LocationDto from "app/_models/location.dto";
import { LocationPickerModalComponent } from "app/components/modal/location-picker-modal/location-picker-modal.component";
import { FriendsPickerModalComponent } from "app/components/modal/friends-picker-modal/friends-picker-modal.component";
import { FriendsImportFacebookModalComponent } from "app/components/modal/friends-import-facebook-modal/friends-import-facebook-modal.component";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { CategoryModel } from "app/_models/category/category.model";
import { CategoriesPreferenceEditorComponent } from "app/components/modal/categories-preference-editor-modal/categories-preference-editor-modal.component";

@Injectable(
    { providedIn: "root" }
)

export class ModalService {
    constructor(private ngbModalService: NgbModal) {

     }

    openDateTimePicker(dateTime: Date, onlyDate?: boolean, title?: string): Observable<string> {
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "sm";
        const modalRef = this.ngbModalService.open(DateTimePickerModalComponent, options);

        const subject = new Subject<string>();
        const modal = <DateTimePickerModalComponent>modalRef.componentInstance;
        modal.dateString = dateTime.toLocaleString();
        modal.onlyDate = !!onlyDate;
        modal.title = title!!;
        const submitSubscription = modal.onSubmit.subscribe((result: string) => {
            subject.next(result);
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        const dismissSubscription = modal.onDismiss.subscribe(() => {
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        return subject.asObservable()
    }

    openLocationPicker(location?: LocationDto): Observable<LocationDto> {
        const subject = new Subject<LocationDto>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        const modalRef = this.ngbModalService.open(LocationPickerModalComponent, options);
        const modal = <LocationPickerModalComponent>modalRef.componentInstance;
        modal.location  = location;
        const submitSubscription = modal.onSubmit.subscribe((result: LocationDto) => {
            subject.next(result);
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        const dismissSubscription = modal.onDismiss.subscribe(() => {
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        return subject.asObservable()
    }

    openFriendsPicker(): Observable<Array<FirendListItem>> {
        const subject = new Subject<Array<FirendListItem>>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        const modalRef = this.ngbModalService.open(FriendsPickerModalComponent, options);
        const modal = <FriendsPickerModalComponent>modalRef.componentInstance;
        const submitSubscription = modal.onSubmit.subscribe((result: Array<FirendListItem>) => {
            subject.next(result);
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        const dismissSubscription = modal.onDismiss.subscribe(() => {
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        return subject.asObservable()
    }

    openCategoriesPrefernceEditor(categories?: CategoryModel[]) {
        const subject = new Subject<Array<CategoryModel>>()
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        const modalRef = this.ngbModalService.open(CategoriesPreferenceEditorComponent, options);
        const modal = <CategoriesPreferenceEditorComponent>modalRef.componentInstance;
        modal.selectedCategories = categories;
        const submitSubscription = modal.onSubmit.subscribe((result: Array<CategoryModel>) => {
            subject.next(result);
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        const dismissSubscription = modal.onDismiss.subscribe(() => {
            modalRef.close();
            submitSubscription.unsubscribe()
        });
        return subject.asObservable()
    }

    openFacebookFriendsImport(): void {
        const options = new NgbModalConfig();
        options.centered = false;
        options.size = "lg";
        const modalRef = this.ngbModalService.open(FriendsImportFacebookModalComponent, options);
        const modal = <FriendsImportFacebookModalComponent>modalRef.componentInstance;
    }

}
