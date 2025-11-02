import { Component, signal } from '@angular/core';
import { Period } from './features/period/period';

@Component({
  selector: 'app-root',
  imports: [Period],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
