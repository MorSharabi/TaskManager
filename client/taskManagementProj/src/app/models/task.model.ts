export class Task {
  constructor(
    public _id = '',
    public userName = '',
    public title = '',
    public description = '',
    public priority = 1,
    public isDone = false
  ) {}
}
