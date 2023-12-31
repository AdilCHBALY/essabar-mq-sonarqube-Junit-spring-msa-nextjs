"use client";

import Logo from "@/public/img/register.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string(),
  password: z
    .string()
    .min(2, { message: "password must be at least 10 characters" }),
});

type RegisterFormValues = z.infer<typeof formSchema>;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex-1">
        <div className="flex items-center justify-center h-screen bg-primary/60">
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex text-white items-center text-primary gap-x-2 font-semibold text-3xl">
              <Leaf className="w-16 h-16" />
              BeaverHub
            </div>
            <p className="font-light text-white text-3xl text-primary/70">
              Create a new Account
            </p>
            <p>
              Already have an account ?{" "}
              <Link className="text-blue-800 underline" href={"/login"}>
                Login
              </Link>
            </p>
            <Separator className="h-[3px]" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-black dark:text-white"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black dark:text-white"
                          {...field}
                          type="email"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="text-black dark:text-white"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  variant="outline"
                  className="text-black dark:text-white"
                >
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-[60vw] h-screen">
        <Image src={Logo} alt="image" className="h-full object-cover" />
      </div>
    </div>
  );
};

export default Page;
