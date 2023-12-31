import { Car } from "./Car.model"

export type Client={
    id:number
    fullName:string
    email:string
    cars:Car[]
}