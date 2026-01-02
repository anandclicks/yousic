import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-remix-icon";
import { musicData } from "@/data/music";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const MusicList = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  return (
    <SafeAreaView>
      <View className="relative">
        <LinearGradient className="h-full p-3" colors={["#fff", "#fff"]}>
          <View>
            <View className="flex items-center gap-3 flex-row h-16">
              <Icon color="black" size={25} name="music-2-fill" />
              <Text className="text-black font-semibold text-2xl uppercase ">
                Me-you-sic
              </Text>
            </View>
            <FlatList
              data={musicData}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginTop: 15,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={(items) => (
                <Link
                  href={{
                    pathname: "/Playing",
                    params: {
                      id: items.item.id.toString(),
                      title: items.item.title,
                      artist: items.item.artist,
                      artwork: items.item.artwork,
                      url: items.item.url,
                    },
                  }}
                  asChild
                >
                  <Pressable className="h-64 w-[48%] p-2 flex justify-between bg-white/15 rounded-lg border-[1px] border-black/15">
                    <View className="h-3/4 relative">
                      <Image
                        className="h-full w-full rounded-md"
                        source={{ uri: items?.item?.artwork }}
                      />
                      <View className="absolute bottom-0 right-0 m-2 bg-white rounded-full h-[30px] w-[30px] flex justify-center items-center">
                        <Icon name="play-circle-line" size={20} />
                      </View>
                    </View>
                    <View className="h-1/4 flex flex-row justify-between items-center">
                      <View>
                        <Text className="text-black text-[15px] font-semibold">
                          {items?.item.title}
                        </Text>
                        <Text className="text-black leading-4">
                          {items?.item?.artist}
                        </Text>
                      </View>
                      <Icon size={20} name="music-2-fill" />
                    </View>
                  </Pressable>
                </Link>
              )}
            ></FlatList>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default MusicList;
