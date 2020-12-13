export default function timer(y, m, d, h, mi, s, ms) {
  const expired = new Date(y, m, d, h, mi, s, ms);
  const difference = expired - Date.now();
  console.log(expired);
  let timeLeft = "";
  if (difference > 0) {
    timeLeft += Math.floor(difference / (1000 * 60 * 60 * 24)) + "d : ";
    timeLeft += Math.floor((difference / (1000 * 60 * 60)) % 24) + "h : ";
    timeLeft += Math.floor((difference / 1000 / 60) % 60) + "m : ";
    timeLeft += Math.floor((difference / 1000) % 60) + "s ";
  } else {
    timeLeft = "Đơn đăng ký đợt 2 đã đóng !";
  }
  return timeLeft;
}
