import { View, Text, Pressable } from "react-native";
import React from "react";
import { PixabayImage } from "@/types";

import { Image } from "expo-image";
import { getImageSize, wp } from "@/helpers";

const ImageCard = ({
  image,
  index,
  columns,
}: {
  image: PixabayImage;
  columns: number;
  index: number;
}) => {
  const isLastRow = () => {
    return (index + 1) % columns === 0;
  };

  const getImageHeight = () => {
    return { height: getImageSize(image.imageHeight, image.imageWidth) };
  };

  return (
    <Pressable
      style={[
        {
          backgroundColor: "#e1e3e3",
          borderRadius: 30,
          borderCurve: "continuous",
          overflow: "hidden",
          marginBottom: wp(2),
        },
        !isLastRow() && {
          marginRight: wp(2),
        },
      ]}
    >
      <Image
        source={{
          uri: image.webformatURL,
        }}
        transition={100}
        style={[{ height: 300, width: "100%" }, getImageHeight()]}
      />
    </Pressable>
  );
};

export default ImageCard;
