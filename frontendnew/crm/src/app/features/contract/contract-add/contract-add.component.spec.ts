import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddComponent } from './contract-add.component';

describe('ContractAddComponent', () => {
  let component: ContractAddComponent;
  let fixture: ComponentFixture<ContractAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractAddComponent]
    });
    fixture = TestBed.createComponent(ContractAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
