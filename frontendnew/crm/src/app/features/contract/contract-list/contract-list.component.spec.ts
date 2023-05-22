import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListComponent } from './contract-list.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractListComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
