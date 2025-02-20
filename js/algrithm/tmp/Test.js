const str = 'abc'
for (let i = 0; i < str.length; i++) {
  console.log(str.charCodeAt(i) - 'a'.charCodeAt(0))
}