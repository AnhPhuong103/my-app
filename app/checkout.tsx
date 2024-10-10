import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  {
    id: '1',
    name: 'Kem dưỡng da ban đêm',
    price: 200000,
    quantity: 2,
    image: require('../assets/images/product19.png'), // Add image path
  },
  {
    id: '2',
    name: 'Son dưỡng môi tự nhiên',
    price: 95000,
    quantity: 1,
    image: require('../assets/images/product20.png'), // Add image path
  },
  // Thêm sản phẩm khác nếu cần
];

const Checkout = () => {
  const totalAmount = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán</Text>

      <Text style={styles.sectionTitle}>Sản phẩm đã chọn</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDetailsText}>
                {item.quantity} x {item.price.toLocaleString()} đ
              </Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>
        Tổng cộng: {totalAmount.toLocaleString()} đ
      </Text>

      <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
      <TextInput style={styles.input} placeholder="Họ và tên" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ giao hàng"
        multiline={true}
        numberOfLines={2}
      />

      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      <TouchableOpacity style={styles.paymentMethod}>
        <Ionicons name="card-outline" size={20} color="#333" />
        <Text style={styles.paymentText}>Thẻ tín dụng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentMethod}>
        <Ionicons name="cash-outline" size={20} color="#333" />
        <Text style={styles.paymentText}>Tiền mặt khi nhận hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Xác Nhận Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#AFDAE8', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#02008F', // Dark blue text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#02008F', // Dark blue text
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#02008F', // Dark blue text
  },
  productDetailsText: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
    color: '#02008F', // Dark blue total amount
  },
  input: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#02008F', // Dark blue button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
