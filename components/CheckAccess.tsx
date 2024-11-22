"use client";

import React, { useState } from "react";
import { TalibeCkeck } from "@/lib/validation";
import { motion } from "framer-motion";
import Image from "next/image";
import DialogPassword from "./DialogPassoword";

const CheckAccess = ({ talibe }: { talibe: TalibeCkeck }) => {
  const [isOpen, setIsOpen] = useState(true);
  //   console.log(talibe);
  return isOpen ? (
    <DialogPassword isOpen={isOpen} setIsOpen={setIsOpen} />
  ) : (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {talibe?._id ? (
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="flex flex-col items-center gap-4 p-4 rounded-[10px]"
        >
          <Image
            src="/check-image.png"
            height={200}
            width={200}
            alt="check talibe image"
          />
          <p className="text-2xl font-extrabold -mt-10 text-green-700">
            Access autorisé
          </p>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="flex flex-col items-center gap-4 p-4 rounded-[10px]"
        >
          <Image
            src="/error-check.png"
            height={120}
            width={120}
            alt="check talibe image"
          />
          <p className="text-2xl font-extrabold text-red-700">Access refusé</p>
        </div>
      )}
    </motion.div>
  );
};

export default CheckAccess;
