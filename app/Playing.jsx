import { View, Image, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import Icon from "react-native-remix-icon";
import { Audio } from "expo-av";

const Playing = () => {
  const { title, artist, artwork, url } = useLocalSearchParams();
  const navigation = useNavigation();

  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);

  // format time mm:ss
  const formatTime = (millis = 0) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // cleanup when screen unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // load and play song
  const loadAndPlay = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      (status) => setStatus(status)
    );
    setSound(sound);
  };

  // play or pause
  const playPause = async () => {
    if (!sound) {
      await loadAndPlay();
      return;
    }

    if (status?.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // forward 10 seconds
  const forward = async () => {
    if (!sound || !status) return;
    await sound.setPositionAsync(status.positionMillis + 10000);
  };

  // backward 10 seconds
  const backward = async () => {
    if (!sound || !status) return;
    await sound.setPositionAsync(
      Math.max(status.positionMillis - 10000, 0)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-1">
        
        {/* header */}
        <View className="flex-row justify-between items-center h-16">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-go-back-fill" size={22} />
          </Pressable>
          <Text className="text-lg font-semibold">Playing Now</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* content */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={{ uri: artwork }}
            className="h-60 w-60 rounded-full"
          />

          <Text className="mt-6 text-2xl font-semibold">{title}</Text>
          <Text className="text-gray-500">{artist}</Text>

          {/* slider */}
          <View className="w-full mt-10">
            <Slider
              minimumValue={0}
              maximumValue={status?.durationMillis || 1}
              value={status?.positionMillis || 0}
              maximumTrackTintColor="#dadada"
              minimumTrackTintColor="#000"
              thumbTintColor="#000"
              onSlidingComplete={(value) => {
                if (sound) sound.setPositionAsync(value);
              }}
            />
          </View>

          {/* time */}
          <View className="w-full flex-row justify-between mt-2">
            <Text>{formatTime(status?.positionMillis)}</Text>
            <Text>{formatTime(status?.durationMillis)}</Text>
          </View>

          {/* controls */}
          <View className="flex-row justify-between w-3/4 mt-10">
            <Pressable onPress={backward} className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center">
              <Icon name="arrow-left-line" size={30} color="#fff" />
            </Pressable>

            <Pressable onPress={playPause} className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center">
              <Icon
                name={status?.isPlaying ? "pause-line" : "play-line"}
                size={30}
                color="#fff"
              />
            </Pressable>

            <Pressable onPress={forward} className="bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center">
              <Icon name="arrow-right-line" size={30} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Playing;
