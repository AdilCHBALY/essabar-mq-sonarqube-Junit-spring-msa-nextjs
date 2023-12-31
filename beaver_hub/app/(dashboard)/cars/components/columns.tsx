"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./ActionButton";
import Image from "next/image";
import { calculateTankSize, cn, getTankStatus } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VehiculeColumn = {
  picture: string;
  description: string;
  currentTankSize: number;
  tankSize: number;
  consumptionPerKm: number;
  status: boolean;
  id: number;
  car_id: number;
};

export const columns: ColumnDef<VehiculeColumn>[] = [
  {
    accessorKey: "picture",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.picture}
        alt={row.original.description}
        className="object-cover"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "70px" }}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Name",
    cell: ({ row }) => (
      <div className="hover:underline cursor-pointer uppercase">
        {row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "currentTankSize",
    header: "Tank",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-4">
        <Progress
          className={
            getTankStatus(
              row.original.currentTankSize,
              row.original.tankSize
            ) === -1
              ? "bg-rose-500"
              : getTankStatus(
                  row.original.currentTankSize,
                  row.original.tankSize
                ) === 0
              ? "bg-orange-500"
              : getTankStatus(
                  row.original.currentTankSize,
                  row.original.tankSize
                ) === 1
              ? "bg-emerald-400"
              : "bg-emerald-700"
          }
          value={calculateTankSize(
            row.original.currentTankSize,
            row.original.tankSize
          )}
        />
        <div>
          {row.original.currentTankSize.toFixed(2)} L / {row.original.tankSize}{" "}
          L
        </div>
      </div>
    ),
  },
  {
    accessorKey: "consumptionPerKm",
    header: "ConsumptionPerKM",
    cell: ({ row }) => (
      <div>{row.original.consumptionPerKm.toFixed(2)} L / Km</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "h-4 w-4 rounded-full",
          row.original.status
            ? "bg-emerald-500 animate-pulse"
            : "bg-muted-foreground"
        )}
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
