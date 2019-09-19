import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarIncidenteComponent } from './reportar-incidente.component';

describe('ReportarIncidenteComponent', () => {
  let component: ReportarIncidenteComponent;
  let fixture: ComponentFixture<ReportarIncidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportarIncidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
