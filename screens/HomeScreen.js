import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[] ->
        }
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "restaurant"] {
        ...,        
      }`
      )
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  useEffect(() => {
    console.log(query);
    if (restaurants) {
      const filtered = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      setRestaurants(filtered);
    }
  }, [query]);

  return (
    <SafeAreaView className="bg-white pt-10">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://payload.cargocollective.com/1/15/494563/13468564/roo-03_1340_c.jpg",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            {/* <ChevronDownIcon size={20} color="#00CCBB" /> */}
          </Text>
        </View>
        {/* <UserIcon size={35} color="#00CCBB" /> */}
      </View>
      {/* search */}
      <View className="flex-row item-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={30} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
        </View>
        {/* <AdjustmentsIcon color="#00CCBB" /> */}
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Catagary */}
        <Categories />
        {/* {query &&
          restaurants.map((restaurant) => {
            <Text>{restaurant.name}</Text>;
          })} */}
        {
          !featuredCategories?.map((category) => (
            <FeatureRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              query={query}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
