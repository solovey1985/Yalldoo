import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import LocationDto from "app/_models/location.dto";
import { CategoryDto } from "../models/categoryDto";
import { getCategoriesMock } from "../models/categoriesMock";
import { CategoryService } from "../../../_services/category/category.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    templateUrl: "./categories.component.html",
    styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit, OnDestroy {
    preferredCategories: CategoryDto[] = new Array<CategoryDto>();
    locations: LocationDto[] = new Array<LocationDto>();
    private destroy$ = new Subject<void>();

    constructor(private router: Router, private notify: NotifyService, private categoriesService: CategoryService) {}

    get isPreferenceSelected(): boolean {
        return this.preferredCategories.some((x) => x.isSelected);
    }

    ngOnInit(): void {
        this.categoriesService.loadAllCategories()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(categories => this.preferredCategories = categories);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    onCardSelected(id: number) {
        const preference = this.preferredCategories.find((x) => x.id === id);
        if (preference) {
            preference.isSelected = !preference.isSelected;
        }
    }

    onPreferencesConfirm(): void {
        const selectedIds = this.preferredCategories.filter(d => d.isSelected).map(x => x.id);
        this.categoriesService.saveProfileCategories(selectedIds).subscribe(x => {
            this.notify.info("Preferences were saved");
            setTimeout(() => this.router.navigate(["/me"]), 3000);    
        });
        
    }
}
