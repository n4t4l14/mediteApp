import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Configmod } from './configmod.page';

describe('Configmod', () => {
  let component: Configmod;
  let fixture: ComponentFixture<Configmod>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Configmod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
