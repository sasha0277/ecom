const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

const cloudinary = require("cloudinary");




/* -------------------------------------------------------------------------- */
/*                          create Product---ADMIN---                         */
/* -------------------------------------------------------------------------- */


exports.createProduct = catchAsyncErrors(async (req, res, next) => {


	let images = [];
	if (typeof req.body.images === 'string') {
		images.push(req.body.images);

	} else {
		images = req.body.images;

	}

	const imagesLinks = [];
	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: "products",

		});
		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		})
	}

	req.body.images = imagesLinks;

	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

/* -------------------------------------------------------------------------- */
/*                              GET ALL PRODUCTS                              */
/* -------------------------------------------------------------------------- */
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
	const resultPerPage = 8;
	const productsCount = await Product.countDocuments();

	const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);



	const products = await apifeature.query;

	res.status(200).json({
		success: true,
		products,
		productsCount,
		resultPerPage,
	});
});




/* -------------------------------------------------------------------------- */
/*                             GET PRODUCT DETAILS                            */
/* -------------------------------------------------------------------------- */

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('product not found', 404));
	}

	res.status(200).json({
		success: true,
		product
	});
});

/* -------------------------------------------------------------------------- */
/*                               UPDATE PRODUCT --Admin                              */
/* -------------------------------------------------------------------------- */

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('product not found', 404));
	}

	/* ---------------------------- images start here --------------------------- */
	let images = [];
	if (typeof req.body.images === 'string') {
		images.push(req.body.images);

	} else {
		images = req.body.images;

	}

	if (images !== undefined) {

		/* ---------------------- delete image from cloudinary ---------------------- */
		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.v2.uploader.destroy(product.images[i].public_id);

		}



		const imagesLinks = [];
		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: "products",

			});
			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			})
		}

		req.body.images = imagesLinks;
	}



	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true,
		product
	});
});

/* -------------------------------------------------------------------------- */
/*                                DeleteProduct                               */
/* -------------------------------------------------------------------------- */

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler('product not found', 404));
	}

	/* ---------------------- delete image from cloudinary ---------------------- */
	for (let i = 0; i < product.images.length; i++) {
		await cloudinary.v2.uploader.destroy(product.images[i].public_id);

	}

	await product.remove();

	res.status(200).json({ success: true, message: 'Product deleted successfully' });
});


// Create New Reveiw and update Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);

	const isReviewed = product.reviews.find(
		(rev) => rev.user.toString() === req.user._id.toString());

	if (isReviewed) {

		product.reviews.forEach(rev => {

			if (rev.user.toString() === req.user._id.toString())
				rev.rating = rating, rev.comment = comment;

		});


	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;

	}

	let avg = 0;
	product.reviews.forEach(rev => {
		avg += rev.rating
	})

	product.ratings = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false })

	res.status(200).json({
		success: true,
	})

})

/* -------------------------------------------------------------------------- */
/*                       GET ALL RE OF A SINGLE PRODUCT                       */
/* -------------------------------------------------------------------------- */
exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new ErrorHandler('product not found', 404));
	}


	res.status(200).json({
		success: true,
		reviews: product.reviews,
	})

})


/* -------------------------------------------------------------------------- */
/*                                DELETE REVIEW                               */
/* -------------------------------------------------------------------------- */

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
/* -------------------------------------------------------------------------- */
/*                         get all Products for ADMIN                         */
/* -------------------------------------------------------------------------- */

exports.getAdminProducts = catchAsyncErrors(async (req, res) => {


	const products = await Product.find();

	res.status(200).json({
		success: true,
		products,

	});
});
