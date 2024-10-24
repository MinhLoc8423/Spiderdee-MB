export const validateEmail = (email) => {
    const re =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{11}$/;
    return re.test(phoneNumber);
};