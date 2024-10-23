import { Tabs } from "expo-router"

export const unstable_settings = {
    initialRouteName: 'home',
};

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="search" options={{ title: "Search" }} />
            <Tabs.Screen name="save" options={{ title: "Save" }} />
            <Tabs.Screen name="card" options={{ title: "Card" }} />
            <Tabs.Screen name="account" options={{ title: "Account" }} />
        </Tabs>
    )
}

export default TabLayout
