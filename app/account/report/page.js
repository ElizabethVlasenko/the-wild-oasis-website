import ReportTable from "@/app/_components/ReportTable";
import { auth } from "@/app/_lib/auth";
import { getContactMessages } from "@/app/_lib/data-service";

async function Page() {
  const session = await auth();

  const reports = await getContactMessages(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your issue reports
      </h2>
      <ReportTable reports={reports} />
    </div>
  );
}

export default Page;
