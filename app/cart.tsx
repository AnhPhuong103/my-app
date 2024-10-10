import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native"; 
import Header from "./header";

const Cart = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      image: require("../assets/images/product20.png"),
      name: "Red Matte Lipstick",
      brand: "Glamour",
      qty: 2,
      size: "5g",
      availableSizes: ["3g", "5g", "10g"],
      price: 299000,
      discountPercentage: 10,
      selected: true,
    },
    {
      id: "2",
      image: require("../assets/images/product21.png"),
      name: "Hydrating Serum",
      brand: "Skincare Plus",
      qty: 1,
      size: "30ml",
      availableSizes: ["15ml", "30ml", "50ml"],
      price: 499000,
      discountPercentage: 0,
      selected: true,
    },
    {
      id: "3",
      image: require("../assets/images/product19.png"),
      name: "Liquid Foundation",
      brand: "Flawless",
      qty: 1,
      size: "30ml",
      availableSizes: ["15ml", "30ml", "50ml"],
      price: 399000,
      discountPercentage: 15,
      selected: true,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const toggleItemSelection = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const openSizeModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const changeSize = (newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItem.id ? { ...item, size: newSize } : item
      )
    );
    setModalVisible(false);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => toggleItemSelection(item.id)} style={styles.checkbox}>
        {item.selected ? (
          <Ionicons name="checkbox" size={24} color="#02008F" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#888" />
        )}
      </TouchableOpacity>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <TouchableOpacity onPress={() => openSizeModal(item)} style={styles.sizeSelector}>
          <Text style={styles.sizeText}>Size: {item.size}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#02008F" />
        </TouchableOpacity>
        <View style={styles.priceQuantityContainer}>
          <View>
            <Text style={styles.itemPrice}>
              {(item.price * (1 - item.discountPercentage / 100)).toLocaleString("vi-VN")} ₫
            </Text>
            {item.discountPercentage > 0 && (
              <Text style={styles.originalPrice}>
                {item.price.toLocaleString("vi-VN")} ₫
              </Text>
            )}
          </View>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.qty}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const totalAmount = cartItems.reduce(
    (sum, item) => (item.selected ? sum + item.price * (1 - item.discountPercentage / 100) * item.qty : sum),
    0
  );

  const handleCheckout = () => {
    navigation.navigate("checkout");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.selectAllContainer} onPress={toggleSelectAll}>
          <Ionicons
            name={cartItems.every(item => item.selected) ? "checkbox" : "square-outline"}
            size={24}
            color={cartItems.every(item => item.selected) ? "#02008F" : "#888"}
          />
          <Text style={styles.selectAllText}>Chọn tất cả</Text>
        </TouchableOpacity>
        <View style={styles.summaryContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>{totalAmount.toLocaleString("vi-VN")} ₫</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn kích thước</Text>
            {selectedItem && selectedItem.availableSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedItem.size === size && styles.selectedSizeOption
                ]}
                onPress={() => changeSize(size)}
              >
                <Text style={[
                  styles.sizeOptionText,
                  selectedItem.size === size && styles.selectedSizeOptionText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#02008F",
    margin: 15,
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkbox: {
    marginRight: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  sizeSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 14,
    color: "#02008F",
    marginRight: 5,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#02008F",
  },
  originalPrice: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 14,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#02008F",
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  selectAllText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 16,
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#02008F",
  },
  checkoutButton: {
    backgroundColor: "#02008F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#02008F",
  },
  sizeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#02008F",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  selectedSizeOption: {
    backgroundColor: "#02008F",
  },
  sizeOptionText: {
    fontSize: 16,
    color: "#02008F",
  },
  selectedSizeOptionText: {
    color: "#ffffff",
  },
  closeModalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default Cart;