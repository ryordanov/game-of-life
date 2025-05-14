import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardConfig } from '../../../../server/src/types';

const DEFAULT_CONFIG = { rows: 50, cols: 50, size: 10, delay: 100 };

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges {
  private _config: BoardConfig = DEFAULT_CONFIG;

  @Input()
  get config(): BoardConfig {
    return this._config;
  }
  set config(value: BoardConfig | null) {
    this._config = value ?? DEFAULT_CONFIG;
  }

  grid: boolean[][] = [];
  running = false;
  intervalId: any;

  constructor() {
    this.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.reset();
    }
  }

  reset() {
    this.stop();
    this.grid = Array.from({ length: this.config.rows }, () => Array.from({ length: this.config.cols }, () => Math.random() > 0.9));
    this.start();
  }

  // toggleCell(row: number, col: number) {
  //   this.grid[row][col] = !this.grid[row][col];
  // }

  step() {
    /**
     *  state   | neighbors 0 1 2 3 4+
     *    1     | new state 0 0 1 1 0
     *    0     | new state 0 0 0 1 0
     */
    const tmp = this.grid.map(arr => [...arr]);
    for (let r = 0; r < this.config.rows; r++) {
      for (let c = 0; c < this.config.cols; c++) {
        const currentIsAlive = this.grid[r][c];
        const neighbors = this.countNeighbors(r, c);
        if (currentIsAlive) {
          if (neighbors === 2 || neighbors === 3) {
            tmp[r][c] = true;
          } else {
            tmp[r][c] = false;
          }
        } else {
          if (neighbors === 3) {
            tmp[r][c] = true;
          } else {
            tmp[r][c] = false;
          }
        }
      }
    }
    this.grid = tmp;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.intervalId = setInterval(() => {
      this.step();
    }, this.config.delay);
  }

  stop() {
    this.running = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  countNeighbors(row: number, col: number): number {
    const count: number =
      Number(this.grid.at(row - 1)?.at(col - 1) || 0) +
      Number(this.grid.at(row - 1)?.at(col) || 0) +
      Number(this.grid.at(row - 1)?.at(col + 1) || 0) +
      Number(this.grid.at(row)?.at(col - 1) || 0) +
      Number(this.grid.at(row)?.at(col + 1) || 0) +
      Number(this.grid.at(row + 1)?.at(col - 1) || 0) +
      Number(this.grid.at(row + 1)?.at(col) || 0) +
      Number(this.grid.at(row + 1)?.at(col + 1) || 0);
    return count;
  }
}
