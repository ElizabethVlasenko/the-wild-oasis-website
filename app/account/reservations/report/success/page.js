import Link from "next/link";

function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you for your message! Someone will get back to you soon.
      </h1>
      <div className="flex justify-center gap-16">
        <Link
          href="/account/reservations"
          className="underline text-xl text-accent-500 inline-block"
        >
          Manage your reservations &rarr;
        </Link>

        <Link
          href="/account/report"
          className="underline text-xl text-accent-500 inline-block"
        >
          Review your issue reports &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Page;
