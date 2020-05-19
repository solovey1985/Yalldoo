import { NgModule } from "@angular/core";
import { SiteLayoutComponent } from "./site-layout/site-layout.component";
import { BareLayoutComponent } from "./bare-layout/bare-layout.component";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "app/components/components.module";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [RouterModule, ComponentsModule, FormsModule, ReactiveFormsModule],
    exports: [SiteLayoutComponent, BareLayoutComponent, AppLayoutComponent],
    declarations: [SiteLayoutComponent, BareLayoutComponent, AppLayoutComponent],
    providers: []
})
export class LayoutModule {}
