import { View, Text, Pressable } from "react-native";
import React from "react";
import { wp } from "@/helpers";

type FilterTabProps = {
  text: string;
  selectedFilterTab: string;
  setSelectedFilterTab: (v: string) => void;
};

const FilterTab = ({
  text,
  selectedFilterTab,
  setSelectedFilterTab,
}: FilterTabProps) => {
  return (
    <Pressable
      onPress={() => setSelectedFilterTab(text)}
      className={`bg-white p-3 rounded-lg mr-4 w-fit ${
        selectedFilterTab == text
      } && bg-gray-300`}
    >
      <Text
        className="font-medium capitalize w-full"
        style={{ fontFamily: "Montserrat_600SemiBold" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default FilterTab;
