export const validateEmail = (email: string): boolean => {
    const re =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};


export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const re = /^\d{11}$/;
    return re.test(phoneNumber);
};