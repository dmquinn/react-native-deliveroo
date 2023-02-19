import { View, Text } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import BasketIcon from "./BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setPromotion } from "../redux/promotionSlice";
import { useEffect } from "react";

const ProductsList = ({ products, refresh }) => {
  const dispatch = useDispatch();
  const promotion = useSelector((state) => state.promotion?.promotion?.title);
  const handleClose = () => {
    dispatch(setPromotion({}));
    refresh();
  };
  useEffect(() => {
    console.log(promotion);
  }, [promotion]);
  return (
    <>
      {promotion && (
        <>
          <Text
            className="text-sm p-2 ml-4 bg-gray-300 w-52 text-center rounded-2xl"
            onPress={handleClose}
          >
            {promotion} <Text className="text-gray-400">X</Text>
          </Text>
        </>
      )}

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
