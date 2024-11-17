import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Define the valid route names based on your icon object
type RouteNames = keyof typeof icon;

// Update the props interface
interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: RouteNames; // This ensures routeName can only be 'index', 'favorites', or 'grids'
  color: string;
  label: string;
}

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top: top,
    };
  });

  return (
    <Pressable
      onPress={() => onPress()}
      onLongPress={() => onLongPress()}
      className="flex-1 justify-center items-center gap-1"
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: isFocused ? "#fff" : "#222",
        })}
      </Animated.View>

      <Animated.Text
        style={[
          { color: isFocused ? "#673ab7" : "#222", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
