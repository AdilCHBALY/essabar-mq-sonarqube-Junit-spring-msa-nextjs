"use client";

import React, { useEffect, useState } from "react";
import VehiculeClient from "./components/client";
import { Client } from "@/models/Client.model";
import axios from "axios";
import Loader from "@/components/Loader";

const Page = () => {
  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState(true);

  const getCurrentUserCar = async () => {
    try {
      setLoading(true);
      const client_res = await axios.get(
        `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/1`
      );
      setClient(client_res.data);
      console.log(client_res.data);
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
      <div className="flex-1 p-8 pt-6">
        <VehiculeClient
          //@ts-ignore
          data={client?.cars}
        />
      </div>
    </div>
  );
};

export default Page;
