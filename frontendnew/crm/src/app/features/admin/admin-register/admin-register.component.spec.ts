import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterComponent } from './admin-register.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AdminRegisterComponent', () => {
  let component: AdminRegisterComponent;
  let fixture: ComponentFixture<AdminRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [HttpClient],
      declarations: [AdminRegisterComponent]
    });
    fixture = TestBed.createComponent(AdminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
