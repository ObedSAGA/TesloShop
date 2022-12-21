import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../interfaces";
import { db } from "../../../database";
import { Product } from "../../../models";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      return updateProduct(req, res);

    case "POST":
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();
  
  const updatedProduct = products.map(product => {
    product.images = product.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${ image }`
    })
    return product
})


  res.status(200).json(updatedProduct);

};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "At least two images are required" });
  }

  //TODO: prevenir el localhost

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Does not exist product with this ID: " + _id });
    }

    //Elimina imágenes en Cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileID, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        console.log({ image, extension, fileID });
        await cloudinary.uploader.destroy(fileID);
      }
    });
    //


    await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Check console log server" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "At least two images are required" });
  }

  try {
    await db.connect();

    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Already exists a product with this slug" });
    }

    const product = new Product(req.body);
    await product.save();

    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Check console log server" });
  }
};
