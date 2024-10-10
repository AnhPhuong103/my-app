import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { ChevronDown } from "lucide-react-native";

const { width } = Dimensions.get("window");

const Footer = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(false);
  const [policyExpanded, setPolicyExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.brandName}>UNISPACE COSMETICS</Text>
      </View>

      {/* Collapsible sections */}
      <View style={styles.dropdownSection}>
        {/* ABOUT US */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setAboutExpanded(!aboutExpanded)}
        >
          <Text style={styles.dropdownButtonText}>VỀ CHÚNG TÔI</Text>
          <ChevronDown size={24} color="#02008F" />
        </TouchableOpacity>
        {aboutExpanded && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>Chúng tôi cung cấp sản phẩm mỹ phẩm chất lượng cao, chăm sóc sắc đẹp cho bạn.</Text>
            <Text style={styles.dropdownText}>Hãy trải nghiệm những sản phẩm tốt nhất từ UNISPACE.</Text>
          </View>
        )}

        {/* CONTACT */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setContactExpanded(!contactExpanded)}
        >
          <Text style={styles.dropdownButtonText}>LIÊN HỆ</Text>
          <ChevronDown size={24} color="#02008F" />
        </TouchableOpacity>
        {contactExpanded && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>Email: Phuong@gmail.com</Text>
            <Text style={styles.dropdownText}>Điện thoại: 028 1234 5678</Text>
            <Text style={styles.dropdownText}>Theo dõi chúng tôi trên mạng xã hội!</Text>
          </View>
        )}

        {/* POLICY */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setPolicyExpanded(!policyExpanded)}
        >
          <Text style={styles.dropdownButtonText}>CHÍNH SÁCH</Text>
          <ChevronDown size={24} color="#02008F" />
        </TouchableOpacity>
        {policyExpanded && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>Chính sách giao hàng</Text>
            <Text style={styles.dropdownText}>Chính sách đổi trả</Text>
            <Text style={styles.dropdownText}>Chính sách bảo mật</Text>
          </View>
        )}
      </View>

      {/* Copyright Section */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>© 2024 PHUONG. Bảo lưu mọi quyền.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#AFDAE8", // Light blue background
    padding: 20,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#02008F", // Dark blue for brand name
  },
  dropdownSection: {
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#02008F", // Dark blue for text
  },
  dropdownContent: {
    padding: 10,
    backgroundColor: "white", // White background for dropdown content
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333", // Dark text color for readability
    marginVertical: 3,
  },
  copyrightSection: {
    alignItems: "center",
    marginTop: 20,
  },
  copyrightText: {
    fontSize: 14,
    color: "#333", // Dark text for copyright
  },
});

export default Footer;
