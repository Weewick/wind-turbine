import { ClickService } from './click.service';
import { TestBed } from '@angular/core/testing';

describe('ClickService', () => {
  let clickEmit: ClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ClickService ],
      imports: [ ]
        });
        clickEmit = TestBed.inject(ClickService);
  });

  it('should be created', () => {
    expect(clickEmit).toBeTruthy();
  });

  it('should emit', () => {
    spyOn(clickEmit, 'onOptionsComponent').and.callThrough();

    clickEmit.onOptionsComponent();
    expect(clickEmit.onOptionsComponent).toHaveBeenCalled();
  });
});