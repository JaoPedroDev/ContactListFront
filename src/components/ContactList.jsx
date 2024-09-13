import React from "react";
import Contact from "./Contact";

export default function ContactList({ data, currentPage, getAllContacts }) {
  return (
    <main className="mx-2">
      {data?.content?.length === 0 && <div>No contacts found</div>}

      <ul className="flex flex-wrap gap-3 p-0 m-0 justify-content-center">
        {data?.content?.length > 0 &&
          data.content.map((contact) => (
            <Contact contact={contact} key={contact.id} />
          ))}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div>
          <a
            onClick={() => getAllContacts(currentPage - 1)}
            className={currentPage === 0 ? "disabled" : ""}
          >
            &laquo;
          </a>
          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <a
                onClick={() => getAllContacts(page)}
                className={page === currentPage ? "active" : ""}
                key={page}
              >
                {page + 1}
              </a>
            ))}
          <a
            onClick={() => getAllContacts(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
          >
            &raquo;
          </a>
        </div>
      )}
    </main>
  );
}
