import { Pressable, StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { validateEmail } from '../../helpers/validate';
import InputComponent from '../../components/CustomInput';
import { sendOTP } from '../../api/authAPIs';
import NotiModal from "@/components/NotiModal";
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
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

  const handleSendOTP = async () => {
    let hasError = false;
    setLoading(true);
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const userData = await sendOTP(email);
      if (!userData) {
        setEmailError('Email không đúng.');
      } else {
        router.push({
          pathname: '/(auth)/verification',
          params: { email: email },
        });
      }
    } catch (error) {
      if (error.status === 404) {
        setEmailError("Người dùng không tồn tại");
      }
      else {
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
    <SafeAreaView
      className="bg-primary-0">
      <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        <Text className='text-3xl' onPress={() => router.back()} >
          <Image source={require('../../assets/icons/arrow-icon.png')} className="w-6 h-6" />
        </Text>

        <Text className='text-4xl mt-3 font-bold'>Quên mật khẩu</Text>
        <Text style={{ fontWeight: 'medium', fontSize: 16, color: '#808080', marginBottom: 15, marginTop: 5 }}>
        Nhập email của bạn để xác minh. Chúng tôi sẽ gửi mã gồm 4 chữ số đến email của bạn.
        </Text>

        <InputComponent label="Email" value={email} placeholder={'Vui lòng nhập địa chỉ E-mail'} setValue={setEmail} error={emailError} />

        <Pressable
          style={[styles.Pressable, { marginTop: 20 }]}
          onPress={handleSendOTP}
          className={`w-full ${isLoading ? 'bg-primary-200' : 'bg-primary-900'}`}
          disabled={isLoading}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>{isLoading ? 'Đang tải...' : "Gửi mã"}</Text>
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
  headerText: {
    fontSize: 32,
    color: '#1A1A1A',
    paddingTop: 20,
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 20, // Khoảng cách dưới cùng
  },
  Pressable: {
    borderRadius: 10,
    height: 52,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
  },
});
