import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationNavbarComponent } from './registeration-navbar.component';

describe('RegisterationNavbarComponent', () => {
  let component: RegisterationNavbarComponent;
  let fixture: ComponentFixture<RegisterationNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterationNavbarComponent]
    });
    fixture = TestBed.createComponent(RegisterationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
