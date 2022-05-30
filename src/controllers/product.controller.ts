import Product from "../models/product.model";
import express from "express";

export default {
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        code: "00000",
        message: "success",
        data: products,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getById: async (req: express.Request, res: express.Response) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if(!product){
        throw Error("The product is not found!")
      }
      res.status(200).json({
        code: "00000",
        message: "success",
        data: product,
      });
    } catch (error) {
      res.status(200).json({
        code: "00099",
        message: error.message,
      });
    }
  },
  create: async (req: express.Request, res: express.Response) => {
    try {
      const product = new Product(req.body.data);
      await product.save();
      const resData = {
        ...req.body,
        data: { ...req.body.data, _id: product._id.toString() },
      };
      if (product) {
        res.status(200).json({
          code: "00000",
          message: "success",
          request: req.body,
          data: resData,
        });
      }
    } catch (error) {
      res.status(200).json({
        code: "00099",
        message: error.message,
        request: req.body,
      });
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    try {
      const products = await Product.deleteOne(req.body.data);
      console.log(products);

      if(!products.deletedCount){
        throw Error("Delete failed!")
      }
      res.status(200).json({
        code: "00000",
        message: "success",
        request: req.body,
      });
    } catch (error) {
      res.status(200).json({
        code: "00099",
        message: error.message,
        request: req.body,
      });
    }
  },
  update: async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.body;
      delete req.body._id;
      const result = await Product.updateOne({ _id }, req.body);
      if (result.acknowledged) {
        res.status(200).json({
          code: "00000",
          message: "success",
        });
      }
    } catch (error) {
      res.status(200).json({
        code: "00099",
        message: error.message,
      });
    }
  },
};
