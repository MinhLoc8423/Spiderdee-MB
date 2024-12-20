import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

const InputComponent = ({ label, value, placeholder, setValue, error, keyboardType = 'default' }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className='my-1.5'>
            <Text className='font-medium w-80 text-base'>{label}</Text>
            <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused ? 'border-primary-900' : (error ? 'border-danger' : 'border-primary-100')}`}>
                <TextInput
                    className='text-sm font-medium flex-1'
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
            {error && ( <Text style={{ color: 'red', fontWeight: 'medium' }}>{error}</Text>)}
        </View>
    );
};

export default InputComponent;
