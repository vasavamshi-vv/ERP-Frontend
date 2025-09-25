import React, { useState, useEffect } from "react";
import "./debitNote.css";

export default function DebitNote({ setCurrentPage }) {
  const [debitNoteCurrentPage, setdebitNoteCurrentPage] = useState(1);
  const debitNotePerPage = 10;

  const [filter, setFilter] = useState({
    debitNote_status: "",
    payment_status: "",
    debitNote_from_date: "",
    debitNote_to_date: "",
  });

  const [ApidebitNote, setApidebitNote] = useState({});
  const [debitNoteData, setdebitNoteData] = useState([]);

  const debitNoteFromAPI = {
    debitNoteData: [
      {
        debitNote_id: "INV-0001",
        sales_order_ref: "SO-0001",
        customer_name: "Acme Corp",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Draft",
        payment_status: "Unpaid",
      },
      {
        debitNote_id: "INV-0002",
        sales_order_ref: "SO-0002",
        customer_name: "Acme Corp",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Send",
        payment_status: "Unpaid",
      },
      {
        debitNote_id: "INV-0003",
        sales_order_ref: "SO-0003",
        customer_name: "Acme",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Send",
        payment_status: "Partial",
      },
      {
        debitNote_id: "INV-0004",
        sales_order_ref: "SO-0004",
        customer_name: "Corp",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Paid",
        payment_status: "Paid",
      },
      {
        debitNote_id: "INV-0005",
        sales_order_ref: "SO-0005",
        customer_name: "Sai Kumar",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Overdue",
        payment_status: "Unpaid",
      },
      {
        debitNote_id: "INV-0006",
        sales_order_ref: "SO-0006",
        customer_name: "Kishore",
        debitNote_date: "28-05-2025",
        due_date: "28-05-2025",
        status: "Cancelled",
        payment_status: "",
      },
    ],
  };
  useEffect(() => {
    setApidebitNote(debitNoteFromAPI);
  }, []);
  useEffect(() => {
    if (Object.keys(ApidebitNote).length > 0) {
      setdebitNoteData(ApidebitNote.debitNoteData);
    }
  }, [ApidebitNote]);

  //page calculation
  const totalPages = Math.ceil(debitNoteData.length / debitNotePerPage);

  const currentData = debitNoteData.slice(
    (debitNoteCurrentPage - 1) * debitNotePerPage,
    debitNoteCurrentPage * debitNotePerPage
  );
  const handleNext = () => {
    if (debitNoteCurrentPage < totalPages) {
      setdebitNoteCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (debitNoteCurrentPage > 1) {
      setdebitNoteCurrentPage((prev) => prev - 1);
    }
  };
  const handleClearFilter = () => {
    setFilter({
      debitNote_status: "",
      payment_status: "",
      debitNote_from_date: "",
      debitNote_to_date: "",
    });
  };
  return (
    <>
      <div className="debitNote-container">
        <div className="debitNote-header">
          <p>Debit Note List</p>
        </div>
        <div className="debitNote-search-box">
          <label htmlFor="searchByID">
            <svg
              className="debitNote-search-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </label>
          <input
            id="searchByID"
            placeholder="Search by debitNote ID, Customer name...."
          />
        </div>
        <div className="debitNote-clearfilter">
          <p onClick={handleClearFilter}>Clear Filter</p>
        </div>
        <div className="debitNote-search-category">
          <div className="debitNote-input-box">
            <label htmlFor="debitNote_status">Debit Note Status</label>
            <select
              value={filter.debitNote_status}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  debitNote_status: e.target.value,
                }));
              }}
              id="debitNote_status"
            >
              <option value="">All</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="debitNote-input-box">
            <label htmlFor="payment_status">Payment Status</label>
            <select
              id="payment_status"
              value={filter.payment_status}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  payment_status: e.target.value,
                }));
              }}
            >
              <option value="">All Types</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className="debitNote-input-box">
            <label htmlFor="debitNote_date">DebitNote Date</label>
            <nav id="debitNote_date">
              <div>
                <span>From </span>
                <input
                  value={filter.debitNote_from_date}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      debitNote_from_date: e.target.value,
                    }));
                  }}
                  className="debitNote-date"
                  type="date"
                />
              </div>
              <div>
                <span>to </span>
                <input
                  value={filter.debitNote_to_date}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      debitNote_to_date: e.target.value,
                    }));
                  }}
                  className="debitNote-date"
                  type="date"
                />
              </div>
            </nav>
          </div>
        </div>

        <div className="debitNote-table-cointainer">
          <table>
            <thead className="debitNote-table-head">
              <tr>
                <th></th>
                <th>
                  <pre>CRN ID</pre>
                </th>
                <th>
                  <pre>PO Ref</pre>
                </th>
                <th>
                  <pre>Supplier Name</pre>
                </th>
                <th>
                  <pre>Debit Note Date</pre>
                </th>
                <th>
                  <div className="debitNote-status-filter">
                    Status
                    <nav className="debitNote-filter-box">
                      <p>Newest First</p>
                      <p>Oldest First</p>
                      <p>Progressing {`(Draft → Cancelled)`}</p>
                      <p>Reverse Progressing{`(Cancelled → Draft)`} </p>
                    </nav>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                    >
                      <path
                        d="M3.66683 12.3346H0.333496L5.3335 17.3346V0.667969H3.66683V12.3346ZM8.66683 3.16797V17.3346H10.3335V5.66797H13.6668L8.66683 0.667969V3.16797Z"
                        fill="#234E70"
                      />
                    </svg>
                  </div>
                </th>
                <th>
                  <pre>Payment status</pre>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="debitNote-table-body">
              {currentData.length > 0 ? (
                currentData.map((ele, ind) => (
                  <tr key={ind}>
                    <td>
                      <input
                        className="debitNote-table-check"
                        type="checkbox"
                      />
                    </td>
                    <td>{ele.debitNote_id}</td>
                    <td>{ele.sales_order_ref}</td>
                    <td>{ele.customer_name}</td>
                    <td>
                      <pre>{ele.debitNote_date}</pre>
                    </td>
                    <td>
                      <p
                        className={`debitNote-Status ${
                          ele.status === "Draft"
                            ? "debitNote-Status-draft"
                            : ele.status === "Send"
                            ? "debitNote-Status-Send"
                            : ele.status === "Cancelled"
                            ? "debitNote-Status-Cancelled"
                            : ele.status === "Paid"
                            ? "debitNote-Status-Paid"
                            : ele.status === "Overdue"
                            ? "debitNote-Status-Overdue"
                            : ""
                        }`}
                      >
                        {ele.status}
                      </p>
                    </td>
                    <td>
                      <p
                        className={
                          ele.payment_status === "Paid"
                            ? "debitNote-Paid"
                            : ele.payment_status === "Unpaid"
                            ? "debitNote-Unpaid"
                            : ele.payment_status === "Partial"
                            ? "debitNote-Partial"
                            : ""
                        }
                      >
                        {ele.payment_status === "" ? "-" : ele.payment_status}
                      </p>
                    </td>
                    <td id="debitNote-table-action">
                      <nav className="debitNote-dot-container">
                        <button
                          onClick={() => {
                            setCurrentPage("viewDebitNote");
                          }}
                        >
                          View details
                        </button>
                        <button
                          disabled={
                            ele.status === "Draft" || ele.status === "Cancelled"
                              ? true
                              : false
                          }
                        >
                          Generate Debit Note Return
                        </button>
                      </nav>
                      <svg
                        className="debitNote-delete-logo"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 16C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18C10 17.4696 10.2107 16.9609 10.5858 16.5858C10.9609 16.2107 11.4696 16 12 16ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4Z"
                          fill="#2A2A2A"
                        />
                      </svg>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <pre>No Data Found</pre>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav className="debitNote-table-bottem">
          <p className="debitNote-num-entries">
            Showing {currentData.length} entries
          </p>
          <div className="debitNote-manage-control-box">
            <button
              className="debitNote-manage-btn"
              onClick={handlePrev}
              disabled={debitNoteCurrentPage === 1}
            >
              Prev
            </button>
            <nav className="debitNote-num-page">
              Page {debitNoteCurrentPage} of {totalPages}
            </nav>
            <button
              className="debitNote-manage-btn"
              onClick={handleNext}
              disabled={debitNoteCurrentPage === totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
