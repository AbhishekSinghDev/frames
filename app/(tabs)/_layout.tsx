import TabBar from "@/components/shared/tab-bar";
import { Tabs } from "expo-router";

const RootRouter = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ animation: "shift" }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="favorites" options={{ headerShown: false }} />
      <Tabs.Screen name="grids" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default RootRouter;
