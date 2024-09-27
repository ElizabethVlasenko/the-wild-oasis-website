import Filter from "@/app/_components/Filter";
import ReportTable from "@/app/_components/ReportTable";

const statusFilter = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Viewed", value: "viewed" },
  { label: "In progress", value: "in-progress" },
  { label: "Complete", value: "complete" },
];

const dateFilter = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "This week", value: "this-week" },
  { label: "This month", value: "this-month" },
  { label: "This year", value: "this-year" },
];

export const metadata = {
  title: "Reports",
};

async function Page({ searchParams }) {
  const activeStatusFilter = searchParams?.status ?? "all";
  const activeDateFilter = searchParams?.date ?? "all";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your issue reports
      </h2>

      <div className="flex justify-end mb-4">
        <Filter filterData={dateFilter} name="date" />
      </div>
      <div className="flex justify-end mb-8">
        <Filter filterData={statusFilter} name="status" />
      </div>

      <ReportTable
        activeStatusFilter={activeStatusFilter}
        activeDateFilter={activeDateFilter}
      />
    </div>
  );
}

export default Page;
