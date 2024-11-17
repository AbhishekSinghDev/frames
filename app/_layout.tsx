import "../global.css";

import { Stack } from "expo-router";
import React from "react";

const RootRouter = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootRouter;
