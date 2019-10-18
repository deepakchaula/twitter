export interface Photos {
    title: string;
    url: string;
    created_at: string;
    author: string;
}

export class PhotosObj implements Photos {
    title: string;
    url: string;
    created_at: string;
    author: string;

    constructor(item?: Photos) {
        if (item !== undefined) {
            // tslint:disable-next-line:forin
            for (const key in item) {
                try { this[key] = item[key]; } catch (e) { }
            }
        }
    }
}
