import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabBar = ({ state, descriptors, navigation }) => {

    const icons = {
        home: (props)=> <Ionicons name="home-outline" size={24} color={primaryColor} {...props} />,
        search: (props)=> <FontAwesome name="search" size={24} color={primaryColor} {...props} />,
        save: (props)=> <FontAwesome name="heart-o" size={24} color={primaryColor} {...props} />,
        cart: (props)=> <Ionicons name="cart-outline" size={24} color={primaryColor} {...props} />,
        profile: (props)=> <MaterialCommunityIcons name="account-circle-outline" size={24} color={primaryColor} {...props} />,
    }
    
    const primaryColor = '#1A1A1A'
    const greyColor = '#999999'
  return (
    <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
          if(['_sitemap', '+not-found'].includes(route.name)) return null;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
        key={route.name}
        style={styles.tabBarItem}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {icons[route.name] && icons[route.name]({ color: isFocused ? primaryColor : greyColor })}
        <Text style={{ color: isFocused ? primaryColor : greyColor }}>
          {label}
        </Text>
      </TouchableOpacity>
      );
    })}
  </View>
);
}


export default TabBar

const styles = StyleSheet.create({
    tabBar: {
        
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical:15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})