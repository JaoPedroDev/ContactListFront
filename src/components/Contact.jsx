import React from "react";
import { Link } from "react-router-dom";

export default function Contact({ contact }) {

  return (
    <Link
      to={`/contact/${contact.id}`}
      className="no-underline bg-primary border-round flex flex-column w-20rem p-3"
    >
      <div className="flex">
        <img
          className="border-circle w-4rem h-4rem align-self-center"
          src={contact.photoUrl}
          alt={`${contact.name} photo's`}
        />
        <div className="pl-3">
          <h2 className="mb-0">{contact.name}</h2>
          <p className="mt-0">{contact.title}</p>
        </div>
      </div>
      <div className="mt-2">
        <span className="flex align-items-center">
          <span className="pi pi-envelope text-xl"></span>
          <p className="m-2">{contact.email}</p>
        </span>
        <span className="flex align-items-center">
          <span className="pi pi-map-marker text-xl"></span>
          <p className="m-2">{contact.address}</p>
        </span>
        <span className="flex align-items-center">
          <span className="pi pi-phone text-xl"></span>
          <p className="m-2">{contact.phone}</p>
        </span>
        <span className="flex align-items-center">
          <span
            className={`pi text-xl ${
              contact.status === "Active" ? "pi-check" : "pi-times"
            }`}
          ></span>
          <p className="m-2">{contact.status}</p>
        </span>
      </div>
    </Link>
  );
}
