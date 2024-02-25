const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../modals/Order.js");
require("dotenv").config();

exports.ordercreate = async (req, res) => {
	try {
		console.log("1", process.env.RAZORPAY_API_SECRET);

		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_API_KEY,
			key_secret: process.env.RAZORPAY_API_SECRET,
		});

		const options = {
			amount: req.body.amount,
			 // use rupee * 100 (if the amount is 10 rupees put 1000).
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		let newOrder = new Order({
			amount: req.body.amount /100,
			purchaseDate: new Date(),
			orderId: crypto.randomBytes(10).toString("hex"),
			paymentStatus: "draft",
			productDetails: req.body.productDetails,
			addressinfo:req.body.checkoutInput,
		});

		console.log({ newOrder });

		await newOrder.save();

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({
					message:
						"Something went wrong while creating razorpay order.",
				});
			}

			return res.status(200).json({
				data: order,
				payment: instance,
				success: true,
				message: "success",
				orderId: newOrder._id,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: error,
		});
	}
};

exports.verifyOrder = async (req, res) => {
	try {
		const userData = req.body;

		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			orderId,
			paid_on,
			amount_paid,
		} = userData;

		const sign = razorpay_order_id + "|" + razorpay_payment_id;

		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (expectedSign == razorpay_signature) {
			const order = await Order.findOneAndUpdate(
				{ _id: orderId },
				{
					$set: {
						paymentStatus: "paid",
						amountPaidOn: paid_on,
						amountPaid: amount_paid,
						razorPayId: razorpay_payment_id,
					},
				},
				{ new: true }
			);

			return res.status(200).json({
				success: true,
				message: "success",
				data: order,
				paymentStatus: "paid",
			});
		} else {
			await Order.updateOne(
				{ _id: orderId },
				{ $set: { paymentStatus: "failed" } }
			);

			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error });
	}
};

exports.showorders=async(req,res)=>{
	try{
        const record=await Order.find().sort({amountPaidOn:-1})
       // console.log(record)
        res.json({
            status:200,
            apiData:record,
            message:"success slection"
        })

    }catch(error){
        res.json({
            status:500,
            message:"interal error"
        })

    }
}

exports.showtotalordercount=async(req,res)=>{
    try {
        // Use a database query to get the total count of items
        const totalCount = await Order.countDocuments(); 
        // This is for MongoDB
    
        res.json({ 
            total_count: totalCount ,
            status:200,
            message:"success"
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
 }