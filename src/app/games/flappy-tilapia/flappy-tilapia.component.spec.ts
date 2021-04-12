import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlappyTilapiaComponent } from './flappy-tilapia.component';

describe('FlappyTilapiaComponent', () => {
  let component: FlappyTilapiaComponent;
  let fixture: ComponentFixture<FlappyTilapiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlappyTilapiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlappyTilapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
