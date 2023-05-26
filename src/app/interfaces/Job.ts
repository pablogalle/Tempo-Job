export interface Job{
  _id?:string,
  name:string,
  description: string,
  date_of_creation: number,
  creator : {
    userId: string,
    username: string
  }
}
