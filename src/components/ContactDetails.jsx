import React from "react";
import { useParams } from "react-router-dom";
import { deleteContact, getContact, updateContact, updatePhoto } from "../api/ContactService";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import FileUploadButton from "./FileUploadButton";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactDetailsHeader from "./ContactDetailsHeader";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";

export default function ContactDetails({ reloadContacts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      title: "",
      status: "",
      photoFile: null,
    },
  });

  const imageSource = photoPreview || getValues("photoUrl");

  const fetchContact = async () => {
    const response = await getContact(id);
    reset(response.data);
  };

  const onSubmit = async (data) => {
    const contactData = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      title: data.title,
      status: data.status,
      photoUrl: data.photoUrl,
    };

    const contactResponse = await updateContact(contactData);

    if (data.photoFile) {
      const photoData = new FormData();
      photoData.append("file", data.photoFile);
      photoData.append("id", contactResponse.data.id);
      await updatePhoto(photoData);
    }

    navigate("/");
    reloadContacts();
  };

  const handleCancel = () => {
    navigate("/");
  };

  const previewPhoto = (file) => {
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const toggleDialog = (state) => () => {
    setDeleteDialogVisible(state);
  };

  const handleDelete = async () => {
    await deleteContact(getValues("id"));
    navigate("/");
    reloadContacts();
  };

  useEffect(() => {
    fetchContact();
  }, [reset]);

  return (
    <div>
      <ContactDetailsHeader
         toggleDialog={toggleDialog}
      />
      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => toggleDialog(false)()}
        message="Are you sure you want to delete this contact?"
        header="Delete Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        accept={handleDelete}
      />
      <div className="flex flex-wrap gap-5 justify-content-center">
        <Avatar
          className="align-self-center w-20rem h-20rem text-8xl"
          shape="circle"
          {...(imageSource
            ? { image: imageSource }
            : { label: getValues("name")[0] })}
          alt={`${getValues("name")} photo's`}
        />
        <form
          className="flex-grow-0 w-9"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="name">Name*</label>
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
              {errors.name && (
                <small className="p-error">{errors.name.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="email">Email*</label>
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
                    invalid={errors.name ? true : false}
                  />
                )}
              />
              {errors.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="phone">Phone*</label>
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
                    invalid={errors.name ? true : false}
                  />
                )}
              />
              {errors.phone && (
                <small className="p-error">{errors.phone.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="address">Address*</label>
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
                    invalid={errors.name ? true : false}
                  />
                )}
              />
              {errors.address && (
                <small className="p-error">{errors.address.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="title">Title*</label>
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
                    invalid={errors.name ? true : false}
                  />
                )}
              />
              {errors.title && (
                <small className="p-error">{errors.title.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="status">Status*</label>
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
                    invalid={errors.name ? true : false}
                  />
                )}
              />
              {errors.status && (
                <small className="p-error">{errors.status.message}</small>
              )}
            </div>
            <div className="field col-12">
              <Controller
                name="photoFile"
                control={control}
                render={({ field }) => (
                  <FileUploadButton
                    onFileSelected={(file) => {
                      previewPhoto(file);
                      field.onChange(file);
                    }}
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
                onClick={handleCancel}
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
      </div>
    </div>
  );
}
