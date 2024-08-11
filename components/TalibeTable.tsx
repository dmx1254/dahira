import { convertDate } from "@/lib/utils";
import { TalibeUser } from "@/lib/validation";

import DownloadImage from "./DownloadImage";

const TalibeTable = ({ talibes }: { talibes: TalibeUser[] }) => {
  function formatNumber(index: number) {
    return index.toString().padStart(5, "0");
  }
  return (
    <div className="overflow-x-auto w-full max-w-7xl flex items-center justify-center mx-auto p-10">
      <table className="min-w-full table text-left border border-gray-400">
        <thead className="">
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-2 px-4 text-left text-sm sm:text-base">ID</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">
              Prénom et nom
            </th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">
              Téléphone
            </th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">Dahira</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">
              Date d'inscription
            </th>
            <th className="py-2 px-4 "></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-base font-light">
          {talibes.map((talibe, index) => (
            <tr key={talibe._id} className="border-b border-gray-400">
              <td className="py-2 px-4 font-bold">{formatNumber(index + 1)}</td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <img
                    src={talibe.profile}
                    alt={talibe.fullname}
                    className="rounded-full w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] object-cover object-center"
                  />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    {talibe.fullname}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 font-semibold text-gray-800 text-sm sm:text-base">
                {talibe.phone}
              </td>
              <td className="py-2 px-4 font-semibold text-gray-800 text-sm sm:text-base">
                {talibe.dahiraname}
              </td>
              <td className="py-2 px-4 font-semibold text-gray-800 text-sm sm:text-base">
                {convertDate(talibe.createdAt)}
              </td>
              <DownloadImage
                profile={talibe.profile}
                fullname={talibe.fullname}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TalibeTable;
