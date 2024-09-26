import Filter from "@/app/_components/Filter";
import ReportTable from "@/app/_components/ReportTable";

const statusFilter = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Viewed", value: "viewed" },
  { label: "In progress", value: "in-progress" },
  { label: "Complete", value: "complete" },
];

export const metadata = {
  title: "Reports",
};

async function Page({ searchParams }) {
  const filter = searchParams?.status ?? "all";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your issue reports
      </h2>
      <div className="flex justify-end mb-8">
        <Filter filterData={statusFilter} name="status" />
      </div>
      <ReportTable filter={filter} />
    </div>
  );
}

export default Page;
