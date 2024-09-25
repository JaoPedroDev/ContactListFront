import React from "react";
import { useState } from "react";
import Contact from "./Contact";
import ContactListHeader from "./ContactListHeader";
import FileUploadButton from "./FileUploadButton";
import { saveContact, updatePhoto } from "../api/ContactService";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";

export default function ContactList({ data, currentPage, getAllContacts }) {
  const [newContactDialogVisible, setNewContactDialogVisible] = useState(false);
  const [pageFirst, setPageFirst] = useState(0);
  const [pageRows, setPageRows] = useState(6);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: null,
      address: "",
      title: "",
      status: "",
      photoFile: null,
    },
  });

  const onSubmit = async (data) => {
    const selectedPhoto = data?.photoFile;

    const contactData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      title: data.title,
      status: data.status,
    };

    const contactResponse = await saveContact(contactData);

    if (selectedPhoto) {
      const photoData = new FormData();
      photoData.append("file", selectedPhoto);
      photoData.append("id", contactResponse.data.id);
      await updatePhoto(photoData);
    }

    toggleDialog(false)();
    getAllContacts();
  };

  const handleReset = () => {
    reset();
  };

  const handlePageChange = (event) => {
    getAllContacts(event.page);
    setPageFirst(event.first);
    setPageRows(event.rows);
  };

  const toggleDialog = (state) => () => {
    handleReset();
    setNewContactDialogVisible(state);
  };

  return (
    <div>
      <ContactListHeader
        numberOfContacts={data?.totalElements}
        toggleDialog={toggleDialog}
      />
      <main className="mx-2">
        {data?.content?.length === 0 && <div>No contacts found</div>}

        <ul
          className="gap-3 p-0 m-0 justify-content-center"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {data?.content?.length > 0 &&
            data.content.map((contact) => (
              <Contact contact={contact} key={contact.id} />
            ))}
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 && (
          <Paginator
            className="bg-transparent border-0 border-transparent pt-5"
            first={pageFirst}
            rows={pageRows}
            totalRecords={data?.totalElements}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      <Dialog
        visible={newContactDialogVisible}
        modal
        draggable={false}
        resizable={false}
        onHide={() => toggleDialog(false)()}
        header="New Contact"
        className="w-8 md:w-6"
      >
        <hr className="mb-5 mt-0" />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="name">Name*</label>
                {errors.name && (
                  <small className="p-error">{errors.name.message}</small>
                )}
              </div>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <InputText
                    id="name"
                    {...field}
                    type="text"
                    className="w-full"
                    invalid={errors.name ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="email">Email*</label>
                {errors.email && (
                  <small className="p-error pl-2">{errors.email.message}</small>
                )}
              </div>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <InputText
                    id="email"
                    {...field}
                    type="text"
                    className="w-full"
                    invalid={errors.email ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="phone">Phone*</label>
                {errors.phone && (
                  <small className="p-error pl-2">{errors.phone.message}</small>
                )}
              </div>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <InputText
                    id="phone"
                    {...field}
                    type="text"
                    keyfilter={/^[0-9\s\-\(\)]+$/}
                    className="w-full"
                    invalid={errors.phone ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="address">Address*</label>
                {errors.address && (
                  <small className="p-error pl-2">
                    {errors.address.message}
                  </small>
                )}
              </div>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <InputText
                    id="address"
                    {...field}
                    type="text"
                    className="w-full"
                    invalid={errors.address ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="title">Title*</label>
                {errors.title && (
                  <small className="p-error pl-2">{errors.title.message}</small>
                )}
              </div>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <InputText
                    id="title"
                    {...field}
                    type="text"
                    className="w-full"
                    invalid={errors.title ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12 md:col-6">
              <div className="flex justify-content-between align-items-center mb-2">
                <label htmlFor="status">Status*</label>
                {errors.status && (
                  <small className="p-error pl-2">
                    {errors.status.message}
                  </small>
                )}
              </div>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Dropdown
                    id="status"
                    {...field}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                    className="w-full"
                    invalid={errors.status ? true : false}
                  />
                )}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="photoFile">Profile Photo</label>
              <Controller
                name="photoFile"
                control={control}
                render={({ field }) => (
                  <FileUploadButton
                    onFileSelected={field.onChange}
                    value={field.value}
                  />
                )}
              />
              {errors.photoFile && (
                <small className="p-error">{errors.photoFile.message}</small>
              )}
            </div>
            <div className="col-12 flex justify-content-end">
              <Button
                label="Cancel"
                type="button"
                icon="pi pi-times"
                className="p-button-text"
                severity="danger"
                onClick={() => toggleDialog(false)()}
              />
              <Button
                label="Save"
                type="submit"
                icon="pi pi-check"
                className="p-button-text"
                severity="success"
              />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
