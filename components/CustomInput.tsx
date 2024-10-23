import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Image } from 'react-native';

interface InputComponentProps {
    label: string;
    value: string;
    placeholder: string;
    setValue: (value: string) => void;
    error: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; // Thêm prop keyboardType tùy chọn
}

const InputComponent: React.FC<InputComponentProps> = ({ label, value, placeholder, setValue, error, keyboardType = 'default' }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <View className='my-1.5 '>
            <Text style={{ fontFamily: 'GeneralMedium' }} className='w-80 text-base'>{label}</Text>
            <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused ? 'border-primary-900' : (error ? 'border-danger' : 'border-primary-100')}`}>
                <TextInput
                    style={{ fontFamily: 'GeneralMedium', flex: 1 }} // Make TextInput take remaining space
                    className='text-sm'
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(value) => setValue(value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType} // Áp dụng keyboardType từ props
                />
                {error && (
                    <View className='ml-2'>
                        <View className='ml-2'>
                            <Image
                                source={require('../assets/icons/error-icon.png')}
                                className='h-6 w-6'
                            />
                        </View>
                    </View>
                )}
            </View>
            {error && ( <Text style={{ color: 'red', fontFamily: 'GeneralMedium' }}>{error}</Text>)}
        </View >
    );
};

export default InputComponent;
