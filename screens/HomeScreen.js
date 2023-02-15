import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
} from "react-native-heroicons/outline";
import * as Location from "expo-location";
import sanityClient from "../sanity";
import Promotions from "../components/Promotions";
import ProductsList from "../components/ProductsList";
import BasketIcon from "../components/BasketIcon";
import { haversineDistance } from "../functions/getDistance";

export default function HomeScreen() {
  const [setFeaturedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [waitingTime, setWaitingTime] = useState(0);
  const [query, setQuery] = useState(null);
  const [location, setLocation] = useState(undefined);
  const [deliverAddress, setDeliverAddress] = useState(undefined);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("please grant location permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      await setLocation(currentLocation.coords);
      let address = await Location.reverseGeocodeAsync(currentLocation.coords);
      setDeliverAddress(address[0]);
    };
    getPermissions();
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
    sanityClient
      .fetch(
        `
      *[_type == "warehouse"]`
      )
      .then((data) => {
        const time = haversineDistance(
          location.latitude,
          location.longitude,
          data[0].lat,
          data[0].long
        );
        setWaitingTime(time);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
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
      <SafeAreaView className=" pt-10 ">
        <View className="flex items-center p-5 mb-3 bg-[#F8910e]">
          <Image
            source={require("../assets/logo.png")}
            className="h-20 w-full"
          />
        </View>

        <View className="flex-row item-center space-x-2 pb-2 mx-4">
          <View className="flex-row space-x-2 flex-1 bg-[#ffffff] rounded-lg p-3 -mt-6">
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
            <Text>Deliver to</Text>
            {deliverAddress ? (
              <View className="flex-row align-middle">
                <MapPinIcon size={20} color="#00CCBB" />
                <Text className="font-bold text-lg -mt-1">
                  {deliverAddress?.street} {deliverAddress?.streetNumber}{" "}
                  {deliverAddress?.city}
                </Text>
              </View>
            ) : (
              <Text className="font-bold text-xl">
                Enter Location
                <MapPinIcon size={30} color="#00CCBB" />
              </Text>
            )}
            <View className="flex-row w-full justify-end pr-10">
              <ClockIcon size={20} color="#00CCBB" />
              <Text className="text-xs"> {waitingTime} mins</Text>
            </View>
          </View>
        </View>
        <ScrollView
          className="mt-2 bg-[#ffffff]"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View className="pt-5 pb-5">
            <Promotions
              products={products}
              setProducts={setProducts}
              promotions={setFeaturedCategories}
            />
          </View>
          <ProductsList products={products} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
