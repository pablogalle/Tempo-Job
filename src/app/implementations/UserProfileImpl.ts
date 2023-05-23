import {UserProfile} from "../interfaces/UserProfile";

export class UserProfileImpl implements UserProfile{

  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  birth_date: string;
  scores: { username: string; score: string };

  constructor(id: string, username: string, email: string, name: string, surname: string, birth_date: string, scores: { username: string; score: string }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.birth_date = birth_date;
    this.scores = scores;
  }
}
