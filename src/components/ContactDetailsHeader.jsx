import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

export default function ContactDetailsHeader({ toggleDialog }) {
  return (
    <header className="m-2">
      <div className="flex justify-content-between align-content-center">
        <Link
          to="/contacts"
          className="no-underline flex align-items-center gap-2 text-white"
        >
          <span className="pi pi-arrow-left" />
          <h3>Back to Contact List</h3>
        </Link>
        <Button
          severity="danger"
          label="Delete Contact"
          icon="pi pi-trash"
          className="p-2 h-3rem align-self-center"
          onClick={toggleDialog(true)}
        />
      </div>
    </header>
  );
}
