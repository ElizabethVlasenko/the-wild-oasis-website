"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  //get current search params
  const searchParams = useSearchParams();
  //get router to change the URL
  const router = useRouter();
  //get current path name (/cabins)
  const pathname = usePathname();

  //get active filter from the search params
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //create a new params using the existing search params
    const params = new URLSearchParams(searchParams);
    //set the new filter
    params.set("capacity", filter);

    //replace the URL
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter={"small"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={"medium"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter={"large"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } px-5 py-2 hover:bg-primary-800 hover:text-primary-100 transition-colors `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
