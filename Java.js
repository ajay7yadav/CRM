// Input: "I love dogs"
// Output: love

// let str = "I love dogs";
//  let str1 = "fun&!! time"
// let arr  = [];
// let s = '';
// for(let i=0; i<str1.length; i++){
//     if(str1[i] == ' '){
//         arr.push(s);
//     }
//     else{
//         s += str1[i];
//     }
// }

// console.log(arr);
// function LongestWord(sen) {
//     sen = sen.split(" ");
//     var longst = sen[0];
   
//     for (i = 0; i < sen.length; i++) {
//       if (i == sen.length - 1) {
//         return longst;
//       } else if (sen[i].length >= sen[i + 1].length) {
//         longst = sen[i];
//       } else {
//           longst = sen[i + 1];
//       }
//     }
//     console.log(longst);
// }
function LongestWord(sen) { 
    let aa = sen.match(/[A-z]+/g).sort((a,b)=>a.length-b.length)
    let max = 0;
    let idx = 0;
    for(let i=0; i<aa.length; i++){
        if(aa[i].length > max){
            max = aa[i].length;
            idx = i;
        }
    }
    console.log(max);
    console.log(aa[idx]);
  }
//console.log(LongestWord(str1));

// function(a,b){
//     return b.length-a.length;
// }

// Input: "aabbcde"
// Output: 2a2b1c1d1e

let mp = new Map();
let str = "aabbcde";
function encode(code) {
    // if (!code) return '';
    // let encode = '';
    // code = code.split('').sort();

    // for (let i = 0; i < code.length; i++) {
    //   let count = 1;
    //   for (let j = i; j < code.length; j++) {
    //     if (code[i] !== code[j+1]) break;
    //     count++;
    //     i++;
    //   }
    //   encode += count === 1 ? code[i] : count + code[i];
    // }

    // return encode
    let n = str.length;
    let res = '';
        for (let i = 0; i < n; i++)
        {
            let count = 1;
            while (i < n - 1 && str[i] == str[i+1])
            {
                count++;
                i++;
            }
            res += count+str[i];
            console.log(str[i]);
            console.log(count);
        }
        return res;
  }
  console.log(encode(str));
// for(let i=0; i<str.length; i++){
//     if(mp.has(str[i])){
//         mp.set(str[i],mp.get(str[i],1+1))
//     }
//     else{
//         mp.set(str[i],1)
//     }
// }

// console.log(mp);



/**
 * Have the function StringChallenge(str) take the str parameter being passed and return a compressed version of the string using the Run-length encoding algorithm. This algorithm works by taking the occurrence of each repeating character and outputting that number along with a single character of the repeating sequence. For example: "wwwggopp" would return 3w2g1o2p. The string will not contain any numbers, punctuation, or symbols.
Once your function is working, take the final output string and remove any characters (case-insensitive) from it that appear in your ChallengeToken. If the new final string is empty, return the string EMPTY.

Your ChallengeToken: 60pq497a
Examples
Input: "aabbcde"
Output: 2a2b1c1d1e
Final Output: 22b1c1d1e


Input: "wwwbbbw"
Output: 3w3b1w
Final Output: 3w3b1w
 * 
 */