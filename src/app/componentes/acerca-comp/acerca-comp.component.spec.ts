import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaCompComponent } from './acerca-comp.component';

describe('AcercaCompComponent', () => {
  let component: AcercaCompComponent;
  let fixture: ComponentFixture<AcercaCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcercaCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercaCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
