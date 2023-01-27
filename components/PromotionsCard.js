import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const PromotionsCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity
      className="relative mr-2"
      style={{
        overflow: "visible",
        shadowColor: "black",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.9,
        elevation: 7,
      }}
    >
      <Image source={{ uri: imgUrl }} className="h-40 w-40 rounded-xl" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
