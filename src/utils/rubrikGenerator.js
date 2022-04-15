function shuffle(array, isHitBoard = false) {
  const arr = [...array];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return isHitBoard
    ? [[...arr.slice(0, 3)], [...arr.slice(3, 6)], [...arr.slice(6, 9)]]
    : [
        [...arr.slice(0, 5)],
        [...arr.slice(5, 10)],
        [...arr.slice(10, 15)],
        [...arr.slice(15, 20)],
        [...arr.slice(20)],
      ];
}

// Used like so
const array = [
  "#009b48",
  "",
  "#009b48",
  "#009b48",
  "#009b48",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#b71234",
  "#b71234",
  "#b71234",
  "#b71234",
  "#ffd500",
  "#ffd500",
  "#ffd500",
  "#ffd500",
  "#0046ad",
  "#0046ad",
  "#0046ad",
  "#0046ad",
  "#ff5800",
  "#ff5800",
  "#ff5800",
  "#ff5800",
];
export const arr = shuffle(array);
export const hitArr = shuffle(
  array.filter((color) => color !== ""),
  true
);
