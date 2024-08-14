"use client";

import React, { useState } from "react";
import { loginFormSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";

import { Loader } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // try {
    setIsLoading(true);

    // console.log(values);
    const user = await signIn("credentials", {
      phone: values.phone,
      password: values.password,
      redirect: false,
    });
    if (user?.ok === false) {
      setIsLoading(false);
      toast.error(user?.error, {
        style: {
          color: "#ef4444",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    } else {
      router.push("/dahira/admin");
    }
    setIsLoading(false);
  }
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className="bg-[#ffffff] p-3 rounded w-full max-w-[350px] z-50"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="SN"
                    placeholder="+221"
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className="input-phone"
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    className="bg-white border-gray-400 text-black focus-visible:ring-0"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="flex items-center gap-1 w-full bg-green-600 text-white hover:bg-green-700"
          >
            {isLoading && <Loader size={18} className="animate-spin" />}
            {isLoading ? "Chargement" : "Se connecter"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
