import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { AddressContext } from "../../../store/contexts/AddressContext";
import NotiModal from "../../../components/NotiModal.jsx";

const NewAddressScreen = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);

  const { addresses, addAddress, setDefaultAddress } =
    useContext(AddressContext);

  //Modal dialog
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [isRedirect, setIsRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  const [button, setButton] = useState("");

  const hanldTurnOnModal = (
    show,
    title,
    isRedirect,
    ridirectTo,
    message,
    forUsr,
    button
  ) => {
    setShowNotiModal(show);
    setTitle(title);
    setMessage(message);
    setIsRedirect(isRedirect);
    setRedirectTo(ridirectTo);
    setForUsr(forUsr);
    setButton(button);
  };

  const handleAddAddress = () => {
    if (!nickname || !fullAddress) {
      hanldTurnOnModal(
        true,
        "Thông báo",
        false,
        "",
        "Vui lòng nhập đầy đủ thông tin",
        "warning",
        "Đóng"
      );
      return;
    }
    const name = nickname;
    const address = fullAddress;
    addAddress(name, address, isDefault);
    setModalVisible(true);
    hanldTurnOnModal(
      true,
      "Thông báo",
      true,
      "/(root)/checkout-address/address",
      "Cập nhật địa chỉ thành công.",
      "success",
      "Đóng"
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    router.push("(root)/checkout-address/new-address");
  };

  const handleNicknameSelect = (selectedNickname) => {
    setNickname(selectedNickname);
    setNicknameModalVisible(false); // Đóng modal sau khi chọn
  };

  const nicknameOptions = ["Nhà riêng", "Văn phòng", "Căn hộ"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Tiêu đề */}
        <View className="px-6">
          <Header title="Thêm địa chỉ" />
        </View>

        {/* Bản đồ giả lập */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="location-outline" size={64} color="#000" />
        </View>

        {/* Form Thêm Địa Chỉ */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>

          {/* Biệt danh Địa chỉ */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Biệt danh Địa chỉ</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setNicknameModalVisible(true)}
            >
              <Text style={styles.dropdownText}>{nickname || "Chọn một"}</Text>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Địa chỉ đầy đủ */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Địa chỉ đầy đủ</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ đầy đủ..."
              value={fullAddress}
              onChangeText={setFullAddress}
            />
          </View>

          {/* Đặt làm địa chỉ mặc định */}
          <View style={styles.defaultContainer}>
            <Text style={styles.defaultText}>Đặt làm địa chỉ mặc định</Text>
            <Switch
              value={isDefault}
              onValueChange={setIsDefault}
              trackColor={{ false: "#767577", true: "#767577" }} // Màu nền khi bật/tắt
              thumbColor={isDefault ? "#1A1A1A" : "#f4f3f4"}
            />
          </View>

          {/* Nút Thêm */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Chọn Biệt Danh */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isNicknameModalVisible}
        onRequestClose={() => setNicknameModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.nicknameModalContainer}>
            <Text style={styles.modalTitle}>Chọn biệt danh</Text>
            <FlatList
              data={nicknameOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.nicknameOption}
                  onPress={() => handleNicknameSelect(item)}
                >
                  <Text style={styles.nicknameText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setNicknameModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        redirect={isRedirect}
        redirectTo={redirectTo}
        button={button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: 24,
    paddingStart: 24,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  mapPlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    padding: 20,
    paddingStart: 24,
    paddingEnd: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: "#333", marginBottom: 5 },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  dropdownText: { fontSize: 14, color: "#333" },
  input: { padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  defaultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  defaultText: { fontSize: 14, color: "#333" },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  modalMessage: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontSize: 16 },
  nicknameModalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  nicknameOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  nicknameText: { fontSize: 16, color: "#333", textAlign: "center" },
});

export default NewAddressScreen;
