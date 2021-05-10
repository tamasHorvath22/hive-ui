import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseErrorDialogComponent } from './database-error-dialog.component';

describe('DatabaseErrorDialogComponent', () => {
  let component: DatabaseErrorDialogComponent;
  let fixture: ComponentFixture<DatabaseErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
