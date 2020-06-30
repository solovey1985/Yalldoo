export class FirendListItem {
    public id: number;
    public firstName: string;
    public lastName: string;
    

    public get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    constructor(id?: number, firstName?: string, lastName?: string) {
        this.id = id!!;
        this.firstName = firstName!!;
        this.lastName = lastName!!;
    }
}