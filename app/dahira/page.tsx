import LoginForm from "@/components/forms/LoginForm";
import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DahiraPage = async () => {
  const session = await getServerSession(options);
  if (session) redirect("/dahira/admin");
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <section className="space-y-4 w-full max-w-[350px] mb-8 text-center">
        <h1 className="text-2xl sm:text-4xl">Bienvenue 👋</h1>
        <p className="text-dark-700">
          Connectez vous pour acceder à la page d'admin.
        </p>
      </section>

      <LoginForm />
    </div>
  );
};

export default DahiraPage;
