import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../entities/course';
import { filter } from 'lodash';

@Pipe({name: 'filterBy'})
export class FilterByPipe implements PipeTransform {
  transform(courses: Course[], filterStr): Course[] {
    if (!filterStr) {
      return courses;
    }
    return filter(courses, (course)=>(
      course.title.toLowerCase()
        .includes(filterStr.toLowerCase())
    ));
  }
}
