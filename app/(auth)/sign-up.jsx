import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import InputComponent from "../../components/CustomInput";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../helpers/validate";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { register } from "../../api/authAPIs";
import { AuthContext } from "../../store/contexts/AuthContext";
import { API_BASE_URL } from "../../constants/endPoints";
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
const Signup = () => {
  const { login } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastname, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

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
  const [redirectTo, setRedirectTo] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [button, setButton] = useState("");

  const hanldTurnOnModal = (
    show,
    title,
    message,
    isRedirect,
    ridirectTo,
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
          false,
          "",
          "warning",
          "Đóng"
        );
      }
    } catch (error) {
      hanldTurnOnModal(
        true,
        "Thông báo",
        "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
        false,
        "",
        "error",
        "Đóng"
      );
      console.log("Google Signin Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    let hasError = false;
    setLoading(true);
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneError("");
    setPasswordConfirmError("");

    if (!firstName) {
      setFirstNameError("Vui lòng nhập tên của bạn.");
      hasError = true;
    }
    if (!lastname) {
      setLastNameError("Vui lòng nhập họ của bạn.");
      hasError = true;
    }
    if (!validatePhoneNumber(phone)) {
      setPhoneError("Vui lòng nhập số điện thoại của bạn hợp lệ.");
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError("Vui lòng nhập mật khẩu hợp lệ.");
      hasError = true;
    }

    if (!validatePassword(passwordConfirm)) {
      setPasswordConfirmError("Vui lòng nhập mật khẩu hợp lệ để xác nhận.");
      hasError = true;
    }

    if (password !== passwordConfirm) {
      setPasswordError("Mật khẩu không khớp.");
      setPasswordConfirmError("Mật khẩu và xác nhận mật khẩu không khớp nhau.");
      hasError = true;
    }
    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const userData = await register(
        firstName,
        lastname,
        email,
        password,
        phone
      );
      console.log(userData);
      if (!userData) {
        setEmailError("E-mail đã tồn tại");
      } else {
        hanldTurnOnModal(
          true,
          "Đăng ký",
          "Chúc mừng bạn đã đăng ký thành công, chúng tôi sẽ gửi email xác nhận đến bạn. Vui lòng quay lại trang đăng nhập để tiếp tục!",
          true,
          "/(auth)/sign-in",
          "success",
          "Đóng"
        );
      }
    } catch (error) {
      if (error.status === 400) {
        setEmailError("E-mail đã tồn tại");
      } else {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
          false,
          "",
          "error",
          "Đóng"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
      >
        <Text style={styles.text}>Tạo tài khoản</Text>
        <Text style={styles.text1} className="mb-6">
          Hãy tạo tài khoản của bạn.
        </Text>

        <InputComponent
          label="E-mail"
          value={email}
          placeholder={"Vui lòng nhập email của bạn"}
          setValue={setEmail}
          error={emailError}
        />

        <InputComponent
          label="Tên"
          value={firstName}
          placeholder={"Vui lòng nhập tên của bạn"}
          setValue={setFirstName}
          error={firstNameError}
        />

        <InputComponent
          label="Họ"
          value={lastname}
          placeholder={"Vui lòng nhập họ của bạn"}
          setValue={setLastName}
          error={lastNameError}
        />

        <InputComponent
          label="Số điện thoại"
          value={phone}
          placeholder={"Vui lòng nhập số điện thoại của bạn"}
          setValue={setPhone}
          error={phoneError}
          keyboardType="numeric"
        />

        <View className="my-1.5 ">
          <Text
            style={{ fontFamily: "GeneralMedium" }}
            className="w-80 text-base"
          >
            Mật khẩu
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
              style={{ fontFamily: "GeneralMedium", flex: 1 }} // Make TextInput take remaining space
              className="text-sm"
              placeholder="Nhập mật khẩu"
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
            <Text style={{ color: "red", fontFamily: "GeneralMedium" }}>
              {passwordError}
            </Text>
          )}
        </View>

        <View className="my-1.5">
          <Text
            style={{ fontFamily: "GeneralMedium" }}
            className="w-80 text-base"
          >
            Nhập lại mật khẩu
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
              style={{ fontFamily: "GeneralMedium", flex: 1 }} // Make TextInput take remaining space
              className="text-sm"
              placeholder="Nhập mật khẩu"
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
            <Text style={{ color: "red", fontFamily: "GeneralMedium" }}>
              {passwordConfirmError}
            </Text>
          )}
        </View>

        <Text style={styles.text2}>
          Bằng cách đăng ký, bạn đồng ý với chúng tôi{" "}
          <Text
            style={{
              color: "#1A1A1A",
              fontWeight: 600,
              textDecorationLine: "underline",
            }}
          >
            Điều khoản, Chính sách bảo mật và Sử dụng Cookie
          </Text>
        </Text>

        <Pressable
          style={[styles.Pressable, { marginTop: 30 }]}
          onPress={handleRegister}
          className={`w-full ${
            isLoading ? "bg-primary-200" : "bg-primary-900"
          }`}
          disabled={isLoading}
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#FFFFFF" }}>
            {isLoading ? "Đang tải..." : "Đăng Ký"}
          </Text>
        </Pressable>

        <View className="flex-row items-center mb-5 mt-5">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500">Hoặc</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity
          style={[styles.Pressable]}
          onPress={handleGoogleLogin}
        >
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Đăng nhập bằng Google
          </Text>
          <Image
            source={require("../../assets/icons/logo-google-icon.png")}
            style={{ marginEnd: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.Pressable,
            { backgroundColor: "#1877F2", marginTop: 10 },
          ]}
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#FFFFFF" }}>
            Đăng nhập bằng Facebook
          </Text>
          <Image
            source={require("../../assets/icons/logo-facebook-icon.png")}
            style={{ marginEnd: 10 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text2,
            { textAlign: "center", marginTop: 20, marginBottom: 50 },
          ]}
          className="mb-5"
        >
          Bạn đã có tài khoản?{" "}
          <Link
            href={"/(auth)/sign-in"}
            style={{
              color: "#1A1A1A",
              fontWeight: 600,
              textDecorationLine: "underline",
            }}
          >
            Đăng nhập
          </Link>
        </Text>
      </ScrollView>
      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        redirect={isRedirect}
        redirectTo={redirectTo}
        message={message}
        button={button}
      />
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    marginEnd: 25,
    marginStart: 25,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 45,
  },
  text1: {
    fontSize: 16,
    fontWeight: "medium",
  },
  TextInputName: {
    borderWidth: 1,
    borderRadius: 10,
    width: 341,
    height: 52,
    marginVertical: 5,
    paddingStart: 20,
    borderColor: "#E6E6E6",
    fontSize: 14,
  },
  text2: {
    fontSize: 13,
    fontWeight: "medium",
  },
  Pressable: {
    borderRadius: 10,
    height: 52,
    borderWidth: 2,
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
