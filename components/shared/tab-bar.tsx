import { View, Platform, LayoutChangeEvent } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./tab-bar-button";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabLayout}
      className="absolute bottom-[50px] flex flex-row justify-between items-center bg-white mx-[80px] py-4 shadow-lg rounded-full"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: "#723FEB",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1000,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          //   <PlatformPressable
          //     href={buildHref(route.name, route.params)}
          //     accessibilityState={isFocused ? { selected: true } : {}}
          //     accessibilityLabel={options.tabBarAccessibilityLabel}
          //     testID={options.tabBarButtonTestID}
          //     onPress={onPress}
          //     onLongPress={onLongPress}
          //     key={route.name}
          //     className="flex-1 justify-center items-center gap-1"
          //   >
          //     {icon[route.name]({
          //       color: isFocused ? colors.primary : colors.text,
          //     })}
          //     <Text style={{ color: isFocused ? colors.primary : colors.text }}>
          //       {label}
          //     </Text>
          //   </PlatformPressable>
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#fff" : colors.text}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
