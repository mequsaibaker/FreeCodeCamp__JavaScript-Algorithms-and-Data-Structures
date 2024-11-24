const inputNum = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const output = document.getElementById("results-div");
const form = document.querySelector("form");

const getNumsMatchArr = (num) => {
  return num.match(/[\d]/g);
};

const isLenCorrect = (numsMatch) => {
  return (
    numsMatch.length === 10 || (numsMatch.length === 11 && numsMatch[0] === "1")
  );
};

const isFormatValid = (num, numsMatch) => {
  const regex1 = /^(1 |1|)\([0-9]{3}\)[ ]?[0-9]{3}-[0-9]{4}/;
  const regex2 = /^(1 |1|)[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}/;

  const allRegex = [regex1, regex2];
  return allRegex.reduce((acc, el) => acc || el.test(num.trim()), false);
};

const checkNumber = () => {
  const num = inputNum.value;
  const numsMatch = getNumsMatchArr(num);
  if (!num) {
    alert("Please provide a phone number");
  } else {
    const result = document.createElement("p");
    if (!isLenCorrect(numsMatch) || !isFormatValid(num, numsMatch)) {
      result.textContent = `Invalid US number: ${num}`;
      result.classList.add("error");
    } else {
      result.textContent = `Valid US number: ${num}`;
      result.classList.add("success");
    }
    output.appendChild(result);
  }
};

checkBtn.addEventListener("click", checkNumber);
document.addEventListener("keydown", (e) =>
  e.key === "Enter" ? checkNumber() : null
);
clearBtn.addEventListener("click", () => {
  output.textContent = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
