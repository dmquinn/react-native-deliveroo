import { View, Text, TouchableOpacity, Image, Touchable } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItems,
  selectBasketItemWithId,
  removeFromBasket,
} from "../redux/basketSlice";
import { useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { _id, name, price, rating, brand, image } = product;

  const items = useSelector((state) => selectBasketItemWithId(state, _id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ _id, name, price, image, rating, brand }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ _id }));
  };

  return (
    <View className="w-40 h-80 mt-5">
      <View className="flex-row items-center space-x-2 ">
        <TouchableOpacity onPress={addItemToBasket}>
          <PlusCircleIcon size={30} color="#00CCBB" />
        </TouchableOpacity>
        <Text>{items.length > 0 && items.length}</Text>
        <TouchableOpacity
          onPress={removeItemFromBasket}
          disabled={!items.length}
        >
          <MinusCircleIcon
            color={items.length > 0 ? "#fa4437" : "white"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: urlFor(product?.image).url(),
        }}
        className="h-40 rounded-sm"
      />

      <View className="px-3 pb-4 -mt-3">
        <Text className="font-bold text-lg pt-2">{product?.name}</Text>
        <Text className="text-md text-gray-800">{product?.brand}</Text>
        <Text className="text-xs text-gray-500">{product?.price}EUR</Text>
        <Text>
          {[...Array(product?.rating)].map((star, index) => {
            return <StarIcon size={10} color="orange" key={index} />;
          })}{" "}
        </Text>
        {product?.quantity <= 10 && product?.quantity > 0 && (
          <Text className="text-red-400 text-[10px]">
            only {product.quantity} left in stock!
          </Text>
        )}
      </View>
    </View>
  );
}
