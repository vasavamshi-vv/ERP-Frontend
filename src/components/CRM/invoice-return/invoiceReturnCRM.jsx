import React, { useState, useEffect } from "react";
import SearchBar from "../../reuse-components/search.jsx";
import FilterGroup from "../../reuse-components/filter.jsx";
import DataTable from "../../reuse-components/table.jsx";
import Pagination from "../../reuse-components/pagination.jsx";
import "./invoiceReturnCRM.css";

export default function InvoiceReturnCRM({ setCurrentPage }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    invoice_status: "",
    customer_name: "",
    invoice_from_date: "",
    invoice_to_date: "",
  });
  const [invoiceData, setInvoiceData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const invoiceFromAPI = {
    invoiceData: [
      {
        invoice_id: "INV-0001",
        sales_order_ref: "SO-0001",
        customer_name: "Acme Corp",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Draft",
        payment_status: "Unpaid",
      },
      {
        invoice_id: "INV-0002",
        sales_order_ref: "SO-0002",
        customer_name: "Acme Corp",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Send",
        payment_status: "Unpaid",
      },
      {
        invoice_id: "INV-0003",
        sales_order_ref: "SO-0003",
        customer_name: "Acme",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Send",
        payment_status: "Partial",
      },
      {
        invoice_id: "INV-0004",
        sales_order_ref: "SO-0004",
        customer_name: "Corp",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Paid",
        payment_status: "Paid",
      },
      {
        invoice_id: "INV-0005",
        sales_order_ref: "SO-0005",
        customer_name: "Sai Kumar",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Overdue",
        payment_status: "Unpaid",
      },
      {
        invoice_id: "INV-0006",
        sales_order_ref: "SO-0006",
        customer_name: "Kishore",
        invoice_date: "28-05-2025",
        return_date: "28-05-2025",
        status: "Cancelled",
        payment_status: "",
      },
    ],
  };

  useEffect(() => {
    setInvoiceData(invoiceFromAPI.invoiceData);
  }, []);

  // handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      invoice_status: "",
      customer_name: "",
      invoice_from_date: "",
      invoice_to_date: "",
    });
  };

  const filtered = invoiceData
    .filter((item) => {
      return (
        (!filters.invoice_status || item.status === filters.invoice_status) &&
        (!filters.customer_name || item.customer_name === filters.customer_name) &&
        (!search ||
          item.invoice_id.includes(search) ||
          item.customer_name.toLowerCase().includes(search.toLowerCase()))
      );
    });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const tableColumns = [
    { header: "", render: () => <input type="checkbox" /> },
    { header: "INVR ID", accessor: "sales_order_ref" },
    { header: "Invoice Ref ID", accessor: "invoice_id" },
    { header: "Customer Name", accessor: "customer_name" },
    { header: "Return Date", accessor: "return_date" },
    {
      header: "Status",
      render: (row) => (
        <span className={`status status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
  header: "Action",
  render: (row) => (
    <td id="invoiceCRM-table-action">
      <nav className="invoiceCRM-dot-container">
        <button
          onClick={() => setCurrentPage("editInvoiceReturn")}
        >
          {row.status === "Draft" ? "Edit" : "View"} Details
        </button>
        <button disabled={["Draft", "Cancelled"].includes(row.status)}>
          Generate Return
        </button>
      </nav>
      <svg
        className="invoiceCRM-delete-logo"
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
  ),
},

  ];

  const filterConfig = [
    {
      name: "invoice_status",
      label: "Invoice Status",
      type: "select",
      value: filters.invoice_status,
      options: [
        { label: "All", value: "" },
        { label: "Draft", value: "Draft" },
        { label: "Send", value: "Send" },
        { label: "Paid", value: "Paid" },
        { label: "Overdue", value: "Overdue" },
        { label: "Cancelled", value: "Cancelled" },
      ],
    },
    {
      name: "customer_name",
      label: "Customer Name",
      type: "select",
      value: filters.customer_name,
      options: [
        { label: "All", value: "" },
        { label: "Acme Corp", value: "Acme Corp" },
        { label: "Freelance Writer", value:"Freelance Writer" },
        { label: "Green Intiatives", value: "Green Intiatives" },
      ],
    },
    {
      name: "invoice_from_date",
      label: "From Date",
      type: "date",
      value: filters.invoice_from_date,
    },
    {
      name: "invoice_to_date",
      label: "To Date",
      type: "date",
      value: filters.invoice_to_date,
    },
  ];

  return (
    <div className="invoiceCRM-container">
      <div className="invoiceCRM-header">
        <h2>Invoice Return List</h2>
        <button onClick={() => setCurrentPage("createNewInvoiceReturn")}>+ New Invoice Return</button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by Invoice ID or Name" />

      <FilterGroup filters={filterConfig} onChange={handleFilterChange} onClear={clearFilters} />

      <DataTable columns={tableColumns} rows={paginated} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onNext={() => setPage((prev) => prev + 1)}
        onPrev={() => setPage((prev) => prev - 1)}
      />
    </div>
 
  )
}
