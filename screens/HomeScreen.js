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
  MapPinIcon,
} from "react-native-heroicons/outline";
// import { Location, Permissions } from "expo";
import * as Location from "expo-location";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import RestaurantCard from "../components/RestaurantCard";

import sanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("please grant location permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(currentLocation.coords);
      setLocation(address[0]);
    };
    getPermissions();
  }, []);

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
            {location?.street} {location?.streetNumber} {location?.city}{" "}
            <MapPinIcon size={30} color="#00CCBB" />
          </Text>
        </View>
        {/* <UserIcon size={35} color="#00CCBB" /> */}
      </View>
      {/* search */}
      <View className="flex-row item-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-100 p-3">
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
        {!query && <Categories />}
        <View className="flex-1 items-center mt-4">
          {query &&
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard
                  key={restaurant._id}
                  id={restaurant._id}
                  imgUrl={restaurant.image}
                  title={restaurant.name}
                  rating={restaurant.rating}
                  genre={restaurant.type?.name}
                  address={restaurant.address}
                  short_description={restaurant.short_description}
                  dishes={restaurant.dishes}
                  long={restaurant.long}
                  lat={restaurant.lat}
                >
                  {restaurant.name}
                </RestaurantCard>
              );
            })}
        </View>
        {!query &&
          featuredCategories?.map((category) => (
            <FeatureRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              query={query}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
