import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Header";
import { Link, useParams } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { Contentapi } from "../Admin/Contentapi";

function Pdtdeatils() {
	const { id } = useParams();
	const [product, setproduct] = useState([]);
	const [pdtname, setproductname] = useState("");
	const [price, setprice] = useState("");
	const [image, setimage] = useState("");
	const [message, setMessage] = useState("");
	const [dualname1, setctdualname1] = useState("");
	const [dualname2, setctdualname2] = useState("");

	const { cart, setcart, productDetails, setProductDetails } =
		useContext(Contentapi);

	// const [formData, setFormData] = useState({
	//   firstName: "",
	//   secondName: "",
	// });

	// function handleFormChange(e) {
	//   const { name, value } = e.target;
	//   setFormData({
	//     ...formData,
	//     [name]: value,
	//   });
	// }

	useEffect(() => {
		fetch(`/skapi/showuserpdtsingle/${id}`)
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				// console.log(data)
				if (data.status === 200) {
					setproduct(data.apiData);
					setproductname(data.apiData.pdtname);
					setprice(data.apiData.price);
					setimage(data.apiData.image);
					// setproduct(data.apiData)
					setMessage(data.message);
				} else {
					setMessage("error");
				}
			});
	}, [id]);

	function handlecart(e, product) {
		// console.log(product._id);
		let _cart = { ...cart };
		const productExistsInCart = productDetails.filter(
			(p) => p.productId == product._id
		);

		if (productExistsInCart.length == 0) {
			if (!_cart.item) {
				_cart.item = {};
			}
			if (!_cart.item[product._id]) {
				_cart.item[product._id] = 1;
			} else {
				_cart.item[product._id] += 1;
			}

			if (!_cart.totalitems) {
				_cart.totalitems = 1;
			} else {
				_cart.totalitems += 1;
			}

			setcart(_cart);
			setProductDetails([
				...productDetails,
				{ productId: product._id, name1: dualname1, name2: dualname2 },
			]);
		}
	}
	return (
		<>
			<Navbar />
			<div style={{ height: "170px" }}></div>
			<section id="pdtdeatils">
				<div className="container pdt-deatils">
					<div className="row border">
						<div className="col-md-4">
							{/* <div className = "product-img">
                        <img src = "images/pc1.jpg" alt = "product" />
                        <img src = "images/pc2.png" alt = "product2" className = "rear-img" />
                    </div> */}
							<div className="image-container">
								<img
									src={`/upload/${image}`}
									className="img-fluid p-4"
									alt="sss"
								/>
							</div>
						</div>
						<div className="col-md-8">
							<div className="p-5">
								<h2>{pdtname}</h2>
								<p style={{ minHeight: "100px" }}>
									This 18K Gold Plated Name Necklace is the
									perfect accessory for any look. Etched in a
									beautiful font, the necklace can be
									customised with any name of your choice and
									made with top-quality materials, it will
									never go out of style. The perfect
									one-of-a-kind gift for you or your loved
									ones.{" "}
								</p>
								<span className="price">
									Price : Rs. {price}{" "}
								</span>
								<h5 className="mt-2">
									{" "}
									Add Customised Name :{" "}
								</h5>
								<form>
									<label>First Name : </label>
									<input
										type="text"
										onChange={(e) => {
											setctdualname1(e.target.value);
										}}
										placeholder="Enter Name"
										className="w-25 mb-2"
									></input>
									<br></br>
									<label>Second Name : </label>
									<input
										type="text "
										onChange={(e) => {
											setctdualname2(e.target.value);
										}}
										placeholder="Enter Name"
										className="w-25"
									></input>
								</form>

								{/* <Link to={'/cart'}> */}
								<button
									className="btn btn-success mt-3 me-3"
									onClick={(e) => {
										handlecart(
											e,
											product
											// dualname1,
											// dualname2
										);
									}}
								>
									Add to Cart
								</button>
								{/* </Link> */}

								<button
									className="btn btn-primary mt-3 other-info "
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseExample"
									aria-expanded="false"
									aria-controls="collapseExample"
								>
									Other Information
								</button>

								<div className="collapse" id="collapseExample">
									<div className="card card-body">
										Our customize jewelry is eligible for
										exchange under 2 conditions:
										<br></br>
										1. If you received it in damage
										condition or not as per the description.
										<br></br>
										2. If the polish fades away within
										warranty period of 1 Year.
										<br></br>
										3. It will take 9 to 12 business days to
										deliver your order as we have to
										manufacture the order as per your
										design. Product will surely worth the
										wait! ❤️ You will be notified when your
										order ships from our warehouse with the
										shipment tracking number
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <Footer/> */}
		</>
	);
}

export default Pdtdeatils;
