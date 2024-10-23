import { Stack } from "expo-router"

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ title: "Sign In Page",headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ title: "Sign Up Page" ,headerShown: false }} />
            <Stack.Screen name="forgotPassword" options={{ title: "Sign Up Page" }} />
            <Stack.Screen name="verification" options={{ title: "Sign Up Page" }} />
            <Stack.Screen name="resetPassword" options={{ title: "Sign Up Page" }} />
            <Stack.Screen name="rivew" options={{ title: "Review" }} />
            <Stack.Screen name="productdetail" options={{ title: "Details" }} />
            <Stack.Screen name="carfCard" options={{ title: "Details" }} />



        </Stack>
    )
}

export default AuthLayout
