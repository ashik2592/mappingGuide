import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHintErrorExampleComponent } from './select-hint-error-example.component';

describe('SelectHintErrorExampleComponent', () => {
  let component: SelectHintErrorExampleComponent;
  let fixture: ComponentFixture<SelectHintErrorExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectHintErrorExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHintErrorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
