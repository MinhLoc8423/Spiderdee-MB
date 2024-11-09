import { Pressable, StyleSheet, Text, View, TextInput, Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import axios from 'axios';
import InputComponent from '../../components/CustomInput';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../helpers/validate';
<<<<<<< HEAD
import { register } from '../../api/auth';
import NotiModal from '../../components/NotiModal';
=======
import { register } from '../../api/authAPIs';
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509

const Signup = () => {

    const [firstName, setFirstName] = useState('Siderdee');
    const [firstNameError, setFirstNameError] = useState('');

    const [lastname, setLastName] = useState('Manager');
    const [lastNameError, setLastNameError] = useState('');

    const [email, setEmail] = useState('admin3@spiderdee.com');
    const [emailError, setEmailError] = useState('');

    const [phone, setPhone] = useState('09273932323');
    const [phoneError, setPhoneError] = useState('');


    const [password, setPassword] = useState('Passwordvtvn123');
    const [passwordError, setPasswordError] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('Passwordvtvn123');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [showNotiModal, setShowNotiModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [forUsr, setForUsr] = useState("warning");

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
            setPhoneError("Vui lòng nhập số điện thoại của bạn.");
            hasError = true;
        }

        if (!validateEmail(email)) {
            setEmailError("Vui lòng nhập địa chỉ e-mail hợp lệ.");
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
            const userData = await register(firstName, lastname, email, password, phone);
            console.log(userData);
            if (!userData) {
                setEmailError("E-mail đã tồn tại");
            } else {
               
               
                    router.replace('/(auth)/sign-in');
                }
            
        } catch (error) {
            if (error.status === 400) {
                setEmailError("E-mail đã tồn tại");

            }
            else {
                setForUsr('success');
                setTitle("Đăng ký thành công");
                // setMessage("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
                setShowNotiModal(true);
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
                <Text style={styles.text1} className='mb-6'>Hãy tạo tài khoản của bạn.</Text>

                <InputComponent label='E-mail' value={email} placeholder={'Vui lòng nhập email của bạn'} setValue={setEmail} error={emailError} />

                <InputComponent label='Tên' value={firstName} placeholder={'Vui lòng nhập tên của bạn'} setValue={setFirstName} error={firstNameError} />

                <InputComponent label='Họ' value={lastname} placeholder={'Vui lòng nhập họ của bạn'} setValue={setLastName} error={lastNameError} />

                <InputComponent label='Số điện thoại' value={phone} placeholder={'Vui lòng nhập số điện thoại của bạn'} setValue={setPhone} error={phoneError} keyboardType="numeric" />

                <View className='my-1.5 '>
                    <Text style={{ fontFamily: 'GeneralMedium' }} className='w-80 text-base'>Mật khẩu</Text>
                    <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused ? 'border-primary-900' : (passwordError ? 'border-danger' : 'border-primary-100')}`}>
                        <TextInput
                            style={{ fontFamily: 'GeneralMedium', flex: 1 }} // Make TextInput take remaining space
                            className='text-sm'
                            placeholder='Nhập mật khẩu'
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='ml-2'>
                            <Image
                                source={showPassword ? require('../../assets/icons/eye-on-icon.png') : require('../../assets/icons/eye-off-icon.png')}
                                className='h-6 w-6'
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError && (<Text style={{ color: 'red', fontFamily: 'GeneralMedium' }}>{passwordError}</Text>)}
                </View>

                <View className='my-1.5'>
                    <Text style={{ fontFamily: 'GeneralMedium' }} className='w-80 text-base'>Nhập lại mật khẩu</Text>
                    <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused1 ? 'border-primary-900' : (passwordConfirmError ? 'border-danger' : 'border-primary-100')}`}>
                        <TextInput
                            style={{ fontFamily: 'GeneralMedium', flex: 1 }} // Make TextInput take remaining space
                            className='text-sm'
                            placeholder='Nhập mật khẩu'
                            value={passwordConfirm}
                            secureTextEntry={!showPassword1}
                            onChangeText={(value) => setPasswordConfirm(value)}
                            onFocus={() => setIsFocused1(true)}
                            onBlur={() => setIsFocused1(false)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)} className='ml-2'>
                            <Image
                                source={showPassword1 ? require('../../assets/icons/eye-on-icon.png') : require('../../assets/icons/eye-off-icon.png')}
                                className='h-6 w-6'
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordConfirmError && (<Text style={{ color: 'red', fontFamily: 'GeneralMedium' }}>{passwordConfirmError}</Text>)}
                </View>

                <Text style={styles.text2}>Bằng cách đăng ký, bạn đồng ý với chúng tôi <Text style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Điều khoản, Chính sách bảo mật và Sử dụng Cookie</Text></Text>

                <Pressable
                    style={[styles.Pressable, { marginTop: 30 }]}
                    onPress={handleRegister}
                    className={`w-full ${isLoading ? 'bg-primary-200' : 'bg-primary-900'}`}
                    disabled={isLoading}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>{isLoading ? 'Loading...' : "Đăng Ký"}</Text>
                </Pressable>

                <View className='flex-row items-center mb-5 mt-5'>
                    <View className='flex-1 h-px bg-gray-300' />
                    <Text className='px-2 text-gray-500'>Or</Text>
                    <View className='flex-1 h-px bg-gray-300' />
                </View>

                <TouchableOpacity style={[styles.Pressable]}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>Đăng nhập bằng Google</Text>
                    <Image
                        source={require("../../assets/icons/logo-google-icon.png")}
                        style={{ marginEnd: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1877F2', marginTop: 10 }]}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Đăng nhập bằng Facebook</Text>
                    <Image
                        source={require("../../assets/icons/logo-facebook-icon.png")}
                        style={{ marginEnd: 10 }} />
                </TouchableOpacity>

                <Text style={[styles.text2, { textAlign: 'center', marginTop: 20, marginBottom: 50 }]} className='mb-5'>Bạn đã có tài khoản? <Link href={('/(auth)/sign-in')} style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Đăng nhập</Link></Text>
                <NotiModal
                    visible={showNotiModal}
                    onClose={() => setShowNotiModal(false)}
                    title={title}
                    forUse={forUsr}
                    message={message}
                />
            </ScrollView>
        </SafeAreaView >
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
        fontWeight: '600',
        marginTop: 45
    },
    text1: {
        fontSize: 16,
        fontWeight: '200'
    },
    TextInputName: {
        borderWidth: 1,
        borderRadius: 10,
        width: 341,
        height: 52,
        marginVertical: 5,
        paddingStart: 20,
        borderColor: '#E6E6E6',
        fontSize: 14
    },
    text2: {
        fontSize: 13,
        fontWeight: '200',
    },
    Pressable: {
        borderRadius: 10,
        height: 52,
        borderWidth: 2,
        borderColor: '#E6E6E6',
        justifyContent: 'center',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    textOr: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        marginTop: 15
    }
});
