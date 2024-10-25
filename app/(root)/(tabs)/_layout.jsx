import { Tabs } from "expo-router";
import { Image, Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export const unstable_settings = {
  initialRouteName: "home",
};

const TabLayout = () => {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#FFFFFF"); 
  }
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#999999",
        tabBarActiveTintColor: "#1A1A1A",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "GeneralMedium",
          lineHeight: 16.8,
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/home-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#1A1A1A" : "#999999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/search-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#1A1A1A" : "#999999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/heart-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#1A1A1A" : "#999999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/cart-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#1A1A1A" : "#999999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/user-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#1A1A1A" : "#999999",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
