import React from "react";
import { Button } from "primereact/button";

export default function ContactListHeader({ toggleDialog, numberOfContacts }) {
  return (
    <header className="m-2">
      <div className="flex justify-content-between align-content-center">
        <h3>
          Contact List (<span className="text-primary">{numberOfContacts}</span>
          )
        </h3>
        <Button
          severity="success"
          label="Add Contact"
          icon="pi pi-plus"
          className="p-2 h-3rem align-self-center"
          onClick={toggleDialog(true)}
        />
      </div>
    </header>
  );
}
