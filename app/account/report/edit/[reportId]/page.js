import SubmitButton from "@/app/_components/SubmitButton";
import {
  createContactMessageAction,
  updateContactMessageAction,
} from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getContactMessage } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  return { title: `Report reservation #${params.bookingId}` };
}

async function Page({ params }) {
  const session = await auth();

  const { reportId } = params;
  const { bookingId, subject, message } = await getContactMessage(reportId);

  console.log(bookingId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit a problem {bookingId ? "for the booking #" + bookingId : ""}
      </h2>

      <form
        action={updateContactMessageAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="reportId" value={reportId} />

        <div className="space-y-2">
          <label>Subject</label>
          <select
            defaultValue={subject}
            required
            name="subject"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="">Select subject...</option>
            <option value="booking-problem">Booking problem</option>
            <option value="stay-problem">Stay problem</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label>Message</label>
          <textarea
            defaultValue={message}
            required
            name="message"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            rows={3}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
