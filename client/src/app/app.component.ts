import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { BoardComponent } from './board/board.component';
import { BoardConfig } from '../../../server/src/types';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: string = '';
  response: string = '';
  error: string = '';
  config: BoardConfig | null = { rows: 50, cols: 50, size: 10, delay: 500 };
  @ViewChild('board') board!: BoardComponent;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getConfig().subscribe({
      next: (cfg: BoardConfig | null) => {
        this.config = cfg;
      },
      error: (err: { message: string; }) => {
        this.error = 'Config load error: ' + err.message;
      }
    });
  }

  sendMessage() {
    this.response = '';
    this.error = '';
    this.apiService.sendMessage(this.message).subscribe({
      next: (res) => {
        this.response = res.response;
      },
      error: (err) => {
        this.error = 'Error: ' + err.message;
      }
    });
  }

  onReset() {
    this.board.reset();
    this.apiService.sendMessage(`${new Date().toISOString()}: reset is pressed`).subscribe();
  }
}