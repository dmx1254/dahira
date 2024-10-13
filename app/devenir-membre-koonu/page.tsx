import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import React from "react";

const DevenirMembreKoonu = () => {
  return (
    <div className="relative w-full flex min-h-screen flex-col items-center justify-center home p-4">
      <div className="absolute left-[2%] top-[1%] max-lg:hidden">
        <Image
          src="/images/ser.jpeg"
          alt="logo"
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="rounded-[10px]"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center my-8">
        <RegisterForm />
      </div>
      <div className="absolute right-[2%] bottom-[1%] max-lg:hidden">
        <Image
          src="/images/carte.jpeg"
          alt="logo"
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="rounded-[10px]"
        />
      </div>
    </div>
  );
};

export default DevenirMembreKoonu;
