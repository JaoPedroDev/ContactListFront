import { Button } from "primereact/button";
import React from "react";
import { useRef } from "react";

export default function FileUploadButton({ onFileSelected, value}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <div className="flex align-items-center">
      <input 
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        label="Upload Photo"
        icon="pi pi-upload"
        onClick={handleButtonClick}
        type="button"
      />
      {value && <span className="ml-2">{value.name}</span>}
    </div>
  );
}
