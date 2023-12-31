"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Fuel, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car as CarModel } from "@/models/Car.model";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const Page = (params: { carId: string }) => {
  const [car, setCar] = useState<CarModel>();
  const [loading, setLoading] = useState(true);

  const getCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://192.168.13.1:8888/CAR-SERVICE/api/car/${params.params.carId}`
      );
      console.log(res.data);
      setCar(res.data);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-8 pt-6">
      <div className="flex-col space-y-4">
        <div className="flex gap-x-5">
          <Image
            //@ts-ignore
            src={car?.picture}
            //@ts-ignore
            alt={car?.brand}
            width={350}
            height={350}
            objectFit="cover"
          />
          <div className="flex-col space-y-2">
            <p className="text-3xl font-semibold underline uppercase">
              {car?.model} - {car?.brand}
            </p>
            <p className="text-lg text-muted-foreground uppercase">
              {car?.description}
            </p>
            <div className="flex items-center gap-x-4">
              <Fuel /> <span className="text-primary">{car?.fuelType}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                Consommation
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex-col space-y-4">
                <div className="flex items-center gap-x-2">
                  <h1 className="text-lg">Reservoir : </h1>
                  <p>{car?.tankSize} L</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <h1 className="text-lg">Consommation : </h1>
                  <p>{car?.consumptionPerKm.toFixed(2)} L / 100 Km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
