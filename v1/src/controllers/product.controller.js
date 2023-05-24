const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const productService = require("../services/product.service");
const { response } = require("express");

class Product {
  async createProduct(req, res, next) {
    try {
      const { name, price, description, isSweet } = req.body;

      // Ürün oluşturma işlemi
      const product = await productService.create({ name, price, description, isSweet });

      successResponse(res, httpStatus.CREATED, product);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getProductById(req, res, next) {
    try {
      const productId = req.params.id;

      // Ürünün veritabanından alınması
      const product = await productService.findById(productId);

      if (!product) {
        throw new Error("Ürün bulunamadı");
      }

      successResponse(res, httpStatus.OK, product);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
  }

  async getProductList(req, res, next) {
    try {
      const products = await productService.list();

      successResponse(res, httpStatus.OK, products);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };
      const productId = req.params.id;
      //const { name, price, description, } = req.body;

      // Ürünün güncellenmesi
      const updatedProduct = await productService.update(productId,product);

      successResponse(res, httpStatus.OK, { message: "Updated product", product: updatedProduct });
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  update(req, res, next) {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
     
    };
    productService
      .update(req.params.productId, product)
      .then((response) => {
        if (!response) {
          return next(new ApiError("Product not found", httpStatus.BAD_REQUEST));
        }
        successResponse(res, httpStatus.OK, { message: "Updated product", product: response });
      })
      .catch((err) => {
        return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;

      // Ürünün silinmesi
      await productService.delete(productId);

      successResponse(res, httpStatus.OK, { message: "Ürün silindi", productId });
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getSweet(req, res, next) {
    try {
      const products = await productService.list({isSweet:"sweet"});

      successResponse(res, httpStatus.OK, products);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async getCoffee(req, res, next) {
    try {
      const products = await productService.list({isSweet:"coffee"});

      successResponse(res, httpStatus.OK, products);
    } catch (error) {
      next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

 /*  getSweet(req, res, next) {
    productService
      .list({ isSweet: "sweet" })
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  }

  getCoffee(req, res, next) {
    productService
      .list({ isSweet: "coffee" })
      .then((response) => {
        successResponse(res, httpStatus.OK, response);
      })
      .catch((err) => {
        next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      });
  } */
}

module.exports = new Product();
