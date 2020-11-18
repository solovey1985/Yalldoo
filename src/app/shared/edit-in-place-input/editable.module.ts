import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditableComponent } from "./editable.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EditableComponent,
    ],
    exports: [EditableComponent]
})
export class EditInPlaceModule { }
