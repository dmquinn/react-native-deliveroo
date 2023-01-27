import { View, Text } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import BasketIcon from "./BasketIcon";

const ProductsList = ({ products }) => {
  return (
    <View className="flex-row flex-wrap justify-around items-center mt-4 bg-white pt-5">
      {products?.map((product) => {
        return (
          <>
            <ProductCard product={product} key={product?._id} />
          </>
        );
      })}
      <BasketIcon />
    </View>
  );
};

export default ProductsList;
