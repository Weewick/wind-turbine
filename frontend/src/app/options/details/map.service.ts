import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  invokeDetailComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onDetailComponent(wkaId: string): void {
    this.invokeDetailComponentFunction.emit({ wkaId });
  }
}
