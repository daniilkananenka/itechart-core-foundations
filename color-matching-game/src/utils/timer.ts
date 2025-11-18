function formatSeconds(seconds: number) {
  const minutesPart = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsPart = String(seconds % 60).padStart(2, '0');

  return `${minutesPart}:${secondsPart}`;
}

export { formatSeconds };
