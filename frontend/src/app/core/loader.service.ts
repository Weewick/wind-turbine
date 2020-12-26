import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';


@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject(false);

    constructor() {}
}
