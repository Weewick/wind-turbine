import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { DetailsComponent } from './details.component';
import { AppServiceService } from 'src/app/app-service.service';
import { MapService } from './map.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ AppServiceService, MapService ],
      imports: [ HttpClientTestingModule ],
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have defined mapService", () => {
    const mapServive = component["mapService"];

    expect(mapServive.subsVar).toBeDefined();
  });

  it("should call getByIdFromAPI on invokeDetailComponentFunction", () => {
    const mapServive = component["mapService"];

    expect(mapServive.subsVar).toBeDefined();

    const wkaId = '2';

    spyOn(mapServive.invokeDetailComponentFunction, 'emit').and.callThrough();
    spyOn(component as any, 'getByIdFromAPI');

    expect(mapServive.subsVar).toBeDefined();
  
    mapServive.onDetailComponent(wkaId);
  
    fixture.detectChanges();
    
    expect(mapServive.invokeDetailComponentFunction.emit).toHaveBeenCalledWith({ wkaId });
    expect((component as any).getByIdFromAPI).toHaveBeenCalledWith(wkaId);
  });

  it("should init data", () => {
    expect(component.arrayOfKeys).toBeDefined();
    expect(component.data).toEqual([
        {
          Betreiber: '/',
          Betriebsstättennummer: '/',
          Betriebsbezeichnung: '/',
          Ort: '/',
          Ortsteil: '/',
          Anlagennummer: '/',
          Anlagebezeichnung: '/',
          Kreis: '/',
          Gemeindeschlüssel: '/',
          Postleitzahl: '/',
          Leistung: '/',
          Status: '/',
          Nabenhöhe: '/',
          Rotordurchmesser: '/',
          Genehmigungsdatum: '/',
          Inbetriebnahmedatum: '/'
        }
    ]);
  });

  it("should init arrayOfKeys", () => {
    expect(component.arrayOfKeys).toBeDefined();
    expect(component.arrayOfKeys).toEqual([
        'Betreiber',
        'Betriebsstättennummer',
        'Betriebsbezeichnung',
        'Ort',
        'Ortsteil',
        'Anlagennummer',
        'Anlagebezeichnung',
        'Kreis',
        'Gemeindeschlüssel',
        'Postleitzahl',
        'Leistung',
        'Status',
        'Nabenhöhe',
        'Rotordurchmesser',
        'Genehmigungsdatum',
        'Inbetriebnahmedatum'
    ]);
  });

  it("should call getById from Service on getByIdFromAPI", () => {
    const service = component["service"];
    const wkaId = '2';

    spyOn(component as any, 'getByIdFromAPI').and.callThrough();
    spyOn(service, 'getById').and.returnValue(of([]));
  
    (component as any).getByIdFromAPI(wkaId);
  
    fixture.detectChanges();

    expect((component as any).getByIdFromAPI).toHaveBeenCalledWith(wkaId);
    expect(service.getById).toHaveBeenCalledWith(wkaId);
    expect(component.data).toEqual([]);
  });

  it("should call getById from Service on getByIdFromAPI and throw error", () => {
    const service = component["service"];
    const wkaId = '2';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getByIdFromAPI').and.callThrough();
    spyOn(service, 'getById').and.returnValue(throwError(error));
  
    (component as any).getByIdFromAPI(wkaId);
  
    fixture.detectChanges();

    expect((component as any).getByIdFromAPI).toHaveBeenCalledWith(wkaId);
    expect(service.getById).toHaveBeenCalledWith(wkaId);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });
});