import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { MapComponent } from './map.component';
import { AppServiceService } from '../app-service.service';
import { MapFilterService } from './map-filter.service';
import { MapService } from '../options/details/map.service';
import { ClickService } from '../options/click.service';
import { LoaderService } from '../core';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ AppServiceService, MapService, MapFilterService, ClickService, LoaderService ],
      imports: [ HttpClientTestingModule ],
      declarations: [ MapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have defined mapFilterService", () => {
    const mapFilterServive = component["mapFilterService"];

    expect(mapFilterServive.subsVar).toBeDefined();
  });

  it("should call getCoordinatesFromAPI on invokeMapComponentFunction", () => {
    const mapFilterServive = component["mapFilterService"];

    expect(mapFilterServive.subsVar).toBeDefined();
    
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(mapFilterServive.invokeMapComponentFunction, 'emit').and.callThrough();
    spyOn(component as any, 'getCoordinatesFromAPI');
  
    mapFilterServive.onMapComponent(from, to, approved, inUse);
  
    fixture.detectChanges();
    
    expect(mapFilterServive.invokeMapComponentFunction.emit)
        .toHaveBeenCalledWith({ from, to, approved, inUse });
    expect((component as any).getCoordinatesFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
  });

  it("should call getCoordinatesFromAPI on Init", () => {  
    spyOn(component as any, 'getCoordinatesFromAPI');

    component.ngOnInit()

    expect((component as any).getCoordinatesFromAPI).toHaveBeenCalled();
  });

  it("should call initMap after ViewInit", () => {  
    spyOn(component as any, 'initMap');

    component.ngAfterViewInit()

    expect((component as any).initMap).toHaveBeenCalled();
    expect(component["map"]).toBeDefined();
  });

  it("should call drawMarkers", () => {  
    spyOn(component as any, 'drawMarkers').and.callThrough();

    component.drawMarkers()

    expect((component as any).drawMarkers).toHaveBeenCalled();
    expect(component["map"]).toBeDefined();
    expect(component["markers"]).toBeDefined();
  });

  it("should call getCoordinates from Service on getCoordinatesFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(component as any, 'getCoordinatesFromAPI').and.callThrough();
    spyOn(service, 'getCoordinates').and.returnValue(of([]));
  
    (component as any).getCoordinatesFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getCoordinatesFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getCoordinates).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(component.coordinateList).toEqual([]);
    expect(component.listLength).toEqual(0);
  });

  it("should call getCoordinates from Service on getCoordinatesFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getCoordinatesFromAPI').and.callThrough();
    spyOn(service, 'getCoordinates').and.returnValue(throwError(error));
  
    (component as any).getCoordinatesFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getCoordinatesFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getCoordinates).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });
});