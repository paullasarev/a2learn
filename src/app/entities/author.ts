export class Author {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
  ){

  }
}

export type Authors = Array<Author>;
