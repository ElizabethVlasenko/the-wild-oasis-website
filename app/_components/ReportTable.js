import { isWithinInterval, sub } from "date-fns";
import { auth } from "../_lib/auth";
import { getContactMessages } from "../_lib/data-service";
import ReportRow from "./ReportRow";

async function ReportTable({ activeStatusFilter, activeDateFilter }) {
  const session = await auth();
  const reports = await getContactMessages(session.user.guestId);

  const statusSortReports = reports.filter((report) => {
    if (activeStatusFilter === "all") return true; // Show all reports if 'all' is selected

    return report.status === activeStatusFilter;
  });

  const displayedReports = statusSortReports.filter((report) => {
    switch (activeDateFilter) {
      case "all": {
        return true;
      }

      case "today": {
        return (
          new Date(report.created_at).toDateString() ===
          new Date().toDateString()
        );
      }

      case "this-week": {
        return isWithinInterval(new Date(report.created_at), {
          start: sub(new Date(), { weeks: 1 }),
          end: new Date(),
        });
      }

      case "this-month": {
        return isWithinInterval(new Date(report.created_at), {
          start: new Date(),
          end: sub(new Date(), { months: 1 }),
        });
      }
      case "this-year": {
        return isWithinInterval(new Date(report.created_at), {
          start: new Date(),
          end: sub(new Date(), { years: 1 }),
        });
      }
    }
  });

  return (
    <div className="space-y-6">
      {displayedReports.length > 0 ? (
        displayedReports.map((report) => (
          <ReportRow report={report} key={report.id} />
        ))
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-primary-200 font-semibold">
            No reports found. Try changing filter options.
          </p>
        </div>
      )}
    </div>
  );
}

export default ReportTable;
