import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { getContacts, saveContact, updatePhoto } from "./api/ContactService";

import Header from "./components/Header";
import ContactList from "./components/ContactList";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-dark-pink/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Controller, useForm } from "react-hook-form";
import FileUploadButton from "./components/FileUploadButton";

export default function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [newContactDialogVisible, setNewContactDialogVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: '',
      photoFile: null,
    },
  });

  const getAllContacts = async (page = 0, size = 10) => {
    const response = await getContacts(page, size);
    setData(response.data);
    setCurrentPage(response.data.number);
  };

  const toggleDialog = (state) => () => {
    handleReset();
    setNewContactDialogVisible(state);
  }

  const onSubmit = async (data) => {
    const selectedPhoto = data?.photoFile;

    const contactData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      title: data.title,
      status: data.status,
    }

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

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <PrimeReactProvider>
      <Header
        toggleDialog={toggleDialog}
        numberOfContacts={data.totalElements}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <ContactList
              data={data}
              currentPage={currentPage}
              getAllContacts={getAllContacts}
            />
          }
        />
      </Routes>
      <Dialog
        visible={newContactDialogVisible}
        modal
        onHide={() => toggleDialog(false)()}
        header="New Contact"
        className="w-8 md:w-6"
      >
        <hr className="mb-5 mt-0" />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="name">Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
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
              <label htmlFor="email">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <InputText id="email" {...field} type="text" className="w-full" />
                )}
              />
              {errors.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="phone">Phone</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone is required' }}
                render={({ field }) => (
                  <InputText id="phone" {...field} type="text" className="w-full" />
                )}
              />
              {errors.phone && (
                <small className="p-error">{errors.phone.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="address">Address</label>
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <InputText id="address" {...field} type="text" className="w-full" />
                )}
              />
              {errors.address && (
                <small className="p-error">{errors.address.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="title">Title</label>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <InputText id="title" {...field} type="text" className="w-full" />
                )}
              />
              {errors.title && (
                <small className="p-error">{errors.title.message}</small>
              )}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="status">Status</label>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <InputText id="status" {...field} type="text" className="w-full" />
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
                // rules={{ required: 'File upload is required' }}
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
    </PrimeReactProvider>
  );
}
