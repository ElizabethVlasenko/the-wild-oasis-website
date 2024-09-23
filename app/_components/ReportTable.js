import ReportRow from "./ReportRow";

function ReportTable({ reports }) {
  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <ReportRow report={report} key={report.id} />
      ))}
    </div>
  );
}

export default ReportTable;
