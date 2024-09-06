import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { getContacts } from "./api/ContactService";
import "react-material-symbols/rounded";

import Header from "./components/Header";
import ContactList from "./components/ContactList";

import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";

import "primereact/resources/themes/lara-dark-pink/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

export default function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [newContactDialogVisible, setNewContactDialogVisible] = useState(false);

  const getAllContacts = async (page = 0, size = 10) => {
    const response = await getContacts(page, size);
    setData(response.data);
    setCurrentPage(response.data.number);
  };

  const toggleDialog = (state) => () => setNewContactDialogVisible(state);

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
        <form autoComplete="off">
          <div className="formgrid grid">
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="name" type="text" className="w-full" />
              <label htmlFor="name">Name</label>
            </FloatLabel>
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="email" type="text" className="w-full" />
              <label htmlFor="email">Email</label>
            </FloatLabel>
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="phone" type="text" className="w-full" />
              <label htmlFor="phone">Phone</label>
            </FloatLabel>
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="address" type="text" className="w-full" />
              <label htmlFor="address">Address</label>
            </FloatLabel>
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="title" type="text" className="w-full" />
              <label htmlFor="tile">Title</label>
            </FloatLabel>
            <FloatLabel className="field col-12 md:col-6 mb-4">
              <InputText id="status" type="text" className="w-full" />
              <label htmlFor="status">Status</label>
            </FloatLabel>
            <FileUpload 
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              className="field col-12 md:col-6 mb-4"
              chooseLabel="Choose Photo"
            />
          </div>
        </form>
      </Dialog>
    </PrimeReactProvider>
  );
}
