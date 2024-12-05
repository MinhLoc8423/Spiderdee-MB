import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginLocal } from "../../api/authAPIs";
import { validateEmail, validatePassword } from "../../helpers/validate";
import { AuthContext } from "../../store/contexts/AuthContext";
import { API_BASE_URL } from "../../constants/endPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import NotiModal from "@/components/NotiModal";

GoogleSignin.configure({
  webClientId:
    "669733563945-gc85geutgk7f9tapnv3uk58il2i7m00q.apps.googleusercontent.com",
  scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId:
    "669733563945-ae3t4v27heq0i3bljqac2k2g4rsr1pks.apps.googleusercontent.com",
});

const SingIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //Modal dialog
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [button, setButton] = useState("");

  const hanldTurnOnModal = (show, title, message, forUsr, button) => {
    setShowNotiModal(show);
    setTitle(title);
    setMessage(message);
    setForUsr(forUsr);
    setButton(button);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const ressponse = await axios.post(
        `${API_BASE_URL}auth/login-with-google`,
        {
          token: tokens.accessToken,
        }
      );
      console.log("Access Token:", ressponse.data.data.token);
      if (ressponse.data.status === 200) {
        login(ressponse.data.data.token);
      } else {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Đăng nhập google thất bại.",
          "warning",
          "Đóng"
        );
      }
    } catch (error) {
      hanldTurnOnModal(
        true,
        "Thông báo",
        "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
        "error",
        "Đóng"
      );
      console.log("Google Signin Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    let hasError = false;
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError("Vui lòng nhập mật khẩu hợp lệ.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const userData = await loginLocal(email, password);
      login(userData.data.token);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        setEmailError("E-mail hoặc mật khẩu không đúng.");
        setPasswordError("E-mail hoặc mật khẩu không đúng.");
      } else {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
          "error",
          "Đóng"
        );
        console.log("Login Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <ScrollView className="px-5 ">
        <Text className="text-3xl mt-3 font-semibold">
          Đăng nhập vào tài khoản của bạn
        </Text>
        <Text style={styles.text1} className="mb-5">
          Rất vui khi được gặp lại bạn.
        </Text>

        <View className="my-1 ">
          <Text className="w-80 text-base font-medium">E-mail</Text>
          <TextInput
            className={`border rounded-xl h-[50] px-5 text-sm ${
              isFocused
                ? "border-primary-900"
                : emailError
                ? "border-danger"
                : "border-primary-100"
            }`}
            placeholder="Vui lòng nhập E-mail"
            onChangeText={(value) => setEmail(value)}
            value={email}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {emailError && (
            <Text className="text-danger font-medium">{emailError}</Text>
          )}
        </View>

        <View className="mt-1">
          <Text className="w-80 text-base font-medium">Mật khẩu</Text>
          <View
            className={`flex-row items-center border rounded-xl h-[50] px-5 ${
              isFocused1
                ? "border-primary-900"
                : passwordError
                ? "border-danger"
                : "border-primary-100"
            }`}
          >
            <TextInput
              className="text-sm flex-1 font-medium"
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(value) => setPassword(value)}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
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
            <Text className="text-danger font-medium">{passwordError}</Text>
          )}
        </View>

        <Text style={[styles.text2]}>
          Quên mật khẩu?{" "}
          <Link
            href={"/(auth)/forgot-password"}
            style={{
              color: "#1A1A1A",
              fontWeight: 600,
              textDecorationLine: "underline",
            }}
          >
            Đặt lại mật khẩu của bạn
          </Link>{" "}
        </Text>

        <Pressable
          style={[styles.Pressable, { marginTop: 30 }]}
          onPress={handleLogin}
          className={`w-full ${
            isLoading ? "bg-primary-200" : "bg-primary-900"
          } `}
          disabled={isLoading}
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#FFFFFF" }}>
            {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
          </Text>
        </Pressable>

        <View className="flex-row items-center mb-7 mt-7">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <Pressable
          style={[styles.Pressable]}
          className="w-full"
          onPress={handleGoogleLogin}
        >
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Đăng nhập bằng Google
          </Text>
          <Image
            source={require("../../assets/icons/logo-google-icon.png")}
            style={{ marginEnd: 10 }}
          />
        </Pressable>

        <Pressable
          style={[
            styles.Pressable,
            { backgroundColor: "#1877F2", marginTop: 15 },
          ]}
          className="w-full"
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#FFFFFF" }}>
            Đăng nhập bằng Facebook
          </Text>
          <Image
            source={require("../../assets/icons/logo-facebook-icon.png")}
            style={{ marginEnd: 10 }}
          />
        </Pressable>

        <Link
          href={"/(auth)/sign-up"}
          style={[styles.text2, { textAlign: "center", marginTop: 60 }]}
        >
          Bạn chưa có tài khoản?{" "}
          <Text
            style={{
              color: "#1A1A1A",
              fontWeight: 600,
              textDecorationLine: "underline",
            }}
          >
            Đăng ký
          </Text>
        </Link>
      </ScrollView>
      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        button={button}
      />
    </SafeAreaView>
  );
};

export default SingIn;

const styles = StyleSheet.create({
  container: {
    marginEnd: 20,
    marginStart: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "600",
  },
  text1: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "regular",
  },
  TextInputName: {
    borderWidth: 1,
    borderRadius: 10,
    height: 52,
    paddingStart: 20,
    borderColor: "#E6E6E6",
    fontSize: 14,
  },
  text2: {
    fontSize: 14,
    fontWeight: "200",
    fontWeight: "regular",
    marginTop: 5,
  },
  Pressable: {
    borderRadius: 10,
    height: 54,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  textOr: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 15,
  },
});
