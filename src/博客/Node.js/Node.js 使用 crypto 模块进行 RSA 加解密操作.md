---
title: node.js 使用crypto模块进行RSA加解密操作
category: Node.js
tags:
  - Node.js
cover: https://cdn.pixabay.com/photo/2020/12/12/16/48/arch-5826002_960_720.jpg
---

多余的话不说了，直接上代码
先在 package.json 配置文件里添加 crypto 模块的支持。

```json
"dependencies": {
  ......
  "crypto":"~1.0.1",
}
```

加密工具类：

注：公钥，私钥怎么生成这里不介绍了，网上很多。

生成后保存成 pem 文件，放到工程目录下引用即可

```js
//加密解密类
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

/**
 * RSA最大加密明文大小
 */
var MAX_ENCRYPT_BLOCK = 117-31;

/**
 * RSA最大解密密文大小
 */
var MAX_DECRYPT_BLOCK = 128;

/**
 * 公钥加密
 * @param data
 * @returns {string}
 */
function publicEncrypt(data) {
    //得到公钥
    var publicPem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_public_key.pem"));//替换你自己的路径
    var publicKey = publicPem.toString();
    //加密信息用buf封装
    var buf = new Buffer(data, "utf-8");
    //buf转byte数组
    var inputLen = buf.byteLength;
    //密文
    var bufs = [];
    //开始长度
    var offSet = 0;
    //结束长度
    var endOffSet = MAX_ENCRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
            var bufTmp = buf.slice(offSet, endOffSet);
            bufs.push(crypto.publicEncrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            var bufTmp = buf.slice(offSet, inputLen);
            bufs.push(crypto.publicEncrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_ENCRYPT_BLOCK;
        endOffSet += MAX_ENCRYPT_BLOCK;
    }
    var result = Buffer.concat(bufs);
    //密文BASE64编码
    var base64Str = result.toString("base64");
    console.log(base64Str);
    return base64Str;
}

/**
 * 公钥解密
 * @param date
 * @returns {string}
 */
function publicDecrypt(date) {

    //得到私钥
    var publicPem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_public_key.pem"));//替换你自己的路径
    var publicKey = publicPem.toString();
    //经过base64编码的密文转成buf
    var buf = new Buffer(date, "base64");

    //buf转byte数组
    //var inputLen = bytes(buf, "base64");
    var inputLen = buf.byteLength;
    //密文
    var bufs = [];
    //开始长度
    var offSet = 0;
    //结束长度
    var endOffSet = MAX_DECRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
            var bufTmp = buf.slice(offSet, endOffSet);
            bufs.push(crypto.publicDecrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            var bufTmp = buf.slice(offSet, inputLen);
            bufs.push(crypto.publicDecrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_DECRYPT_BLOCK;
        endOffSet += MAX_DECRYPT_BLOCK;
    }
    var result = Buffer.concat(bufs).toString();
    console.log(result);
    return result;
}

/**
 * 私钥加密
 * @param date
 * @returns {string}
 */
function privateEncrypt(date) {

    //得到私钥
    var privatePem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_private_key.pem"));
    var privateKey = privatePem.toString();
    //经过base64编码的密文转成buf
    var buf = new Buffer(date, "utf-8");
    //buf转byte数组
    var inputLen = buf.byteLength;
    //密文
    var bufs = [];
    //开始长度
    var offSet = 0;
    //结束长度
    var endOffSet = MAX_ENCRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
            var bufTmp = buf.slice(offSet, endOffSet);
            bufs.push(crypto.privateEncrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            var bufTmp = buf.slice(offSet, inputLen);
            bufs.push(crypto.privateEncrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_ENCRYPT_BLOCK;
        endOffSet += MAX_ENCRYPT_BLOCK;
    }
    var result = Buffer.concat(bufs);
    //密文BASE64编码
    var base64Str = result.toString("base64");
    console.log(base64Str);
    return base64Str;
}

/**
 * 私钥解密
 * @param date
 * @returns {string}
 */
function privateDecrypt(date) {

    //得到私钥
    var privatePem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_private_key.pem"));
    var privateKey = privatePem.toString();
    //经过base64编码的密文转成buf
    var buf = new Buffer(date, "base64");

    //buf转byte数组
    //var inputLen = bytes(buf, "base64");
    var inputLen = buf.byteLength;
    //密文
    var bufs = [];
    //开始长度
    var offSet = 0;
    //结束长度
    var endOffSet = MAX_DECRYPT_BLOCK;
    //分段加密
    while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
            var bufTmp = buf.slice(offSet, endOffSet);
            bufs.push(crypto.privateDecrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        } else {
            var bufTmp = buf.slice(offSet, inputLen);
            bufs.push(crypto.privateDecrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING}, bufTmp));
        }
        offSet += MAX_DECRYPT_BLOCK;
        endOffSet += MAX_DECRYPT_BLOCK;
    }
    var result = Buffer.concat(bufs).toString();
    console.log(result);
    //解密
    return result;
}

module.exports.publicEncrypt = publicEncrypt;
module.exports.publicDecrypt = publicDecrypt;
module.exports.privateEncrypt = privateEncrypt;
module.exports.privateDecrypt = privateDecrypt;
```

使用：

```js
 var str = cryptoUtil.publicEncrypt("123456789");//公钥加密
 var deStr = cryptoUtil.privateDecrypt(str);//私钥解密
```

完。
