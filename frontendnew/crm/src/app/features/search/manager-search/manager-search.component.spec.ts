import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSearchComponent } from './manager-search.component';

describe('ManagerSearchComponent', () => {
  let component: ManagerSearchComponent;
  let fixture: ComponentFixture<ManagerSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSearchComponent]
    });
    fixture = TestBed.createComponent(ManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
