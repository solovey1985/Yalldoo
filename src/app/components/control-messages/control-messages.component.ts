import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ValidationService } from "app/_services/validation/validation.service";

@Component({
    selector: "app-control-messages",
    template: `<div class="yld-error" *ngIf="errorMessage !== null">{{ errorMessage }}</div>`,
    styleUrls: ["./control-messages.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() title = "";
    
    constructor() {}

    get errorMessage() {
        if (this.control && this.control.errors) {
            for (let propertyName in this.control.errors) {
              if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
                
                const message = `${this.title}  ${ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName])}`;
                    return message;
                }
            }
        }
        return null;
    }
}
