import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import { AuthContext } from "../../../../store/contexts/AuthContext";
import { getUserById, updateUser } from "../../../../api/userAPIs";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function MyDetailsScreen() {
  const [fisrtName, setFisrtName] = useState("");
  const [errorFisrtName, setErrorFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1234453231506");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const { user } = useContext(AuthContext);
  console.log("User: ", user);

  const getUser = async () => {
    const data = await getUserById(user.id);
    console.log("User: ", data.data);
    setFisrtName(data.data.first_name);
    setLastName(data.data.last_name);
    setEmail(data.data.email);
    setPhoneNumber(data.data.phone_number);
  };

  const hanldeUpdateFrofie = async () => {
    const data = await updateUser(user.id, fisrtName, lastName, phoneNumber);
    console.log("User updated: ", data.data);
    setFisrtName(data.data.first_name);
    setLastName(data.data.last_name);
    setPhoneNumber(data.data.phone_number);
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6">
        <Header title="My Details" />
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <CustomInput
          label="First Name"
          placeholder={"First Name"}
          setValue={setFisrtName}
          error={errorFisrtName}
          value={fisrtName}
        />
        <View className="mb-4"></View>
        <CustomInput
          label="Last Name"
          placeholder={"Last Name"}
          setValue={setLastName}
          error={errorLastName}
          value={lastName}
        />
        <View className="mb-4"></View>
        <StyledView className="">
          <Text
            style={{ fontFamily: "GeneralMedium" }}
            className="w-80 text-base"
          >
            Email
          </Text>
          <TextInput
            value={email}
            editable={false}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-lg p-3 text-black"
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </StyledView>
        <View className="mb-4"></View>

        {/* <StyledView className="mb-4">
          <StyledText className="text-gray-700 mb-2">Date of Birth</StyledText>
          <StyledTouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center"
          >
            <StyledText className="text-black">
              {dateOfBirth.toLocaleDateString()}
            </StyledText>
          </StyledTouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </StyledView> */}

        {/* <StyledView className="mb-4">
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
        </StyledView> */}

        <CustomInput
          setValue={setPhoneNumber}
          value={phoneNumber}
          label="Phone Number"
          placeholder={"Phone Number"}
          keyboardType="phone-pad"
          error={errorPhoneNumber}
        />

        <StyledTouchableOpacity
          onPress={hanldeUpdateFrofie}
          className="bg-black rounded-lg p-4 mt-8"
        >
          <StyledText className="text-center text-white font-semibold">
            Submit
          </StyledText>
        </StyledTouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
