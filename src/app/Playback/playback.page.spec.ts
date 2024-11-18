import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Playback } from './playback.page';

describe('Playback', () => {
  let component: Playback;
  let fixture: ComponentFixture<Playback>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Playback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
