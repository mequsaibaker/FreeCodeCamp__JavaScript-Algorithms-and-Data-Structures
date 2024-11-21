const numInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");
const form = document.querySelector("form");

const convertToRomanNum = (num) => {
  if (num >= 1000) {
    return "M" + convertToRomanNum(num - 1000);
  }
  if (num >= 900) {
    return "CM" + convertToRomanNum(num - 900);
  }
  if (num >= 500) {
    return "D" + convertToRomanNum(num - 500);
  }
  if (num >= 400) {
    return "CD" + convertToRomanNum(num - 400);
  }
  if (num >= 100) {
    return "C" + convertToRomanNum(num - 100);
  }
  if (num >= 90) {
    return "XC" + convertToRomanNum(num - 90);
  }
  if (num >= 50) {
    return "L" + convertToRomanNum(num - 50);
  }
  if (num >= 40) {
    return "XL" + convertToRomanNum(num - 40);
  }
  if (num >= 10) {
    return "X" + convertToRomanNum(num - 10);
  }
  if (num >= 9) {
    return "IX" + convertToRomanNum(num - 9);
  }
  if (num >= 5) {
    return "V" + convertToRomanNum(num - 5);
  }
  if (num >= 4) {
    return "IV" + convertToRomanNum(num - 4);
  }
  if (num >= 1) {
    return "I" + convertToRomanNum(num - 1);
  }
  return "";
};

const isValidNumInput = (numString) => {
  const regex = /[e]/g;
  return numString.search(regex) === -1;
};

const showResult = () => {
  const inputText = numInput.value;
  const num = parseInt(inputText);
  result.classList.remove("hidden");
  if (!inputText || isNaN(num) || !isValidNumInput(inputText)) {
    result.textContent = "Please enter a valid number";
    result.classList.add("error");
    result.classList.remove("success");
  } else {
    if (num < 1) {
      result.textContent = "Please enter a number greater than or equal to 1";
      result.classList.add("error");
      result.classList.remove("success");
    } else if (num > 3999) {
      result.textContent = "Please enter a number less than or equal to 3999";
      result.classList.add("error");
      result.classList.remove("success");
    } else {
      result.textContent = convertToRomanNum(num);
      result.classList.add("success");
      result.classList.remove("error");
    }
  }
};

convertBtn.addEventListener("click", showResult);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showResult();
});
