import { NgModule } from "@angular/core";
import { SiteLayoutComponent } from "./site-layout/site-layout.component";
import { BareLayoutComponent } from "./bear-layout/bare-layout.component";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "app/components/components.module";
import { AppLayoutComponent } from "./app-layout/app-layout.component";

@NgModule({
    imports: [RouterModule, ComponentsModule],
    exports: [SiteLayoutComponent, BareLayoutComponent, AppLayoutComponent],
    declarations: [SiteLayoutComponent, BareLayoutComponent, AppLayoutComponent],
    providers: []
})
export class LayoutModule {}
