import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { apiCall } from "../_api";
import { PixabayImage } from "@/types";
import ImageGrid from "@/components/shared/image-grid";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { wp } from "@/helpers";
import CustomInput from "@/components/ui/input";
import { filters } from "@/constants";
import FilterTab from "@/components/shared/filter-tab";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const scrollRef = useRef<ScrollView>(null);
  const isFetchingRef = useRef<boolean>(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState<string>("");

  const [serachQuery, setSearchQuery] = useState<string>("");

  const fetchImages = useCallback(
    async (params = { page: pageNumber }, append = true) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setIsLoading(true);

      try {
        const res = await apiCall(params);
        const data = res.data.hits as PixabayImage[];

        setImages((prev) => (append ? [...prev, ...data] : data));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [pageNumber]
  );

  useEffect(() => {
    fetchImages();
  }, []);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentHeight = e.nativeEvent.contentSize.height;
      const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
      const scrollViewOffset = e.nativeEvent.contentOffset.y;
      const bottomPosition = contentHeight - scrollViewHeight;

      if (scrollViewOffset >= bottomPosition - 1) {
        if (!isEndReached && !isFetchingRef.current) {
          setIsEndReached(true);
          const nextPage = pageNumber + 1;
          setPageNumber(nextPage);
          fetchImages({ page: nextPage }, true);
        }
      } else if (isEndReached) {
        setIsEndReached(false);
      }
    },
    [isEndReached, pageNumber, fetchImages]
  );

  return (
    <View className="flex-1">
      <View className="my-4 flex flex-col gap-3">
        <View
          style={{ paddingHorizontal: wp(4) }}
          className="flex flex-row justify-between items-center"
        >
          <Text
            className="text-4xl font-semibold"
            style={{ fontFamily: "Montserrat_600SemiBold" }}
          >
            Frames
          </Text>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </View>

        <CustomInput
          searchQuery={serachQuery}
          setSearchQuery={setSearchQuery}
        />

        <ScrollView horizontal={true} style={{ marginHorizontal: wp(4) }}>
          {filters.map((item) => (
            <FilterTab
              key={item.id}
              text={item.text}
              selectedFilterTab={selectedFilterTab}
              setSelectedFilterTab={setSelectedFilterTab}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        <ImageGrid images={images} isLoading={isLoading} />
      </ScrollView>
    </View>
  );
};

export default Index;
