import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { validatePassword } from "../../helpers/validate";
import { resetPassword } from "../../api/authAPIs";
import NotiModal from "../../components/NotiModal";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = () => {
  const { otpToken } = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isLoading, setLoading] = useState(false);

//Modal dialog
const [showNotiModal, setShowNotiModal] = useState(false);
const [title, setTitle] = useState("");
const [message, setMessage] = useState("");
const [isRedirect, setIsRedirect] = useState(false);
const [forUsr, setForUsr] = useState("warning");
const [redirectTo, setRedirectTo] = useState("");
const [params, setParams] = useState({});
const [button, setButton] = useState("");

const hanldTurnOnModal = (
  show,
  title,
  message,
  redirect,
  forUsr,
  redirectTo,
  params,
  button
) => {
  setShowNotiModal(show);
  setTitle(title);
  setMessage(message);
  setIsRedirect(redirect);
  setForUsr(forUsr);
  setRedirectTo(redirectTo);
  setParams(params);
  setButton(button)
};

  const handleResetPassword = async () => {
    let hasError = false;
    setLoading(true);
    setPasswordError("");
    setPasswordConfirmError("");

    if (!validatePassword(password)) {
      setPasswordError("Vui lòng nhập mật khẩu hợp lệ.");
      hasError = true;
    }

    if (!validatePassword(passwordConfirm)) {
      setPasswordConfirmError("Vui lòng nhập xác nhận mật khẩu hợp lệ.");
      hasError = true;
    }

    if (password !== passwordConfirm) {
      setPasswordError("Mật khẩu không khớp.");
      setPasswordConfirmError("Mật khẩu không khớp.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      console.log(password, otpToken);
      const userData = await resetPassword(password, otpToken);
      hanldTurnOnModal(
        true,
        "Thay đổi mật khẩu thanh công",
        "Bây giờ bạn có thể sử dụng mật khẩu mới để đăng nhập vào tài khoản của mình.",
        true,
        "success",
        "/(auth)/sign-in",
        {},
        "Tiếp tục",
      );
    } catch (error) {
      if (error.status === 401) {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Mã OTP đã hết hạn. Vui lòng xác thực lại OTP để đổi mật khẩu.",
          false,
          "warning",
          "/(auth)/sign-in",
          {},
          "Đóng",
        );
      } else {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
          false,
          "error",
          "/(auth)/sign-in",
          {},
          "Đóng",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary-0">
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          className="text-3xl font-bold"
          onPress={() => router.back()}
        >
          <Image
            source={require("../../assets/icons/arrow-icon.png")}
            className="w-6 h-6"
          />
        </Text>
        <Text
          className="text-4xl mt-3 font-bold"
        >
          Đặt lại mật khẩu
        </Text>
        <Text
          style={{
            fontWeight: "regular",
            color: "#808080",
            marginBottom: 15,
            marginTop: 5,
            fontSize: 16,
          }}
        >
          Đặt mật khẩu mới cho tài khoản của bạn để bạn có thể đăng nhập và truy
          cập tất cả các tính năng.
        </Text>

        <View className="my-1.5 ">
          <Text
            className="w-80 text-base font-medium"
          >
            Mật khẩu mới
          </Text>
          <View
            className={`flex-row items-center border rounded-xl h-[50] px-5 ${
              isFocused
                ? "border-primary-900"
                : passwordError
                ? "border-danger"
                : "border-primary-100"
            }`}
          >
            <TextInput
              className="text-sm font-medium flex-1"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(value) => setPassword(value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="ml-2"
            >
              <Image
                source={
                  showPassword
                    ? require("../../assets/icons/eye-on-icon.png")
                    : require("../../assets/icons/eye-off-icon.png")
                }
                className="h-6 w-6"
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={{ color: "red", fontWeight: "medium" }}>
              {passwordError}
            </Text>
          )}
        </View>

        <View className="my-1.5">
          <Text
            className="w-80 text-base font-medium"
          >
            Xác nhận mật khẩu
          </Text>
          <View
            className={`flex-row items-center border rounded-xl h-[50] px-5 ${
              isFocused1
                ? "border-primary-900"
                : passwordConfirmError
                ? "border-danger"
                : "border-primary-100"
            }`}
          >
            <TextInput
              className="text-sm font-medium flex-1"
              placeholder="Nhập mật khẩu của bạn"
              value={passwordConfirm}
              secureTextEntry={!showPassword1}
              onChangeText={(value) => setPasswordConfirm(value)}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword1(!showPassword1)}
              className="ml-2"
            >
              <Image
                source={
                  showPassword1
                    ? require("../../assets/icons/eye-on-icon.png")
                    : require("../../assets/icons/eye-off-icon.png")
                }
                className="h-6 w-6"
              />
            </TouchableOpacity>
          </View>
          {passwordConfirmError && (
            <Text style={{ color: "red", fontWeight: "medium" }}>
              {passwordConfirmError}
            </Text>
          )}
        </View>

        <Pressable
          style={[styles.Pressable, { marginTop: 30 }]}
          onPress={handleResetPassword}
          className={`w-full ${
            isLoading ? "bg-primary-200" : "bg-primary-900"
          }`}
          disabled={isLoading}
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#FFFFFF" }}>
            {isLoading ? "Đang tải..." : "Đặt lại mật khẩu"}
          </Text>
        </Pressable>
        <NotiModal
          visible={showNotiModal}
          onClose={() => setShowNotiModal(false)}
          title={title}
          forUse={forUsr}
          message={message}
          redirect={isRedirect}
          redirectTo={redirectTo}
          params={params}
          button={button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    marginEnd: 20,
    marginStart: 20,
  },
  Pressable: {
    borderRadius: 10,
    height: 52,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "center",
  },
});
