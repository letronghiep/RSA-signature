var p_num = document.querySelector(".p-num");
var q_num = document.querySelector(".q-num");
var n_num = document.querySelectorAll(".n-num");
var e_num = document.querySelector(".e-num");
var d_num = document.querySelector(".d-num");
var generate_key = document.querySelector(".generate-key");
var reset_key = document.querySelector(".reset-key");
var form = document.querySelectorAll("form");
var openEye = document.querySelector(".open");
var closeEye = document.querySelector(".close");
var parent_text = document.querySelector(".parent-text")
var parent_check = document.querySelector(".parent-check")
var file_sign = document.querySelector("#file-sign"); 
//const spanKy = divKy.querySelector("span");
var random_prime_btn = document.querySelector(".random-prime")
//  ky
var textInput = document.querySelector(".text-input");
var textInputHidden = document.querySelector(".text-input-hidden");
var signBtn = document.querySelector(".sign-btn");
var hashText = document.querySelector("#hash-text");
var textContent = document.querySelector(".text-content-check");
var textCheckHidden = document.querySelector(".text-check-hidden");
// move
var textCheck = document.querySelector("#text-check");
var textSignCheck = document.querySelector("#text-sign-check");
var moveBtn = document.querySelector(".move-btn");
var checkSignBtn = document.querySelector(".check-sign-btn");
// Check chu ky
var notifiCheck = document.querySelector(".notifi-check")
form.forEach(item => item.onsubmit = (e) => {
  e.preventDefault()
})
// doc file
var saveSignature = document.querySelector(".save-signature")
var showGeneKey = document.querySelector(".show-gene-key")
var showFileCheck = document.querySelector(".show-file-check")
var showKeyCheck = document.querySelector(".show-key-check")

// Download file
// function download(file, text) {
//   var element = document.createElement('a');
//   element.setAttribute(
//       'href',
//       'data:text/plain;charset=utf-8, ' + encodeURIComponent(text),
//   );
//   element.setAttribute('download', file);
//   document.body.appendChild(element);
//   element.click();
//   document.body.removeChild(element);
// }




// Check so nguyen to
const isPrime = (n) =>{
    if(n<2) return 0;
    for(var i = 2; i<=Math.sqrt(n); i++){
        if(n%i===0) return false;
    }
    return true;
}
// Random so nguyen to
const sieveOfEratosthenes = (limit) => {
  const sieve = [];
  for(var i = 0; i <= limit; i++) {
    sieve.push(true);
  }
  for(var i = 2; i * i <= limit; i++) {
    if(sieve[i]) {
      for(var j = i*i; j <=limit; j+=i) {
        sieve[j] = false;
      }
    }
  } 

  const primes = [];
  for(var i = 2; i<=limit; i++) {
    if(sieve[i]) primes.push(i)
  }
  return primes;
}

const randomPrimePQ = () => {
  const arr = sieveOfEratosthenes(100)
  const p = randomE(arr);
  const q = randomE(arr);
  if(p !== q){
    p_num.value = p;
    q_num.value = q

  }
}
// random e
const randomE = (arr) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    return arr[randomIdx];
}

// Check gcd
const check_gcd = (a, b) => {
    if(a === 0) return b;
    if(b === 0) return a;
    return check_gcd(b, a%b);
}
// Oclid mo rong
const euclidExtended = (b, phi_n) => {
    if(check_gcd(b, phi_n) !== 1) return;
    var m0 = phi_n;
    var y = 0, x = 1;
    if (phi_n === 1) {
        return 0;
    }
    while (b > 1) {
        var q = Math.floor(b / phi_n);
        var t = phi_n;
        phi_n = b % phi_n;
        b = t;
        t = y;
        y = x - q * y;
        x = t;
    }
    if (x < 0) {
        x += m0;
    }
    return x;
}
// // Ham bam
// const hashFunc = (message) => {
//   var hash = 0;
//   for(var i = 0; i< message.length; i++) {
//     hash = (hash << 5) + message.charCodeAt(i);
//     hash = hash & hash;
//   }
//   return hash;
// }
// console.log(hashFunc("dung"));
// Chuyen sang nhi phan
const toBinary = n => {
  if (n === 0) {
    return '0';
  }
  
  var binary = '';
  while (n > 0) {
    binary = (n % 2) + binary;
    n = Math.floor(n / 2);
  }
  
  return binary;
};

function powerMod(base, exponent, modulus) {
  if (exponent === 0n) {
    return 1n;
  }

  var result = 1n;
  var baseValue = BigInt(base) % BigInt(modulus);
  var exp = BigInt(exponent);

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * baseValue) % BigInt(modulus);
    }

    baseValue = (baseValue * baseValue) % BigInt(modulus);
    exp = exp / 2n;
  }
  if (result < 0n) {
    result = (result + BigInt(modulus)) % BigInt(modulus);
  }
  return result;
}
console.log(powerMod(3, 2, 10));
// Tao khoa
const generateKey = () => {
    const p = parseInt(p_num.value), q = parseInt(q_num.value);
    if (!isPrime(p) || !isPrime(q)) {
        alert("Nhap 2 so nguyen to");
        p_num.value = "";
        q_num.value = ""
        return;
    }
    const n = p*q;;
    const phi_n = (p - 1)*(q - 1);
    const array = [];
    for(var i = 1; i < phi_n; i++){
        if(isPrime(i) && check_gcd(i, phi_n) === 1) array.push(i);
    }
    n_num.forEach(item => item.value = n);
    const eRandom = randomE(array);
      e_num.value = eRandom;
    // Tim d
    const euclid = euclidExtended(eRandom, phi_n);
    // if(euclid === undefined) return -1;
    d_num.value = euclid;
}
// Reset khoa

const resetField = () => {
    p_num.value = "";
    q_num.value = "";
    n_num.forEach(item => item.value = "");
    e_num.value = "";
    d_num.value = "";
}
const showKey = () => {
  openEye.classList.add("hidden");
  closeEye.classList.remove("hidden");
  d_num.setAttribute('type', 'text');
  
}
const hideKey = () => {
  closeEye.classList.add("hidden");
  openEye.classList.remove("hidden");
  d_num.setAttribute('type', 'password');

}
// MD5
function hexToDecimal(hexString) {
  var decimalString = '';
  // var n = n_num[0].value;
  // var d = d_num.value
  for (var i = 0; i < hexString.length; i++) {
    const hexChar = hexString[i];
    const decimalValue = parseInt(hexChar, 16);
    decimalString = decimalString + decimalValue + "-"
  }
  const resultString = decimalString.slice(0, decimalString.length - 1);
  return resultString.trim();
}
// decimal to hex
function decimalToHex(decimalNumber) {
  const hexString = decimalNumber.toString(16);
  return hexString;
}
const getMD5 =  (inputString) => {
   // Chuỗi cần tính toán giá trị băm MD5
  //  if(!textInput.value ) return;//&& !spanKy.textContent
   // Tính toán giá trị băm MD5
 const md5Hash =  CryptoJS.MD5(inputString);
 // Chuyển đổi giá trị băm thành chuỗi thập lục phân
 const md5Value = md5Hash.toString(CryptoJS.enc.Hex);
  return md5Value
}

// ham ky

  // const calculateSignature = (message, n ,d) => {
  //     const hashMessage = hashFunc(message);
  //     var signature = powerMod(hashMessage, d, n);
  //     console.log("calSig", signature);
  //     return signature;
  // }
const verifiedSignature = () => {
  var inputString = textCheck.value  || textCheckHidden.value
  const arrSignature = textSignCheck.value.split("-");
  console.log('====================================');
  console.log('arrSignature', arrSignature);
  console.log('====================================');
  console.log(textCheck.value);
  const hashCheck  = getMD5(inputString);
  const newArrSign = arrSignature.map(item => {
   return powerMod(parseInt(item), parseInt(e_num.value), parseInt(n_num[0].value))
  });
  console.log('====================================');
  console.log("new arr sign" , newArrSign);
  console.log('====================================');
  const checkHash = newArrSign.map(item => decimalToHex(item));
  console.log('====================================');
  console.log(checkHash);
  console.log('====================================');
  const checkHashVerify = checkHash.join("")
  console.log("hashCheck", hashCheck);
  console.log("checkHash", checkHashVerify);
  const check = hashCheck === checkHashVerify;
  console.log('====================================');
  console.log(check);
  console.log('====================================');
  if(check) {
    notifiCheck.value = "Chữ ký đúng"
  }else {
    notifiCheck.value = "Chữ ký sai"
  }

}


// verifiedSignature()
const signatureContent =  () => {
  var inputString = textInput.value || textInputHidden.value;
  console.log('====================================');
  console.log("inputString", inputString);
  console.log('====================================');
  const md5Value = getMD5(inputString);
  console.log('====================================');
  console.log(md5Value);
  console.log('====================================');
//   if(!textInput.value ) return //&& !spanKy.textContent
  const result = hexToDecimal(md5Value);
  console.log("result", result);
  hashText.value = md5Value;
  const test =  result.split("-").map(item => {
   return  powerMod(parseInt(item), parseInt(d_num.value), parseInt(n_num[0].value))
  });
  const textSignResult = test.join("-")
  textContent.value = textSignResult;
};

// Chuyen van ban ky
const  moveTextSign = () => {
//   if(!textInput.value ||     !textContent.value) return
 textCheck.value = textInput.value //|| spanKy.textContent
 textCheckHidden.value = textInputHidden.value;

 textSignCheck.value = textContent.value  //|| spanKy.textContent;
 var div = parent_text;
 if(!parent_check) textCheck.parentNode.appendChild(parent_check)
 parent_check.parentNode.appendChild(div)
}


// CLear text sign
const clearTextSign = () => {
  textInput.value = "";
  textInputHidden.value = ""
  hashText.value = "";
  textContent.value = ""
  file_sign.value = null
  // spanKy.textContent = ""
  
  textInput.style  = "unset"
  parent_text.textContent = null//

}
const clearCheckSign = () =>{
  textCheck.value = "";
  textSignCheck.value = "";
  textCheckHidden.value = "";
  notifiCheck.value = "";
  parent_check.textContent = null
}
// Read file
function showFile(input, textValue, textContent, parentNode) {
  var file = input.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    const content = this.result;
    input.value = null;
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension === 'docx') {
      var zip = new JSZip();
      zip.loadAsync(this.result)
        .then(function (zip) {
          return zip.file('word/document.xml').async("string");
        })
        .then(function (contentXml) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(contentXml, "text/xml");
          var textNodes = xmlDoc.getElementsByTagName('w:t');
          let text = "";
          var div = document.createElement('div')

          for (var i = 0; i < textNodes.length; i++) {
              var textNode = textNodes[i];
              var runNode = textNode.parentNode;
              console.log('====================================');
              console.log(runNode);
              console.log('====================================');
            var textContent = textNode.textContent;
            // Kiểm tra thuộc tính w:color và gán màu chữ
            var runProperties = runNode.getElementsByTagName('w:rPr')[0];
            console.log('====================================');
            console.log("Run properties: " , runProperties);
            console.log('====================================');
            var isBold = runProperties?.getElementsByTagName('w:b')[0]?.getAttribute('w:val');

            var colorAttr = runProperties?.getElementsByTagName('w:color')[0]?.getAttribute('w:val');
            var shadingAttr = runProperties?.getElementsByTagName('w:shd')[0]?.getAttribute('w:fill');
            var fontSize = runProperties?.getElementsByTagName('w:sz')[0]?.getAttribute('w:val');
            // Thực hiện xử lý tùy thuộc vào các thuộc tính đã lấy được
            var textColor = colorAttr ? `#${colorAttr}` : ""; // Màu chữ (nếu có)
            var bgText = shadingAttr ? `#${shadingAttr}` : "white";
            var fontWeight = isBold ? 'normal' : 'bold'; // Độ đậm của font chữ
            var vertAlign = runProperties?.getElementsByTagName('w:vertAlign')[0]?.getAttribute('w:val');
            // Tiếp tục xử lý các thuộc tính định dạng khác (như font, kích thước,...)
            // Ghi nội dung văn bản vào biến text
            text += textContent;
            if(vertAlign === 'baseline' || !vertAlign) {
                const span = document.createElement('span');
                const textBaseLine = runProperties.parentNode?.getElementsByTagName('w:t')[0]?.textContent;
                span.textContent = textBaseLine;
                span.style.color = `#${runProperties?.getElementsByTagName('w:color')[0]?.getAttribute('w:val')}`
                span.style.backgroundColor = `${runProperties?.getElementsByTagName('w:highlight')[0]?.getAttribute('w:val')}`
                span.style.fontSize = `${runProperties?.getElementsByTagName('w:sz')[0]?.getAttribute('w:val')}px`
                div.appendChild(span);
            }else if(vertAlign === 'superscript') {
                const sup = document.createElement('sup')
                const textVertAlign = runProperties.parentNode?.getElementsByTagName('w:t')[0]?.textContent;
               
                sup.textContent = textVertAlign;
                sup.style.color = `#${runProperties?.getElementsByTagName('w:color')[0]?.getAttribute('w:val')}`
                sup.style.backgroundColor = `${runProperties?.getElementsByTagName('w:highlight')[0]?.getAttribute('w:val')}`
                sup.style.fontSize = `${runProperties?.getElementsByTagName('w:sz')[0]?.getAttribute('w:val')}px`
            //    sup.style.color = 
               div.appendChild(sup) 
               // superScript.push(textVertAlign) 
            } else if(vertAlign === 'subscript') {
              const sub = document.createElement('sub');
              const textVertAlign = runProperties.parentNode?.getElementsByTagName('w:t')[0]?.textContent;
              sub.textContent = textVertAlign;
              sub.style.color = `#${runProperties?.getElementsByTagName('w:color')[0]?.getAttribute('w:val')}`
              sub.style.backgroundColor = `${runProperties?.getElementsByTagName('w:highlight')[0]?.getAttribute('w:val')}`
              sub.style.fontSize = `${runProperties?.getElementsByTagName('w:sz')[0]?.getAttribute('w:val')}px`;
              div.appendChild(sub)
            }
          }
          parentNode.appendChild(div);
          textValue.value  = text;
          console.log('====================================');
          console.log("TextValue", textValue.value);
          console.log('====================================');
        //   textValue.value = text
        //   textValue.style.color = textColor;
        //   textValue.style.fontSize = fontSize*3/4 + 'px';
        //   textValue.style.fontWeight = fontWeight;
        //   textValue.style.backgroundColor =  bgText
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if(extension === 'txt') {
      const enc = new TextDecoder("utf-8");
      const text = enc.decode(content);
      textContent.value = text;
      // textCheck.value = text;
    }
});
  reader.readAsArrayBuffer(file);
}
const downloadFile = () => {
  if(!textContent.value) {
    alert("Text content is missing");
          return;

  }
  const link = document.createElement("a");
  const file = new Blob([textContent.value], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = "sample.txt";
  link.click();
  URL.revokeObjectURL(link.href);
};
openEye.addEventListener("click", showKey)
closeEye.addEventListener("click", hideKey)
generate_key.addEventListener('click', generateKey);
reset_key.addEventListener("click", resetField);
signBtn.addEventListener("click",signatureContent);
moveBtn.addEventListener("click",moveTextSign);
checkSignBtn.addEventListener("click", verifiedSignature); //checkVerification
saveSignature.addEventListener("click",downloadFile );
random_prime_btn.addEventListener("click", randomPrimePQ);
showGeneKey.addEventListener("change", function() {
      showFile(this, textInputHidden, textInput, parent_text);
  
})
showFileCheck.addEventListener("change", function() {
    showFile(this, textCheckHidden, textCheck, parent_check);

});
showKeyCheck.addEventListener("change", function() {
  showFile(this, null, textSignCheck, null);

})