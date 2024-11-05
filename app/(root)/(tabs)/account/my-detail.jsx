import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../../../components/Header';


const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function MyDetailsScreen() {
  const [fullName, setFullName] = useState('Cody Fisher');
  const [email, setEmail] = useState('cody.fisher45@example.com');
  const [dateOfBirth, setDateOfBirth] = useState(new Date('1990-12-07'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('+1234453231506');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="My Details" />

      {/* Form */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Full Name</StyledText>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            className="border border-gray-300 rounded-lg p-3 text-black"
            placeholder="Full Name"
          />
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Email Address</StyledText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-lg p-3 text-black"
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Date of Birth</StyledText>
          <StyledTouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center"
          >
            <StyledText className="text-black">{dateOfBirth.toLocaleDateString()}</StyledText>
            
          </StyledTouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Gender</StyledText>
          <StyledView className="border border-gray-300 rounded-lg">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </StyledView>
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Phone Number</StyledText>
          <TextInput
            initialCountry="us"
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            textProps={{ placeholder: "+1 234 453 231 506" }}
            style={{
              borderColor: '#D1D5DB',
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
            }}
            flagStyle={{
              borderRadius: 16,
              overflow: 'hidden',
              marginRight: 8,
            }}
          />
        </StyledView>

        <StyledTouchableOpacity className="bg-black rounded-lg p-4 mt-8">
          <StyledText className="text-center text-white font-semibold">Submit</StyledText>
        </StyledTouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
