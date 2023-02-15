import { Text, TouchableOpacity, Image } from "react-native";
import { setPromotion } from "../redux/promotionSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const PromotionsCard = ({ imgUrl, title, setProducts, products, id }) => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(
      setPromotion({
        id,
        title,
      })
    );
    const filteredProducts = products?.filter((product) => {
      return id === product?.promotion?._ref;
    });
    setProducts(filteredProducts);
  };

  return (
    <TouchableOpacity
      className="relative mr-2 text-white"
      onPress={handlePress}
    >
      <Image source={{ uri: imgUrl }} className="h-40 w-40 rounded-xl" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
