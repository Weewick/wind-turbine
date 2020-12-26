import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClickService } from './click.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OptionsComponent implements OnInit {
  index = 0;

  constructor(private clickService: ClickService) { }

  ngOnInit(): void {
    if (this.clickService.subsVar === undefined) {
      this.clickService.subsVar = this.clickService.
      invokeOptionsComponentFunction.subscribe(() => {
        this.jumpToDetails();
      });
    }
  }

  jumpToDetails(): void {
    if (this.index !== 0) {
      this.index = 0;
    }
  }
}
