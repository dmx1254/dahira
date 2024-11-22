import React from "react";
import CheckAccess from "@/components/CheckAccess";

const page = async () => {
  const talibe = {
    _id: "66badc2d49d4ebff686b97",
    fullname: "Dahira thierno cheikh tall",
  };

  return (
    <div className="relative w-full flex h-screen flex-col items-center justify-center p-4">
      <CheckAccess talibe={talibe} />
    </div>
  );
};

export default page;
