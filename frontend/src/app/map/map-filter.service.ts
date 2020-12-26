import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class MapFilterService {

  invokeMapComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onMapComponent(from: string, to: string, approved: string, inUse: string): void {
    this.invokeMapComponentFunction.emit({ from, to, approved, inUse });
  }
}
