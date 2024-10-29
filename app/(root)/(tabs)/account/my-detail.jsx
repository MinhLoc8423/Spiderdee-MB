import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // dùng thư viện picker cho giới tính
import DateTimePicker from "@react-native-community/datetimepicker"; // thư viện chọn ngày
import { AntDesign } from "@expo/vector-icons";
import InputComponent from "../../../../components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../../../api/user";
const MyDetail = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const fetchData = async () => {
        const token = await AsyncStorage.getItem("accessTokenUser");
        console.log(token);
        const decoded = jwtDecode(token);
        const userData = await getUserById(decoded.id);
        setEmail(userData.data.email);
        setLastName(userData.data.last_name);
        setFirstName(userData.data.first_name);
        setPhone(userData.data.phone);
    };


    // const [date, setDate] = useState(new Date(2003, 6, 12));
    //   const [showDatePicker, setShowDatePicker] = useState(false);
    //   const [gender, setGender] = useState("Male");
    //   const onChangeDate = (event, selectedDate) => {
    //     //+
    //     const currentDate = selectedDate || date;
    //     setShowDatePicker(false);
    //     setDate(currentDate);
    // };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View
                style={{
                    marginEnd:20,
                    marginStart:20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 38,
                    paddingBottom: 23,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require("../../../../assets/icons/arrow-icon.png")}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
                    My Detail
                </Text>
                <TouchableOpacity>
                    <Image
                        source={require("../../../../assets/icons/bell-icon.png")}
                        style={{ width: 24, height: 24 }}
/>
                </TouchableOpacity>
            </View>
            {/* Body */}
            <InputComponent
                label="First Name"
                value={firstName}
                placeholder={"Please enter your first name"}
                setValue={setFirstName}
                error={firstNameError}
            />

            <InputComponent label="Last Name"
                value={lastName}
                placeholder={"Please enter your first name"}
                setValue={setLastName}
                error={lastNameError}
            />

            <InputComponent
                label="Email"
                value={email}
                placeholder={"Please enter your Email name"}
                setValue={setEmail}
                error={emailError}
            />

            {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input1}
        >
          <Text>{date.toLocaleDateString()}</Text>

          <AntDesign name="calendar" size={24} color="black"></AntDesign>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View> 
       </View> */}
            <InputComponent
                label="Phone"
                value={phone}
                placeholder={"Please enter your phone number"}
                setValue={setPhone}
                error={phoneError}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,

        color: "black",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    input1: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    picker: {
        height: 30,
        color: "black",
        textAlign: "center",
bottom: 10,
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default MyDetail;