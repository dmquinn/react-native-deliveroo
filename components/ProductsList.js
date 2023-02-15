import { View, Text } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import BasketIcon from "./BasketIcon";
import { useSelector } from "react-redux";

const ProductsList = ({ products }) => {
  const promotion = useSelector((state) => state.promotion.promotion.title);

  return (
    <>
      <Text className="text-sm p-2 ml-4 bg-gray-300 w-52 text-center rounded-2xl">
        {promotion}
      </Text>
      <View className="flex-row flex-wrap justify-around items-center mt-4 bg-[#ffffff] pt-5">
        {products?.map((product, i) => {
          return (
            <>
              <ProductCard product={product} key={i} />
            </>
          );
        })}
        <BasketIcon />
      </View>
    </>
  );
};

export default ProductsList;
