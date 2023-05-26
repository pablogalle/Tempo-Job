import {Job} from "../interfaces/Job";

export class JobImpl implements Job{
  creator: { userId: string; username: string };
  date_of_creation: number;
  description: string;
  name: string;

  constructor(creator: { userId: string; username: string }, date_of_creation: number, description: string, name: string) {
    this.creator = creator;
    this.date_of_creation = date_of_creation;
    this.description = description;
    this.name = name;
  }
}
