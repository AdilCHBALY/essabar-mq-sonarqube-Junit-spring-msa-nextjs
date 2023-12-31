"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, DollarSign, Fuel } from "lucide-react";
import CarList from "@/components/car/CarList";
import Overview from "@/components/OverView";
import axios from "axios";
import { Client } from "@/models/Client.model";
import {
  calculateCashConsumption,
  calculateFuelConsumption,
} from "@/lib/utils";
import Loader from "@/components/Loader";
import { Consumption } from "@/models/Consumption.model";

const Page = () => {
  const [client, setClient] = useState<Client>();
  const [consumption, setConsumption] = useState<Consumption[]>();
  const [loading, setLoading] = useState(true);

  const getCurrentUserCar = async () => {
    try {
      setLoading(true);
      const client_res = await axios.get(
        `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/1`
      );
      const consumption_res = await axios.get(
        "http://192.168.13.1:8888/FUEL-CONSUM-SERVICE/api/consumption/client/1"
      );
      setClient(client_res.data);
      setConsumption(consumption_res.data);
      console.log(consumption_res.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUserCar();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pr-0 pt-6">
        <div className="flex gap-x-4">
          <div className="space-y-4 flex-1">
            <Heading
              title="Dashboard"
              subtitle="Overview of your Fuel Energy"
            />
            <Separator />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cash Consumption
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateCashConsumption(
                      //@ts-ignore
                      consumption
                    )}{" "}
                    MAD
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Fuel Consumption
                  </CardTitle>
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateFuelConsumption(
                      //@ts-ignore
                      consumption
                    )}{" "}
                    L
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Number of Vehicule
                  </CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {client?.cars.length}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>OverView (Weekly Consumption)</CardTitle>
                <CardContent className="pl-0 pt-5 pb-0">
                  <Overview
                    //@ts-ignore
                    data={consumption}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <div className="w-[400px]">
            <div className="sticky right-0 top-16">
              <CarList
                //@ts-ignore
                client={client}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
