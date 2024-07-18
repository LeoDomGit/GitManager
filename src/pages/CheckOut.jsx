import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import axios from "axios";

function CheckOut() {
  const [bookingsCustomers, setBookingsCustomers] = useState([]);
  const [selectedCustomerCheckout, setSelectedCustomerCheckout] = useState(null); // Trạng thái để lưu thông tin khách hàng được chọn
  const [show, setShow] = useState(false);
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "success",
        background: "green",
        color: "white",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "info",
        background: "#24b3f0",
        color: "white",
        duration: 1500,
        dismissible: false,
        icon: '<i class="bi bi-bag-check"></i>',
      },
    ],
  });

  useEffect(() => {
    console.log("Component mounted, starting fetch...");
    fetch(`${process.env.REACT_APP_API}bookings-customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log("Response status:", res.status); // Kiểm tra mã trạng thái của phản hồi
        if (!res.ok) {
          localStorage.clear();
          window.location.replace("/");
          throw new Error("Network response was not ok.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dữ liệu từ API:", data); // Thêm dòng này để kiểm tra dữ liệu
        if (data.data) {
          setBookingsCustomers(data.data);
        } else {
          console.error("Dữ liệu không có thuộc tính 'data'.");
          setBookingsCustomers([]);
        }
      })
      .catch((error) => {
        notyf.error("Có lỗi xảy ra khi tải dữ liệu.");
        console.error("Fetch error:", error);
      });
  }, []); // Chạy useEffect một lần khi component mount

  // Hàm để lấy thông tin chi tiết của khách hàng từ API
  const fetchCustomerCheckoutDetails = (id_customer) => {
    fetch(`${process.env.REACT_APP_API}bookings-customers/${id_customer}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Chi tiết khách hàng từ API:", data);
        if (data.data) {
          setSelectedCustomerCheckout(data.data);
          setShow(true);
        } else {
          console.error("Dữ liệu không có thuộc tính 'data'.");
        }
      })
      .catch((error) => {
        notyf.error("Có lỗi xảy ra khi tải thông tin chi tiết.");
        console.error("Fetch error:", error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id_customer) => {
    fetchCustomerCheckoutDetails(id_customer); // Gọi fetchCustomerCheckoutDetails với id của khách hàng
  };

  const getCustomer = (id_customer) => {
    axios
      .get(` ${process.env.REACT_APP_API}bookings-customers/${id_customer}`)
      .then((res) => {
        setSelectedCustomerCheckout(res.data.data);
        setShow(true);
      })
      .catch((error) => {
        notyf.error("Có lỗi xảy ra khi tải dữ liệu.");
        console.error("Fetch error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row w-100 mt-2 p-3 bg-primary text-light rounded" style={{ margin: "0px auto" }}>
          <h4>Danh sách thanh toán</h4>
        </div>
        {bookingsCustomers.length > 0 ? (
          <table className="table mt-3 text-center">
            <thead className="table-primary">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookingsCustomers.map((bookingCustomer) => (
                <tr key={bookingCustomer.id_customer}>
                  <th scope="row">{bookingCustomer.id_customer}</th>
                  <td>{bookingCustomer.name}</td>
                  <td>{bookingCustomer.email}</td>
                  <td>{bookingCustomer.phone}</td>
                  <td>
                    <button
                      onClick={() => getCustomer(bookingCustomer.id_customer)}
                      // onClick={() => handleShow(bookingCustomer.id_customer)} // Gọi handleShow với id của khách hàng
                      type="button"
                      className="btn btn-sm btn-success w-50 ms-3"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có dữ liệu để hiển thị</p>
        )}
        {/* Modal */}
        {show && selectedCustomerCheckout && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header mb-3">
                  <h5 className="modal-title">Chi Tiết Thanh Toán</h5>
                  <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Dịch vụ
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên dịch vụ"
                      aria-label="Service Name"
                      aria-describedby="basic-addon1"
                      value={selectedCustomerCheckout[0]["service_name"] || ""}
                      readOnly
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Tên khách
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên khách"
                      aria-label="Customer Name"
                      aria-describedby="basic-addon1"
                      value={selectedCustomerCheckout[0]["name"] || ""}
                      readOnly
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Email
                    </span>
                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={selectedCustomerCheckout[0]["email"] || ""} readOnly />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Số điện thoại
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      aria-label="Phone"
                      aria-describedby="basic-addon1"
                      value={selectedCustomerCheckout[0]["phone"] || ""}
                      readOnly
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Thời gian
                    </span>
                    <input type="text" className="form-control" placeholder="Thời gian" aria-label="Time" aria-describedby="basic-addon1" value={selectedCustomerCheckout[0]["time"] || ""} readOnly />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary w-25">
                    Thanh toán
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleClose}>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckOut;
