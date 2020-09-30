import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CategoryModel } from "app/_models/category/category.model";
import { CategoryService } from "app/_services/category/category.service";

@Component({
    selector: "app-categories-preference-editor",
    templateUrl: "./categories-preference-editor-modal.component.html",
    styleUrls: ["./categories-preference-editor-modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPreferenceEditorComponent implements OnInit {
    @Input("categories")
    selectedCategories: Array<CategoryModel>;
    @Output()
    onSubmit: EventEmitter<CategoryModel[]> = new EventEmitter<CategoryModel[]>();
    @Output()
    onDismiss: EventEmitter<any> = new EventEmitter();

    categories: Array<CategoryModel>;
    outputCategories: Array<CategoryModel>;
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categories = this.categoryService.getChildCategories();
        if (this.selectedCategories === undefined) {
            this.selectedCategories = new Array<CategoryModel>();
        } else {
            this.outputCategories = JSON.parse(JSON.stringify(this.selectedCategories));
            this.categories.sort(this.sortCategoryPreferences());
        }
    }

    isCategorySelected(category: CategoryModel) {
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
        const newCategories = this.categoryService.getChildCategories();
        this.categories = newCategories.filter((x) => x.title.toLowerCase().indexOf(searchInput) > -1);
    }

    private sortCategoryPreferences(): (a: CategoryModel, b: CategoryModel) => number {
        return (a, b) => {
            if (this.isCategorySelected(a) && this.isCategorySelected(b)) {
                return 0;
            } else if (this.isCategorySelected(a)) {
                return -1;
            }
            return 1;
        };
    }
}
