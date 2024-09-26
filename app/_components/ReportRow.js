"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

const MESSAGE_LENGTH = 22;

function ReportRow({ report }) {
  const { created_at, subject, message, id, status } = report;
  const [open, setOpen] = useState(false);

  let displayMessage = "";
  if (!open)
    displayMessage =
      message.split(" ").slice(0, MESSAGE_LENGTH).join(" ") +
      (message.split(" ").length > MESSAGE_LENGTH ? "..." : "");

  if (open) displayMessage = message;

  //TODO status: submitted (can delete/edit the report), viewed, in progress, complete

  return (
    <div className="flex border border-primary-800">
      <div className="flex-grow px-6 py-3 flex flex-col min-h-40 max-w-[791px]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold capitalize">
            {subject.split("-").join(" ")}
          </h3>
          <Status status={status} />
        </div>

        <p className="text-lg text-primary-300"></p>

        <div className="flex-1 flex flex-col justify-between">
          <p className="text-lg text-primary-300 mt-3 mb-2">
            {displayMessage}{" "}
            {message.split(" ").length > MESSAGE_LENGTH ? (
              <button
                onClick={() => setOpen(!open)}
                className="text-accent-400"
              >
                [show {open ? "less" : "more"}]
              </button>
            ) : null}
          </p>
          <p className="text-right text-sm text-primary-400">
            Created {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {status === "submitted" && (
          <>
            <Link
              href={`/account/report/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <button
              href={`/account/report/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-red-500 transition-colors hover:text-primary-900"
            >
              <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Delete</span>
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default ReportRow;

function Status({ status }) {
  let statusStyle;
  switch (status) {
    case "complete": {
      statusStyle = "bg-green-800 text-green-200";
      break;
    }
    case "viewed": {
      statusStyle = "bg-blue-800 text-blue-200";
      break;
    }
    case "in-progress": {
      statusStyle = "bg-yellow-800 text-yellow-200";
      break;
    }
    case "submitted": {
      statusStyle = "bg-purple-800 text-purple-200";
      break;
    }
    default: {
      statusStyle = "bg-yellow-800 text-yellow-200";
    }
  }

  return (
    <span
      className={`${statusStyle} h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm`}
    >
      {status.split("-").join(" ")}
    </span>
  );
}
