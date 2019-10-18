import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@NgModule({
    imports: [
    ],
})


@Injectable()
export default class SettingModel {

    constructor(public http: HttpClient) {
    }
    // tslint:disable-next-line:member-ordering
    static saveInLocal(key, val): void {
        localStorage.setItem(key, val);
    }
    // tslint:disable-next-line:member-ordering
    static getBaseAPI() {
        return '9f65886a263c4e1eb968be4a76fe46bb';
    }
    // tslint:disable-next-line:member-ordering
    static getFromLocal(key, callback): void {
        return callback(localStorage.getItem(key));
    }
}
