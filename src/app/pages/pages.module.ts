import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { EditProfileComponent } from "./profile-edit/profile-edit.component";
import { TwitterComponent } from "./twitter/twitter.component";
import { Page404Component } from "./page404/page404.component";
import { Page422Component } from "./page422/page422.component";
import { Page500Component } from "./page500/page500.component";
import { CategoriesComponent } from "./preferences/categories/categories.component";
import { FeedComponent } from "./feed/feed.component";
import { EventComponent } from "./event/event.component";
import { EventCreateComponent } from "./event-create/event-create.component";
import { AboutComponent } from "./about/about.component";
import { ComponentsModule } from "app/components/components.module";
import { RouterModule } from "@angular/router";
import { ForgotComponent } from "./forgot/forgot.component";
import { FriendsComponent } from "./friends/friends/friends.component";
import { FriendComponent } from "./friends/friend/friend.component";
import { SettingsComponent } from "./settings/settings.component";
import { NgxMaskModule } from "ngx-mask";
import { EventEditComponent } from "./event-edit/event-edit.component";
import { UseTermsComponent } from "./policies/use-terms/use-terms.component";
import { CookiesPolicyComponent } from "./policies/cookies-policy/cookies-policy.component";
import { PrivacyPolicyComponent } from "./policies/privacy-policy/privacy-policy.component";
import { HelpComponent } from "./policies/help/help.component";
import { RegisterSuccessComponent } from "./register-success/register-success.component";
import { EmailConfirmComponent } from "./email-confirm/email-confirm.component";
import { ProfileFriendsComponent } from "./profile/friends/profile-friends.component";
import { ProfileEventsComponent } from "./profile/events/profile-events.component";
import { EditInPlaceModule } from "../shared/edit-in-place-input/editable.module";
import { ViewModeDirective } from "../shared/edit-in-place-input/view-mode.directive";
import { EditModeDirective } from "../shared/edit-in-place-input/edit-mode.directive";
import { FocusableDirective } from "../shared/edit-in-place-input/focusable.directive";
import { EditableOnEnterDirective } from "../shared/edit-in-place-input/editable-on-enter.directive";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        TagInputModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AngularMultiSelectModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCZzR9wbOwxH0ejRE_OYJJTpOhtwg44lu8"
        }),
        ImageUploadModule,
        ComponentsModule,
        NgxMaskModule,
        EditInPlaceModule,
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
        EditProfileComponent,
        TwitterComponent,
        Page404Component,
        Page422Component,
        Page500Component,
        CategoriesComponent,
        FeedComponent,
        EventComponent,
        EventCreateComponent,
        ForgotComponent,
        FriendsComponent,
        FriendComponent,
        ProfileFriendsComponent,
        ProfileEventsComponent,
        SettingsComponent,
        EventEditComponent,
        UseTermsComponent,
        CookiesPolicyComponent,
        PrivacyPolicyComponent,
        HelpComponent,
        RegisterSuccessComponent,
        EmailConfirmComponent,
        ViewModeDirective,
        EditModeDirective,
        FocusableDirective,
        EditableOnEnterDirective,
    ]
})
export class PagesModule {}
