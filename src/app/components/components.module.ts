import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerMonth } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TagInputModule } from 'ngx-chips';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { TablesAreasComponent } from './tables-areas/tables-areas.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from './notify/notify.component';
import { BareNavbarComponent } from './bare-navbar/bare-navbar.component';
import { PreferenceCardComponent } from './preference-card/preference-card.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { QuicksortBarComponent } from './quicksort-bar/quicksort-bar.component';
import { EventListItem } from './event-list-item/event-list-item.component';
import { EventList } from './event-list/event-list.component';
import { PlaceAutocompleteComponent } from './place-autocomplete/place-autocomplete.component';
import { MapComponent } from './map/map.component';
import { DateTimePickerModalComponent } from './modal/date-time-picker-modal/date-time-picker-modal.component';
import { LocationPickerModalComponent } from './modal/location-picker-modal/location-picker-modal.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { FriendsPickerModalComponent } from './modal/friends-picker-modal/friends-picker-modal.component';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { CategoriesPreferenceEditorComponent } from './modal/categories-preference-editor-modal/categories-preference-editor-modal.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        AngularMultiSelectModule,
        NgxGalleryModule,
        ImageUploadModule
    ],
    declarations: [
        ComponentsComponent,
        NotificationComponent,
        TablesAreasComponent,
        FooterComponent,
        NavbarComponent,
        NotifyComponent,
        BareNavbarComponent,
        PreferenceCardComponent,
        TabComponent,
        TabsComponent,
        SearchBarComponent,
        QuicksortBarComponent,
        EventListItem,
        EventList,
        PlaceAutocompleteComponent,
        MapComponent,
        DateTimePickerComponent,
        DateTimePickerModalComponent,
        LocationPickerModalComponent,
        FriendsPickerModalComponent,
        SelectDropdownComponent,
        CategoriesPreferenceEditorComponent,

    ],
    exports: [
        ComponentsComponent,
        FooterComponent,
        NavbarComponent,
        NotifyComponent,
        BareNavbarComponent,
        PreferenceCardComponent,
        TabComponent,
        TabsComponent,
        SearchBarComponent,
        QuicksortBarComponent,
        EventListItem,
        EventList,
        PlaceAutocompleteComponent,
        MapComponent,
        SelectDropdownComponent,
        CategoriesPreferenceEditorComponent
    ]
})
export class ComponentsModule { }
