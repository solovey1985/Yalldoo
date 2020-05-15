import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsComponent } from "./components/components.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { BlogpostComponent } from "./pages/blogpost/blogpost.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SearchComponent } from "./pages/search/search.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { TwitterComponent } from "./pages/twitter/twitter.component";
import { Page404Component } from "./pages/page404/page404.component";
import { Page422Component } from "./pages/page422/page422.component";
import { Page500Component } from "./pages/page500/page500.component";
import { PreferencesComponent } from "./pages/preferences/preferences.component";
import { FeedComponent } from "./pages/feed/feed.component";
import { EventComponent } from "./pages/event/event.component";
import { EventCreateComponent } from "./pages/event-create/event-create.component";

const routes: Routes = [
    { path: "components", component: ComponentsComponent },
    { path: "preferences", component: PreferencesComponent },
    { path: "team", component: AboutusComponent },
    { path: "about", component: BlogpostComponent },
    { path: "feed", component: FeedComponent },
    { path: "event", component: EventComponent },
    { path: "create", component: EventCreateComponent },
    { path: "contactus", component: ContactusComponent },
    { path: "login", component: LoginComponent },
    { path: "profile", component: ProfileComponent },
    { path: "register", component: RegisterComponent },
    { path: "search", component: SearchComponent },
    { path: "me", component: SettingsComponent },
    { path: "twitter", component: TwitterComponent },
    { path: "page404", component: Page404Component },
    { path: "page422", component: Page422Component },
    { path: "page500", component: Page500Component },
    { path: "", component: LandingComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: []
})
export class AppRoutingModule {}
