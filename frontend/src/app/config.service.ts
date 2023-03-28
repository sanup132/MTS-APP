import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient) {}

    get(): void {
        this.http.get("https://mockbin.org/bin/bbe7f656-12d6-4877-9fa8-5cd61f9522a9/view")
            .subscribe(x => {
                console.log('success', x)
            }, e => {
                console.log('error', e)
            })
    }
}
