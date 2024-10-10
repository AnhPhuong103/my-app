import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Header from "./header";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProductDetail = ({ navigation }) => {
  const [selectedShade, setSelectedShade] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "1",
    name: "Son môi lì Velvet Luxe",
    price: 350000,
    salePrice: 280000,
    soldCount: 500,
    image: require("../assets/images/product20.png"),
    description: "Son môi lì Velvet Luxe mang đến màu sắc rực rỡ và độ bám lâu trôi.",
    shades: ["Đỏ", "Hồng", "Cam", "Nude"],
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Phấn phủ không dầu",
      price: 390000,
      image: require("../assets/images/product19.png"),
    },
    {
      id: "3",
      name: "Kem nền hoàn hảo",
      price: 480000,
      image: require("../assets/images/product20.png"),
    },
    {
      id: "4",
      name: "Bảng phấn mắt 12 màu",
      price: 550000,
      image: require("../assets/images/product21.png"),
    },
  ];

  const renderRelatedProduct = ({ item }) => (
    <View style={styles.relatedProductItem}>
      <Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>
        {item.price.toLocaleString("vi-VN")} ₫
      </Text>
    </View>
  );

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header navigation={navigation} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceWrapper}>
                <Text
                  style={[styles.price, product.salePrice && styles.strikethrough]}
                >
                  {product.price.toLocaleString("vi-VN")} ₫
                </Text>
                {product.salePrice && (
                  <Text style={styles.salePrice}>
                    {product.salePrice.toLocaleString("vi-VN")} ₫
                  </Text>
                )}
              </View>
              <Text style={styles.soldCount}>Đã bán {product.soldCount}</Text>
            </View>

            <Text style={styles.sectionTitle}>Chọn màu:</Text>
            <View style={styles.shadeContainer}>
              {product.shades.map((shade) => (
                <TouchableOpacity
                  key={shade}
                  style={[styles.shadeButton, selectedShade === shade && styles.selectedShadeButton]}
                  onPress={() => setSelectedShade(shade)}
                >
                  <Text
                    style={[
                      styles.shadeButtonText,
                      selectedShade === shade && styles.selectedShadeButtonText,
                    ]}
                  >
                    {shade}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Số lượng:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
            <FlatList
              data={relatedProducts}
              renderItem={renderRelatedProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDAE8', // Nền sáng xanh nhạt
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: width,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: width * 0.8,
    height: "100%",
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF', // Nền trắng cho phần thông tin
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // Đổ bóng cho phần thông tin
  },
  productName: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  strikethrough: {
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  salePrice: {
    fontSize: 16,
    color: "#FF6600",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#02008F", // Màu xanh đậm cho tiêu đề
  },
  shadeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  shadeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedShadeButton: {
    borderColor: "#02008F", // Màu xanh đậm cho nút được chọn
  },
  shadeButtonText: {
    fontSize: 14,
  },
  selectedShadeButtonText: {
    color: "#02008F", // Màu chữ xanh đậm cho nút được chọn
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "black",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  relatedProductItem: {
    marginRight: 15,
    width: 100,
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  relatedProductName: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  relatedProductPrice: {
    fontSize: 14,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: "#FFCC99", // Màu cam nhạt cho nút giỏ hàng
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  buyButton: {
    backgroundColor: "#02008F", // Màu xanh đậm cho nút mua ngay
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
  cartButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buyButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ProductDetail;
