function showList(list) {
  if (list && list.length === 0) {
    return "The list is empty";
  }

  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    console.log("🚀 ~ file: ej-103.js:8 ~ showList ~ element:", element);
  }

  return `The list has ${list.length} elements`;
}

const languages = ["C", "Js", "C++", "Python", "Java"];
const laguagesEmpty = [];
console.log("🚀 ~ file: ej-103.js:15 ~ languages:", showList(languages));
console.log(
  "🚀 ~ file: ej-103.js:16 ~ laguagesEmpty:",
  showList(laguagesEmpty)
);
console.log("🚀 ~ file: ej-103.js:16 ~ laguagesEmpty:", showList());
