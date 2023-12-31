"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Car } from "@/models/Car.model";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const CarCard = ({ data }: { data: Car }) => {
  const [mouted, setMouted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMouted(true);
  }, []);

  if (!mouted) return null;

  const handleAdd = async () => {
    try {
      await axios.get(
        `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/affect/${data.id}`
      );
      router.push("/cars");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleClick = () => {
    router.push(`http://localhost:3000/cars/${data.id}`);
  };

  const handleKeyDown = () => {
    console.log("this is a useless KeyDown");
  };
  return (
    <Card className="hover:shadow-sm hover:shadow-primary transition">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="text-lg uppercase hover:underline transition cursor-pointer"
          >
            {data.description}
          </div>
          <Button size="icon" variant="ghost" onClick={handleAdd}>
            <Plus />
          </Button>
        </CardTitle>
        <CardContent className="w-full h-full flex items-center justify-center">
          <Image
            src={data.picture}
            alt={data.model}
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover"
            style={{ width: "100%", height: "150px" }}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CarCard;
