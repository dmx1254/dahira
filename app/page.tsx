import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full flex min-h-screen flex-col items-center justify-center home p-4">
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
      {/* <div className="absolute left-[78%] top-[1%]">
        <p
          className="max-w-[300px] text-center italic text-base p-1 rounded"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Le script doit permettre de collecter de manière efficace et sécurisée
          les informations des membres de chaque Dahira affilié au Konu Cheikh
          Oumar Foutiyou Tall. L'objectif est de centraliser ces données dans
          une base de données unique qui sera utilisée pour la génération de
          cartes membres numériques.
        </p>
      </div> */}

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
    </main>
  );
}
