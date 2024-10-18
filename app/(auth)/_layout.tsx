import { Stack } from "expo-router"

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ title: "Sign In Page",headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ title: "Sign Up Page" ,headerShown: false }} />
            <Stack.Screen name="forgot-password" options={{ title: "Sign Up Page" }} />
            <Stack.Screen name="verification" options={{ title: "Sign Up Page" }} />
            <Stack.Screen name="reset-password" options={{ title: "Sign Up Page" }} />
        </Stack>
    )
}

export default AuthLayout
