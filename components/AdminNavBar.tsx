import { options } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import LogoutPage from "./LogoutPage";

const AdminNavBar = async () => {
  const session = await getServerSession(options);
  // console.log(session);
  return (
    <div className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-2 mt-2">
        <LogoutPage />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Image
          src="/images/avatar.jpg"
          alt="Avatar"
          width={40}
          height={40}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="rounded-full"
        />
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm font-semibold text-[#111b21]">
            {session?.user.fullname}
          </span>
          <span className="text-xs font-semibold text-green-700">
            {session?.user.isAdmin && "Admin"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
