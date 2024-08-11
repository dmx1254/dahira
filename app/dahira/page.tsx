"use client";


import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const DahiraPage = () => {
  useEffect(() => {
    redirect("/dahira/admin");
  }, []);
  return <div></div>;
};

export default DahiraPage;
