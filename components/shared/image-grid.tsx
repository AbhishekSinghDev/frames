import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { PixabayImage } from "@/types";
import ImageCard from "./image-card";
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumnCount, wp } from "@/helpers";
import ImageGridSkeleton from "../skeletons/image-grid-skeleton";

type ImageGridProps = {
  images: PixabayImage[];
  isLoading: boolean;
};

const ImageGrid = ({ images, isLoading }: ImageGridProps) => {
  const columns = getColumnCount();

  const displayData = useMemo(() => {
    if (images.length === 0 && !isLoading) {
      return [];
    }

    if (isLoading) {
      const skeletonItems = Array(columns).fill({ isSkeletonItem: true });
      return [...images, ...skeletonItems];
    }

    return images;
  }, [images, isLoading, columns]);

  if (displayData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No Wallpaper found</Text>
      </View>
    );
  }

  return (
    <View className="min-h-full w-full">
      <MasonryFlashList
        data={displayData}
        renderItem={({ item, index }) => {
          if ("isSkeletonItem" in item) {
            return <ImageGridSkeleton key={`skeleton-${index}`} />;
          }
          return (
            <ImageCard
              index={index}
              columns={columns}
              image={item as PixabayImage}
            />
          );
        }}
        numColumns={columns}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingHorizontal: wp(4) }}
        keyExtractor={(item, index) =>
          "isSkeletonItem" in item
            ? `skeleton-${index}`
            : `image-${(item as PixabayImage).id}-${index}`
        }
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default React.memo(ImageGrid);
