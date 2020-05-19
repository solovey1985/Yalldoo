import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { NouisliderModule } from "ng2-nouislider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { AgmCoreModule } from "@agm/core";

import { ImageUploadModule } from "../shared/image-upload/image-upload.module";

import { PagesComponent } from "./pages.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { SettingsComponent } from "./settings/settings.component";
import { TwitterComponent } from "./twitter/twitter.component";
import { Page404Component } from "./page404/page404.component";
import { Page422Component } from "./page422/page422.component";
import { Page500Component } from "./page500/page500.component";
import { PreferencesComponent } from "./preferences/preferences.component";
import { FeedComponent } from "./feed/feed.component";
import { EventComponent } from "./event/event.component";
import { EventCreateComponent } from "./event-create/event-create.component";
import { AboutComponent } from "./about/about.component";
import { ComponentsModule } from "app/components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        TagInputModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AngularMultiSelectModule,
        ComponentsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCZzR9wbOwxH0ejRE_OYJJTpOhtwg44lu8"
        }),
        ImageUploadModule
    ],
    declarations: [
        PagesComponent,
        AboutusComponent,
        AboutComponent,
        ContactusComponent,
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        SearchComponent,
        SettingsComponent,
        TwitterComponent,
        Page404Component,
        Page422Component,
        Page500Component,
        PreferencesComponent,
        FeedComponent,
        EventComponent,
        EventCreateComponent
    ]
})
export class PagesModule {}
