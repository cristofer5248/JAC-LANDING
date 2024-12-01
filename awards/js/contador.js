const remDays = document.getElementById("days");
const remHours = document.getElementById("hours");
const remMinutes = document.getElementById("minutes");
const remSeconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();

const birthDay = `15 Dec ${currentYear}`;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const countdown = () => {
  const birthDayDate = new Date(birthDay);
  const currentDate = new Date();

  const totalSeconds = (birthDayDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  remDays.innerHTML = days;
  remHours.innerHTML = formatTime(hours);
  remMinutes.innerHTML = formatTime(mins);
  remSeconds.innerHTML = formatTime(seconds);
};

// initial call
countdown();

setInterval(countdown, 1000);
