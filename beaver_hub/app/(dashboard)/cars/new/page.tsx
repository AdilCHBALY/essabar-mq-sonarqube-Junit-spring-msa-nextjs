"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import CarCard from "@/components/car/CarCard";
import { useEffect, useState } from "react";
import { Car } from "@/models/Car.model";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/Loader";

const Page = () => {
  const [cars, setCars] = useState<Car[] | null>();
  const [loading, setLoading] = useState(true);

  const getCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://192.168.13.1:8888/CAR-SERVICE/api/car"
      );
      setCars(res.data);
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
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex-col space-y-4">
            <Heading title="Car Gallery" subtitle="Choose Your Car" />
            <Separator />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              //@ts-ignore
              cars.map((data, index) => (
                <CarCard key={index} data={data} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
