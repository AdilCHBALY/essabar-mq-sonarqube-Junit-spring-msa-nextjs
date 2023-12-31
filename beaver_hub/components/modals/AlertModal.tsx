"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStoreModal } from "@/hooks/UseModal";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const AlertModal = () => {
  const { isOpen, onClose, data, type } = useStoreModal();
  const [loading, setLoading] = useState(true);
  const isModalOpen = isOpen && type == "TrashCar";
  const handleClose = () => {
    try {
      setLoading(true);
      axios.delete(
        `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/trash/${data?.car_id}`
      );
      toast.success("Car Removed from your collection");
      onClose();
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Trash the car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently trash{" "}
            <span className="font-semibold text-primary">
              {data?.description}
            </span>{" "}
            . You can still add it from our car gallery
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => handleClose()}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
