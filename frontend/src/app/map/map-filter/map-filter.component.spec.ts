import { MapFilterComponent } from './map-filter.component';
import { LoaderService } from 'src/app/core';
import { NgForm } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('MapFilter', () => {
  let filter: MapFilterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MapFilterComponent, LoaderService ],
      imports: [ ]
        });
    filter = TestBed.inject(MapFilterComponent);
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
