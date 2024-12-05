import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { MotiView } from "moti"; // Import Moti for Skeleton animation
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import { AuthContext } from "../../../../store/contexts/AuthContext";
import { getUserById, updateUser } from "../../../../api/userAPIs";

// Styled components with nativewind
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function MyDetailsScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1234453231506");
  
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useContext(AuthContext);
  console.log("User: ", user);

  const getUser = async () => {
    const data = await getUserById(user.id);
    console.log("User: ", data.data);
    setFirstName(data.data.first_name);
    setLastName(data.data.last_name);
    setEmail(data.data.email);
    setPhoneNumber(data.data.phone_number);
    setLoading(false); // Stop loading when data is fetched
  };

  const handleUpdateProfile = async () => {
    const data = await updateUser(user.id, firstName, lastName, phoneNumber);
    console.log("User updated: ", data.data);
    setFirstName(data.data.first_name);
    setLastName(data.data.last_name);
    setPhoneNumber(data.data.phone_number);
  };

  useEffect(() => {
    getUser();
  }, [user]);

  // Skeleton Loader component
  const SkeletonLoader = ({ width, height }) => (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        width: width,
        height: height,
        backgroundColor: "#E0E0E0",
        marginBottom: 12,
        borderRadius: 8,
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6">
        <Header title="Cập nhật thông tin" />
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        {loading ? (
          // Hiển thị Skeleton nếu đang loading
          <>
            <SkeletonLoader width="60%" height={25} />
            <SkeletonLoader width="100%" height={15} />
            <SkeletonLoader width="70%"  height={15} />
          </>
        ) : (
          <>
            <CustomInput
              label="Tên"
              placeholder={"Vui lòng nhập tên"}
              setValue={setFirstName}
              value={firstName}
            />
            <View className="mb-4"></View>
            <CustomInput
              label="Họ"
              placeholder={"Vui lòng nhập họ"}
              setValue={setLastName}
              value={lastName}
            />
            <View className="mb-4"></View>
            <StyledView className="">
              <Text style={{ fontFamily: "GeneralMedium" }} className="w-80 text-base">
                Email
              </Text>
              <TextInput
                value={email}
                editable={false}
                onChangeText={setEmail}
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder="Địa chỉ E-mail"
                keyboardType="email-address"
              />
            </StyledView>
            <View className="mb-4"></View>

            <CustomInput
              setValue={setPhoneNumber}
              value={phoneNumber}
              label="Số điện thoại"
              placeholder={"Vui lòng nhập số điện thoại"}
              keyboardType="phone-pad"
            />

            <StyledTouchableOpacity
              onPress={handleUpdateProfile}
              className="bg-black rounded-lg p-4 mt-8"
            >
              <StyledText className="text-center text-white font-semibold">
                Lưu thông tin
              </StyledText>
            </StyledTouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
