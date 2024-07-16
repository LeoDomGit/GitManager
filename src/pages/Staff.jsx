import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
function Staff() {
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bookings, setBookings] = useState([]);
  const [idBooking, setIdBooking] = useState(0);
  const [note, setNote] = useState("");
  const cancelBooking = (idBooking) => {
    setIdBooking(idBooking);
    setOpen(true);
  };
  const submitCancel = ()=>{
    if(note==''){
      notyf.open({
        type: "error",
        message: "Vui lòng nhập lý do",
      });
    }else{
      fetch(process.env.REACT_APP_API + "cancelBooking/"+idBooking+"?note="+note, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (!res.ok) {
          localStorage.clear();
          window.location.replace("/");
        }
        return res.json();
      })
      .then((res) => {
        if(res.check==true){
          notyf.open({
            type: "success",
            message: "Đã hủy công việc",
          });
          setBookings(res.data);
          setOpen(false);
          setNote('')
        }
      });
    }
  }
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "bookings/nhan-vien", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.clear();
          window.location.replace("/");
        }
        return res.json();
      })
      .then((res) => {
        setBookings(res);
      });
    setInterval(() => {
      fetch(process.env.REACT_APP_API + "bookings/nhan-vien", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            localStorage.clear();
            window.location.replace("/");
          }
          return res.json();
        })
        .then((res) => {
          setBookings(res);
        });
    }, 10000);
  }, []);
  const submitBooking = (id) => {
    fetch(process.env.REACT_APP_API + "submitBooking/"+id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        localStorage.clear();
        window.location.replace("/");
      }
      return res.json();
    })
    .then((res) => {
      if(res.check==true){
        notyf.open({
          type: "success",
          message: "Đã hoàn thành công việc",
        });
        setBookings(res.bookings);
      }
    });
  };
  return (
    <>
      <Navbar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ghi chú hủy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="row">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ghi chú hủy ..."
                onChange={(e)=>setNote(e.target.value)}
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-success"
                  type="button"
                  id="button-addon2"
                  onClick={(e)=>submitCancel()}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      <div className="container">
        <div
          className="row w-100 mt-2 p-3 bg-primary text-light rounded"
          style={{ margin: "0px auto" }}
        >
          <h4 style={{ fontFamily: "Time new romance" }}>Danh sách lịch đặt</h4>
        </div>
        <div className="row pt-2 " style={{ fontFamily: "Time new romance" }}>
          {bookings.length > 0 &&
            bookings.map((booking, index) => (
              <div className="col-md-3 mb-3">
                <div class="card bg-white">
                  <div class="bg-white card-header">
                    <div className="row">
                      <div className="bg-dark col-md-1"></div>
                      <div className="col-md text-center">
                      <a style={{textDecoration:'none'}} target="_blank" href={"https://frontend.codingfs.com/dich-vu/"+booking.service_slug}>{booking.service_name}</a>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white card-body ">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Tên khách
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        disabled
                        value={booking.customer_name}
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Số điện thoại
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        disabled
                        value={booking.phone}
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Thời gian
                      </span>
                      <input
                        type="date-time"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        disabled
                        value={booking.time}
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div class="text-end bg-white card-footer text-muted">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => submitBooking(booking.id)}
                    >
                      {" "}
                      Hoàn thành{" "}
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-3"
                      onClick={(e) => cancelBooking(booking.id)}
                    >
                      {" "}
                      Hủy{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {bookings.length == 0 && <h4>Chưa có booking </h4>}
        </div>
      </div>
    </>
  );
}

export default Staff;
