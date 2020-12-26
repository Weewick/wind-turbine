import { StatisticsFilterComponent } from './statistics-filter.component';
import { LoaderService } from 'src/app/core';
import { NgForm } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('StatisticsFilter', () => {
  let filter: StatisticsFilterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ StatisticsFilterComponent, LoaderService ],
      imports: [ ]
        });
    filter = TestBed.inject(StatisticsFilterComponent);
  });

  it('should be created', () => {
    expect(filter).toBeTruthy();
  });

  it('should assign values in function', () => {
    const testForm = {
      value: {
          from: {
            _d: new Date(2015, 0, 1)
          },
          to: {
            _d: new Date(2020, 0, 1)
          },
          approved: 'true',
          inUse: 'true'
      }
    } as NgForm;

    spyOn(filter, 'submitFilter').and.callThrough();

    filter.submitFilter(testForm);
    expect(filter.submitFilter).toHaveBeenCalledWith(testForm);
  });
});
