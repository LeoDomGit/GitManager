import React from "react";
import Navbar from "../components/Navbar";

function PaymentSuccess() {
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="position-relative p-5 shadow text-center text-muted bg-body border border-dashed rounded-5">
          {/* <button type="button" className="btn-close position-absolute top-0 end-0 translate-middle btn btn-sm btn-primary"></button> */}
          <svg className="bi mt-5 mb-3" style={{ height: "60px", width: "60px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" color="green" height="60" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>
          </svg>
          <h1>Thanh toán thành công</h1>
          <p className="lead">Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi</p>
          <div className="d-flex justify-content-center pb-5">
            <button type="button" className="btn btn-primary me-3">
              Quay về trang chủ
            </button>
            <button type="button" className="btn btn-success">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
