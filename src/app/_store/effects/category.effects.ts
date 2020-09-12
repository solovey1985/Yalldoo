import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "app/_services/category/category.service";
import {
    CategoryActionsEnum,
    CategoriesLoadSuccessAction,
    CategoriesLoadFailedAction,
    CategoriesLoadAction
} from "../actions/category.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { CreateEventAction } from "../actions/events.actions";
import { Category } from "app/_models/category/category.model";
import { of } from "rxjs";

@Injectable()
export class CategoryEffects {
eventCreate$ = createEffect(() =>
        this.actions.pipe(
            ofType(CategoryActionsEnum.CATEGORIES_LOAD),
            switchMap((action: CategoriesLoadAction) => {
                return this.categoryService.loadCategories(action.payload).pipe(
                    map(
                        (categoies: Category[]) => new CategoriesLoadSuccessAction(categoies),
                        catchError((error) => of(new CategoriesLoadFailedAction(error)))
                    )
                );
            })
        )
    );
    constructor(private actions: Actions, private categoryService: CategoryService) {}
}
