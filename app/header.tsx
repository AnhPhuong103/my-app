import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  
  const handleCartPress = () => {
    navigation.navigate("cart");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      {/* Authentication and Icons */}
      <View style={styles.authContainer}>
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.authButtonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.authButtonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AFDAE8", // Màu xanh cho nền footer
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 2,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  authContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    backgroundColor: "#FF6B00", // Nền cam cho nút đăng nhập và đăng ký
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  authButtonText: {
    color: "#FFFFFF", // Màu chữ trắng cho nút
    fontWeight: "bold",
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: "#FF6B00", // Màu cam cho nút giỏ hàng
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  cartBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Header;
