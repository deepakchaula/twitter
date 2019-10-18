import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import SettingModel from '../settings';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ModalService {
    public customAPI;

    constructor(private http: HttpClient) {
        this.customAPI = SettingModel.getBaseAPI();
    }

    getSourceNews(modalTitle: string) {
        return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + modalTitle + '&apiKey=' + this.customAPI);
    }
}
