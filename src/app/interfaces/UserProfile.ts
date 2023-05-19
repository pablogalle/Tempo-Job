export interface UserProfile{
  id: string,
  name: string,
  surname: string,
  username: string,
  birth_date: string,
  scores: {
    username: string,
    score: string
  }
}
