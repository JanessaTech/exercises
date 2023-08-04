buf = new Buffer(256);
len = buf.write("Simply Easy Learning");
console.log("Octets written : "+  len);


buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5));


var buf = new Buffer('Simply Easy Learning');
var json = buf.toJSON(buf);

console.log(json);


var buf1 = new Buffer('hello world')
var buf2 = new Buffer('Janessa')
var buf3 = Buffer.concat([buf1, buf2])
console.log('buf3 content:' + buf3.toString())

