import { Pressable, StyleSheet, Text, Image, View, ScrollView, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { sendOTP, verifyOTP } from '../../api/authAPIs';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotiModal from "@/components/NotiModal";

const ForgotPassword = () => {
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
  });
  const [otpError, setOtpError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(true); // Trạng thái cho phép resend
  const [countdown, setCountdown] = useState(0); // Thời gian đếm ngược

  // Tạo refs cho từng TextInput
  const inputRefs = {
    digit1: useRef(null),
    digit2: useRef(null),
    digit3: useRef(null),
    digit4: useRef(null),
  };

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

  const handleChange = (value, field) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const currentIndex = parseInt(field.slice(-1));

    // Chỉ cho phép nhập mã vào ô hiện tại hoặc ô tiếp theo nếu ô hiện tại đã được điền
    if (numericValue.length === 1) {
      // Kiểm tra xem ô trước đó đã được điền chưa
      const prevField = `digit${currentIndex - 1}`;
      if (currentIndex === 1 || otp[prevField] !== '') {
        setOtp((prevState) => ({ ...prevState, [field]: numericValue }));

        // Tự động focus vào input tiếp theo
        if (field !== 'digit4') {
          const nextField = `digit${currentIndex + 1}`;
          inputRefs[nextField].current?.focus();
        }
      }
    }
  };

  const handleKeyPress = (key, field) => {
    if (key === 'Backspace') {
      // Kiểm tra xem trường hiện tại có trống không
      if (otp[field] === '') {
        if (field !== 'digit1') {
          const prevField = `digit${parseInt(field.slice(-1)) - 1}`;
          setOtp((prevState) => ({ ...prevState, [field]: '' })); // Xóa input hiện tại
          inputRefs[prevField].current?.focus(); // Chuyển focus về input trước
        }
      } else {
        // Xóa giá trị hiện tại khi nhấn backspace
        setOtp((prevState) => ({ ...prevState, [field]: '' }));
      }
    }
  };

  const handleSendOTP = async () => {
    if (!canResend) return; // Nếu không được phép resend thì thoát hàm

    setLoading(true);
    setCanResend(false);
    setOtpError('');

    try {
      await sendOTP(email); // Gửi mã OTP tới email
      setCanResend(false); // Đặt trạng thái không cho phép resend
      setCountdown(180); // Đặt thời gian đếm ngược 3 phút (180 giây)
    } catch (error) {
      hanldTurnOnModal(
        true,
        "Thông báo",
        "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
        "error",
        "Đóng"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1); // Giảm thời gian đếm ngược
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true); // Cho phép resend sau khi đếm ngược xong
    }
    return () => clearInterval(timer); // Dọn dẹp khi component unmount
  }, [countdown]);

  const handleVerifyOTP = async () => {
    let hasError = false;
    setLoading(true);
    setOtpError('');

    // Kiểm tra xem tất cả các trường đã được điền chưa
    if (Object.values(otp).some((digit) => digit === '')) {
      setOtpError('Vui lòng điền vào tất cả các chữ số.');
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const otpCode = Object.values(otp).join('');
      const userData = await verifyOTP(email, otpCode);
      console.log('Verify OTP response: ', userData.data.token);
      router.replace({
        pathname: '/(auth)/reset-password',
        params: { otpToken: userData.data.token },
      });
    } catch (error) {
      if (error.status === 400) {
        if (error.message === 'OTP has expired. Please request a new code.') {
          setOtpError('Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.');
        }
        if (error.message === 'Invalid OTP') {
          setOtpError('Mã OTP không hợp lệ.');
        }
      } else {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
          "error",
          "Đóng"
        );
        console.log(error);
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
        <Text className="text-3xl" onPress={() => router.back()}>
          <Image source={require('../../assets/icons/arrow-icon.png')} className="w-6 h-6" />
        </Text>

        <Text className="text-4xl mt-3 font-bold">
          Nhập Mã 4 Số
        </Text>
        <Text style={{ fontWeight: 'regular', color: '#808080', marginBottom: 15, marginTop: 5, fontSize: 16 }}>
        Nhập mã 4 chữ số mà bạn nhận được trong email của bạn (<Text style={{ color: '#1A1A1A', fontWeight: "regular" }}>{email}</Text>).
        </Text>

        <View style={styles.otpContainer}>
          {['digit1', 'digit2', 'digit3', 'digit4'].map((field, index) => (
            <View key={index} style={styles.otpInputWrapper}>
              <TextInput
                ref={inputRefs[field]}
                style={styles.otpInput}
                keyboardType="numeric"
                value={otp[field]}
                onChangeText={(value) => handleChange(value, field)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, field)}
                maxLength={1}
              />
            </View>
          ))}
        </View>

        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

        <Text style={{ fontWeight: 'regular', color: '#808080', marginBottom: 15, marginTop: 5, textAlign: 'center' }}>
        Không nhận được email?
          <Text
            onPress={handleSendOTP}
            className={`text-primary-900 underline ${canResend ? '' : 'opacity-50'}`}
            style={{ color: canResend ? '#1A1A1A' : '#808080' }}
            disabled={!canResend}
          >
            {canResend ? ' Gửi lại mã' : ` Gửi lại mã (${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60})`}
          </Text>
        </Text>

        <Pressable
          style={[styles.Pressable, { marginTop: 20 }]}
          onPress={handleVerifyOTP}
          className={`w-full ${isLoading ? 'bg-primary-200' : 'bg-primary-900'}`}
          disabled={isLoading}
        >
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>
            {isLoading ? 'Chờ...' : 'Xác thực OTP'}
          </Text>
        </Pressable>
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

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginEnd: 20,
    marginStart: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  otpInputWrapper: {
    borderRadius: 10,
    width: 62,
    height: 60,
    borderWidth: 1,
    borderColor: '#B3B3B3',
  },
  otpInput: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  Pressable: {
    borderRadius: 10,
    height: 52,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
  },
});
