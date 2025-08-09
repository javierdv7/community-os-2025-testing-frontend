export function calculateDiscount(daysDiff) {
  if (daysDiff > 15) {
    return 30;
  } else if (daysDiff >= 3 && daysDiff <= 15) {
    return 15;
  } else if (daysDiff >= 0 && daysDiff < 3) {
    return 0;
  } else {
    return -1;
  }
}