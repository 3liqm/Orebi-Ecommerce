// Function to format a price using the Intl.NumberFormat API.
// Takes a numeric price value as input and returns a formatted string.
export const formatPrice = (price) => {
    // Create a new Intl.NumberFormat instance for US English.
    // This allows formatting the price as currency using the 'USD' currency code.
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
};
