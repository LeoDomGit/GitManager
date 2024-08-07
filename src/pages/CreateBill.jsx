/*eslint-disable*/ 
import React from "react";
import Navbar from "../components/Navbar";

function CreateBill() {
  return (
    <>
      <Navbar />
      <form>
        <div className="container p-4 border border-dark rounded">
          {/* <h2 className="text">Hóa đơn dịch vụ chi tiết</h2> */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="row">
                  <div className="col">
                    <h4>Hóa đơn chi tiết</h4>
                  </div>
                  <div className="col text-end">
                    <button className="btn btn-primary w-25" type="button">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <div className="d-flex mb-3">
                    <h5>Tên khách hàng: </h5>
                    <p className="ms-2">Nguyễn Á Âu</p>
                  </div>
                  <div className="d-flex mb-3">
                    <h5>Số điện thoại: </h5>
                    <p className="ms-2">0912345678</p>
                  </div>
                  <div className="d-flex">
                    <h5>Địa chỉ đặt hàng: </h5>
                    <p className="ms-2">Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="col-md">
                  <div className="row">
                    <div>
                      <label className="fw-bold">Trạng thái</label>
                      <div className="d-flex mt-2">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label ms-2" for="flexRadioDefault1">
                          Mới tạo
                        </label>
                      </div>
                      <div className="d-flex mt-1">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label ms-2" for="flexRadioDefault1">
                          Thành công
                        </label>
                      </div>
                      <div className="d-flex mt-1">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label ms-2" for="flexRadioDefault1">
                          Thất bại
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />

                <div className="row">
                  <h4>Chi tiết hóa đơn</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên dịch vụ</th>
                          <th>Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Dịch vụ 1</td>
                          <td>1.000.000đ</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={1}>Thành tiền:</td>
                          <td className="text-end" colSpan={2}>
                            1.200.000đ
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateBill;
