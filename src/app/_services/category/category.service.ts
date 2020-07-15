import { Injectable } from "@angular/core";
import { Category } from "app/_models/category/category.model";


var categories: Category[] = [
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
    },
    {
        id: 3,
        title: "Friends"
    },
    {
        id: 301,
        title: "Beer",
        parrentId: 3
    },
    {
        id: 302,
        title: "Gaming",
        parrentId: 3
    },
    {
        id: 303,
        title: "Travelling",
        parrentId: 3
    },
];

var categoryIconMap = new Map<string, string>()
categoryIconMap.set("football", "fa-futbol-o");
categoryIconMap.set("basketball", "fa-child");
categoryIconMap.set("volleyball", "fa-child");
categoryIconMap.set("cinema", "fa-film");
categoryIconMap.set("theater", "fa-mask");
categoryIconMap.set("concert", "fa-object-group");
categoryIconMap.set("theater", "fa-object-group");
categoryIconMap.set("party", "fa-birthday-cake");
categoryIconMap.set("travelling", "fa-globe");
categoryIconMap.set("bycicle", "fa-bicycle");
categoryIconMap.set("gaming", "fa-gamepad");
categoryIconMap.set("animals", "fa-paw");
categoryIconMap.set("beer", "fa-beer");


@Injectable({
    providedIn: "root"
})
export class CategoryService {
    constructor() {}

    public getCategories(ammount?: number): Category[] {
      return categories;
    }

    public getChildCategories(parrentId?: number): Array<Category>{
        if (parrentId) {
            return categories.filter(x => x.parrentId === parrentId);
        }
        else {
            const cats = categories.filter(x => x.parrentId != undefined); 
            return cats;
        }
    }

    public getCategoryIcon(title: string) {
        var icon = categoryIconMap.get(title.toLowerCase());
        if (!icon) {
            return "fa-sun-o";
        }
        else {
            return icon;
        }
    }
}
