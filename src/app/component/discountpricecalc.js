export default function getDiscountedPrice(percentage, price) {
    const discount = (percentage / 100) * price;
    const discountedPrice = price - discount;
    return discountedPrice;
     // return discountedPrice.toFixed(2);
  }