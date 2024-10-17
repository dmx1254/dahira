"use client";

import React, { useState } from "react";
import { formSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import FileUploader from "../FileUploader";
import { convertFileToBase64, dahirasName } from "@/lib/utils";
import { registerTalibe } from "@/lib/actions";
import { toast } from "sonner";

import { Loader } from "lucide-react";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      dahiraname: "",
      profile: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const picture = await convertFileToBase64(values.profile[0]);
      const data = {
        ...values,
        profile: picture,
      };

      const patient = await registerTalibe(data);
      if (patient.user) {
        setIsLoading(false);
        toast.success(patient.message, {
          style: { color: "green" },
        });
        form.reset();
      }
    } catch (error: any) {
      if (error?.message) {
        toast.error(error?.message, {
          style: { color: "red" },
        });
      }
    }
    setIsLoading(false);
  }
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className="bg-[#ffffff] p-3 rounded w-full max-w-[400px] z-50"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom et nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex. Thierno Cheikh TALL"
                    className="bg-white border-gray-400 text-black outline-none focus-visible:ring-0"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dahiraname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du dahira</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border border-gray-400 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0">
                      <SelectValue placeholder="Selectionner un dahira" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-400">
                      <SelectGroup>
                        <SelectLabel>Nom du dahira</SelectLabel>
                        {dahirasName.map((dahira) => (
                          <SelectItem
                            key={dahira}
                            value={dahira}
                            className="uppercase"
                          >
                            {dahira}
                          </SelectItem>
                        ))}

                        <SelectLabel>Autres</SelectLabel>
                        <SelectItem value="konu ucad" className="uppercase">
                          Konu Ucad
                        </SelectItem>
                        <SelectItem value="konu ugb" className="uppercase">
                          Konu UGB
                        </SelectItem>
                        <SelectItem value="konu national" className="uppercase">
                          Konu National
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo de carte membre</FormLabel>
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
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
            {isLoading ? "Chargement" : "Envoyer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
