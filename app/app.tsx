import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductList from "./productlist"; // Đường dẫn đến file ProductList
import ProductDetail from "./productdetail"; // Đường dẫn đến file ProductDetail
import Cart from "./cart";
import Checkout from "./checkout";
import RegisterScreen from "./register";
import LoginScreen from "./(tabs)";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Danh sách sản phẩm" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: "Chi tiết sản phẩm" }}
        />
      </Stack.Navigator>
      <Stack.Navigator initialRouteName="Cart">
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

