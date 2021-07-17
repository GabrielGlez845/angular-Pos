import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroDepositoComponent } from './retiro-deposito.component';

describe('RetiroDepositoComponent', () => {
  let component: RetiroDepositoComponent;
  let fixture: ComponentFixture<RetiroDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetiroDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
