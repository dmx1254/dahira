import TalibeTable from "@/components/TalibeTable";
import { getTalibes } from "@/lib/actions";
import React from "react";

const AdminPage = async () => {
  const talibes = await getTalibes();
  // console.log(talibes);
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center justify-center gap-4">
      <div></div>
      <TalibeTable talibes={talibes} />
    </div>
  );
};

export default AdminPage;
