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
import Categories from "../components/Promotions";
import FeatureRow from "../components/FeatureRow";
import ProductCard from "../components/ProductCard";
import sanityClient from "../sanity";
import Promotions from "../components/Promotions";
import ProductsList from "../components/ProductsList";
import BasketIcon from "../components/BasketIcon";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(null);
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
      *[_type == "promotions"] {
        ...,
        },
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (query === null) {
      sanityClient
        .fetch(
          `
      *[_type == "item"]`
        )
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);
  useEffect(() => {
    if (query) {
      const filtered = products.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      setProducts(filtered);
    } else {
    }
  }, [query]);

  return (
    <>
      <BasketIcon />
      <SafeAreaView className="bg-whit pt-10 ">
        <View className="flex items-center p-5 mb-3 bg-orange-500">
          <Image
            source={require("../assets/logo.png")}
            className="h-20 w-full"
          />
        </View>

        <View className="flex-row item-center space-x-2 pb-2 mx-4">
          <View className="flex-row space-x-2 flex-1 bg-white rounded-lg p-3 -mt-6">
            <MagnifyingGlassIcon color="gray" size={30} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
              onChangeText={(text) => {
                setQuery(text);
              }}
            />
          </View>
        </View>
        <View className="flex-row pb-3 p-2 items-center mx-4 space-x-2 ">
          <Image
            source={{
              uri: "https://payload.cargocollective.com/1/15/494563/13468564/roo-03_1340_c.jpg",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex">
            {location ? (
              <Text className="font-bold text-xl">
                {location?.street} {location?.streetNumber} {location?.city}{" "}
                <MapPinIcon size={30} color="#00CCBB" onPress={() => {}} />
              </Text>
            ) : (
              <Text className="font-bold text-xl">
                Enter Location
                <MapPinIcon size={30} color="#00CCBB" onPress={() => {}} />
              </Text>
            )}
          </View>
        </View>
        <ScrollView
          className="mt-2 bg-white"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View className="pt-5 pb-5">
            <Promotions />
          </View>
          <ProductsList products={products} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
