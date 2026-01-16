//Step 2 done
export interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Apple", price: 100 },
  { id: 2, name: "Pineapple", price: 150 },
];

// Step 3  done,

export const createProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  return new Promise((resolve, reject) => {
    const existingProduct = products.find((product) => product.name === name);

    setTimeout(() => {
      if (existingProduct) {
        reject(new Error("Product already exists"));
        return;
      }
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
      };
      products.push(newProduct);
      resolve(newProduct);
    }, 100);
  });
};

export const findAllProducts = async (): Promise<Product[]> => {
  return products;
};
