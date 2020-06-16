import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TagInputModule } from 'ngx-chips';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';

import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
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
        NgbdModalBasic,
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
        MapComponent
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
        MapComponent
    ]
})
export class ComponentsModule { }
