import {CourseStatus} from "../enums/course-status";

export class Course {
  public id: string;
  public title: string;
  public description: string;
  public creatingDate: Date;
  public duration: number;
  public status: CourseStatus = CourseStatus.Draft;

  constructor(
    id:string,
    title: string,
    description: string,
    duration: number,
    creatingDate?: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.creatingDate = creatingDate ? creatingDate : new Date();
  }
}

export type Courses = Array<Course>;
