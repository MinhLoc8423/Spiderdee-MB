export const formattedDate = (orderDate) => {
    const date = new Date(orderDate);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const year = localDate.getFullYear();
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}`;
};
