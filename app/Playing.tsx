import {
  View,
  Image,
  Animated,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Icon from "react-native-remix-icon";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider"

const Playing = () => {
  const { id, title, artist, artwork, url } = useLocalSearchParams();
  const navigate = useNavigation();
  return (
    <SafeAreaView className="p-5 pb-0 bg-white">
      <View className=" h-full w-full ">
        <View className="h-16 flex justify-between items-center flex-row">
          <Pressable
            className="h-[40px] w-[40px]  bg-white rounded-full flex justify-center items-center"
            onPress={() => navigate.goBack()}
          >
            <Icon name="arrow-go-back-fill" size={20} color="black"/>
          </Pressable>
          <Text className="text-xl font-semibold">Playing Now</Text>
          <Icon name="menu-2-line" color="transparent" />
        </View>
       <View className="h-[75%] flex justify-end items-center">
         <Image
          className="h-[25vh] w-[25vh] rounded-full shadow"
          source={{
            uri: artwork,
          }}
        />
        <View className="mt-5">
          <Text className="text-center text-2xl font-semibold">{title}</Text>
          <Text className="text-center">{artist}</Text>
        </View>

        {/* track  */}
        <View className="mt-10 w-full">
          <Slider
        minimumTrackTintColor="#5c5c5c"
     maximumTrackTintColor="#000000"
     thumbTintColor="#000"
        minimumValue={0}
        
        value={1}
        maximumValue={3}
        onSlidingComplete={()=> null}
        />
        </View>
        <View className="mt-4 px-5 w-full flex-row justify-between">
          <Text>1:64</Text>
          <Text>3:43</Text>
        </View>

        {/* controllers btns  */}
        <View className="w-[70%] mt-10 h-20 mx-auto flex flex-row justify-between">
          <Pressable className="h-[50px] w-[50px] bg-black shadow shadow-slate-400 rounded-full flex justify-center items-center">
            <Icon name="arrow-left-line" color="#fff"/>
          </Pressable>
          <Pressable className="h-[50px] w-[50px] bg-black shadow shadow-slate-400 rounded-full flex justify-center items-center">
            <Icon name="pause-line" color="#fff"/>
          </Pressable>
          <Pressable className="h-[50px] w-[50px] bg-black shadow shadow-slate-400 rounded-full flex justify-center items-center">
              <Icon name="arrow-right-line" color="#fff"/>
          </Pressable>
          
        </View>
       </View>
      </View>
    </SafeAreaView>
  );
};

export default Playing;
