"use client";

import { UploadCloud } from "lucide-react";
import React from "react";

const DownloadImage = ({
  profile,
  fullname,
}: {
  profile: string;
  fullname: string;
}) => {
  const downloadImage = (base64Image: string, filename: string) => {
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <td>
      <button
        className="flex items-center justify-center p-1 text-green-600"
        onClick={() => downloadImage(profile, `${fullname}.png`)}
      >
        <UploadCloud size={30} />
      </button>
    </td>
  );
};

export default DownloadImage;
