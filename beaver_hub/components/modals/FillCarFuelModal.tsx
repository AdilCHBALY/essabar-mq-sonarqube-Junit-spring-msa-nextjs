"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStoreModal } from "@/hooks/UseModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  price: z.coerce
    .number()
    .min(1, { message: "Please enter a positive amount" }),
  gazPerLiter: z.coerce
    .number()
    .min(1, { message: "Please enter a positive amount" }),
});

type FillCarFuelValues = z.infer<typeof formSchema>;

const FillCarFuelModal = () => {
  const [loading, setLoading] = useState(false);
  const { onClose, isOpen, data, type } = useStoreModal();
  const isModalOpen = isOpen && type === "AddFuel";

  const form = useForm<FillCarFuelValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      gazPerLiter: 0,
    },
  });

  const onSubmit = async (values: FillCarFuelValues) => {
    const submited = {
      ...values,
      price: values.price * values.gazPerLiter,
      client_id: 1,
      car_id: data?.id,
    };

    try {
      setLoading(true);
      await axios.post(
        "http://192.168.13.1:8888/FUEL-CONSUM-SERVICE/api/consumption",
        submited
      );
      await axios.put(
        `http://192.168.13.1:8888/CLIENT-SERVICE/api/client/fuel/${data?.car_id}/${values.gazPerLiter}`
      );
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Fuel to{" "}
            <span className="text-primary font-semibold">
              {data?.description}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Fuel Cost (MAD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Fuel Cost"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gazPerLiter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Fuel Liter (L)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Fuel Liter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter
              className="flex items-center
            w-full"
            >
              <Button onClick={handleClose} variant="ghost">
                Cancel
              </Button>
              <Button type="submit" className="ml-auto" disabled={loading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FillCarFuelModal;
