import { Component } from '@angular/core';
import { PeriodService } from '../../core/period.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-period',
  imports: [CommonModule, FormsModule],
  templateUrl: './period.html',
  styleUrl: './period.scss',
})
export class Period {
  startDate: string = '';
  cycleLength: number | null = null;
  message: string = '';

  constructor(private periodService: PeriodService){}

  onSubmit() {
    this.message = '';
    if (!this.startDate || !this.cycleLength) {
      // check for localization
      this.message = 'Please fill in all fields';
      return;
    }

    this.periodService.logPeriod({
      startDate: this.startDate,
      cycleLength: this.cycleLength,
    }).subscribe({
      next: (resp) => {
        console.log('API success:', resp);
        this.message = `Period logged successfully!\n${resp}`;
        this.startDate = '';
        this.cycleLength = null;
      },
      error: (err) => {
        console.error('API error:', err);
        this.message = `Error: ${err.error?.message || 'Server error'}`;
      },
    });
  }
}
