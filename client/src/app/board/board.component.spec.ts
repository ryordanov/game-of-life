import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize grid with correct dimensions', () => {
    expect(component.grid.length).toBe(component.config.rows);
    expect(component.grid[0].length).toBe(component.config.cols);
  });

  it('should step to next generation without throwing', () => {
    component.reset();
    expect(() => component.step()).not.toThrow();
  });
});
