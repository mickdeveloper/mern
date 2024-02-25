import { useContext, useEffect, useState } from "react";
import "./ship.css";
import { Contentapi } from "../Admin/Contentapi";
import { toast } from "react-toastify";

function Shipping() {
	const { cart, setcart } = useContext(Contentapi);
	const [productId, setproductId] = useState([]);
	const [message, setMessage] = useState();
	const [checkoutInput, setCheckoutInput] = useState({
		fullname: "",
		phone: "",
		email: "",
		address: "",
		pincode: "",
		city: "",
		state: "",
	});

	useEffect(() => {
		if (!cart.item) {
			return;
		}
		fetch("/skapi/productbyid", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids: Object.keys(cart.item) }),
		})
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				console.log(data);
				if (data.status === 200) {
					setproductId(data.apiData);
				} else {
					setMessage(data.message);
				}
			});
	}, []);


	let name,value;
	const handleInput = (e) => {
		name = e.target.name;
		value = e.target.value;

		setCheckoutInput({ ...checkoutInput, [name]: value });
		console.log(checkoutInput);
	};
	function handelQuantity(id) {
		return cart.item[id];
	}
	
	const calculateTotalPrice = () => {
		return productId.reduce(
			(total, item) => total + handelQuantity(item._id) * item.price,
			0
		);
	};

	const initPayment = async (data, orderId, total) => {
		const options = {
			key: process.env.REACT_APP_RAZORPAY_KEY,
			amount: data.amount,
			currency: data.currency,
			order_id: data.id,

			handler: async (response) => {
				try {
					response.orderId = orderId;
					response.paid_on = new Date();
					response.amount_paid = total?.toString();

					fetch("skapi/verifyPayment", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(response),
					})
						.then((data) => {
							toast("Order Created Successfully.");
						})
						.catch(() => toast("opps! somthing went wrong"));
				} catch (error) {
					console.log(error);
				}
			},

			theme: {
				color: "#27704d",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	async function createOrder() {
		try {
			// console.log({ productId });
			const data = { amount: calculateTotalPrice()*100, productDetails: productId, addressinfo:checkoutInput }; 
			console.log(data)
			
			// TODO: put the amount of the order here in paisa (rupee * 100).

			fetch("/skapi/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					if (data.message === "success") {
						toast("Order Created Successfully.");

						// opens razorpay
						initPayment(data.data, data.orderId, 100).then(
							() => {}
						);
					} else {
						toast("opps! somthing went wrong");
					}
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div id="shipping">
				<div className="py-4">
					<div className="container">
						<div className="row">
					<div className="col-md-3"></div>
                     <div className="col-md-6">
								<div className="card">
									<div className="card-header">
										<h4>
											<i className="bi bi-truck bg-light"></i>{" "}
											Shipping Address
										</h4>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>Full Name</lable>
													<input
														type="text"
														name="fullname"
														onChange={handleInput}
														value={
															checkoutInput.fullname
														}
														id="name"
														placeholder="First Name "
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>Address</lable>
													<input
														type="text"
														name="address"
														id="address"
														onChange={handleInput}
														value={
															checkoutInput.address
														}
														placeholder="Full Address"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>Phone</lable>
													<input
														type="text"
														name="phone"
														onChange={handleInput}
														value={
															checkoutInput.phone
														}
														id="phone"
														placeholder="mobile number"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>Email</lable>
													<input
														type="email"
														name="email"
														onChange={handleInput}
														value={
															checkoutInput.email
														}
														id="email"
														placeholder="Email"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>Zip code</lable>
													<input
														type="text"
														name="pincode"
														onChange={handleInput}
														value={
															checkoutInput.pincode
														}
														id="pincode"
														placeholder="pincode"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable>City</lable>
													<input
														type="text"
														name="city"
														onChange={handleInput}
														value={
															checkoutInput.city
														}
														id="city"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group mb-3">
													<lable for="state">
														State
													</lable>

													<select
														className="form-select"
														onChange={handleInput}
														name="state"
														value={
															checkoutInput.state
														}
														id="state"
													>
														<option value="Andhra Pradesh">
															Andhra Pradesh
														</option>
														<option value="Andaman and Nicobar Islands">
															Andaman and Nicobar
															Islands
														</option>
														<option value="Arunachal Pradesh">
															Arunachal Pradesh
														</option>
														<option value="Assam">
															Assam
														</option>
														<option value="Bihar">
															Bihar
														</option>
														<option value="Chandigarh">
															Chandigarh
														</option>
														<option value="Chhattisgarh">
															Chhattisgarh
														</option>
														<option value="Dadar and Nagar Haveli">
															Dadar and Nagar
															Haveli
														</option>
														<option value="Daman and Diu">
															Daman and Diu
														</option>
														<option value="Delhi">
															Delhi
														</option>
														<option value="Lakshadweep">
															Lakshadweep
														</option>
														<option value="Puducherry">
															Puducherry
														</option>
														<option value="Goa">
															Goa
														</option>
														<option value="Gujarat">
															Gujarat
														</option>
														<option value="Haryana">
															Haryana
														</option>
														<option value="Himachal Pradesh">
															Himachal Pradesh
														</option>
														<option value="Jammu and Kashmir">
															Jammu and Kashmir
														</option>
														<option value="Jharkhand">
															Jharkhand
														</option>
														<option value="Karnataka">
															Karnataka
														</option>
														<option value="Kerala">
															Kerala
														</option>
														<option value="Madhya Pradesh">
															Madhya Pradesh
														</option>
														<option value="Maharashtra">
															Maharashtra
														</option>
														<option value="Manipur">
															Manipur
														</option>
														<option value="Meghalaya">
															Meghalaya
														</option>
														<option value="Mizoram">
															Mizoram
														</option>
														<option value="Nagaland">
															Nagaland
														</option>
														<option value="Odisha">
															Odisha
														</option>
														<option value="Punjab">
															Punjab
														</option>
														<option value="Rajasthan">
															Rajasthan
														</option>
														<option value="Sikkim">
															Sikkim
														</option>
														<option value="Tamil Nadu">
															Tamil Nadu
														</option>
														<option value="Telangana">
															Telangana
														</option>
														<option value="Tripura">
															Tripura
														</option>
														<option value="Uttar Pradesh">
															Uttar Pradesh
														</option>
														<option value="Uttarakhand">
															Uttarakhand
														</option>
														<option value="West Bengal">
															West Bengal
														</option>
													</select>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<button
														className="btn btn-primary form-control mt-4"
														onClick={() =>
															createOrder()
														}
													>
														Continue
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer d-flex">
										<p>Total Items : {cart.totalitems}</p>
										<p className=" ms-2">
											{" "}
											Total price : &#8377;
											{calculateTotalPrice()}
										</p>
										<p className="ms-4"> Free Delivery </p>
									</div>
								</div>
							</div>
							<div className="col-md-3"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Shipping;
