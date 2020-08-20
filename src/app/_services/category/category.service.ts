import { Injectable } from "@angular/core";
import { Category } from "app/_models/category/category.model";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Config } from "../../_configs/config";
import { config } from "process";

var categories: Category[] = [
    {
        id: 1,
        title: "Sport"
    },
    {
        id: 2,
        title: "Football",
        parrentId: 1
    },
    {
        id: 11,
        title: "Basketball",
        parrentId: 1
    },
    {
        id: 2,
        title: "Volleyball",
        parrentId: 1
    },
    {
        id: 3,
        title: "Entertainment"
    },
    {
        id: 4,
        title: "Cinema",
        parrentId: 2
    },
    {
        id: 5,
        title: "Theater",
        parrentId: 2
    },
    {
        id: 6,
        title: "Concert",
        parrentId: 2
    },
    {
        id: 7,
        title: "Friends"
    },
    {
        id: 8,
        title: "Beer",
        parrentId: 3
    },
    {
        id: 9,
        title: "Gaming",
        parrentId: 3
    },
    {
        id: 10,
        title: "Travelling",
        parrentId: 3
    }
];

var categoryIconMap = new Map<string, string>();
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
    constructor(private http: HttpClient) {}

    public loadCategories(pagedRequest?: any): Observable<Category[]> {
        const url = `${Config.apiUrl}/category`;
        return this.http.get<any>(url).pipe(
            switchMap((response) => {
                const cats = Array.from<Category>(response.data.result);
                return of(cats);
            })
        );
    }

    public getCategories(ammount?: number): Category[] {
        return categories;
    }

    public getChildCategories(parrentId?: number): Array<Category> {
        if (parrentId) {
            return categories.filter((x) => x.parrentId === parrentId);
        } else {
            const cats = categories.filter((x) => x.parrentId != undefined);
            return cats;
        }
    }

    public getCategoryIcon(title: string) {
        var icon = categoryIconMap.get(title.toLowerCase());
        if (!icon) {
            return "fa-sun-o";
        } else {
            return icon;
        }
    }
}
