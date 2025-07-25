export default function formatNumberIndian(num) {
  const [integer, decimal] = num.toString().split(".");
  const lastThree = integer.slice(-3);
  const otherDigits = integer.slice(0, -3);
  const formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits ? "," : "") + lastThree;
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}
