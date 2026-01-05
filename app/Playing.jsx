import { View, Image, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import Icon from "react-native-remix-icon";
import { MusicContext } from "../context/MusicContext";

const Playing = () => {
  const navigation = useNavigation();
  const {
    playPause,
    forward,
    backward,
    formatTime,
    status,
    currentSong,
    setPlayingSong,
    playingSong,
    soundRef
  } = useContext(MusicContext);

  if (!currentSong) return null;

  const { title, artist, artwork } = currentSong;

  const isPlayingThisSong = playingSong?.id === currentSong.id;

  const sliderValue = isPlayingThisSong ? status?.positionMillis || 0 : 0;
  const sliderMax = status?.durationMillis || currentSong?.duration || 100000; 
  

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-1">
        <View className="flex-row justify-between items-center h-16">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-go-back-fill" size={22} />
          </Pressable>
          <Text className="text-lg font-semibold">Playing Now</Text>
          <View style={{ width: 22 }} />
        </View>

        <View className="flex-1 justify-center items-center">
          <Image source={{ uri: artwork }} className="h-60 w-60 rounded-full" />
          <Text className="mt-6 text-2xl font-semibold">{title}</Text>
          <Text className="text-gray-500">{artist}</Text>

          <View className="w-full mt-10">
            <Slider
              minimumValue={0}
              maximumValue={sliderMax}
              value={sliderValue}
              maximumTrackTintColor="#dadada"
              minimumTrackTintColor="#000"
              thumbTintColor="#000"
              onSlidingComplete={async(value)=>{
                  await soundRef.current.setPositionAsync(value);
                }}
            />
          </View>

          <View className="w-full flex-row justify-between mt-2">
            <Text>{formatTime(sliderValue)}</Text>
            <Text>{formatTime(sliderMax)}</Text>
          </View>

          <View className="flex-row justify-between w-3/4 mt-10">
            <Pressable
              onPress={backward}
              className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center"
            >
              <Icon name="arrow-left-line" size={30} color="#fff" />
            </Pressable>

            <Pressable
              onPress={() => {
                if (!isPlayingThisSong) setPlayingSong(currentSong);
                playPause();
              }}
              className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center"
            >
              <Icon
                name={isPlayingThisSong && status?.isPlaying ? "pause-line" : "play-line"}
                size={30}
                color="#fff"
              />
            </Pressable>

            <Pressable
              onPress={forward}
              className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center"
            >
              <Icon name="arrow-right-line" size={30} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Playing;
