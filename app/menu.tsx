import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons
const { width } = Dimensions.get("window");

interface MenuItem {
  name: string;
  subMenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Tất cả sản phẩm",
  },
  {
    name: "Trang điểm",
    subMenu: [
      { name: "Son môi" },
      { name: "Phấn nền" },
      { name: "Mascara" },
      { name: "Phấn mắt" },
    ],
  },
  {
    name: "Chăm sóc da",
    subMenu: [
      { name: "Sữa rửa mặt" },
      { name: "Toner" },
      { name: "Kem dưỡng ẩm" },
      { name: "Mặt nạ" },
    ],
  },
  {
    name: "Nước hoa",
    subMenu: [
      { name: "Nước hoa nữ" },
      { name: "Nước hoa nam" },
      { name: "Nước hoa unisex" },
    ],
  },
  {
    name: "Phụ kiện",
    subMenu: [
      { name: "Bông tẩy trang" },
      { name: "Cọ trang điểm" },
      { name: "Gương" },
    ],
  },
];

const Menu = () => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setActiveSubMenu(activeSubMenu === name ? null : name);
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <View key={index} style={styles.menuItem}>
          {item.subMenu ? (
            <>
              <TouchableOpacity
                onPress={() => toggleSubMenu(item.name)}
                style={styles.menuButton}
              >
                <Text style={styles.menuTitle}>{item.name}</Text>
                <Icon
                  name={
                    activeSubMenu === item.name ? "expand-less" : "expand-more"
                  }
                  size={20}
                  color="#02008F"
                />
              </TouchableOpacity>
              {activeSubMenu === item.name && (
                <View style={styles.subMenu}>
                  {item.subMenu.map((subItem, subIndex) => (
                    <TouchableOpacity key={subIndex} style={styles.subMenuItem}>
                      <Text style={styles.subMenuText}>{subItem.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : (
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: "#AFDAE8", // Light blue background for the menu
  },
  menuItem: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexBasis: "45%", // Take up half of the width for each item
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background for each menu item
    borderRadius: 5,
    padding: 10,
    elevation: 2, // Add shadow effect for elevation
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#02008F", // Dark blue text color
  },
  subMenu: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#f8f9fa", // Light grey background for submenu
    borderRadius: 5,
    elevation: 1, // Light shadow for submenu
  },
  subMenuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // White background for submenu items
    marginBottom: 5,
    elevation: 1, // Add shadow for better visibility
  },
  subMenuText: {
    fontSize: 14,
    color: "#333", // Dark grey text color for submenu items
  },
});

export default Menu;
