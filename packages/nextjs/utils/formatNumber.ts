export const formatNumber = (number: number) => {
  if (typeof number === "number") {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "";
  }
};
