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
    outputCategories: Array<Category>;
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categories = this.categoryService.getChildCategories();
        if (this.selectedCategories === undefined) {
            this.selectedCategories = new Array<Category>();
        } else {
            this.outputCategories = JSON.parse(JSON.stringify(this.selectedCategories));
        }
    }

    isCategorySelected(category: Category) {
        if (this.outputCategories) {
            return this.outputCategories.find((x) => x.id === category.id) !== undefined;
        }
        return false;
    }

    onCategoryClick(categoryId: number) {
        const cat = this.outputCategories.find((x) => x.id === categoryId);
        if (cat) {
            this.outputCategories = this.outputCategories.filter((x) => x.id != categoryId);
        } else {
            const addCategory = this.categories.find((x) => x.id === categoryId);
            if (addCategory) {
                this.outputCategories.push(addCategory);
            }
        }
    }

    onSubmitClick() {
        this.onSubmit.emit(this.outputCategories);
    }

    onDismissClick() {
        this.onDismiss.emit();
    }

    public getIcon(title: string): string {
        return this.categoryService.getCategoryIcon(title);
    }

    onSearch(searchInput: string) {
        let newCategories = this.categoryService.getChildCategories();
        this.categories = newCategories.filter(x => x.title.toLowerCase().indexOf(searchInput)>-1);
    }
}
