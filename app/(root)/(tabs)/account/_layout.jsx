import { Stack } from "expo-router";
import React from "react";


const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Account", headerShown: false }}
      />
      <Stack.Screen
        name="my-order"
        options={{ title: "My Order", headerShown: false }}
      />
      <Stack.Screen
        name='my-detail'
        options={{ title: "My Detail", headerShown: false }}
      />
      <Stack.Screen
        name="faqs"
        options={{ title: "FAQs", headerShown: false }}
      />
      <Stack.Screen
        name="help"
        options={{ title: "Help Center", headerShown: false }}
      /> 
      <Stack.Screen
        name="address"
        options={{ title: "Address Book", headerShown: false }}
      />
    </Stack>
  );
};

export default _layout;