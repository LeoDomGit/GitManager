import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import axios from "axios";

function CheckOut() {
	const [bookingsCustomers, setBookingsCustomers] = useState([]);
	const [selectCustomer, setSelectCustomer] = useState([]); // Trạng thái để lưu thông tin khách hàng được chọn
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
		axios
			.get(process.env.REACT_APP_API + "bookings-customers")
			.then((res) => {
				setBookingsCustomers(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleClose = () => setShow(false);
	const handleShow = (id_customer) => {
		axios
			.get(process.env.REACT_APP_API + "bookings-customers/" + id_customer)
			.then((res) => {
				setShow(true);
				setSelectCustomer(res.data.data);
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
	};

	const createBill = (id_customer) => {
		axios
			.post(process.env.REACT_APP_API + "checkOut/" + id_customer)
			.then((res) => {
				if (res.data.check === true) {
					notyf.open({
						type: "success",
						message: "Tạo hóa đơn thành công",
					});
					window.location.reload();
				} else {
					notyf.open({
						type: "error",
						message: "Tạo hóa đơn thất bại",
					});
				}
			})
			.catch((error) => {
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
					<table className="table table-bordered table-responsive table-hover mt-3 text-center">
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
							{bookingsCustomers &&
								bookingsCustomers.map((bookingCustomer, index) => (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{bookingCustomer.name}</td>
										<td>{bookingCustomer.email}</td>
										<td>{bookingCustomer.phone ? bookingCustomer.phone : "Chưa điền phone"}</td>
										<td>
											<button onClick={() => createBill(bookingCustomer.id_customer)} type="button" className="btn btn-sm btn-primary w-50">
												Thanh toán
											</button>
											<button onClick={() => handleShow(bookingCustomer.id_customer)} type="button" className="btn btn-sm btn-success w-25 ms-3">
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
				{show && (
					<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header mb-3">
									<h5 className="modal-title">Chi Tiết Thanh Toán</h5>
									<button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
								</div>
								{selectCustomer.length > 0 ? (
									<div className="modal-body">
										<div className="input-group mb-3">
											<span className="input-group-text" id="basic-addon1">
												Tên khách
											</span>
											<input type="text" className="form-control" placeholder="Tên khách" aria-label="Customer Name" aria-describedby="basic-addon1" value={selectCustomer[0]["name"] || ""} readOnly />
										</div>
										<div className="row">
											<div className="col-12">
												<h6>Danh sách dịch vụ khách đã làm ( trong hôm nay )</h6>
											</div>
											<div className="col">
												<table className="table table-hover table-responsive table-bordered">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Dịch vụ</th>
															<th scope="col">Thời gian</th>
														</tr>
													</thead>
													<tbody>
														{selectCustomer.map((customer, index) => {
															return (
																<tr key={index}>
																	<th scope="row">{index + 1}</th>
																	<td>{customer.service_name}</td>
																	<td>{customer.time}</td>
																</tr>
															);
														})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								) : (
									<div className="modal-body">
										<p className="text-center fs-6 fw-bold">Không có dữ liệu đặt trong hôm nay</p>
									</div>
								)}

								<div className="modal-footer">
									{selectCustomer && (
										<button type="button" className="btn btn-success" onClick={() => notyf.success("Thanh toán thành công")}>
											Thanh toán
										</button>
									)}
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
