import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { Category } from "app/_models/category/category.model";
import { CategoryService } from "app/_services/category/category.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
    selector: "app-categories-preference-editor",
    templateUrl: "./categories-preference-editor-modal.component.html",
    styleUrls: ["./categories-preference-editor-modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPreferenceEditorComponent implements OnInit {
    @Input("categories")
    selectedCategories: Array<Category>;
    @Output()
    onSubmit: EventEmitter<Category[]> = new EventEmitter<Category[]>();
    @Output()
    onDismiss: EventEmitter<any> = new EventEmitter();

    categories: Array<Category>;
    constructor(private categoryService: CategoryService) {
        
        
    }

    ngOnInit(): void {
        this.categories = this.categoryService.getChildCategories();
        if (this.selectedCategories === undefined) {
            this.selectedCategories = new Array<Category>();
        }
    }

    isCategorySelected(category: Category) {
        if (this.selectedCategories) {
            return this.selectedCategories.includes(category);
        }
        return false;
    }

    onCategoryClick(category: Category) {
        if (this.selectedCategories.includes(category)) {
            this.selectedCategories = this.selectedCategories.filter((x) => x.id != category.id);
        } else {
            this.selectedCategories.push(category);
        }
    }

    onSubmitClick() {
        this.onSubmit.emit(this.selectedCategories);
    }

    onDismissClick() {
        this.onDismiss.emit();
    }

    public getIcon(title: string):string {
        return this.categoryService.getCategoryIcon(title);
    }
}
