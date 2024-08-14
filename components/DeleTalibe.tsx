"use client";

import { deleteTalibe } from "@/lib/actions";
import React from "react";
import { PiTrashThin } from "react-icons/pi";

const DeleTalibe = ({ talibeId }: { talibeId: string }) => {
  const handleDeleteTalibe = async () => {
    await deleteTalibe(talibeId);
  };
  return (
    <button
      type="submit"
      className="flex items-center justify-center p-0.5 rounded border border-red-600 text-red-600"
      onClick={handleDeleteTalibe}
    >
      <PiTrashThin size={16} />
    </button>
  );
};

export default DeleTalibe;
