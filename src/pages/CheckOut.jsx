/*eslint-disable*/ 
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import axios from "axios";
import { Box, Button, IconButton, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Grid, TableFooter, TablePagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

function CheckOut() {
	const [bookingsCustomers, setBookingsCustomers] = useState([]);
	const [selectCustomer, setSelectCustomer] = useState([]);
	const [show, setShow] = useState(false);
	const [date, setDate] = useState("");
	const [date1, setDate1] = useState("");

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
					window.location.replace("/bills/" + id_customer);
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

	const handleDateFilter = () => {
		const filteredData = bookingsCustomers.filter((item) => {
			const time = new Date(item.time);
			const fromTime = date ? new Date(date) : null;
			const toTime = date1 ? new Date(date1) : null;

			if (fromTime && !toTime) {
				return time >= fromTime;
			}

			if (!fromTime && toTime) {
				return time <= toTime;
			}

			if (fromTime && toTime) {
				return time >= fromTime && time <= toTime;
			}

			return true;
		});

		setBookingsCustomers(filteredData);
	};

	const columns = [
		{ field: "id_booking", headerName: "ID", width: 100 },
		{ field: "name", headerName: "Tên người đặt", width: 250 },
		{
			field: "phone",
			headerName: "Số điện thoại",
			width: 250,
			renderCell: (params) =>
				params.value ? (
					<Link className="text-decoration-none" to={`tel:${params.value}`}>
						{params.value}
					</Link>
				) : (
					<span style={{ color: "red" }}>Không có SĐT</span>
				),
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			renderCell: (params) =>
				params.value ? (
					<Link className="text-decoration-none" to={`mailto:${params.value}`}>
						{params.value}
					</Link>
				) : (
					<span style={{ color: "red" }}>Không có Email</span>
				),
		},
		{ field: "time", headerName: "Thời gian đặt lịch", width: 250 },
		{
			field: "status",
			headerName: "Trạng thái",
			width: 120,
			renderCell: (params) => (
				<IconButton aria-label="info" color="info" onClick={() => handleShow(params.row.id_customer)}>
					<InfoOutlinedIcon />
				</IconButton>
			),
		},
	];

	return (
		<>
			<Navbar />
			<Modal open={show} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 980,
						height: 550,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}>
					<Typography id="modal-modal-title" variant="h5" align="center" sx={{ fontWeight: "bold" }} component="h2">
						Thông tin chi tiết
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<Paper sx={{ mx: "auto", p: 2 }}>
							<Stack direction="column" spacing={1}>
								<Grid container>
									<Grid item md={6}>
										<Typography variant="h6" color="ThreeDDarkShadow">
											Tên khách hàng:
										</Typography>
										<Typography variant="h6" color="ThreeDDarkShadow">
											Địa chỉ email khách hàng:
										</Typography>
									</Grid>
									<Grid item md={6}>
										<Typography variant="h6" align="right" color="ThreeDDarkShadow">
											{selectCustomer.length > 0 && selectCustomer[0].name}
										</Typography>
										<Typography variant="h6" align="right" color="ThreeDDarkShadow">
											{selectCustomer.length > 0 && selectCustomer[0].email}
										</Typography>
									</Grid>
								</Grid>
								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 650 }} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>#</TableCell>
												<TableCell align="right">Loại dịch vụ</TableCell>
												<TableCell align="right">Thời gian đặt lịch</TableCell>
												<TableCell align="right">Nhân viên thực hiện</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{selectCustomer.length > 0 ? (
												selectCustomer.map((row, index) => (
													<TableRow key={row.id_booking} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
														<TableCell component="th" scope="row">
															{index + 1}
														</TableCell>
														<TableCell align="right">{row.service_name}</TableCell>
														<TableCell align="right">{row.time}</TableCell>
														<TableCell align="right">{row.user_name}</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell align="center" padding="normal" colSpan={5}>
														Nguời dùng không đặt lịch nào trong hôm nay
													</TableCell>
												</TableRow>
											)}
										</TableBody>
										<TableFooter
											sx={{
												"& .MuiTableCell-root": {
													border: "none",
												},
												"& .MuiTablePagination-root": {
													justifyContent: "center",
												},
											}}>
										</TableFooter>
									</Table>
								</TableContainer>
							</Stack>
						</Paper>
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<Stack direction="row" spacing={2} justifyContent="space-between" gutterBottom>
							<Button variant="outlined" color="error" sx={{ width: "20%" }} onClick={handleClose}>
								Cancel
							</Button>
							{selectCustomer.length >0 && selectCustomer[0].status==2 && (
							<Button variant="contained" color="success" sx={{ width: "20%" }}  onClick={() => createBill(selectCustomer[0].id_customer)}>
							Tạo hóa đơn 		
						</Button>
							)}

						</Stack>
					</Typography>
				</Box>
			</Modal>

			<div className="container">
				<div className="row w-100 mt-2 p-3 bg-primary text-light rounded m-auto">
					<h4>Danh sách thanh toán</h4>
				</div>
				<div className="d-flex justify-content-between">
					<Row className="mb-3">
						<Col>
							<Form.Group controlId="formBasic2">
								<Form.Label>
									<strong>Tìm kiếm theo thời gian:</strong>
								</Form.Label>
								<InputGroup>
									<Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
									<Form.Control type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
									<Button variant="contained" color="success" onClick={handleDateFilter}>
										Áp dụng
									</Button>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
				</div>
				<Box sx={{ height: 650, width: "100%" }}>
					<DataGrid
						rows={bookingsCustomers}
						columns={columns}
						getRowId={(row) => row.id_booking}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[10, 20, 30]}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				</Box>
			</div>
		</>
	);
}

export default CheckOut;
