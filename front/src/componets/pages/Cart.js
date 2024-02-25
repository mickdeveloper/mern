import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import Navbar from "./Header";
import { Link } from "react-router-dom";
import { Contentapi } from "../Admin/Contentapi";
const ShoppingCart = () => {
	//   const calculateTotalPrice = () => {
	//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	//   };
	const {
		cart,
		setcart,
		cstmname,
		setctmname,
		productDetails,
		setProductDetails
	} = useContext(Contentapi);
	const [productId, setproductId] = useState([]);
	const [message, setMessage] = useState("");
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
				if (data.status === 200) {
					setproductId(data.apiData);
				} else {
					setMessage(data.message);
				}
			});
	}, []);

	//   const removeItem = (id) => {
	//     const newCart = { ...cart };
	//     delete newCart.item[id];
	//     newCart.totalitems -= newCart.item[id];
	//     setcart(newCart);
	//   };

	function handelQuantity(id) {
		return cart.item[id];
	}

	function handelprice(id, price) {
		return handelQuantity(id) * price;
	}

	function increaseQuantity(e, id) {
		let currentQuantity = handelQuantity(id);
		let _cart = { ...cart };
		_cart.item[id] = currentQuantity + 1;
		_cart.totalitems += 1;
		setcart(_cart);
	}
	function decreaseQuantity(e, id) {
		let currentQuantity = handelQuantity(id);
		let _cart = { ...cart };
		// if (_cart.item[id] === 1) {
		// 	return;
		// }
		_cart.item[id] = currentQuantity - 1;
		_cart.totalitems -= 1;
		setcart(_cart);
	}

	// TODO: use this when removing the item
	function removeItem(e, id) {
		let currentQuantity = handelQuantity(id);
		let _cart = { ...cart };
		// if (_cart.item[id] === 1) {
		// 	return;
		// }
		_cart.item[id] = 0;
		_cart.totalitems -= currentQuantity;
		setcart(_cart);
	}

	const calculateTotalPrice = () => {
		return productId.reduce(
			(total, item) => total + handelQuantity(item._id) * item.price,
			0
		);
	};

	//  function removeFromCart(e,id){
	//     const updatedCart = { ...cart };
	//     const currentQuantity = handelQuantity(id);

	//     if (currentQuantity > 0) {
	//       updatedCart.totalitems -= currentQuantity;
	//       updatedCart.item[id] = 0;
	//       setcart(updatedCart);
	//     }
	//  }
	return (
		<>
			<Navbar />

			<div
				id="shoppigcart"
				className="py-5"
				style={{ marginTop: "5rem" }}
			>
				<div className="card">
					{productId.length > 0 && cart.totalitems > 0 ? (
						<div className="row">
							<div className="col-md-8 cart">
								<div className="title">
									<div className="row">
										<div className="col">
											<h4>
												<b>Shopping Cart</b>
											</h4>
										</div>
										<div className="col align-self-center text-right text-muted">
											{cart.totalitems} items
										</div>
									</div>
								</div>
								{productId.map(
									(result, key) =>
										handelQuantity(result._id) > 0 && (
											<>
												<div className="srow border-top border-bottom">
													<div className="row main align-items-center">
														<div className="col-2">
															<img
																className="img-fluid"
																src={`/upload/${result.image}`}
															/>
														</div>
														<div className="col">
															<div className="row text-muted">
																{result.pdtname}
															</div>
															<div className="row"></div>
														</div>
														<div className="col">
															<div className="row text-muted">
																{cstmname}
																{productDetails.map(
																	(p) =>
																		p.productId ==
																		result._id &&
																		p.name1
																)}
															</div>
															<div className="row">
																{productDetails.map(
																	(p) =>
																		p.productId ==
																		result._id &&
																		p.name2
																)}
															</div>
														</div>

														<div className="col">
															<button
																onClick={(e) =>
																	decreaseQuantity(
																		e,
																		result._id
																	)
																}
															>
																-
															</button>
															{handelQuantity(
																result._id
															)}
															<button
																onClick={(e) =>
																	increaseQuantity(
																		e,
																		result._id
																	)
																}
															>
																+
															</button>

															{/* <Link to="#">-</Link><Link to="#" className="border">1</Link><Link to="#">+</Link> */}
														</div>
														<div className="col">
															&#8377;{" "}
															{handelprice(
																result._id,
																result.price
															)}
														</div>
														<div className="col">
															<button className="">
																<span className="close">
																	&#10005;
																</span>{" "}
															</button>
														</div>
													</div>
												</div>
											</>
										)
								)}

								<div className="back-to-shop">
									<Link to={"/"}>
										<i class="bi bi-arrow-left"></i>
										<span className="text-muted ms-2">
											Back to shop
										</span>
									</Link>
								</div>
							</div>
							<div className="col-md-4 summary">
								<div>
									<h5>
										<b>Summary</b>
									</h5>
								</div>
								<hr />
								<div className="row">
									<div
										className="col"
										style={{ "padding-left": "0" }}
									>
										Total Items {cart.totalitems}
									</div>
									<div className="col text-right">
										&#8377;{calculateTotalPrice()}
									</div>
								</div>
								<form>
									<p>SHIPPING</p>
									<select>
										<option className="text-muted">
											Standard-Delivery-Free Delivery
										</option>
									</select>
									<p>GIVE CODE</p>
									<input
										id="code"
										placeholder="Enter your code"
									/>
								</form>
								<div
									className="row"
									style={{
										bordertop:
											"1px solid rgba(0,0,0,.1); padding: 2vh 0;",
									}}
								>
									<div className="col">TOTAL PRICE</div>
									<div className="col text-right">
										&#8377;{calculateTotalPrice()}{" "}
									</div>
								</div>
								<Link to="/checkout">
									<button className="btn">CHECKOUT</button>
								</Link>
							</div>
						</div>
					) : (
						<>
							<h2 className="text-center">
								Oops! Your Cart is Empty
							</h2>
							<Link to="/" className="text-center text-danger">
								Click Here to Shopping
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ShoppingCart;
