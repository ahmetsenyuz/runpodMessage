export enum Status {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done"
}

export class BacklogItem {
  private _id: string;
  private _title: string;
  private _description: string;
  private _status: Status;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    status: Status,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): Status {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Setters
  set title(title: string) {
    this._title = title;
    this._updatedAt = new Date();
  }

  set description(description: string) {
    this._description = description;
    this._updatedAt = new Date();
  }

  set status(status: Status) {
    this._status = status;
    this._updatedAt = new Date();
  }

  // Serialization methods
  toJSON(): any {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString()
    };
  }

  static fromJSON(json: any): BacklogItem {
    const backlogItem = new BacklogItem(
      json.id,
      json.title,
      json.description,
      json.status,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
    return backlogItem;
  }
}