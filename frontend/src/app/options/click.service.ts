import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  invokeOptionsComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onOptionsComponent(): void {
    this.invokeOptionsComponentFunction.emit();
  }
}
