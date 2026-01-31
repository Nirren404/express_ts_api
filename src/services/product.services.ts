import { ProductDocument, ProductModel } from "../models/product.model";
import { ListResult, ProductListRequest } from "../types/query.types";
import { AppError } from "../utils/app.error";
import {
  buildSearchQuery,
  parseBoolean,
  parseProjection,
  parseSort,
} from "../utils/query.util";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  category: string;
}

const allowedSortFields = [
  "createdAt",
  "price",
  "name",
  "stock",
  "updatedAt",
] as const;
const allowedProjectionFields = [
  "_id",
  "name",
  "price",
  "description",
  "category",
  "stock",
  "createdAt",
  "updatedAt",
] as const;
const allowedSearchFields = ["name", "description", "category"] as const;

export const createProduct = async (
  name: string,
  price: number,
  stock: number,
  category: string,
  description?: string,
) => {
  const newProduct: ProductDocument = {
    name,
    price,
    description,
    stock,
    category,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new AppError("Product with this name already exists", 409);
  }
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

export const findAllProducts = async (
  params: ProductListRequest,
): Promise<ListResult<ProductDocument>> => {
  const {
    limit,
    category,
    page,
    fields,
    minPrice,
    maxPrice,
    inStock,
    search,
    sort,
  } = params;

  const filters: Record<string, unknown> = {};

  if (category) filters.category = category;

  const priceFilter: Record<string, number> = {};
  if (minPrice) {
    const parsed = Number(minPrice);
    if (!Number.isNaN(parsed)) priceFilter.$gte = parsed;
  }

  if (maxPrice) {
    const parsed = Number(maxPrice);
    if (!Number.isNaN(parsed)) priceFilter.$lte = parsed;
  }

  if (Object.keys(priceFilter).length > 0) filters.price = priceFilter;

  const inStockBool = parseBoolean(inStock);
  if (inStockBool !== undefined) {
    filters.stock = inStockBool ? { $gt: 0 } : { $lte: 0 };
  }

  const searchQuery = buildSearchQuery(search, [...allowedSearchFields]);
  const query: Record<string, unknown> = { ...filters, ...(searchQuery ?? {}) };

  const sortBy = parseSort(sort, [...allowedSortFields], "-createdAt");
  const projection = parseProjection(fields, [...allowedProjectionFields]);

  const skip = (page - 1) * limit;

  const findQuery = ProductModel.find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);
  if (projection) findQuery.select(projection);

  const [data, total] = await Promise.all([
    findQuery.exec(),
    ProductModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export const findProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductById = async (
  id: string,
  updateData: Partial<ProductDocument>,
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }
  return updatedProduct;
};

export const deleteProductById = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new AppError("Product not found", 404);
  }
  return deletedProduct;
};
