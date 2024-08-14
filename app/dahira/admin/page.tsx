import React, { Suspense } from "react";

import { Pagination } from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/ui/table";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import { getDahiraNames, getTalibesAndTotalPages } from "@/lib/api";
import MoreFilter from "@/components/ui/moreFilter";
// import { getSession } from "@/lib/actions/action";

const AdminPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    dahiraname?: string;
    page?: string;
  };
}) => {
  // const session = await getSession();
  const dahiracat = await getDahiraNames();
  // console.log(dahiracat)
  let query = searchParams?.query || "";
  let dahiraname = searchParams?.dahiraname || "";
  let currentPage = Number(searchParams?.page) || 1;
  let { totalPages } =
    (await getTalibesAndTotalPages(query, currentPage, dahiraname)) || 1;

  return (
    <div className="w-full flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full flex items-center justify-between">
        <span className="p-2 font-bold text-gray-600">
          Dahira Thierno Cheikh Tall
        </span>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="w-full max-w-md flex items-center gap-4">
          <Search placeholder="Rechercher un talibé..." />
        </div>
        <div className="flex items-center gap-4">
          <MoreFilter dahiracat={dahiracat}/>
        </div>
      </div>

      <Suspense
        key={currentPage + query + dahiraname}
        fallback={<LatestInvoicesSkeleton />}
      >
        <Table
          query={query}
          currentPage={currentPage}
          dahiraname={dahiraname}
        />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminPage;
