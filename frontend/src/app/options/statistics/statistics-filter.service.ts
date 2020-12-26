import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFilterService {
  invokeStatisticsComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onStatisticsComponent(from: string, to: string, approved: string, inUse: string): void {
    this.invokeStatisticsComponentFunction.emit({ from, to, approved, inUse });
  }
}
