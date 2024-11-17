import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type TabType = "home" | "collections" | "favorites";

interface NavItem {
  id: TabType;
  label: string;
  icon: JSX.Element;
}

const BottomNav = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("home");

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <Feather
          name="home"
          size={24}
          color={selectedTab === "home" ? "#ffffff" : "#000"}
        />
      ),
    },
    {
      id: "collections",
      label: "Collections",
      icon: (
        <MaterialCommunityIcons
          name="grid-large"
          size={24}
          color={selectedTab === "collections" ? "#ffffff" : "#000"}
        />
      ),
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: (
        <FontAwesome5
          name="heart"
          size={24}
          color={selectedTab === "favorites" ? "#ffffff" : "#000"}
        />
      ),
    },
  ];

  return (
    <BlurView
      intensity={50}
      tint="dark"
      className="absolute bottom-0 left-0 z-50 w-full"
    >
      <View className="flex flex-row justify-center">
        <View className="flex items-center flex-row gap-10 px-8 py-4">
          {navItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedTab(item.id)}
              className="flex flex-col justify-center items-center"
            >
              {item.icon}
              <Text
                className={`text-xs font-medium ${
                  selectedTab === item.id ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </BlurView>
  );
};

export default BottomNav;
