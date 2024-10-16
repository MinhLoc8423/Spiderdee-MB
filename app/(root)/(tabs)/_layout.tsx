import { Tabs } from "expo-router"

export const unstable_settings = {
    initialRouteName: 'home',
};

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home Page" }} />
            <Tabs.Screen name="account" options={{ title: "Profile Page" }} />
        </Tabs>
    )
}

export default TabLayout
