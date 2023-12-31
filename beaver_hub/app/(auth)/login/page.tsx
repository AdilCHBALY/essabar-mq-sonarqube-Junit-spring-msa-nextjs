"use client";

import Logo from "@/public/img/logo.jpg";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(2, { message: "password must be at least 10 characters" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      if (values.password === "123456789") {
        router.push("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[70vw] h-screen">
        <Image src={Logo} alt="image" objectFit="contain" className="h-full" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-center">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center text-primary gap-x-2 font-semibold text-3xl">
              <Leaf className="w-16 h-16" />
              BeaverHub
            </div>
            <p className="font-light text-3xl text-primary/70">
              Login to your account
            </p>
            <p>
              Dont have an account ?{" "}
              <Link className="text-blue-500 underline" href={"/register"}>
                Sign up
              </Link>
            </p>
            <Separator className="h-[3px] bg-primary" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" disabled={loading} />
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
                        <FormLabel className="font-semibold">
                          Mot de passe
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={loading} type="submit">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
