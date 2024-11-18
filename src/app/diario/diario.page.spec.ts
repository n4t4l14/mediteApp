import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Diario } from './diario.page';

describe('Diario', () => {
  let component: Diario;
  let fixture: ComponentFixture<Diario>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Diario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
