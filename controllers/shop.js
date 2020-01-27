const amazon = require('../modules/amazon');

exports.buyProduct = async (ctx) => {
	if (!+ctx.params.shopId || !+ctx.params.productId) {
		ctx.body = "Invalid link!";
		ctx.status = 400;
		return;
	}
	let product;
	try {
		product = (await ctx.db.query(
			"SELECT shop_id, buyer_id FROM products WHERE id = ?",
			[ctx.params.productId]
		))[0][0];
	} catch (error) {
		console.log(error);
		ctx.body = {
			status: "ERROR",
			message: "Error retrieving product info!"
		};
		ctx.status = 500;
	}

	if (!product) {
		ctx.body = {
			status: "ERROR",
			message: "Product doesnt exists!"
		};
		ctx.status = 400;
		return;
	}

	if (product.shop_id != ctx.params.shopId) {
		ctx.body = {
			status: "ERROR",
			message: "Product doesnt match store!",
		};
		ctx.status = 400;
		return;
	}

	if (product.buyer_id == ctx.session.passport.user) {
		ctx.body = {
			status: "ERROR",
			message: "Product already purchased!",
		};
		ctx.status = 400;
		return;
	}

	if (product.buyer_id) {
		ctx.body = {
			status: "ERROR",
			message: "Product already purchased by another user!",
		};
		ctx.status = 400;
		return;
	}

	try {
		await ctx.db.query(
			"UPDATE products SET buyer_id = ? WHERE id = ?",
			[ctx.session.passport.user, ctx.params.productId]
		)
	} catch (error) {
		console.log(error);
		ctx.body = {
			status: "ERROR",
			message: "Error purchasing the product!",
		};
		ctx.status = 500;
	}
	ctx.body = {
		status: "OK",
	}
}

exports.shopInfo = async (ctx) => {
	if (!+ctx.params.id) {
		ctx.body = "Invalid number!";
		return;
	}

	try {
		let shopInfo = (await ctx.db.query(
			"SELECT * FROM shops WHERE id = ?",
			[ctx.params.id]
		))[0][0];

		shopInfo.products = (await ctx.db.query(
			"SELECT * FROM products WHERE shop_id = ?",
			[ctx.params.id]
		))[0];

		delete shopInfo.owner_id;
		for (let product of shopInfo.products) {
			delete product.shop_id;
			product.purchased = !!product.buyer_id;
			delete product.buyer_id;
		}
		ctx.body = shopInfo;
	} catch (error) {
		console.log(error);
		ctx.body = {
			status: "ERROR",
			message: "Error retrieving store information!"
		}
		ctx.status = 500;
	}
}

exports.createShop = async (ctx) => {
	let data = JSON.parse(ctx.request.body.data);
	if (
		!data.name ||
		!data.description ||
		!data.cost ||
		!data.products
	) {
		ctx.body = {
			error: "Invalid credentials!"
		}
		return;
	}

	try {
		let newShopId = (await ctx.db.query(
			"INSERT INTO `shops` (`name`, `description`, `cost`, `owner_id`) VALUES (?, ?, ?, ?)", 
			[
				data.name,
				data.description,
				data.cost,
				1
			]
		))[0].insertId;
		
		for (let i = 0; i < data.products.length; i++) {
			let product = data.products[i];
			let photo = ctx.request.files.photos[i] || null;

			let url = null;
			if (photo) {
				url = await amazon.uploadFile({
					fileName: photo.name,
					filePath: photo.path,
					fileType: photo.type
				});
			}

			await ctx.db.query(
				"INSERT INTO products (`name`, `img_url`, `shop_id`) VALUES (?, ?, ?)",
					[product.name, url, newShopId]
			);
		}

		ctx.body = {
			status: "OK",
			link: `http://localhost/api/v1/shops/${newShopId}`
		}
	} catch (error) {
		console.log(error);
		ctx.body = {
			status: "ERROR",
			message: 'Error creating new shop!',
		}
		ctx.status = 500;
	}
}