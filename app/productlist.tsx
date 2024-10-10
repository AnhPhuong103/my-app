import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const products = [
  {
    id: "1",
    name: "Kem dưỡng da ban đêm",
    image: require("../assets/images/product19.png"),
    originalPrice: 250000,
    discountedPrice: 200000,
    soldCount: 320,
  },
  {
    id: "2",
    name: "Son dưỡng môi tự nhiên",
    image: require("../assets/images/product20.png"),
    originalPrice: 120000,
    discountedPrice: 95000,
    soldCount: 450,
  },
  // Add more products as needed
];

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate("productdetail", { product: item });
  };

  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={handleProductPress}>
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.discountedPrice}>
          {item.discountedPrice.toLocaleString("vi-VN")} đ
        </Text>
        <Text style={styles.originalPrice}>
          {item.originalPrice.toLocaleString("vi-VN")} đ
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round((1 - item.discountedPrice / item.originalPrice) * 100)}%
          </Text>
        </View>
        <Text style={styles.soldCount}>Đã bán {item.soldCount}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Ionicons name="cart-outline" size={20} color="white" />
        <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductList = () => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.productList}
    />
  );
};

const styles = StyleSheet.create({
  productList: {
    padding: 15,
    backgroundColor: "#F5F5F5",
  },
  productItem: {
    width: (width - 40) / 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    height: 40, // Fixed height for product name
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#02008F",
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: "#B0B0B0",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  discountBadge: {
    backgroundColor: "#FFE8E8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: "#FF4242",
    fontWeight: "bold",
    fontSize: 12,
  },
  soldCount: {
    fontSize: 12,
    color: "#888",
  },
  addToCartButton: {
    backgroundColor: "#02008F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  addToCartText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductList;