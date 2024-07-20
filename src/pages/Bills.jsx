import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Stack,
	Grid,
	TableFooter,
	TablePagination,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function Bills() {
	const { id } = useParams();
	const [bills, setBills] = useState([]);
	const [status, setStatus] = useState(0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		axios.get(process.env.REACT_APP_API + "bookings-bills/" + id).then((res) => {
			setBills(res.data.data);
		});
	}, [id]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (bills.length === 0) {
		return (
			<div className="container">
				<Typography variant="h6" align="center">
					Không có dữ liệu hóa đơn.
				</Typography>
			</div>
		);
	}

	const formatPrice = (price, discount) => {
		const discountedPrice = price * (1 - discount / 100);
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(discountedPrice);
	};

	const calculateTotalPrice = () => {
		return bills.reduce((total, bill) => {
			const billTotal = bill.detail.reduce((detailTotal, detail) => {
				const discountedPrice = detail.price * (1 - detail.discount / 100);
				return detailTotal + discountedPrice;
			}, 0);
			return total + billTotal;
		}, 0);
	};

	const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(calculateTotalPrice());

	const notyf = new Notyf({
		duration: 3000,
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
		],
	});

	const handleSubtmit = (e) => {
		e.preventDefault();
		axios.put(process.env.REACT_APP_API + "bookings-bills/update/" + id, { status: Number(status) }).then((res) => {
			if (res.data.check === true) {
				notyf.open({
					type: "success",
					message: "Đã thay đổi trạng thái",
				});
				// setBills(res.data.data);
			} else {
				notyf.open({
					type: "error",
					message: res.data.msg,
				});
			}
		});
	};

	return (
		<>
			<Navbar />
			<div className="container">
				<Box sx={{ my: 2 }}>
					<Typography id="modal-modal-title" variant="h5" align="center" sx={{ fontWeight: "bold" }} component="h2">
						Thông tin chi tiết #{bills[0]?.id}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<Paper sx={{ mx: "auto", p: 2 }}>
							<Stack direction="column" spacing={1}>
								<Grid container>
									<Grid item md={5}>
										<Typography variant="h6" color="ThreeDDarkShadow">
											Tên khách hàng:
										</Typography>
										<Typography variant="h6" color="ThreeDDarkShadow">
											Địa chỉ email khách hàng:
										</Typography>
										<Typography variant="h6" color="ThreeDDarkShadow">
											SĐT khách hàng:
										</Typography>
									</Grid>
									<Grid item md={5}>
										<Typography variant="h6" align="right" color="ThreeDDarkShadow">
											{bills[0]?.customer?.name || "Không có tên"}
										</Typography>
										<Typography variant="h6" align="right" color="ThreeDDarkShadow">
											{bills[0]?.customer?.email || "Không có email"}
										</Typography>
										<Typography variant="h6" align="right" color="ThreeDDarkShadow">
											{bills[0]?.customer?.phone || "Khách hàng chưa nhập SĐT"}
										</Typography>
									</Grid>
									<Grid item md={2}>
										<form onSubmit={handleSubtmit}>
											<FormControl sx={{ mx: 3 }} variant="standard">
												<FormLabel id="demo-error-radios">Trạng thái hóa đơn</FormLabel>
												<RadioGroup aria-labelledby="demo-error-radios" defaultValue={bills[0]?.status}>
													<FormControlLabel onChange={(e) => setStatus(e.target.value)} value={0} control={<Radio />} label="Đơn mới" />
													<FormControlLabel onChange={(e) => setStatus(e.target.value)} value={1} control={<Radio />} label="Đã thanh toán" />
												</RadioGroup>
												<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
													Lưu lại
												</Button>
											</FormControl>
										</form>
									</Grid>
								</Grid>

								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 650 }} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>#</TableCell>
												<TableCell align="right">Loại dịch vụ</TableCell>
												<TableCell align="right">Thời gian đặt lịch</TableCell>
												<TableCell align="right">Giá dịch vụ</TableCell>
												<TableCell align="right">Giá dịch vụ tạm tính</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{bills.map((bill, billIndex) =>
												bill.detail.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detail, detailIndex) => (
													<TableRow hover key={detail.id_booking} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
														<TableCell component="th" scope="row">
															{billIndex * rowsPerPage + detailIndex + 1}
														</TableCell>
														<TableCell align="right">{detail.service || "Không có tên dịch vụ"}</TableCell>
														<TableCell align="right">{detail.time || "Không có thời gian"}</TableCell>
														<TableCell align="right">
															{Intl.NumberFormat("vi-VN", {
																style: "currency",
																currency: "VND",
															}).format(detail.price) || "Không có giá"}{" "}
															<strong>({detail.discount}%)</strong>
														</TableCell>
														<TableCell align="right">{formatPrice(detail.price, detail.discount) || "Không có giá"}</TableCell>
													</TableRow>
												))
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
											<TableRow>
												<TableCell colSpan={4} align="right">
													<Typography variant="h6" color="ThreeDDarkShadow">
														Tổng tiền:
													</Typography>
												</TableCell>
												<TableCell align="right">
													<Typography variant="h6" color="ThreeDDarkShadow">
														{formattedTotalPrice}
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TablePagination
													rowsPerPageOptions={[5, 10, 25]}
													count={bills.length}
													rowsPerPage={rowsPerPage}
													page={page}
													onPageChange={handleChangePage}
													onRowsPerPageChange={handleChangeRowsPerPage}
												/>
											</TableRow>
										</TableFooter>
									</Table>
								</TableContainer>
							</Stack>
						</Paper>
					</Typography>
				</Box>
			</div>
		</>
	);
}

export default Bills;
