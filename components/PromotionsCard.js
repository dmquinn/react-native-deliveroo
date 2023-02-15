import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const PromotionsCard = ({ imgUrl, title, setProducts, products, id }) => {
  const handlePress = (e) => {
    console.log(id);
    // console.log("products CARD", products);
    const filteredProducts = products?.filter((product) => {
      return id === product?.promotion?._ref;
    });
    setProducts(filteredProducts);
  };
  return (
    <TouchableOpacity
      className="relative mr-2 text-white"
      onPress={(e) => handlePress(e)}
    >
      <Image source={{ uri: imgUrl }} className="h-40 w-40 rounded-xl" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
