import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSesion } from './selectSesion.page';

describe('SelectSesion', () => {
  let component: SelectSesion;
  let fixture: ComponentFixture<SelectSesion>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
