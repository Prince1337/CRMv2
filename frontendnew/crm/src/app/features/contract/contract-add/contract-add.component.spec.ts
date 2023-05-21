import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddComponent } from './contract-add.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContractAddComponent', () => {
  let component: ContractAddComponent;
  let fixture: ComponentFixture<ContractAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [HttpClient],
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
