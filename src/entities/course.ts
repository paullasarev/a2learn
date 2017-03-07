import {CourseStatus} from "../enums/course-status";

export class Course {
  public title: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public status: CourseStatus;

  constructor(title: string, description: string, startDate?: Date, endDate?: Date) {
    this.title = title;
    this.description = description;
    this.startDate = startDate ? startDate : new Date();
    this.endDate = endDate ? endDate : new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1);
  }
}
