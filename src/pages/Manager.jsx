import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import echo from "../echo";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import axios from "axios";

function Manager() {
  const [bookings, setBookings] = useState([]);
  const [staffs,setStaffs]= useState([]);
  const [idUser,setIdUser]= useState(0);
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
    setInterval(() => {
        echo.channel("bookings").listen("PushBooking", (e) => {
            setBookings(e.bookings);
          });
          return () => {
            echo.leaveChannel("bookings");
          };
    }, 1000);
  }, []);
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "bookings")
      .then((res) => res.json())
      .then((res) => {
        setBookings(res);
      });
    fetch(process.env.REACT_APP_API+'staff').then(res=>res.json())
    .then((res)=>{
        setStaffs(res);
    })
  }, []);
  const submitUserBooking =(idBooking)=>{
    if(idUser==0){
        notyf.open({
            type: "error",
            message: "Vui lòng chọn nhân viên",
          });
    }else{
        axios.put(process.env.REACT_APP_API+'bookings/'+idBooking,{
            id_user:Number(idUser),
            status:1
        }).then((res)=>{
            if(res.data.check==true){
                notyf.open({
                    type: "success",
                    message: "Đã giao cho nhân viên",
                  });
                  setBookings(res.data.bookings);
            }else if(res.data.check==false){
                if(res.data.msg){
                    notyf.open({
                        type: "error",
                        message: res.data.msg,
                      });
                }
            }
        })
    }
  }
  return (
    <>
      <Navbar />
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
                        {booking.service_name}
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
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                       Nhân viên
                      </span>
                     <select name="" defaultValue={booking.id_user?booking.id_user:0} onChange={(e)=>setIdUser(e.target.value)} className="form-control" id="">
                     <option value="0" disabled>Chọn nhân viên</option>
                     {staffs.length>0 && staffs.map((item,index)=>(
                        <option value={item.id}>{item.name}</option>
                     ))}
                     </select>
                    </div>
                  </div>
                  <div class="text-end bg-white card-footer text-muted">
                    <button className="btn btn-sm btn-primary" onClick={(e)=>submitUserBooking(booking.id)}> Sắp xếp </button>
                  </div>
                </div>
              </div>
            ))}
            {bookings.length==0 && (
                <h4>Chưa có booking </h4>
            )}
        </div>
      </div>
    </>
  );
}

export default Manager;
