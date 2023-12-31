"use client";

import { VehiculeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Fuel, Power, PowerOff, Trash } from "lucide-react";
import { useState } from "react";
import { useStoreModal } from "@/hooks/UseModal";
import axios from "axios";
import toast from "react-hot-toast";

interface ActionButtonProps {
  data: VehiculeColumn;
}

const ActionButton: React.FC<ActionButtonProps> = ({ data }) => {
  const { onOpen } = useStoreModal();
  const [loading, setLoading] = useState(true);

  const handlePower = async () => {
    if (data.currentTankSize == 0) {
      toast.error("You need to Fill you Car !");
    } else {
      try {
        setLoading(true);
        await axios.get(
          `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/power/${data.car_id}`
        );
        window.location.reload();
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {!data.status ? (
        <Button
          onClick={handlePower}
          disabled={loading}
          size="icon"
          variant="outline"
          className="group text-emerald-700"
        >
          <Power className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={handlePower}
          disabled={loading}
          size="icon"
          variant="outline"
          className="group text-rose-700"
        >
          <PowerOff className="h-4 w-4" />
        </Button>
      )}
      <Button
        size="icon"
        disabled={loading}
        variant="outline"
        className="group"
        onClick={() =>
          onOpen(
            "AddFuel",
            //@ts-ignore
            data
          )
        }
      >
        <Fuel className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        disabled={loading}
        variant="outline"
        className="group text-rose-500"
        onClick={() =>
          onOpen(
            "TrashCar",
            //@ts-ignore
            data
          )
        }
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActionButton;
