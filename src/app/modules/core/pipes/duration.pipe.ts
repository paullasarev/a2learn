import { Pipe, PipeTransform } from '@angular/core';
/*
 * Takes a duratio in minutes and treansforms to hrs and minutes (90)->'1h 30min'.
 * Usage:
 *   value | duration
 * Example:
 *   {{ 90 |  duration}}
 *   formats to: 1h 30min
 */
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    let hrs = Math.floor(value / 60);
    let mins = value % 60;

    let shrs = hrs ? `${hrs}h` : '';
    let smins = mins ? `${mins}min` : '';

    return shrs + ((!!shrs&&!!mins) ? ' ' : '') + smins;
  }
}
