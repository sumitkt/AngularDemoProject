import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodviewComponent } from './podview.component';

describe('PodviewComponent', () => {
  let component: PodviewComponent;
  let fixture: ComponentFixture<PodviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
