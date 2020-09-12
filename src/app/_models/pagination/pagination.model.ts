export class PaginationModel<T> {
    pageNumber: number;
    pageSize: number;
    result: Array<T>;
    totalPages: number;
    totalRecords: number;
}
