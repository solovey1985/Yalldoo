import { Component, ContentChild, ElementRef, EventEmitter, Output, ChangeDetectorRef, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from "@angular/core";
import { ViewModeDirective } from "./view-mode.directive";
import { EditModeDirective } from "./edit-mode.directive";
import { fromEvent, Subject } from "rxjs";
import { filter, take, switchMapTo, takeUntil } from "rxjs/operators";

@Component({
    selector: "editable",
    template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
    styleUrls: ["./editable.component.scss"]
})
export class EditableComponent implements OnInit, OnDestroy {
    @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
    @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
    @Output() update = new EventEmitter();

    editMode = new Subject();
    editMode$ = this.editMode.asObservable();

    mode: "view" | "edit" = "view";

    private destroy$ = new Subject<void>();

    constructor(private host: ElementRef) {
    }

    ngOnInit() {
        this.viewModeHandler();
        this.editModeHandler();
    }

    toViewMode() {
        this.update.next();
        this.mode = "view";
    }

    private get element() {
        return this.host.nativeElement;
    }

    private viewModeHandler() {
        fromEvent(this.element, "click").pipe(
            takeUntil(this.destroy$),
        ).subscribe(() => {
                this.mode = "edit";
                this.editMode.next(true);

        });
    }

    private editModeHandler() {
        const clickOutside$ = fromEvent(document, "click").pipe(
            takeUntil(this.destroy$),
            filter(({ target }) => this.element.contains(target) === false),
            take(1)
        );

        this.editMode$.pipe(
            switchMapTo(clickOutside$),
            takeUntil(this.destroy$),
        ).subscribe(event => this.toViewMode());
    }

    get currentView() {
        return this.mode === "view" ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

}
