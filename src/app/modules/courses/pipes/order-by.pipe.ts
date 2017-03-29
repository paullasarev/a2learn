import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../entities/course';
import { sortBy } from 'lodash';

@Pipe({name: 'orderByDate'})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[]): Course[] {
    return sortBy(courses, 'creatingDate');
  }
}
