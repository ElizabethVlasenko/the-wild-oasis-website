import { format } from "date-fns";

function ReportRow({ report }) {
  const { created_at, subject, message } = report;
  console.log(created_at);

  return (
    <div className="flex border border-primary-800">
      <div className="flex-grow px-6 py-3 flex flex-col h-32">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{subject}</h3>

          <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
            status
          </span>
        </div>

        <p className="text-lg text-primary-300"></p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-lg text-primary-300">{message.split(" ", 10)}</p>
          <p className="ml-auto text-sm text-primary-400">
            Created {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]"></div>
    </div>
  );
}

export default ReportRow;
