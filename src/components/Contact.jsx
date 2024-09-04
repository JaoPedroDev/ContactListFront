import React from "react";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import "./Contact.css";

export default function Contact({ contact }) {
  let iconsSize = 25;

  return (
    <Link
      to={`/contact/${contact.id}`}
      className="no-underline bg-primary border-round flex flex-column w-25rem p-3"
    >
      <div className="flex">
        <img
          className="card--image border-circle w-5rem h-5rem align-self-center"
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
