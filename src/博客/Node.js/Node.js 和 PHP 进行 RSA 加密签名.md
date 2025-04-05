---
title: Nodejs和PHP进行RSA加密签名
category: Node.js
tags:
  - Node.js
cover: https://cdn.pixabay.com/photo/2020/12/16/12/05/horse-5836459_960_720.jpg
---


## 1.转换 PHP 给的 pem 格式

getKey.js

```js
/**
 * 1.密钥格式通常有两种，分别是pkcs1和pkcs8，pkcs代表Public Key Cryptography Standards
 * 2. pkcs1格式开头BEGIN RSA PRIVATE KEY  pkcs8格式 开头BEGIN PRIVATE KEY  中间是BASE64 ENCODED DATA
 * 3.phpseclib 生成的密钥对中，公钥使用的是 pkcs8 格式，私钥使用 pkcs1 格式，但文档中对它们的描述都是 pkcs1 格式
<? php

//转换publickey格式
 function getPublicKey()
  // 系统公钥
  $publickey = 'LKDKFJIDOWEIRLKLDSJKJFDLK';
  $key = trim(publickey);
  if (!$key) throw new \Exception('publickkey not found');
  $key = preg_replace('#^-----[^-]+-----|-----[^-]+-----$|\s|\r|\n#', "", $key);
  $chunk = str_split($key, 64);
  $key = "-----BEGIN PUBLIC KEY-----\n".join("\n", $chunk)."\n-----END PUBLIC KEY-----";
  echo ("<script>console.log(" . json_encode($key) . ");</script>");
  return openssl_get_publickey($key);
}

//转换privatekey格式
 function getPrivateKey() {
  // 私钥
  $privatekey = 'WLEKOWQKFJDSSHFIHDFD';
  $key = trim( privatekey);
  if (!$key) throw new \Exception('privatekey not found');
  $key = preg_replace('#^-----[^-]+-----|-----[^-]+-----$|\s|\r|\n#', "", $key);
  $chunk = str_split($key, 64);
  $pad = strlen(end($chunk)) % 4;
  if ($pad > 2) {
    $pad = 4 - $pad;
  }
  $key = "-----BEGIN PRIVATE KEY-----\n".join("\n", $chunk).str_repeat('=', $pad)."\n-----END PRIVATE KEY-----";
  echo ("<script>console.log(" . json_encode($key) . ");</script>");
  return openssl_get_privatekey($key);
}
 */

function insertStr(str, insertStr, sn) {
  var newstr = '';
  for (var i = 0; i < str.length; i += sn) {
    var tmp = str.substring(i, i + sn);
    newstr += tmp + insertStr;
  }
  return newstr;
}
/**
 *生成格式化RSA PKCS#8格式的私钥
 * @param {string} key  私钥字符串
 * @return {string}  返回PKCS8格式的RSA私钥
 */
const getPrivateKey = function (key) {
  let arr = []
  for (var i = 0; i < key.length; i += 64) { arr.push(key.substring(i, i + 64)) }
  let endStr = arr.pop()
  let pend = endStr.length % 4
  pend = pend > 2 ? 4-pend : pend
  arr.push(endStr += '='.repeat(pend))
  return '-----BEGIN PRIVATE KEY-----\n' + arr.join('\n') + '\n-----END PRIVATE KEY-----';
};
/**
 *生成格式化RSA PKCS#8格式的公钥
 * @param {string} key 公钥字符串
 * @return {string}  返回PKCS8格式的RSA公钥
 */
const getPublicKey = function (key) {
  const result = insertStr(key, '\n', 64);
  return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
//存入文件
// const { writeFileSync } = require('fs')
// const key = require('../config/keys');
// let domain = 'zzjtnb'
// writeFileSync(`public/pem/${domain}/private.pem`, getPrivateKey(key[domain].private_key))
// writeFileSync(`public/pem/${domain}/public.pem`, getPublicKey(key[domain].public_key))
module.exports = {
  getPrivateKey, getPublicKey
};

```

## 2.加密签名

encrypt.js

```js
/**
 * 对应PHP的签名加密
 * 1.将接口的参数转成jsonstr
 * 2.以系统公钥对jsonstr进行加密
 * 3.以客户端私钥对jsonstr进行签名
<? php
include('config.php');// include clientprivatekey, systempublickey, apikey
//签名
openssl_sign($jsonstr, $signature, $clientprivatekey);
$postdata['sign'] = base64_encode($signature);
//加密
$chunk = str_split($jsonstr, 117);
$output = '';
foreach($chunk as $str){
if (!openssl_public_encrypt($str, $crypted, $systempublickey))
throw new Exception('encrypt err');
$output.= $crypted;
}
$postdata['data'] = base64_encode($output);
echo "请求的资料: ".http_build_query($postdata);
*/

const crypto = require('crypto');
/**
 * 创建签名（使用私钥和数据）
 * @param data
 * @param privateKey
 * @returns {string}
 */
function createSign(data, privateKey) {
  // 'RSA-SHA1'--签名算法的名称
  const signer = crypto.createSign('RSA-SHA1');
  signer.update(data);
  signer.end();
  return signer.sign(privateKey, 'base64')
}
/**
 * 加密数据（使用公钥和数据）
 * @param {string} data
 * @param {string} publicKey
 * @returns {string}
 */

function publicEncrypt(data, publicKey) {
  const MAX_ENCRYPT_BLOCK = 117;
  //得到公钥
  // var publicPem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_public_key.pem"));//替换你自己的路径
  // var publicKey = publicPem.toString();
  var bufferToEncrypt = Buffer.from(data, 'utf8'); //加密信息用bufferToEncrypt封装
  var inputLen = bufferToEncrypt.byteLength;
  var bufs = []; //密文
  var offSet = 0;  //开始长度
  var endOffSet = MAX_ENCRYPT_BLOCK;  //结束长度
  //分段加密
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
      var bufTmp = bufferToEncrypt.slice(offSet, endOffSet);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      var bufTmp = bufferToEncrypt.slice(offSet, inputLen);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_ENCRYPT_BLOCK;
    endOffSet += MAX_ENCRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  const base64Str = result.toString("base64");  //密文BASE64编码
  return base64Str;
}

// 下面这种报错 Error: error:0406D06E:rsa routines:RSA_padding_add_PKCS1_type_2:data too large for key size
// function publicEncrypt(data, publicKey) {
//   var bufferToEncrypt = Buffer.from(data);
//   var encrypted = crypto.publicEncrypt({ "key": publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufferToEncrypt).toString("base64")
//   return encrypted
// }
module.exports = {
  createSign, publicEncrypt
};

```
