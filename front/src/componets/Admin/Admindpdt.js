import AdSidebar from "./AdSidebar";
import Nav from "./Navbar";
import { Modal, ModalBody, ModalHeader, Row, Col, Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Adminpdt() {
	const columns = [
		{ id: "id", name: "S.no" },
		{ id: "id", name: "Product Name" },
		{ id: "id", name: "Price" },
		{ id: "id", name: "Product Image-1 " },
		{ id: "id", name: "product Image-2" },
		{ id: "id", name: "Status" },
		{ id: "id", name: "Category" },
		{ id: "id", name: "Action-1" },
		{ id: "id", name: "Action-2" },
	];
	const [modal, setModal] = useState(false);
	const [toggle, setToggle] = useState(true);
	const [image, setimage] = useState("");
	const [imageblr, setimageblr] = useState("");
	const [price, setprice] = useState("");
	const [pdtname, setpdtname] = useState("");
	const [pcname, setnamec] = useState("");

	const [message, setMessage] = useState("");

	const notify = toast;
	const Toggle = () => {
		setToggle(!toggle);
	};
	const [pageIndex, pagechange] = useState(0);
	const [rowperpage, rowperpagechange] = useState(2);
	const handlechangepage = (e, newpage) => {
		pagechange(newpage);
	};
	const handelrowperpage = (e) => {
		rowperpagechange(+e.target.value);
		pagechange(0);
	};
	const [ptdshow, setPdtshow] = useState([]);

	useEffect(() => {
		fetch("/skapi/showpdt")
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				// console.log(data)
				if (data.status === 200) {
					setPdtshow(data.apiData);
				} else {
					setMessage(data.message);
				}
			});
	}, []);

	function handeladdform(e) {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append("image", image);
		formdata.append("image2", imageblr);
		formdata.append("price", price);
		formdata.append("pdtname", pdtname);
		formdata.append("pcname", pcname);

		//  console.log(image)
		fetch("/skapi/addpdt", {
			method: "POST",
			body: formdata,
		})
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				if (data.status === 200) {
					toast("Successfully Product added. ");
				} else {
					toast("opps! somthing went wrong");
				}
			});
	}

	function handledelete(e, id) {
		// Use window.confirm to show a confirmation dialog
		const confirmed = window.confirm(
			"Are you sure you want to delete this data?"
		);

		if (confirmed) {
			fetch(`/skapi/pdtdel/${id}`, {
				method: "DELETE",
			})
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					if (data.status === 200) {
						toast("Successfully Deleted", {
							position: "top-center",
							autoClose: 2000,
						});
					} else {
						toast("Try Again", {
							position: "top-center",
							autoClose: 2000,
						});
					}
				});
		} else {
			// User canceled the deletion
			// You can add code to handle the cancellation here if needed
		}
	}

	return (
		<>
			<div className="container-fluid bg-primary min-vh-100 ">
				<div className="row ">
					{toggle && (
						<div className="col-4 col-md-2  vh-100  bg-white">
							<AdSidebar />
						</div>
					)}
					{toggle && <div className="col-1"></div>}
					<div className="col">
						<Nav Toggle={Toggle} />
						<Modal
							size="lg"
							isOpen={modal}
							toggle={() => setModal(!modal)}

							// onClosed={
							//  ()=>{setproductlink('') ;setproductname('')}
							// }
						>
							<ModalHeader toggle={() => setModal(!modal)}>
								<button
									type="button"
									className="close"
									style={{
										position: "absolute",
										top: "15px",
										right: "15px",
									}}
									onClick={() => setModal(false)}
								>
									<span
										aria-hidden="true"
										className="ms-auto"
									>
										&times;
									</span>
								</button>
								Add Product
							</ModalHeader>
							<ModalBody>
								<form
									onSubmit={(e) => {
										handeladdform(e);
									}}
								>
									<Row>
										<Col lg={12}>
											<div>
												<label
													htmlFor="product Name"
													className="form-label"
												>
													Product Name*
												</label>
												<input
													type="text"
													onChange={(e) => {
														setpdtname(
															e.target.value
														);
													}}
													className="form-control"
													placeholder="Enter here"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<label
													htmlFor="product Name"
													className="form-label"
												>
													Product price*
												</label>
												<input
													type="number"
													onChange={(e) => {
														setprice(
															e.target.value
														);
													}}
													className="form-control"
													placeholder="Enter here"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<label
													htmlFor="product img"
													className="form-label"
												>
													Product image-front*
												</label>
												<input
													type="file"
													accept="image/*"
													onChange={(e) => {
														setimage(
															e.target.files[0]
														);
													}}
													className="form-control"
													placeholder="upload Here"
												/>
											</div>
										</Col>

										<Col lg={12}>
											<div>
												<label
													htmlFor="product img"
													className="form-label"
												>
													Product image-hover*
												</label>
												<input
													type="file"
													accept="image/*"
													onChange={(e) => {
														setimageblr(
															e.target.files[0]
														);
													}}
													className="form-control"
													placeholder="upload Here"
												/>
											</div>
										</Col>
										<Col lg={12}>
										<label
													
													className="form-label"
												>
													Product Category*
												</label>
											<select className="form-select"  
											onChange={(e)=>{setnamec(e.target.value)}} >
												<option value="select">select</option>
											<option value="singlename"  >Single Name</option>
                                                        <option value="dualname">Dual Name</option>
											</select>
										</Col>
									</Row>
									<button
										className="btn btn-danger mt-2"
										onClick={notify}
									>
										Submit
									</button>
									<ToastContainer
										style={{ position: "top-center" }}
									/>
								</form>
							</ModalBody>
						</Modal>

						<button
							className="btn btn-warning  mt-3  add-pdt float-end "
							onClick={() => setModal(true)}
						>
							Add Product{" "}
						</button>

						<Paper
							sx={{
								width: "100%",
								marginTop: "60px",
								minHeight: "300px",
							}}
						>
							<TableContainer>
								<Table>
									<TableHead className="table table-hover">
										<TableRow>
											{columns &&
												columns.map((column) => (
													<TableCell
														className="fw-bold"
														key={column.id}
													>
														{column.name}
													</TableCell>
												))}
										</TableRow>
									</TableHead>
									<TableBody>
										{ptdshow &&
											ptdshow
												.slice(
													+pageIndex * +rowperpage,
													+pageIndex * +rowperpage +
														+rowperpage
												)
												.map((result, key) => (
													<TableRow
														tabIndex={-1}
														key={
															key +
															1 +
															pageIndex *
																rowperpage
														}
													>
														<TableCell>
															{key +
																1 +
																pageIndex *
																	rowperpage}
														</TableCell>
														<TableCell>
															{result.pdtname}
														</TableCell>
														<TableCell>
															{result.price}
														</TableCell>

														<TableCell>
															{" "}
															<img
																src={`/upload/${result.image}`}
																alt="img"
																width={100}
																height={50}
															></img>
														</TableCell>
														<TableCell>
															{" "}
															<img
																src={`/upload/${result.image2}`}
																alt="img"
																width={100}
																height={50}
															></img>
														</TableCell>

														<TableCell>
															{result.status ==
															"Inactive" ? (
																<span className="text-warning">
																	{
																		result.status
																	}{" "}
																</span>
															) : (
																<span className="text-success">
																	{
																		result.status
																	}{" "}
																</span>
															)}
														</TableCell>
														<TableCell>
															{result.pcname}
														</TableCell>
														<TableCell>
															<Link
																to={""}
																className=""
																onClick={(
																	e
																) => {
																	handledelete(
																		e,
																		result._id,
																		toast
																	);
																}}
															>
																<i class="bi bi-trash-fill text-danger "></i>{" "}
															</Link>
															<ToastContainer />
														</TableCell>

														<TableCell>
															<Link
																className=""
																to={`/editpdt/${result._id}`}
															>
																<i class="bi bi-pencil-square"></i>
															</Link>
														</TableCell>
													</TableRow>
												))}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowPerpageOption={[3, 5, 10]}
								page={pageIndex}
								count={ptdshow.length}
								rowsPerPage={rowperpage}
								component="div"
								onPageChange={handlechangepage}
								onRowsPerPageChange={handelrowperpage}
							></TablePagination>
						</Paper>
					</div>
				</div>
			</div>
		</>
	);
}

export default Adminpdt;
