import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useContext } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginLocal } from "../../api/authAPIs";
import { validateEmail, validatePassword } from "../../helpers/validate";
import { AuthContext } from '../../store/contexts/AuthContext';

const SingIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("admin1@spiderdee.com");
  const [password, setPassword] = useState("Passwordvtvn123");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    let hasError = false;
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError("Please enter a valid password.");
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
        setEmailError("Email or password is incorrect.");
        setPasswordError("Email or password is incorrect.");
      } else {
        Alert.alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <ScrollView className="px-5 ">
        <Text
          style={{ fontFamily: "GeneralSemibold" }}
          className="text-3xl mt-3"
        >
          Đăng nhập vào tài khoản của bạn
        </Text>
        <Text style={styles.text1} className="mb-5">
        Thật vui khi được gặp lại bạn.
        </Text>

        <View className="my-1 ">
          <Text
            style={{ fontFamily: "GeneralMedium" }}
            className="w-80 text-base"
          >
            E-mail
          </Text>
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
            <Text style={{ color: "red", fontFamily: "GeneralMedium" }}>
              {emailError}
            </Text>
          )}
        </View>

        <View className="mt-1">
          <Text
            style={{ fontFamily: "GeneralMedium" }}
            className="w-80 text-base"
          >
            Mật khẩu
          </Text>
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
              style={{ fontFamily: "GeneralMedium", flex: 1 }} // Make TextInput take remaining space
              className="text-sm"
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
            <Text style={{ color: "red", fontFamily: "GeneralMedium" }}>
              {passwordError}
            </Text>
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
            {isLoading ? "Loading..." : "Đăng Nhập"}
          </Text>
        </Pressable>

        <View className="flex-row items-center mb-7 mt-7">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <Pressable style={[styles.Pressable]} className="w-full">
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
          style={[styles.text2, { textAlign: "center", marginTop: 100 }]}
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
    fontFamily: "GeneralRegular",
    color: "#808080",
    fontWeight: "200",
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
    fontSize: 13,
    fontWeight: "200",
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
