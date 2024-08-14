import LoginForm from "@/components/forms/LoginForm";
import React from "react";

const DahiraPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen my-8">
      <section className="space-y-4 w-full max-w-[350px] mb-8">
        <h1 className="text-5xl">Bienvenue 👋</h1>
        <p className="text-dark-700">
          Connectez vous pour acceder à la page d'admin.
        </p>
      </section>

      <LoginForm />
    </div>
  );
};

export default DahiraPage;
