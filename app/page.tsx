"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [collectError, setCollectError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);

  const handlePayClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/paycotisation", { method: "POST" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors du paiement");
      }

      const data = await response.json();
      console.log("Success:", data);
      // window.location.href = data.response_text;
    } catch (error: any) {
      setError(error.message);
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectClick = async () => {
    setCollectLoading(true);
    setCollectError(null);

    try {
      const response = await fetch("/api/collecte", { method: "POST" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors du paiement");
      }

      const data = await response.json();
      console.log("Success:", data);
      // window.location.href = data.response_text;
    } catch (error: any) {
      setCollectError(error.message);
      console.error("Error:", error.message);
    } finally {
      setCollectLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-6 py-4 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <span className="sr-only">Dahira koonu</span>
            <Image
              alt="koonu logo"
              height={100}
              width={100}
              src="/images/logo-koonu.png"
              className=""
            />
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/devenir-membre-koonu"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Devenir Membre <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 carte-membre">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Devenir membre du dahira de konu.{" "}
              <Link
                href="/devenir-membre-koonu"
                className="font-semibold text-green-600 text-sm"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                s'identifier <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Collecte de Données pour les Dahiras
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nous avons mis en place un système sécurisé permettant de
              centraliser les informations des membres des Dahiras affiliés au
              Konu Cheikh Oumar Foutiyou Tall. Ces données seront utilisées pour
              générer des cartes membres numériques, facilitant ainsi
              l'identification et la gestion des membres.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className=" outline-none rounded-md bg-gradient-to-tr from-[#22c55e] to-[#166534] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                onClick={handlePayClick}
              >
                {loading ? "Loading..." : "Cotisation mensuelle"}
              </button>
              <button
                className="rounded-md bg-gradient-to-tl from-[#0891b2] to-[#0d9488] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                onClick={handleCollectClick}
              >
                {collectLoading ? (
                  "Loading..."
                ) : (
                  <span aria-hidden="true" className="max-sm:hidden">
                    Collecte de fonds →
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
