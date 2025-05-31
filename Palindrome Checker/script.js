const textInput = document.getElementById('text-input');

const checkBtn = document.getElementById('check-btn');

const result = document.getElementById('result')

const cleanString = (textInput) => {
  const regex = /[\\\/()\s_,.-]/g;
  return textInput.replace(regex, '')
}

const checksOnInput = () => {
  const word = [];
  const reverseWord = [];

  if(textInput.value == "") {
    alert("Please input a value");
    return
  }
  else {
    for(let i=0; i < textInput.value.length; i++) {
      word.push(textInput.value[i])
    }
    for (let i=textInput.value.length - 1; i >= 0; i--) {
      reverseWord.push(textInput.value[i])
    }
    if(cleanString(word.join("").toLowerCase()) === cleanString(reverseWord.join("").toLowerCase())) {
      
      result.innerText = `${textInput.value} is a palindrome`
    }
    else {
      result.innerText = `${textInput.value} is not a palindrome`
    }
  }
}

checkBtn.addEventListener("click", checksOnInput)