import {CourseStatus} from "../enums/course-status";

export class Course {
  public id: string;
  public title: string;
  public description: string;
  public creatingDate: Date;
  public duration: number;
  public topRated: boolean;

  public status: CourseStatus = CourseStatus.Draft;

  constructor(
    id?:string,
    title?: string,
    description?: string,
    duration?: number,
    topRated?: boolean,
    creatingDate?: Date) {
    this.id = id || "";
    this.title = title || "";
    this.description = description || "";
    this.duration = duration || 0;
    this.topRated = topRated || false;
    this.creatingDate = creatingDate || new Date();
  }
}

export type Courses = Array<Course>;

export interface Filter {
  start: number;
  count: number;
  query: string;
  sort: string;
}

