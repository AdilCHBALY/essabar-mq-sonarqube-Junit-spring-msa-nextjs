import React from "react";
import Image from "next/image";
import { Fuel, Gauge } from "lucide-react";
import OnOff from "./OnOff";
import { Car as CarModel } from "@/models/Car.model";

const CarItem = ({ car }: { car: CarModel }) => {
  return (
    <div className="bg-muted mr-4 py-3 px-1 rounded-md">
      <div className="flex-1 flex items-center justify-around">
        <Image
          src={car.picture}
          alt="CarImage"
          className="object-cover rounded-full"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "60px", height: "60px" }}
        />
        <div className="flex-1 ml-5 flex-col space-y-2">
          <div className="text-md font-semibold hover:underline cursor-pointer text-start w-full uppercase">
            {car.brand} - {car.model}
          </div>
          <div className="flex items-center gap-x-4 text-xs">
            <div>
              <Fuel className="h-4 w-4" />
              30/{car.tankSize} L
            </div>
            <div>
              <Gauge className="h-4 w-4" />
              {car.consumptionPerKm} L/Km
            </div>
          </div>
        </div>
        <div className="mr-2 flex-col space-y-2">
          <OnOff />
        </div>
      </div>
    </div>
  );
};

export default CarItem;
