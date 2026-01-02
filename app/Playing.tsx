import { View, Image, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";


const Playing = () => {
  const { id, title, artist, artwork, url } = useLocalSearchParams();
  return (
   <View className=" h-full w-full  flex justify-center items-center">
      <Image
        className="h-72 w-72 rounded-md"
        source={{
          uri:artwork
        }}
      />
    </View>
  );
};

export default Playing;
