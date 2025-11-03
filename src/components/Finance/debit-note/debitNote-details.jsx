import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createNewInvoice.css";
import InvoiceTagsSelector from "./invoiceCheckBoxInput";
import InvoiceComment from "./invoiceComment";
import InvoiceHistory from "./invoiceHistory";
import InvoiceAttachment from "./invoiceAttachment";
import { toast } from "react-toastify";

export default function DebitNoteDetails() {
  const navigate = useNavigate();

  const [debitNoteStatus, setdebitNoteStatus] = useState("");
  const [ApiInvoice, setApiInvoice] = useState({});
  const [debitNoteListData, setdebitNoteListData] = useState([]);
  const [salesOrderData, setSalesOrderData] = useState([]);

  const [debitNoteInput, setdebitNoteInput] = useState({
    invoice_id: "",
    sales_order_ref: "",
    invoice_date: "",
    due_date: "",
    invoice_status: "",
    payment_terms: "",
    customer_ref_no: "",
    invoice_tag: [],
    trems_and_conditions: "",
    custoner_name: "",
    supplier_id: "",
    billing_address: "",
    shipping_address: "",
    email_id: "",
    phone_number: "",
    contact_person: "",
    payment_method: "",
    currency: "",
    payment_ref_number: "",
    transaction_date: "",
    payment_status: "",
    shipping_charges: "",
    global_discount: "",
    amount_paid: "",
  });

  const [detail, setDetail] = useState({
    comment: true,
    history: false,
    attachment: false,
  });

  const [InvoiceBtn, setInvoiceBtn] = useState({
    buttonAcs: true,
    cancel_invoice: true,
    save_draft: false,
    send_invoice: false,
    paid: true,
    pdf: true,
    mail: true,
  });

  const invoiceFromAPI = {
    debitNoteListData: [
      {
        product_name: "T-shirEdit",
        product_id: "CT101",
        quantity: "17",
        umo: "PCS",
        unit_price: "120.0",
        tax: "18",
        discount: "20",
        total: "10009",
      },
      {
        product_name: "T-shirt",
        product_id: "CT101",
        quantity: "17",
        umo: "PCS",
        unit_price: "120.0",
        tax: "18",
        discount: "20",
        total: "10009",
      },
      {
        product_name: "T-shirt",
        product_id: "CT101",
        quantity: "17",
        umo: "PCS",
        unit_price: "120.0",
        tax: "18",
        discount: "20",
        total: "10009",
      },
    ],
    salesOrderData: [
      {
        sales_order_ref: "SO-1001",
        due_date: "2025-07-01",
        payment_terms: "Net 30",
        trems_and_conditions: "Payment within 30 days.",
        custoner_name: "Acme Corp",
        supplier_id: "CUST-001",
        billing_address: "123 Market St, New York, NY 10001",
        shipping_address: "456 Industrial Rd, Brooklyn, NY 11222",
        email_id: "orders@acmecorp.com",
        phone_number: "+1-212-555-1010",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1002",
        due_date: "2025-07-05",
        payment_terms: "Net 15",
        trems_and_conditions: "No returns after 15 days.",
        custoner_name: "Beta Industries",
        supplier_id: "CUST-002",
        billing_address: "22 Park Ave, San Francisco, CA 94110",
        shipping_address: "88 Bay St, Oakland, CA 94607",
        email_id: "sales@betaind.com",
        phone_number: "+1-415-555-2020",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1003",
        due_date: "2025-06-30",
        payment_terms: "Prepaid",
        trems_and_conditions: "Prepayment required before dispatch.",
        custoner_name: "Gamma Ltd",
        supplier_id: "CUST-003",
        billing_address: "77 King St, Toronto, ON M5V 1M9",
        shipping_address: "12 Queen St, Toronto, ON M5H 2N2",
        email_id: "contact@gammaltd.ca",
        phone_number: "+1-647-555-3030",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1004",
        due_date: "2025-07-10",
        payment_terms: "Net 45",
        trems_and_conditions: "Late fee of 2% after 45 days.",
        custoner_name: "Delta Traders",
        supplier_id: "CUST-004",
        billing_address: "101 Broadway, Los Angeles, CA 90012",
        shipping_address: "202 Sunset Blvd, LA, CA 90026",
        email_id: "accounts@deltatraders.com",
        phone_number: "+1-323-555-4040",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1005",
        due_date: "2025-07-03",
        payment_terms: "COD",
        trems_and_conditions: "Cash on Delivery only.",
        custoner_name: "Epsilon Enterprises",
        supplier_id: "CUST-005",
        billing_address: "14 Main St, Austin, TX 78701",
        shipping_address: "33 Elm St, Austin, TX 78702",
        email_id: "info@epsilonent.com",
        phone_number: "+1-512-555-5050",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1006",
        due_date: "2025-07-15",
        payment_terms: "Net 60",
        trems_and_conditions: "No penalty until 60 days.",
        custoner_name: "Zeta Global",
        supplier_id: "CUST-006",
        billing_address: "999 Broadway, Seattle, WA 98101",
        shipping_address: "1111 1st Ave, Seattle, WA 98104",
        email_id: "support@zetaglobal.com",
        phone_number: "+1-206-555-6060",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1007",
        due_date: "2025-07-08",
        payment_terms: "Net 20",
        trems_and_conditions: "20 days to settle payment.",
        custoner_name: "Theta Systems",
        supplier_id: "CUST-007",
        billing_address: "85 Tech Rd, Denver, CO 80202",
        shipping_address: "90 Data Ln, Boulder, CO 80301",
        email_id: "billing@thetasystems.io",
        phone_number: "+1-303-555-7070",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1008",
        due_date: "2025-06-28",
        payment_terms: "Advance 50%",
        trems_and_conditions: "50% advance, 50% on delivery.",
        custoner_name: "Iota Innovations",
        supplier_id: "CUST-008",
        billing_address: "18 Sky Dr, Miami, FL 33101",
        shipping_address: "27 Coral Blvd, Miami, FL 33132",
        email_id: "orders@iotainnov.com",
        phone_number: "+1-786-555-8080",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1009",
        due_date: "2025-07-12",
        payment_terms: "Net 10",
        trems_and_conditions: "Strict 10-day policy.",
        custoner_name: "Kappa Solutions",
        supplier_id: "CUST-009",
        billing_address: "350 Innovation Way, Boston, MA 02115",
        shipping_address: "99 Science Park, Boston, MA 02118",
        email_id: "kappa@solutions.com",
        phone_number: "+1-617-555-9090",
        payment_method: "Credit Card",
        currency: "IND",
      },
      {
        sales_order_ref: "SO-1010",
        due_date: "2025-07-20",
        payment_terms: "Net 30",
        trems_and_conditions: "Standard 30-day billing.",
        custoner_name: "Lambda Tech",
        supplier_id: "CUST-010",
        billing_address: "42 Orbit St, Chicago, IL 60601",
        shipping_address: "73 Galaxy Ave, Chicago, IL 60611",
        email_id: "contact@lambdatech.org",
        phone_number: "+1-312-555-0001",
        payment_method: "Credit Card",
        currency: "IND",
      },
    ],
  };

  useEffect(() => {
    setApiInvoice(invoiceFromAPI);
  }, []);

  useEffect(() => {
    if (Object.keys(ApiInvoice).length > 0) {
      setdebitNoteListData(ApiInvoice.debitNoteListData);
      setSalesOrderData(ApiInvoice.salesOrderData);
    }
  }, [ApiInvoice]);

  useEffect(() => {
    const selected = debitNoteInput.sales_order_ref;
    if (selected) {
      const salesRef = salesOrderData.find(
        (ele) => ele.sales_order_ref === selected
      );
      if (salesRef) {
        setdebitNoteInput((prev) => ({
          ...prev,
          ...salesRef,
        }));
      }
    }
  }, [debitNoteInput.sales_order_ref, salesOrderData]);

  useEffect(() => {
    const statusUpdate = {
      "": {
        buttonAcs: false,
        invoice_return: true,
        cancel_invoice: true,
        save_draft: false,
        send_invoice: false,
        paid: true,
        pdf: true,
        mail: true,
      },
      Draft: {
        buttonAcs: false,
        cancel_invoice: true,
        save_draft: false,
        send_invoice: false,
        paid: true,
        pdf: false,
        mail: false,
      },
      Send: {
        buttonAcs: true,
        invoice_return: false,
        cancel_invoice: false,
        save_draft: true,
        send_invoice: true,
        paid: false,
        pdf: false,
        mail: false,
      },
      Paid: {
        buttonAcs: true,
        invoice_return: false,
        cancel_invoice: false,
        save_draft: true,
        send_invoice: true,
        paid: true,
        pdf: false,
        mail: false,
      },
      Cancelled: {
        buttonAcs: true,
        invoice_return: true,
        cancel_invoice: true,
        save_draft: true,
        send_invoice: true,
        paid: true,
        pdf: false,
        mail: false,
      },
    };

    setInvoiceBtn(statusUpdate[debitNoteStatus] || InvoiceBtn);
  }, [debitNoteStatus]);

  const handledebitNoteInputChanges = (e) => {
    const { id, value } = e.target;
    setdebitNoteInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // --- State Transitions ---
  const handleSaveDraftState = (e) => {
    e.preventDefault();
    setdebitNoteStatus("Draft");
    toast.success("Invoice saved as draft.");
  };

  const handleSendInvoiceState = (e) => {
    e.preventDefault();
    setdebitNoteStatus("Send");
    toast.success("Invoice sent.");
  };

  const handlePaidState = (e) => {
    e.preventDefault();
    setdebitNoteStatus("Paid");
    toast.success("Invoice marked as paid.");
  };

  const handleCancelledState = (e) => {
    e.preventDefault();
    setdebitNoteStatus("Cancelled");
    toast.success("Invoice cancelled.");
  };

  return (
    <div className="createNewInvoice-container">
      <form onSubmit={handleSendInvoiceState}>
        {/* --- Header --- */}
        <div className="createNewInvoice-head">
          <nav>
            <p>
              {"Debit Note"}
            </p>
            {debitNoteStatus !== "" && (
              <h3 className={`createNewInvoice-Status-${debitNoteStatus}`}>
                Status: {debitNoteStatus}
              </h3>
            )}
          </nav>
          <div>
            <nav
              className="createNewInvoice-close"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <svg
                className="createNewInvoice-circle-x-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
              <p>Close</p>
            </nav>
          </div>
        </div>
        <div className="createNewInvoice-input-container">
        <div className="createNewInvoice-input-box">
         <label htmlFor="invoice_id">Debit Note ID {`(Auto Generate)`}</label>
            <input
                id="invoice_id"
                type="text"
                placeholder="Auto Generate"
                value={debitNoteInput.debitNote_id}
                onChange={handledebitNoteInputChanges}
                disabled
              />
            </div>
            <div className="createNewInvoice-input-box">
              <label htmlFor="debitNote_date">
                Debit Note Date<sup>*</sup>
              </label>
              <input
                id="debitNote_date"
                type="date"
                placeholder="Select Date"
                value={debitNoteInput.debitNote_date}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewInvoice-input-container">
            <div className="createNewInvoice-input-box">
           <label htmlFor="invoice_id">PO Reference ID {`(Auto Generate)`}</label>
            <input
                id="invoiceReference_id"
                type="text"
                placeholder="Auto Generate"
                value={debitNoteInput.invoiceReference_id}
                onChange={handledebitNoteInputChanges}
                disabled
              />
            </div>
            <div className="createNewInvoice-input-box">
             <label htmlFor="payment_terms">
                Created By<sup>*</sup>
              </label>
              <select
                id="created_by"
                value={debitNoteInput.createdBy}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select User</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>
          </div>
          <div className="createNewInvoice-input-container">
            <div className="createNewInvoice-input-box">
              <label htmlFor="payment_terms">
                Branch/Location<sup>*</sup>
              </label>
              <select
                id="branch"
                value={debitNoteInput.branch}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select Branch</option>
                <option  value="Branch 1">Branch 1</option>
                <option value="Branch 2">Branch 2</option>
                <option value="Branch 3">Branch 3</option>
              </select>
            </div>
            <div className="createNewInvoice-input-box">
              <label htmlFor="currency">
                Currency<sup>*</sup>
              </label>
              <select
                id="currency"
                value={debitNoteInput.currency}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="IND">IND</option>
                <option value="GBP">GBP</option>
                <option value="SGD">SGD</option>
              </select>
            </div>
          </div>
          <nav className="createNewInvoice-subtit">Supplier Information</nav>
          <div className="createNewInvoice-input-container">
             <div className="createNewInvoice-input-box">
              <label htmlFor="supplier_id">
                Supplier ID {`(Auto Generate)`}
              </label>
              <input
                id="supplier_id"
                type="text"
                placeholder="Auto Generate"
                disabled
                value={debitNoteInput.supplier_id}
                onChange={handledebitNoteInputChanges}
              />
            </div>
            <div className="createNewInvoice-input-box">
              <label htmlFor="custoner_name">
                Supplier Name<sup>*</sup>
              </label>
              <select
                id="custoner_name"
                required
                value={debitNoteInput.custoner_name}
                onChange={handledebitNoteInputChanges}
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select Customer </option>
                {salesOrderData.map((ele, ind) => (
                  <option key={ind} value={ele.custoner_name}>
                    {ele.custoner_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="createNewInvoice-input-container">
             <div className="createNewInvoice-input-box">
              <label htmlFor="PO_date">
                PO Date<sup>*</sup>
              </label>
              <input
                id="PO_date"
                type="date"
                placeholder="Select Date"
                value={debitNoteInput.PO_date}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
            </div>
             <div className="createNewInvoice-input-box">
              <label htmlFor="due_date">
                Due Date<sup>*</sup>
              </label>
              <input
                id="due_date"
                type="date"
                placeholder="Select Date"
                value={debitNoteInput.due_date}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewInvoice-input-container">
            <div className="createNewInvoice-input-box">
              <label htmlFor="payment_terms">
                Payment Terms<sup>*</sup>
              </label>
              <select
                id="payment_terms"
                value={debitNoteInput.payment_terms}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select Payment Method</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>
            <div className="createNewInvoice-input-box">
              <label htmlFor="payment_terms">
                Inco Terms<sup>*</sup>
              </label>
              <select
                id="payment_terms"
                value={debitNoteInput.payment_terms}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              >
                <option value="">Select Payment Status</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>
            
          </div>
          <div className="createNewInvoice-input-container">
              <div className="createNewInvoice-input-box">
              <label htmlFor="address">
                Payment Status<sup>*</sup>
              </label>
              <input
                id="billing_address"
                type="text"
                placeholder="Enter payment status"
                value={debitNoteInput.invoice_status}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
              </div>
            <div className="createNewInvoice-input-box">
              <label htmlFor="address">
                Credit Limit<sup>*</sup>
              </label>
              <input
                id="credit_limit"
                type="text"
                placeholder="Eg: 50000rs"
                value={debitNoteInput.credit_limit}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewInvoice-input-container">
            <div className="createNewInvoice-input-box">
              <label htmlFor="purchase_total">
                Purchase Total<sup>*</sup>
              </label>
              <input
                id="purchase_total"
                type="text"
                placeholder="Eg: 50000rs"
                value={debitNoteInput.purchase_total}
                onChange={handledebitNoteInputChanges}
                required
                disabled={InvoiceBtn.buttonAcs}
              />
            </div>
          </div>
          <nav className="createNewInvoice-subtit">Returned Line Items</nav>
          <div className="createNewInvoice-table-container">
            <table>
              <thead className="createNewInvoice-table-head">
                <tr>
                  <th>#</th>
                  <th>
                    <pre>Product name</pre>
                  </th>
                  <th>
                    <pre>Product ID</pre>
                  </th>
                  <th>Returned Quantity</th>
                  <th>UOM</th>
                  <th>Return Reason</th>
                  <th>
                    <pre>Unit Price</pre>
                  </th>
                  <th>
                    <pre>Tax (%)</pre>
                  </th>
                  <th>
                    <pre>Discount (%)</pre>
                  </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="createNewInvoice-table-body">
                {debitNoteListData.length > 0 ? (
                  debitNoteListData.map((ele, ind) => (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{ele.product_name}</td>
                      <td>{ele.product_id}</td>
                      <td>{ele.return_quantity ?? "10"}</td>
                      <td>{ele.umo}</td>
                      <td>{ele.return_reason ?? "Damage"}</td>
                      <td>{ele.unit_price}</td>
                      <td>{ele.tax}</td>
                      <td>{ele.discount}</td>
                      <td>{ele.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td>
                      <pre>No Data Found</pre>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <nav className="createNewInvoice-subtit">Payment & Refund Details</nav>  
          <div class="credit-note-container">
          <div class="credit-note-box">
            <div class="credit-note-field">
              <label>Purchased Total:</label>
              <div class="readonly-value">₹418</div>
            </div>

            <div class="credit-note-field">
              <label>Amount Paid to Vendor:</label>
              <input type="text" value="₹418" />
            </div>

            <div class="credit-note-field">
              <label>Balance Due to Vendor:</label>
              <div class="readonly-value">₹0</div>
            </div>

            <div class="credit-note-field">
              <label>Purchase Return Amount:</label>
              <div class="readonly-value">₹0</div>
            </div>

            <div class="credit-note-field">
              <label>Balance to Recover:</label>
              <div class="readonly-value">₹0</div>
            </div>
          </div>
          <div class="credit-note-box">
            <div class="credit-note-field">
              <label>Refund Mode:</label>
              <select>
                <option>None</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>Cheque</option>
              </select>
            </div>

            <div class="credit-note-field">
              <label>Refund Received:</label>
              <input type="text" placeholder="Enter paid amount" />
            </div>

            <div class="credit-note-field">
              <label>Refund Date:</label>
              <input type="date" />
            </div>

            <div class="credit-note-field credit-note-adjusted-reference">
              <label>Adjusted Invoice Reference:</label>
              <textarea placeholder="Not yet adjusted"></textarea>
            </div>
          </div>
          </div>

          <div className="createNewInvoice-hub-container">
            <div className="createNewInvoice-hub-head">
              <p
                className={
                  detail.comment
                    ? "createNewInvoice-hub-head-bg-black"
                    : "createNewInvoice-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: false,
                    attachment: false,
                    comment: true,
                  });
                }}
              >
                Comments
              </p>
              <p
                className={
                  detail.history
                    ? "createNewInvoice-hub-head-bg-black"
                    : "createNewInvoice-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: true,
                    attachment: false,
                    comment: false,
                  });
                }}
              >
                History
              </p>
              <p
                className={
                  detail.attachment
                    ? "createNewInvoice-hub-head-bg-black"
                    : "createNewInvoice-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: false,
                    attachment: true,
                    comment: false,
                  });
                }}
              >
                Attachments
              </p>
            </div>
            <div className="createNewInvoice-hub-body">
              {detail.comment && <InvoiceComment />}
              {detail.history && <InvoiceHistory />}
              {detail.attachment && <InvoiceAttachment />}
            </div>
          </div>
        <div className="createNewInvoice-btn-container">
            <button
              className={
                debitNoteStatus === "Send" || debitNoteStatus === "Paid"
                  ? "createNewInvoice-order-active-btn"
                  : "createNewInvoice-inactive-btn"
              }
              onClick={handleCancelledState}
              disabled={InvoiceBtn.cancel_invoice}
            >
              {debitNoteStatus === "Cancelled" ? "Cancelled" : "Cancel Debit Note"}
            </button>
            <nav>
              <button
                className="createNewInvoice-cancel-btn"
                onClick={(e) => {
                  e.preventDefault();
                  prevpg(-1);
                }}
              >
                Cancel
              </button>
              <button
                className={
                  debitNoteStatus === "" || debitNoteStatus === "Draft"
                    ? "createNewInvoice-active-btn"
                    : "createNewInvoice-completed-btn"
                }
                onClick={handleSaveDraftState}
                disabled={InvoiceBtn.save_draft}
              >
                Save Draft
              </button>
              <button
                className={
                  debitNoteStatus === "Send"
                    ? "createNewInvoice-active-btn"
                    : debitNoteStatus === "" || debitNoteStatus === "Draft"
                    ? "createNewInvoice-inactive-btn"
                    : "createNewInvoice-completed-btn"
                }
                onClick={handlePaidState}
                disabled={InvoiceBtn.paid}
              >
                Mark as Settled
              </button>
              <svg
                className={
                  debitNoteStatus !== ""
                    ? "createNewInvoice-pdf-mail-activelogo"
                    : "createNewInvoice-pdf-mail-futurelogo"
                }
                disabled={InvoiceBtn.pdf}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.600098 2.4C0.600098 1.76348 0.852954 1.15303 1.30304 0.702944C1.75313 0.252856 2.36358 0 3.0001 0L16.1313 0L21.4001 5.2688V21.6C21.4001 22.2365 21.1472 22.847 20.6972 23.2971C20.2471 23.7471 19.6366 24 19.0001 24H3.0001C2.36358 24 1.75313 23.7471 1.30304 23.2971C0.852954 22.847 0.600098 22.2365 0.600098 21.6V2.4ZM4.6001 9.6H2.2001V17.6H3.8001V14.4H4.6001C5.23662 14.4 5.84707 14.1471 6.29715 13.6971C6.74724 13.247 7.0001 12.6365 7.0001 12C7.0001 11.3635 6.74724 10.753 6.29715 10.3029C5.84707 9.85286 5.23662 9.6 4.6001 9.6ZM11.0001 9.6H8.6001V17.6H11.0001C11.6366 17.6 12.2471 17.3471 12.6972 16.8971C13.1472 16.447 13.4001 15.8365 13.4001 15.2V12C13.4001 11.3635 13.1472 10.753 12.6972 10.3029C12.2471 9.85286 11.6366 9.6 11.0001 9.6ZM15.0001 17.6V9.6H19.8001V11.2H16.6001V12.8H18.2001V14.4H16.6001V17.6H15.0001Z"
                />
              </svg>
              <svg
                className={
                  debitNoteStatus !== ""
                    ? "createNewInvoice-pdf-mail-activelogo"
                    : "createNewInvoice-pdf-mail-futurelogo"
                }
                disabled={InvoiceBtn.mail}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM10 8.825C10.0833 8.825 10.171 8.81233 10.263 8.787C10.355 8.76167 10.4423 8.72433 10.525 8.675L17.6 4.25C17.7333 4.16667 17.8333 4.06267 17.9 3.938C17.9667 3.81333 18 3.67567 18 3.525C18 3.19167 17.8583 2.94167 17.575 2.775C17.2917 2.60833 17 2.61667 16.7 2.8L10 7L3.3 2.8C3 2.61667 2.70833 2.61267 2.425 2.788C2.14167 2.96333 2 3.209 2 3.525C2 3.69167 2.03333 3.83767 2.1 3.963C2.16667 4.08833 2.26667 4.184 2.4 4.25L9.475 8.675C9.55833 8.725 9.646 8.76267 9.738 8.788C9.83 8.81333 9.91733 8.82567 10 8.825Z" />
              </svg>
            </nav>
          </div>
      </form>
    </div>
  );
}

