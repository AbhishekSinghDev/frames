import { View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumnCount, wp } from "@/helpers";
import Animated, {
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const SkeletonImageCard = ({
  index,
  columns,
}: {
  index: number;
  columns: number;
}) => {
  const isLastRow = () => {
    return (index + 1) % columns === 0;
  };

  // Random heights for skeleton cards to mimic actual content
  const randomHeight = React.useMemo(() => {
    return Math.floor(Math.random() * (400 - 200) + 200);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.5, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: randomHeight,
          backgroundColor: "#E0E0E0",
          borderRadius: 30,
          borderCurve: "continuous",
          overflow: "hidden",
          marginBottom: wp(2),
        },
        !isLastRow() && {
          marginRight: wp(2),
        },
        animatedStyle,
      ]}
    />
  );
};

const ImageGridSkeleton = () => {
  const columns = getColumnCount();
  const skeletonData = Array.from({ length: 20 }, (_, i) => ({ id: i }));

  return (
    <View className="min-h-full w-full">
      <MasonryFlashList
        data={skeletonData}
        renderItem={({ index }) => (
          <SkeletonImageCard index={index} columns={columns} />
        )}
        numColumns={columns}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingHorizontal: wp(4) }}
      />
    </View>
  );
};

export default ImageGridSkeleton;
