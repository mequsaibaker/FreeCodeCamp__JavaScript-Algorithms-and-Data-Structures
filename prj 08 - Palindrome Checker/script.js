const txtInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const palindromeFrorm = document.getElementById("palindrome-form");

const outputResult = document.getElementById("result");
const outputBoldText = document.querySelector(".result em");
const outputIsPalindrome = document.querySelector(".result span");

const showResult = (originalText) => {
  const output = document.createElement("p");
  const boldText = document.createElement("strong");
};

const refineText = (text) => {
  const regex = /[)(\s_.,-/\\]/g;
  return text.replace(regex, "").toLowerCase();
};

// text : refined text
const isPalindrome = (text) => {
  if (text.length === 0 || text.length === 1) {
    return true;
  } else if (text[0] !== text[text.length - 1]) {
    return false;
  }
  return true && isPalindrome(text.slice(1, text.length - 1));
};

const checkPalindrome = () => {
  const text = txtInput.value;
  if (text === "") {
    alert("Please input a value");
  } else {
    outputBoldText.innerText = text;
    txtInput.value = "";
    const refinedText = refineText(text);
    if (isPalindrome(refinedText)) {
      outputIsPalindrome.innerText = " is a palindrome.";
      outputResult.innerText = text + " is a palindrome.";
    } else {
      outputIsPalindrome.innerText = " is not a palindrome.";
      outputResult.innerText = text + " is not a palindrome.";
    }
  }
};

checkBtn.addEventListener("click", checkPalindrome);
palindromeFrorm.addEventListener("submit", (e) => {
  e.preventDefault();
});
