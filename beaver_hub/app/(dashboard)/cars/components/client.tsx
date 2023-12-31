"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { VehiculeColumn, columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";

interface VehiculeClientProps {
  data: VehiculeColumn[];
}

const VehiculeClient: React.FC<VehiculeClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Vehicules (${data?.length})`}
          subtitle="Manage your Vehicules"
        />
        <Button onClick={() => router.push(`/cars/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Vehicule
        </Button>
      </div>
      <Separator className="mt-5" />
      <DataTable searchKey="description" columns={columns} data={data} />
    </>
  );
};

export default VehiculeClient;
