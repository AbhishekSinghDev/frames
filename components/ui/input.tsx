import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { hp, wp } from "@/helpers";
import Feather from "@expo/vector-icons/Feather";

import Ionicons from "@expo/vector-icons/Ionicons";

type CustomInputProps = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
};

const CustomInput = ({ searchQuery, setSearchQuery }: CustomInputProps) => {
  return (
    <View
      className="bg-white rounded-2xl flex flex-row justify-between items-center gap-2 border border-gray-200 py-[2px] px-[6px]"
      style={{ marginHorizontal: wp(4) }}
    >
      <Feather name="search" size={24} color="black" className="p-1" />
      <TextInput
        value={searchQuery}
        onChangeText={(e) => setSearchQuery(e)}
        placeholder="Search for photos..."
        className="flex-1 text-lg placeholder:font-normal"
        style={{ fontSize: hp(1.8) }}
      />
      {searchQuery.length && (
        <Pressable>
          <Ionicons
            name="close"
            size={24}
            color="black"
            className="p-1 bg-neutral-300/50 rounded-lg"
          />
        </Pressable>
      )}
    </View>
  );
};

export default CustomInput;
