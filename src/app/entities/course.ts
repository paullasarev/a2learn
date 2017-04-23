import {CourseStatus} from "../enums/course-status";
import {Author, Authors} from "./author";

export class Course {
  public id: string;
  public title: string;
  public description: string;
  public creatingDate: Date;
  public duration: number;
  public topRated: boolean;

  public authors: Authors;
  public status: CourseStatus = CourseStatus.Draft;

  constructor(
    id?:string,
    title?: string,
    description?: string,
    duration?: number,
    topRated?: boolean,
    creatingDate?: Date,
    authors?: Authors) {
    this.id = id || "";
    this.title = title || "";
    this.description = description || "";
    this.duration = duration || 0;
    this.topRated = topRated || false;
    this.creatingDate = creatingDate || new Date();
    this.authors = authors || [];
  }
}

export type Courses = Array<Course>;

export interface Filter {
  start: number;
  count: number;
  query: string;
  sort: string;
  reverse: boolean;
}

