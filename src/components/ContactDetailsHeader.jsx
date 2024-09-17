import { Button } from "primereact/button";
import React from "react";

export default function ContactDetailsHeader({ toggleDialog }) {
    return (
        <header className="m-2">
            <div className="flex justify-content-between align-content-center">
                <h3>Contact Details</h3>
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