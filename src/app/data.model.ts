export interface PostData {
    id: any;
}

export class PostDataObj implements PostData {
    id: any;

    constructor(item?: PostData) {
        if (item !== undefined) {
            // tslint:disable-next-line:forin
            for (const key in item) {
                try { this[key] = item[key]; } catch (e) { }
            }
        }
    }
}
