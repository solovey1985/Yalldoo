import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from "./components/components.module";
import { PagesModule } from "./pages/pages.module";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layouts/layout.module";
import { AuthService } from "./_services/auth/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./_store/effects/auth.effects";
import { appReducers } from "./_store/app.states";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TokenInterceptor, ErrorInterceptor } from "./core/interceptors/token.iterceptor";
import { EventEffects } from "./_store/effects/event.effects";
import { CategoryEffects } from "./_store/effects/category.effects";

const maskConfig: Partial<IConfig> = {
    validation: false,
  };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        //*******NGRX**********
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([AuthEffects, EventEffects, CategoryEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 24
        }),
        //

        AppRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(maskConfig),
        ComponentsModule,
        PagesModule,
        LayoutModule
    ],
    providers: [AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
          }],
    bootstrap: [AppComponent]
})
export class AppModule {}
