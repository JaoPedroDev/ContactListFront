import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { getContacts } from "./api/ContactService";
import "react-material-symbols/rounded";

import Header from "./components/Header";
import ContactList from "./components/ContactList";

import "primereact/resources/themes/lara-dark-pink/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

export default function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    const response = await getContacts(page, size);
    setData(response.data);
    setCurrentPage(response.data.number);

    console.log(response.data);
  };

  const toggleModal = (show) => {};

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <PrimeReactProvider>
      <Header toggleModal={toggleModal} numberOfContacts={data.totalElements} />
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
    </PrimeReactProvider>
  );
}
