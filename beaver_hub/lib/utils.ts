import { Consumption } from "@/models/Consumption.model";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 

export interface HourlyTotal {
  time: string;
  total: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFirstTwoCharacters=(string:string) =>{
  if (string && string.length >= 2) {
    return string.substring(0, 2).toUpperCase();
  } else {
    return null;
  }
}

export const getTankStatus=(currentTank:number,tankSize:number)=>{
  if(currentTank <= tankSize/4) return -1
  if(currentTank < tankSize/2) return 0
  if(currentTank < tankSize) return 1
  return 2
}

export const calculateFuelConsumption=(cars:Consumption[])=>{
  const validCars = cars || [];
  const total= validCars.reduce((total, car) => total + car.gazPerLiter, 0);
  return total.toFixed(2);
}

export const calculateCashConsumption=(consumption:Consumption[])=>{
  const validCons = consumption || [];
  const total =  validCons.reduce((total, consumption) => total + consumption.price, 0);
  return total.toFixed(2);
}

export const calculateTankSize=(currentTank:number, tankSize:number)=>{
  return (100*currentTank)/tankSize
}

export const timeConverter = (data: Consumption[]) => {
  const validData = data || [];
  const result: HourlyTotal[] = Object.values(validData.reduce((accumulator, transaction) => {
      const date = new Date(transaction.createdAt);
      const hour = date.getHours();

      if (
        //@ts-ignore
        accumulator[hour]) {
          //@ts-ignore
          accumulator[hour].total += transaction.price;
      } else {
        //@ts-ignore
          accumulator[hour] = { hour: hour, total: transaction.price };
      }

      return accumulator;
  }, {}));

  return result;
};
