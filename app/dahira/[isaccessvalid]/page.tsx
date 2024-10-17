import React from "react";
import { checkIsTalibeValid } from "@/lib/api";
import CheckAccess from "@/components/CheckAccess";

const page = async ({ params }: { params: { isaccessvalid: string } }) => {
  const isAccessValid = params.isaccessvalid;

  const talibe = await checkIsTalibeValid(isAccessValid);

  return (
    <div className="relative w-full flex h-screen flex-col items-center justify-center p-4">
      <CheckAccess talibe={talibe} />
    </div>
  );
};

export default page;
