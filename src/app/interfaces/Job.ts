export interface Job{
  _id?:string,
  name:string,
  description: string,
  date_of_creation: Date,
  creator : {
    userId: string,
    username: string
  }
}
