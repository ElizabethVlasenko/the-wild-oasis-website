import { auth } from "../_lib/auth";
import { getContactMessages } from "../_lib/data-service";
import ReportRow from "./ReportRow";

async function ReportTable({ filter }) {
  const session = await auth();
  const reports = await getContactMessages(session.user.guestId);

  const displayedReports = reports.filter((report) => {
    if (filter === "all") return true; // Show all reports if 'all' is selected
    return report.status === filter;
  });

  return (
    <div className="space-y-6">
      {displayedReports.map((report) => (
        <ReportRow report={report} key={report.id} />
      ))}
    </div>
  );
}

export default ReportTable;
