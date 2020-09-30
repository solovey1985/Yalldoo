import { TestBed } from "@angular/core/testing";

import { CategoryService } from "./category.service";
import { exec } from "child_process";
import { CategoryModel } from "app/_models/category/category.model";

describe("CategoryService", () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return categories", () => {
    const expectedCategories = new Array<CategoryModel>();
    expect(service.getCategories(5)).toEqual(expectedCategories);
  });
});
