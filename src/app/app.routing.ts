import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsComponent } from "./components/components.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactusComponent } from "./pages/contactus/contactus.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SearchComponent } from "./pages/search/search.component";
import { EditProfileComponent } from "./pages/profile-edit/edit-profile.component";
import { TwitterComponent } from "./pages/twitter/twitter.component";
import { Page404Component } from "./pages/page404/page404.component";
import { Page422Component } from "./pages/page422/page422.component";
import { Page500Component } from "./pages/page500/page500.component";
import { PreferencesComponent } from "./pages/preferences/preferences.component";
import { FeedComponent } from "./pages/feed/feed.component";
import { EventComponent } from "./pages/event/event.component";
import { EventCreateComponent } from "./pages/event-create/event-create.component";
import { AppLayoutComponent } from "./layouts/app-layout/app-layout.component";
import { BareLayoutComponent } from "./layouts/bare-layout/bare-layout.component";
import { SiteLayoutComponent } from "./layouts/site-layout/site-layout.component";
import { ForgotComponent } from "./pages/forgot/forgot.component";
import { FriendsComponent } from "./pages/friends/friends/friends.component";
import { FriendComponent } from "./pages/friends/friend/friend.component";
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot([
            {
                path: "",
                component: SiteLayoutComponent,
                children: [
                    { path: "", component: LandingComponent },
                    { path: "team", component: AboutusComponent },
                    { path: "about", component: AboutComponent },
                    { path: "contactus", component: ContactusComponent },
                    { path: "", component: LandingComponent }
                ]
            },
            {
                path: "",
                component: AppLayoutComponent,
                children: [
                    { path: "feed", component: FeedComponent },
                    { path: "event", component: EventComponent },
                    { path: "create", component: EventCreateComponent },
                    { path: "search", component: SearchComponent },
                    { path: "me", component: EditProfileComponent },
                    { path: "twitter", component: TwitterComponent },
                    { path: "preferences", component: PreferencesComponent },
                    { path: "profile", component: ProfileComponent },
                    { path: "friends", component: FriendsComponent },
                    { path: "friend/:id", component: FriendComponent }
                ]
            },
            {
                path: "",
                component: BareLayoutComponent,
                children: [
                    { path: "register", component: RegisterComponent },
                    { path: "login", component: LoginComponent },
                    { path: "forgot", component: ForgotComponent },
                    { path: "page404", component: Page404Component },
                    { path: "page422", component: Page422Component },
                    { path: "page500", component: Page500Component }
                ]
            },

            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "**", redirectTo: "page404" }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
