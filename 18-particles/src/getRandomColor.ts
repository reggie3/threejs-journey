function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random value between 0 and 255 for red
  const g = Math.floor(Math.random() * 256); // Random value between 0 and 255 for green
  const b = Math.floor(Math.random() * 256); // Random value between 0 and 255 for blue

  return { rgb: `rgb(${r},${g},${b})`, ints: [r / 256, g / 256, b / 256] };
}

export default getRandomColor;
