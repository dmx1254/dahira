// /pmn.jpeg

import React from "react";
import { getTalibesAndTotalPages } from "@/lib/api";
// import { getSession } from "@/lib/actions/action";
import { PiTrashThin } from "react-icons/pi";
import { CloudUpload } from "lucide-react";
import { TalibeUser } from "@/lib/validation";
import DownloadImage from "../DownloadImage";
import DeleTalibe from "../DeleTalibe";
// import generatePDF from "@/lib/utils";
// import DownloadInventaire from "../DownloadInventaire";

const Table = async ({
  query,
  currentPage,
  dahiraname,
}: {
  query: string;
  currentPage: number;
  dahiraname: string;
}) => {
  // const session = await getSession();
  const { talibes } = await getTalibesAndTotalPages(
    query,
    currentPage,
    dahiraname
  );
  const products: TalibeUser[] = talibes;
  function formatNumber(index: number) {
    return index.toString().padStart(5, "0");
  }
  // console.log(products);
  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full table bg-white text-left">
        <thead className="bg-[#111b21] text-gray-500">
          <tr className="border-b border-gray-100 text-sm">
            <th className="p-0.5 x2s:p-1 xs:p-2 md:p-4 font-semibold">ID</th>
            <th className="flex p-4 font-semibold">Prénom et nom</th>
            <th className="p-4 font-semibold">Téléphone</th>
            <th className="p-4 font-semibold">Dahira</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr
              key={product._id}
              className="border-b border-gray-200 text-xs text-[#111b21]"
            >
              <td className="p-4 font-bold text-sm">
                {formatNumber(index + 1)}
              </td>
              <td className="p-4 font-semibold">
                <div className="flex items-center gap-2">
                  <img
                    src={product.profile}
                    alt={product.fullname}
                    className="rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-cover object-center"
                  />
                  <span className="text-sm capitalize">{product.fullname}</span>
                </div>
              </td>
              <td className="p-4 text-sm">{product.phone}</td>
              <td className="p-4 text-sm capitalize">{product.dahiraname}</td>
              <td>
                <div className="flex items-center gap-2">
                  <DownloadImage
                    profile={product.profile}
                    fullname={product.fullname}
                  />
                  <DeleTalibe talibeId={product._id} />
                </div>
              </td>
              {/* {session.isAdmin && <ArticleUpdate article={product} />} */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {session.isAdmin && <DownloadInventaire products={products} />} */}
    </div>
  );
};

export default Table;
