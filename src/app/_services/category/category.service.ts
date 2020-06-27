import { Injectable } from "@angular/core";
import { Category } from "app/_models/category/category.model";


const categories: Category[] = [
    {
        id: 1,
        title: "Sport"
    },
    {
        id: 101,
        title: "Football",
        parrentId: 1
    },
    {
        id: 102,
        title: "Basketball",
        parrentId: 1
    },
    {
        id: 103,
        title: "Volleyball",
        parrentId: 1
    },
    {
        id: 2,
        title: "Entertainment"
    },
    {
        id: 201,
        title: "Cinema",
        parrentId: 2
    },
    {
        id: 202,
        title: "Theater",
        parrentId: 2
    },
    {
        id: 203,
        title: "Concert",
        parrentId: 2
    }
];

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    constructor() {}

    public getCategories(ammount?: number): Category[] {
      return categories;
    }
}
