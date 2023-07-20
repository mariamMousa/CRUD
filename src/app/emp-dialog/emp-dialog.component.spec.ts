import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDialogComponent } from './emp-dialog.component';

describe('EmpDialogComponent', () => {
  let component: EmpDialogComponent;
  let fixture: ComponentFixture<EmpDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpDialogComponent]
    });
    fixture = TestBed.createComponent(EmpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
