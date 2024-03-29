__shimport__.define('bench/samples/rollup.js', ['util', 'path', 'fs', 'crypto', 'module', 'events'], function(__import, __exports, util, path, __dep_2, crypto, module$1, __dep_5){ /*
	Rollup.js v0.65.0
	Sat, 25 Aug 2018 13:41:58 GMT - commit 903516a760ce02804e7c5e4578ddce56e6f6bd17


	https://github.com/rollup/rollup

	Released under the MIT License.
*/
util = util.default; /*import util from 'util'*/;
var relative = path.relative; var basename = path.basename; var extname = path.extname; var dirname = path.dirname; var resolve = path.resolve; var sep = path.sep; path = path.default; /*import path, { relative, basename, extname, dirname, resolve, sep } from 'path'*/;
var readdirSync = __dep_2.readdirSync; var mkdirSync = __dep_2.mkdirSync; var writeFile = __dep_2.writeFile; var statSync = __dep_2.statSync; var watch = __dep_2.watch; var readFileSync = __dep_2.readFileSync; var lstatSync = __dep_2.lstatSync; var realpathSync = __dep_2.realpathSync; /*import { readdirSync, mkdirSync, writeFile, statSync, watch, readFileSync, lstatSync, realpathSync } from 'fs'*/;
crypto = crypto.default; /*import crypto from 'crypto'*/;
module$1 = module$1.default; /*import module$1 from 'module'*/;
var EventEmitter = __dep_5.EventEmitter; /*import { EventEmitter } from 'events'*/;

var minimalisticAssert = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util$$1 = util;
  if (typeof util$$1.inherits !== 'function') throw '';
  module.exports = util$$1.inherits;
} catch (e) {
  module.exports = inherits_browser;
}
});

var inherits_1 = inherits;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
var toArray_1 = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
var toHex_1 = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
var htonl_1 = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
var toHex32_1 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
var zero2_1 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
var zero8_1 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  minimalisticAssert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
var join32_1 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
var split32_1 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
var rotr32_1 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
var rotl32_1 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
var sum32_1 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
var sum32_3_1 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
var sum32_4_1 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
var sum32_5_1 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
var sum64_1 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
var sum64_hi_1 = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
var sum64_lo_1 = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
var sum64_4_hi_1 = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
var sum64_4_lo_1 = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
var sum64_5_hi_1 = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
var sum64_5_lo_1 = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
var rotr64_hi_1 = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
var rotr64_lo_1 = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
var shr64_hi_1 = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
var shr64_lo_1 = shr64_lo;

var utils = {
	inherits: inherits_1,
	toArray: toArray_1,
	toHex: toHex_1,
	htonl: htonl_1,
	toHex32: toHex32_1,
	zero2: zero2_1,
	zero8: zero8_1,
	join32: join32_1,
	split32: split32_1,
	rotr32: rotr32_1,
	rotl32: rotl32_1,
	sum32: sum32_1,
	sum32_3: sum32_3_1,
	sum32_4: sum32_4_1,
	sum32_5: sum32_5_1,
	sum64: sum64_1,
	sum64_hi: sum64_hi_1,
	sum64_lo: sum64_lo_1,
	sum64_4_hi: sum64_4_hi_1,
	sum64_4_lo: sum64_4_lo_1,
	sum64_5_hi: sum64_5_hi_1,
	sum64_5_lo: sum64_5_lo_1,
	rotr64_hi: rotr64_hi_1,
	rotr64_lo: rotr64_lo_1,
	shr64_hi: shr64_hi_1,
	shr64_lo: shr64_lo_1
};

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
var BlockHash_1 = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  minimalisticAssert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};

var common = {
	BlockHash: BlockHash_1
};

var rotr32$1 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
var ft_1_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
var ch32_1 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
var maj32_1 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
var p32_1 = p32;

function s0_256(x) {
  return rotr32$1(x, 2) ^ rotr32$1(x, 13) ^ rotr32$1(x, 22);
}
var s0_256_1 = s0_256;

function s1_256(x) {
  return rotr32$1(x, 6) ^ rotr32$1(x, 11) ^ rotr32$1(x, 25);
}
var s1_256_1 = s1_256;

function g0_256(x) {
  return rotr32$1(x, 7) ^ rotr32$1(x, 18) ^ (x >>> 3);
}
var g0_256_1 = g0_256;

function g1_256(x) {
  return rotr32$1(x, 17) ^ rotr32$1(x, 19) ^ (x >>> 10);
}
var g1_256_1 = g1_256;

var common$1 = {
	ft_1: ft_1_1,
	ch32: ch32_1,
	maj32: maj32_1,
	p32: p32_1,
	s0_256: s0_256_1,
	s1_256: s1_256_1,
	g0_256: g0_256_1,
	g1_256: g1_256_1
};

var sum32$1 = utils.sum32;
var sum32_4$1 = utils.sum32_4;
var sum32_5$1 = utils.sum32_5;
var ch32$1 = common$1.ch32;
var maj32$1 = common$1.maj32;
var s0_256$1 = common$1.s0_256;
var s1_256$1 = common$1.s1_256;
var g0_256$1 = common$1.g0_256;
var g1_256$1 = common$1.g1_256;

var BlockHash$1 = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash$1.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash$1);
var _256 = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$1(g1_256$1(W[i - 2]), W[i - 7], g0_256$1(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  minimalisticAssert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5$1(h, s1_256$1(e), ch32$1(e, f, g), this.k[i], W[i]);
    var T2 = sum32$1(s0_256$1(a), maj32$1(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32$1(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$1(T1, T2);
  }

  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
  this.h[5] = sum32$1(this.h[5], f);
  this.h[6] = sum32$1(this.h[6], g);
  this.h[7] = sum32$1(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

var charToInteger = {};
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
for (var i = 0; i < chars.length; i++) {
    charToInteger[chars.charCodeAt(i)] = i;
}
function decode(mappings) {
    var generatedCodeColumn = 0; // first field
    var sourceFileIndex = 0; // second field
    var sourceCodeLine = 0; // third field
    var sourceCodeColumn = 0; // fourth field
    var nameIndex = 0; // fifth field
    var decoded = [];
    var line = [];
    var segment = [];
    for (var i = 0, j = 0, shift = 0, value = 0; i < mappings.length; i++) {
        var c = mappings.charCodeAt(i);
        if (c === 44) {
            if (segment.length)
                line.push(segment);
            segment = [];
            j = 0;
        }
        else if (c === 59) {
            if (segment.length)
                line.push(segment);
            segment = [];
            j = 0;
            decoded.push(line);
            line = [];
            generatedCodeColumn = 0;
        }
        else {
            var integer = charToInteger[c];
            if (integer === undefined) {
                throw new Error('Invalid character (' + String.fromCharCode(c) + ')');
            }
            var hasContinuationBit = integer & 32;
            integer &= 31;
            value += integer << shift;
            if (hasContinuationBit) {
                shift += 5;
            }
            else {
                var shouldNegate = value & 1;
                value >>= 1;
                var num = shouldNegate ? -value : value;
                if (j == 0) {
                    generatedCodeColumn += num;
                    segment.push(generatedCodeColumn);
                }
                else if (j === 1) {
                    sourceFileIndex += num;
                    segment.push(sourceFileIndex);
                }
                else if (j === 2) {
                    sourceCodeLine += num;
                    segment.push(sourceCodeLine);
                }
                else if (j === 3) {
                    sourceCodeColumn += num;
                    segment.push(sourceCodeColumn);
                }
                else if (j === 4) {
                    nameIndex += num;
                    segment.push(nameIndex);
                }
                j++;
                value = shift = 0; // reset
            }
        }
    }
    if (segment.length)
        line.push(segment);
    decoded.push(line);
    return decoded;
}
function encode(decoded) {
    var sourceFileIndex = 0; // second field
    var sourceCodeLine = 0; // third field
    var sourceCodeColumn = 0; // fourth field
    var nameIndex = 0; // fifth field
    var mappings = '';
    for (var i = 0; i < decoded.length; i++) {
        var line = decoded[i];
        if (i > 0)
            mappings += ';';
        if (line.length === 0)
            continue;
        var generatedCodeColumn = 0; // first field
        var lineMappings = [];
        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var segment = line_1[_i];
            var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
            generatedCodeColumn = segment[0];
            if (segment.length > 1) {
                segmentMappings +=
                    encodeInteger(segment[1] - sourceFileIndex) +
                        encodeInteger(segment[2] - sourceCodeLine) +
                        encodeInteger(segment[3] - sourceCodeColumn);
                sourceFileIndex = segment[1];
                sourceCodeLine = segment[2];
                sourceCodeColumn = segment[3];
            }
            if (segment.length === 5) {
                segmentMappings += encodeInteger(segment[4] - nameIndex);
                nameIndex = segment[4];
            }
            lineMappings.push(segmentMappings);
        }
        mappings += lineMappings.join(',');
    }
    return mappings;
}
function encodeInteger(num) {
    var result = '';
    num = num < 0 ? (-num << 1) | 1 : num << 1;
    do {
        var clamped = num & 31;
        num >>= 5;
        if (num > 0) {
            clamped |= 32;
        }
        result += chars[clamped];
    } while (num > 0);
    return result;
}

var Chunk = function Chunk(start, end, content) {
	this.start = start;
	this.end = end;
	this.original = content;

	this.intro = '';
	this.outro = '';

	this.content = content;
	this.storeName = false;
	this.edited = false;

	// we make these non-enumerable, for sanity while debugging
	Object.defineProperties(this, {
		previous: { writable: true, value: null },
		next:     { writable: true, value: null }
	});
};

Chunk.prototype.appendLeft = function appendLeft (content) {
	this.outro += content;
};

Chunk.prototype.appendRight = function appendRight (content) {
	this.intro = this.intro + content;
};

Chunk.prototype.clone = function clone () {
	var chunk = new Chunk(this.start, this.end, this.original);

	chunk.intro = this.intro;
	chunk.outro = this.outro;
	chunk.content = this.content;
	chunk.storeName = this.storeName;
	chunk.edited = this.edited;

	return chunk;
};

Chunk.prototype.contains = function contains (index) {
	return this.start < index && index < this.end;
};

Chunk.prototype.eachNext = function eachNext (fn) {
	var chunk = this;
	while (chunk) {
		fn(chunk);
		chunk = chunk.next;
	}
};

Chunk.prototype.eachPrevious = function eachPrevious (fn) {
	var chunk = this;
	while (chunk) {
		fn(chunk);
		chunk = chunk.previous;
	}
};

Chunk.prototype.edit = function edit (content, storeName, contentOnly) {
	this.content = content;
	if (!contentOnly) {
		this.intro = '';
		this.outro = '';
	}
	this.storeName = storeName;

	this.edited = true;

	return this;
};

Chunk.prototype.prependLeft = function prependLeft (content) {
	this.outro = content + this.outro;
};

Chunk.prototype.prependRight = function prependRight (content) {
	this.intro = content + this.intro;
};

Chunk.prototype.split = function split (index) {
	var sliceIndex = index - this.start;

	var originalBefore = this.original.slice(0, sliceIndex);
	var originalAfter = this.original.slice(sliceIndex);

	this.original = originalBefore;

	var newChunk = new Chunk(index, this.end, originalAfter);
	newChunk.outro = this.outro;
	this.outro = '';

	this.end = index;

	if (this.edited) {
		// TODO is this block necessary?...
		newChunk.edit('', false);
		this.content = '';
	} else {
		this.content = originalBefore;
	}

	newChunk.next = this.next;
	if (newChunk.next) { newChunk.next.previous = newChunk; }
	newChunk.previous = this;
	this.next = newChunk;

	return newChunk;
};

Chunk.prototype.toString = function toString () {
	return this.intro + this.content + this.outro;
};

Chunk.prototype.trimEnd = function trimEnd (rx) {
	this.outro = this.outro.replace(rx, '');
	if (this.outro.length) { return true; }

	var trimmed = this.content.replace(rx, '');

	if (trimmed.length) {
		if (trimmed !== this.content) {
			this.split(this.start + trimmed.length).edit('', undefined, true);
		}
		return true;

	} else {
		this.edit('', undefined, true);

		this.intro = this.intro.replace(rx, '');
		if (this.intro.length) { return true; }
	}
};

Chunk.prototype.trimStart = function trimStart (rx) {
	this.intro = this.intro.replace(rx, '');
	if (this.intro.length) { return true; }

	var trimmed = this.content.replace(rx, '');

	if (trimmed.length) {
		if (trimmed !== this.content) {
			this.split(this.end - trimmed.length);
			this.edit('', undefined, true);
		}
		return true;

	} else {
		this.edit('', undefined, true);

		this.outro = this.outro.replace(rx, '');
		if (this.outro.length) { return true; }
	}
};

var btoa = function () {
	throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
};
if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
	btoa = window.btoa;
} else if (typeof Buffer === 'function') {
	btoa = function (str) { return new Buffer(str).toString('base64'); };
}

var SourceMap = function SourceMap(properties) {
	this.version = 3;
	this.file = properties.file;
	this.sources = properties.sources;
	this.sourcesContent = properties.sourcesContent;
	this.names = properties.names;
	this.mappings = encode(properties.mappings);
};

SourceMap.prototype.toString = function toString () {
	return JSON.stringify(this);
};

SourceMap.prototype.toUrl = function toUrl () {
	return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
};

function guessIndent(code) {
	var lines = code.split('\n');

	var tabbed = lines.filter(function (line) { return /^\t+/.test(line); });
	var spaced = lines.filter(function (line) { return /^ {2,}/.test(line); });

	if (tabbed.length === 0 && spaced.length === 0) {
		return null;
	}

	// More lines tabbed than spaced? Assume tabs, and
	// default to tabs in the case of a tie (or nothing
	// to go on)
	if (tabbed.length >= spaced.length) {
		return '\t';
	}

	// Otherwise, we need to guess the multiple
	var min = spaced.reduce(function (previous, current) {
		var numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);

	return new Array(min + 1).join(' ');
}

function getRelativePath(from, to) {
	var fromParts = from.split(/[/\\]/);
	var toParts = to.split(/[/\\]/);

	fromParts.pop(); // get dirname

	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}

	if (fromParts.length) {
		var i = fromParts.length;
		while (i--) { fromParts[i] = '..'; }
	}

	return fromParts.concat(toParts).join('/');
}

var toString = Object.prototype.toString;

function isObject(thing) {
	return toString.call(thing) === '[object Object]';
}

function getLocator(source) {
	var originalLines = source.split('\n');
	var lineOffsets = [];

	for (var i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}

	return function locate(index) {
		var i = 0;
		var j = lineOffsets.length;
		while (i < j) {
			var m = (i + j) >> 1;
			if (index < lineOffsets[m]) {
				j = m;
			} else {
				i = m + 1;
			}
		}
		var line = i - 1;
		var column = index - lineOffsets[line];
		return { line: line, column: column };
	};
}

var Mappings = function Mappings(hires) {
	this.hires = hires;
	this.generatedCodeLine = 0;
	this.generatedCodeColumn = 0;
	this.raw = [];
	this.rawSegments = this.raw[this.generatedCodeLine] = [];
	this.pending = null;
};

Mappings.prototype.addEdit = function addEdit (sourceIndex, content, loc, nameIndex) {
	if (content.length) {
		var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
		if (nameIndex >= 0) {
			segment.push(nameIndex);
		}
		this.rawSegments.push(segment);
	} else if (this.pending) {
		this.rawSegments.push(this.pending);
	}

	this.advance(content);
	this.pending = null;
};

Mappings.prototype.addUneditedChunk = function addUneditedChunk (sourceIndex, chunk, original, loc, sourcemapLocations) {
		var this$1 = this;

	var originalCharIndex = chunk.start;
	var first = true;

	while (originalCharIndex < chunk.end) {
		if (this$1.hires || first || sourcemapLocations[originalCharIndex]) {
			this$1.rawSegments.push([this$1.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
		}

		if (original[originalCharIndex] === '\n') {
			loc.line += 1;
			loc.column = 0;
			this$1.generatedCodeLine += 1;
			this$1.raw[this$1.generatedCodeLine] = this$1.rawSegments = [];
			this$1.generatedCodeColumn = 0;
		} else {
			loc.column += 1;
			this$1.generatedCodeColumn += 1;
		}

		originalCharIndex += 1;
		first = false;
	}

	this.pending = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
};

Mappings.prototype.advance = function advance (str) {
		var this$1 = this;

	if (!str) { return; }

	var lines = str.split('\n');

	if (lines.length > 1) {
		for (var i = 0; i < lines.length - 1; i++) {
			this$1.generatedCodeLine++;
			this$1.raw[this$1.generatedCodeLine] = this$1.rawSegments = [];
		}
		this.generatedCodeColumn = 0;
	}

	this.generatedCodeColumn += lines[lines.length - 1].length;
};

var n = '\n';

var warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};

var MagicString = function MagicString(string, options) {
	if ( options === void 0 ) options = {};

	var chunk = new Chunk(0, string.length, string);

	Object.defineProperties(this, {
		original:              { writable: true, value: string },
		outro:                 { writable: true, value: '' },
		intro:                 { writable: true, value: '' },
		firstChunk:            { writable: true, value: chunk },
		lastChunk:             { writable: true, value: chunk },
		lastSearchedChunk:     { writable: true, value: chunk },
		byStart:               { writable: true, value: {} },
		byEnd:                 { writable: true, value: {} },
		filename:              { writable: true, value: options.filename },
		indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
		sourcemapLocations:    { writable: true, value: {} },
		storedNames:           { writable: true, value: {} },
		indentStr:             { writable: true, value: guessIndent(string) }
	});

	this.byStart[0] = chunk;
	this.byEnd[string.length] = chunk;
};

MagicString.prototype.addSourcemapLocation = function addSourcemapLocation (char) {
	this.sourcemapLocations[char] = true;
};

MagicString.prototype.append = function append (content) {
	if (typeof content !== 'string') { throw new TypeError('outro content must be a string'); }

	this.outro += content;
	return this;
};

MagicString.prototype.appendLeft = function appendLeft (index, content) {
	if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

	this._split(index);

	var chunk = this.byEnd[index];

	if (chunk) {
		chunk.appendLeft(content);
	} else {
		this.intro += content;
	}
	return this;
};

MagicString.prototype.appendRight = function appendRight (index, content) {
	if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

	this._split(index);

	var chunk = this.byStart[index];

	if (chunk) {
		chunk.appendRight(content);
	} else {
		this.outro += content;
	}
	return this;
};

MagicString.prototype.clone = function clone () {
	var cloned = new MagicString(this.original, { filename: this.filename });

	var originalChunk = this.firstChunk;
	var clonedChunk = (cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone());

	while (originalChunk) {
		cloned.byStart[clonedChunk.start] = clonedChunk;
		cloned.byEnd[clonedChunk.end] = clonedChunk;

		var nextOriginalChunk = originalChunk.next;
		var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

		if (nextClonedChunk) {
			clonedChunk.next = nextClonedChunk;
			nextClonedChunk.previous = clonedChunk;

			clonedChunk = nextClonedChunk;
		}

		originalChunk = nextOriginalChunk;
	}

	cloned.lastChunk = clonedChunk;

	if (this.indentExclusionRanges) {
		cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
	}

	Object.keys(this.sourcemapLocations).forEach(function (loc) {
		cloned.sourcemapLocations[loc] = true;
	});

	return cloned;
};

MagicString.prototype.generateDecodedMap = function generateDecodedMap (options) {
		var this$1 = this;

	options = options || {};

	var sourceIndex = 0;
	var names = Object.keys(this.storedNames);
	var mappings = new Mappings(options.hires);

	var locate = getLocator(this.original);

	if (this.intro) {
		mappings.advance(this.intro);
	}

	this.firstChunk.eachNext(function (chunk) {
		var loc = locate(chunk.start);

		if (chunk.intro.length) { mappings.advance(chunk.intro); }

		if (chunk.edited) {
			mappings.addEdit(
				sourceIndex,
				chunk.content,
				loc,
				chunk.storeName ? names.indexOf(chunk.original) : -1
			);
		} else {
			mappings.addUneditedChunk(sourceIndex, chunk, this$1.original, loc, this$1.sourcemapLocations);
		}

		if (chunk.outro.length) { mappings.advance(chunk.outro); }
	});

	return {
		file: options.file ? options.file.split(/[/\\]/).pop() : null,
		sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
		sourcesContent: options.includeContent ? [this.original] : [null],
		names: names,
		mappings: mappings.raw
	};
};

MagicString.prototype.generateMap = function generateMap (options) {
	return new SourceMap(this.generateDecodedMap(options));
};

MagicString.prototype.getIndentString = function getIndentString () {
	return this.indentStr === null ? '\t' : this.indentStr;
};

MagicString.prototype.indent = function indent (indentStr, options) {
		var this$1 = this;

	var pattern = /^[^\r\n]/gm;

	if (isObject(indentStr)) {
		options = indentStr;
		indentStr = undefined;
	}

	indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

	if (indentStr === '') { return this; } // noop

	options = options || {};

	// Process exclusion ranges
	var isExcluded = {};

	if (options.exclude) {
		var exclusions =
			typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
		exclusions.forEach(function (exclusion) {
			for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
				isExcluded[i] = true;
			}
		});
	}

	var shouldIndentNextCharacter = options.indentStart !== false;
	var replacer = function (match) {
		if (shouldIndentNextCharacter) { return ("" + indentStr + match); }
		shouldIndentNextCharacter = true;
		return match;
	};

	this.intro = this.intro.replace(pattern, replacer);

	var charIndex = 0;
	var chunk = this.firstChunk;

	while (chunk) {
		var end = chunk.end;

		if (chunk.edited) {
			if (!isExcluded[charIndex]) {
				chunk.content = chunk.content.replace(pattern, replacer);

				if (chunk.content.length) {
					shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
				}
			}
		} else {
			charIndex = chunk.start;

			while (charIndex < end) {
				if (!isExcluded[charIndex]) {
					var char = this$1.original[charIndex];

					if (char === '\n') {
						shouldIndentNextCharacter = true;
					} else if (char !== '\r' && shouldIndentNextCharacter) {
						shouldIndentNextCharacter = false;

						if (charIndex === chunk.start) {
							chunk.prependRight(indentStr);
						} else {
							this$1._splitChunk(chunk, charIndex);
							chunk = chunk.next;
							chunk.prependRight(indentStr);
						}
					}
				}

				charIndex += 1;
			}
		}

		charIndex = chunk.end;
		chunk = chunk.next;
	}

	this.outro = this.outro.replace(pattern, replacer);

	return this;
};

MagicString.prototype.insert = function insert () {
	throw new Error('magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)');
};

MagicString.prototype.insertLeft = function insertLeft (index, content) {
	if (!warned.insertLeft) {
		console.warn('magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'); // eslint-disable-line no-console
		warned.insertLeft = true;
	}

	return this.appendLeft(index, content);
};

MagicString.prototype.insertRight = function insertRight (index, content) {
	if (!warned.insertRight) {
		console.warn('magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'); // eslint-disable-line no-console
		warned.insertRight = true;
	}

	return this.prependRight(index, content);
};

MagicString.prototype.move = function move (start, end, index) {
	if (index >= start && index <= end) { throw new Error('Cannot move a selection inside itself'); }

	this._split(start);
	this._split(end);
	this._split(index);

	var first = this.byStart[start];
	var last = this.byEnd[end];

	var oldLeft = first.previous;
	var oldRight = last.next;

	var newRight = this.byStart[index];
	if (!newRight && last === this.lastChunk) { return this; }
	var newLeft = newRight ? newRight.previous : this.lastChunk;

	if (oldLeft) { oldLeft.next = oldRight; }
	if (oldRight) { oldRight.previous = oldLeft; }

	if (newLeft) { newLeft.next = first; }
	if (newRight) { newRight.previous = last; }

	if (!first.previous) { this.firstChunk = last.next; }
	if (!last.next) {
		this.lastChunk = first.previous;
		this.lastChunk.next = null;
	}

	first.previous = newLeft;
	last.next = newRight || null;

	if (!newLeft) { this.firstChunk = first; }
	if (!newRight) { this.lastChunk = last; }
	return this;
};

MagicString.prototype.overwrite = function overwrite (start, end, content, options) {
		var this$1 = this;

	if (typeof content !== 'string') { throw new TypeError('replacement content must be a string'); }

	while (start < 0) { start += this$1.original.length; }
	while (end < 0) { end += this$1.original.length; }

	if (end > this.original.length) { throw new Error('end is out of bounds'); }
	if (start === end)
		{ throw new Error('Cannot overwrite a zero-length range – use appendLeft or prependRight instead'); }

	this._split(start);
	this._split(end);

	if (options === true) {
		if (!warned.storeName) {
			console.warn('The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'); // eslint-disable-line no-console
			warned.storeName = true;
		}

		options = { storeName: true };
	}
	var storeName = options !== undefined ? options.storeName : false;
	var contentOnly = options !== undefined ? options.contentOnly : false;

	if (storeName) {
		var original = this.original.slice(start, end);
		this.storedNames[original] = true;
	}

	var first = this.byStart[start];
	var last = this.byEnd[end];

	if (first) {
		if (end > first.end && first.next !== this.byStart[first.end]) {
			throw new Error('Cannot overwrite across a split point');
		}

		first.edit(content, storeName, contentOnly);

		if (first !== last) {
			var chunk = first.next;
			while (chunk !== last) {
				chunk.edit('', false);
				chunk = chunk.next;
			}

			chunk.edit('', false);
		}
	} else {
		// must be inserting at the end
		var newChunk = new Chunk(start, end, '').edit(content, storeName);

		// TODO last chunk in the array may not be the last chunk, if it's moved...
		last.next = newChunk;
		newChunk.previous = last;
	}
	return this;
};

MagicString.prototype.prepend = function prepend (content) {
	if (typeof content !== 'string') { throw new TypeError('outro content must be a string'); }

	this.intro = content + this.intro;
	return this;
};

MagicString.prototype.prependLeft = function prependLeft (index, content) {
	if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

	this._split(index);

	var chunk = this.byEnd[index];

	if (chunk) {
		chunk.prependLeft(content);
	} else {
		this.intro = content + this.intro;
	}
	return this;
};

MagicString.prototype.prependRight = function prependRight (index, content) {
	if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

	this._split(index);

	var chunk = this.byStart[index];

	if (chunk) {
		chunk.prependRight(content);
	} else {
		this.outro = content + this.outro;
	}
	return this;
};

MagicString.prototype.remove = function remove (start, end) {
		var this$1 = this;

	while (start < 0) { start += this$1.original.length; }
	while (end < 0) { end += this$1.original.length; }

	if (start === end) { return this; }

	if (start < 0 || end > this.original.length) { throw new Error('Character is out of bounds'); }
	if (start > end) { throw new Error('end must be greater than start'); }

	this._split(start);
	this._split(end);

	var chunk = this.byStart[start];

	while (chunk) {
		chunk.intro = '';
		chunk.outro = '';
		chunk.edit('');

		chunk = end > chunk.end ? this$1.byStart[chunk.end] : null;
	}
	return this;
};

MagicString.prototype.lastChar = function lastChar () {
	if (this.outro.length)
		{ return this.outro[this.outro.length - 1]; }
	var chunk = this.lastChunk;
	do {
		if (chunk.outro.length)
			{ return chunk.outro[chunk.outro.length - 1]; }
		if (chunk.content.length)
			{ return chunk.content[chunk.content.length - 1]; }
		if (chunk.intro.length)
			{ return chunk.intro[chunk.intro.length - 1]; }
	} while (chunk = chunk.previous);
	if (this.intro.length)
		{ return this.intro[this.intro.length - 1]; }
	return '';
};

MagicString.prototype.lastLine = function lastLine () {
	var lineIndex = this.outro.lastIndexOf(n);
	if (lineIndex !== -1)
		{ return this.outro.substr(lineIndex + 1); }
	var lineStr = this.outro;
	var chunk = this.lastChunk;
	do {
		if (chunk.outro.length > 0) {
			lineIndex = chunk.outro.lastIndexOf(n);
			if (lineIndex !== -1)
				{ return chunk.outro.substr(lineIndex + 1) + lineStr; }
			lineStr = chunk.outro + lineStr;
		}

		if (chunk.content.length > 0) {
			lineIndex = chunk.content.lastIndexOf(n);
			if (lineIndex !== -1)
				{ return chunk.content.substr(lineIndex + 1) + lineStr; }
			lineStr = chunk.content + lineStr;
		}

		if (chunk.intro.length > 0) {
			lineIndex = chunk.intro.lastIndexOf(n);
			if (lineIndex !== -1)
				{ return chunk.intro.substr(lineIndex + 1) + lineStr; }
			lineStr = chunk.intro + lineStr;
		}
	} while (chunk = chunk.previous);
	lineIndex = this.intro.lastIndexOf(n);
	if (lineIndex !== -1)
		{ return this.intro.substr(lineIndex + 1) + lineStr; }
	return this.intro + lineStr;
};

MagicString.prototype.slice = function slice (start, end) {
		var this$1 = this;
		if ( start === void 0 ) start = 0;
		if ( end === void 0 ) end = this.original.length;

	while (start < 0) { start += this$1.original.length; }
	while (end < 0) { end += this$1.original.length; }

	var result = '';

	// find start chunk
	var chunk = this.firstChunk;
	while (chunk && (chunk.start > start || chunk.end <= start)) {
		// found end chunk before start
		if (chunk.start < end && chunk.end >= end) {
			return result;
		}

		chunk = chunk.next;
	}

	if (chunk && chunk.edited && chunk.start !== start)
		{ throw new Error(("Cannot use replaced character " + start + " as slice start anchor.")); }

	var startChunk = chunk;
	while (chunk) {
		if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
			result += chunk.intro;
		}

		var containsEnd = chunk.start < end && chunk.end >= end;
		if (containsEnd && chunk.edited && chunk.end !== end)
			{ throw new Error(("Cannot use replaced character " + end + " as slice end anchor.")); }

		var sliceStart = startChunk === chunk ? start - chunk.start : 0;
		var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

		result += chunk.content.slice(sliceStart, sliceEnd);

		if (chunk.outro && (!containsEnd || chunk.end === end)) {
			result += chunk.outro;
		}

		if (containsEnd) {
			break;
		}

		chunk = chunk.next;
	}

	return result;
};

// TODO deprecate this? not really very useful
MagicString.prototype.snip = function snip (start, end) {
	var clone = this.clone();
	clone.remove(0, start);
	clone.remove(end, clone.original.length);

	return clone;
};

MagicString.prototype._split = function _split (index) {
		var this$1 = this;

	if (this.byStart[index] || this.byEnd[index]) { return; }

	var chunk = this.lastSearchedChunk;
	var searchForward = index > chunk.end;

	while (chunk) {
		if (chunk.contains(index)) { return this$1._splitChunk(chunk, index); }

		chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
	}
};

MagicString.prototype._splitChunk = function _splitChunk (chunk, index) {
	if (chunk.edited && chunk.content.length) {
		// zero-length edited chunks are a special case (overlapping replacements)
		var loc = getLocator(this.original)(index);
		throw new Error(
			("Cannot split a chunk that has already been edited (" + (loc.line) + ":" + (loc.column) + " – \"" + (chunk.original) + "\")")
		);
	}

	var newChunk = chunk.split(index);

	this.byEnd[index] = chunk;
	this.byStart[index] = newChunk;
	this.byEnd[newChunk.end] = newChunk;

	if (chunk === this.lastChunk) { this.lastChunk = newChunk; }

	this.lastSearchedChunk = chunk;
	return true;
};

MagicString.prototype.toString = function toString () {
	var str = this.intro;

	var chunk = this.firstChunk;
	while (chunk) {
		str += chunk.toString();
		chunk = chunk.next;
	}

	return str + this.outro;
};

MagicString.prototype.isEmpty = function isEmpty () {
	var chunk = this.firstChunk;
	do {
		if (chunk.intro.length && chunk.intro.trim() ||
				chunk.content.length && chunk.content.trim() ||
				chunk.outro.length && chunk.outro.trim())
			{ return false; }
	} while (chunk = chunk.next);
	return true;
};

MagicString.prototype.length = function length () {
	var chunk = this.firstChunk;
	var length = 0;
	do {
		length += chunk.intro.length + chunk.content.length + chunk.outro.length;
	} while (chunk = chunk.next);
	return length;
};

MagicString.prototype.trimLines = function trimLines () {
	return this.trim('[\\r\\n]');
};

MagicString.prototype.trim = function trim (charType) {
	return this.trimStart(charType).trimEnd(charType);
};

MagicString.prototype.trimEndAborted = function trimEndAborted (charType) {
		var this$1 = this;

	var rx = new RegExp((charType || '\\s') + '+$');

	this.outro = this.outro.replace(rx, '');
	if (this.outro.length) { return true; }

	var chunk = this.lastChunk;

	do {
		var end = chunk.end;
		var aborted = chunk.trimEnd(rx);

		// if chunk was trimmed, we have a new lastChunk
		if (chunk.end !== end) {
			if (this$1.lastChunk === chunk) {
				this$1.lastChunk = chunk.next;
			}

			this$1.byEnd[chunk.end] = chunk;
			this$1.byStart[chunk.next.start] = chunk.next;
			this$1.byEnd[chunk.next.end] = chunk.next;
		}

		if (aborted) { return true; }
		chunk = chunk.previous;
	} while (chunk);

	return false;
};

MagicString.prototype.trimEnd = function trimEnd (charType) {
	this.trimEndAborted(charType);
	return this;
};
MagicString.prototype.trimStartAborted = function trimStartAborted (charType) {
		var this$1 = this;

	var rx = new RegExp('^' + (charType || '\\s') + '+');

	this.intro = this.intro.replace(rx, '');
	if (this.intro.length) { return true; }

	var chunk = this.firstChunk;

	do {
		var end = chunk.end;
		var aborted = chunk.trimStart(rx);

		if (chunk.end !== end) {
			// special case...
			if (chunk === this$1.lastChunk) { this$1.lastChunk = chunk.next; }

			this$1.byEnd[chunk.end] = chunk;
			this$1.byStart[chunk.next.start] = chunk.next;
			this$1.byEnd[chunk.next.end] = chunk.next;
		}

		if (aborted) { return true; }
		chunk = chunk.next;
	} while (chunk);

	return false;
};

MagicString.prototype.trimStart = function trimStart (charType) {
	this.trimStartAborted(charType);
	return this;
};

var hasOwnProp = Object.prototype.hasOwnProperty;

var Bundle = function Bundle(options) {
	if ( options === void 0 ) options = {};

	this.intro = options.intro || '';
	this.separator = options.separator !== undefined ? options.separator : '\n';
	this.sources = [];
	this.uniqueSources = [];
	this.uniqueSourceIndexByFilename = {};
};

Bundle.prototype.addSource = function addSource (source) {
	if (source instanceof MagicString) {
		return this.addSource({
			content: source,
			filename: source.filename,
			separator: this.separator
		});
	}

	if (!isObject(source) || !source.content) {
		throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
	}

	['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
		if (!hasOwnProp.call(source, option)) { source[option] = source.content[option]; }
	});

	if (source.separator === undefined) {
		// TODO there's a bunch of this sort of thing, needs cleaning up
		source.separator = this.separator;
	}

	if (source.filename) {
		if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
			this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
			this.uniqueSources.push({ filename: source.filename, content: source.content.original });
		} else {
			var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
			if (source.content.original !== uniqueSource.content) {
				throw new Error(("Illegal source: same filename (" + (source.filename) + "), different contents"));
			}
		}
	}

	this.sources.push(source);
	return this;
};

Bundle.prototype.append = function append (str, options) {
	this.addSource({
		content: new MagicString(str),
		separator: (options && options.separator) || ''
	});

	return this;
};

Bundle.prototype.clone = function clone () {
	var bundle = new Bundle({
		intro: this.intro,
		separator: this.separator
	});

	this.sources.forEach(function (source) {
		bundle.addSource({
			filename: source.filename,
			content: source.content.clone(),
			separator: source.separator
		});
	});

	return bundle;
};

Bundle.prototype.generateDecodedMap = function generateDecodedMap (options) {
		var this$1 = this;
		if ( options === void 0 ) options = {};

	var names = [];
	this.sources.forEach(function (source) {
		Object.keys(source.content.storedNames).forEach(function (name) {
			if (!~names.indexOf(name)) { names.push(name); }
		});
	});

	var mappings = new Mappings(options.hires);

	if (this.intro) {
		mappings.advance(this.intro);
	}

	this.sources.forEach(function (source, i) {
		if (i > 0) {
			mappings.advance(this$1.separator);
		}

		var sourceIndex = source.filename ? this$1.uniqueSourceIndexByFilename[source.filename] : -1;
		var magicString = source.content;
		var locate = getLocator(magicString.original);

		if (magicString.intro) {
			mappings.advance(magicString.intro);
		}

		magicString.firstChunk.eachNext(function (chunk) {
			var loc = locate(chunk.start);

			if (chunk.intro.length) { mappings.advance(chunk.intro); }

			if (source.filename) {
				if (chunk.edited) {
					mappings.addEdit(
						sourceIndex,
						chunk.content,
						loc,
						chunk.storeName ? names.indexOf(chunk.original) : -1
					);
				} else {
					mappings.addUneditedChunk(
						sourceIndex,
						chunk,
						magicString.original,
						loc,
						magicString.sourcemapLocations
					);
				}
			} else {
				mappings.advance(chunk.content);
			}

			if (chunk.outro.length) { mappings.advance(chunk.outro); }
		});

		if (magicString.outro) {
			mappings.advance(magicString.outro);
		}
	});

	return {
		file: options.file ? options.file.split(/[/\\]/).pop() : null,
		sources: this.uniqueSources.map(function (source) {
			return options.file ? getRelativePath(options.file, source.filename) : source.filename;
		}),
		sourcesContent: this.uniqueSources.map(function (source) {
			return options.includeContent ? source.content : null;
		}),
		names: names,
		mappings: mappings.raw
	};
};

Bundle.prototype.generateMap = function generateMap (options) {
	return new SourceMap(this.generateDecodedMap(options));
};

Bundle.prototype.getIndentString = function getIndentString () {
	var indentStringCounts = {};

	this.sources.forEach(function (source) {
		var indentStr = source.content.indentStr;

		if (indentStr === null) { return; }

		if (!indentStringCounts[indentStr]) { indentStringCounts[indentStr] = 0; }
		indentStringCounts[indentStr] += 1;
	});

	return (
		Object.keys(indentStringCounts).sort(function (a, b) {
			return indentStringCounts[a] - indentStringCounts[b];
		})[0] || '\t'
	);
};

Bundle.prototype.indent = function indent (indentStr) {
		var this$1 = this;

	if (!arguments.length) {
		indentStr = this.getIndentString();
	}

	if (indentStr === '') { return this; } // noop

	var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';

	this.sources.forEach(function (source, i) {
		var separator = source.separator !== undefined ? source.separator : this$1.separator;
		var indentStart = trailingNewline || (i > 0 && /\r?\n$/.test(separator));

		source.content.indent(indentStr, {
			exclude: source.indentExclusionRanges,
			indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
		});

		trailingNewline = source.content.lastChar() === '\n';
	});

	if (this.intro) {
		this.intro =
			indentStr +
			this.intro.replace(/^[^\n]/gm, function (match, index) {
				return index > 0 ? indentStr + match : match;
			});
	}

	return this;
};

Bundle.prototype.prepend = function prepend (str) {
	this.intro = str + this.intro;
	return this;
};

Bundle.prototype.toString = function toString () {
		var this$1 = this;

	var body = this.sources
		.map(function (source, i) {
			var separator = source.separator !== undefined ? source.separator : this$1.separator;
			var str = (i > 0 ? separator : '') + source.content.toString();

			return str;
		})
		.join('');

	return this.intro + body;
};

Bundle.prototype.isEmpty = function isEmpty () {
	if (this.intro.length && this.intro.trim())
		{ return false; }
	if (this.sources.some(function (source) { return !source.content.isEmpty(); }))
		{ return false; }
	return true;
};

Bundle.prototype.length = function length () {
	return this.sources.reduce(function (length, source) { return length + source.content.length(); }, this.intro.length);
};

Bundle.prototype.trimLines = function trimLines () {
	return this.trim('[\\r\\n]');
};

Bundle.prototype.trim = function trim (charType) {
	return this.trimStart(charType).trimEnd(charType);
};

Bundle.prototype.trimStart = function trimStart (charType) {
		var this$1 = this;

	var rx = new RegExp('^' + (charType || '\\s') + '+');
	this.intro = this.intro.replace(rx, '');

	if (!this.intro) {
		var source;
		var i = 0;

		do {
			source = this$1.sources[i++];
			if (!source) {
				break;
			}
		} while (!source.content.trimStartAborted(charType));
	}

	return this;
};

Bundle.prototype.trimEnd = function trimEnd (charType) {
		var this$1 = this;

	var rx = new RegExp((charType || '\\s') + '+$');

	var source;
	var i = this.sources.length - 1;

	do {
		source = this$1.sources[i--];
		if (!source) {
			this$1.intro = this$1.intro.replace(rx, '');
			break;
		}
	} while (!source.content.trimEndAborted(charType));

	return this;
};

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var AssignmentPattern = 'AssignmentPattern';
var BlockStatement = 'BlockStatement';
var CallExpression = 'CallExpression';
var ClassDeclaration = 'ClassDeclaration';
var ExportAllDeclaration = 'ExportAllDeclaration';
var ExportDefaultDeclaration = 'ExportDefaultDeclaration';
var ExpressionStatement = 'ExpressionStatement';
var FunctionDeclaration = 'FunctionDeclaration';
var Identifier = 'Identifier';
var ImportDefaultSpecifier = 'ImportDefaultSpecifier';
var ImportNamespaceSpecifier = 'ImportNamespaceSpecifier';
var Literal = 'Literal';
var MemberExpression = 'MemberExpression';
var Program = 'Program';
var Property = 'Property';
var ReturnStatement = 'ReturnStatement';
var TemplateLiteral = 'TemplateLiteral';
var VariableDeclaration = 'VariableDeclaration';

var CallOptions = /** @class */ (function () {
    function CallOptions(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.withNew, withNew = _c === void 0 ? false : _c, _d = _b.args, args = _d === void 0 ? [] : _d, _e = _b.callIdentifier, callIdentifier = _e === void 0 ? undefined : _e;
        this.withNew = withNew;
        this.args = args;
        this.callIdentifier = callIdentifier;
    }
    CallOptions.create = function (callOptions) {
        return new this(callOptions);
    };
    CallOptions.prototype.equals = function (callOptions) {
        return callOptions && this.callIdentifier === callOptions.callIdentifier;
    };
    return CallOptions;
}());

var UNKNOWN_KEY = { UNKNOWN_KEY: true };
var EMPTY_PATH = [];
var UNKNOWN_PATH = [UNKNOWN_KEY];
function assembleMemberDescriptions(memberDescriptions, inheritedDescriptions) {
    if (inheritedDescriptions === void 0) { inheritedDescriptions = null; }
    return Object.create(inheritedDescriptions, memberDescriptions);
}
var UNKNOWN_VALUE = { UNKNOWN_VALUE: true };
var UNKNOWN_EXPRESSION = {
    included: true,
    getLiteralValueAtPath: function () { return UNKNOWN_VALUE; },
    getReturnExpressionWhenCalledAtPath: function () { return UNKNOWN_EXPRESSION; },
    hasEffectsWhenAccessedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenAssignedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenCalledAtPath: function () { return true; },
    include: function () { },
    deoptimizePath: function () { },
    toString: function () { return '[[UNKNOWN]]'; }
};
var UNDEFINED_EXPRESSION = {
    included: true,
    getLiteralValueAtPath: function () { return undefined; },
    getReturnExpressionWhenCalledAtPath: function () { return UNKNOWN_EXPRESSION; },
    hasEffectsWhenAccessedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenAssignedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenCalledAtPath: function () { return true; },
    include: function () { },
    deoptimizePath: function () { },
    toString: function () { return 'undefined'; }
};
var returnsUnknown = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_EXPRESSION,
        callsArgs: null,
        mutatesSelf: false
    }
};
var mutatesSelfReturnsUnknown = {
    value: { returns: null, returnsPrimitive: UNKNOWN_EXPRESSION, callsArgs: null, mutatesSelf: true }
};
var callsArgReturnsUnknown = {
    value: { returns: null, returnsPrimitive: UNKNOWN_EXPRESSION, callsArgs: [0], mutatesSelf: false }
};
var UnknownArrayExpression = /** @class */ (function () {
    function UnknownArrayExpression() {
        this.included = false;
    }
    UnknownArrayExpression.prototype.getLiteralValueAtPath = function () {
        return UNKNOWN_VALUE;
    };
    UnknownArrayExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        if (path$$1.length === 1) {
            return getMemberReturnExpressionWhenCalled(arrayMembers, path$$1[0]);
        }
        return UNKNOWN_EXPRESSION;
    };
    UnknownArrayExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        return path$$1.length > 1;
    };
    UnknownArrayExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1) {
        return path$$1.length > 1;
    };
    UnknownArrayExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length === 1) {
            return hasMemberEffectWhenCalled(arrayMembers, path$$1[0], this.included, callOptions, options);
        }
        return true;
    };
    UnknownArrayExpression.prototype.include = function () {
        this.included = true;
    };
    UnknownArrayExpression.prototype.deoptimizePath = function () { };
    UnknownArrayExpression.prototype.toString = function () {
        return '[[UNKNOWN ARRAY]]';
    };
    return UnknownArrayExpression;
}());
var returnsArray = {
    value: {
        returns: UnknownArrayExpression,
        returnsPrimitive: null,
        callsArgs: null,
        mutatesSelf: false
    }
};
var mutatesSelfReturnsArray = {
    value: {
        returns: UnknownArrayExpression,
        returnsPrimitive: null,
        callsArgs: null,
        mutatesSelf: true
    }
};
var callsArgReturnsArray = {
    value: {
        returns: UnknownArrayExpression,
        returnsPrimitive: null,
        callsArgs: [0],
        mutatesSelf: false
    }
};
var callsArgMutatesSelfReturnsArray = {
    value: {
        returns: UnknownArrayExpression,
        returnsPrimitive: null,
        callsArgs: [0],
        mutatesSelf: true
    }
};
var UNKNOWN_LITERAL_BOOLEAN = {
    included: true,
    getLiteralValueAtPath: function () { return UNKNOWN_VALUE; },
    getReturnExpressionWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            return getMemberReturnExpressionWhenCalled(literalBooleanMembers, path$$1[0]);
        }
        return UNKNOWN_EXPRESSION;
    },
    hasEffectsWhenAccessedAtPath: function (path$$1) { return path$$1.length > 1; },
    hasEffectsWhenAssignedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            var subPath = path$$1[0];
            return typeof subPath !== 'string' || !literalBooleanMembers[subPath];
        }
        return true;
    },
    include: function () { },
    deoptimizePath: function () { },
    toString: function () { return '[[UNKNOWN BOOLEAN]]'; }
};
var returnsBoolean = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN,
        callsArgs: null,
        mutatesSelf: false
    }
};
var callsArgReturnsBoolean = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN,
        callsArgs: [0],
        mutatesSelf: false
    }
};
var UNKNOWN_LITERAL_NUMBER = {
    included: true,
    getLiteralValueAtPath: function () { return UNKNOWN_VALUE; },
    getReturnExpressionWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            return getMemberReturnExpressionWhenCalled(literalNumberMembers, path$$1[0]);
        }
        return UNKNOWN_EXPRESSION;
    },
    hasEffectsWhenAccessedAtPath: function (path$$1) { return path$$1.length > 1; },
    hasEffectsWhenAssignedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            var subPath = path$$1[0];
            return typeof subPath !== 'string' || !literalNumberMembers[subPath];
        }
        return true;
    },
    include: function () { },
    deoptimizePath: function () { },
    toString: function () { return '[[UNKNOWN NUMBER]]'; }
};
var returnsNumber = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER,
        callsArgs: null,
        mutatesSelf: false
    }
};
var mutatesSelfReturnsNumber = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER,
        callsArgs: null,
        mutatesSelf: true
    }
};
var callsArgReturnsNumber = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER,
        callsArgs: [0],
        mutatesSelf: false
    }
};
var UNKNOWN_LITERAL_STRING = {
    included: true,
    getLiteralValueAtPath: function () { return UNKNOWN_VALUE; },
    getReturnExpressionWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            return getMemberReturnExpressionWhenCalled(literalStringMembers, path$$1[0]);
        }
        return UNKNOWN_EXPRESSION;
    },
    hasEffectsWhenAccessedAtPath: function (path$$1) { return path$$1.length > 1; },
    hasEffectsWhenAssignedAtPath: function (path$$1) { return path$$1.length > 0; },
    hasEffectsWhenCalledAtPath: function (path$$1) {
        if (path$$1.length === 1) {
            var subPath = path$$1[0];
            return typeof subPath !== 'string' || !literalStringMembers[subPath];
        }
        return true;
    },
    include: function () { },
    deoptimizePath: function () { },
    toString: function () { return '[[UNKNOWN STRING]]'; }
};
var returnsString = {
    value: {
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_STRING,
        callsArgs: null,
        mutatesSelf: false
    }
};
var UnknownObjectExpression = /** @class */ (function () {
    function UnknownObjectExpression() {
        this.included = false;
    }
    UnknownObjectExpression.prototype.getLiteralValueAtPath = function () {
        return UNKNOWN_VALUE;
    };
    UnknownObjectExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        if (path$$1.length === 1) {
            return getMemberReturnExpressionWhenCalled(objectMembers, path$$1[0]);
        }
        return UNKNOWN_EXPRESSION;
    };
    UnknownObjectExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        return path$$1.length > 1;
    };
    UnknownObjectExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1) {
        return path$$1.length > 1;
    };
    UnknownObjectExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length === 1) {
            return hasMemberEffectWhenCalled(objectMembers, path$$1[0], this.included, callOptions, options);
        }
        return true;
    };
    UnknownObjectExpression.prototype.include = function () {
        this.included = true;
    };
    UnknownObjectExpression.prototype.deoptimizePath = function () { };
    UnknownObjectExpression.prototype.toString = function () {
        return '[[UNKNOWN OBJECT]]';
    };
    return UnknownObjectExpression;
}());
var objectMembers = assembleMemberDescriptions({
    hasOwnProperty: returnsBoolean,
    isPrototypeOf: returnsBoolean,
    propertyIsEnumerable: returnsBoolean,
    toLocaleString: returnsString,
    toString: returnsString,
    valueOf: returnsUnknown
});
var arrayMembers = assembleMemberDescriptions({
    concat: returnsArray,
    copyWithin: mutatesSelfReturnsArray,
    every: callsArgReturnsBoolean,
    fill: mutatesSelfReturnsArray,
    filter: callsArgReturnsArray,
    find: callsArgReturnsUnknown,
    findIndex: callsArgReturnsNumber,
    forEach: callsArgReturnsUnknown,
    includes: returnsBoolean,
    indexOf: returnsNumber,
    join: returnsString,
    lastIndexOf: returnsNumber,
    map: callsArgReturnsArray,
    pop: mutatesSelfReturnsUnknown,
    push: mutatesSelfReturnsNumber,
    reduce: callsArgReturnsUnknown,
    reduceRight: callsArgReturnsUnknown,
    reverse: mutatesSelfReturnsArray,
    shift: mutatesSelfReturnsUnknown,
    slice: returnsArray,
    some: callsArgReturnsBoolean,
    sort: callsArgMutatesSelfReturnsArray,
    splice: mutatesSelfReturnsArray,
    unshift: mutatesSelfReturnsNumber
}, objectMembers);
var literalBooleanMembers = assembleMemberDescriptions({
    valueOf: returnsBoolean
}, objectMembers);
var literalNumberMembers = assembleMemberDescriptions({
    toExponential: returnsString,
    toFixed: returnsString,
    toLocaleString: returnsString,
    toPrecision: returnsString,
    valueOf: returnsNumber
}, objectMembers);
var literalStringMembers = assembleMemberDescriptions({
    charAt: returnsString,
    charCodeAt: returnsNumber,
    codePointAt: returnsNumber,
    concat: returnsString,
    includes: returnsBoolean,
    endsWith: returnsBoolean,
    indexOf: returnsNumber,
    lastIndexOf: returnsNumber,
    localeCompare: returnsNumber,
    match: returnsBoolean,
    normalize: returnsString,
    padEnd: returnsString,
    padStart: returnsString,
    repeat: returnsString,
    replace: {
        value: {
            returns: null,
            returnsPrimitive: UNKNOWN_LITERAL_STRING,
            callsArgs: [1],
            mutatesSelf: false
        }
    },
    search: returnsNumber,
    slice: returnsString,
    split: returnsArray,
    startsWith: returnsBoolean,
    substr: returnsString,
    substring: returnsString,
    toLocaleLowerCase: returnsString,
    toLocaleUpperCase: returnsString,
    toLowerCase: returnsString,
    toUpperCase: returnsString,
    trim: returnsString,
    valueOf: returnsString
}, objectMembers);
function getLiteralMembersForValue(value) {
    switch (typeof value) {
        case 'boolean':
            return literalBooleanMembers;
        case 'number':
            return literalNumberMembers;
        case 'string':
            return literalStringMembers;
        default:
            return Object.create(null);
    }
}
function hasMemberEffectWhenCalled(members, memberName, parentIncluded, callOptions, options) {
    if (typeof memberName !== 'string' || !members[memberName])
        return true;
    if (members[memberName].mutatesSelf && parentIncluded)
        return true;
    if (!members[memberName].callsArgs)
        return false;
    for (var _i = 0, _a = members[memberName].callsArgs; _i < _a.length; _i++) {
        var argIndex = _a[_i];
        if (callOptions.args[argIndex] &&
            callOptions.args[argIndex].hasEffectsWhenCalledAtPath(EMPTY_PATH, CallOptions.create({
                withNew: false,
                args: [],
                callIdentifier: {} // make sure the caller is unique to avoid this check being ignored
            }), options.getHasEffectsWhenCalledOptions()))
            return true;
    }
    return false;
}
function getMemberReturnExpressionWhenCalled(members, memberName) {
    if (typeof memberName !== 'string' || !members[memberName])
        return UNKNOWN_EXPRESSION;
    return members[memberName].returnsPrimitive !== null
        ? members[memberName].returnsPrimitive
        : new members[memberName].returns();
}

var Variable = /** @class */ (function () {
    function Variable(name) {
        // Not initialised during construction
        this.exportName = null;
        this.safeExportName = null;
        this.included = false;
        this.isId = false;
        this.reexported = false;
        this.isReassigned = false;
        this.name = name;
        this.safeName = null;
    }
    /**
     * Binds identifiers that reference this variable to this variable.
     * Necessary to be able to change variable names.
     */
    Variable.prototype.addReference = function (_identifier) { };
    Variable.prototype.getName = function (reset) {
        if (reset &&
            this.safeName &&
            this.safeName !== this.name &&
            this.safeName[this.name.length] === '$' &&
            this.safeName[this.name.length + 1] === '$') {
            this.safeName = undefined;
            return this.name;
        }
        return this.safeName || this.name;
    };
    Variable.prototype.getLiteralValueAtPath = function (_path, _recursionTracker, _origin) {
        return UNKNOWN_VALUE;
    };
    Variable.prototype.getReturnExpressionWhenCalledAtPath = function (_path, _recursionTracker, _origin) {
        return UNKNOWN_EXPRESSION;
    };
    Variable.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 0;
    };
    Variable.prototype.hasEffectsWhenAssignedAtPath = function (_path, _options) {
        return true;
    };
    Variable.prototype.hasEffectsWhenCalledAtPath = function (_path, _callOptions, _options) {
        return true;
    };
    /**
     * Marks this variable as being part of the bundle, which is usually the case when one of
     * its identifiers becomes part of the bundle. Returns true if it has not been included
     * previously.
     * Once a variable is included, it should take care all its declarations are included.
     */
    Variable.prototype.include = function () {
        this.included = true;
    };
    Variable.prototype.deoptimizePath = function (_path) { };
    Variable.prototype.setSafeName = function (name) {
        this.safeName = name;
    };
    Variable.prototype.toString = function () {
        return this.name;
    };
    return Variable;
}());

// To avoid infinite recursions
var MAX_PATH_DEPTH = 7;
var LocalVariable = /** @class */ (function (_super) {
    __extends(LocalVariable, _super);
    function LocalVariable(name, declarator, init, deoptimizationTracker) {
        var _this = _super.call(this, name) || this;
        _this.additionalInitializers = null;
        _this.expressionsToBeDeoptimized = [];
        _this.declarations = declarator ? [declarator] : [];
        _this.init = init;
        _this.deoptimizationTracker = deoptimizationTracker;
        return _this;
    }
    LocalVariable.prototype.addDeclaration = function (identifier, init) {
        this.declarations.push(identifier);
        if (this.additionalInitializers === null) {
            this.additionalInitializers = this.init === null ? [] : [this.init];
            this.init = UNKNOWN_EXPRESSION;
            this.isReassigned = true;
        }
        if (init !== null) {
            this.additionalInitializers.push(init);
        }
    };
    LocalVariable.prototype.consolidateInitializers = function () {
        if (this.additionalInitializers !== null) {
            for (var _i = 0, _a = this.additionalInitializers; _i < _a.length; _i++) {
                var initializer = _a[_i];
                initializer.deoptimizePath(UNKNOWN_PATH);
            }
            this.additionalInitializers = null;
        }
    };
    LocalVariable.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.isReassigned ||
            !this.init ||
            path$$1.length > MAX_PATH_DEPTH ||
            recursionTracker.isTracked(this.init, path$$1)) {
            return UNKNOWN_VALUE;
        }
        this.expressionsToBeDeoptimized.push(origin);
        return this.init.getLiteralValueAtPath(path$$1, recursionTracker.track(this.init, path$$1), origin);
    };
    LocalVariable.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.isReassigned ||
            !this.init ||
            path$$1.length > MAX_PATH_DEPTH ||
            recursionTracker.isTracked(this.init, path$$1)) {
            return UNKNOWN_EXPRESSION;
        }
        this.expressionsToBeDeoptimized.push(origin);
        return this.init.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker.track(this.init, path$$1), origin);
    };
    LocalVariable.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return false;
        return (this.isReassigned ||
            path$$1.length > MAX_PATH_DEPTH ||
            (this.init &&
                !options.hasNodeBeenAccessedAtPath(path$$1, this.init) &&
                this.init.hasEffectsWhenAccessedAtPath(path$$1, options.addAccessedNodeAtPath(path$$1, this.init))));
    };
    LocalVariable.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (this.included || path$$1.length > MAX_PATH_DEPTH)
            return true;
        if (path$$1.length === 0)
            return false;
        return (this.isReassigned ||
            (this.init &&
                !options.hasNodeBeenAssignedAtPath(path$$1, this.init) &&
                this.init.hasEffectsWhenAssignedAtPath(path$$1, options.addAssignedNodeAtPath(path$$1, this.init))));
    };
    LocalVariable.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length > MAX_PATH_DEPTH)
            return true;
        return (this.isReassigned ||
            (this.init &&
                !options.hasNodeBeenCalledAtPathWithOptions(path$$1, this.init, callOptions) &&
                this.init.hasEffectsWhenCalledAtPath(path$$1, callOptions, options.addCalledNodeAtPathWithOptions(path$$1, this.init, callOptions))));
    };
    LocalVariable.prototype.include = function () {
        if (!this.included) {
            this.included = true;
            for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
                var declaration = _a[_i];
                // If node is a default export, it can save a tree-shaking run to include the full declaration now
                if (!declaration.included)
                    declaration.include();
                var node = declaration.parent;
                while (!node.included) {
                    // We do not want to properly include parents in case they are part of a dead branch
                    // in which case .include() might pull in more dead code
                    node.included = true;
                    if (node.type === Program)
                        break;
                    node = node.parent;
                }
            }
        }
    };
    LocalVariable.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length > MAX_PATH_DEPTH)
            return;
        if (!(this.isReassigned || this.deoptimizationTracker.track(this, path$$1))) {
            if (path$$1.length === 0) {
                if (!this.isReassigned) {
                    this.isReassigned = true;
                    for (var _i = 0, _a = this.expressionsToBeDeoptimized; _i < _a.length; _i++) {
                        var expression = _a[_i];
                        expression.deoptimizeCache();
                    }
                    if (this.init) {
                        this.init.deoptimizePath(UNKNOWN_PATH);
                    }
                }
            }
            else if (this.init) {
                this.init.deoptimizePath(path$$1);
            }
        }
    };
    return LocalVariable;
}(Variable));
LocalVariable.prototype.isLocal = true;

function isExportDefaultVariable(variable) {
    return variable.isDefault;
}
var ExportDefaultVariable = /** @class */ (function (_super) {
    __extends(ExportDefaultVariable, _super);
    function ExportDefaultVariable(name, exportDefaultDeclaration, deoptimizationTracker) {
        var _this = _super.call(this, name, exportDefaultDeclaration, exportDefaultDeclaration.declaration, deoptimizationTracker) || this;
        // Not initialised during construction
        _this.original = null;
        _this.hasId = !!exportDefaultDeclaration.declaration
            .id;
        return _this;
    }
    ExportDefaultVariable.prototype.addReference = function (identifier) {
        if (!this.hasId) {
            this.name = identifier.name;
            if (this.original !== null) {
                this.original.addReference(identifier);
            }
        }
    };
    ExportDefaultVariable.prototype.getName = function (reset) {
        if (!reset && this.safeName)
            return this.safeName;
        if (this.original !== null && !this.original.isReassigned)
            return this.original.getName();
        return this.name;
    };
    ExportDefaultVariable.prototype.referencesOriginal = function () {
        return this.original && !this.original.isReassigned;
    };
    ExportDefaultVariable.prototype.getOriginalVariableName = function () {
        return this.original && this.original.getName();
    };
    ExportDefaultVariable.prototype.setOriginalVariable = function (original) {
        this.original = original;
    };
    return ExportDefaultVariable;
}(LocalVariable));
ExportDefaultVariable.prototype.isDefault = true;

var pureFunctions = {};
var arrayTypes = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(' ');
var simdTypes = 'Int8x16 Int16x8 Int32x4 Float32x4 Float64x2'.split(' ');
var simdMethods = 'abs add and bool check div equal extractLane fromFloat32x4 fromFloat32x4Bits fromFloat64x2 fromFloat64x2Bits fromInt16x8Bits fromInt32x4 fromInt32x4Bits fromInt8x16Bits greaterThan greaterThanOrEqual lessThan lessThanOrEqual load max maxNum min minNum mul neg not notEqual or reciprocalApproximation reciprocalSqrtApproximation replaceLane select selectBits shiftLeftByScalar shiftRightArithmeticByScalar shiftRightLogicalByScalar shuffle splat sqrt store sub swizzle xor'.split(' ');
var allSimdMethods = [];
simdTypes.forEach(function (t) {
    simdMethods.forEach(function (m) {
        allSimdMethods.push("SIMD." + t + "." + m);
    });
});
[
    'Array.isArray',
    'Error',
    'EvalError',
    'InternalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'escape',
    'unescape',
    'Object',
    'Object.create',
    'Object.getNotifier',
    'Object.getOwn',
    'Object.getOwnPropertyDescriptor',
    'Object.getOwnPropertyNames',
    'Object.getOwnPropertySymbols',
    'Object.getPrototypeOf',
    'Object.is',
    'Object.isExtensible',
    'Object.isFrozen',
    'Object.isSealed',
    'Object.keys',
    'Boolean',
    'Number',
    'Number.isFinite',
    'Number.isInteger',
    'Number.isNaN',
    'Number.isSafeInteger',
    'Number.parseFloat',
    'Number.parseInt',
    'Symbol',
    'Symbol.for',
    'Symbol.keyFor',
    'Math.abs',
    'Math.acos',
    'Math.acosh',
    'Math.asin',
    'Math.asinh',
    'Math.atan',
    'Math.atan2',
    'Math.atanh',
    'Math.cbrt',
    'Math.ceil',
    'Math.clz32',
    'Math.cos',
    'Math.cosh',
    'Math.exp',
    'Math.expm1',
    'Math.floor',
    'Math.fround',
    'Math.hypot',
    'Math.imul',
    'Math.log',
    'Math.log10',
    'Math.log1p',
    'Math.log2',
    'Math.max',
    'Math.min',
    'Math.pow',
    'Math.random',
    'Math.round',
    'Math.sign',
    'Math.sin',
    'Math.sinh',
    'Math.sqrt',
    'Math.tan',
    'Math.tanh',
    'Math.trunc',
    'Date',
    'Date.UTC',
    'Date.now',
    'Date.parse',
    'String',
    'String.fromCharCode',
    'String.fromCodePoint',
    'String.raw',
    'RegExp',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'ArrayBuffer',
    'ArrayBuffer.isView',
    'DataView',
    'Promise.all',
    'Promise.race',
    'Promise.resolve',
    'Intl.Collator',
    'Intl.Collator.supportedLocalesOf',
    'Intl.DateTimeFormat',
    'Intl.DateTimeFormat.supportedLocalesOf',
    'Intl.NumberFormat',
    'Intl.NumberFormat.supportedLocalesOf'
    // TODO properties of e.g. window...
]
    .concat(arrayTypes, arrayTypes.map(function (t) { return t + ".from"; }), arrayTypes.map(function (t) { return t + ".of"; }), simdTypes.map(function (t) { return "SIMD." + t; }), allSimdMethods)
    .forEach(function (name) { return (pureFunctions[name] = true); });

var GlobalVariable = /** @class */ (function (_super) {
    __extends(GlobalVariable, _super);
    function GlobalVariable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.included = true;
        return _this;
    }
    GlobalVariable.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        // path.length == 0 can also have an effect but we postpone this for now
        return (path$$1.length > 0 &&
            !this.isPureFunctionMember(path$$1) &&
            !(this.name === 'Reflect' && path$$1.length === 1));
    };
    GlobalVariable.prototype.hasEffectsWhenCalledAtPath = function (path$$1) {
        return !pureFunctions[[this.name].concat(path$$1).join('.')];
    };
    GlobalVariable.prototype.isPureFunctionMember = function (path$$1) {
        return (pureFunctions[[this.name].concat(path$$1).join('.')] ||
            (path$$1.length >= 1 && pureFunctions[[this.name].concat(path$$1.slice(0, -1)).join('.')]) ||
            (path$$1.length >= 2 &&
                pureFunctions[[this.name].concat(path$$1.slice(0, -2)).join('.')] &&
                path$$1[path$$1.length - 2] === 'prototype'));
    };
    return GlobalVariable;
}(Variable));

var ExternalVariable = /** @class */ (function (_super) {
    __extends(ExternalVariable, _super);
    function ExternalVariable(module, name) {
        var _this = _super.call(this, name) || this;
        _this.module = module;
        _this.isNamespace = name === '*';
        _this.referenced = false;
        return _this;
    }
    ExternalVariable.prototype.addReference = function (identifier) {
        this.referenced = true;
        if (this.name === 'default' || this.name === '*') {
            this.module.suggestName(identifier.name);
        }
    };
    ExternalVariable.prototype.include = function () {
        if (!this.included) {
            this.included = true;
            this.module.used = true;
        }
    };
    return ExternalVariable;
}(Variable));
ExternalVariable.prototype.isExternal = true;

var reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'.split(' ');
var builtins = 'Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'.split(' ');
var blacklisted = Object.create(null);
reservedWords.concat(builtins).forEach(function (word) { return (blacklisted[word] = true); });
var illegalCharacters = /[^$_a-zA-Z0-9]/g;
var startsWithDigit = function (str) { return /\d/.test(str[0]); };
function isLegal(str) {
    if (startsWithDigit(str) || blacklisted[str]) {
        return false;
    }
    return !illegalCharacters.test(str);
}
function makeLegal(str) {
    str = str.replace(/-(\w)/g, function (_, letter) { return letter.toUpperCase(); }).replace(illegalCharacters, '_');
    if (startsWithDigit(str) || blacklisted[str])
        str = "_" + str;
    return str;
}

var absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
var relativePath = /^\.?\.\//;
function isAbsolute(path$$1) {
    return absolutePath.test(path$$1);
}
function isRelative(path$$1) {
    return relativePath.test(path$$1);
}
function normalize(path$$1) {
    if (path$$1.indexOf('\\') == -1)
        return path$$1;
    return path$$1.replace(/\\/g, '/');
}

var ExternalModule = /** @class */ (function () {
    function ExternalModule(_a) {
        var graph = _a.graph, id = _a.id;
        this.exportsNames = false;
        this.exportsNamespace = false;
        this.renderPath = undefined;
        this.renormalizeRenderPath = false;
        this.isExternal = true;
        this.isEntryPoint = false;
        this.mostCommonSuggestion = 0;
        this.reexported = false;
        this.used = false;
        this.execIndex = undefined;
        this.graph = graph;
        this.id = id;
        var parts = id.split(/[\\/]/);
        this.name = makeLegal(parts.pop());
        this.nameSuggestions = Object.create(null);
        this.declarations = Object.create(null);
        this.exportedVariables = new Map();
    }
    ExternalModule.prototype.setRenderPath = function (options, inputBase) {
        if (options.paths)
            this.renderPath =
                typeof options.paths === 'function' ? options.paths(this.id) : options.paths[this.id];
        if (!this.renderPath) {
            if (!isAbsolute(this.id)) {
                this.renderPath = this.id;
            }
            else {
                this.renderPath = normalize(relative(inputBase, this.id));
                this.renormalizeRenderPath = true;
            }
        }
        return this.renderPath;
    };
    ExternalModule.prototype.suggestName = function (name) {
        if (!this.nameSuggestions[name])
            this.nameSuggestions[name] = 0;
        this.nameSuggestions[name] += 1;
        if (this.nameSuggestions[name] > this.mostCommonSuggestion) {
            this.mostCommonSuggestion = this.nameSuggestions[name];
            this.name = name;
        }
    };
    ExternalModule.prototype.warnUnusedImports = function () {
        var _this = this;
        var unused = Object.keys(this.declarations).filter(function (name) {
            if (name === '*')
                return false;
            var declaration = _this.declarations[name];
            return !declaration.included && !_this.reexported && !declaration.referenced;
        });
        if (unused.length === 0)
            return;
        var names = unused.length === 1
            ? "'" + unused[0] + "' is"
            : unused
                .slice(0, -1)
                .map(function (name) { return "'" + name + "'"; })
                .join(', ') + " and '" + unused.slice(-1) + "' are";
        this.graph.warn({
            code: 'UNUSED_EXTERNAL_IMPORT',
            source: this.id,
            names: unused,
            message: names + " imported from external module '" + this.id + "' but never used"
        });
    };
    ExternalModule.prototype.traceExport = function (name, _isExportAllSearch) {
        if (name !== 'default' && name !== '*')
            this.exportsNames = true;
        if (name === '*')
            this.exportsNamespace = true;
        var declaration = this.declarations[name];
        if (declaration)
            return declaration;
        this.declarations[name] = declaration = new ExternalVariable(this, name);
        this.exportedVariables.set(declaration, name);
        return declaration;
    };
    return ExternalModule;
}());

var esModuleExport = "Object.defineProperty(exports, '__esModule', { value: true });";
var compactEsModuleExport = "Object.defineProperty(exports,'__esModule',{value:true});";

function getExportBlock(exports, dependencies, namedExportsMode, interop, compact, mechanism) {
    if (mechanism === void 0) { mechanism = 'return '; }
    var _ = compact ? '' : ' ';
    if (!namedExportsMode) {
        var local_1;
        exports.some(function (expt) {
            if (expt.exported === 'default') {
                local_1 = expt.local;
                return true;
            }
            return false;
        });
        // search for reexported default otherwise
        if (!local_1) {
            dependencies.some(function (dep) {
                if (!dep.reexports)
                    return false;
                return dep.reexports.some(function (expt) {
                    if (expt.reexported === 'default') {
                        local_1 = dep.namedExportsMode ? dep.name + "." + expt.imported : dep.name;
                        return true;
                    }
                    return false;
                });
            });
        }
        return "" + mechanism + local_1 + ";";
    }
    var exportBlock = '';
    // star exports must always output first for precedence
    dependencies.forEach(function (_a) {
        var name = _a.name, reexports = _a.reexports;
        if (reexports && namedExportsMode) {
            reexports.forEach(function (specifier) {
                if (specifier.reexported === '*') {
                    if (!compact && exportBlock)
                        exportBlock += '\n';
                    exportBlock += "Object.keys(" + name + ").forEach(function" + _ + "(key)" + _ + "{" + _ + "exports[key]" + _ + "=" + _ + name + "[key];" + _ + "});";
                }
            });
        }
    });
    dependencies.forEach(function (_a) {
        var name = _a.name, imports = _a.imports, reexports = _a.reexports, isChunk = _a.isChunk;
        if (reexports && namedExportsMode) {
            reexports.forEach(function (specifier) {
                if (specifier.imported === 'default' && !isChunk) {
                    var exportsNamesOrNamespace = (imports &&
                        imports.some(function (specifier) { return specifier.imported === '*' || specifier.imported !== 'default'; })) ||
                        (reexports &&
                            reexports.some(function (specifier) { return specifier.imported !== 'default' && specifier.imported !== '*'; }));
                    if (exportBlock && !compact)
                        exportBlock += '\n';
                    if (exportsNamesOrNamespace)
                        exportBlock += "exports." + specifier.reexported + _ + "=" + _ + name + (interop !== false ? '__default' : '.default') + ";";
                    else
                        exportBlock += "exports." + specifier.reexported + _ + "=" + _ + name + ";";
                }
                else if (specifier.imported !== '*') {
                    if (exportBlock && !compact)
                        exportBlock += '\n';
                    exportBlock += "exports." + specifier.reexported + _ + "=" + _ + name + "." + specifier.imported + ";";
                }
                else if (specifier.reexported !== '*') {
                    if (exportBlock && !compact)
                        exportBlock += '\n';
                    exportBlock += "exports." + specifier.reexported + _ + "=" + _ + name + ";";
                }
            });
        }
    });
    exports.forEach(function (expt) {
        var lhs = "exports." + expt.exported;
        var rhs = expt.local;
        if (lhs === rhs) {
            return;
        }
        if (exportBlock && !compact)
            exportBlock += '\n';
        exportBlock += "" + lhs + _ + "=" + _ + rhs + ";";
    });
    return exportBlock;
}

function getInteropBlock(dependencies, options, varOrConst) {
    return dependencies
        .map(function (_a) {
        var name = _a.name, exportsNames = _a.exportsNames, exportsDefault = _a.exportsDefault, namedExportsMode = _a.namedExportsMode;
        if (!namedExportsMode)
            return;
        if (!exportsDefault || options.interop === false)
            return null;
        if (exportsNames) {
            if (options.compact)
                return varOrConst + " " + name + "__default='default'in " + name + "?" + name + "['default']:" + name + ";";
            return varOrConst + " " + name + "__default = 'default' in " + name + " ? " + name + "['default'] : " + name + ";";
        }
        if (options.compact)
            return name + "=" + name + "&&" + name + ".hasOwnProperty('default')?" + name + "['default']:" + name + ";";
        return name + " = " + name + " && " + name + ".hasOwnProperty('default') ? " + name + "['default'] : " + name + ";";
    })
        .filter(Boolean)
        .join(options.compact ? '' : '\n');
}

var builtins$1 = {
    process: true,
    events: true,
    stream: true,
    util: true,
    path: true,
    buffer: true,
    querystring: true,
    url: true,
    string_decoder: true,
    punycode: true,
    http: true,
    https: true,
    os: true,
    assert: true,
    constants: true,
    timers: true,
    console: true,
    vm: true,
    zlib: true,
    tty: true,
    domain: true
};
// Creating a browser chunk that depends on Node.js built-in modules ('util'). You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins
function warnOnBuiltins(graph, dependencies) {
    var externalBuiltins = dependencies.map(function (_a) {
        var id = _a.id;
        return id;
    }).filter(function (id) { return id in builtins$1; });
    if (!externalBuiltins.length)
        return;
    var detail = externalBuiltins.length === 1
        ? "module ('" + externalBuiltins[0] + "')"
        : "modules (" + externalBuiltins
            .slice(0, -1)
            .map(function (name) { return "'" + name + "'"; })
            .join(', ') + " and '" + externalBuiltins.slice(-1) + "')";
    graph.warn({
        code: 'MISSING_NODE_BUILTINS',
        modules: externalBuiltins,
        message: "Creating a browser bundle that depends on Node.js built-in " + detail + ". You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins"
    });
}

function amd(magicString, _a, options) {
    var graph = _a.graph, namedExportsMode = _a.namedExportsMode, hasExports = _a.hasExports, indentString = _a.indentString, intro = _a.intro, outro = _a.outro, dynamicImport = _a.dynamicImport, needsAmdModule = _a.needsAmdModule, dependencies = _a.dependencies, exports = _a.exports, isEntryModuleFacade = _a.isEntryModuleFacade;
    warnOnBuiltins(graph, dependencies);
    var deps = dependencies.map(function (m) { return "'" + m.id + "'"; });
    var args = dependencies.map(function (m) { return m.name; });
    var n = options.compact ? '' : '\n';
    var _ = options.compact ? '' : ' ';
    if (namedExportsMode && hasExports) {
        args.unshift("exports");
        deps.unshift("'exports'");
    }
    if (dynamicImport) {
        args.unshift('require');
        deps.unshift("'require'");
    }
    if (needsAmdModule) {
        args.unshift('module');
        deps.unshift("'module'");
    }
    var amdOptions = options.amd || {};
    var params = (amdOptions.id ? "'" + amdOptions.id + "'," + _ : "") +
        (deps.length ? "[" + deps.join("," + _) + "]," + _ : "");
    var useStrict = options.strict !== false ? _ + "'use strict';" : "";
    var define = amdOptions.define || 'define';
    var wrapperStart = define + "(" + params + "function" + _ + "(" + args.join("," + _) + ")" + _ + "{" + useStrict + n + n;
    // var foo__default = 'default' in foo ? foo['default'] : foo;
    var interopBlock = getInteropBlock(dependencies, options, graph.varOrConst);
    if (interopBlock)
        magicString.prepend(interopBlock + n + n);
    if (intro)
        magicString.prepend(intro);
    var exportBlock = getExportBlock(exports, dependencies, namedExportsMode, options.interop, options.compact);
    if (exportBlock)
        magicString.append(n + n + exportBlock);
    if (namedExportsMode && hasExports && isEntryModuleFacade && options.esModule)
        magicString.append("" + n + n + (options.compact ? compactEsModuleExport : esModuleExport));
    if (outro)
        magicString.append(outro);
    return magicString
        .indent(indentString)
        .append(n + n + '});')
        .prepend(wrapperStart);
}

function cjs(magicString, _a, options) {
    var graph = _a.graph, isEntryModuleFacade = _a.isEntryModuleFacade, namedExportsMode = _a.namedExportsMode, hasExports = _a.hasExports, intro = _a.intro, outro = _a.outro, dependencies = _a.dependencies, exports = _a.exports;
    var n = options.compact ? '' : '\n';
    var _ = options.compact ? '' : ' ';
    intro =
        (options.strict === false ? intro : "'use strict';" + n + n + intro) +
            (namedExportsMode && hasExports && isEntryModuleFacade && options.esModule
                ? "" + (options.compact ? compactEsModuleExport : esModuleExport) + n + n
                : '');
    var needsInterop = false;
    var varOrConst = graph.varOrConst;
    var interop = options.interop !== false;
    var importBlock;
    if (options.compact) {
        var definingVariable_1 = false;
        importBlock = '';
        dependencies.forEach(function (_a) {
            var id = _a.id, namedExportsMode = _a.namedExportsMode, isChunk = _a.isChunk, name = _a.name, reexports = _a.reexports, imports = _a.imports, exportsNames = _a.exportsNames, exportsDefault = _a.exportsDefault;
            if (!reexports && !imports) {
                importBlock += definingVariable_1 ? ';' : ',';
                definingVariable_1 = false;
                importBlock += "require('" + id + "')";
            }
            else {
                importBlock += definingVariable_1 ? ',' : "" + (importBlock ? ';' : '') + varOrConst + " ";
                definingVariable_1 = true;
                if (!interop || isChunk || !exportsDefault || !namedExportsMode) {
                    importBlock += name + "=require('" + id + "')";
                }
                else {
                    needsInterop = true;
                    if (exportsNames)
                        importBlock += name + "=require('" + id + "')," + name + "__default=_interopDefault(" + name + ")";
                    else
                        importBlock += name + "=_interopDefault(require('" + id + "'))";
                }
            }
        });
        if (importBlock.length)
            importBlock += ';';
    }
    else {
        importBlock = dependencies
            .map(function (_a) {
            var id = _a.id, namedExportsMode = _a.namedExportsMode, isChunk = _a.isChunk, name = _a.name, reexports = _a.reexports, imports = _a.imports, exportsNames = _a.exportsNames, exportsDefault = _a.exportsDefault;
            if (!reexports && !imports)
                return "require('" + id + "');";
            if (!interop || isChunk || !exportsDefault || !namedExportsMode)
                return varOrConst + " " + name + " = require('" + id + "');";
            needsInterop = true;
            if (exportsNames)
                return (varOrConst + " " + name + " = require('" + id + "');" +
                    ("\n" + varOrConst + " " + name + "__default = _interopDefault(" + name + ");"));
            return varOrConst + " " + name + " = _interopDefault(require('" + id + "'));";
        })
            .join('\n');
    }
    if (needsInterop) {
        if (options.compact)
            intro += "function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}";
        else
            intro += "function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\n";
    }
    if (importBlock)
        intro += importBlock + n + n;
    var exportBlock = getExportBlock(exports, dependencies, namedExportsMode, options.interop, options.compact, "module.exports" + _ + "=" + _);
    magicString.prepend(intro);
    if (exportBlock)
        magicString.append(n + n + exportBlock);
    if (outro)
        magicString.append(outro);
    return magicString;
}

function esm(magicString, _a, options) {
    var intro = _a.intro, outro = _a.outro, dependencies = _a.dependencies, exports = _a.exports;
    var _ = options.compact ? '' : ' ';
    var n = options.compact ? '' : '\n';
    var importBlock = dependencies
        .map(function (_a) {
        var id = _a.id, reexports = _a.reexports, imports = _a.imports, name = _a.name;
        if (!reexports && !imports) {
            return "import" + _ + "'" + id + "';";
        }
        var output = '';
        if (imports) {
            var defaultImport_1 = imports.find(function (specifier) { return specifier.imported === 'default'; });
            var starImport_1 = imports.find(function (specifier) { return specifier.imported === '*'; });
            if (starImport_1) {
                output += "import" + _ + "*" + _ + "as " + starImport_1.local + " from" + _ + "'" + id + "';";
                if (imports.length > 1)
                    output += n;
            }
            if (defaultImport_1 && imports.length === 1) {
                output += "import " + defaultImport_1.local + " from" + _ + "'" + id + "';";
            }
            else if (!starImport_1 || imports.length > 1) {
                output += "import " + (defaultImport_1 ? defaultImport_1.local + "," + _ : '') + "{" + _ + imports
                    .filter(function (specifier) { return specifier !== defaultImport_1 && specifier !== starImport_1; })
                    .map(function (specifier) {
                    if (specifier.imported === specifier.local) {
                        return specifier.imported;
                    }
                    else {
                        return specifier.imported + " as " + specifier.local;
                    }
                })
                    .join("," + _) + _ + "}" + _ + "from" + _ + "'" + id + "';";
            }
        }
        if (reexports) {
            if (imports)
                output += n;
            var starExport_1 = reexports.find(function (specifier) { return specifier.reexported === '*'; });
            var namespaceReexport_1 = reexports.find(function (specifier) { return specifier.imported === '*' && specifier.reexported !== '*'; });
            if (starExport_1) {
                output += "export" + _ + "*" + _ + "from" + _ + "'" + id + "';";
                if (reexports.length === 1) {
                    return output;
                }
                output += n;
            }
            if (namespaceReexport_1) {
                if (!imports ||
                    !imports.some(function (specifier) { return specifier.imported === '*' && specifier.local === name; }))
                    output += "import" + _ + "*" + _ + "as " + name + " from" + _ + "'" + id + "';" + n;
                output += "export" + _ + "{" + _ + (name === namespaceReexport_1.reexported
                    ? name
                    : name + " as " + namespaceReexport_1.reexported) + " };";
                if (reexports.length === (starExport_1 ? 2 : 1)) {
                    return output;
                }
                output += n;
            }
            output += "export" + _ + "{" + _ + reexports
                .filter(function (specifier) { return specifier !== starExport_1 && specifier !== namespaceReexport_1; })
                .map(function (specifier) {
                if (specifier.imported === specifier.reexported) {
                    return specifier.imported;
                }
                else {
                    return specifier.imported + " as " + specifier.reexported;
                }
            })
                .join("," + _) + _ + "}" + _ + "from" + _ + "'" + id + "';";
        }
        return output;
    })
        .join(n);
    if (importBlock)
        intro += importBlock + n + n;
    if (intro)
        magicString.prepend(intro);
    var exportBlock = [];
    var exportDeclaration = [];
    exports.forEach(function (specifier) {
        if (specifier.exported === 'default') {
            exportBlock.push("export default " + specifier.local + ";");
        }
        else {
            exportDeclaration.push(specifier.exported === specifier.local
                ? specifier.local
                : specifier.local + " as " + specifier.exported);
        }
    });
    if (exportDeclaration.length) {
        exportBlock.push("export" + _ + "{" + _ + exportDeclaration.join("," + _) + _ + "};");
    }
    if (exportBlock.length)
        magicString.append(n + n + exportBlock.join(n).trim());
    if (outro)
        magicString.append(outro);
    return magicString.trim();
}

function getLocator$1(source, options) {
    if (options === void 0) { options = {}; }
    var offsetLine = options.offsetLine || 0;
    var offsetColumn = options.offsetColumn || 0;
    var originalLines = source.split('\n');
    var start = 0;
    var lineRanges = originalLines.map(function (line, i) {
        var end = start + line.length + 1;
        var range = { start: start, end: end, line: i };
        start = end;
        return range;
    });
    var i = 0;
    function rangeContains(range, index) {
        return range.start <= index && index < range.end;
    }
    function getLocation(range, index) {
        return { line: offsetLine + range.line, column: offsetColumn + index - range.start, character: index };
    }
    function locate(search, startIndex) {
        if (typeof search === 'string') {
            search = source.indexOf(search, startIndex || 0);
        }
        var range = lineRanges[i];
        var d = search >= range.end ? 1 : -1;
        while (range) {
            if (rangeContains(range, search))
                return getLocation(range, search);
            i += d;
            range = lineRanges[i];
        }
    }
    return locate;
}
function locate(source, search, options) {
    if (typeof options === 'number') {
        throw new Error('locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument');
    }
    return getLocator$1(source, options)(search, options && options.startIndex);
}

function spaces(i) {
    var result = '';
    while (i--)
        result += ' ';
    return result;
}
function tabsToSpaces(str) {
    return str.replace(/^\t+/, function (match) { return match.split('\t').join('  '); });
}
function getCodeFrame(source, line, column) {
    var lines = source.split('\n');
    var frameStart = Math.max(0, line - 3);
    var frameEnd = Math.min(line + 2, lines.length);
    lines = lines.slice(frameStart, frameEnd);
    while (!/\S/.test(lines[lines.length - 1])) {
        lines.pop();
        frameEnd -= 1;
    }
    var digits = String(frameEnd).length;
    return lines
        .map(function (str, i) {
        var isErrorLine = frameStart + i + 1 === line;
        var lineNum = String(i + frameStart + 1);
        while (lineNum.length < digits)
            lineNum = " " + lineNum;
        if (isErrorLine) {
            var indicator = spaces(digits + 2 + tabsToSpaces(str.slice(0, column)).length) + '^';
            return lineNum + ": " + tabsToSpaces(str) + "\n" + indicator;
        }
        return lineNum + ": " + tabsToSpaces(str);
    })
        .join('\n');
}

function error(base, props) {
    if (base instanceof Error === false)
        base = Object.assign(new Error(base.message), base);
    if (props)
        Object.assign(base, props);
    throw base;
}
function augmentCodeLocation(object, pos, source, id) {
    if (pos.line !== undefined && pos.column !== undefined) {
        var line = pos.line, column = pos.column;
        object.loc = { file: id, line: line, column: column };
    }
    else {
        object.pos = pos;
        var _a = locate(source, pos, { offsetLine: 1 }), line = _a.line, column = _a.column;
        object.loc = { file: id, line: line, column: column };
    }
    if (object.frame === undefined) {
        var _b = object.loc, line = _b.line, column = _b.column;
        object.frame = getCodeFrame(source, line, column);
    }
}

// Generate strings which dereference dotted properties, but use array notation `['prop-deref']`
// if the property name isn't trivial
var shouldUseDot = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/;
function property(prop) {
    return shouldUseDot.test(prop) ? "." + prop : "['" + prop + "']";
}
function keypath(keypath) {
    return keypath
        .split('.')
        .map(property)
        .join('');
}

function setupNamespace(name, root, forAssignment, globals, compact) {
    var parts = name.split('.');
    if (globals) {
        parts[0] = (typeof globals === 'function' ? globals(parts[0]) : globals[parts[0]]) || parts[0];
    }
    var _ = compact ? '' : ' ';
    var last = parts.pop();
    var acc = root;
    if (forAssignment) {
        return parts
            .map(function (part) { return ((acc += property(part)), "" + acc + _ + "=" + _ + acc + _ + "||" + _ + "{}"); })
            .concat("" + acc + property(last))
            .join("," + _);
    }
    else {
        return (parts
            .map(function (part) { return ((acc += property(part)), "" + acc + _ + "=" + _ + acc + _ + "||" + _ + "{}" + (compact ? '' : ';')); })
            .join(compact ? ',' : '\n') + (compact && parts.length ? ';' : '\n'));
    }
}

function trimEmptyImports(dependencies) {
    var i = dependencies.length;
    while (i--) {
        var dependency = dependencies[i];
        if (dependency.exportsDefault || dependency.exportsNames) {
            return dependencies.slice(0, i + 1);
        }
    }
    return [];
}

var thisProp = function (name) { return "this" + keypath(name); };
function iife(magicString, _a, options) {
    var graph = _a.graph, namedExportsMode = _a.namedExportsMode, hasExports = _a.hasExports, t = _a.indentString, intro = _a.intro, outro = _a.outro, dependencies = _a.dependencies, exports = _a.exports;
    var _ = options.compact ? '' : ' ';
    var n = options.compact ? '' : '\n';
    var extend = options.extend, name = options.name;
    var isNamespaced = name && name.indexOf('.') !== -1;
    var possibleVariableAssignment = !extend && !isNamespaced;
    if (name && possibleVariableAssignment && !isLegal(name)) {
        error({
            code: 'ILLEGAL_IDENTIFIER_AS_NAME',
            message: "Given name (" + name + ") is not legal JS identifier. If you need this you can try --extend option"
        });
    }
    warnOnBuiltins(graph, dependencies);
    var external = trimEmptyImports(dependencies);
    var deps = external.map(function (dep) { return dep.globalName || 'null'; });
    var args = external.map(function (m) { return m.name; });
    if (hasExports && !name) {
        error({
            code: 'INVALID_OPTION',
            message: "You must supply output.name for IIFE bundles"
        });
    }
    if (extend) {
        deps.unshift("(" + thisProp(name) + _ + "=" + _ + thisProp(name) + _ + "||" + _ + "{})");
        args.unshift('exports');
    }
    else if (namedExportsMode && hasExports) {
        deps.unshift('{}');
        args.unshift('exports');
    }
    var useStrict = options.strict !== false ? t + "'use strict';" + n + n : "";
    var wrapperIntro = "(function" + _ + "(" + args + ")" + _ + "{" + n + useStrict;
    if (hasExports && !extend) {
        wrapperIntro =
            (isNamespaced ? thisProp(name) : graph.varOrConst + " " + name) + (_ + "=" + _ + wrapperIntro);
    }
    if (isNamespaced) {
        wrapperIntro =
            setupNamespace(name, 'this', false, options.globals, options.compact) + wrapperIntro;
    }
    var wrapperOutro = "" + n + n + "}(" + deps + "));";
    if (!extend && namedExportsMode && hasExports) {
        wrapperOutro = "" + n + n + t + "return exports;" + wrapperOutro;
    }
    // var foo__default = 'default' in foo ? foo['default'] : foo;
    var interopBlock = getInteropBlock(dependencies, options, graph.varOrConst);
    if (interopBlock)
        magicString.prepend(interopBlock + n + n);
    if (intro)
        magicString.prepend(intro);
    var exportBlock = getExportBlock(exports, dependencies, namedExportsMode, options.interop, options.compact);
    if (exportBlock)
        magicString.append(n + n + exportBlock);
    if (outro)
        magicString.append(outro);
    return magicString
        .indent(t)
        .prepend(wrapperIntro)
        .append(wrapperOutro);
}

function getStarExcludes(_a) {
    var dependencies = _a.dependencies, exports = _a.exports;
    var starExcludes = new Set(exports.map(function (expt) { return expt.exported; }));
    if (!starExcludes.has('default'))
        starExcludes.add('default');
    // also include reexport names
    dependencies.forEach(function (_a) {
        var reexports = _a.reexports;
        if (reexports)
            reexports.forEach(function (reexport) {
                if (reexport.imported !== '*' && !starExcludes.has(reexport.reexported))
                    starExcludes.add(reexport.reexported);
            });
    });
    return starExcludes;
}
function system(magicString, _a, options) {
    var graph = _a.graph, t = _a.indentString, intro = _a.intro, outro = _a.outro, dependencies = _a.dependencies, exports = _a.exports, usesTopLevelAwait = _a.usesTopLevelAwait;
    var n = options.compact ? '' : '\n';
    var _ = options.compact ? '' : ' ';
    var dependencyIds = dependencies.map(function (m) { return "'" + m.id + "'"; });
    var importBindings = [];
    var starExcludes;
    var setters = [];
    var varOrConst = graph.varOrConst;
    dependencies.forEach(function (_a) {
        var imports = _a.imports, reexports = _a.reexports;
        var setter = [];
        if (imports) {
            imports.forEach(function (specifier) {
                importBindings.push(specifier.local);
                if (specifier.imported === '*') {
                    setter.push("" + specifier.local + _ + "=" + _ + "module;");
                }
                else {
                    setter.push("" + specifier.local + _ + "=" + _ + "module." + specifier.imported + ";");
                }
            });
        }
        if (reexports) {
            var createdSetter_1 = false;
            // bulk-reexport form
            if (reexports.length > 1 ||
                (reexports.length === 1 &&
                    (reexports[0].reexported === '*' || reexports[0].imported === '*'))) {
                // star reexports
                reexports.forEach(function (specifier) {
                    if (specifier.reexported !== '*')
                        return;
                    // need own exports list for deduping in star export case
                    if (!starExcludes) {
                        starExcludes = getStarExcludes({ dependencies: dependencies, exports: exports });
                    }
                    if (!createdSetter_1) {
                        setter.push(varOrConst + " _setter" + _ + "=" + _ + "{};");
                        createdSetter_1 = true;
                    }
                    setter.push("for" + _ + "(var _$p" + _ + "in" + _ + "module)" + _ + "{");
                    setter.push(t + "if" + _ + "(!_starExcludes[_$p])" + _ + "_setter[_$p]" + _ + "=" + _ + "module[_$p];");
                    setter.push('}');
                });
                // star import reexport
                reexports.forEach(function (specifier) {
                    if (specifier.imported !== '*' || specifier.reexported === '*')
                        return;
                    setter.push("exports('" + specifier.reexported + "'," + _ + "module);");
                });
                // reexports
                reexports.forEach(function (specifier) {
                    if (specifier.reexported === '*' || specifier.imported === '*')
                        return;
                    if (!createdSetter_1) {
                        setter.push(varOrConst + " _setter" + _ + "=" + _ + "{};");
                        createdSetter_1 = true;
                    }
                    setter.push("_setter." + specifier.reexported + _ + "=" + _ + "module." + specifier.imported + ";");
                });
                if (createdSetter_1) {
                    setter.push('exports(_setter);');
                }
            }
            else {
                // single reexport
                reexports.forEach(function (specifier) {
                    setter.push("exports('" + specifier.reexported + "'," + _ + "module." + specifier.imported + ");");
                });
            }
        }
        setters.push(setter.join("" + n + t + t + t));
    });
    // function declarations hoist
    var hoistedExports = [];
    var hoistedExportObjs = exports.filter(function (expt) { return expt.hoisted || expt.uninitialized; });
    if (hoistedExportObjs.length === 1) {
        var expt = hoistedExportObjs[0];
        hoistedExports.push("exports('" + expt.exported + "'," + _ + (expt.uninitialized ? 'void 0' : expt.local) + ");");
    }
    else if (hoistedExportObjs.length > 1) {
        hoistedExports.push("exports({");
        for (var i = 0; i < hoistedExportObjs.length; i++) {
            var expt = hoistedExportObjs[i];
            hoistedExports.push("" + t + expt.exported + ":" + _ + (expt.uninitialized ? 'void 0' : expt.local) + (i === hoistedExportObjs.length - 1 ? '' : ','));
        }
        hoistedExports.push("});");
    }
    var starExcludesSection = !starExcludes
        ? ''
        : "" + n + t + varOrConst + " _starExcludes" + _ + "=" + _ + "{" + _ + Array.from(starExcludes).join(":" + _ + "1," + _) + (starExcludes.size ? ":" + _ + "1" : '') + _ + "};";
    var importBindingsSection = importBindings.length
        ? "" + n + t + "var " + importBindings.join("," + _) + ";"
        : '';
    var registeredName = options.name ? "'" + options.name + "'," + _ : '';
    var wrapperStart = "System.register(" + registeredName + "[" + dependencyIds.join("," + _) + "]," + _ + "function" + _ + "(exports," + _ + "module)" + _ + "{" + n;
    wrapperStart += t + "'use strict';" + starExcludesSection + importBindingsSection + n;
    wrapperStart += t + "return" + _ + "{" + (setters.length
        ? "" + n + t + t + "setters:" + _ + "[" + setters
            .map(function (s) {
            return s
                ? "function" + _ + "(module)" + _ + "{" + n + t + t + t + s + n + t + t + "}"
                : "function" + _ + "()" + _ + "{}";
        })
            .join("," + _) + "],"
        : '') + n;
    wrapperStart += "" + t + t + "execute:" + _ + (usesTopLevelAwait ? "async" + _ : '') + "function" + _ + "()" + _ + "{" + n + n;
    if (hoistedExports.length)
        wrapperStart += "" + t + t + t + hoistedExports.join("" + n + t + t + t) + n + n;
    var wrapperEnd = "" + n + n + t + t + "}";
    wrapperEnd += "" + n + t + "}" + (options.compact ? '' : ';');
    wrapperEnd += n + "});";
    if (intro)
        magicString.prepend(intro);
    if (outro)
        magicString.append(outro);
    return magicString
        .indent("" + t + t + t)
        .append(wrapperEnd)
        .prepend(wrapperStart);
}

function globalProp(name) {
    if (!name)
        return 'null';
    return "global" + keypath(name);
}
function safeAccess(name, compact) {
    var parts = name.split('.');
    var acc = 'global';
    return parts.map(function (part) { return ((acc += property(part)), acc); }).join(compact ? '&&' : " && ");
}
function umd(magicString, _a, options) {
    var graph = _a.graph, namedExportsMode = _a.namedExportsMode, hasExports = _a.hasExports, t = _a.indentString, intro = _a.intro, outro = _a.outro, dependencies = _a.dependencies, exports = _a.exports;
    var _ = options.compact ? '' : ' ';
    var n = options.compact ? '' : '\n';
    var wrapperOutro = n + n + '})));';
    if (hasExports && !options.name) {
        error({
            code: 'INVALID_OPTION',
            message: 'You must supply output.name for UMD bundles'
        });
    }
    warnOnBuiltins(graph, dependencies);
    var amdDeps = dependencies.map(function (m) { return "'" + m.id + "'"; });
    var cjsDeps = dependencies.map(function (m) { return "require('" + m.id + "')"; });
    var trimmed = trimEmptyImports(dependencies);
    var globalDeps = trimmed.map(function (module) { return globalProp(module.globalName); });
    var args = trimmed.map(function (m) { return m.name; });
    if (namedExportsMode && hasExports) {
        amdDeps.unshift("'exports'");
        cjsDeps.unshift("exports");
        globalDeps.unshift("(" + setupNamespace(options.name, 'global', true, options.globals, options.compact) + _ + "=" + _ + (options.extend ? "" + globalProp(options.name) + _ + "||" + _ : '') + "{})");
        args.unshift('exports');
    }
    var amdOptions = options.amd || {};
    var amdParams = (amdOptions.id ? "'" + amdOptions.id + "'," + _ : "") +
        (amdDeps.length ? "[" + amdDeps.join("," + _) + "]," + _ : "");
    var define = amdOptions.define || 'define';
    var cjsExport = !namedExportsMode && hasExports ? "module.exports" + _ + "=" + _ : "";
    var defaultExport = !namedExportsMode && hasExports
        ? "" + setupNamespace(options.name, 'global', true, options.globals, options.compact) + _ + "=" + _
        : '';
    var useStrict = options.strict !== false ? _ + "'use strict';" + n : "";
    var globalExport;
    if (options.noConflict === true) {
        var factory = void 0;
        if (!namedExportsMode && hasExports) {
            factory = "var exports" + _ + "=" + _ + "factory(" + globalDeps + ");";
        }
        else if (namedExportsMode) {
            var module = globalDeps.shift();
            factory = "var exports" + _ + "=" + _ + module + ";" + n;
            factory += "" + t + t + "factory(" + ['exports'].concat(globalDeps) + ");";
        }
        globalExport = "(function()" + _ + "{" + n;
        globalExport += "" + t + t + "var current" + _ + "=" + _ + safeAccess(options.name, options.compact) + ";" + n;
        globalExport += "" + t + t + factory + n;
        globalExport += "" + t + t + globalProp(options.name) + _ + "=" + _ + "exports;" + n;
        globalExport += "" + t + t + "exports.noConflict" + _ + "=" + _ + "function()" + _ + "{" + _;
        globalExport += "" + globalProp(options.name) + _ + "=" + _ + "current;" + _ + "return exports" + (options.compact ? '' : '; ') + "};" + n;
        globalExport += t + "})()";
    }
    else {
        globalExport = "(" + defaultExport + "factory(" + globalDeps + "))";
    }
    var wrapperIntro = "(function" + _ + "(global," + _ + "factory)" + _ + "{" + n;
    wrapperIntro += t + "typeof exports" + _ + "===" + _ + "'object'" + _ + "&&" + _ + "typeof module" + _ + "!==" + _ + "'undefined'" + _ + "?";
    wrapperIntro += "" + _ + cjsExport + "factory(" + cjsDeps.join("," + _) + ")" + _ + ":" + n;
    wrapperIntro += t + "typeof " + define + _ + "===" + _ + "'function'" + _ + "&&" + _ + define + ".amd" + _ + "?" + _ + define + "(" + amdParams + "factory)" + _ + ":" + n;
    wrapperIntro += "" + t + globalExport + ";" + n;
    wrapperIntro += "}(this," + _ + "(function" + _ + "(" + args + ")" + _ + "{" + useStrict + n;
    // var foo__default = 'default' in foo ? foo['default'] : foo;
    var interopBlock = getInteropBlock(dependencies, options, graph.varOrConst);
    if (interopBlock)
        magicString.prepend(interopBlock + n + n);
    if (intro)
        magicString.prepend(intro);
    var exportBlock = getExportBlock(exports, dependencies, namedExportsMode, options.interop, options.compact);
    if (exportBlock)
        magicString.append(n + n + exportBlock);
    if (namedExportsMode && hasExports && options.esModule)
        magicString.append(n + n + (options.compact ? compactEsModuleExport : esModuleExport));
    if (outro)
        magicString.append(outro);
    return magicString
        .trim()
        .indent(t)
        .append(wrapperOutro)
        .prepend(wrapperIntro);
}

var finalisers = { system: system, amd: amd, cjs: cjs, es: esm, iife: iife, umd: umd };

var BLANK = Object.create(null);

var NO_SEMICOLON = { isNoStatement: true };
function findFirstOccurrenceOutsideComment(code, searchString, start) {
    if (start === void 0) { start = 0; }
    var searchPos, charCodeAfterSlash;
    searchPos = code.indexOf(searchString, start);
    while (true) {
        start = code.indexOf('/', start);
        if (start === -1 || start > searchPos)
            return searchPos;
        charCodeAfterSlash = code.charCodeAt(++start);
        ++start;
        if (charCodeAfterSlash === 47 /*"/"*/) {
            start = code.indexOf('\n', start) + 1;
            if (start === 0)
                return -1;
            if (start > searchPos) {
                searchPos = code.indexOf(searchString, start);
            }
        }
        else if (charCodeAfterSlash === 42 /*"*"*/) {
            start = code.indexOf('*/', start) + 2;
            if (start > searchPos) {
                searchPos = code.indexOf(searchString, start);
            }
        }
    }
}
function findFirstLineBreakOutsideComment(code, start) {
    if (start === void 0) { start = 0; }
    var lineBreakPos, charCodeAfterSlash;
    lineBreakPos = code.indexOf('\n', start);
    while (true) {
        start = code.indexOf('/', start);
        if (start === -1 || start > lineBreakPos)
            return lineBreakPos;
        charCodeAfterSlash = code.charCodeAt(++start);
        if (charCodeAfterSlash === 47 /*"/"*/)
            return lineBreakPos;
        ++start;
        if (charCodeAfterSlash === 42 /*"*"*/) {
            start = code.indexOf('*/', start) + 2;
            if (start > lineBreakPos) {
                lineBreakPos = code.indexOf('\n', start);
            }
        }
    }
}
function renderStatementList(statements, code, start, end, options) {
    if (statements.length === 0)
        return;
    var currentNode, currentNodeStart, currentNodeNeedsBoundaries, nextNodeStart;
    var nextNode = statements[0];
    var nextNodeNeedsBoundaries = !nextNode.included || nextNode.needsBoundaries;
    if (nextNodeNeedsBoundaries) {
        nextNodeStart =
            start + findFirstLineBreakOutsideComment(code.original.slice(start, nextNode.start)) + 1;
    }
    for (var nextIndex = 1; nextIndex <= statements.length; nextIndex++) {
        currentNode = nextNode;
        currentNodeStart = nextNodeStart;
        currentNodeNeedsBoundaries = nextNodeNeedsBoundaries;
        nextNode = statements[nextIndex];
        nextNodeNeedsBoundaries =
            nextNode === undefined ? false : !nextNode.included || nextNode.needsBoundaries;
        if (currentNodeNeedsBoundaries || nextNodeNeedsBoundaries) {
            nextNodeStart =
                currentNode.end +
                    findFirstLineBreakOutsideComment(code.original.slice(currentNode.end, nextNode === undefined ? end : nextNode.start)) +
                    1;
            if (currentNode.included) {
                currentNodeNeedsBoundaries
                    ? currentNode.render(code, options, {
                        start: currentNodeStart,
                        end: nextNodeStart
                    })
                    : currentNode.render(code, options);
            }
            else {
                code.remove(currentNodeStart, nextNodeStart);
            }
        }
        else {
            currentNode.render(code, options);
        }
    }
}
// This assumes that the first character is not part of the first node
function getCommaSeparatedNodesWithBoundaries(nodes, code, start, end) {
    var splitUpNodes = [];
    var node, nextNode, nextNodeStart, contentEnd, char;
    var separator = start - 1;
    for (var nextIndex = 0; nextIndex < nodes.length; nextIndex++) {
        nextNode = nodes[nextIndex];
        if (node !== undefined) {
            separator =
                node.end +
                    findFirstOccurrenceOutsideComment(code.original.slice(node.end, nextNode.start), ',');
        }
        nextNodeStart = contentEnd =
            separator +
                2 +
                findFirstLineBreakOutsideComment(code.original.slice(separator + 1, nextNode.start));
        while (((char = code.original.charCodeAt(nextNodeStart)),
            char === 32 /*" "*/ || char === 9 /*"\t"*/ || char === 10 /*"\n"*/ || char === 13) /*"\r"*/)
            nextNodeStart++;
        if (node !== undefined) {
            splitUpNodes.push({
                node: node,
                start: start,
                contentEnd: contentEnd,
                separator: separator,
                end: nextNodeStart
            });
        }
        node = nextNode;
        start = nextNodeStart;
    }
    splitUpNodes.push({
        node: node,
        start: start,
        separator: null,
        contentEnd: end,
        end: end
    });
    return splitUpNodes;
}

var chars$1 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
function toBase64(num, base63) {
    if (base63 === void 0) { base63 = false; }
    var outStr = '';
    var base = base63 ? 63 : 64;
    do {
        var curDigit = num % base;
        num = Math.floor(num / base);
        outStr = chars$1[curDigit] + outStr;
    } while (num !== 0);
    return outStr;
}

var Scope = /** @class */ (function () {
    function Scope(parent) {
        if (parent === void 0) { parent = null; }
        this.isModuleScope = false;
        this.parent = parent;
        this.children = [];
        if (this.parent)
            this.parent.children.push(this);
        this.variables = Object.create(null);
    }
    Scope.prototype.addDeclaration = function (identifier, deoptimizationTracker, init, _isHoisted) {
        if (init === void 0) { init = null; }
        var name = identifier.name;
        if (this.variables[name]) {
            this.variables[name].addDeclaration(identifier, init);
        }
        else {
            this.variables[name] = new LocalVariable(identifier.name, identifier, init || UNDEFINED_EXPRESSION, deoptimizationTracker);
        }
        return this.variables[name];
    };
    Scope.prototype.addExportDefaultDeclaration = function (name, exportDefaultDeclaration, deoptimizationTracker) {
        this.variables.default = new ExportDefaultVariable(name, exportDefaultDeclaration, deoptimizationTracker);
        return this.variables.default;
    };
    Scope.prototype.addReturnExpression = function (expression) {
        this.parent && this.parent.addReturnExpression(expression);
    };
    Scope.prototype.contains = function (name) {
        return name in this.variables || (this.parent ? this.parent.contains(name) : false);
    };
    Scope.prototype.deshadow = function (names, children) {
        if (children === void 0) { children = this.children; }
        for (var _i = 0, _a = Object.keys(this.variables); _i < _a.length; _i++) {
            var key = _a[_i];
            var declaration = this.variables[key];
            // we can disregard exports.foo etc
            if (declaration.exportName && declaration.isReassigned && !declaration.isId)
                continue;
            if (declaration.isDefault)
                continue;
            var name = declaration.getName(true);
            if (!names.has(name))
                continue;
            name = declaration.name;
            var deshadowed = void 0, i = 1;
            do {
                deshadowed = name + "$$" + toBase64(i++);
            } while (names.has(deshadowed));
            declaration.setSafeName(deshadowed);
        }
        for (var _b = 0, children_1 = children; _b < children_1.length; _b++) {
            var scope = children_1[_b];
            scope.deshadow(names);
        }
    };
    Scope.prototype.findLexicalBoundary = function () {
        return this.parent.findLexicalBoundary();
    };
    Scope.prototype.findVariable = function (name) {
        return this.variables[name] || (this.parent && this.parent.findVariable(name));
    };
    return Scope;
}());

var immutable = createCommonjsModule(function (module, exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  module.exports = factory();
}(commonjsGlobal, function () {var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    };
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    };
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    };
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));
});

var OptionTypes;
(function (OptionTypes) {
    OptionTypes[OptionTypes["IGNORED_LABELS"] = 0] = "IGNORED_LABELS";
    OptionTypes[OptionTypes["ACCESSED_NODES"] = 1] = "ACCESSED_NODES";
    OptionTypes[OptionTypes["ARGUMENTS_VARIABLES"] = 2] = "ARGUMENTS_VARIABLES";
    OptionTypes[OptionTypes["ASSIGNED_NODES"] = 3] = "ASSIGNED_NODES";
    OptionTypes[OptionTypes["IGNORE_BREAK_STATEMENTS"] = 4] = "IGNORE_BREAK_STATEMENTS";
    OptionTypes[OptionTypes["IGNORE_RETURN_AWAIT_YIELD"] = 5] = "IGNORE_RETURN_AWAIT_YIELD";
    OptionTypes[OptionTypes["NODES_CALLED_AT_PATH_WITH_OPTIONS"] = 6] = "NODES_CALLED_AT_PATH_WITH_OPTIONS";
    OptionTypes[OptionTypes["REPLACED_VARIABLE_INITS"] = 7] = "REPLACED_VARIABLE_INITS";
    OptionTypes[OptionTypes["RETURN_EXPRESSIONS_ACCESSED_AT_PATH"] = 8] = "RETURN_EXPRESSIONS_ACCESSED_AT_PATH";
    OptionTypes[OptionTypes["RETURN_EXPRESSIONS_ASSIGNED_AT_PATH"] = 9] = "RETURN_EXPRESSIONS_ASSIGNED_AT_PATH";
    OptionTypes[OptionTypes["RETURN_EXPRESSIONS_CALLED_AT_PATH"] = 10] = "RETURN_EXPRESSIONS_CALLED_AT_PATH";
})(OptionTypes || (OptionTypes = {}));
var RESULT_KEY = {};
var ExecutionPathOptions = /** @class */ (function () {
    function ExecutionPathOptions(optionValues) {
        this.optionValues = optionValues;
    }
    ExecutionPathOptions.create = function () {
        return new this(immutable.Map());
    };
    ExecutionPathOptions.prototype.get = function (option) {
        return this.optionValues.get(option);
    };
    ExecutionPathOptions.prototype.remove = function (option) {
        return new ExecutionPathOptions(this.optionValues.remove(option));
    };
    ExecutionPathOptions.prototype.set = function (option, value) {
        return new ExecutionPathOptions(this.optionValues.set(option, value));
    };
    ExecutionPathOptions.prototype.setIn = function (optionPath, value) {
        return new ExecutionPathOptions(this.optionValues.setIn(optionPath, value));
    };
    ExecutionPathOptions.prototype.addAccessedNodeAtPath = function (path$$1, node) {
        return this.setIn([OptionTypes.ACCESSED_NODES, node].concat(path$$1, [RESULT_KEY]), true);
    };
    ExecutionPathOptions.prototype.addAccessedReturnExpressionAtPath = function (path$$1, callExpression) {
        return this.setIn([OptionTypes.RETURN_EXPRESSIONS_ACCESSED_AT_PATH, callExpression].concat(path$$1, [RESULT_KEY]), true);
    };
    ExecutionPathOptions.prototype.addAssignedNodeAtPath = function (path$$1, node) {
        return this.setIn([OptionTypes.ASSIGNED_NODES, node].concat(path$$1, [RESULT_KEY]), true);
    };
    ExecutionPathOptions.prototype.addAssignedReturnExpressionAtPath = function (path$$1, callExpression) {
        return this.setIn([OptionTypes.RETURN_EXPRESSIONS_ASSIGNED_AT_PATH, callExpression].concat(path$$1, [RESULT_KEY]), true);
    };
    ExecutionPathOptions.prototype.addCalledNodeAtPathWithOptions = function (path$$1, node, callOptions) {
        return this.setIn([OptionTypes.NODES_CALLED_AT_PATH_WITH_OPTIONS, node].concat(path$$1, [RESULT_KEY, callOptions]), true);
    };
    ExecutionPathOptions.prototype.addCalledReturnExpressionAtPath = function (path$$1, callExpression) {
        return this.setIn([OptionTypes.RETURN_EXPRESSIONS_CALLED_AT_PATH, callExpression].concat(path$$1, [RESULT_KEY]), true);
    };
    ExecutionPathOptions.prototype.getArgumentsVariables = function () {
        return (this.get(OptionTypes.ARGUMENTS_VARIABLES) || []);
    };
    ExecutionPathOptions.prototype.getHasEffectsWhenCalledOptions = function () {
        return this.setIgnoreReturnAwaitYield()
            .setIgnoreBreakStatements(false)
            .setIgnoreNoLabels();
    };
    ExecutionPathOptions.prototype.getReplacedVariableInit = function (variable) {
        return this.optionValues.getIn([OptionTypes.REPLACED_VARIABLE_INITS, variable]);
    };
    ExecutionPathOptions.prototype.hasNodeBeenAccessedAtPath = function (path$$1, node) {
        return this.optionValues.getIn([OptionTypes.ACCESSED_NODES, node].concat(path$$1, [RESULT_KEY]));
    };
    ExecutionPathOptions.prototype.hasNodeBeenAssignedAtPath = function (path$$1, node) {
        return this.optionValues.getIn([OptionTypes.ASSIGNED_NODES, node].concat(path$$1, [RESULT_KEY]));
    };
    ExecutionPathOptions.prototype.hasNodeBeenCalledAtPathWithOptions = function (path$$1, node, callOptions) {
        var previousCallOptions = this.optionValues.getIn([
            OptionTypes.NODES_CALLED_AT_PATH_WITH_OPTIONS,
            node
        ].concat(path$$1, [
            RESULT_KEY
        ]));
        return (previousCallOptions &&
            previousCallOptions.find(function (_, otherCallOptions) {
                return otherCallOptions.equals(callOptions);
            }));
    };
    ExecutionPathOptions.prototype.hasReturnExpressionBeenAccessedAtPath = function (path$$1, callExpression) {
        return this.optionValues.getIn([
            OptionTypes.RETURN_EXPRESSIONS_ACCESSED_AT_PATH,
            callExpression
        ].concat(path$$1, [
            RESULT_KEY
        ]));
    };
    ExecutionPathOptions.prototype.hasReturnExpressionBeenAssignedAtPath = function (path$$1, callExpression) {
        return this.optionValues.getIn([
            OptionTypes.RETURN_EXPRESSIONS_ASSIGNED_AT_PATH,
            callExpression
        ].concat(path$$1, [
            RESULT_KEY
        ]));
    };
    ExecutionPathOptions.prototype.hasReturnExpressionBeenCalledAtPath = function (path$$1, callExpression) {
        return this.optionValues.getIn([
            OptionTypes.RETURN_EXPRESSIONS_CALLED_AT_PATH,
            callExpression
        ].concat(path$$1, [
            RESULT_KEY
        ]));
    };
    ExecutionPathOptions.prototype.ignoreBreakStatements = function () {
        return this.get(OptionTypes.IGNORE_BREAK_STATEMENTS);
    };
    ExecutionPathOptions.prototype.ignoreLabel = function (labelName) {
        return this.optionValues.getIn([OptionTypes.IGNORED_LABELS, labelName]);
    };
    ExecutionPathOptions.prototype.ignoreReturnAwaitYield = function () {
        return this.get(OptionTypes.IGNORE_RETURN_AWAIT_YIELD);
    };
    ExecutionPathOptions.prototype.replaceVariableInit = function (variable, init) {
        return this.setIn([OptionTypes.REPLACED_VARIABLE_INITS, variable], init);
    };
    ExecutionPathOptions.prototype.setArgumentsVariables = function (variables) {
        return this.set(OptionTypes.ARGUMENTS_VARIABLES, variables);
    };
    ExecutionPathOptions.prototype.setIgnoreBreakStatements = function (value) {
        if (value === void 0) { value = true; }
        return this.set(OptionTypes.IGNORE_BREAK_STATEMENTS, value);
    };
    ExecutionPathOptions.prototype.setIgnoreLabel = function (labelName) {
        return this.setIn([OptionTypes.IGNORED_LABELS, labelName], true);
    };
    ExecutionPathOptions.prototype.setIgnoreNoLabels = function () {
        return this.remove(OptionTypes.IGNORED_LABELS);
    };
    ExecutionPathOptions.prototype.setIgnoreReturnAwaitYield = function (value) {
        if (value === void 0) { value = true; }
        return this.set(OptionTypes.IGNORE_RETURN_AWAIT_YIELD, value);
    };
    return ExecutionPathOptions;
}());

var keys = {
    Program: ['body'],
    Literal: []
};
function getAndCreateKeys(esTreeNode) {
    keys[esTreeNode.type] = Object.keys(esTreeNode).filter(function (key) { return typeof esTreeNode[key] === 'object'; });
    return keys[esTreeNode.type];
}

var NEW_EXECUTION_PATH = ExecutionPathOptions.create();
var NodeBase = /** @class */ (function () {
    function NodeBase(esTreeNode, 
    // we need to pass down the node constructors to avoid a circular dependency
    parent, parentScope) {
        this.keys = keys[esTreeNode.type] || getAndCreateKeys(esTreeNode);
        this.parent = parent;
        this.context = parent.context;
        this.createScope(parentScope);
        this.parseNode(esTreeNode);
        this.initialise();
        this.context.magicString.addSourcemapLocation(this.start);
        this.context.magicString.addSourcemapLocation(this.end);
    }
    /**
     * Override this to bind assignments to variables and do any initialisations that
     * require the scopes to be populated with variables.
     */
    NodeBase.prototype.bind = function () {
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this[key];
            if (value === null)
                continue;
            if (Array.isArray(value)) {
                for (var _b = 0, value_1 = value; _b < value_1.length; _b++) {
                    var child = value_1[_b];
                    if (child !== null)
                        child.bind();
                }
            }
            else {
                value.bind();
            }
        }
    };
    /**
     * Override if this node should receive a different scope than the parent scope.
     */
    NodeBase.prototype.createScope = function (parentScope) {
        this.scope = parentScope;
    };
    NodeBase.prototype.declare = function (_kind, _init) { };
    NodeBase.prototype.getLiteralValueAtPath = function (_path, _recursionTracker, _origin) {
        return UNKNOWN_VALUE;
    };
    NodeBase.prototype.getReturnExpressionWhenCalledAtPath = function (_path, _recursionTracker, _origin) {
        return UNKNOWN_EXPRESSION;
    };
    NodeBase.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this[key];
            if (value === null)
                continue;
            if (Array.isArray(value)) {
                for (var _b = 0, value_2 = value; _b < value_2.length; _b++) {
                    var child = value_2[_b];
                    if (child !== null && child.hasEffects(options))
                        return true;
                }
            }
            else if (value.hasEffects(options))
                return true;
        }
        return false;
    };
    NodeBase.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 0;
    };
    NodeBase.prototype.hasEffectsWhenAssignedAtPath = function (_path, _options) {
        return true;
    };
    NodeBase.prototype.hasEffectsWhenCalledAtPath = function (_path, _callOptions, _options) {
        return true;
    };
    NodeBase.prototype.include = function () {
        this.included = true;
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this[key];
            if (value === null)
                continue;
            if (Array.isArray(value)) {
                for (var _b = 0, value_3 = value; _b < value_3.length; _b++) {
                    var child = value_3[_b];
                    if (child !== null)
                        child.include();
                }
            }
            else {
                value.include();
            }
        }
    };
    NodeBase.prototype.includeWithAllDeclaredVariables = function () {
        this.include();
    };
    /**
     * Override to perform special initialisation steps after the scope is initialised
     */
    NodeBase.prototype.initialise = function () {
        this.included = false;
    };
    NodeBase.prototype.insertSemicolon = function (code) {
        if (code.original[this.end - 1] !== ';') {
            code.appendLeft(this.end, ';');
        }
    };
    NodeBase.prototype.locate = function () {
        // useful for debugging
        var location = locate(this.context.code, this.start, { offsetLine: 1 });
        location.file = this.context.fileName;
        location.toString = function () { return JSON.stringify(location); };
        return location;
    };
    NodeBase.prototype.parseNode = function (esTreeNode) {
        for (var _i = 0, _a = Object.keys(esTreeNode); _i < _a.length; _i++) {
            var key = _a[_i];
            // That way, we can override this function to add custom initialisation and then call super.parseNode
            if (this.hasOwnProperty(key))
                continue;
            var value = esTreeNode[key];
            if (typeof value !== 'object' || value === null) {
                this[key] = value;
            }
            else if (Array.isArray(value)) {
                this[key] = [];
                for (var _b = 0, value_4 = value; _b < value_4.length; _b++) {
                    var child = value_4[_b];
                    this[key].push(child === null
                        ? null
                        : new (this.context.nodeConstructors[child.type] ||
                            this.context.nodeConstructors.UnknownNode)(child, this, this.scope));
                }
            }
            else {
                this[key] = new (this.context.nodeConstructors[value.type] ||
                    this.context.nodeConstructors.UnknownNode)(value, this, this.scope);
            }
        }
    };
    NodeBase.prototype.deoptimizePath = function (_path) { };
    NodeBase.prototype.render = function (code, options) {
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this[key];
            if (value === null)
                continue;
            if (Array.isArray(value)) {
                for (var _b = 0, value_5 = value; _b < value_5.length; _b++) {
                    var child = value_5[_b];
                    if (child !== null)
                        child.render(code, options);
                }
            }
            else {
                value.render(code, options);
            }
        }
    };
    NodeBase.prototype.shouldBeIncluded = function () {
        return this.included || this.hasEffects(NEW_EXECUTION_PATH);
    };
    NodeBase.prototype.toString = function () {
        return this.context.code.slice(this.start, this.end);
    };
    return NodeBase;
}());

var ClassNode = /** @class */ (function (_super) {
    __extends(ClassNode, _super);
    function ClassNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassNode.prototype.createScope = function (parentScope) {
        this.scope = new Scope(parentScope);
    };
    ClassNode.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    ClassNode.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    ClassNode.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        return (this.body.hasEffectsWhenCalledAtPath(path$$1, callOptions, options) ||
            (this.superClass && this.superClass.hasEffectsWhenCalledAtPath(path$$1, callOptions, options)));
    };
    ClassNode.prototype.initialise = function () {
        this.included = false;
        if (this.id !== null) {
            this.id.declare('class', this);
        }
    };
    return ClassNode;
}(NodeBase));

function isClassDeclaration(node) {
    return node.type === ClassDeclaration;
}
var ClassDeclaration$1 = /** @class */ (function (_super) {
    __extends(ClassDeclaration$$1, _super);
    function ClassDeclaration$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassDeclaration$$1.prototype.initialise = function () {
        _super.prototype.initialise.call(this);
        if (this.id !== null) {
            this.id.variable.isId = true;
        }
    };
    ClassDeclaration$$1.prototype.parseNode = function (esTreeNode) {
        if (esTreeNode.id !== null) {
            this.id = new this.context.nodeConstructors.Identifier(esTreeNode.id, this, this.scope.parent);
        }
        _super.prototype.parseNode.call(this, esTreeNode);
    };
    ClassDeclaration$$1.prototype.render = function (code, options) {
        if (options.format === 'system' && this.id && this.id.variable.exportName) {
            code.appendLeft(this.end, " exports('" + this.id.variable.exportName + "', " + this.id.variable.getName() + ");");
        }
        _super.prototype.render.call(this, code, options);
    };
    return ClassDeclaration$$1;
}(ClassNode));

var getParameterVariable = function (path$$1, options) {
    var firstArgNum = parseInt(path$$1[0], 10);
    return ((firstArgNum < options.getArgumentsVariables().length &&
        options.getArgumentsVariables()[firstArgNum]) ||
        UNKNOWN_EXPRESSION);
};
var ArgumentsVariable = /** @class */ (function (_super) {
    __extends(ArgumentsVariable, _super);
    function ArgumentsVariable(parameters, deoptimizationTracker) {
        var _this = _super.call(this, 'arguments', null, UNKNOWN_EXPRESSION, deoptimizationTracker) || this;
        _this.parameters = parameters;
        return _this;
    }
    ArgumentsVariable.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return (path$$1.length > 1 &&
            getParameterVariable(path$$1, options).hasEffectsWhenAccessedAtPath(path$$1.slice(1), options));
    };
    ArgumentsVariable.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return (path$$1.length === 0 ||
            this.included ||
            getParameterVariable(path$$1, options).hasEffectsWhenAssignedAtPath(path$$1.slice(1), options));
    };
    ArgumentsVariable.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length === 0) {
            return true;
        }
        return getParameterVariable(path$$1, options).hasEffectsWhenCalledAtPath(path$$1.slice(1), callOptions, options);
    };
    ArgumentsVariable.prototype.deoptimizePath = function (path$$1) {
        var firstArgNum = parseInt(path$$1[0], 10);
        if (path$$1.length > 0) {
            if (firstArgNum >= 0 && this.parameters[firstArgNum]) {
                this.parameters[firstArgNum].deoptimizePath(path$$1.slice(1));
            }
        }
    };
    return ArgumentsVariable;
}(LocalVariable));

var ReplaceableInitializationVariable = /** @class */ (function (_super) {
    __extends(ReplaceableInitializationVariable, _super);
    function ReplaceableInitializationVariable(name, declarator, deoptimizationTracker) {
        return _super.call(this, name, declarator, null, deoptimizationTracker) || this;
    }
    ReplaceableInitializationVariable.prototype.getLiteralValueAtPath = function () {
        return UNKNOWN_VALUE;
    };
    ReplaceableInitializationVariable.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return (this._getInit(options).hasEffectsWhenAccessedAtPath(path$$1, options) ||
            _super.prototype.hasEffectsWhenAccessedAtPath.call(this, path$$1, options));
    };
    ReplaceableInitializationVariable.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return (this._getInit(options).hasEffectsWhenAssignedAtPath(path$$1, options) ||
            _super.prototype.hasEffectsWhenAssignedAtPath.call(this, path$$1, options));
    };
    ReplaceableInitializationVariable.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        return (this._getInit(options).hasEffectsWhenCalledAtPath(path$$1, callOptions, options) ||
            _super.prototype.hasEffectsWhenCalledAtPath.call(this, path$$1, callOptions, options));
    };
    ReplaceableInitializationVariable.prototype._getInit = function (options) {
        return options.getReplacedVariableInit(this) || UNKNOWN_EXPRESSION;
    };
    return ReplaceableInitializationVariable;
}(LocalVariable));

var ThisVariable = /** @class */ (function (_super) {
    __extends(ThisVariable, _super);
    function ThisVariable(deoptimizationTracker) {
        return _super.call(this, 'this', null, deoptimizationTracker) || this;
    }
    return ThisVariable;
}(ReplaceableInitializationVariable));

var ParameterVariable = /** @class */ (function (_super) {
    __extends(ParameterVariable, _super);
    function ParameterVariable(identifier, deoptimizationTracker) {
        return _super.call(this, identifier.name, identifier, deoptimizationTracker) || this;
    }
    return ParameterVariable;
}(ReplaceableInitializationVariable));

var ParameterScope = /** @class */ (function (_super) {
    __extends(ParameterScope, _super);
    function ParameterScope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parameters = [];
        return _this;
    }
    /**
     * Adds a parameter to this scope. Parameters must be added in the correct
     * order, e.g. from left to right.
     * @param {Identifier} identifier
     * @returns {Variable}
     */
    ParameterScope.prototype.addParameterDeclaration = function (identifier, deoptimizationTracker) {
        var variable = new ParameterVariable(identifier, deoptimizationTracker);
        this.variables[identifier.name] = variable;
        this.parameters.push(variable);
        return variable;
    };
    ParameterScope.prototype.getParameterVariables = function () {
        return this.parameters;
    };
    return ParameterScope;
}(Scope));

var ReturnValueScope = /** @class */ (function (_super) {
    __extends(ReturnValueScope, _super);
    function ReturnValueScope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.returnExpressions = [];
        _this.returnExpression = null;
        return _this;
    }
    ReturnValueScope.prototype.addReturnExpression = function (expression) {
        this.returnExpressions.push(expression);
    };
    ReturnValueScope.prototype.getReturnExpression = function () {
        if (this.returnExpression === null)
            this.updateReturnExpression();
        return this.returnExpression;
    };
    ReturnValueScope.prototype.updateReturnExpression = function () {
        if (this.returnExpressions.length === 1) {
            this.returnExpression = this.returnExpressions[0];
        }
        else {
            this.returnExpression = UNKNOWN_EXPRESSION;
            for (var _i = 0, _a = this.returnExpressions; _i < _a.length; _i++) {
                var expression = _a[_i];
                expression.deoptimizePath(UNKNOWN_PATH);
            }
        }
    };
    return ReturnValueScope;
}(ParameterScope));

var FunctionScope = /** @class */ (function (_super) {
    __extends(FunctionScope, _super);
    function FunctionScope(parent, deoptimizationTracker) {
        var _this = _super.call(this, parent) || this;
        _this.variables.arguments = new ArgumentsVariable(_super.prototype.getParameterVariables.call(_this), deoptimizationTracker);
        _this.variables.this = new ThisVariable(deoptimizationTracker);
        return _this;
    }
    FunctionScope.prototype.findLexicalBoundary = function () {
        return this;
    };
    FunctionScope.prototype.getOptionsWhenCalledWith = function (_a, options) {
        var _this = this;
        var args = _a.args, withNew = _a.withNew;
        return options
            .replaceVariableInit(this.variables.this, withNew ? new UnknownObjectExpression() : UNKNOWN_EXPRESSION)
            .setArgumentsVariables(args.map(function (parameter, index) { return _super.prototype.getParameterVariables.call(_this)[index] || parameter; }));
    };
    return FunctionScope;
}(ReturnValueScope));

var FunctionNode = /** @class */ (function (_super) {
    __extends(FunctionNode, _super);
    function FunctionNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionNode.prototype.createScope = function (parentScope) {
        this.scope = new FunctionScope(parentScope, this.context.deoptimizationTracker);
    };
    FunctionNode.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        return path$$1.length === 0 ? this.scope.getReturnExpression() : UNKNOWN_EXPRESSION;
    };
    FunctionNode.prototype.hasEffects = function (options) {
        return this.id && this.id.hasEffects(options);
    };
    FunctionNode.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        if (path$$1.length <= 1) {
            return false;
        }
        return path$$1.length > 2 || path$$1[0] !== 'prototype' || this.isPrototypeDeoptimized;
    };
    FunctionNode.prototype.hasEffectsWhenAssignedAtPath = function (path$$1) {
        if (path$$1.length <= 1) {
            return false;
        }
        return path$$1.length > 2 || path$$1[0] !== 'prototype' || this.isPrototypeDeoptimized;
    };
    FunctionNode.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length > 0) {
            return true;
        }
        var innerOptions = this.scope.getOptionsWhenCalledWith(callOptions, options);
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var param = _a[_i];
            if (param.hasEffects(innerOptions))
                return true;
        }
        return this.body.hasEffects(innerOptions);
    };
    FunctionNode.prototype.include = function () {
        this.scope.variables.arguments.include();
        _super.prototype.include.call(this);
    };
    FunctionNode.prototype.initialise = function () {
        this.included = false;
        this.isPrototypeDeoptimized = false;
        if (this.id !== null) {
            this.id.declare('function', this);
        }
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var param = _a[_i];
            param.declare('parameter', UNKNOWN_EXPRESSION);
        }
        this.body.addImplicitReturnExpressionToScope();
    };
    FunctionNode.prototype.parseNode = function (esTreeNode) {
        this.body = (new this.context.nodeConstructors.BlockStatement(esTreeNode.body, this, new Scope(this.scope)));
        _super.prototype.parseNode.call(this, esTreeNode);
    };
    FunctionNode.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length === 1) {
            if (path$$1[0] === 'prototype') {
                this.isPrototypeDeoptimized = true;
            }
            else if (path$$1[0] === UNKNOWN_KEY) {
                this.isPrototypeDeoptimized = true;
                // A reassignment of UNKNOWN_PATH is considered equivalent to having lost track
                // which means the return expression needs to be reassigned as well
                this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
            }
        }
    };
    return FunctionNode;
}(NodeBase));
FunctionNode.prototype.preventChildBlockScope = true;

function isFunctionDeclaration(node) {
    return node.type === FunctionDeclaration;
}
var FunctionDeclaration$1 = /** @class */ (function (_super) {
    __extends(FunctionDeclaration$$1, _super);
    function FunctionDeclaration$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionDeclaration$$1.prototype.initialise = function () {
        _super.prototype.initialise.call(this);
        if (this.id !== null) {
            this.id.variable.isId = true;
        }
    };
    FunctionDeclaration$$1.prototype.parseNode = function (esTreeNode) {
        if (esTreeNode.id !== null) {
            this.id = new this.context.nodeConstructors.Identifier(esTreeNode.id, this, this.scope.parent);
        }
        _super.prototype.parseNode.call(this, esTreeNode);
    };
    return FunctionDeclaration$$1;
}(FunctionNode));

function isReference(node, parent) {
    if (node.type === 'MemberExpression') {
        return !node.computed && isReference(node.object, node);
    }
    if (node.type === 'Identifier') {
        // the only time we could have an identifier node without a parent is
        // if it's the entire body of a function without a block statement –
        // i.e. an arrow function expression like `a => a`
        if (!parent)
            return true;
        // TODO is this right?
        if (parent.type === 'MemberExpression' || parent.type === 'MethodDefinition') {
            return parent.computed || node === parent.object;
        }
        // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
        if (parent.type === 'Property')
            return parent.computed || node === parent.value;
        // disregard the `bar` in `export { foo as bar }`
        if (parent.type === 'ExportSpecifier' && node !== parent.local)
            return false;
        return true;
    }
    return false;
}

function isIdentifier(node) {
    return node.type === Identifier;
}
var Identifier$1 = /** @class */ (function (_super) {
    __extends(Identifier$$1, _super);
    function Identifier$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Identifier$$1.prototype.bind = function () {
        if (this.bound)
            return;
        this.bound = true;
        if (this.variable === null && isReference(this, this.parent)) {
            this.variable = this.scope.findVariable(this.name);
            this.variable.addReference(this);
        }
        if (this.variable !== null &&
            this.variable.isLocal &&
            this.variable.additionalInitializers !== null) {
            this.variable.consolidateInitializers();
        }
    };
    Identifier$$1.prototype.declare = function (kind, init) {
        switch (kind) {
            case 'var':
            case 'function':
                this.variable = this.scope.addDeclaration(this, this.context.deoptimizationTracker, init, true);
                break;
            case 'let':
            case 'const':
            case 'class':
                this.variable = this.scope.addDeclaration(this, this.context.deoptimizationTracker, init, false);
                break;
            case 'parameter':
                this.variable = this.scope.addParameterDeclaration(this, this.context.deoptimizationTracker);
                break;
            default:
                throw new Error("Unexpected identifier kind " + kind + ".");
        }
    };
    Identifier$$1.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.variable !== null) {
            return this.variable.getLiteralValueAtPath(path$$1, recursionTracker, origin);
        }
        return UNKNOWN_VALUE;
    };
    Identifier$$1.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.variable !== null) {
            return this.variable.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
        }
        return UNKNOWN_EXPRESSION;
    };
    Identifier$$1.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return this.variable && this.variable.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    Identifier$$1.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return !this.variable || this.variable.hasEffectsWhenAssignedAtPath(path$$1, options);
    };
    Identifier$$1.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        return !this.variable || this.variable.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
    };
    Identifier$$1.prototype.include = function () {
        if (!this.included) {
            this.included = true;
            if (this.variable !== null && !this.variable.included) {
                this.variable.include();
                this.context.requestTreeshakingPass();
            }
        }
    };
    Identifier$$1.prototype.initialise = function () {
        this.included = false;
        this.bound = false;
        // To avoid later shape mutations
        if (!this.variable) {
            this.variable = null;
        }
    };
    Identifier$$1.prototype.deoptimizePath = function (path$$1) {
        if (!this.bound)
            this.bind();
        if (this.variable !== null) {
            if (path$$1.length === 0 &&
                this.name in this.context.imports &&
                !this.scope.contains(this.name)) {
                this.disallowImportReassignment();
            }
            this.variable.deoptimizePath(path$$1);
        }
    };
    Identifier$$1.prototype.render = function (code, _options, _a) {
        var _b = _a === void 0 ? BLANK : _a, renderedParentType = _b.renderedParentType, isCalleeOfRenderedParent = _b.isCalleeOfRenderedParent;
        if (this.variable) {
            var name = this.variable.getName();
            if (name !== this.name) {
                code.overwrite(this.start, this.end, name, {
                    storeName: true,
                    contentOnly: true
                });
                var relevantParent = this.parent;
                if (relevantParent.type === AssignmentPattern) {
                    relevantParent = relevantParent.parent;
                }
                if (relevantParent.type === Property && relevantParent.shorthand) {
                    code.prependRight(this.start, this.name + ": ");
                }
            }
            // In strict mode, any variable named "eval" must be the actual "eval" function
            if (name === 'eval' &&
                renderedParentType === CallExpression &&
                isCalleeOfRenderedParent) {
                code.appendRight(this.start, '0, ');
            }
        }
    };
    Identifier$$1.prototype.disallowImportReassignment = function () {
        this.context.error({
            code: 'ILLEGAL_REASSIGNMENT',
            message: "Illegal reassignment to import '" + this.name + "'"
        }, this.start);
    };
    return Identifier$$1;
}(NodeBase));

var WHITESPACE = /\s/;
// The header ends at the first non-white-space after "default"
function getDeclarationStart(code, start) {
    if (start === void 0) { start = 0; }
    start = findFirstOccurrenceOutsideComment(code, 'default', start) + 7;
    while (WHITESPACE.test(code[start]))
        start++;
    return start;
}
function getIdInsertPosition(code, declarationKeyword, start) {
    if (start === void 0) { start = 0; }
    var declarationEnd = findFirstOccurrenceOutsideComment(code, declarationKeyword, start) + declarationKeyword.length;
    code = code.slice(declarationEnd, findFirstOccurrenceOutsideComment(code, '{', declarationEnd));
    var generatorStarPos = findFirstOccurrenceOutsideComment(code, '*');
    if (generatorStarPos === -1) {
        return declarationEnd;
    }
    return declarationEnd + generatorStarPos + 1;
}
function isExportDefaultDeclaration(node) {
    return node.type === ExportDefaultDeclaration;
}
var ExportDefaultDeclaration$1 = /** @class */ (function (_super) {
    __extends(ExportDefaultDeclaration$$1, _super);
    function ExportDefaultDeclaration$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportDefaultDeclaration$$1.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.declarationName &&
            // Do not set it for Class and FunctionExpressions otherwise they get treeshaken away
            (isFunctionDeclaration(this.declaration) ||
                isClassDeclaration(this.declaration) ||
                isIdentifier(this.declaration))) {
            this.variable.setOriginalVariable(this.scope.findVariable(this.declarationName));
        }
    };
    ExportDefaultDeclaration$$1.prototype.initialise = function () {
        this.included = false;
        this.declarationName =
            (this.declaration.id &&
                this.declaration.id.name) ||
                this.declaration.name;
        this.variable = this.scope.addExportDefaultDeclaration(this.declarationName || this.context.getModuleName(), this, this.context.deoptimizationTracker);
        this.context.addExport(this);
    };
    ExportDefaultDeclaration$$1.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, start = _b.start, end = _b.end;
        var declarationStart = getDeclarationStart(code.original, this.start);
        if (isFunctionDeclaration(this.declaration)) {
            this.renderNamedDeclaration(code, declarationStart, 'function', this.declaration.id === null, options);
        }
        else if (isClassDeclaration(this.declaration)) {
            this.renderNamedDeclaration(code, declarationStart, 'class', this.declaration.id === null, options);
        }
        else if (this.variable.referencesOriginal()) {
            // Remove altogether to prevent re-declaring the same variable
            if (options.format === 'system' && this.variable.exportName) {
                code.overwrite(start, end, "exports('" + this.variable.exportName + "', " + this.variable.getName() + ");");
            }
            else {
                code.remove(start, end);
            }
            return;
        }
        else if (this.variable.included) {
            this.renderVariableDeclaration(code, declarationStart, options);
        }
        else {
            code.remove(this.start, declarationStart);
            this.declaration.render(code, options, {
                renderedParentType: ExpressionStatement,
                isCalleeOfRenderedParent: false
            });
            if (code.original[this.end - 1] !== ';') {
                code.appendLeft(this.end, ';');
            }
            return;
        }
        this.declaration.render(code, options);
    };
    ExportDefaultDeclaration$$1.prototype.renderNamedDeclaration = function (code, declarationStart, declarationKeyword, needsId, options) {
        var name = this.variable.getName();
        // Remove `export default`
        code.remove(this.start, declarationStart);
        if (needsId) {
            code.appendLeft(getIdInsertPosition(code.original, declarationKeyword, declarationStart), " " + name);
        }
        if (options.format === 'system' &&
            isClassDeclaration(this.declaration) &&
            this.variable.exportName) {
            code.appendLeft(this.end, " exports('" + this.variable.exportName + "', " + name + ");");
        }
    };
    ExportDefaultDeclaration$$1.prototype.renderVariableDeclaration = function (code, declarationStart, options) {
        var systemBinding = options.format === 'system' && this.variable.exportName
            ? "exports('" + this.variable.exportName + "', "
            : '';
        code.overwrite(this.start, declarationStart, this.context.varOrConst + " " + this.variable.getName() + " = " + systemBinding);
        var hasTrailingSemicolon = code.original.charCodeAt(this.end - 1) === 59; /*";"*/
        if (systemBinding) {
            code.appendRight(hasTrailingSemicolon ? this.end - 1 : this.end, ')' + (hasTrailingSemicolon ? '' : ';'));
        }
        else if (!hasTrailingSemicolon) {
            code.appendLeft(this.end, ';');
        }
    };
    return ExportDefaultDeclaration$$1;
}(NodeBase));
ExportDefaultDeclaration$1.prototype.needsBoundaries = true;

var ArrayExpression$1 = /** @class */ (function (_super) {
    __extends(ArrayExpression, _super);
    function ArrayExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element !== null)
                element.deoptimizePath(UNKNOWN_PATH);
        }
    };
    ArrayExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        if (path$$1.length !== 1)
            return UNKNOWN_EXPRESSION;
        return getMemberReturnExpressionWhenCalled(arrayMembers, path$$1[0]);
    };
    ArrayExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        return path$$1.length > 1;
    };
    ArrayExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length === 1) {
            return hasMemberEffectWhenCalled(arrayMembers, path$$1[0], this.included, callOptions, options);
        }
        return true;
    };
    return ArrayExpression;
}(NodeBase));

var ArrayPattern$1 = /** @class */ (function (_super) {
    __extends(ArrayPattern, _super);
    function ArrayPattern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayPattern.prototype.declare = function (kind, _init) {
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element !== null) {
                element.declare(kind, UNKNOWN_EXPRESSION);
            }
        }
    };
    ArrayPattern.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (path$$1.length > 0)
            return true;
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element !== null && element.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options))
                return true;
        }
        return false;
    };
    ArrayPattern.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length === 0) {
            for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element !== null) {
                    element.deoptimizePath(path$$1);
                }
            }
        }
    };
    return ArrayPattern;
}(NodeBase));

var BlockScope = /** @class */ (function (_super) {
    __extends(BlockScope, _super);
    function BlockScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockScope.prototype.addDeclaration = function (identifier, deoptimizationTracker, init, isHoisted) {
        if (init === void 0) { init = null; }
        if (isHoisted === void 0) { isHoisted = false; }
        if (isHoisted) {
            return this.parent.addDeclaration(identifier, deoptimizationTracker, init, true);
        }
        else {
            return _super.prototype.addDeclaration.call(this, identifier, deoptimizationTracker, init, false);
        }
    };
    return BlockScope;
}(Scope));

var BlockStatement$1 = /** @class */ (function (_super) {
    __extends(BlockStatement$$1, _super);
    function BlockStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockStatement$$1.prototype.addImplicitReturnExpressionToScope = function () {
        var lastStatement = this.body[this.body.length - 1];
        if (!lastStatement || lastStatement.type !== ReturnStatement) {
            this.scope.addReturnExpression(UNKNOWN_EXPRESSION);
        }
    };
    BlockStatement$$1.prototype.createScope = function (parentScope) {
        this.scope = this.parent.preventChildBlockScope
            ? parentScope
            : new BlockScope(parentScope);
    };
    BlockStatement$$1.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.hasEffects(options))
                return true;
        }
    };
    BlockStatement$$1.prototype.include = function () {
        this.included = true;
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.shouldBeIncluded())
                node.include();
        }
    };
    BlockStatement$$1.prototype.render = function (code, options) {
        if (this.body.length) {
            renderStatementList(this.body, code, this.start + 1, this.end - 1, options);
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    return BlockStatement$$1;
}(NodeBase));

var ArrowFunctionExpression$1 = /** @class */ (function (_super) {
    __extends(ArrowFunctionExpression$$1, _super);
    function ArrowFunctionExpression$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrowFunctionExpression$$1.prototype.createScope = function (parentScope) {
        this.scope = new ReturnValueScope(parentScope);
    };
    ArrowFunctionExpression$$1.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        return path$$1.length === 0 ? this.scope.getReturnExpression() : UNKNOWN_EXPRESSION;
    };
    ArrowFunctionExpression$$1.prototype.hasEffects = function (_options) {
        return false;
    };
    ArrowFunctionExpression$$1.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    ArrowFunctionExpression$$1.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    ArrowFunctionExpression$$1.prototype.hasEffectsWhenCalledAtPath = function (path$$1, _callOptions, options) {
        if (path$$1.length > 0) {
            return true;
        }
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var param = _a[_i];
            if (param.hasEffects(options))
                return true;
        }
        return this.body.hasEffects(options);
    };
    ArrowFunctionExpression$$1.prototype.initialise = function () {
        this.included = false;
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var param = _a[_i];
            param.declare('parameter', UNKNOWN_EXPRESSION);
        }
        if (this.body instanceof BlockStatement$1) {
            this.body.addImplicitReturnExpressionToScope();
        }
        else {
            this.scope.addReturnExpression(this.body);
        }
    };
    ArrowFunctionExpression$$1.prototype.parseNode = function (esTreeNode) {
        if (esTreeNode.body.type === BlockStatement) {
            this.body = new this.context.nodeConstructors.BlockStatement(esTreeNode.body, this, new Scope(this.scope));
        }
        _super.prototype.parseNode.call(this, esTreeNode);
    };
    ArrowFunctionExpression$$1.prototype.deoptimizePath = function (path$$1) {
        // A reassignment of UNKNOWN_PATH is considered equivalent to having lost track
        // which means the return expression needs to be reassigned
        if (path$$1.length === 1 && path$$1[0] === UNKNOWN_KEY) {
            this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
        }
    };
    return ArrowFunctionExpression$$1;
}(NodeBase));
ArrowFunctionExpression$1.prototype.preventChildBlockScope = true;

var AssignmentExpression$1 = /** @class */ (function (_super) {
    __extends(AssignmentExpression, _super);
    function AssignmentExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignmentExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        this.left.deoptimizePath(EMPTY_PATH);
        // We cannot propagate mutations of the new binding to the old binding with certainty
        this.right.deoptimizePath(UNKNOWN_PATH);
    };
    AssignmentExpression.prototype.hasEffects = function (options) {
        return (this.right.hasEffects(options) ||
            this.left.hasEffects(options) ||
            this.left.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options));
    };
    AssignmentExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return path$$1.length > 0 && this.right.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    AssignmentExpression.prototype.render = function (code, options) {
        this.left.render(code, options);
        this.right.render(code, options);
        if (options.format === 'system' && this.left.variable && this.left.variable.exportName) {
            code.prependLeft(code.original.indexOf('=', this.left.end) + 1, " exports('" + this.left.variable.exportName + "',");
            code.prependRight(this.right.end, ")");
        }
    };
    return AssignmentExpression;
}(NodeBase));

var AssignmentPattern$1 = /** @class */ (function (_super) {
    __extends(AssignmentPattern, _super);
    function AssignmentPattern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignmentPattern.prototype.bind = function () {
        _super.prototype.bind.call(this);
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.deoptimizePath(UNKNOWN_PATH);
    };
    AssignmentPattern.prototype.declare = function (kind, init) {
        this.left.declare(kind, init);
    };
    AssignmentPattern.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return path$$1.length > 0 || this.left.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options);
    };
    AssignmentPattern.prototype.deoptimizePath = function (path$$1) {
        path$$1.length === 0 && this.left.deoptimizePath(path$$1);
    };
    return AssignmentPattern;
}(NodeBase));

var AwaitExpression$1 = /** @class */ (function (_super) {
    __extends(AwaitExpression, _super);
    function AwaitExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwaitExpression.prototype.include = function () {
        _super.prototype.include.call(this);
        if (!this.context.usesTopLevelAwait) {
            var parent = this.parent;
            do {
                if (parent instanceof FunctionNode || parent instanceof ArrowFunctionExpression$1)
                    return;
            } while ((parent = parent.parent));
            this.context.usesTopLevelAwait = true;
        }
    };
    AwaitExpression.prototype.hasEffects = function (options) {
        return _super.prototype.hasEffects.call(this, options) || !options.ignoreReturnAwaitYield();
    };
    AwaitExpression.prototype.render = function (code, options) {
        _super.prototype.render.call(this, code, options);
    };
    return AwaitExpression;
}(NodeBase));

var binaryOperators = {
    '==': function (left, right) { return left == right; },
    '!=': function (left, right) { return left != right; },
    '===': function (left, right) { return left === right; },
    '!==': function (left, right) { return left !== right; },
    '<': function (left, right) { return left < right; },
    '<=': function (left, right) { return left <= right; },
    '>': function (left, right) { return left > right; },
    '>=': function (left, right) { return left >= right; },
    '<<': function (left, right) { return left << right; },
    '>>': function (left, right) { return left >> right; },
    '>>>': function (left, right) { return left >>> right; },
    '+': function (left, right) { return left + right; },
    '-': function (left, right) { return left - right; },
    '*': function (left, right) { return left * right; },
    '/': function (left, right) { return left / right; },
    '%': function (left, right) { return left % right; },
    '|': function (left, right) { return left | right; },
    '^': function (left, right) { return left ^ right; },
    '&': function (left, right) { return left & right; },
    '**': function (left, right) { return Math.pow(left, right); },
    in: function () { return UNKNOWN_VALUE; },
    instanceof: function () { return UNKNOWN_VALUE; }
};
var BinaryExpression$1 = /** @class */ (function (_super) {
    __extends(BinaryExpression, _super);
    function BinaryExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BinaryExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (path$$1.length > 0)
            return UNKNOWN_VALUE;
        var leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (leftValue === UNKNOWN_VALUE)
            return UNKNOWN_VALUE;
        var rightValue = this.right.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (rightValue === UNKNOWN_VALUE)
            return UNKNOWN_VALUE;
        var operatorFn = binaryOperators[this.operator];
        if (!operatorFn)
            return UNKNOWN_VALUE;
        return operatorFn(leftValue, rightValue);
    };
    BinaryExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    return BinaryExpression;
}(NodeBase));

var BreakStatement$1 = /** @class */ (function (_super) {
    __extends(BreakStatement, _super);
    function BreakStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreakStatement.prototype.hasEffects = function (options) {
        return (_super.prototype.hasEffects.call(this, options) ||
            !options.ignoreBreakStatements() ||
            (this.label && !options.ignoreLabel(this.label.name)));
    };
    return BreakStatement;
}(NodeBase));

var RESULT_KEY$1 = {};
var ImmutableEntityPathTracker = /** @class */ (function () {
    function ImmutableEntityPathTracker(existingEntityPaths) {
        if (existingEntityPaths === void 0) { existingEntityPaths = immutable.Map(); }
        this.entityPaths = existingEntityPaths;
    }
    ImmutableEntityPathTracker.prototype.isTracked = function (entity, path$$1) {
        return this.entityPaths.getIn([entity].concat(path$$1, [RESULT_KEY$1]));
    };
    ImmutableEntityPathTracker.prototype.track = function (entity, path$$1) {
        return new ImmutableEntityPathTracker(this.entityPaths.setIn([entity].concat(path$$1, [RESULT_KEY$1]), true));
    };
    return ImmutableEntityPathTracker;
}());
var EMPTY_IMMUTABLE_TRACKER = new ImmutableEntityPathTracker();

var CallExpression$1 = /** @class */ (function (_super) {
    __extends(CallExpression, _super);
    function CallExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.callee instanceof Identifier$1) {
            var variable = this.scope.findVariable(this.callee.name);
            if (variable.isNamespace) {
                this.context.error({
                    code: 'CANNOT_CALL_NAMESPACE',
                    message: "Cannot call a namespace ('" + this.callee.name + "')"
                }, this.start);
            }
            if (this.callee.name === 'eval') {
                this.context.warn({
                    code: 'EVAL',
                    message: "Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
                    url: 'https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval'
                }, this.start);
            }
        }
        if (this.returnExpression === null) {
            this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
        }
        for (var _i = 0, _a = this.arguments; _i < _a.length; _i++) {
            var argument = _a[_i];
            // This will make sure all properties of parameters behave as "unknown"
            argument.deoptimizePath(UNKNOWN_PATH);
        }
    };
    CallExpression.prototype.deoptimizeCache = function () {
        if (this.returnExpression !== UNKNOWN_EXPRESSION) {
            this.returnExpression = UNKNOWN_EXPRESSION;
            for (var _i = 0, _a = this.expressionsToBeDeoptimized; _i < _a.length; _i++) {
                var expression = _a[_i];
                expression.deoptimizeCache();
            }
        }
    };
    CallExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.returnExpression === null) {
            this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, recursionTracker, this);
        }
        if (this.returnExpression === UNKNOWN_EXPRESSION ||
            recursionTracker.isTracked(this.returnExpression, path$$1)) {
            return UNKNOWN_VALUE;
        }
        this.expressionsToBeDeoptimized.push(origin);
        return this.returnExpression.getLiteralValueAtPath(path$$1, recursionTracker.track(this.returnExpression, path$$1), origin);
    };
    CallExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.returnExpression === null) {
            this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, recursionTracker, this);
        }
        if (this.returnExpression === UNKNOWN_EXPRESSION ||
            recursionTracker.isTracked(this.returnExpression, path$$1)) {
            return UNKNOWN_EXPRESSION;
        }
        this.expressionsToBeDeoptimized.push(origin);
        return this.returnExpression.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker.track(this.returnExpression, path$$1), origin);
    };
    CallExpression.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.arguments; _i < _a.length; _i++) {
            var argument = _a[_i];
            if (argument.hasEffects(options))
                return true;
        }
        return (this.callee.hasEffects(options) ||
            this.callee.hasEffectsWhenCalledAtPath(EMPTY_PATH, this.callOptions, options.getHasEffectsWhenCalledOptions()));
    };
    CallExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return (path$$1.length > 0 &&
            !options.hasReturnExpressionBeenAccessedAtPath(path$$1, this) &&
            this.returnExpression.hasEffectsWhenAccessedAtPath(path$$1, options.addAccessedReturnExpressionAtPath(path$$1, this)));
    };
    CallExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return (path$$1.length === 0 ||
            (!options.hasReturnExpressionBeenAssignedAtPath(path$$1, this) &&
                this.returnExpression.hasEffectsWhenAssignedAtPath(path$$1, options.addAssignedReturnExpressionAtPath(path$$1, this))));
    };
    CallExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (options.hasReturnExpressionBeenCalledAtPath(path$$1, this))
            return false;
        var innerOptions = options.addCalledReturnExpressionAtPath(path$$1, this);
        return (this.hasEffects(innerOptions) ||
            this.returnExpression.hasEffectsWhenCalledAtPath(path$$1, callOptions, innerOptions));
    };
    CallExpression.prototype.include = function () {
        _super.prototype.include.call(this);
        if (!this.returnExpression.included) {
            this.returnExpression.include();
        }
    };
    CallExpression.prototype.initialise = function () {
        this.included = false;
        this.returnExpression = null;
        this.callOptions = CallOptions.create({
            withNew: false,
            args: this.arguments,
            callIdentifier: this
        });
        this.expressionsToBeDeoptimized = [];
    };
    CallExpression.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length > 0 && !this.context.deoptimizationTracker.track(this, path$$1)) {
            if (this.returnExpression === null) {
                this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
            }
            this.returnExpression.deoptimizePath(path$$1);
        }
    };
    return CallExpression;
}(NodeBase));

var CatchScope = /** @class */ (function (_super) {
    __extends(CatchScope, _super);
    function CatchScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CatchScope.prototype.addDeclaration = function (identifier, deoptimizationTracker, init, isHoisted) {
        if (init === void 0) { init = null; }
        if (isHoisted === void 0) { isHoisted = false; }
        if (isHoisted) {
            return this.parent.addDeclaration(identifier, deoptimizationTracker, init, true);
        }
        else {
            return _super.prototype.addDeclaration.call(this, identifier, deoptimizationTracker, init, false);
        }
    };
    return CatchScope;
}(ParameterScope));

var CatchClause$1 = /** @class */ (function (_super) {
    __extends(CatchClause, _super);
    function CatchClause() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CatchClause.prototype.createScope = function (parentScope) {
        this.scope = new CatchScope(parentScope);
    };
    CatchClause.prototype.initialise = function () {
        this.included = false;
        this.param.declare('parameter', UNKNOWN_EXPRESSION);
    };
    CatchClause.prototype.parseNode = function (esTreeNode) {
        this.body = new this.context.nodeConstructors.BlockStatement(esTreeNode.body, this, this.scope);
        _super.prototype.parseNode.call(this, esTreeNode);
    };
    return CatchClause;
}(NodeBase));
CatchClause$1.prototype.preventChildBlockScope = true;

var ClassBody$1 = /** @class */ (function (_super) {
    __extends(ClassBody, _super);
    function ClassBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassBody.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length > 0) {
            return true;
        }
        return (this.classConstructor !== null &&
            this.classConstructor.hasEffectsWhenCalledAtPath(EMPTY_PATH, callOptions, options));
    };
    ClassBody.prototype.initialise = function () {
        this.included = false;
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var method = _a[_i];
            if (method.kind === 'constructor') {
                this.classConstructor = method;
                return;
            }
        }
        this.classConstructor = null;
    };
    return ClassBody;
}(NodeBase));

var ClassExpression$1 = /** @class */ (function (_super) {
    __extends(ClassExpression, _super);
    function ClassExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClassExpression;
}(ClassNode));

var MultiExpression = /** @class */ (function () {
    function MultiExpression(expressions) {
        this.expressions = expressions;
    }
    MultiExpression.prototype.getLiteralValueAtPath = function () {
        return UNKNOWN_VALUE;
    };
    MultiExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        return new MultiExpression(this.expressions.map(function (expression) {
            return expression.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
        }));
    };
    MultiExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            if (expression.hasEffectsWhenAccessedAtPath(path$$1, options))
                return true;
        }
        return false;
    };
    MultiExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            if (expression.hasEffectsWhenAssignedAtPath(path$$1, options))
                return true;
        }
        return false;
    };
    MultiExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            if (expression.hasEffectsWhenCalledAtPath(path$$1, callOptions, options))
                return true;
        }
        return false;
    };
    MultiExpression.prototype.include = function () { };
    MultiExpression.prototype.deoptimizePath = function (path$$1) {
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            expression.deoptimizePath(path$$1);
        }
    };
    return MultiExpression;
}());

var ConditionalExpression$1 = /** @class */ (function (_super) {
    __extends(ConditionalExpression, _super);
    function ConditionalExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionalExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
    };
    ConditionalExpression.prototype.deoptimizeCache = function () {
        if (this.usedBranch !== null) {
            // We did not track if there were reassignments to the previous branch.
            // Also, the return value might need to be reassigned.
            this.usedBranch = null;
            this.unusedBranch.deoptimizePath(UNKNOWN_PATH);
            for (var _i = 0, _a = this.expressionsToBeDeoptimized; _i < _a.length; _i++) {
                var expression = _a[_i];
                expression.deoptimizeCache();
            }
        }
    };
    ConditionalExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
        if (this.usedBranch === null)
            return UNKNOWN_VALUE;
        this.expressionsToBeDeoptimized.push(origin);
        return this.usedBranch.getLiteralValueAtPath(path$$1, recursionTracker, origin);
    };
    ConditionalExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
        if (this.usedBranch === null)
            return new MultiExpression([
                this.consequent.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin),
                this.alternate.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin)
            ]);
        this.expressionsToBeDeoptimized.push(origin);
        return this.usedBranch.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
    };
    ConditionalExpression.prototype.hasEffects = function (options) {
        if (this.test.hasEffects(options))
            return true;
        if (this.usedBranch === null) {
            return this.consequent.hasEffects(options) || this.alternate.hasEffects(options);
        }
        return this.usedBranch.hasEffects(options);
    };
    ConditionalExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return false;
        if (this.usedBranch === null) {
            return (this.consequent.hasEffectsWhenAccessedAtPath(path$$1, options) ||
                this.alternate.hasEffectsWhenAccessedAtPath(path$$1, options));
        }
        return this.usedBranch.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    ConditionalExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return true;
        if (this.usedBranch === null) {
            return (this.consequent.hasEffectsWhenAssignedAtPath(path$$1, options) ||
                this.alternate.hasEffectsWhenAssignedAtPath(path$$1, options));
        }
        return this.usedBranch.hasEffectsWhenAssignedAtPath(path$$1, options);
    };
    ConditionalExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (this.usedBranch === null) {
            return (this.consequent.hasEffectsWhenCalledAtPath(path$$1, callOptions, options) ||
                this.alternate.hasEffectsWhenCalledAtPath(path$$1, callOptions, options));
        }
        return this.usedBranch.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
    };
    ConditionalExpression.prototype.initialise = function () {
        this.included = false;
        this.isBranchResolutionAnalysed = false;
        this.usedBranch = null;
        this.unusedBranch = null;
        this.expressionsToBeDeoptimized = [];
    };
    ConditionalExpression.prototype.include = function () {
        this.included = true;
        if (this.usedBranch === null || this.test.shouldBeIncluded()) {
            this.test.include();
            this.consequent.include();
            this.alternate.include();
        }
        else {
            this.usedBranch.include();
        }
    };
    ConditionalExpression.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length > 0) {
            if (!this.isBranchResolutionAnalysed)
                this.analyseBranchResolution();
            if (this.usedBranch === null) {
                this.consequent.deoptimizePath(path$$1);
                this.alternate.deoptimizePath(path$$1);
            }
            else {
                this.usedBranch.deoptimizePath(path$$1);
            }
        }
    };
    ConditionalExpression.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, renderedParentType = _b.renderedParentType, isCalleeOfRenderedParent = _b.isCalleeOfRenderedParent;
        if (!this.test.included) {
            code.remove(this.start, this.usedBranch.start);
            code.remove(this.usedBranch.end, this.end);
            this.usedBranch.render(code, options, {
                renderedParentType: renderedParentType || this.parent.type,
                isCalleeOfRenderedParent: renderedParentType
                    ? isCalleeOfRenderedParent
                    : this.parent.callee === this
            });
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    ConditionalExpression.prototype.analyseBranchResolution = function () {
        this.isBranchResolutionAnalysed = true;
        var testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
        if (testValue !== UNKNOWN_VALUE) {
            if (testValue) {
                this.usedBranch = this.consequent;
                this.unusedBranch = this.alternate;
            }
            else {
                this.usedBranch = this.alternate;
                this.unusedBranch = this.consequent;
            }
        }
    };
    return ConditionalExpression;
}(NodeBase));

var DoWhileStatement$1 = /** @class */ (function (_super) {
    __extends(DoWhileStatement, _super);
    function DoWhileStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoWhileStatement.prototype.hasEffects = function (options) {
        return (this.test.hasEffects(options) || this.body.hasEffects(options.setIgnoreBreakStatements()));
    };
    return DoWhileStatement;
}(NodeBase));

var EmptyStatement$1 = /** @class */ (function (_super) {
    __extends(EmptyStatement$$1, _super);
    function EmptyStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyStatement$$1.prototype.render = function (code, _options) {
        if (this.parent.type === BlockStatement || this.parent.type === Program) {
            code.remove(this.start, this.end);
        }
    };
    return EmptyStatement$$1;
}(NodeBase));

var ExportAllDeclaration$1 = /** @class */ (function (_super) {
    __extends(ExportAllDeclaration, _super);
    function ExportAllDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportAllDeclaration.prototype.initialise = function () {
        this.included = false;
        this.context.addExport(this);
    };
    ExportAllDeclaration.prototype.render = function (code, _options, _a) {
        var _b = _a === void 0 ? BLANK : _a, start = _b.start, end = _b.end;
        code.remove(start, end);
    };
    return ExportAllDeclaration;
}(NodeBase));
ExportAllDeclaration$1.prototype.needsBoundaries = true;

var ExportNamedDeclaration$1 = /** @class */ (function (_super) {
    __extends(ExportNamedDeclaration, _super);
    function ExportNamedDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportNamedDeclaration.prototype.bind = function () {
        // Do not bind specifiers
        if (this.declaration !== null)
            this.declaration.bind();
    };
    ExportNamedDeclaration.prototype.hasEffects = function (options) {
        return this.declaration && this.declaration.hasEffects(options);
    };
    ExportNamedDeclaration.prototype.initialise = function () {
        this.included = false;
        this.context.addExport(this);
    };
    ExportNamedDeclaration.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, start = _b.start, end = _b.end;
        if (this.declaration === null) {
            code.remove(start, end);
        }
        else {
            code.remove(this.start, this.declaration.start);
            this.declaration.render(code, options, { start: start, end: end });
        }
    };
    return ExportNamedDeclaration;
}(NodeBase));
ExportNamedDeclaration$1.prototype.needsBoundaries = true;

var ExpressionStatement$1 = /** @class */ (function (_super) {
    __extends(ExpressionStatement$$1, _super);
    function ExpressionStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionStatement$$1.prototype.initialise = function () {
        this.included = false;
        if (this.directive &&
            this.directive !== 'use strict' &&
            this.parent.type === Program) {
            this.context.warn(
            // This is necessary, because either way (deleting or not) can lead to errors.
            {
                code: 'MODULE_LEVEL_DIRECTIVE',
                message: "Module level directives cause errors when bundled, '" + this.directive + "' was ignored."
            }, this.start);
        }
    };
    ExpressionStatement$$1.prototype.shouldBeIncluded = function () {
        if (this.directive && this.directive !== 'use strict')
            return this.parent.type !== Program;
        return _super.prototype.shouldBeIncluded.call(this);
    };
    ExpressionStatement$$1.prototype.render = function (code, options) {
        _super.prototype.render.call(this, code, options);
        if (this.included)
            this.insertSemicolon(code);
    };
    return ExpressionStatement$$1;
}(NodeBase));

var ForInStatement$1 = /** @class */ (function (_super) {
    __extends(ForInStatement$$1, _super);
    function ForInStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForInStatement$$1.prototype.bind = function () {
        this.left.bind();
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.bind();
        this.body.bind();
    };
    ForInStatement$$1.prototype.createScope = function (parentScope) {
        this.scope = new BlockScope(parentScope);
    };
    ForInStatement$$1.prototype.hasEffects = function (options) {
        return ((this.left &&
            (this.left.hasEffects(options) ||
                this.left.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options))) ||
            (this.right && this.right.hasEffects(options)) ||
            this.body.hasEffects(options.setIgnoreBreakStatements()));
    };
    ForInStatement$$1.prototype.include = function () {
        this.included = true;
        this.left.includeWithAllDeclaredVariables();
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.include();
        this.body.include();
    };
    ForInStatement$$1.prototype.render = function (code, options) {
        this.left.render(code, options, NO_SEMICOLON);
        this.right.render(code, options, NO_SEMICOLON);
        this.body.render(code, options);
    };
    return ForInStatement$$1;
}(NodeBase));

var ForOfStatement$1 = /** @class */ (function (_super) {
    __extends(ForOfStatement$$1, _super);
    function ForOfStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForOfStatement$$1.prototype.bind = function () {
        this.left.bind();
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.bind();
        this.body.bind();
    };
    ForOfStatement$$1.prototype.createScope = function (parentScope) {
        this.scope = new BlockScope(parentScope);
    };
    ForOfStatement$$1.prototype.hasEffects = function (options) {
        return ((this.left &&
            (this.left.hasEffects(options) ||
                this.left.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options))) ||
            (this.right && this.right.hasEffects(options)) ||
            this.body.hasEffects(options.setIgnoreBreakStatements()));
    };
    ForOfStatement$$1.prototype.include = function () {
        this.included = true;
        this.left.includeWithAllDeclaredVariables();
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.include();
        this.body.include();
    };
    ForOfStatement$$1.prototype.render = function (code, options) {
        this.left.render(code, options, NO_SEMICOLON);
        this.right.render(code, options, NO_SEMICOLON);
        this.body.render(code, options);
    };
    return ForOfStatement$$1;
}(NodeBase));

var ForStatement$1 = /** @class */ (function (_super) {
    __extends(ForStatement$$1, _super);
    function ForStatement$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForStatement$$1.prototype.createScope = function (parentScope) {
        this.scope = new BlockScope(parentScope);
    };
    ForStatement$$1.prototype.hasEffects = function (options) {
        return ((this.init && this.init.hasEffects(options)) ||
            (this.test && this.test.hasEffects(options)) ||
            (this.update && this.update.hasEffects(options)) ||
            this.body.hasEffects(options.setIgnoreBreakStatements()));
    };
    ForStatement$$1.prototype.render = function (code, options) {
        if (this.init)
            this.init.render(code, options, NO_SEMICOLON);
        if (this.test)
            this.test.render(code, options, NO_SEMICOLON);
        if (this.update)
            this.update.render(code, options, NO_SEMICOLON);
        this.body.render(code, options);
    };
    return ForStatement$$1;
}(NodeBase));

var FunctionExpression$1 = /** @class */ (function (_super) {
    __extends(FunctionExpression, _super);
    function FunctionExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FunctionExpression;
}(FunctionNode));

var IfStatement$1 = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IfStatement.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (!this.isTestValueAnalysed) {
            this.testValue = UNKNOWN_VALUE;
            this.isTestValueAnalysed = true;
            this.testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
        }
    };
    IfStatement.prototype.deoptimizeCache = function () {
        this.testValue = UNKNOWN_VALUE;
    };
    IfStatement.prototype.hasEffects = function (options) {
        if (this.test.hasEffects(options))
            return true;
        if (this.testValue === UNKNOWN_VALUE) {
            return (this.consequent.hasEffects(options) ||
                (this.alternate !== null && this.alternate.hasEffects(options)));
        }
        return this.testValue
            ? this.consequent.hasEffects(options)
            : this.alternate !== null && this.alternate.hasEffects(options);
    };
    IfStatement.prototype.include = function () {
        this.included = true;
        if (this.testValue === UNKNOWN_VALUE || this.test.shouldBeIncluded()) {
            this.test.include();
        }
        if ((this.testValue === UNKNOWN_VALUE || this.testValue) &&
            this.consequent.shouldBeIncluded()) {
            this.consequent.include();
        }
        if (this.alternate !== null &&
            ((this.testValue === UNKNOWN_VALUE || !this.testValue) && this.alternate.shouldBeIncluded())) {
            this.alternate.include();
        }
    };
    IfStatement.prototype.initialise = function () {
        this.included = false;
        this.isTestValueAnalysed = false;
    };
    IfStatement.prototype.render = function (code, options) {
        // Note that unknown test values are always included
        if (!this.test.included &&
            (this.testValue
                ? this.alternate === null || !this.alternate.included
                : !this.consequent.included)) {
            var singleRetainedBranch = this.testValue ? this.consequent : this.alternate;
            code.remove(this.start, singleRetainedBranch.start);
            code.remove(singleRetainedBranch.end, this.end);
            singleRetainedBranch.render(code, options);
        }
        else {
            if (this.test.included) {
                this.test.render(code, options);
            }
            else {
                code.overwrite(this.test.start, this.test.end, this.testValue ? 'true' : 'false');
            }
            if (this.consequent.included) {
                this.consequent.render(code, options);
            }
            else {
                code.overwrite(this.consequent.start, this.consequent.end, ';');
            }
            if (this.alternate !== null) {
                if (this.alternate.included) {
                    this.alternate.render(code, options);
                }
                else {
                    code.remove(this.consequent.end, this.alternate.end);
                }
            }
        }
    };
    return IfStatement;
}(NodeBase));

var getDynamicImportMechanism = function (format, compact) {
    switch (format) {
        case 'cjs': {
            var _ = compact ? '' : ' ';
            return {
                left: 'Promise.resolve(require(',
                right: '))',
                interopLeft: "Promise.resolve({" + _ + "default:" + _ + "require(",
                interopRight: ")" + _ + "})"
            };
        }
        case 'amd': {
            var _ = compact ? '' : ' ';
            var resolve$$1 = compact ? 'c' : 'resolve';
            var reject = compact ? 'e' : 'reject';
            return {
                left: "new Promise(function" + _ + "(" + resolve$$1 + "," + _ + reject + ")" + _ + "{" + _ + "require([",
                right: "]," + _ + resolve$$1 + "," + _ + reject + ")" + _ + "})",
                interopLeft: "new Promise(function" + _ + "(" + resolve$$1 + "," + _ + reject + ")" + _ + "{" + _ + "require([",
                interopRight: "]," + _ + "function" + _ + "(m)" + _ + "{" + _ + resolve$$1 + "({" + _ + "default:" + _ + "m" + _ + "})" + _ + "}," + _ + reject + ")" + _ + "})"
            };
        }
        case 'system':
            return {
                left: 'module.import(',
                right: ')'
            };
    }
};
var Import$1 = /** @class */ (function (_super) {
    __extends(Import, _super);
    function Import() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Import.prototype.initialise = function () {
        this.included = false;
        this.resolutionNamespace = undefined;
        this.resolutionInterop = false;
        this.rendered = false;
        this.context.addDynamicImport(this);
    };
    Import.prototype.renderFinalResolution = function (code, resolution) {
        // avoid unnecessary writes when tree-shaken
        if (this.rendered)
            code.overwrite(this.parent.arguments[0].start, this.parent.arguments[0].end, resolution);
    };
    Import.prototype.render = function (code, options) {
        this.rendered = true;
        if (this.resolutionNamespace) {
            var _ = options.compact ? '' : ' ';
            var s = options.compact ? '' : ';';
            code.overwrite(this.parent.start, this.parent.end, "Promise.resolve().then(function" + _ + "()" + _ + "{" + _ + "return " + this.resolutionNamespace + s + _ + "})");
            return;
        }
        var importMechanism = getDynamicImportMechanism(options.format, options.compact);
        if (importMechanism) {
            var leftMechanism = (this.resolutionInterop && importMechanism.interopLeft) || importMechanism.left;
            code.overwrite(this.parent.start, this.parent.arguments[0].start, leftMechanism);
            var rightMechanism = (this.resolutionInterop && importMechanism.interopRight) || importMechanism.right;
            code.overwrite(this.parent.arguments[0].end, this.parent.end, rightMechanism);
        }
    };
    Import.prototype.setResolution = function (interop, namespace) {
        if (namespace === void 0) { namespace = undefined; }
        this.rendered = false;
        this.resolutionInterop = interop;
        this.resolutionNamespace = namespace;
    };
    return Import;
}(NodeBase));

var ImportDeclaration$1 = /** @class */ (function (_super) {
    __extends(ImportDeclaration, _super);
    function ImportDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportDeclaration.prototype.bind = function () { };
    ImportDeclaration.prototype.initialise = function () {
        this.included = false;
        this.context.addImport(this);
    };
    ImportDeclaration.prototype.hasEffects = function () {
        return false;
    };
    ImportDeclaration.prototype.render = function (code, _options, _a) {
        var _b = _a === void 0 ? BLANK : _a, start = _b.start, end = _b.end;
        code.remove(start, end);
    };
    return ImportDeclaration;
}(NodeBase));
ImportDeclaration$1.prototype.needsBoundaries = true;

var LabeledStatement$1 = /** @class */ (function (_super) {
    __extends(LabeledStatement, _super);
    function LabeledStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabeledStatement.prototype.hasEffects = function (options) {
        return this.body.hasEffects(options.setIgnoreLabel(this.label.name).setIgnoreBreakStatements());
    };
    return LabeledStatement;
}(NodeBase));

function isLiteral(node) {
    return node.type === Literal;
}
var Literal$1 = /** @class */ (function (_super) {
    __extends(Literal$$1, _super);
    function Literal$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Literal$$1.prototype.getLiteralValueAtPath = function (path$$1) {
        if (path$$1.length > 0) {
            return UNKNOWN_VALUE;
        }
        // not sure why we need this type cast here
        return this.value;
    };
    Literal$$1.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1) {
        if (path$$1.length !== 1)
            return UNKNOWN_EXPRESSION;
        return getMemberReturnExpressionWhenCalled(this.members, path$$1[0]);
    };
    Literal$$1.prototype.hasEffectsWhenAccessedAtPath = function (path$$1) {
        if (this.value === null) {
            return path$$1.length > 0;
        }
        return path$$1.length > 1;
    };
    Literal$$1.prototype.hasEffectsWhenAssignedAtPath = function (path$$1) {
        return path$$1.length > 0;
    };
    Literal$$1.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (path$$1.length === 1) {
            return hasMemberEffectWhenCalled(this.members, path$$1[0], this.included, callOptions, options);
        }
        return true;
    };
    Literal$$1.prototype.initialise = function () {
        this.included = false;
        this.members = getLiteralMembersForValue(this.value);
    };
    Literal$$1.prototype.render = function (code, _options) {
        if (typeof this.value === 'string') {
            code.indentExclusionRanges.push([this.start + 1, this.end - 1]);
        }
    };
    return Literal$$1;
}(NodeBase));

var LogicalExpression$1 = /** @class */ (function (_super) {
    __extends(LogicalExpression, _super);
    function LogicalExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogicalExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
    };
    LogicalExpression.prototype.deoptimizeCache = function () {
        if (this.usedBranch !== null) {
            // We did not track if there were reassignments to any of the branches.
            // Also, the return values might need reassignment.
            this.usedBranch = null;
            this.unusedBranch.deoptimizePath(UNKNOWN_PATH);
            for (var _i = 0, _a = this.expressionsToBeDeoptimized; _i < _a.length; _i++) {
                var expression = _a[_i];
                expression.deoptimizeCache();
            }
        }
    };
    LogicalExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
        if (this.usedBranch === null)
            return UNKNOWN_VALUE;
        this.expressionsToBeDeoptimized.push(origin);
        return this.usedBranch.getLiteralValueAtPath(path$$1, recursionTracker, origin);
    };
    LogicalExpression.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (!this.isBranchResolutionAnalysed)
            this.analyseBranchResolution();
        if (this.usedBranch === null)
            return new MultiExpression([
                this.left.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin),
                this.right.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin)
            ]);
        this.expressionsToBeDeoptimized.push(origin);
        return this.usedBranch.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
    };
    LogicalExpression.prototype.hasEffects = function (options) {
        if (this.usedBranch === null) {
            return this.left.hasEffects(options) || this.right.hasEffects(options);
        }
        return this.usedBranch.hasEffects(options);
    };
    LogicalExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return false;
        if (this.usedBranch === null) {
            return (this.left.hasEffectsWhenAccessedAtPath(path$$1, options) ||
                this.right.hasEffectsWhenAccessedAtPath(path$$1, options));
        }
        return this.usedBranch.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    LogicalExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return true;
        if (this.usedBranch === null) {
            return (this.left.hasEffectsWhenAssignedAtPath(path$$1, options) ||
                this.right.hasEffectsWhenAssignedAtPath(path$$1, options));
        }
        return this.usedBranch.hasEffectsWhenAssignedAtPath(path$$1, options);
    };
    LogicalExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (this.usedBranch === null) {
            return (this.left.hasEffectsWhenCalledAtPath(path$$1, callOptions, options) ||
                this.right.hasEffectsWhenCalledAtPath(path$$1, callOptions, options));
        }
        return this.usedBranch.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
    };
    LogicalExpression.prototype.include = function () {
        this.included = true;
        if (this.usedBranch === null || this.unusedBranch.shouldBeIncluded()) {
            this.left.include();
            this.right.include();
        }
        else {
            this.usedBranch.include();
        }
    };
    LogicalExpression.prototype.initialise = function () {
        this.included = false;
        this.isBranchResolutionAnalysed = false;
        this.usedBranch = null;
        this.unusedBranch = null;
        this.expressionsToBeDeoptimized = [];
    };
    LogicalExpression.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length > 0) {
            if (!this.isBranchResolutionAnalysed)
                this.analyseBranchResolution();
            if (this.usedBranch === null) {
                this.left.deoptimizePath(path$$1);
                this.right.deoptimizePath(path$$1);
            }
            else {
                this.usedBranch.deoptimizePath(path$$1);
            }
        }
    };
    LogicalExpression.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, renderedParentType = _b.renderedParentType, isCalleeOfRenderedParent = _b.isCalleeOfRenderedParent;
        if (!this.left.included || !this.right.included) {
            code.remove(this.start, this.usedBranch.start);
            code.remove(this.usedBranch.end, this.end);
            this.usedBranch.render(code, options, {
                renderedParentType: renderedParentType || this.parent.type,
                isCalleeOfRenderedParent: renderedParentType
                    ? isCalleeOfRenderedParent
                    : this.parent.callee === this
            });
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    LogicalExpression.prototype.analyseBranchResolution = function () {
        this.isBranchResolutionAnalysed = true;
        var leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
        if (leftValue !== UNKNOWN_VALUE) {
            if (this.operator === '||' ? leftValue : !leftValue) {
                this.usedBranch = this.left;
                this.unusedBranch = this.right;
            }
            else {
                this.usedBranch = this.right;
                this.unusedBranch = this.left;
            }
        }
    };
    return LogicalExpression;
}(NodeBase));

function getAliasName(resolved, unresolved) {
    var alias = basename(unresolved || resolved);
    var ext = extname(resolved);
    if (alias.endsWith(ext))
        alias = alias.substr(0, alias.length - ext.length);
    return alias;
}
function relativeId(id) {
    if (typeof process === 'undefined' || !isAbsolute(id))
        return id;
    return relative(process.cwd(), id);
}
function isPlainName(name) {
    // not starting with "./", "/". "../"
    if (name[0] === '/' ||
        (name[1] === '.' && (name[2] === '/' || (name[2] === '.' && name[3] === '/'))))
        return false;
    // not a URL
    if (name.indexOf(':') !== -1)
        return false;
    return true;
}

function getResolvablePropertyKey(memberExpression) {
    return memberExpression.computed
        ? getResolvableComputedPropertyKey(memberExpression.property)
        : memberExpression.property.name;
}
function getResolvableComputedPropertyKey(propertyKey) {
    if (propertyKey instanceof Literal$1) {
        return String(propertyKey.value);
    }
    return null;
}
function getPathIfNotComputed(memberExpression) {
    var nextPathKey = memberExpression.propertyKey;
    var object = memberExpression.object;
    if (typeof nextPathKey === 'string') {
        if (object instanceof Identifier$1) {
            return [
                { key: object.name, pos: object.start },
                { key: nextPathKey, pos: memberExpression.property.start }
            ];
        }
        if (isMemberExpression(object)) {
            var parentPath = getPathIfNotComputed(object);
            return (parentPath && parentPath.concat([{ key: nextPathKey, pos: memberExpression.property.start }]));
        }
    }
    return null;
}
function isMemberExpression(node) {
    return node.type === MemberExpression;
}
var MemberExpression$1 = /** @class */ (function (_super) {
    __extends(MemberExpression$$1, _super);
    function MemberExpression$$1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.variable = null;
        return _this;
    }
    MemberExpression$$1.prototype.bind = function () {
        if (this.bound)
            return;
        this.bound = true;
        var path$$1 = getPathIfNotComputed(this);
        var baseVariable = path$$1 && this.scope.findVariable(path$$1[0].key);
        if (baseVariable && baseVariable.isNamespace) {
            var resolvedVariable = this.resolveNamespaceVariables(baseVariable, path$$1.slice(1));
            if (!resolvedVariable) {
                _super.prototype.bind.call(this);
            }
            else if (typeof resolvedVariable === 'string') {
                this.replacement = resolvedVariable;
            }
            else {
                if (resolvedVariable.isExternal && resolvedVariable.module) {
                    resolvedVariable.module.suggestName(path$$1[0].key);
                }
                this.variable = resolvedVariable;
            }
        }
        else {
            _super.prototype.bind.call(this);
            if (this.propertyKey === null)
                this.analysePropertyKey();
        }
    };
    MemberExpression$$1.prototype.deoptimizeCache = function () {
        for (var _i = 0, _a = this.expressionsToBeDeoptimized; _i < _a.length; _i++) {
            var expression = _a[_i];
            expression.deoptimizeCache();
        }
    };
    MemberExpression$$1.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.variable !== null) {
            return this.variable.getLiteralValueAtPath(path$$1, recursionTracker, origin);
        }
        if (this.propertyKey === null)
            this.analysePropertyKey();
        this.expressionsToBeDeoptimized.push(origin);
        return this.object.getLiteralValueAtPath([this.propertyKey].concat(path$$1), recursionTracker, origin);
    };
    MemberExpression$$1.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.variable !== null) {
            return this.variable.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
        }
        if (this.propertyKey === null)
            this.analysePropertyKey();
        this.expressionsToBeDeoptimized.push(origin);
        return this.object.getReturnExpressionWhenCalledAtPath([this.propertyKey].concat(path$$1), recursionTracker, origin);
    };
    MemberExpression$$1.prototype.hasEffects = function (options) {
        return (this.property.hasEffects(options) ||
            this.object.hasEffects(options) ||
            (this.context.propertyReadSideEffects &&
                this.object.hasEffectsWhenAccessedAtPath([this.propertyKey], options)));
    };
    MemberExpression$$1.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (path$$1.length === 0) {
            return false;
        }
        if (this.variable !== null) {
            return this.variable.hasEffectsWhenAccessedAtPath(path$$1, options);
        }
        return this.object.hasEffectsWhenAccessedAtPath([this.propertyKey].concat(path$$1), options);
    };
    MemberExpression$$1.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (this.variable !== null) {
            return this.variable.hasEffectsWhenAssignedAtPath(path$$1, options);
        }
        return this.object.hasEffectsWhenAssignedAtPath([this.propertyKey].concat(path$$1), options);
    };
    MemberExpression$$1.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (this.variable !== null) {
            return this.variable.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
        }
        return this.object.hasEffectsWhenCalledAtPath([this.propertyKey].concat(path$$1), callOptions, options);
    };
    MemberExpression$$1.prototype.include = function () {
        if (!this.included) {
            this.included = true;
            if (this.variable !== null && !this.variable.included) {
                this.variable.include();
                this.context.requestTreeshakingPass();
            }
        }
        this.object.include();
        this.property.include();
    };
    MemberExpression$$1.prototype.initialise = function () {
        this.included = false;
        this.propertyKey = getResolvablePropertyKey(this);
        this.variable = null;
        this.bound = false;
        this.replacement = null;
        this.expressionsToBeDeoptimized = [];
    };
    MemberExpression$$1.prototype.deoptimizePath = function (path$$1) {
        if (!this.bound)
            this.bind();
        if (path$$1.length === 0)
            this.disallowNamespaceReassignment();
        if (this.variable) {
            this.variable.deoptimizePath(path$$1);
        }
        else {
            if (this.propertyKey === null)
                this.analysePropertyKey();
            this.object.deoptimizePath([this.propertyKey].concat(path$$1));
        }
    };
    MemberExpression$$1.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, renderedParentType = _b.renderedParentType, isCalleeOfRenderedParent = _b.isCalleeOfRenderedParent;
        var isCalleeOfDifferentParent = renderedParentType === CallExpression && isCalleeOfRenderedParent;
        if (this.variable || this.replacement) {
            var replacement = this.variable ? this.variable.getName() : this.replacement;
            if (isCalleeOfDifferentParent)
                replacement = '0, ' + replacement;
            code.overwrite(this.start, this.end, replacement, {
                storeName: true,
                contentOnly: true
            });
        }
        else {
            if (isCalleeOfDifferentParent) {
                code.appendRight(this.start, '0, ');
            }
            _super.prototype.render.call(this, code, options);
        }
    };
    MemberExpression$$1.prototype.disallowNamespaceReassignment = function () {
        if (this.object instanceof Identifier$1 &&
            this.scope.findVariable(this.object.name).isNamespace) {
            this.context.error({
                code: 'ILLEGAL_NAMESPACE_REASSIGNMENT',
                message: "Illegal reassignment to import '" + this.object.name + "'"
            }, this.start);
        }
    };
    MemberExpression$$1.prototype.resolveNamespaceVariables = function (baseVariable, path$$1) {
        if (path$$1.length === 0)
            return baseVariable;
        if (!baseVariable.isNamespace)
            return null;
        var exportName = path$$1[0].key;
        var variable = baseVariable.isExternal
            ? baseVariable.module.traceExport(exportName)
            : baseVariable.context.traceExport(exportName);
        if (!variable) {
            var fileName = baseVariable.isExternal
                ? baseVariable.module.id
                : baseVariable.context.fileName;
            this.context.warn({
                code: 'MISSING_EXPORT',
                missing: exportName,
                importer: relativeId(this.context.fileName),
                exporter: relativeId(fileName),
                message: "'" + exportName + "' is not exported by '" + relativeId(fileName) + "'",
                url: "https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module"
            }, path$$1[0].pos);
            return 'undefined';
        }
        return this.resolveNamespaceVariables(variable, path$$1.slice(1));
    };
    MemberExpression$$1.prototype.analysePropertyKey = function () {
        this.propertyKey = UNKNOWN_KEY;
        var value = this.property.getLiteralValueAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
        this.propertyKey = value === UNKNOWN_VALUE ? UNKNOWN_KEY : String(value);
    };
    return MemberExpression$$1;
}(NodeBase));

var globalImportMetaUrlMechanism = "(typeof document !== 'undefined' ? document.currentScript && document.currentScript.src || document.baseURI : new (typeof URL !== 'undefined' ? URL : require('ur'+'l').URL)('file:' + __filename).href)";
var importMetaUrlMechanisms = {
    amd: "new URL((typeof process !== 'undefined' && process.versions && process.versions.node ? 'file:' : '') + module.uri).href",
    cjs: "new (typeof URL !== 'undefined' ? URL : require('ur'+'l').URL)((process.browser ? '' : 'file:') + __filename, process.browser && document.baseURI).href",
    iife: globalImportMetaUrlMechanism,
    umd: globalImportMetaUrlMechanism
};
var globalImportMetaUrlMechanismCompact = "(typeof document!=='undefined'?document.currentScript&&document.currentScript.src||document.baseURI:new(typeof URL!=='undefined'?URL:require('ur'+'l').URL)('file:'+__filename).href)";
var importMetaUrlMechanismsCompact = {
    amd: "new URL((typeof process!=='undefined'&&process.versions&&process.versions.node?'file:':'')+module.uri).href",
    cjs: "new(typeof URL!=='undefined'?URL:require('ur'+'l').URL)((process.browser?'':'file:')+__filename,process.browser&&document.baseURI).href",
    iife: globalImportMetaUrlMechanismCompact,
    umd: globalImportMetaUrlMechanismCompact
};
var globalRelUrlMechanism = function (relPath, compact) {
    var _ = compact ? '' : ' ';
    return "new" + _ + "(typeof URL" + _ + "!==" + _ + "'undefined'" + _ + "?" + _ + "URL" + _ + ":" + _ + "require('ur'+'l').URL)((typeof document" + _ + "!==" + _ + "'undefined'" + _ + "?" + _ + "document.currentScript" + _ + "&&" + _ + "document.currentScript.src" + _ + "||" + _ + "document.baseURI" + _ + ":" + _ + "'file:'" + _ + "+" + _ + "__filename)" + _ + "+" + _ + "'/../" + relPath + "').href";
};
var relUrlMechanisms = {
    amd: function (relPath, compact) {
        var _ = compact ? '' : ' ';
        return "new URL((typeof process" + _ + "!==" + _ + "'undefined'" + _ + "&&" + _ + "process.versions" + _ + "&&" + _ + "process.versions.node" + _ + "?" + _ + "'file:'" + _ + ":" + _ + "'')" + _ + "+" + _ + "module.uri" + _ + "+" + _ + "'/../" + relPath + "').href";
    },
    cjs: function (relPath, compact) {
        var _ = compact ? '' : ' ';
        return "new" + _ + "(typeof URL" + _ + "!==" + _ + "'undefined'" + _ + "?" + _ + "URL" + _ + ":" + _ + "require('ur'+'l').URL)((process.browser" + _ + "?" + _ + "''" + _ + ":" + _ + "'file:')" + _ + "+" + _ + "__dirname" + _ + "+" + _ + "'/" + relPath + "'," + _ + "process.browser" + _ + "&&" + _ + "document.baseURI).href";
    },
    es: function (relPath, compact) {
        var _ = compact ? '' : ' ';
        return "new URL('../" + relPath + "'," + _ + "import.meta.url).href";
    },
    system: function (relPath, compact) {
        var _ = compact ? '' : ' ';
        return "new URL('../" + relPath + "'," + _ + "module.url).href";
    },
    iife: globalRelUrlMechanism,
    umd: globalRelUrlMechanism
};
var MetaProperty$1 = /** @class */ (function (_super) {
    __extends(MetaProperty, _super);
    function MetaProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MetaProperty.prototype.initialise = function () {
        if (this.meta.name === 'import') {
            this.rendered = false;
            this.context.addImportMeta(this);
        }
        this.included = false;
    };
    MetaProperty.prototype.render = function (code, options) {
        if (this.meta.name === 'import')
            this.rendered = true;
        _super.prototype.render.call(this, code, options);
    };
    MetaProperty.prototype.renderFinalMechanism = function (code, chunkId, format, compact) {
        if (!this.rendered)
            return false;
        if (this.parent instanceof MemberExpression$1 === false)
            return false;
        var parent = this.parent;
        var importMetaProperty;
        if (parent.property instanceof Identifier$1)
            importMetaProperty = parent.property.name;
        else if (parent.property instanceof Literal$1 && typeof parent.property.value === 'string')
            importMetaProperty = parent.property.value;
        else
            return false;
        // support import.meta.ROLLUP_ASSET_URL_[ID]
        if (importMetaProperty.startsWith('ROLLUP_ASSET_URL_')) {
            var assetFileName = this.context.getAssetFileName(importMetaProperty.substr(17));
            var relPath = normalize(relative(dirname(chunkId), assetFileName));
            code.overwrite(parent.start, parent.end, relUrlMechanisms[format](relPath, compact));
            return true;
        }
        if (format === 'system') {
            code.overwrite(this.meta.start, this.meta.end, 'module');
        }
        else if (importMetaProperty === 'url') {
            var importMetaUrlMechanism = (compact
                ? importMetaUrlMechanismsCompact
                : importMetaUrlMechanisms)[format];
            if (importMetaUrlMechanism)
                code.overwrite(parent.start, parent.end, importMetaUrlMechanism);
            return true;
        }
        return false;
    };
    return MetaProperty;
}(NodeBase));

var MethodDefinition$1 = /** @class */ (function (_super) {
    __extends(MethodDefinition, _super);
    function MethodDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MethodDefinition.prototype.hasEffects = function (options) {
        return this.key.hasEffects(options);
    };
    MethodDefinition.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        return (path$$1.length > 0 || this.value.hasEffectsWhenCalledAtPath(EMPTY_PATH, callOptions, options));
    };
    return MethodDefinition;
}(NodeBase));

var NewExpression$1 = /** @class */ (function (_super) {
    __extends(NewExpression, _super);
    function NewExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        for (var _i = 0, _a = this.arguments; _i < _a.length; _i++) {
            var argument = _a[_i];
            // This will make sure all properties of parameters behave as "unknown"
            argument.deoptimizePath(UNKNOWN_PATH);
        }
    };
    NewExpression.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.arguments; _i < _a.length; _i++) {
            var argument = _a[_i];
            if (argument.hasEffects(options))
                return true;
        }
        return this.callee.hasEffectsWhenCalledAtPath(EMPTY_PATH, this.callOptions, options.getHasEffectsWhenCalledOptions());
    };
    NewExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    NewExpression.prototype.initialise = function () {
        this.included = false;
        this.callOptions = CallOptions.create({
            withNew: true,
            args: this.arguments,
            callIdentifier: this
        });
    };
    return NewExpression;
}(NodeBase));

var SpreadElement$1 = /** @class */ (function (_super) {
    __extends(SpreadElement, _super);
    function SpreadElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpreadElement.prototype.bind = function () {
        _super.prototype.bind.call(this);
        // Only properties of properties of the argument could become subject to reassignment
        // This will also reassign the return values of iterators
        this.argument.deoptimizePath([UNKNOWN_KEY, UNKNOWN_KEY]);
    };
    return SpreadElement;
}(NodeBase));

var ObjectExpression$1 = /** @class */ (function (_super) {
    __extends(ObjectExpression$$1, _super);
    function ObjectExpression$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectExpression$$1.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.propertyMap === null)
            this.buildPropertyMap();
    };
    // We could also track this per-property but this would quickly become much more complex
    ObjectExpression$$1.prototype.deoptimizeCache = function () {
        if (!this.hasUnknownDeoptimizedProperty)
            this.deoptimizeAllProperties();
    };
    ObjectExpression$$1.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.propertyMap === null)
            this.buildPropertyMap();
        var key = path$$1[0];
        if (path$$1.length === 0 ||
            this.hasUnknownDeoptimizedProperty ||
            typeof key !== 'string' ||
            this.deoptimizedPaths[key])
            return UNKNOWN_VALUE;
        if (path$$1.length === 1 &&
            !this.propertyMap[key] &&
            this.unmatchablePropertiesRead.length === 0) {
            if (!this.expressionsToBeDeoptimized[key]) {
                this.expressionsToBeDeoptimized[key] = [origin];
            }
            else {
                this.expressionsToBeDeoptimized[key].push(origin);
            }
            return undefined;
        }
        if (!this.propertyMap[key] ||
            this.propertyMap[key].exactMatchRead === null ||
            this.propertyMap[key].propertiesRead.length > 1)
            return UNKNOWN_VALUE;
        if (!this.expressionsToBeDeoptimized[key]) {
            this.expressionsToBeDeoptimized[key] = [origin];
        }
        else {
            this.expressionsToBeDeoptimized[key].push(origin);
        }
        return this.propertyMap[key].exactMatchRead.getLiteralValueAtPath(path$$1.slice(1), recursionTracker, origin);
    };
    ObjectExpression$$1.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.propertyMap === null)
            this.buildPropertyMap();
        var key = path$$1[0];
        if (path$$1.length === 0 ||
            this.hasUnknownDeoptimizedProperty ||
            typeof key !== 'string' ||
            this.deoptimizedPaths[key])
            return UNKNOWN_EXPRESSION;
        if (path$$1.length === 1 &&
            objectMembers[key] &&
            this.unmatchablePropertiesRead.length === 0 &&
            (!this.propertyMap[key] || this.propertyMap[key].exactMatchRead === null))
            return getMemberReturnExpressionWhenCalled(objectMembers, key);
        if (!this.propertyMap[key] ||
            this.propertyMap[key].exactMatchRead === null ||
            this.propertyMap[key].propertiesRead.length > 1)
            return UNKNOWN_EXPRESSION;
        if (!this.expressionsToBeDeoptimized[key]) {
            this.expressionsToBeDeoptimized[key] = [origin];
        }
        else {
            this.expressionsToBeDeoptimized[key].push(origin);
        }
        return this.propertyMap[key].exactMatchRead.getReturnExpressionWhenCalledAtPath(path$$1.slice(1), recursionTracker, origin);
    };
    ObjectExpression$$1.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return false;
        var key = path$$1[0];
        if (path$$1.length > 1 &&
            (this.hasUnknownDeoptimizedProperty ||
                typeof key !== 'string' ||
                this.deoptimizedPaths[key] ||
                !this.propertyMap[key] ||
                this.propertyMap[key].exactMatchRead === null))
            return true;
        var subPath = path$$1.slice(1);
        for (var _i = 0, _a = typeof key !== 'string'
            ? this.properties
            : this.propertyMap[key]
                ? this.propertyMap[key].propertiesRead
                : []; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.hasEffectsWhenAccessedAtPath(subPath, options))
                return true;
        }
        return false;
    };
    ObjectExpression$$1.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (path$$1.length === 0)
            return false;
        var key = path$$1[0];
        if (path$$1.length > 1 &&
            (this.hasUnknownDeoptimizedProperty ||
                typeof key !== 'string' ||
                this.deoptimizedPaths[key] ||
                !this.propertyMap[key] ||
                this.propertyMap[key].exactMatchRead === null))
            return true;
        var subPath = path$$1.slice(1);
        for (var _i = 0, _a = typeof key !== 'string'
            ? this.properties
            : path$$1.length > 1
                ? this.propertyMap[key].propertiesRead
                : this.propertyMap[key]
                    ? this.propertyMap[key].propertiesSet
                    : []; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.hasEffectsWhenAssignedAtPath(subPath, options))
                return true;
        }
        return false;
    };
    ObjectExpression$$1.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        var key = path$$1[0];
        if (path$$1.length === 0 ||
            this.hasUnknownDeoptimizedProperty ||
            typeof key !== 'string' ||
            this.deoptimizedPaths[key] ||
            (this.propertyMap[key]
                ? !this.propertyMap[key].exactMatchRead
                : path$$1.length > 1 || !objectMembers[key]))
            return true;
        var subPath = path$$1.slice(1);
        for (var _i = 0, _a = this.propertyMap[key] ? this.propertyMap[key].propertiesRead : []; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.hasEffectsWhenCalledAtPath(subPath, callOptions, options))
                return true;
        }
        if (path$$1.length === 1 && objectMembers[key])
            return hasMemberEffectWhenCalled(objectMembers, key, this.included, callOptions, options);
        return false;
    };
    ObjectExpression$$1.prototype.initialise = function () {
        this.included = false;
        this.hasUnknownDeoptimizedProperty = false;
        this.deoptimizedPaths = Object.create(null);
        this.propertyMap = null;
        this.expressionsToBeDeoptimized = Object.create(null);
    };
    ObjectExpression$$1.prototype.deoptimizePath = function (path$$1) {
        if (this.hasUnknownDeoptimizedProperty)
            return;
        if (this.propertyMap === null)
            this.buildPropertyMap();
        if (path$$1.length === 0) {
            this.deoptimizeAllProperties();
            return;
        }
        var key = path$$1[0];
        if (path$$1.length === 1) {
            if (typeof key !== 'string') {
                this.deoptimizeAllProperties();
                return;
            }
            if (!this.deoptimizedPaths[key]) {
                this.deoptimizedPaths[key] = true;
                // we only deoptimizeCache exact matches as in all other cases,
                // we do not return a literal value or return expression
                if (this.expressionsToBeDeoptimized[key]) {
                    for (var _i = 0, _a = this.expressionsToBeDeoptimized[key]; _i < _a.length; _i++) {
                        var expression = _a[_i];
                        expression.deoptimizeCache();
                    }
                }
            }
        }
        var subPath = path$$1.length === 1 ? UNKNOWN_PATH : path$$1.slice(1);
        for (var _b = 0, _c = typeof key === 'string'
            ? this.propertyMap[key]
                ? this.propertyMap[key].propertiesRead
                : []
            : this.properties; _b < _c.length; _b++) {
            var property = _c[_b];
            property.deoptimizePath(subPath);
        }
    };
    ObjectExpression$$1.prototype.deoptimizeAllProperties = function () {
        this.hasUnknownDeoptimizedProperty = true;
        for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            property.deoptimizePath(UNKNOWN_PATH);
        }
        for (var _b = 0, _c = Object.keys(this.expressionsToBeDeoptimized); _b < _c.length; _b++) {
            var key = _c[_b];
            for (var _d = 0, _e = this.expressionsToBeDeoptimized[key]; _d < _e.length; _d++) {
                var expression = _e[_d];
                expression.deoptimizeCache();
            }
        }
    };
    ObjectExpression$$1.prototype.render = function (code, options, _a) {
        var renderedParentType = (_a === void 0 ? BLANK : _a).renderedParentType;
        _super.prototype.render.call(this, code, options);
        if (renderedParentType === ExpressionStatement) {
            code.appendRight(this.start, '(');
            code.prependLeft(this.end, ')');
        }
    };
    ObjectExpression$$1.prototype.buildPropertyMap = function () {
        var _a, _b;
        this.propertyMap = Object.create(null);
        this.unmatchablePropertiesRead = [];
        this.unmatchablePropertiesWrite = [];
        for (var index = this.properties.length - 1; index >= 0; index--) {
            var property = this.properties[index];
            if (property instanceof SpreadElement$1) {
                this.unmatchablePropertiesRead.push(property);
                continue;
            }
            var isWrite = property.kind !== 'get';
            var isRead = property.kind !== 'set';
            var key = void 0;
            if (property.computed) {
                var keyValue = property.key.getLiteralValueAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
                if (keyValue === UNKNOWN_VALUE) {
                    if (isRead) {
                        this.unmatchablePropertiesRead.push(property);
                    }
                    else {
                        this.unmatchablePropertiesWrite.push(property);
                    }
                    continue;
                }
                key = String(keyValue);
            }
            else if (property.key instanceof Identifier$1) {
                key = property.key.name;
            }
            else {
                key = String(property.key.value);
            }
            var propertyMapProperty = this.propertyMap[key];
            if (!propertyMapProperty) {
                this.propertyMap[key] = {
                    exactMatchRead: isRead ? property : null,
                    propertiesRead: isRead ? [property].concat(this.unmatchablePropertiesRead) : [],
                    exactMatchWrite: isWrite ? property : null,
                    propertiesSet: isWrite && !isRead ? [property].concat(this.unmatchablePropertiesWrite) : []
                };
                continue;
            }
            if (isRead && propertyMapProperty.exactMatchRead === null) {
                propertyMapProperty.exactMatchRead = property;
                (_a = propertyMapProperty.propertiesRead).push.apply(_a, [property].concat(this.unmatchablePropertiesRead));
            }
            if (isWrite && !isRead && propertyMapProperty.exactMatchWrite === null) {
                propertyMapProperty.exactMatchWrite = property;
                (_b = propertyMapProperty.propertiesSet).push.apply(_b, [property].concat(this.unmatchablePropertiesWrite));
            }
        }
    };
    return ObjectExpression$$1;
}(NodeBase));

var ObjectPattern$1 = /** @class */ (function (_super) {
    __extends(ObjectPattern, _super);
    function ObjectPattern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectPattern.prototype.declare = function (kind, init) {
        for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            property.declare(kind, init);
        }
    };
    ObjectPattern.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (path$$1.length > 0)
            return true;
        for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options))
                return true;
        }
        return false;
    };
    ObjectPattern.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length === 0) {
            for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
                var property = _a[_i];
                property.deoptimizePath(path$$1);
            }
        }
    };
    return ObjectPattern;
}(NodeBase));

var Program$1 = /** @class */ (function (_super) {
    __extends(Program, _super);
    function Program() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Program.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.hasEffects(options))
                return true;
        }
    };
    Program.prototype.include = function () {
        this.included = true;
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.shouldBeIncluded())
                node.include();
        }
    };
    Program.prototype.render = function (code, options) {
        if (this.body.length) {
            renderStatementList(this.body, code, this.start, this.end, options);
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    return Program;
}(NodeBase));

var Property$1 = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.declarationInit = null;
        return _this;
    }
    Property.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.kind === 'get' && this.returnExpression === null)
            this.updateReturnExpression();
        if (this.declarationInit !== null) {
            this.declarationInit.deoptimizePath([UNKNOWN_KEY, UNKNOWN_KEY]);
        }
    };
    Property.prototype.declare = function (kind, init) {
        this.declarationInit = init;
        this.value.declare(kind, UNKNOWN_EXPRESSION);
    };
    Property.prototype.deoptimizeCache = function () {
        // As getter properties directly receive their values from function expressions that always
        // have a fixed return value, there is no known situation where a getter is deoptimized.
        throw new Error('Unexpected deoptimization');
    };
    Property.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (this.kind === 'set') {
            return UNKNOWN_VALUE;
        }
        if (this.kind === 'get') {
            if (this.returnExpression === null)
                this.updateReturnExpression();
            return this.returnExpression.getLiteralValueAtPath(path$$1, recursionTracker, origin);
        }
        return this.value.getLiteralValueAtPath(path$$1, recursionTracker, origin);
    };
    Property.prototype.getReturnExpressionWhenCalledAtPath = function (path$$1, recursionTracker, origin) {
        if (this.kind === 'set') {
            return UNKNOWN_EXPRESSION;
        }
        if (this.kind === 'get') {
            if (this.returnExpression === null)
                this.updateReturnExpression();
            return this.returnExpression.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
        }
        return this.value.getReturnExpressionWhenCalledAtPath(path$$1, recursionTracker, origin);
    };
    Property.prototype.hasEffects = function (options) {
        return this.key.hasEffects(options) || this.value.hasEffects(options);
    };
    Property.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        if (this.kind === 'get') {
            return (this.value.hasEffectsWhenCalledAtPath(EMPTY_PATH, this.accessorCallOptions, options.getHasEffectsWhenCalledOptions()) ||
                (path$$1.length > 0 && this.returnExpression.hasEffectsWhenAccessedAtPath(path$$1, options)));
        }
        return this.value.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    Property.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        if (this.kind === 'get') {
            return path$$1.length === 0 || this.returnExpression.hasEffectsWhenAssignedAtPath(path$$1, options);
        }
        if (this.kind === 'set') {
            return (path$$1.length > 0 ||
                this.value.hasEffectsWhenCalledAtPath(EMPTY_PATH, this.accessorCallOptions, options.getHasEffectsWhenCalledOptions()));
        }
        return this.value.hasEffectsWhenAssignedAtPath(path$$1, options);
    };
    Property.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        if (this.kind === 'get') {
            return this.returnExpression.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
        }
        return this.value.hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
    };
    Property.prototype.initialise = function () {
        this.included = false;
        this.returnExpression = null;
        this.accessorCallOptions = CallOptions.create({
            withNew: false,
            callIdentifier: this
        });
    };
    Property.prototype.deoptimizePath = function (path$$1) {
        if (this.kind === 'get') {
            if (path$$1.length > 0) {
                if (this.returnExpression === null)
                    this.updateReturnExpression();
                this.returnExpression.deoptimizePath(path$$1);
            }
        }
        else if (this.kind !== 'set') {
            this.value.deoptimizePath(path$$1);
        }
    };
    Property.prototype.render = function (code, options) {
        if (!this.shorthand) {
            this.key.render(code, options);
        }
        this.value.render(code, options);
    };
    Property.prototype.updateReturnExpression = function () {
        this.returnExpression = UNKNOWN_EXPRESSION;
        this.returnExpression = this.value.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, EMPTY_IMMUTABLE_TRACKER, this);
    };
    return Property;
}(NodeBase));

var RestElement$1 = /** @class */ (function (_super) {
    __extends(RestElement, _super);
    function RestElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.declarationInit = null;
        return _this;
    }
    RestElement.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.declarationInit !== null) {
            this.declarationInit.deoptimizePath([UNKNOWN_KEY, UNKNOWN_KEY]);
        }
    };
    RestElement.prototype.declare = function (kind, init) {
        this.argument.declare(kind, UNKNOWN_EXPRESSION);
        this.declarationInit = init;
    };
    RestElement.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return path$$1.length > 0 || this.argument.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options);
    };
    RestElement.prototype.deoptimizePath = function (path$$1) {
        path$$1.length === 0 && this.argument.deoptimizePath(EMPTY_PATH);
    };
    return RestElement;
}(NodeBase));

var ReturnStatement$1 = /** @class */ (function (_super) {
    __extends(ReturnStatement, _super);
    function ReturnStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReturnStatement.prototype.hasEffects = function (options) {
        return (!options.ignoreReturnAwaitYield() || (this.argument && this.argument.hasEffects(options)));
    };
    ReturnStatement.prototype.initialise = function () {
        this.included = false;
        this.scope.addReturnExpression(this.argument || UNKNOWN_EXPRESSION);
    };
    ReturnStatement.prototype.render = function (code, options) {
        if (this.argument) {
            this.argument.render(code, options);
            if (this.argument.start === this.start + 6 /* 'return'.length */) {
                code.prependLeft(this.start + 6, ' ');
            }
        }
    };
    return ReturnStatement;
}(NodeBase));

var SequenceExpression$1 = /** @class */ (function (_super) {
    __extends(SequenceExpression, _super);
    function SequenceExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SequenceExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(path$$1, recursionTracker, origin);
    };
    SequenceExpression.prototype.hasEffects = function (options) {
        for (var _i = 0, _a = this.expressions; _i < _a.length; _i++) {
            var expression = _a[_i];
            if (expression.hasEffects(options))
                return true;
        }
        return false;
    };
    SequenceExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return (path$$1.length > 0 &&
            this.expressions[this.expressions.length - 1].hasEffectsWhenAccessedAtPath(path$$1, options));
    };
    SequenceExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return (path$$1.length === 0 ||
            this.expressions[this.expressions.length - 1].hasEffectsWhenAssignedAtPath(path$$1, options));
    };
    SequenceExpression.prototype.hasEffectsWhenCalledAtPath = function (path$$1, callOptions, options) {
        return this.expressions[this.expressions.length - 1].hasEffectsWhenCalledAtPath(path$$1, callOptions, options);
    };
    SequenceExpression.prototype.include = function () {
        this.included = true;
        for (var i = 0; i < this.expressions.length - 1; i++) {
            var node = this.expressions[i];
            if (node.shouldBeIncluded())
                node.include();
        }
        this.expressions[this.expressions.length - 1].include();
    };
    SequenceExpression.prototype.deoptimizePath = function (path$$1) {
        if (path$$1.length > 0)
            this.expressions[this.expressions.length - 1].deoptimizePath(path$$1);
    };
    SequenceExpression.prototype.render = function (code, options, _a) {
        var _b = _a === void 0 ? BLANK : _a, renderedParentType = _b.renderedParentType, isCalleeOfRenderedParent = _b.isCalleeOfRenderedParent;
        var firstStart = 0, lastEnd, includedNodes = 0;
        for (var _i = 0, _c = getCommaSeparatedNodesWithBoundaries(this.expressions, code, this.start, this.end); _i < _c.length; _i++) {
            var _d = _c[_i], node = _d.node, start = _d.start, end = _d.end;
            if (!node.included) {
                code.remove(start, end);
                continue;
            }
            includedNodes++;
            if (firstStart === 0)
                firstStart = start;
            lastEnd = end;
            if (node === this.expressions[this.expressions.length - 1] && includedNodes === 1) {
                node.render(code, options, {
                    renderedParentType: renderedParentType || this.parent.type,
                    isCalleeOfRenderedParent: renderedParentType
                        ? isCalleeOfRenderedParent
                        : this.parent.callee === this
                });
            }
            else {
                node.render(code, options);
            }
        }
        // Round brackets are part of the actual parent and should be re-added in case the parent changed
        if (includedNodes > 1 && renderedParentType) {
            code.prependRight(firstStart, '(');
            code.appendLeft(lastEnd, ')');
        }
    };
    return SequenceExpression;
}(NodeBase));

var SwitchCase$1 = /** @class */ (function (_super) {
    __extends(SwitchCase, _super);
    function SwitchCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchCase.prototype.include = function () {
        this.included = true;
        if (this.test)
            this.test.include();
        for (var _i = 0, _a = this.consequent; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.shouldBeIncluded())
                node.include();
        }
    };
    SwitchCase.prototype.render = function (code, options) {
        if (this.consequent.length) {
            this.test && this.test.render(code, options);
            var testEnd = this.test
                ? this.test.end
                : findFirstOccurrenceOutsideComment(code.original, 'default', this.start) + 7;
            var consequentStart = findFirstOccurrenceOutsideComment(code.original, ':', testEnd) + 1;
            renderStatementList(this.consequent, code, consequentStart, this.end, options);
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    return SwitchCase;
}(NodeBase));

var SwitchStatement$1 = /** @class */ (function (_super) {
    __extends(SwitchStatement, _super);
    function SwitchStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchStatement.prototype.createScope = function (parentScope) {
        this.scope = new BlockScope(parentScope);
    };
    SwitchStatement.prototype.hasEffects = function (options) {
        return _super.prototype.hasEffects.call(this, options.setIgnoreBreakStatements());
    };
    return SwitchStatement;
}(NodeBase));

var TaggedTemplateExpression$1 = /** @class */ (function (_super) {
    __extends(TaggedTemplateExpression$$1, _super);
    function TaggedTemplateExpression$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaggedTemplateExpression$$1.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.tag.type === Identifier) {
            var variable = this.scope.findVariable(this.tag.name);
            if (variable.isNamespace) {
                this.context.error({
                    code: 'CANNOT_CALL_NAMESPACE',
                    message: "Cannot call a namespace ('" + this.tag.name + "')"
                }, this.start);
            }
            if (this.tag.name === 'eval') {
                this.context.warn({
                    code: 'EVAL',
                    message: "Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
                    url: 'https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval'
                }, this.start);
            }
        }
    };
    TaggedTemplateExpression$$1.prototype.hasEffects = function (options) {
        return (_super.prototype.hasEffects.call(this, options) ||
            this.tag.hasEffectsWhenCalledAtPath(EMPTY_PATH, this.callOptions, options.getHasEffectsWhenCalledOptions()));
    };
    TaggedTemplateExpression$$1.prototype.initialise = function () {
        this.included = false;
        this.callOptions = CallOptions.create({
            withNew: false,
            callIdentifier: this
        });
    };
    return TaggedTemplateExpression$$1;
}(NodeBase));

var TemplateElement$1 = /** @class */ (function (_super) {
    __extends(TemplateElement, _super);
    function TemplateElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateElement.prototype.hasEffects = function (_options) {
        return false;
    };
    return TemplateElement;
}(NodeBase));

function isTemplateLiteral(node) {
    return node.type === TemplateLiteral;
}
var TemplateLiteral$1 = /** @class */ (function (_super) {
    __extends(TemplateLiteral$$1, _super);
    function TemplateLiteral$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateLiteral$$1.prototype.getLiteralValueAtPath = function (path$$1) {
        if (path$$1.length > 0 || this.quasis.length !== 1) {
            return UNKNOWN_VALUE;
        }
        return this.quasis[0].value.cooked;
    };
    TemplateLiteral$$1.prototype.render = function (code, options) {
        code.indentExclusionRanges.push([this.start, this.end]);
        _super.prototype.render.call(this, code, options);
    };
    return TemplateLiteral$$1;
}(NodeBase));

var ThisExpression$1 = /** @class */ (function (_super) {
    __extends(ThisExpression, _super);
    function ThisExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThisExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        this.variable = this.scope.findVariable('this');
    };
    ThisExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, options) {
        return path$$1.length > 0 && this.variable.hasEffectsWhenAccessedAtPath(path$$1, options);
    };
    ThisExpression.prototype.hasEffectsWhenAssignedAtPath = function (path$$1, options) {
        return this.variable.hasEffectsWhenAssignedAtPath(path$$1, options);
    };
    ThisExpression.prototype.initialise = function () {
        this.included = false;
        this.variable = null;
        this.alias = this.scope.findLexicalBoundary().isModuleScope ? this.context.moduleContext : null;
        if (this.alias === 'undefined') {
            this.context.warn({
                code: 'THIS_IS_UNDEFINED',
                message: "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten",
                url: "https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined"
            }, this.start);
        }
    };
    ThisExpression.prototype.render = function (code, _options) {
        if (this.alias !== null) {
            code.overwrite(this.start, this.end, this.alias, {
                storeName: true,
                contentOnly: false
            });
        }
    };
    return ThisExpression;
}(NodeBase));

var ThrowStatement$1 = /** @class */ (function (_super) {
    __extends(ThrowStatement, _super);
    function ThrowStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThrowStatement.prototype.hasEffects = function (_options) {
        return true;
    };
    return ThrowStatement;
}(NodeBase));

var unaryOperators = {
    '-': function (value) { return -value; },
    '+': function (value) { return +value; },
    '!': function (value) { return !value; },
    '~': function (value) { return ~value; },
    typeof: function (value) { return typeof value; },
    void: function () { return undefined; },
    delete: function () { return UNKNOWN_VALUE; }
};
var UnaryExpression$1 = /** @class */ (function (_super) {
    __extends(UnaryExpression, _super);
    function UnaryExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnaryExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.operator === 'delete') {
            this.argument.deoptimizePath(EMPTY_PATH);
        }
    };
    UnaryExpression.prototype.getLiteralValueAtPath = function (path$$1, recursionTracker, origin) {
        if (path$$1.length > 0)
            return UNKNOWN_VALUE;
        var argumentValue = this.argument.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (argumentValue === UNKNOWN_VALUE)
            return UNKNOWN_VALUE;
        return unaryOperators[this.operator](argumentValue);
    };
    UnaryExpression.prototype.hasEffects = function (options) {
        return (this.argument.hasEffects(options) ||
            (this.operator === 'delete' &&
                this.argument.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options)));
    };
    UnaryExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        if (this.operator === 'void') {
            return path$$1.length > 0;
        }
        return path$$1.length > 1;
    };
    return UnaryExpression;
}(NodeBase));

var UnknownNode = /** @class */ (function (_super) {
    __extends(UnknownNode, _super);
    function UnknownNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnknownNode.prototype.hasEffects = function (_options) {
        return true;
    };
    return UnknownNode;
}(NodeBase));

var UpdateExpression$1 = /** @class */ (function (_super) {
    __extends(UpdateExpression, _super);
    function UpdateExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        this.argument.deoptimizePath(EMPTY_PATH);
        if (isIdentifier(this.argument)) {
            var variable = this.scope.findVariable(this.argument.name);
            variable.isReassigned = true;
        }
    };
    UpdateExpression.prototype.hasEffects = function (options) {
        return (this.argument.hasEffects(options) ||
            this.argument.hasEffectsWhenAssignedAtPath(EMPTY_PATH, options));
    };
    UpdateExpression.prototype.hasEffectsWhenAccessedAtPath = function (path$$1, _options) {
        return path$$1.length > 1;
    };
    UpdateExpression.prototype.render = function (code, options) {
        this.argument.render(code, options);
        var variable = this.argument.variable;
        if (options.format === 'system' && variable && variable.exportName) {
            var name = variable.getName();
            if (this.prefix) {
                code.overwrite(this.start, this.end, "exports('" + variable.exportName + "', " + this.operator + name + ")");
            }
            else {
                var op = void 0;
                switch (this.operator) {
                    case '++':
                        op = name + " + 1";
                        break;
                    case '--':
                        op = name + " - 1";
                        break;
                }
                code.overwrite(this.start, this.end, "(exports('" + variable.exportName + "', " + op + "), " + name + this.operator + ")");
            }
        }
    };
    return UpdateExpression;
}(NodeBase));

function isReassignedExportsMember(variable) {
    return (variable.safeName &&
        variable.safeName.indexOf('.') !== -1 &&
        variable.exportName &&
        variable.isReassigned);
}
var VariableDeclaration$1 = /** @class */ (function (_super) {
    __extends(VariableDeclaration$$1, _super);
    function VariableDeclaration$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariableDeclaration$$1.prototype.hasEffectsWhenAssignedAtPath = function (_path, _options) {
        return false;
    };
    VariableDeclaration$$1.prototype.includeWithAllDeclaredVariables = function () {
        var anotherPassNeeded = false;
        this.included = true;
        for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
            var declarator = _a[_i];
            if (declarator.include())
                anotherPassNeeded = true;
        }
        return anotherPassNeeded;
    };
    VariableDeclaration$$1.prototype.include = function () {
        this.included = true;
        for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
            var declarator = _a[_i];
            if (declarator.shouldBeIncluded())
                declarator.include();
        }
    };
    VariableDeclaration$$1.prototype.initialise = function () {
        this.included = false;
        for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
            var declarator = _a[_i];
            declarator.declareDeclarator(this.kind);
        }
    };
    VariableDeclaration$$1.prototype.deoptimizePath = function (_path) {
        for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
            var declarator = _a[_i];
            declarator.deoptimizePath(EMPTY_PATH);
        }
    };
    VariableDeclaration$$1.prototype.render = function (code, options, nodeRenderOptions) {
        if (nodeRenderOptions === void 0) { nodeRenderOptions = BLANK; }
        if (this.declarations.every(function (declarator) {
            return declarator.included && (!declarator.id.variable || !declarator.id.variable.exportName);
        })) {
            for (var _i = 0, _a = this.declarations; _i < _a.length; _i++) {
                var declarator = _a[_i];
                declarator.render(code, options);
            }
            if (!nodeRenderOptions.isNoStatement &&
                code.original.charCodeAt(this.end - 1) !== 59 /*";"*/) {
                code.appendLeft(this.end, ';');
            }
        }
        else {
            this.renderReplacedDeclarations(code, options, nodeRenderOptions);
        }
    };
    VariableDeclaration$$1.prototype.renderReplacedDeclarations = function (code, options, _a) {
        var _b = _a.start, start = _b === void 0 ? this.start : _b, _c = _a.end, end = _c === void 0 ? this.end : _c, isNoStatement = _a.isNoStatement;
        var separatedNodes = getCommaSeparatedNodesWithBoundaries(this.declarations, code, this.start + this.kind.length, this.end - (code.original.charCodeAt(this.end - 1) === 59 /*";"*/ ? 1 : 0));
        var actualContentEnd, renderedContentEnd;
        if (/\n\s*$/.test(code.slice(this.start, separatedNodes[0].start))) {
            renderedContentEnd = this.start + this.kind.length;
        }
        else {
            renderedContentEnd = separatedNodes[0].start;
        }
        var lastSeparatorPos = renderedContentEnd - 1;
        code.remove(this.start, lastSeparatorPos);
        var isInDeclaration = false;
        var hasRenderedContent = false;
        var separatorString = '', leadingString, nextSeparatorString;
        for (var _i = 0, separatedNodes_1 = separatedNodes; _i < separatedNodes_1.length; _i++) {
            var _d = separatedNodes_1[_i], node = _d.node, start_1 = _d.start, separator = _d.separator, contentEnd = _d.contentEnd, end_1 = _d.end;
            if (!node.included ||
                (isIdentifier(node.id) && isReassignedExportsMember(node.id.variable) && node.init === null)) {
                code.remove(start_1, end_1);
                continue;
            }
            leadingString = '';
            nextSeparatorString = '';
            if (isIdentifier(node.id) && isReassignedExportsMember(node.id.variable)) {
                if (hasRenderedContent) {
                    separatorString += ';';
                }
                isInDeclaration = false;
            }
            else {
                if (options.format === 'system' &&
                    node.init !== null &&
                    isIdentifier(node.id) &&
                    node.id.variable.exportName) {
                    code.prependLeft(code.original.indexOf('=', node.id.end) + 1, " exports('" + (node.id.variable.safeExportName || node.id.variable.exportName) + "',");
                    nextSeparatorString += ')';
                }
                if (isInDeclaration) {
                    separatorString += ',';
                }
                else {
                    if (hasRenderedContent) {
                        separatorString += ';';
                    }
                    leadingString += this.kind + " ";
                    isInDeclaration = true;
                }
            }
            if (renderedContentEnd === lastSeparatorPos + 1) {
                code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString + leadingString);
            }
            else {
                code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
                code.appendLeft(renderedContentEnd, leadingString);
            }
            node.render(code, options);
            actualContentEnd = contentEnd;
            renderedContentEnd = end_1;
            hasRenderedContent = true;
            lastSeparatorPos = separator;
            separatorString = nextSeparatorString;
        }
        if (hasRenderedContent) {
            this.renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, !isNoStatement);
        }
        else {
            code.remove(start, end);
        }
    };
    VariableDeclaration$$1.prototype.renderDeclarationEnd = function (code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, addSemicolon) {
        if (code.original.charCodeAt(this.end - 1) === 59 /*";"*/) {
            code.remove(this.end - 1, this.end);
        }
        if (addSemicolon) {
            separatorString += ';';
        }
        if (lastSeparatorPos !== null) {
            if (code.original.charCodeAt(actualContentEnd - 1) === 10 /*"\n"*/ &&
                (code.original.charCodeAt(this.end) === 10 /*"\n"*/ ||
                    code.original.charCodeAt(this.end) === 13) /*"\r"*/) {
                actualContentEnd--;
                if (code.original.charCodeAt(actualContentEnd) === 13 /*"\r"*/) {
                    actualContentEnd--;
                }
            }
            if (actualContentEnd === lastSeparatorPos + 1) {
                code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString);
            }
            else {
                code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
                code.remove(actualContentEnd, renderedContentEnd);
            }
        }
        else {
            code.appendLeft(renderedContentEnd, separatorString);
        }
        return separatorString;
    };
    return VariableDeclaration$$1;
}(NodeBase));

var VariableDeclarator$1 = /** @class */ (function (_super) {
    __extends(VariableDeclarator, _super);
    function VariableDeclarator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariableDeclarator.prototype.declareDeclarator = function (kind) {
        this.id.declare(kind, this.init || UNDEFINED_EXPRESSION);
    };
    VariableDeclarator.prototype.deoptimizePath = function (path$$1) {
        this.id.deoptimizePath(path$$1);
    };
    VariableDeclarator.prototype.render = function (code, options) {
        // This can happen for hoisted variables in dead branches
        if (this.init !== null && !this.init.included) {
            code.remove(this.id.end, this.end);
            this.id.render(code, options);
        }
        else {
            _super.prototype.render.call(this, code, options);
        }
    };
    return VariableDeclarator;
}(NodeBase));

var WhileStatement$1 = /** @class */ (function (_super) {
    __extends(WhileStatement, _super);
    function WhileStatement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhileStatement.prototype.hasEffects = function (options) {
        return (this.test.hasEffects(options) || this.body.hasEffects(options.setIgnoreBreakStatements()));
    };
    return WhileStatement;
}(NodeBase));

var YieldExpression$1 = /** @class */ (function (_super) {
    __extends(YieldExpression, _super);
    function YieldExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YieldExpression.prototype.bind = function () {
        _super.prototype.bind.call(this);
        if (this.argument !== null) {
            this.argument.deoptimizePath(UNKNOWN_PATH);
        }
    };
    YieldExpression.prototype.hasEffects = function (options) {
        return (!options.ignoreReturnAwaitYield() || (this.argument && this.argument.hasEffects(options)));
    };
    YieldExpression.prototype.render = function (code, options) {
        if (this.argument) {
            this.argument.render(code, options);
            if (this.argument.start === this.start + 5 /* 'yield'.length */) {
                code.prependLeft(this.start + 5, ' ');
            }
        }
    };
    return YieldExpression;
}(NodeBase));

var nodeConstructors = {
    ArrayExpression: ArrayExpression$1,
    ArrayPattern: ArrayPattern$1,
    ArrowFunctionExpression: ArrowFunctionExpression$1,
    AssignmentExpression: AssignmentExpression$1,
    AssignmentPattern: AssignmentPattern$1,
    AwaitExpression: AwaitExpression$1,
    BinaryExpression: BinaryExpression$1,
    BlockStatement: BlockStatement$1,
    BreakStatement: BreakStatement$1,
    CallExpression: CallExpression$1,
    CatchClause: CatchClause$1,
    ClassBody: ClassBody$1,
    ClassDeclaration: ClassDeclaration$1,
    ClassExpression: ClassExpression$1,
    ConditionalExpression: ConditionalExpression$1,
    DoWhileStatement: DoWhileStatement$1,
    EmptyStatement: EmptyStatement$1,
    ExportAllDeclaration: ExportAllDeclaration$1,
    ExportDefaultDeclaration: ExportDefaultDeclaration$1,
    ExportNamedDeclaration: ExportNamedDeclaration$1,
    ExpressionStatement: ExpressionStatement$1,
    ForStatement: ForStatement$1,
    ForInStatement: ForInStatement$1,
    ForOfStatement: ForOfStatement$1,
    FunctionDeclaration: FunctionDeclaration$1,
    FunctionExpression: FunctionExpression$1,
    Identifier: Identifier$1,
    IfStatement: IfStatement$1,
    Import: Import$1,
    ImportDeclaration: ImportDeclaration$1,
    LabeledStatement: LabeledStatement$1,
    Literal: Literal$1,
    LogicalExpression: LogicalExpression$1,
    MemberExpression: MemberExpression$1,
    MetaProperty: MetaProperty$1,
    MethodDefinition: MethodDefinition$1,
    NewExpression: NewExpression$1,
    ObjectExpression: ObjectExpression$1,
    ObjectPattern: ObjectPattern$1,
    Program: Program$1,
    Property: Property$1,
    RestElement: RestElement$1,
    ReturnStatement: ReturnStatement$1,
    SequenceExpression: SequenceExpression$1,
    SpreadElement: SpreadElement$1,
    SwitchCase: SwitchCase$1,
    SwitchStatement: SwitchStatement$1,
    TaggedTemplateExpression: TaggedTemplateExpression$1,
    TemplateElement: TemplateElement$1,
    TemplateLiteral: TemplateLiteral$1,
    ThisExpression: ThisExpression$1,
    ThrowStatement: ThrowStatement$1,
    TryStatement: NodeBase,
    UnaryExpression: UnaryExpression$1,
    UnknownNode: UnknownNode,
    UpdateExpression: UpdateExpression$1,
    VariableDeclarator: VariableDeclarator$1,
    VariableDeclaration: VariableDeclaration$1,
    WhileStatement: WhileStatement$1,
    YieldExpression: YieldExpression$1
};

var addDeclaredNames = function (variable, names) {
    if (variable.isNamespace && !variable.isExternal) {
        for (var _i = 0, _a = variable.context.getExports(); _i < _a.length; _i++) {
            var name = _a[_i];
            addDeclaredNames(variable.context.traceExport(name), names);
        }
    }
    names.add(variable.getName());
};
var ModuleScope = /** @class */ (function (_super) {
    __extends(ModuleScope, _super);
    function ModuleScope(parent, context) {
        var _this = _super.call(this, parent) || this;
        _this.context = context;
        _this.isModuleScope = true;
        _this.variables.this = new LocalVariable('this', null, UNDEFINED_EXPRESSION, context.deoptimizationTracker);
        return _this;
    }
    ModuleScope.prototype.deshadow = function (names, children) {
        if (children === void 0) { children = this.children; }
        var localNames = new Set(names);
        for (var _i = 0, _a = Object.keys(this.context.imports); _i < _a.length; _i++) {
            var importName = _a[_i];
            var importDescription = this.context.imports[importName];
            if (importDescription.module.isExternal || this.context.isCrossChunkImport(importDescription))
                continue;
            for (var _b = 0, _c = importDescription.module.getAllExports(); _b < _c.length; _b++) {
                var name = _c[_b];
                addDeclaredNames(importDescription.module.traceExport(name), localNames);
            }
            if (importDescription.name !== '*') {
                var declaration = importDescription.module.traceExport(importDescription.name);
                if (!declaration) {
                    this.context.warn({
                        code: 'NON_EXISTENT_EXPORT',
                        name: importDescription.name,
                        source: importDescription.module.id,
                        message: "Non-existent export '" + importDescription.name + "' is imported from " + relativeId(importDescription.module.id)
                    }, importDescription.start);
                    continue;
                }
                var name = declaration.getName();
                if (name !== importDescription.name)
                    localNames.add(name);
                if (importDescription.name !== 'default' && importDescription.name !== importName)
                    localNames.add(importDescription.name);
            }
        }
        _super.prototype.deshadow.call(this, localNames, children);
    };
    ModuleScope.prototype.findLexicalBoundary = function () {
        return this;
    };
    ModuleScope.prototype.findVariable = function (name) {
        if (this.variables[name]) {
            return this.variables[name];
        }
        return this.context.traceVariable(name) || this.parent.findVariable(name);
    };
    return ModuleScope;
}(Scope));

function extractNames(param) {
    var names = [];
    extractors[param.type](names, param);
    return names;
}
var extractors = {
    Identifier: function (names, param) {
        names.push(param.name);
    },
    ObjectPattern: function (names, param) {
        param.properties.forEach(function (prop) {
            if (prop instanceof RestElement$1) {
                extractors[prop.argument.type](names, prop.argument);
            }
            else {
                extractors[prop.value.type](names, prop.value);
            }
        });
    },
    ArrayPattern: function (names, param) {
        param.elements.forEach(function (element) {
            if (element)
                extractors[element.type](names, element);
        });
    },
    RestElement: function (names, param) {
        extractors[param.argument.type](names, param.argument);
    },
    AssignmentPattern: function (names, param) {
        extractors[param.left.type](names, param.left);
    }
};

var NamespaceVariable = /** @class */ (function (_super) {
    __extends(NamespaceVariable, _super);
    function NamespaceVariable(context, module) {
        var _this = _super.call(this, context.getModuleName()) || this;
        // Not initialised during construction
        _this.originals = Object.create(null);
        _this.needsNamespaceBlock = false;
        _this.referencedEarly = false;
        _this.references = [];
        _this.context = context;
        _this.module = module;
        for (var _i = 0, _a = _this.context.getExports().concat(_this.context.getReexports()); _i < _a.length; _i++) {
            var name = _a[_i];
            _this.originals[name] = _this.context.traceExport(name);
        }
        return _this;
    }
    NamespaceVariable.prototype.addReference = function (identifier) {
        this.references.push(identifier);
        this.name = identifier.name;
    };
    NamespaceVariable.prototype.include = function () {
        if (!this.included) {
            this.context.includeNamespace();
            this.included = true;
            this.needsNamespaceBlock = true;
            for (var _i = 0, _a = this.references; _i < _a.length; _i++) {
                var identifier = _a[_i];
                if (identifier.context.getModuleExecIndex() <= this.context.getModuleExecIndex()) {
                    this.referencedEarly = true;
                    break;
                }
            }
            for (var _b = 0, _c = Object.keys(this.originals); _b < _c.length; _b++) {
                var original = _c[_b];
                this.originals[original].include();
            }
        }
    };
    NamespaceVariable.prototype.renderFirst = function () {
        return this.referencedEarly;
    };
    // This is only called if "UNKNOWN_PATH" is reassigned as in all other situations, either the
    // build fails due to an illegal namespace reassignment or MemberExpression already forwards
    // the reassignment to the right variable. This means we lost track of this variable and thus
    // need to reassign all exports.
    NamespaceVariable.prototype.deoptimizePath = function () {
        for (var key in this.originals) {
            this.originals[key].deoptimizePath(UNKNOWN_PATH);
        }
    };
    NamespaceVariable.prototype.renderBlock = function (options) {
        var _this = this;
        var _ = options.compact ? '' : ' ';
        var n = options.compact ? '' : '\n';
        var t = options.indent;
        var members = Object.keys(this.originals).map(function (name) {
            var original = _this.originals[name];
            if (_this.referencedEarly || original.isReassigned) {
                return t + "get " + name + _ + "()" + _ + "{" + _ + "return " + original.getName() + (options.compact ? '' : ';') + _ + "}";
            }
            return "" + t + name + ": " + original.getName();
        });
        var name = this.getName();
        var callee = options.freeze ? "/*#__PURE__*/Object.freeze" : '';
        var output = this.context.varOrConst + " " + name + " = " + (options.namespaceToStringTag
            ? "{" + n + members.join("," + n) + n + "};"
            : callee + "({" + n + members.join("," + n) + n + "});");
        if (options.namespaceToStringTag) {
            output += n + "if" + _ + "(typeof Symbol" + _ + "!==" + _ + "'undefined'" + _ + "&&" + _ + "Symbol.toStringTag)" + n;
            output += t + "Object.defineProperty(" + name + "," + _ + "Symbol.toStringTag," + _ + "{" + _ + "value:" + _ + "'Module'" + _ + "});" + n;
            output += "else" + (n || ' ');
            output += t + "Object.defineProperty(" + name + "," + _ + "'toString'," + _ + "{" + _ + "value:" + _ + "function" + _ + "()" + _ + "{" + _ + "return" + _ + "'[object Module]'" + (options.compact ? ';' : '') + _ + "}" + _ + "});" + n;
            output += callee + "(" + name + ");";
        }
        if (options.format === 'system' && this.exportName) {
            output += n + "exports('" + this.exportName + "'," + _ + name + ");";
        }
        return output;
    };
    return NamespaceVariable;
}(Variable));
NamespaceVariable.prototype.isNamespace = true;

function getOriginalLocation(sourcemapChain, location) {
    var filteredSourcemapChain = sourcemapChain.filter(function (sourcemap) { return sourcemap.mappings; });
    while (filteredSourcemapChain.length > 0) {
        var sourcemap = filteredSourcemapChain.pop();
        var line = sourcemap.mappings[location.line - 1];
        var locationFound = false;
        if (line !== undefined) {
            for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                var segment = line_1[_i];
                if (segment[0] >= location.column) {
                    if (segment.length < 4)
                        break;
                    location = {
                        line: segment[2] + 1,
                        column: segment[3],
                        source: sourcemap.sources[segment[1]],
                        name: sourcemap.names[segment[4]]
                    };
                    locationFound = true;
                    break;
                }
            }
        }
        if (!locationFound) {
            throw new Error("Can't resolve original location of error.");
        }
    }
    return location;
}

// this looks ridiculous, but it prevents sourcemap tooling from mistaking
// this for an actual sourceMappingURL
var SOURCEMAPPING_URL = 'sourceMa';
SOURCEMAPPING_URL += 'ppingURL';
var SOURCEMAPPING_URL_RE = new RegExp("^#\\s+" + SOURCEMAPPING_URL + "=.+\\n?");

var NOOP = function () { };
var getStartTime = function () { return 0; };
var getElapsedTime = function () { return 0; };
var getStartMemory = function () { return 0; };
var getTotalMemory = function () { return 0; };
var getElapsedMemory = function () { return 0; };
var timers = {};
var normalizeHrTime = function (time) { return time[0] * 1e3 + time[1] / 1e6; };
function setTimeHelpers() {
    if (typeof process !== 'undefined' && typeof process.hrtime === 'function') {
        getStartTime = process.hrtime.bind(process);
        getElapsedTime = function (previous) { return normalizeHrTime(process.hrtime(previous)); };
    }
    else if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        getStartTime = performance.now.bind(performance);
        getElapsedTime = function (previous) { return performance.now() - previous; };
    }
    if (typeof process !== 'undefined' && typeof process.memoryUsage === 'function') {
        getStartMemory = function () { return process.memoryUsage().heapUsed; };
        getTotalMemory = function () { return process.memoryUsage().heapTotal; };
        getElapsedMemory = function (previous) { return getStartMemory() - previous; };
    }
}
function getPersistedLabel(label, level) {
    switch (level) {
        case 1:
            return "# " + label;
        case 2:
            return "## " + label;
        case 3:
            return label;
        default:
            return '  '.repeat(level - 4) + "- " + label;
    }
}
function timeStartImpl(label, level) {
    if (level === void 0) { level = 3; }
    label = getPersistedLabel(label, level);
    if (!timers.hasOwnProperty(label)) {
        timers[label] = {
            totalMemory: undefined,
            startTime: undefined,
            startMemory: undefined,
            time: 0,
            memory: 0
        };
    }
    timers[label].startTime = getStartTime();
    timers[label].totalMemory = getTotalMemory();
    timers[label].startMemory = getStartMemory();
}
function timeEndImpl(label, level) {
    if (level === void 0) { level = 3; }
    label = getPersistedLabel(label, level);
    if (timers.hasOwnProperty(label)) {
        timers[label].time += getElapsedTime(timers[label].startTime);
        timers[label].memory += getElapsedMemory(timers[label].startMemory);
    }
}
function getTimings() {
    var newTimings = {};
    Object.keys(timers).forEach(function (label) {
        newTimings[label] = [timers[label].time, timers[label].memory, timers[label].totalMemory];
    });
    return newTimings;
}
var timeStart = NOOP, timeEnd = NOOP;
var TIMED_PLUGIN_HOOKS = {
    transform: true,
    transformBundle: true,
    load: true,
    resolveId: true,
    ongenerate: true,
    onwrite: true,
    resolveDynamicImport: true
};
function getPluginWithTimers(plugin, index) {
    var timedPlugin = {};
    var _loop_1 = function (hook) {
        if (TIMED_PLUGIN_HOOKS[hook] === true) {
            var timerLabel_1 = "plugin " + index;
            if (plugin.name) {
                timerLabel_1 += " (" + plugin.name + ")";
            }
            timerLabel_1 += " - " + hook;
            timedPlugin[hook] = function () {
                timeStart(timerLabel_1, 4);
                var result = plugin[hook].apply(this === timedPlugin ? plugin : this, arguments);
                timeEnd(timerLabel_1, 4);
                if (result && typeof result.then === 'function') {
                    timeStart(timerLabel_1 + " (async)", 4);
                    result.then(function () { return timeEnd(timerLabel_1 + " (async)", 4); });
                }
                return result;
            };
        }
        else {
            timedPlugin[hook] = plugin[hook];
        }
    };
    for (var _i = 0, _a = Object.keys(plugin); _i < _a.length; _i++) {
        var hook = _a[_i];
        _loop_1(hook);
    }
    return timedPlugin;
}
function initialiseTimers(inputOptions) {
    if (inputOptions.perf) {
        timers = {};
        setTimeHelpers();
        timeStart = timeStartImpl;
        timeEnd = timeEndImpl;
        inputOptions.plugins = inputOptions.plugins.map(getPluginWithTimers);
    }
    else {
        timeStart = NOOP;
        timeEnd = NOOP;
    }
}

var defaultAcornOptions = {
    // TODO TypeScript waiting for acorn types to be updated
    ecmaVersion: 2018,
    sourceType: 'module',
    preserveParens: false
};
function tryParse(module, parse, acornOptions) {
    try {
        return parse(module.code, __assign({}, defaultAcornOptions, acornOptions, { onComment: function (block, text, start, end) {
                return module.comments.push({ block: block, text: text, start: start, end: end });
            } }));
    }
    catch (err) {
        module.error({
            code: 'PARSE_ERROR',
            message: err.message.replace(/ \(\d+:\d+\)$/, '')
        }, err.pos);
    }
}
function includeFully(node) {
    node.included = true;
    if (node.variable && !node.variable.included) {
        node.variable.include();
    }
    for (var _i = 0, _a = node.keys; _i < _a.length; _i++) {
        var key = _a[_i];
        var value = node[key];
        if (value === null)
            continue;
        if (Array.isArray(value)) {
            for (var _b = 0, value_1 = value; _b < value_1.length; _b++) {
                var child = value_1[_b];
                if (child !== null)
                    includeFully(child);
            }
        }
        else {
            includeFully(value);
        }
    }
}
function handleMissingExport(exportName, importingModule, importedModule, importerStart) {
    importingModule.error({
        code: 'MISSING_EXPORT',
        message: "'" + exportName + "' is not exported by " + relativeId(importedModule),
        url: "https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module"
    }, importerStart);
}
var Module = /** @class */ (function () {
    function Module(graph, id) {
        this.usesTopLevelAwait = false;
        this.namespaceVariable = undefined;
        this.needsTreeshakingPass = false;
        this.id = id;
        this.chunkAlias = undefined;
        this.graph = graph;
        this.comments = [];
        this.dynamicImports = [];
        this.importMetas = [];
        this.dynamicImportResolutions = [];
        this.isEntryPoint = false;
        this.execIndex = null;
        this.entryPointsHash = new Uint8Array(10);
        this.excludeFromSourcemap = /\0/.test(id);
        this.context = graph.getModuleContext(id);
        // all dependencies
        this.sources = [];
        this.dependencies = [];
        // imports and exports, indexed by local name
        this.imports = Object.create(null);
        this.exports = Object.create(null);
        this.exportsAll = Object.create(null);
        this.reexports = Object.create(null);
        this.exportAllSources = [];
        this.exportAllModules = null;
    }
    Module.prototype.setSource = function (_a) {
        var _this = this;
        var code = _a.code, originalCode = _a.originalCode, originalSourcemap = _a.originalSourcemap, ast = _a.ast, sourcemapChain = _a.sourcemapChain, resolvedIds = _a.resolvedIds, transformDependencies = _a.transformDependencies, customTransformCache = _a.customTransformCache;
        this.code = code;
        this.originalCode = originalCode;
        this.originalSourcemap = originalSourcemap;
        this.sourcemapChain = sourcemapChain;
        this.transformDependencies = transformDependencies;
        this.customTransformCache = customTransformCache;
        timeStart('generate ast', 3);
        this.esTreeAst = ast || tryParse(this, this.graph.acornParse, this.graph.acornOptions);
        timeEnd('generate ast', 3);
        this.resolvedIds = resolvedIds || Object.create(null);
        // By default, `id` is the filename. Custom resolvers and loaders
        // can change that, but it makes sense to use it for the source filename
        var fileName = this.id;
        this.magicString = new MagicString(code, {
            filename: this.excludeFromSourcemap ? null : fileName,
            indentExclusionRanges: []
        });
        this.removeExistingSourceMap();
        timeStart('analyse ast', 3);
        this.astContext = {
            addDynamicImport: this.addDynamicImport.bind(this),
            addExport: this.addExport.bind(this),
            addImport: this.addImport.bind(this),
            addImportMeta: this.addImportMeta.bind(this),
            code: code,
            error: this.error.bind(this),
            fileName: fileName,
            getAssetFileName: this.graph.pluginDriver.getAssetFileName,
            getExports: this.getExports.bind(this),
            getReexports: this.getReexports.bind(this),
            getModuleExecIndex: function () { return _this.execIndex; },
            getModuleName: this.basename.bind(this),
            imports: this.imports,
            includeNamespace: this.includeNamespace.bind(this),
            isCrossChunkImport: function (importDescription) { return importDescription.module.chunk !== _this.chunk; },
            magicString: this.magicString,
            moduleContext: this.context,
            nodeConstructors: nodeConstructors,
            propertyReadSideEffects: !this.graph.treeshake || this.graph.treeshakingOptions.propertyReadSideEffects,
            deoptimizationTracker: this.graph.deoptimizationTracker,
            requestTreeshakingPass: function () { return (_this.needsTreeshakingPass = true); },
            traceExport: this.traceExport.bind(this),
            traceVariable: this.traceVariable.bind(this),
            treeshake: this.graph.treeshake,
            usesTopLevelAwait: false,
            varOrConst: this.graph.varOrConst,
            warn: this.warn.bind(this)
        };
        this.scope = new ModuleScope(this.graph.scope, this.astContext);
        this.ast = new Program$1(this.esTreeAst, { type: 'Module', context: this.astContext }, this.scope);
        timeEnd('analyse ast', 3);
    };
    Module.prototype.removeExistingSourceMap = function () {
        for (var _i = 0, _a = this.comments; _i < _a.length; _i++) {
            var comment = _a[_i];
            if (!comment.block && SOURCEMAPPING_URL_RE.test(comment.text)) {
                this.magicString.remove(comment.start, comment.end);
            }
        }
    };
    Module.prototype.addExport = function (node) {
        var source = node.source && node.source.value;
        // export { name } from './other'
        if (source) {
            if (this.sources.indexOf(source) === -1)
                this.sources.push(source);
            if (node.type === ExportAllDeclaration) {
                // Store `export * from '...'` statements in an array of delegates.
                // When an unknown import is encountered, we see if one of them can satisfy it.
                this.exportAllSources.push(source);
            }
            else {
                for (var _i = 0, _a = node.specifiers; _i < _a.length; _i++) {
                    var specifier = _a[_i];
                    var name = specifier.exported.name;
                    if (this.exports[name] || this.reexports[name]) {
                        this.error({
                            code: 'DUPLICATE_EXPORT',
                            message: "A module cannot have multiple exports with the same name ('" + name + "')"
                        }, specifier.start);
                    }
                    this.reexports[name] = {
                        start: specifier.start,
                        source: source,
                        localName: specifier.local.name,
                        module: null // filled in later
                    };
                }
            }
        }
        else if (isExportDefaultDeclaration(node)) {
            // export default function foo () {}
            // export default foo;
            // export default 42;
            var identifier = (node.declaration.id &&
                node.declaration.id.name) ||
                node.declaration.name;
            if (this.exports.default) {
                this.error({
                    code: 'DUPLICATE_EXPORT',
                    message: "A module can only have one default export"
                }, node.start);
            }
            this.exports.default = {
                localName: 'default',
                identifier: identifier,
                node: node
            };
        }
        else if (node.declaration) {
            // export var { foo, bar } = ...
            // export var foo = 42;
            // export var a = 1, b = 2, c = 3;
            // export function foo () {}
            var declaration = node.declaration;
            if (declaration.type === VariableDeclaration) {
                for (var _b = 0, _c = declaration.declarations; _b < _c.length; _b++) {
                    var decl = _c[_b];
                    for (var _d = 0, _e = extractNames(decl.id); _d < _e.length; _d++) {
                        var localName = _e[_d];
                        this.exports[localName] = { localName: localName, node: node };
                    }
                }
            }
            else {
                // export function foo () {}
                var localName = declaration.id.name;
                this.exports[localName] = { localName: localName, node: node };
            }
        }
        else {
            // export { foo, bar, baz }
            for (var _f = 0, _g = node.specifiers; _f < _g.length; _f++) {
                var specifier = _g[_f];
                var localName = specifier.local.name;
                var exportedName = specifier.exported.name;
                if (this.exports[exportedName] || this.reexports[exportedName]) {
                    this.error({
                        code: 'DUPLICATE_EXPORT',
                        message: "A module cannot have multiple exports with the same name ('" + exportedName + "')"
                    }, specifier.start);
                }
                this.exports[exportedName] = { localName: localName, node: node };
            }
        }
    };
    Module.prototype.addImport = function (node) {
        var source = node.source.value;
        if (this.sources.indexOf(source) === -1)
            this.sources.push(source);
        for (var _i = 0, _a = node.specifiers; _i < _a.length; _i++) {
            var specifier = _a[_i];
            var localName = specifier.local.name;
            if (this.imports[localName]) {
                this.error({
                    code: 'DUPLICATE_IMPORT',
                    message: "Duplicated import '" + localName + "'"
                }, specifier.start);
            }
            var isDefault = specifier.type === ImportDefaultSpecifier;
            var isNamespace = specifier.type === ImportNamespaceSpecifier;
            var name = isDefault
                ? 'default'
                : isNamespace
                    ? '*'
                    : specifier.imported.name;
            this.imports[localName] = { source: source, start: specifier.start, name: name, module: null };
        }
    };
    Module.prototype.addDynamicImport = function (node) {
        this.dynamicImports.push(node);
    };
    Module.prototype.addImportMeta = function (node) {
        this.importMetas.push(node);
    };
    Module.prototype.basename = function () {
        var base = basename(this.id);
        var ext = extname(this.id);
        return makeLegal(ext ? base.slice(0, -ext.length) : base);
    };
    Module.prototype.markPublicExports = function () {
        for (var _i = 0, _a = this.getExports(); _i < _a.length; _i++) {
            var exportName = _a[_i];
            var variable = this.traceExport(exportName);
            variable.exportName = exportName;
            variable.deoptimizePath(UNKNOWN_PATH);
            variable.include();
            if (variable.isNamespace) {
                variable.needsNamespaceBlock = true;
            }
        }
        for (var _b = 0, _c = this.getReexports(); _b < _c.length; _b++) {
            var name = _c[_b];
            var variable = this.traceExport(name);
            variable.exportName = name;
            if (variable.isExternal) {
                variable.reexported = variable.module.reexported = true;
            }
            else {
                variable.include();
                variable.deoptimizePath(UNKNOWN_PATH);
            }
        }
    };
    Module.prototype.linkDependencies = function () {
        var _this = this;
        for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
            var source = _a[_i];
            var id = this.resolvedIds[source];
            if (id) {
                var module = this.graph.moduleById.get(id);
                this.dependencies.push(module);
            }
        }
        var resolveSpecifiers = function (specifiers) {
            for (var _i = 0, _a = Object.keys(specifiers); _i < _a.length; _i++) {
                var name = _a[_i];
                var specifier = specifiers[name];
                var id = _this.resolvedIds[specifier.source];
                specifier.module = _this.graph.moduleById.get(id);
            }
        };
        resolveSpecifiers(this.imports);
        resolveSpecifiers(this.reexports);
        this.exportAllModules = this.exportAllSources.map(function (source) {
            var id = _this.resolvedIds[source];
            return _this.graph.moduleById.get(id);
        });
    };
    Module.prototype.bindReferences = function () {
        this.ast.bind();
    };
    Module.prototype.getDynamicImportExpressions = function () {
        return this.dynamicImports.map(function (node) {
            var importArgument = node.parent.arguments[0];
            if (isTemplateLiteral(importArgument)) {
                if (importArgument.expressions.length === 0 && importArgument.quasis.length === 1) {
                    return importArgument.quasis[0].value.cooked;
                }
            }
            else if (isLiteral(importArgument)) {
                if (typeof importArgument.value === 'string') {
                    return importArgument.value;
                }
            }
            else {
                return importArgument;
            }
        });
    };
    Module.prototype.error = function (props, pos) {
        if (pos !== undefined) {
            props.pos = pos;
            var location = locate(this.code, pos, { offsetLine: 1 });
            try {
                location = getOriginalLocation(this.sourcemapChain, location);
            }
            catch (e) {
                this.warn({
                    loc: {
                        file: this.id,
                        line: location.line,
                        column: location.column
                    },
                    pos: pos,
                    message: "Error when using sourcemap for reporting an error: " + e.message,
                    code: 'SOURCEMAP_ERROR'
                }, undefined);
            }
            props.loc = {
                file: this.id,
                line: location.line,
                column: location.column
            };
            props.frame = getCodeFrame(this.originalCode, location.line, location.column);
        }
        error(props);
    };
    Module.prototype.getAllExports = function () {
        var allExports = Object.assign(Object.create(null), this.exports, this.reexports);
        this.exportAllModules.forEach(function (module) {
            if (module.isExternal) {
                allExports["*" + module.id] = true;
                return;
            }
            for (var _i = 0, _a = module.getAllExports(); _i < _a.length; _i++) {
                var name = _a[_i];
                if (name !== 'default')
                    allExports[name] = true;
            }
        });
        return Object.keys(allExports);
    };
    Module.prototype.getExports = function () {
        return Object.keys(this.exports);
    };
    Module.prototype.getReexports = function () {
        var reexports = Object.create(null);
        for (var name in this.reexports) {
            reexports[name] = true;
        }
        this.exportAllModules.forEach(function (module) {
            if (module.isExternal) {
                reexports["*" + module.id] = true;
                return;
            }
            for (var _i = 0, _a = module.getExports().concat(module.getReexports()); _i < _a.length; _i++) {
                var name = _a[_i];
                if (name !== 'default')
                    reexports[name] = true;
            }
        });
        return Object.keys(reexports);
    };
    Module.prototype.includeAllInBundle = function () {
        includeFully(this.ast);
    };
    Module.prototype.isIncluded = function () {
        return this.ast.included;
    };
    Module.prototype.include = function () {
        this.needsTreeshakingPass = false;
        if (this.ast.shouldBeIncluded())
            this.ast.include();
        return this.needsTreeshakingPass;
    };
    Module.prototype.getOrCreateNamespace = function () {
        if (this.namespaceVariable)
            return this.namespaceVariable;
        return (this.namespaceVariable = new NamespaceVariable(this.astContext, this));
    };
    Module.prototype.includeNamespace = function () {
        var namespace = this.getOrCreateNamespace();
        if (namespace.needsNamespaceBlock)
            return;
        var hasReexports = false;
        for (var importName in this.reexports) {
            hasReexports = true;
            var reexport = this.reexports[importName];
            this.imports[importName] = {
                source: reexport.source,
                start: reexport.start,
                name: reexport.localName,
                module: reexport.module
            };
            namespace.originals[importName] = reexport.module.traceExport(reexport.localName);
        }
        if (this.chunk && this.chunk.linked && hasReexports)
            this.chunk.linkModule(this);
    };
    Module.prototype.render = function (options) {
        var magicString = this.magicString.clone();
        this.ast.render(magicString, options);
        this.usesTopLevelAwait = this.astContext.usesTopLevelAwait;
        return magicString;
    };
    Module.prototype.toJSON = function () {
        return {
            id: this.id,
            dependencies: this.dependencies.map(function (module) { return module.id; }),
            transformDependencies: this.transformDependencies,
            transformAssets: this.transformAssets,
            code: this.code,
            originalCode: this.originalCode,
            originalSourcemap: this.originalSourcemap,
            ast: this.esTreeAst,
            sourcemapChain: this.sourcemapChain,
            resolvedIds: this.resolvedIds,
            customTransformCache: this.customTransformCache
        };
    };
    Module.prototype.traceVariable = function (name) {
        // TODO this is slightly circular
        if (name in this.scope.variables) {
            return this.scope.variables[name];
        }
        if (name in this.imports) {
            var importDeclaration = this.imports[name];
            var otherModule = importDeclaration.module;
            if (!otherModule.isExternal && importDeclaration.name === '*') {
                return otherModule.getOrCreateNamespace();
            }
            var declaration = otherModule.traceExport(importDeclaration.name);
            if (!declaration) {
                handleMissingExport(importDeclaration.name, this, otherModule.id, importDeclaration.start);
            }
            return declaration;
        }
        return null;
    };
    Module.prototype.getRenderedExports = function () {
        // only direct exports are counted here, not reexports at all
        var renderedExports = [];
        var removedExports = [];
        for (var exportName in this.exports) {
            var expt = this.exports[exportName];
            (expt.node && expt.node.included ? renderedExports : removedExports).push(exportName);
        }
        return { renderedExports: renderedExports, removedExports: removedExports };
    };
    Module.prototype.traceExport = function (name, isExportAllSearch) {
        if (name[0] === '*') {
            // namespace
            if (name.length === 1) {
                return this.getOrCreateNamespace();
                // export * from 'external'
            }
            else {
                var module = this.graph.moduleById.get(name.slice(1));
                return module.traceExport('*');
            }
        }
        // export { foo } from './other'
        var reexportDeclaration = this.reexports[name];
        if (reexportDeclaration) {
            var declaration = reexportDeclaration.module.traceExport(reexportDeclaration.localName);
            if (!declaration) {
                handleMissingExport(reexportDeclaration.localName, this, reexportDeclaration.module.id, reexportDeclaration.start);
            }
            return declaration;
        }
        var exportDeclaration = this.exports[name];
        if (exportDeclaration) {
            var name_1 = exportDeclaration.localName;
            var declaration = this.traceVariable(name_1) || this.graph.scope.findVariable(name_1);
            return declaration;
        }
        if (name !== 'default') {
            for (var i = 0; i < this.exportAllModules.length; i += 1) {
                var module = this.exportAllModules[i];
                var declaration = module.traceExport(name, true);
                if (declaration)
                    return declaration;
            }
        }
        // we don't want to create shims when we are just
        // probing export * modules for exports
        if (this.graph.shimMissingExports && !isExportAllSearch) {
            return this.shimMissingExport(name);
        }
    };
    Module.prototype.warn = function (warning, pos) {
        if (pos !== undefined) {
            warning.pos = pos;
            var _a = locate(this.code, pos, { offsetLine: 1 }), line = _a.line, column = _a.column; // TODO trace sourcemaps, cf. error()
            warning.loc = { file: this.id, line: line, column: column };
            warning.frame = getCodeFrame(this.code, line, column);
        }
        warning.id = this.id;
        this.graph.warn(warning);
    };
    Module.prototype.shimMissingExport = function (name) {
        // could have already been generated
        if (!this.exports[name])
            this.graph.warn({
                message: "Missing export \"" + name + "\" has been shimmed in module " + relativeId(this.id) + ".",
                code: 'SHIMMED_EXPORT',
                exportName: name,
                exporter: relativeId(this.id)
            });
        this.exports[name] = {
            localName: '_missingExportShim'
        };
        return this.graph.exportShimVariable;
    };
    return Module;
}());

var Source = /** @class */ (function () {
    function Source(filename, content) {
        this.isOriginal = true;
        this.filename = filename;
        this.content = content;
    }
    Source.prototype.traceSegment = function (line, column, name) {
        return { line: line, column: column, name: name, source: this };
    };
    return Source;
}());
var Link = /** @class */ (function () {
    function Link(map, sources) {
        this.sources = sources;
        this.names = map.names;
        this.mappings = map.mappings;
    }
    Link.prototype.traceMappings = function () {
        var sources = [];
        var sourcesContent = [];
        var names = [];
        var mappings = [];
        for (var _i = 0, _a = this.mappings; _i < _a.length; _i++) {
            var line = _a[_i];
            var tracedLine = [];
            for (var _b = 0, line_1 = line; _b < line_1.length; _b++) {
                var segment = line_1[_b];
                var source = this.sources[segment[1]];
                if (!source)
                    continue;
                var traced = source.traceSegment(segment[2], segment[3], this.names[segment[4]]);
                if (traced) {
                    // newer sources are more likely to be used, so search backwards.
                    var sourceIndex = sources.lastIndexOf(traced.source.filename);
                    if (sourceIndex === -1) {
                        sourceIndex = sources.length;
                        sources.push(traced.source.filename);
                        sourcesContent[sourceIndex] = traced.source.content;
                    }
                    else if (sourcesContent[sourceIndex] == null) {
                        sourcesContent[sourceIndex] = traced.source.content;
                    }
                    else if (traced.source.content != null &&
                        sourcesContent[sourceIndex] !== traced.source.content) {
                        error({
                            message: "Multiple conflicting contents for sourcemap source " + traced.source.filename
                        });
                    }
                    var tracedSegment = [
                        segment[0],
                        sourceIndex,
                        traced.line,
                        traced.column
                    ];
                    if (traced.name) {
                        var nameIndex = names.indexOf(traced.name);
                        if (nameIndex === -1) {
                            nameIndex = names.length;
                            names.push(traced.name);
                        }
                        tracedSegment[4] = nameIndex;
                    }
                    tracedLine.push(tracedSegment);
                }
            }
            mappings.push(tracedLine);
        }
        return { sources: sources, sourcesContent: sourcesContent, names: names, mappings: mappings };
    };
    Link.prototype.traceSegment = function (line, column, name) {
        var segments = this.mappings[line];
        if (!segments)
            return null;
        // binary search through segments for the given column
        var i = 0;
        var j = segments.length - 1;
        while (i <= j) {
            var m = (i + j) >> 1;
            var segment = segments[m];
            if (segment[0] === column) {
                var source = this.sources[segment[1]];
                if (!source)
                    return null;
                return source.traceSegment(segment[2], segment[3], this.names[segment[4]] || name);
            }
            if (segment[0] > column) {
                j = m - 1;
            }
            else {
                i = m + 1;
            }
        }
        return null;
    };
    return Link;
}());
// TODO TypeScript: Fix <any> typecasts
function collapseSourcemaps(bundle, file, map, modules, bundleSourcemapChain) {
    var moduleSources = modules.filter(function (module) { return !module.excludeFromSourcemap; }).map(function (module) {
        var sourcemapChain = module.sourcemapChain;
        var source;
        var originalSourcemap = module.originalSourcemap;
        if (!originalSourcemap) {
            source = new Source(module.id, module.originalCode);
        }
        else {
            var sources_1 = originalSourcemap.sources;
            var sourcesContent_1 = originalSourcemap.sourcesContent || [];
            if (sources_1 == null || (sources_1.length <= 1 && sources_1[0] == null)) {
                source = new Source(module.id, sourcesContent_1[0]);
                sourcemapChain = [originalSourcemap].concat(sourcemapChain);
            }
            else {
                // TODO indiscriminately treating IDs and sources as normal paths is probably bad.
                var directory_1 = dirname(module.id) || '.';
                var sourceRoot_1 = originalSourcemap.sourceRoot || '.';
                var baseSources = sources_1.map(function (source, i) {
                    return new Source(resolve(directory_1, sourceRoot_1, source), sourcesContent_1[i]);
                });
                source = new Link(originalSourcemap, baseSources);
            }
        }
        sourcemapChain.forEach(function (map) {
            if (map.missing) {
                bundle.graph.warn({
                    code: 'SOURCEMAP_BROKEN',
                    plugin: map.plugin,
                    message: "Sourcemap is likely to be incorrect: a plugin" + (map.plugin ? " ('" + map.plugin + "')" : "") + " was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help",
                    url: "https://github.com/rollup/rollup/wiki/Troubleshooting#sourcemap-is-likely-to-be-incorrect"
                });
                map = {
                    names: [],
                    mappings: ''
                };
            }
            source = new Link(map, [source]);
        });
        return source;
    });
    var source = new Link(map, moduleSources);
    bundleSourcemapChain.forEach(function (map) {
        source = new Link(map, [source]);
    });
    var _a = source.traceMappings(), sources = _a.sources, sourcesContent = _a.sourcesContent, names = _a.names, mappings = _a.mappings;
    if (file) {
        var directory_2 = dirname(file);
        sources = sources.map(function (source) { return relative(directory_2, source); });
        file = basename(file);
    }
    return new SourceMap({ file: file, sources: sources, sourcesContent: sourcesContent, names: names, mappings: mappings });
}

function guessIndentString(code) {
    var lines = code.split('\n');
    var tabbed = lines.filter(function (line) { return /^\t+/.test(line); });
    var spaced = lines.filter(function (line) { return /^ {2,}/.test(line); });
    if (tabbed.length === 0 && spaced.length === 0) {
        return null;
    }
    // More lines tabbed than spaced? Assume tabs, and
    // default to tabs in the case of a tie (or nothing
    // to go on)
    if (tabbed.length >= spaced.length) {
        return '\t';
    }
    // Otherwise, we need to guess the multiple
    var min = spaced.reduce(function (previous, current) {
        var numSpaces = /^ +/.exec(current)[0].length;
        return Math.min(numSpaces, previous);
    }, Infinity);
    return new Array(min + 1).join(' ');
}
function getIndentString(modules, options) {
    if (options.indent !== true)
        return options.indent || '';
    for (var i = 0; i < modules.length; i++) {
        var indent = guessIndentString(modules[i].originalCode);
        if (indent !== null)
            return indent;
    }
    return '\t';
}

function renderChunk(_a) {
    var graph = _a.graph, chunk = _a.chunk, renderChunk = _a.renderChunk, code = _a.code, sourcemapChain = _a.sourcemapChain, options = _a.options;
    var renderChunkReducer = function (code, result, plugin) {
        if (result == null)
            return code;
        if (typeof result === 'string')
            result = {
                code: result,
                map: undefined
            };
        var map = typeof result.map === 'string' ? JSON.parse(result.map) : result.map;
        if (map && typeof map.mappings === 'string')
            map.mappings = decode(map.mappings);
        // strict null check allows 'null' maps to not be pushed to the chain, while 'undefined' gets the missing map warning
        if (map !== null)
            sourcemapChain.push(map || { missing: true, plugin: plugin.name });
        return result.code;
    };
    var inTransformBundle = false;
    var inRenderChunk = true;
    return graph.pluginDriver
        .hookReduceArg0('renderChunk', [code, renderChunk, options], renderChunkReducer)
        .then(function (code) {
        inRenderChunk = false;
        return graph.pluginDriver.hookReduceArg0('transformChunk', [code, options, chunk], renderChunkReducer);
    })
        .then(function (code) {
        inTransformBundle = true;
        return graph.pluginDriver.hookReduceArg0('transformBundle', [code, options, chunk], renderChunkReducer);
    })
        .catch(function (err) {
        if (inRenderChunk)
            throw err;
        error(err, {
            code: inTransformBundle ? 'BAD_BUNDLE_TRANSFORMER' : 'BAD_CHUNK_TRANSFORMER',
            message: "Error transforming " + ((inTransformBundle ? 'bundle' : 'chunk') +
                (err.plugin ? " with '" + err.plugin + "' plugin" : '')) + ": " + err.message,
            plugin: err.plugin
        });
    });
}

function renderNamePattern(pattern, patternName, getReplacement) {
    if (!isPlainName(pattern))
        error({
            code: 'INVALID_PATTERN',
            message: "Invalid output pattern \"" + pattern + "\" for " + patternName + ", cannot be an absolute or relative URL or path."
        });
    return pattern.replace(/\[(\w+)\]/g, function (_match, type) {
        var replacement = getReplacement(type);
        if (replacement === undefined)
            error({
                code: 'INVALID_PATTERN_REPLACEMENT',
                message: "\"" + type + "\" is not a valid substitution name in output option " + patternName + " pattern."
            });
        if (!isPlainName(replacement))
            error({
                code: 'INVALID_PATTERN_REPLACEMENT',
                message: "Invalid replacement \"" + replacement + "\" for \"" + type + "\" in " + patternName + " pattern, must be a plain path name."
            });
        return replacement;
    });
}
function makeUnique(name, existingNames) {
    if (name in existingNames === false)
        return name;
    var ext = extname(name);
    name = name.substr(0, name.length - ext.length);
    var uniqueName, uniqueIndex = 1;
    while (existingNames[(uniqueName = name + ++uniqueIndex + ext)])
        ;
    return uniqueName;
}

function getGlobalName(module, globals, graph, hasExports) {
    var globalName;
    if (typeof globals === 'function') {
        globalName = globals(module.id);
    }
    else if (globals) {
        globalName = globals[module.id];
    }
    if (globalName) {
        return globalName;
    }
    if (hasExports) {
        graph.warn({
            code: 'MISSING_GLOBAL_NAME',
            source: module.id,
            guess: module.name,
            message: "No name was provided for external module '" + module.id + "' in output.globals \u2013 guessing '" + module.name + "'"
        });
        return module.name;
    }
}
function isNamespaceVariable(variable) {
    return variable.isNamespace;
}
var Chunk$1 = /** @class */ (function () {
    function Chunk(graph, orderedModules) {
        this.hasDynamicImport = false;
        this.indentString = undefined;
        this.exportMode = 'named';
        this.usedModules = undefined;
        this.id = undefined;
        this.linked = false;
        // this represents the chunk module wrappings
        // which form the output dependency graph
        this.imports = new Map();
        // module can be in or out of chunk
        // if module is out of the chunk then it is a reexport
        this.exports = new Map();
        this.exportNames = Object.create(null);
        this.dependencies = undefined;
        // an entry module chunk is a chunk that exactly exports the exports of
        // an input entry point module
        this.entryModule = undefined;
        this.isEntryModuleFacade = false;
        this.isManualChunk = false;
        this.renderedHash = undefined;
        this.renderedModuleSources = undefined;
        this.renderedSource = undefined;
        this.renderedSourceLength = undefined;
        this.needsExportsShim = false;
        this.renderedDeclarations = undefined;
        this.graph = graph;
        this.orderedModules = orderedModules;
        this.isEmpty = true;
        for (var _i = 0, orderedModules_1 = orderedModules; _i < orderedModules_1.length; _i++) {
            var module = orderedModules_1[_i];
            if (this.isEmpty && module.isIncluded()) {
                this.isEmpty = false;
            }
            if (module.chunkAlias) {
                this.isManualChunk = true;
            }
            module.chunk = this;
            if (module.isEntryPoint && !this.entryModule) {
                this.entryModule = module;
                this.isEntryModuleFacade = true;
            }
        }
        if (this.entryModule)
            this.name = makeLegal(basename(this.entryModule.chunkAlias || this.orderedModules[0].chunkAlias || this.entryModule.id));
        else
            this.name = '__chunk_' + ++graph.curChunkIndex;
    }
    Chunk.prototype.getImportIds = function () {
        return this.dependencies.map(function (module) { return module.id; });
    };
    Chunk.prototype.getExportNames = function () {
        return Object.keys(this.exportNames);
    };
    Chunk.prototype.inlineChunkDependencies = function (chunk, deep) {
        for (var _i = 0, _a = chunk.dependencies; _i < _a.length; _i++) {
            var dep = _a[_i];
            if (dep instanceof ExternalModule) {
                if (this.dependencies.indexOf(dep) === -1)
                    this.dependencies.push(dep);
            }
            else {
                if (dep === this || this.dependencies.indexOf(dep) !== -1)
                    continue;
                if (!dep.isEmpty)
                    this.dependencies.push(dep);
                if (deep)
                    this.inlineChunkDependencies(dep, true);
            }
        }
    };
    // note we assume the facade module chunk is itself linked
    // with generateEntryExports called
    Chunk.prototype.linkFacade = function (entryFacade) {
        this.dependencies = [entryFacade.chunk];
        this.entryModule = entryFacade;
        this.isEntryModuleFacade = true;
        for (var _i = 0, _a = entryFacade.getAllExports(); _i < _a.length; _i++) {
            var exportName = _a[_i];
            var tracedVariable = entryFacade.traceExport(exportName);
            this.exports.set(tracedVariable, entryFacade);
            this.exportNames[exportName] = tracedVariable;
        }
    };
    Chunk.prototype.link = function () {
        this.dependencies = [];
        for (var _i = 0, _a = this.orderedModules; _i < _a.length; _i++) {
            var module = _a[_i];
            this.linkModule(module);
        }
        this.linked = true;
    };
    Chunk.prototype.linkModule = function (module) {
        for (var _i = 0, _a = module.dependencies; _i < _a.length; _i++) {
            var dep = _a[_i];
            if (dep.chunk === this) {
                continue;
            }
            var depModule = void 0;
            if (dep instanceof Module) {
                depModule = dep.chunk;
            }
            else {
                // unused pure external modules can be skipped
                if (!dep.used && this.graph.isPureExternalModule(dep.id)) {
                    continue;
                }
                depModule = dep;
            }
            if (this.dependencies.indexOf(depModule) === -1) {
                this.dependencies.push(depModule);
            }
        }
        for (var _b = 0, _c = Object.keys(module.imports); _b < _c.length; _b++) {
            var importName = _c[_b];
            var declaration = module.imports[importName];
            this.traceImport(declaration.name, declaration.module);
        }
        for (var _d = 0, _e = module.dynamicImportResolutions; _d < _e.length; _d++) {
            var resolution = _e[_d].resolution;
            this.hasDynamicImport = true;
            if (resolution instanceof Module && resolution.chunk === this)
                resolution.getOrCreateNamespace().include();
        }
    };
    // Note preserveModules implementation is not a comprehensive technique
    // this will likely need to be reworked at some stage for edge cases
    Chunk.prototype.populateEntryExports = function (preserveModules) {
        var entryExportEntries = Array.from(this.entryModule.getAllExports().entries());
        var tracedExports = [];
        for (var _i = 0, entryExportEntries_1 = entryExportEntries; _i < entryExportEntries_1.length; _i++) {
            var _a = entryExportEntries_1[_i], index = _a[0], exportName = _a[1];
            var traced = this.traceExport(exportName, this.entryModule);
            if (traced.variable && !traced.variable.included && !traced.variable.isExternal) {
                continue;
            }
            tracedExports[index] = traced;
            if (!traced.variable) {
                continue;
            }
            if (traced.module.chunk) {
                traced.module.chunk.exports.set(traced.variable, traced.module);
            }
            var existingExport = this.exportNames[exportName];
            // tainted entryModule boundary
            if (existingExport && existingExport !== traced.variable) {
                this.isEntryModuleFacade = false;
            }
        }
        var _loop_1 = function (exposedVariable) {
            if (tracedExports.every(function (_a) {
                var variable = _a.variable;
                return variable !== exposedVariable;
            })) {
                this_1.isEntryModuleFacade = false;
                return { value: void 0 };
            }
        };
        var this_1 = this;
        // tainted if we've already exposed something not corresponding to entry exports
        for (var _b = 0, _c = Array.from(this.exports.keys()); _b < _c.length; _b++) {
            var exposedVariable = _c[_b];
            var state_1 = _loop_1(exposedVariable);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (preserveModules || this.isEntryModuleFacade) {
            for (var _d = 0, entryExportEntries_2 = entryExportEntries; _d < entryExportEntries_2.length; _d++) {
                var _e = entryExportEntries_2[_d], index = _e[0], exportName = _e[1];
                var traced = tracedExports[index];
                if (!traced) {
                    continue;
                }
                if (traced.variable) {
                    if (!traced.variable.included && !traced.variable.isExternal) {
                        continue;
                    }
                    this.exports.set(traced.variable, traced.module);
                }
                // can be undefined for star external exports (exportName[0] === '*')
                this.exportNames[exportName] = traced.variable;
            }
        }
    };
    Chunk.prototype.traceImport = function (exportName, module) {
        var traced = this.traceExport(exportName, module);
        if (!traced)
            return;
        // namespace variable can indicate multiple imports
        if (isNamespaceVariable(traced.variable)) {
            var namespaceVariables = traced.variable.originals ||
                traced.variable.module.declarations;
            for (var _i = 0, _a = Object.keys(namespaceVariables); _i < _a.length; _i++) {
                var importName = _a[_i];
                var original = namespaceVariables[importName];
                if (original.included) {
                    // namespace exports could be imported themselves, so retrace
                    // this handles recursive namespace exported on namespace cases as well
                    if (traced.variable.module instanceof Module) {
                        this.traceImport(importName, traced.variable.module);
                    }
                    else {
                        var externalVariable = traced.variable.module.traceExport(importName);
                        if (externalVariable.included)
                            this.imports.set(original, traced.variable.module);
                    }
                }
            }
        }
        // ignore unincluded or imports to modules already in this chunk
        if (traced.module.chunk === this || !traced.variable.included)
            return traced;
        this.imports.set(traced.variable, traced.module);
        if (traced.module instanceof Module)
            traced.module.chunk.exports.set(traced.variable, traced.module);
        return traced;
    };
    // trace a module export to its exposed chunk module export
    // either in this chunk or in another
    Chunk.prototype.traceExport = function (name, module) {
        if (name === '*' || module instanceof ExternalModule) {
            return { variable: module.traceExport(name), module: module };
        }
        if (module.chunk !== this) {
            // we follow reexports if they are not entry points in the hope
            // that we can get an entry point reexport to reduce the chance of
            // tainting an entryModule chunk by exposing other unnecessary exports
            if (module.isEntryPoint && !module.chunk.isEmpty)
                return { variable: module.traceExport(name), module: module };
            return module.chunk.traceExport(name, module);
        }
        var exportDeclaration = module.exports[name];
        if (exportDeclaration) {
            // if export binding is itself an import binding then continue tracing
            var importDeclaration = module.imports[exportDeclaration.localName];
            if (importDeclaration) {
                return this.traceImport(importDeclaration.name, importDeclaration.module);
            }
            return { variable: module.traceExport(name), module: module };
        }
        var reexportDeclaration = module.reexports[name];
        if (reexportDeclaration) {
            return this.traceExport(reexportDeclaration.localName, reexportDeclaration.module);
        }
        if (name === 'default') {
            return;
        }
        // external star exports
        if (name[0] === '*') {
            return { variable: undefined, module: this.graph.moduleById.get(name.substr(1)) };
        }
        // resolve known star exports
        for (var i = 0; i < module.exportAllModules.length; i++) {
            var exportAllModule = module.exportAllModules[i];
            // we have to ensure the right export all module
            if (exportAllModule.traceExport(name, true)) {
                return this.traceExport(name, exportAllModule);
            }
        }
    };
    Chunk.prototype.getVariableExportName = function (variable) {
        for (var _i = 0, _a = Object.keys(this.exportNames); _i < _a.length; _i++) {
            var exportName = _a[_i];
            if (this.exportNames[exportName] === variable)
                return exportName;
        }
    };
    Chunk.prototype.generateInternalExports = function (options) {
        if (this.isEntryModuleFacade)
            return;
        var mangle = options.format === 'system' || options.format === 'es' || options.compact;
        var i = 0, safeExportName;
        this.exportNames = Object.create(null);
        var exportedVariables = Array.from(this.exports.keys());
        if (mangle) {
            for (var _i = 0, exportedVariables_1 = exportedVariables; _i < exportedVariables_1.length; _i++) {
                var variable = exportedVariables_1[_i];
                safeExportName = toBase64(++i);
                // skip past leading number identifiers
                if (safeExportName.charCodeAt(0) === 49 /* '1' */) {
                    i += 9 * Math.pow(64, (safeExportName.length - 1));
                    safeExportName = toBase64(i);
                }
                this.exportNames[safeExportName] = variable;
            }
        }
        else {
            for (var _a = 0, exportedVariables_2 = exportedVariables; _a < exportedVariables_2.length; _a++) {
                var variable = exportedVariables_2[_a];
                i = 0;
                safeExportName = variable.name;
                while (this.exportNames[safeExportName]) {
                    safeExportName = variable.name + '$' + ++i;
                }
                this.exportNames[safeExportName] = variable;
            }
        }
    };
    Chunk.prototype.prepareDynamicImports = function () {
        for (var _i = 0, _a = this.orderedModules; _i < _a.length; _i++) {
            var module = _a[_i];
            for (var i = 0; i < module.dynamicImportResolutions.length; i++) {
                var node = module.dynamicImports[i];
                var resolution = module.dynamicImportResolutions[i].resolution;
                if (!resolution)
                    continue;
                if (resolution instanceof Module) {
                    // if we have the module in the chunk, inline as Promise.resolve(namespace)
                    // ensuring that we create a namespace import of it as well
                    if (resolution.chunk === this) {
                        var namespace = resolution.getOrCreateNamespace();
                        node.setResolution(false, namespace.getName());
                        // for the module in another chunk, import that other chunk directly
                    }
                    else {
                        node.setResolution(false);
                    }
                    // external dynamic import resolution
                }
                else if (resolution instanceof ExternalModule) {
                    node.setResolution(true);
                    // AST Node -> source replacement
                }
                else {
                    node.setResolution(false);
                }
            }
        }
    };
    Chunk.prototype.finaliseDynamicImports = function () {
        for (var i = 0; i < this.orderedModules.length; i++) {
            var module = this.orderedModules[i];
            var code = this.renderedModuleSources[i];
            for (var j = 0; j < module.dynamicImportResolutions.length; j++) {
                var node = module.dynamicImports[j];
                var resolution = module.dynamicImportResolutions[j].resolution;
                if (!resolution)
                    continue;
                if (resolution instanceof Module) {
                    if (resolution.chunk !== this) {
                        var relPath = normalize(relative(dirname(this.id), resolution.chunk.id));
                        if (!relPath.startsWith('../'))
                            relPath = './' + relPath;
                        node.renderFinalResolution(code, "\"" + relPath + "\"");
                    }
                }
                else if (resolution instanceof ExternalModule) {
                    node.renderFinalResolution(code, "\"" + resolution.id + "\"");
                    // AST Node -> source replacement
                }
                else {
                    node.renderFinalResolution(code, resolution);
                }
            }
        }
    };
    Chunk.prototype.finaliseImportMetas = function (options) {
        var usesMechanism = false;
        for (var i = 0; i < this.orderedModules.length; i++) {
            var module = this.orderedModules[i];
            var code = this.renderedModuleSources[i];
            for (var _i = 0, _a = module.importMetas; _i < _a.length; _i++) {
                var importMeta = _a[_i];
                if (importMeta.renderFinalMechanism(code, this.id, options.format, options.compact))
                    usesMechanism = true;
            }
        }
        return usesMechanism;
    };
    Chunk.prototype.setIdentifierRenderResolutions = function (options) {
        var _this = this;
        this.needsExportsShim = false;
        var used = Object.create(null);
        var esm = options.format === 'es' || options.format === 'system';
        // ensure no conflicts with globals
        Object.keys(this.graph.scope.variables).forEach(function (name) { return (used[name] = 1); });
        function getSafeName(name) {
            var safeName = name;
            while (used[safeName]) {
                safeName = name + "$" + toBase64(used[name]++, true);
            }
            used[safeName] = 1;
            return safeName;
        }
        // reserved internal binding names for system format wiring
        if (options.format === 'system') {
            used._setter = used._starExcludes = used._$p = 1;
        }
        var toDeshadow = new Set();
        if (!esm) {
            this.dependencies.forEach(function (module) {
                var safeName = getSafeName(module.name);
                toDeshadow.add(safeName);
                module.name = safeName;
            });
        }
        for (var _i = 0, _a = Object.keys(this.exportNames); _i < _a.length; _i++) {
            var exportName = _a[_i];
            var exportVariable = this.exportNames[exportName];
            if (exportVariable === this.graph.exportShimVariable)
                this.needsExportsShim = true;
            if (exportVariable && exportVariable.exportName !== exportName)
                exportVariable.exportName = exportName;
        }
        Array.from(this.imports.entries()).forEach(function (_a) {
            var variable = _a[0], module = _a[1];
            var safeName;
            if (module instanceof ExternalModule) {
                if (variable.name === '*') {
                    safeName = module.name;
                }
                else if (variable.name === 'default') {
                    if (options.interop !== false &&
                        (module.exportsNamespace || (!esm && module.exportsNames))) {
                        safeName = module.name + "__default";
                    }
                    else {
                        safeName = module.name;
                    }
                }
                else {
                    safeName = esm ? variable.name : module.name + "." + variable.name;
                }
                if (esm) {
                    safeName = getSafeName(safeName);
                    toDeshadow.add(safeName);
                }
            }
            else if (esm) {
                safeName = getSafeName(variable.name);
                toDeshadow.add(safeName);
            }
            else {
                var chunk = module.chunk;
                if (chunk.exportMode === 'default')
                    safeName = chunk.name;
                else
                    safeName = chunk.name + "." + module.chunk.getVariableExportName(variable);
            }
            if (safeName)
                variable.setSafeName(safeName);
        });
        this.orderedModules.forEach(function (module) {
            _this.deconflictExportsOfModule(module, getSafeName, esm);
        });
        this.graph.scope.deshadow(toDeshadow, this.orderedModules.map(function (module) { return module.scope; }));
    };
    Chunk.prototype.deconflictExportsOfModule = function (module, getSafeName, esm) {
        Object.keys(module.scope.variables).forEach(function (variableName) {
            var variable = module.scope.variables[variableName];
            if (isExportDefaultVariable(variable) && variable.referencesOriginal()) {
                variable.setSafeName(null);
                return;
            }
            if (!(isExportDefaultVariable(variable) && variable.hasId)) {
                var safeName = void 0;
                if (esm || !variable.isReassigned || variable.isId) {
                    safeName = getSafeName(variable.name);
                }
                else {
                    var safeExportName = variable.exportName;
                    if (safeExportName) {
                        safeName = "exports." + safeExportName;
                    }
                    else {
                        safeName = getSafeName(variable.name);
                    }
                }
                variable.setSafeName(safeName);
            }
        });
        // deconflict reified namespaces
        var namespace = module.getOrCreateNamespace();
        if (namespace.needsNamespaceBlock) {
            namespace.setSafeName(getSafeName(namespace.name));
        }
    };
    Chunk.prototype.getChunkDependencyDeclarations = function (options, inputBase) {
        var _this = this;
        var reexportDeclarations = new Map();
        for (var _i = 0, _a = Object.keys(this.exportNames); _i < _a.length; _i++) {
            var exportName = _a[_i];
            var exportModule = void 0;
            var importName = void 0;
            if (exportName[0] === '*') {
                exportModule = this.graph.moduleById.get(exportName.substr(1));
                importName = exportName = '*';
            }
            else {
                var variable = this.exportNames[exportName];
                var module = this.exports.get(variable);
                // skip local exports
                if (module.chunk === this)
                    continue;
                if (module instanceof Module) {
                    exportModule = module.chunk;
                    importName = module.chunk.getVariableExportName(variable);
                }
                else {
                    exportModule = module;
                    importName = variable.name;
                }
            }
            var exportDeclaration = reexportDeclarations.get(exportModule);
            if (!exportDeclaration)
                reexportDeclarations.set(exportModule, (exportDeclaration = []));
            exportDeclaration.push({ imported: importName, reexported: exportName });
        }
        var dependencies = [];
        this.dependencies.forEach(function (dep) {
            var importSpecifiers = Array.from(_this.imports.entries()).filter(function (_a) {
                var module = _a[1];
                return (module instanceof Module ? module.chunk === dep : module === dep);
            });
            var imports;
            if (importSpecifiers.length) {
                imports = [];
                for (var _i = 0, importSpecifiers_1 = importSpecifiers; _i < importSpecifiers_1.length; _i++) {
                    var _a = importSpecifiers_1[_i], variable = _a[0], module = _a[1];
                    var local = variable.safeName || variable.name;
                    var imported = void 0;
                    if (module instanceof ExternalModule) {
                        imported = variable.name;
                    }
                    else {
                        imported = module.chunk.getVariableExportName(variable);
                    }
                    imports.push({ local: local, imported: imported });
                }
            }
            var reexports = reexportDeclarations.get(dep);
            var exportsNames, exportsDefault;
            var namedExportsMode = true;
            if (dep instanceof ExternalModule) {
                exportsNames = dep.exportsNames || dep.exportsNamespace;
                exportsDefault = 'default' in dep.declarations;
            }
            else {
                exportsNames = true;
                // we don't want any interop patterns to trigger
                exportsDefault = false;
                namedExportsMode = dep.exportMode !== 'default';
            }
            var id;
            var globalName;
            if (dep instanceof ExternalModule) {
                id = dep.renderPath || dep.setRenderPath(options, inputBase);
                if (options.format === 'umd' || options.format === 'iife') {
                    globalName = getGlobalName(dep, options.globals, _this.graph, exportsNames || exportsDefault);
                }
            }
            dependencies.push({
                id: id,
                namedExportsMode: namedExportsMode,
                globalName: globalName,
                name: dep.name,
                isChunk: !dep.isExternal,
                exportsNames: exportsNames,
                exportsDefault: exportsDefault,
                reexports: reexports,
                imports: imports
            });
        });
        return dependencies;
    };
    Chunk.prototype.getChunkExportDeclarations = function () {
        var exports = [];
        var _loop_2 = function (exportName) {
            if (exportName[0] === '*')
                return "continue";
            var variable = this_2.exportNames[exportName];
            var module = this_2.exports.get(variable);
            // skip external exports
            if (module.chunk !== this_2)
                return "continue";
            // determine if a hoisted export (function)
            var hoisted = false;
            var uninitialized = false;
            if (variable instanceof LocalVariable) {
                if (variable.init === UNDEFINED_EXPRESSION) {
                    uninitialized = true;
                }
                variable.declarations.forEach(function (decl) {
                    if (decl.type === ExportDefaultDeclaration) {
                        if (decl.declaration.type === FunctionDeclaration)
                            hoisted = true;
                    }
                    else if (decl.parent.type === FunctionDeclaration) {
                        hoisted = true;
                    }
                });
            }
            else if (variable instanceof GlobalVariable) {
                hoisted = true;
            }
            var localName = variable.getName();
            exports.push({
                local: localName,
                exported: exportName === '*' ? localName : exportName,
                hoisted: hoisted,
                uninitialized: uninitialized
            });
        };
        var this_2 = this;
        for (var _i = 0, _a = Object.keys(this.exportNames); _i < _a.length; _i++) {
            var exportName = _a[_i];
            _loop_2(exportName);
        }
        return exports;
    };
    Chunk.prototype.getRenderedHash = function () {
        if (this.renderedHash)
            return this.renderedHash;
        var hash = _256();
        hash.update(this.renderedSource.toString());
        return (this.renderedHash = hash.digest('hex'));
    };
    /*
     * Chunk dependency output graph post-visitor
     * Visitor can return "true" to indicate a propogated stop condition
     */
    Chunk.prototype.postVisitChunkDependencies = function (visitor) {
        var seen = new Set();
        // add in hashes of all dependent chunks and resolved external ids
        function visitDep(dep) {
            if (seen.has(dep))
                return;
            seen.add(dep);
            if (dep instanceof Chunk) {
                for (var _i = 0, _a = dep.dependencies; _i < _a.length; _i++) {
                    var subDep = _a[_i];
                    if (visitDep(subDep))
                        return true;
                }
            }
            return visitor(dep) === true;
        }
        return visitDep(this);
    };
    Chunk.prototype.computeFullHash = function (addons, options) {
        var hash = _256();
        // own rendered source, except for finalizer wrapping
        hash.update(this.getRenderedHash());
        // hash of addons
        hash.update(addons.hash);
        // output options
        hash.update(options.format);
        // import names of dependency sources
        hash.update(this.dependencies.length);
        // add in hashes of all dependent chunks and resolved external ids
        this.postVisitChunkDependencies(function (dep) {
            if (dep instanceof ExternalModule)
                hash.update(':' + dep.renderPath);
            else
                hash.update(dep.getRenderedHash());
        });
        return hash.digest('hex').substr(0, 8);
    };
    // prerender allows chunk hashes and names to be generated before finalizing
    Chunk.prototype.preRender = function (options, inputBase) {
        timeStart('render modules', 3);
        var magicString = new Bundle({ separator: options.compact ? '' : '\n\n' });
        this.usedModules = [];
        this.indentString = options.compact ? '' : getIndentString(this.orderedModules, options);
        var n = options.compact ? '' : '\n';
        var _ = options.compact ? '' : ' ';
        var renderOptions = {
            compact: options.compact,
            freeze: options.freeze !== false,
            esModule: options.esModule !== false,
            namespaceToStringTag: options.namespaceToStringTag === true,
            indent: this.indentString,
            format: options.format
        };
        // if an entry point facade, inline the execution list to avoid loading latency
        if (this.isEntryModuleFacade) {
            for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
                var dep = _a[_i];
                if (dep instanceof Chunk)
                    this.inlineChunkDependencies(dep, true);
            }
        }
        else {
            // shortcut cross-chunk relations can be added by traceExport
            for (var _b = 0, _c = Array.from(this.imports.values()); _b < _c.length; _b++) {
                var module = _c[_b];
                var chunkOrExternal = module instanceof Module ? module.chunk : module;
                if (this.dependencies.indexOf(chunkOrExternal) === -1) {
                    this.dependencies.push(chunkOrExternal);
                }
            }
        }
        // prune empty dependency chunks, inlining their side-effect dependencies
        for (var i = 0; i < this.dependencies.length; i++) {
            var dep = this.dependencies[i];
            if (dep instanceof Chunk && dep.isEmpty) {
                this.dependencies.splice(i--, 1);
                this.inlineChunkDependencies(dep, false);
            }
        }
        this.setIdentifierRenderResolutions(options);
        this.prepareDynamicImports();
        var hoistedSource = '';
        this.renderedModules = Object.create(null);
        this.renderedModuleSources = [];
        for (var i = 0; i < this.orderedModules.length; i++) {
            var module = this.orderedModules[i];
            var source = module.render(renderOptions);
            source.trim();
            if (options.compact && source.lastLine().indexOf('//') !== -1)
                source.append('\n');
            this.renderedModuleSources.push(source);
            var _d = module.getRenderedExports(), renderedExports = _d.renderedExports, removedExports = _d.removedExports;
            this.renderedModules[module.id] = {
                renderedExports: renderedExports,
                removedExports: removedExports,
                renderedLength: source.length(),
                originalLength: module.originalCode.length
            };
            var namespace = module.getOrCreateNamespace();
            if (namespace.needsNamespaceBlock || !source.isEmpty()) {
                magicString.addSource(source);
                this.usedModules.push(module);
                if (namespace.needsNamespaceBlock) {
                    var rendered = namespace.renderBlock(renderOptions);
                    if (namespace.renderFirst())
                        hoistedSource += n + rendered;
                    else
                        magicString.addSource(new MagicString(rendered));
                }
            }
        }
        if (hoistedSource)
            magicString.prepend(hoistedSource + n + n);
        if (this.needsExportsShim) {
            magicString.prepend("" + n + this.graph.varOrConst + " _missingExportShim" + _ + "=" + _ + "void 0;" + n + n);
        }
        if (options.compact) {
            this.renderedSource = magicString;
        }
        else {
            this.renderedSource = magicString.trim();
        }
        this.renderedSourceLength = undefined;
        this.renderedHash = undefined;
        if (this.getExportNames().length === 0 && this.getImportIds().length === 0 && this.isEmpty) {
            this.graph.warn({
                code: 'EMPTY_BUNDLE',
                message: 'Generated an empty bundle'
            });
        }
        this.renderedDeclarations = {
            dependencies: this.getChunkDependencyDeclarations(options, inputBase),
            exports: this.exportMode === 'none' ? [] : this.getChunkExportDeclarations()
        };
        timeEnd('render modules', 3);
    };
    Chunk.prototype.getRenderedSourceLength = function () {
        if (this.renderedSourceLength !== undefined)
            return this.renderedSourceLength;
        return (this.renderedSourceLength = this.renderedSource.length());
    };
    /*
     * Performs a full merge of another chunk into this chunk
     * chunkList allows updating references in other chunks for the merged chunk to this chunk
     * A new facade will be added to chunkList if tainting exports of either as an entry point
     */
    Chunk.prototype.merge = function (chunk, chunkList, options, inputBase) {
        var _this = this;
        if (this.isEntryModuleFacade || chunk.isEntryModuleFacade)
            throw new Error('Internal error: Code splitting chunk merges not supported for facades');
        for (var _i = 0, _a = chunk.orderedModules; _i < _a.length; _i++) {
            var module = _a[_i];
            module.chunk = this;
            this.orderedModules.push(module);
        }
        for (var _b = 0, _c = Array.from(chunk.imports.entries()); _b < _c.length; _b++) {
            var _d = _c[_b], variable = _d[0], module = _d[1];
            if (!this.imports.has(variable) && module.chunk !== this) {
                this.imports.set(variable, module);
            }
        }
        // NB detect when exported variables are orphaned by the merge itself
        // (involves reverse tracing dependents)
        for (var _e = 0, _f = Array.from(chunk.exports.entries()); _e < _f.length; _e++) {
            var _g = _f[_e], variable = _g[0], module = _g[1];
            if (!this.exports.has(variable)) {
                this.exports.set(variable, module);
            }
        }
        var thisOldExportNames = this.exportNames;
        // regenerate internal names
        this.generateInternalExports(options);
        var updateRenderedDeclaration = function (dep, oldExportNames) {
            if (dep.imports) {
                for (var _i = 0, _a = dep.imports; _i < _a.length; _i++) {
                    var impt = _a[_i];
                    impt.imported = _this.getVariableExportName(oldExportNames[impt.imported]);
                }
            }
            if (dep.reexports) {
                for (var _b = 0, _c = dep.reexports; _b < _c.length; _b++) {
                    var reexport = _c[_b];
                    reexport.imported = _this.getVariableExportName(oldExportNames[reexport.imported]);
                }
            }
        };
        var mergeRenderedDeclaration = function (into, from) {
            if (from.imports) {
                if (!into.imports) {
                    into.imports = from.imports;
                }
                else {
                    into.imports = into.imports.concat(from.imports);
                }
            }
            if (from.reexports) {
                if (!into.reexports) {
                    into.reexports = from.reexports;
                }
                else {
                    into.reexports = into.reexports.concat(from.reexports);
                }
            }
            if (!into.exportsNames && from.exportsNames) {
                into.exportsNames = true;
            }
            if (!into.exportsDefault && from.exportsDefault) {
                into.exportsDefault = true;
            }
            into.name = _this.name;
        };
        // go through the other chunks and update their dependencies
        // also update their import and reexport names in the process
        for (var _h = 0, chunkList_1 = chunkList; _h < chunkList_1.length; _h++) {
            var c = chunkList_1[_h];
            var includedDeclaration = void 0;
            for (var i = 0; i < c.dependencies.length; i++) {
                var dep = c.dependencies[i];
                if ((dep === chunk || dep === this) && includedDeclaration) {
                    var duplicateDeclaration = c.renderedDeclarations.dependencies[i];
                    updateRenderedDeclaration(duplicateDeclaration, dep === chunk ? chunk.exportNames : thisOldExportNames);
                    mergeRenderedDeclaration(includedDeclaration, duplicateDeclaration);
                    c.renderedDeclarations.dependencies.splice(i, 1);
                    c.dependencies.splice(i--, 1);
                }
                else if (dep === chunk) {
                    c.dependencies[i] = this;
                    includedDeclaration = c.renderedDeclarations.dependencies[i];
                    updateRenderedDeclaration(includedDeclaration, chunk.exportNames);
                }
                else if (dep === this) {
                    includedDeclaration = c.renderedDeclarations.dependencies[i];
                    updateRenderedDeclaration(includedDeclaration, thisOldExportNames);
                }
            }
        }
        // re-render the merged chunk
        this.preRender(options, inputBase);
    };
    Chunk.prototype.generateIdPreserveModules = function (preserveModulesRelativeDir) {
        return (this.id = normalize(relative(preserveModulesRelativeDir, this.entryModule.id)));
    };
    Chunk.prototype.generateId = function (pattern, patternName, addons, options, existingNames) {
        var _this = this;
        var outName = makeUnique(renderNamePattern(pattern, patternName, function (type) {
            switch (type) {
                case 'format':
                    return options.format === 'es' ? 'esm' : options.format;
                case 'hash':
                    return _this.computeFullHash(addons, options);
                case 'name':
                    if (_this.entryModule && _this.entryModule.chunkAlias)
                        return _this.entryModule.chunkAlias;
                    for (var _i = 0, _a = _this.orderedModules; _i < _a.length; _i++) {
                        var module = _a[_i];
                        if (module.chunkAlias)
                            return module.chunkAlias;
                    }
                    return 'chunk';
            }
        }), existingNames);
        this.id = outName;
    };
    Chunk.prototype.render = function (options, addons, outputChunk) {
        var _this = this;
        timeStart('render format', 3);
        if (!this.renderedSource)
            throw new Error('Internal error: Chunk render called before preRender');
        var finalise = finalisers[options.format];
        if (!finalise) {
            error({
                code: 'INVALID_OPTION',
                message: "Invalid format: " + options.format + " - valid options are " + Object.keys(finalisers).join(', ')
            });
        }
        // populate ids in the rendered declarations only here
        // as chunk ids known only after prerender
        for (var i = 0; i < this.dependencies.length; i++) {
            var dep = this.dependencies[i];
            if (dep instanceof ExternalModule && !dep.renormalizeRenderPath)
                continue;
            var renderedDependency = this.renderedDeclarations.dependencies[i];
            var depId = dep instanceof ExternalModule ? renderedDependency.id : dep.id;
            var relPath = this.id ? normalize(relative(dirname(this.id), depId)) : depId;
            if (!relPath.startsWith('../'))
                relPath = './' + relPath;
            if (dep instanceof Chunk)
                renderedDependency.namedExportsMode = dep.exportMode !== 'default';
            renderedDependency.id = relPath;
        }
        this.finaliseDynamicImports();
        var needsAmdModule = this.finaliseImportMetas(options);
        var hasExports = this.renderedDeclarations.exports.length !== 0 ||
            this.renderedDeclarations.dependencies.some(function (dep) { return dep.reexports && dep.reexports.length !== 0; });
        var usesTopLevelAwait = this.orderedModules.some(function (module) { return module.usesTopLevelAwait; });
        if (usesTopLevelAwait && options.format !== 'es' && options.format !== 'system') {
            error({
                code: 'INVALID_TLA_FORMAT',
                message: "Module format " + options.format + " does not support top-level await. Use the \"es\" or \"system\" output formats rather."
            });
        }
        var magicString = finalise(this.renderedSource, {
            indentString: this.indentString,
            namedExportsMode: this.exportMode !== 'default',
            hasExports: hasExports,
            intro: addons.intro,
            outro: addons.outro,
            dynamicImport: this.hasDynamicImport,
            needsAmdModule: needsAmdModule,
            dependencies: this.renderedDeclarations.dependencies,
            exports: this.renderedDeclarations.exports,
            graph: this.graph,
            isEntryModuleFacade: this.isEntryModuleFacade,
            usesTopLevelAwait: usesTopLevelAwait
        }, options);
        if (addons.banner)
            magicString.prepend(addons.banner);
        if (addons.footer)
            magicString.append(addons.footer);
        var prevCode = magicString.toString();
        timeEnd('render format', 3);
        var map = null;
        var chunkSourcemapChain = [];
        return renderChunk({
            graph: this.graph,
            chunk: this,
            renderChunk: outputChunk,
            code: prevCode,
            sourcemapChain: chunkSourcemapChain,
            options: options
        }).then(function (code) {
            if (options.sourcemap) {
                timeStart('sourcemap', 3);
                var file = void 0;
                if (options.file)
                    file = resolve(options.sourcemapFile || options.file);
                else if (options.dir)
                    file = resolve(options.dir, _this.id);
                else
                    file = resolve(_this.id);
                if (_this.graph.pluginDriver.hasLoadersOrTransforms) {
                    var decodedMap = magicString.generateDecodedMap({});
                    map = collapseSourcemaps(_this, file, decodedMap, _this.usedModules, chunkSourcemapChain);
                }
                else {
                    map = magicString.generateMap({ file: file, includeContent: true });
                }
                map.sources = map.sources.map(normalize);
                timeEnd('sourcemap', 3);
            }
            if (options.compact !== true && code[code.length - 1] !== '\n')
                code += '\n';
            return { code: code, map: map };
        });
    };
    return Chunk;
}());

/*
 * Given a chunk list, perform optimizations on that chunk list
 * to reduce the mumber of chunks. Mutates the chunks array.
 *
 * Manual chunks (with chunk.chunkAlias already set) are preserved
 * Entry points are carefully preserved as well
 *
 */
function optimizeChunks(chunks, options, CHUNK_GROUPING_SIZE, inputBase) {
    var _loop_1 = function (chunkIndex) {
        var mainChunk = chunks[chunkIndex];
        var execGroup = [];
        mainChunk.postVisitChunkDependencies(function (dep) {
            if (dep instanceof Chunk$1) {
                execGroup.push(dep);
            }
        });
        if (execGroup.length < 2) {
            return out_chunkIndex_1 = chunkIndex, "continue";
        }
        var execGroupIndex = 1;
        var seekingFirstMergeCandidate = true;
        var lastChunk, chunk = execGroup[0], nextChunk = execGroup[1];
        var isMergeCandidate = function (chunk) {
            if (chunk.isEntryModuleFacade || chunk.isManualChunk) {
                return false;
            }
            if (!nextChunk || nextChunk.isEntryModuleFacade) {
                return false;
            }
            if (chunk.getRenderedSourceLength() > CHUNK_GROUPING_SIZE) {
                return false;
            }
            // if (!chunk.isPure()) continue;
            return true;
        };
        var _loop_2 = function () {
            if (seekingFirstMergeCandidate) {
                if (isMergeCandidate(chunk)) {
                    seekingFirstMergeCandidate = false;
                }
                return "continue";
            }
            var remainingSize = CHUNK_GROUPING_SIZE - lastChunk.getRenderedSourceLength() - chunk.getRenderedSourceLength();
            if (remainingSize <= 0) {
                if (!isMergeCandidate(chunk)) {
                    seekingFirstMergeCandidate = true;
                }
                return "continue";
            }
            // if (!chunk.isPure()) continue;
            var chunkDependencies = new Set();
            chunk.postVisitChunkDependencies(function (dep) { return chunkDependencies.add(dep); });
            var ignoreSizeChunks = new Set([chunk, lastChunk]);
            if (lastChunk.postVisitChunkDependencies(function (dep) {
                if (dep === chunk || dep === lastChunk) {
                    return false;
                }
                if (chunkDependencies.has(dep)) {
                    return false;
                }
                if (dep instanceof ExternalModule) {
                    return true;
                }
                remainingSize -= dep.getRenderedSourceLength();
                if (remainingSize <= 0) {
                    return true;
                }
                ignoreSizeChunks.add(dep);
            })) {
                if (!isMergeCandidate(chunk)) {
                    seekingFirstMergeCandidate = true;
                }
                return "continue";
            }
            if (chunk.postVisitChunkDependencies(function (dep) {
                if (ignoreSizeChunks.has(dep)) {
                    return false;
                }
                if (dep instanceof ExternalModule) {
                    return true;
                }
                remainingSize -= dep.getRenderedSourceLength();
                if (remainingSize <= 0) {
                    return true;
                }
            })) {
                if (!isMergeCandidate(chunk)) {
                    seekingFirstMergeCandidate = true;
                }
                return "continue";
            }
            // within the size limit -> merge!
            var optimizedChunkIndex = chunks.indexOf(chunk);
            if (optimizedChunkIndex <= chunkIndex)
                chunkIndex--;
            chunks.splice(optimizedChunkIndex, 1);
            lastChunk.merge(chunk, chunks, options, inputBase);
            execGroup.splice(--execGroupIndex, 1);
            chunk = lastChunk;
            // keep going to see if we can merge this with the next again
            if (nextChunk && !isMergeCandidate(nextChunk)) {
                seekingFirstMergeCandidate = true;
            }
        };
        do {
            _loop_2();
        } while (((lastChunk = chunk), (chunk = nextChunk), (nextChunk = execGroup[++execGroupIndex]), chunk));
        out_chunkIndex_1 = chunkIndex;
    };
    var out_chunkIndex_1;
    for (var chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
        _loop_1(chunkIndex);
        chunkIndex = out_chunkIndex_1;
    }
    return chunks;
}

// Reserved word lists for various dialects of the language

var reservedWords$1 = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords = {
  5: ecma5AndLessKeywords,
  6: ecma5AndLessKeywords + " const class extends export import super"
};

var keywordRelationalOperator = /^in(stanceof)?$/;

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fef\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7b9\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by bin/generate-identifier-regex.js

// eslint-disable-next-line comma-spacing
var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,477,28,11,0,9,21,190,52,76,44,33,24,27,35,30,0,12,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,26,230,43,117,63,32,0,257,0,11,39,8,0,22,0,12,39,3,3,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,270,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,68,12,0,67,12,65,1,31,6129,15,754,9486,286,82,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541];

// eslint-disable-next-line comma-spacing
var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,525,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,4,9,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,280,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) { return false }
    pos += set[i + 1];
    if (pos >= code) { return true }
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) { return code === 36 }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes)
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) { return code === 36 }
  if (code < 58) { return true }
  if (code < 65) { return false }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if ( conf === void 0 ) conf = {};

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

function binop(name, prec) {
  return new TokenType(name, {beforeExpr: true, binop: prec})
}
var beforeExpr = {beforeExpr: true};
var startsExpr = {startsExpr: true};

// Map keyword names to token types.

var keywords$1 = {};

// Succinct definitions of keyword token types
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name;
  return keywords$1[name] = new TokenType(name, options)
}

var types = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
  prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", {beforeExpr: true}),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", {isLoop: true}),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import"),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
};

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code, ecma2019String) {
  return code === 10 || code === 13 || (!ecma2019String && (code === 0x2028 || code === 0x2029))
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString$1 = ref.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName)
}

var isArray = Array.isArray || (function (obj) { return (
  toString$1.call(obj) === "[object Array]"
); });

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line;
  this.column = col;
};

Position.prototype.offset = function offset (n) {
  return new Position(this.line, this.column + n)
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) { this.source = p.sourceFile; }
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur)
    }
  }
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must
  // be either 3, 5, 6 (2015), 7 (2016), or 8 (2017). This influences support
  // for strict mode, the set of reserved words, and support for
  // new syntax features. The default is 7.
  ecmaVersion: 7,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // th position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false,
  plugins: {}
};

// Interpret and default an options object

function getOptions(opts) {
  var options = {};

  for (var opt in defaultOptions)
    { options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]; }

  if (options.ecmaVersion >= 2015)
    { options.ecmaVersion -= 2009; }

  if (options.allowReserved == null)
    { options.allowReserved = options.ecmaVersion < 5; }

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function (token) { return tokens.push(token); };
  }
  if (isArray(options.onComment))
    { options.onComment = pushComment(options, options.onComment); }

  return options
}

function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end
    };
    if (options.locations)
      { comment.loc = new SourceLocation(this, startLoc, endLoc); }
    if (options.ranges)
      { comment.range = [start, end]; }
    array.push(comment);
  }
}

// Registered plugins
var plugins = {};

function keywordRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
  var reserved = "";
  if (!options.allowReserved) {
    for (var v = options.ecmaVersion;; v--)
      { if (reserved = reservedWords$1[v]) { break } }
    if (options.sourceType === "module") { reserved += " await"; }
  }
  this.reservedWords = keywordRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords$1.strict;
  this.reservedWordsStrict = keywordRegexp(reservedStrict);
  this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords$1.strictBind);
  this.input = String(input);

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false;

  // Load plugins
  this.loadPlugins(options.plugins);

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }

  // Properties of the current token:
  // Its type
  this.type = types.eof;
  // For tokens that include more information than their type, the value
  this.value = null;
  // Its start and end offset
  this.start = this.end = this.pos;
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition();

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext();
  this.exprAllowed = true;

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1;

  // Flags to track whether we are in a function, a generator, an async function.
  this.inFunction = this.inGenerator = this.inAsync = false;
  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = 0;
  // Labels in scope.
  this.labels = [];

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
    { this.skipLineComment(2); }

  // Scope tracking for duplicate variable names (see scope.js)
  this.scopeStack = [];
  this.enterFunctionScope();

  // For RegExp validation
  this.regexpState = null;
};

// DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
Parser.prototype.isKeyword = function isKeyword (word) { return this.keywords.test(word) };
Parser.prototype.isReservedWord = function isReservedWord (word) { return this.reservedWords.test(word) };

Parser.prototype.extend = function extend (name, f) {
  this[name] = f(this[name]);
};

Parser.prototype.loadPlugins = function loadPlugins (pluginConfigs) {
    var this$1 = this;

  for (var name in pluginConfigs) {
    var plugin = plugins[name];
    if (!plugin) { throw new Error("Plugin '" + name + "' not found") }
    plugin(this$1, pluginConfigs[name]);
  }
};

Parser.prototype.parse = function parse () {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node)
};

var pp = Parser.prototype;

// ## Parser utilities

var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;
pp.strictDirective = function(start) {
  var this$1 = this;

  for (;;) {
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this$1.input)[0].length;
    var match = literal.exec(this$1.input.slice(start));
    if (!match) { return false }
    if ((match[1] || match[2]) === "use strict") { return true }
    start += match[0].length;
  }
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true
  } else {
    return false
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function(name) {
  return this.type === types.name && this.value === name && !this.containsEsc
};

// Consumes contextual keyword if possible.

pp.eatContextual = function(name) {
  if (!this.isContextual(name)) { return false }
  this.next();
  return true
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function(name) {
  if (!this.eatContextual(name)) { this.unexpected(); }
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function() {
  return this.type === types.eof ||
    this.type === types.braceR ||
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

pp.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon)
      { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
    return true
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function() {
  if (!this.eat(types.semi) && !this.insertSemicolon()) { this.unexpected(); }
};

pp.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma)
      { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
    if (!notNext)
      { this.next(); }
    return true
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function(type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

function DestructuringErrors() {
  this.shorthandAssign =
  this.trailingComma =
  this.parenthesizedAssign =
  this.parenthesizedBind =
  this.doubleProto =
    -1;
}

pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) { return }
  if (refDestructuringErrors.trailingComma > -1)
    { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) { this.raiseRecoverable(parens, "Parenthesized pattern"); }
};

pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) { return false }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
  if (shorthandAssign >= 0)
    { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
  if (doubleProto >= 0)
    { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
};

pp.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
    { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
  if (this.awaitPos)
    { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
};

pp.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression")
    { return this.isSimpleAssignTarget(expr.expression) }
  return expr.type === "Identifier" || expr.type === "MemberExpression"
};

var pp$1 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function(node) {
  var this$1 = this;

  var exports = {};
  if (!node.body) { node.body = []; }
  while (this.type !== types.eof) {
    var stmt = this$1.parseStatement(true, true, exports);
    node.body.push(stmt);
  }
  this.adaptDirectivePrologue(node.body);
  this.next();
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType;
  }
  return this.finishNode(node, "Program")
};

var loopLabel = {kind: "loop"};
var switchLabel = {kind: "switch"};

pp$1.isLet = function() {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  if (nextCh === 91 || nextCh === 123) { return true } // '{' and '['
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(this.input.charCodeAt(pos), true)) { ++pos; }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) { return true }
  }
  return false
};

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$1.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    { return false }

  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length;
  return !lineBreak.test(this.input.slice(this.pos, next)) &&
    this.input.slice(next, next + 8) === "function" &&
    (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)))
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function(declaration, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;

  if (this.isLet()) {
    starttype = types._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
  case types._break: case types._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
  case types._debugger: return this.parseDebuggerStatement(node)
  case types._do: return this.parseDoStatement(node)
  case types._for: return this.parseForStatement(node)
  case types._function:
    if (!declaration && this.options.ecmaVersion >= 6) { this.unexpected(); }
    return this.parseFunctionStatement(node, false)
  case types._class:
    if (!declaration) { this.unexpected(); }
    return this.parseClass(node, true)
  case types._if: return this.parseIfStatement(node)
  case types._return: return this.parseReturnStatement(node)
  case types._switch: return this.parseSwitchStatement(node)
  case types._throw: return this.parseThrowStatement(node)
  case types._try: return this.parseTryStatement(node)
  case types._const: case types._var:
    kind = kind || this.value;
    if (!declaration && kind !== "var") { this.unexpected(); }
    return this.parseVarStatement(node, kind)
  case types._while: return this.parseWhileStatement(node)
  case types._with: return this.parseWithStatement(node)
  case types.braceL: return this.parseBlock()
  case types.semi: return this.parseEmptyStatement(node)
  case types._export:
  case types._import:
    if (!this.options.allowImportExportEverywhere) {
      if (!topLevel)
        { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
      if (!this.inModule)
        { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
    }
    return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports)

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
  default:
    if (this.isAsyncFunction()) {
      if (!declaration) { this.unexpected(); }
      this.next();
      return this.parseFunctionStatement(node, true)
    }

    var maybeName = this.value, expr = this.parseExpression();
    if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon))
      { return this.parseLabeledStatement(node, maybeName, expr) }
    else { return this.parseExpressionStatement(node, expr) }
  }
};

pp$1.parseBreakContinueStatement = function(node, keyword) {
  var this$1 = this;

  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types.semi) || this.insertSemicolon()) { node.label = null; }
  else if (this.type !== types.name) { this.unexpected(); }
  else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this$1.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
      if (node.label && isBreak) { break }
    }
  }
  if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
};

pp$1.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement")
};

pp$1.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  this.expect(types._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6)
    { this.eat(types.semi); }
  else
    { this.semicolon(); }
  return this.finishNode(node, "DoWhileStatement")
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function(node) {
  this.next();
  var awaitAt = (this.options.ecmaVersion >= 9 && this.inAsync && this.eatContextual("await")) ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterLexicalScope();
  this.expect(types.parenL);
  if (this.type === types.semi) {
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, null)
  }
  var isLet = this.isLet();
  if (this.type === types._var || this.type === types._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1 &&
        !(kind !== "var" && init$1.declarations[0].init)) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init$1)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init$1)
  }
  var refDestructuringErrors = new DestructuringErrors;
  var init = this.parseExpression(true, refDestructuringErrors);
  if (this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (this.options.ecmaVersion >= 9) {
      if (this.type === types._in) {
        if (awaitAt > -1) { this.unexpected(awaitAt); }
      } else { node.await = awaitAt > -1; }
    }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLVal(init);
    return this.parseForIn(node, init)
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) { this.unexpected(awaitAt); }
  return this.parseFor(node, init)
};

pp$1.parseFunctionStatement = function(node, isAsync) {
  this.next();
  return this.parseFunction(node, true, false, isAsync)
};

pp$1.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement(!this.strict && this.type === types._function);
  node.alternate = this.eat(types._else) ? this.parseStatement(!this.strict && this.type === types._function) : null;
  return this.finishNode(node, "IfStatement")
};

pp$1.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
    { this.raise(this.start, "'return' outside of function"); }
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(types.semi) || this.insertSemicolon()) { node.argument = null; }
  else { node.argument = this.parseExpression(); this.semicolon(); }
  return this.finishNode(node, "ReturnStatement")
};

pp$1.parseSwitchStatement = function(node) {
  var this$1 = this;

  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types.braceL);
  this.labels.push(switchLabel);
  this.enterLexicalScope();

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur;
  for (var sawDefault = false; this.type !== types.braceR;) {
    if (this$1.type === types._case || this$1.type === types._default) {
      var isCase = this$1.type === types._case;
      if (cur) { this$1.finishNode(cur, "SwitchCase"); }
      node.cases.push(cur = this$1.startNode());
      cur.consequent = [];
      this$1.next();
      if (isCase) {
        cur.test = this$1.parseExpression();
      } else {
        if (sawDefault) { this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses"); }
        sawDefault = true;
        cur.test = null;
      }
      this$1.expect(types.colon);
    } else {
      if (!cur) { this$1.unexpected(); }
      cur.consequent.push(this$1.parseStatement(true));
    }
  }
  this.exitLexicalScope();
  if (cur) { this.finishNode(cur, "SwitchCase"); }
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement")
};

pp$1.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement")
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp$1.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types.parenL)) {
      clause.param = this.parseBindingAtom();
      this.enterLexicalScope();
      this.checkLVal(clause.param, "let");
      this.expect(types.parenR);
    } else {
      if (this.options.ecmaVersion < 10) { this.unexpected(); }
      clause.param = null;
      this.enterLexicalScope();
    }
    clause.body = this.parseBlock(false);
    this.exitLexicalScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer)
    { this.raise(node.start, "Missing catch or finally clause"); }
  return this.finishNode(node, "TryStatement")
};

pp$1.parseVarStatement = function(node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration")
};

pp$1.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "WhileStatement")
};

pp$1.parseWithStatement = function(node) {
  if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement(false);
  return this.finishNode(node, "WithStatement")
};

pp$1.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement")
};

pp$1.parseLabeledStatement = function(node, maybeName, expr) {
  var this$1 = this;

  for (var i$1 = 0, list = this$1.labels; i$1 < list.length; i$1 += 1)
    {
    var label = list[i$1];

    if (label.name === maybeName)
      { this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
  } }
  var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this$1.labels[i];
    if (label$1.statementStart === node.start) {
      // Update information about previous labels on this node
      label$1.statementStart = this$1.start;
      label$1.kind = kind;
    } else { break }
  }
  this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
  node.body = this.parseStatement(true);
  if (node.body.type === "ClassDeclaration" ||
      node.body.type === "VariableDeclaration" && node.body.kind !== "var" ||
      node.body.type === "FunctionDeclaration" && (this.strict || node.body.generator))
    { this.raiseRecoverable(node.body.start, "Invalid labeled declaration"); }
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement")
};

pp$1.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement")
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function(createNewLexicalScope) {
  var this$1 = this;
  if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;

  var node = this.startNode();
  node.body = [];
  this.expect(types.braceL);
  if (createNewLexicalScope) {
    this.enterLexicalScope();
  }
  while (!this.eat(types.braceR)) {
    var stmt = this$1.parseStatement(true);
    node.body.push(stmt);
  }
  if (createNewLexicalScope) {
    this.exitLexicalScope();
  }
  return this.finishNode(node, "BlockStatement")
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function(node, init) {
  node.init = init;
  this.expect(types.semi);
  node.test = this.type === types.semi ? null : this.parseExpression();
  this.expect(types.semi);
  node.update = this.type === types.parenR ? null : this.parseExpression();
  this.expect(types.parenR);
  this.exitLexicalScope();
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "ForStatement")
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function(node, init) {
  var type = this.type === types._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  if (type === "ForInStatement") {
    if (init.type === "AssignmentPattern" ||
      (init.type === "VariableDeclaration" && init.declarations[0].init != null &&
       (this.strict || init.declarations[0].id.type !== "Identifier")))
      { this.raise(init.start, "Invalid assignment in for-in loop head"); }
  }
  node.left = init;
  node.right = type === "ForInStatement" ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types.parenR);
  this.exitLexicalScope();
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, type)
};

// Parse a list of variable declarations.

pp$1.parseVar = function(node, isFor, kind) {
  var this$1 = this;

  node.declarations = [];
  node.kind = kind;
  for (;;) {
    var decl = this$1.startNode();
    this$1.parseVarId(decl, kind);
    if (this$1.eat(types.eq)) {
      decl.init = this$1.parseMaybeAssign(isFor);
    } else if (kind === "const" && !(this$1.type === types._in || (this$1.options.ecmaVersion >= 6 && this$1.isContextual("of")))) {
      this$1.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this$1.type === types._in || this$1.isContextual("of")))) {
      this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
    if (!this$1.eat(types.comma)) { break }
  }
  return node
};

pp$1.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom(kind);
  this.checkLVal(decl.id, kind, false);
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseFunction = function(node, isStatement, allowExpressionBody, isAsync) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync)
    { node.generator = this.eat(types.star); }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  if (isStatement) {
    node.id = isStatement === "nullableID" && this.type !== types.name ? null : this.parseIdent();
    if (node.id) {
      this.checkLVal(node.id, "var");
    }
  }

  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;
  this.inGenerator = node.generator;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;
  this.enterFunctionScope();

  if (!isStatement)
    { node.id = this.type === types.name ? this.parseIdent() : null; }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression")
};

pp$1.parseFunctionParams = function(node) {
  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function(node, isStatement) {
  var this$1 = this;

  this.next();

  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    var member = this$1.parseClassMember(classBody);
    if (member && member.type === "MethodDefinition" && member.kind === "constructor") {
      if (hadConstructor) { this$1.raise(member.start, "Duplicate constructor in the same class"); }
      hadConstructor = true;
    }
  }
  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
};

pp$1.parseClassMember = function(classBody) {
  var this$1 = this;

  if (this.eat(types.semi)) { return null }

  var method = this.startNode();
  var tryContextual = function (k, noLineBreak) {
    if ( noLineBreak === void 0 ) noLineBreak = false;

    var start = this$1.start, startLoc = this$1.startLoc;
    if (!this$1.eatContextual(k)) { return false }
    if (this$1.type !== types.parenL && (!noLineBreak || !this$1.canInsertSemicolon())) { return true }
    if (method.key) { this$1.unexpected(); }
    method.computed = false;
    method.key = this$1.startNodeAt(start, startLoc);
    method.key.name = k;
    this$1.finishNode(method.key, "Identifier");
    return false
  };

  method.kind = "method";
  method.static = tryContextual("static");
  var isGenerator = this.eat(types.star);
  var isAsync = false;
  if (!isGenerator) {
    if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    } else if (tryContextual("get")) {
      method.kind = "get";
    } else if (tryContextual("set")) {
      method.kind = "set";
    }
  }
  if (!method.key) { this.parsePropertyName(method); }
  var key = method.key;
  if (!method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" ||
      key.type === "Literal" && key.value === "constructor")) {
    if (method.kind !== "method") { this.raise(key.start, "Constructor can't have get/set modifier"); }
    if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
    if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
    method.kind = "constructor";
  } else if (method.static && key.type === "Identifier" && key.name === "prototype") {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  this.parseClassMethod(classBody, method, isGenerator, isAsync);
  if (method.kind === "get" && method.value.params.length !== 0)
    { this.raiseRecoverable(method.value.start, "getter should have no params"); }
  if (method.kind === "set" && method.value.params.length !== 1)
    { this.raiseRecoverable(method.value.start, "setter should have exactly one param"); }
  if (method.kind === "set" && method.value.params[0].type === "RestElement")
    { this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params"); }
  return method
};

pp$1.parseClassMethod = function(classBody, method, isGenerator, isAsync) {
  method.value = this.parseMethod(isGenerator, isAsync);
  classBody.body.push(this.finishNode(method, "MethodDefinition"));
};

pp$1.parseClassId = function(node, isStatement) {
  node.id = this.type === types.name ? this.parseIdent() : isStatement === true ? this.unexpected() : null;
};

pp$1.parseClassSuper = function(node) {
  node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp$1.parseExport = function(node, exports) {
  var this$1 = this;

  this.next();
  // export * from '...'
  if (this.eat(types.star)) {
    this.expectContextual("from");
    if (this.type !== types.string) { this.unexpected(); }
    node.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration")
  }
  if (this.eat(types._default)) { // export default ...
    this.checkExport(exports, "default", this.lastTokStart);
    var isAsync;
    if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      node.declaration = this.parseFunction(fNode, "nullableID", false, isAsync);
    } else if (this.type === types._class) {
      var cNode = this.startNode();
      node.declaration = this.parseClass(cNode, "nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(true);
    if (node.declaration.type === "VariableDeclaration")
      { this.checkVariableExport(exports, node.declaration.declarations); }
    else
      { this.checkExport(exports, node.declaration.id.name, node.declaration.id.start); }
    node.specifiers = [];
    node.source = null;
  } else { // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types.string) { this.unexpected(); }
      node.source = this.parseExprAtom();
    } else {
      // check for keywords used as local names
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        var spec = list[i];

        this$1.checkUnreserved(spec.local);
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration")
};

pp$1.checkExport = function(exports, name, pos) {
  if (!exports) { return }
  if (has(exports, name))
    { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
  exports[name] = true;
};

pp$1.checkPatternExport = function(exports, pat) {
  var this$1 = this;

  var type = pat.type;
  if (type === "Identifier")
    { this.checkExport(exports, pat.name, pat.start); }
  else if (type === "ObjectPattern")
    { for (var i = 0, list = pat.properties; i < list.length; i += 1)
      {
        var prop = list[i];

        this$1.checkPatternExport(exports, prop);
      } }
  else if (type === "ArrayPattern")
    { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];

        if (elt) { this$1.checkPatternExport(exports, elt); }
    } }
  else if (type === "Property")
    { this.checkPatternExport(exports, pat.value); }
  else if (type === "AssignmentPattern")
    { this.checkPatternExport(exports, pat.left); }
  else if (type === "RestElement")
    { this.checkPatternExport(exports, pat.argument); }
  else if (type === "ParenthesizedExpression")
    { this.checkPatternExport(exports, pat.expression); }
};

pp$1.checkVariableExport = function(exports, decls) {
  var this$1 = this;

  if (!exports) { return }
  for (var i = 0, list = decls; i < list.length; i += 1)
    {
    var decl = list[i];

    this$1.checkPatternExport(exports, decl.id);
  }
};

pp$1.shouldParseExportStatement = function() {
  return this.type.keyword === "var" ||
    this.type.keyword === "const" ||
    this.type.keyword === "class" ||
    this.type.keyword === "function" ||
    this.isLet() ||
    this.isAsyncFunction()
};

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function(exports) {
  var this$1 = this;

  var nodes = [], first = true;
  // export { x, y as z } [from '...']
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node = this$1.startNode();
    node.local = this$1.parseIdent(true);
    node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
    this$1.checkExport(exports, node.exported.name, node.exported.start);
    nodes.push(this$1.finishNode(node, "ExportSpecifier"));
  }
  return nodes
};

// Parses import declaration.

pp$1.parseImport = function(node) {
  this.next();
  // import '...'
  if (this.type === types.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration")
};

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function() {
  var this$1 = this;

  var nodes = [], first = true;
  if (this.type === types.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, "let");
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(types.comma)) { return nodes }
  }
  if (this.type === types.star) {
    var node$1 = this.startNode();
    this.next();
    this.expectContextual("as");
    node$1.local = this.parseIdent();
    this.checkLVal(node$1.local, "let");
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
    return nodes
  }
  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var node$2 = this$1.startNode();
    node$2.imported = this$1.parseIdent(true);
    if (this$1.eatContextual("as")) {
      node$2.local = this$1.parseIdent();
    } else {
      this$1.checkUnreserved(node$2.imported);
      node$2.local = node$2.imported;
    }
    this$1.checkLVal(node$2.local, "let");
    nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
  }
  return nodes
};

// Set `ExpressionStatement#directive` property for directive prologues.
pp$1.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$1.isDirectiveCandidate = function(statement) {
  return (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "Literal" &&
    typeof statement.expression.value === "string" &&
    // Reject parenthesized strings.
    (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
  )
};

var pp$2 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
  var this$1 = this;

  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
    case "Identifier":
      if (this.inAsync && node.name === "await")
        { this.raise(node.start, "Can not use 'await' as identifier inside an async function"); }
      break

    case "ObjectPattern":
    case "ArrayPattern":
    case "RestElement":
      break

    case "ObjectExpression":
      node.type = "ObjectPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];

      this$1.toAssignable(prop, isBinding);
        // Early error:
        //   AssignmentRestProperty[Yield, Await] :
        //     `...` DestructuringAssignmentTarget[Yield, Await]
        //
        //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
        if (
          prop.type === "RestElement" &&
          (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
        ) {
          this$1.raise(prop.argument.start, "Unexpected token");
        }
      }
      break

    case "Property":
      // AssignmentProperty has type === "Property"
      if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
      this.toAssignable(node.value, isBinding);
      break

    case "ArrayExpression":
      node.type = "ArrayPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      this.toAssignableList(node.elements, isBinding);
      break

    case "SpreadElement":
      node.type = "RestElement";
      this.toAssignable(node.argument, isBinding);
      if (node.argument.type === "AssignmentPattern")
        { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
      break

    case "AssignmentExpression":
      if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
      node.type = "AssignmentPattern";
      delete node.operator;
      this.toAssignable(node.left, isBinding);
      // falls through to AssignmentPattern

    case "AssignmentPattern":
      break

    case "ParenthesizedExpression":
      this.toAssignable(node.expression, isBinding);
      break

    case "MemberExpression":
      if (!isBinding) { break }

    default:
      this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
  return node
};

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function(exprList, isBinding) {
  var this$1 = this;

  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) { this$1.toAssignable(elt, isBinding); }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
      { this.unexpected(last.argument.start); }
  }
  return exprList
};

// Parses spread element.

pp$2.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement")
};

pp$2.parseRestBinding = function() {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (this.options.ecmaVersion === 6 && this.type !== types.name)
    { this.unexpected(); }

  node.argument = this.parseBindingAtom();

  return this.finishNode(node, "RestElement")
};

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
    case types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(types.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern")

    case types.braceL:
      return this.parseObj(true)
    }
  }
  return this.parseIdent()
};

pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
  var this$1 = this;

  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) { first = false; }
    else { this$1.expect(types.comma); }
    if (allowEmpty && this$1.type === types.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
      break
    } else if (this$1.type === types.ellipsis) {
      var rest = this$1.parseRestBinding();
      this$1.parseBindingListItem(rest);
      elts.push(rest);
      if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
      this$1.expect(close);
      break
    } else {
      var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
      this$1.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts
};

pp$2.parseBindingListItem = function(param) {
  return param
};

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) { return left }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern")
};

// Verify that a node is an lval — something that can be assigned
// to.
// bindingType can be either:
// 'var' indicating that the lval creates a 'var' binding
// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

pp$2.checkLVal = function(expr, bindingType, checkClashes) {
  var this$1 = this;

  switch (expr.type) {
  case "Identifier":
    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
      { this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
    if (checkClashes) {
      if (has(checkClashes, expr.name))
        { this.raiseRecoverable(expr.start, "Argument name clash"); }
      checkClashes[expr.name] = true;
    }
    if (bindingType && bindingType !== "none") {
      if (
        bindingType === "var" && !this.canDeclareVarName(expr.name) ||
        bindingType !== "var" && !this.canDeclareLexicalName(expr.name)
      ) {
        this.raiseRecoverable(expr.start, ("Identifier '" + (expr.name) + "' has already been declared"));
      }
      if (bindingType === "var") {
        this.declareVarName(expr.name);
      } else {
        this.declareLexicalName(expr.name);
      }
    }
    break

  case "MemberExpression":
    if (bindingType) { this.raiseRecoverable(expr.start, "Binding member expression"); }
    break

  case "ObjectPattern":
    for (var i = 0, list = expr.properties; i < list.length; i += 1)
      {
    var prop = list[i];

    this$1.checkLVal(prop, bindingType, checkClashes);
  }
    break

  case "Property":
    // AssignmentProperty has type === "Property"
    this.checkLVal(expr.value, bindingType, checkClashes);
    break

  case "ArrayPattern":
    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
      var elem = list$1[i$1];

    if (elem) { this$1.checkLVal(elem, bindingType, checkClashes); }
    }
    break

  case "AssignmentPattern":
    this.checkLVal(expr.left, bindingType, checkClashes);
    break

  case "RestElement":
    this.checkLVal(expr.argument, bindingType, checkClashes);
    break

  case "ParenthesizedExpression":
    this.checkLVal(expr.expression, bindingType, checkClashes);
    break

  default:
    this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
  }
};

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

var pp$3 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
    { return }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
    { return }
  var key = prop.key;
  var name;
  switch (key.type) {
  case "Identifier": name = key.name; break
  case "Literal": name = String(key.value); break
  default: return
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors && refDestructuringErrors.doubleProto < 0) { refDestructuringErrors.doubleProto = key.start; }
        // Backwards-compat kludge. Can be removed in version 6.0
        else { this.raiseRecoverable(key.start, "Redefinition of __proto__ property"); }
      }
      propHash.proto = true;
    }
    return
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition)
      { this.raiseRecoverable(key.start, "Redefinition of property"); }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function(noIn, refDestructuringErrors) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
  if (this.type === types.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types.comma)) { node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors)); }
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
  if (this.inGenerator && this.isContextual("yield")) { return this.parseYield() }

  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors;
    ownDestructuringErrors = true;
  }

  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types.parenL || this.type === types.name)
    { this.potentialArrowAt = this.start; }
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
  if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;
    if (!ownDestructuringErrors) { DestructuringErrors.call(refDestructuringErrors); }
    refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
    this.checkLVal(left);
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression")
  } else {
    if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
  }
  if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
  if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
  return left
};

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(noIn, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  if (this.eat(types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
};

// Start the precedence parser.

pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn)
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop;
  if (prec != null && (!noIn || this.type !== types._in)) {
    if (prec > minPrec) {
      var logical = this.type === types.logicalOR || this.type === types.logicalAND;
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn)
    }
  }
  return left
};

pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
};

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))) {
    expr = this.parseAwait();
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) { this.checkLVal(node.argument); }
    else if (this.strict && node.operator === "delete" &&
             node.argument.type === "Identifier")
      { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
    else { sawUnary = true; }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.operator = this$1.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this$1.checkLVal(expr);
      this$1.next();
      expr = this$1.finishNode(node$1, "UpdateExpression");
    }
  }

  if (!sawUnary && this.eat(types.starstar))
    { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false) }
  else
    { return expr }
};

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function(refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors);
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) { return expr }
  var result = this.parseSubscripts(expr, startPos, startLoc);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
    if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
  }
  return result
};

pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
  var this$1 = this;

  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
      this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";
  for (var computed = (void 0);;) {
    if ((computed = this$1.eat(types.bracketL)) || this$1.eat(types.dot)) {
      var node = this$1.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true);
      node.computed = !!computed;
      if (computed) { this$1.expect(types.bracketR); }
      base = this$1.finishNode(node, "MemberExpression");
    } else if (!noCalls && this$1.eat(types.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this$1.yieldPos, oldAwaitPos = this$1.awaitPos;
      this$1.yieldPos = 0;
      this$1.awaitPos = 0;
      var exprList = this$1.parseExprList(types.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(types.arrow)) {
        this$1.checkPatternErrors(refDestructuringErrors, false);
        this$1.checkYieldAwaitInDefaultParams();
        this$1.yieldPos = oldYieldPos;
        this$1.awaitPos = oldAwaitPos;
        return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true)
      }
      this$1.checkExpressionErrors(refDestructuringErrors, true);
      this$1.yieldPos = oldYieldPos || this$1.yieldPos;
      this$1.awaitPos = oldAwaitPos || this$1.awaitPos;
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      base = this$1.finishNode(node$1, "CallExpression");
    } else if (this$1.type === types.backQuote) {
      var node$2 = this$1.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this$1.parseTemplate({isTagged: true});
      base = this$1.finishNode(node$2, "TaggedTemplateExpression");
    } else {
      return base
    }
  }
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function(refDestructuringErrors) {
  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
  case types._super:
    if (!this.inFunction)
      { this.raise(this.start, "'super' outside of function or class"); }
    node = this.startNode();
    this.next();
    // The `super` keyword can appear at below:
    // SuperProperty:
    //     super [ Expression ]
    //     super . IdentifierName
    // SuperCall:
    //     super Arguments
    if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL)
      { this.unexpected(); }
    return this.finishNode(node, "Super")

  case types._this:
    node = this.startNode();
    this.next();
    return this.finishNode(node, "ThisExpression")

  case types.name:
    var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
    var id = this.parseIdent(this.type !== types.name);
    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function))
      { return this.parseFunction(this.startNodeAt(startPos, startLoc), false, false, true) }
    if (canBeArrow && !this.canInsertSemicolon()) {
      if (this.eat(types.arrow))
        { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false) }
      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
        id = this.parseIdent();
        if (this.canInsertSemicolon() || !this.eat(types.arrow))
          { this.unexpected(); }
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
      }
    }
    return id

  case types.regexp:
    var value = this.value;
    node = this.parseLiteral(value.value);
    node.regex = {pattern: value.pattern, flags: value.flags};
    return node

  case types.num: case types.string:
    return this.parseLiteral(this.value)

  case types._null: case types._true: case types._false:
    node = this.startNode();
    node.value = this.type === types._null ? null : this.type === types._true;
    node.raw = this.type.keyword;
    this.next();
    return this.finishNode(node, "Literal")

  case types.parenL:
    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
    if (refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
        { refDestructuringErrors.parenthesizedAssign = start; }
      if (refDestructuringErrors.parenthesizedBind < 0)
        { refDestructuringErrors.parenthesizedBind = start; }
    }
    return expr

  case types.bracketL:
    node = this.startNode();
    this.next();
    node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
    return this.finishNode(node, "ArrayExpression")

  case types.braceL:
    return this.parseObj(false, refDestructuringErrors)

  case types._function:
    node = this.startNode();
    this.next();
    return this.parseFunction(node, false)

  case types._class:
    return this.parseClass(this.startNode(), false)

  case types._new:
    return this.parseNew()

  case types.backQuote:
    return this.parseTemplate()

  default:
    this.unexpected();
  }
};

pp$3.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  this.next();
  return this.finishNode(node, "Literal")
};

pp$3.parseParenExpression = function() {
  this.expect(types.parenL);
  var val = this.parseExpression();
  this.expect(types.parenR);
  return val
};

pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
  var this$1 = this;

  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== types.parenR) {
      first ? first = false : this$1.expect(types.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(types.parenR, true)) {
        lastIsComma = true;
        break
      } else if (this$1.type === types.ellipsis) {
        spreadStart = this$1.start;
        exprList.push(this$1.parseParenItem(this$1.parseRestBinding()));
        if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
        break
      } else {
        exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
      }
    }
    var innerEndPos = this.start, innerEndLoc = this.startLoc;
    this.expect(types.parenR);

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList)
    }

    if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
    if (spreadStart) { this.unexpected(spreadStart); }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression")
  } else {
    return val
  }
};

pp$3.parseParenItem = function(item) {
  return item
};

pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList)
};

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty$1 = [];

pp$3.parseNew = function() {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
    node.meta = meta;
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target" || containsEsc)
      { this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target"); }
    if (!this.inFunction)
      { this.raiseRecoverable(node.start, "new.target can only be used in functions"); }
    return this.finishNode(node, "MetaProperty")
  }
  var startPos = this.start, startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  if (this.eat(types.parenL)) { node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false); }
  else { node.arguments = empty$1; }
  return this.finishNode(node, "NewExpression")
};

// Parse template expression.

pp$3.parseTemplateElement = function(ref) {
  var isTagged = ref.isTagged;

  var elem = this.startNode();
  if (this.type === types.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types.backQuote;
  return this.finishNode(elem, "TemplateElement")
};

pp$3.parseTemplate = function(ref) {
  var this$1 = this;
  if ( ref === void 0 ) ref = {};
  var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({isTagged: isTagged});
  node.quasis = [curElt];
  while (!curElt.tail) {
    this$1.expect(types.dollarBraceL);
    node.expressions.push(this$1.parseExpression());
    this$1.expect(types.braceR);
    node.quasis.push(curElt = this$1.parseTemplateElement({isTagged: isTagged}));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral")
};

pp$3.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
    (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types.star)) &&
    !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

// Parse an object literal or binding pattern.

pp$3.parseObj = function(isPattern, refDestructuringErrors) {
  var this$1 = this;

  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types.braceR)) {
    if (!first) {
      this$1.expect(types.comma);
      if (this$1.afterTrailingComma(types.braceR)) { break }
    } else { first = false; }

    var prop = this$1.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) { this$1.checkPropClash(prop, propHash, refDestructuringErrors); }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
};

pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types.comma) {
        this.raise(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement")
    }
    // To disallow parenthesized identifier via `this.toAssignable()`.
    if (this.type === types.parenL && refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0) {
        refDestructuringErrors.parenthesizedAssign = this.start;
      }
      if (refDestructuringErrors.parenthesizedBind < 0) {
        refDestructuringErrors.parenthesizedBind = this.start;
      }
    }
    // Parse argument.
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    // To disallow trailing comma via `this.toAssignable()`.
    if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    // Finish
    return this.finishNode(prop, "SpreadElement")
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern)
      { isGenerator = this.eat(types.star); }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
    this.parsePropertyName(prop, refDestructuringErrors);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property")
};

pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types.colon)
    { this.unexpected(); }

  if (this.eat(types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
    if (isPattern) { this.unexpected(); }
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!isPattern && !containsEsc &&
             this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
             (prop.key.name === "get" || prop.key.name === "set") &&
             (this.type !== types.comma && this.type !== types.braceR)) {
    if (isGenerator || isAsync) { this.unexpected(); }
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get")
        { this.raiseRecoverable(start, "getter should have no params"); }
      else
        { this.raiseRecoverable(start, "setter should have exactly one param"); }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    this.checkUnreserved(prop.key);
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else if (this.type === types.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0)
        { refDestructuringErrors.shorthandAssign = this.start; }
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else {
      prop.value = prop.key;
    }
    prop.shorthand = true;
  } else { this.unexpected(); }
};

pp$3.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types.bracketR);
      return prop.key
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(true)
};

// Initialize empty function node.

pp$3.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
  if (this.options.ecmaVersion >= 8)
    { node.async = false; }
};

// Parse object or class method.

pp$3.parseMethod = function(isGenerator, isAsync) {
  var node = this.startNode(), oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;

  this.initFunction(node);
  if (this.options.ecmaVersion >= 6)
    { node.generator = isGenerator; }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  this.inGenerator = node.generator;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;
  this.enterFunctionScope();

  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, "FunctionExpression")
};

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function(node, params, isAsync) {
  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;

  this.enterFunctionScope();
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  this.inGenerator = false;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;

  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, "ArrowFunctionExpression")
};

// Parse function body and check parameters.

pp$3.parseFunctionBody = function(node, isArrowFunction) {
  var isExpression = isArrowFunction && this.type !== types.braceL;
  var oldStrict = this.strict, useStrict = false;

  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple)
        { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) { this.strict = true; }

    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && this.isSimpleParamList(node.params));
    node.body = this.parseBlock(false);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitFunctionScope();

  if (this.strict && node.id) {
    // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
    this.checkLVal(node.id, "none");
  }
  this.strict = oldStrict;
};

pp$3.isSimpleParamList = function(params) {
  for (var i = 0, list = params; i < list.length; i += 1)
    {
    var param = list[i];

    if (param.type !== "Identifier") { return false
  } }
  return true
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$3.checkParams = function(node, allowDuplicates) {
  var this$1 = this;

  var nameHash = {};
  for (var i = 0, list = node.params; i < list.length; i += 1)
    {
    var param = list[i];

    this$1.checkLVal(param, "var", allowDuplicates ? null : nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var this$1 = this;

  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this$1.expect(types.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(close)) { break }
    } else { first = false; }

    var elt = (void 0);
    if (allowEmpty && this$1.type === types.comma)
      { elt = null; }
    else if (this$1.type === types.ellipsis) {
      elt = this$1.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this$1.type === types.comma && refDestructuringErrors.trailingComma < 0)
        { refDestructuringErrors.trailingComma = this$1.start; }
    } else {
      elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts
};

pp$3.checkUnreserved = function(ref) {
  var start = ref.start;
  var end = ref.end;
  var name = ref.name;

  if (this.inGenerator && name === "yield")
    { this.raiseRecoverable(start, "Can not use 'yield' as identifier inside a generator"); }
  if (this.inAsync && name === "await")
    { this.raiseRecoverable(start, "Can not use 'await' as identifier inside an async function"); }
  if (this.isKeyword(name))
    { this.raise(start, ("Unexpected keyword '" + name + "'")); }
  if (this.options.ecmaVersion < 6 &&
    this.input.slice(start, end).indexOf("\\") !== -1) { return }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Can not use keyword 'await' outside an async function"); }
    this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
  }
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdent = function(liberal, isBinding) {
  var node = this.startNode();
  if (liberal && this.options.allowReserved === "never") { liberal = false; }
  if (this.type === types.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;

    // To fix https://github.com/acornjs/acorn/issues/575
    // `class` and `function` keywords push new context into this.context.
    // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
    // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
    if ((node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "Identifier");
  if (!liberal) { this.checkUnreserved(node); }
  return node
};

// Parses yield expression inside generator.

pp$3.parseYield = function() {
  if (!this.yieldPos) { this.yieldPos = this.start; }

  var node = this.startNode();
  this.next();
  if (this.type === types.semi || this.canInsertSemicolon() || (this.type !== types.star && !this.type.startsExpr)) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression")
};

pp$3.parseAwait = function() {
  if (!this.awaitPos) { this.awaitPos = this.start; }

  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true);
  return this.finishNode(node, "AwaitExpression")
};

var pp$4 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
  throw err
};

pp$4.raiseRecoverable = pp$4.raise;

pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart)
  }
};

var pp$5 = Parser.prototype;

// Object.assign polyfill
var assign = Object.assign || function(target) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  for (var i = 0, list = sources; i < list.length; i += 1) {
    var source = list[i];

    for (var key in source) {
      if (has(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target
};

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp$5.enterFunctionScope = function() {
  // var: a hash of var-declared names in the current lexical scope
  // lexical: a hash of lexically-declared names in the current lexical scope
  // childVar: a hash of var-declared names in all child lexical scopes of the current lexical scope (within the current function scope)
  // parentLexical: a hash of lexically-declared names in all parent lexical scopes of the current lexical scope (within the current function scope)
  this.scopeStack.push({var: {}, lexical: {}, childVar: {}, parentLexical: {}});
};

pp$5.exitFunctionScope = function() {
  this.scopeStack.pop();
};

pp$5.enterLexicalScope = function() {
  var parentScope = this.scopeStack[this.scopeStack.length - 1];
  var childScope = {var: {}, lexical: {}, childVar: {}, parentLexical: {}};

  this.scopeStack.push(childScope);
  assign(childScope.parentLexical, parentScope.lexical, parentScope.parentLexical);
};

pp$5.exitLexicalScope = function() {
  var childScope = this.scopeStack.pop();
  var parentScope = this.scopeStack[this.scopeStack.length - 1];

  assign(parentScope.childVar, childScope.var, childScope.childVar);
};

/**
 * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
 * in the current lexical scope or any of the parent lexical scopes in this function.
 */
pp$5.canDeclareVarName = function(name) {
  var currentScope = this.scopeStack[this.scopeStack.length - 1];

  return !has(currentScope.lexical, name) && !has(currentScope.parentLexical, name)
};

/**
 * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
 * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
 * any child lexical scopes in this function.
 */
pp$5.canDeclareLexicalName = function(name) {
  var currentScope = this.scopeStack[this.scopeStack.length - 1];

  return !has(currentScope.lexical, name) && !has(currentScope.var, name) && !has(currentScope.childVar, name)
};

pp$5.declareVarName = function(name) {
  this.scopeStack[this.scopeStack.length - 1].var[name] = true;
};

pp$5.declareLexicalName = function(name) {
  this.scopeStack[this.scopeStack.length - 1].lexical[name] = true;
};

var Node = function Node(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations)
    { this.loc = new SourceLocation(parser, loc); }
  if (parser.options.directSourceFile)
    { this.sourceFile = parser.options.directSourceFile; }
  if (parser.options.ranges)
    { this.range = [pos, 0]; }
};

// Start an AST node, attaching a start offset.

var pp$6 = Parser.prototype;

pp$6.startNode = function() {
  return new Node(this, this.start, this.startLoc)
};

pp$6.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc)
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations)
    { node.loc.end = loc; }
  if (this.options.ranges)
    { node.range[1] = pos; }
  return node
}

pp$6.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
};

// Finish node at given position

pp$6.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
};

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};

var types$1 = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};

var pp$7 = Parser.prototype;

pp$7.initialContext = function() {
  return [types$1.b_stat]
};

pp$7.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types$1.f_expr || parent === types$1.f_stat)
    { return true }
  if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr))
    { return !parent.isExpr }

  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === types._return || prevType === types.name && this.exprAllowed)
    { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
  if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow)
    { return true }
  if (prevType === types.braceL)
    { return parent === types$1.b_stat }
  if (prevType === types._var || prevType === types.name)
    { return false }
  return !this.exprAllowed
};

pp$7.inGeneratorContext = function() {
  var this$1 = this;

  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this$1.context[i];
    if (context.token === "function")
      { return context.generator }
  }
  return false
};

pp$7.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types.dot)
    { this.exprAllowed = false; }
  else if (update = type.updateContext)
    { update.call(this, prevType); }
  else
    { this.exprAllowed = type.beforeExpr; }
};

// Token-specific context update code

types.parenR.updateContext = types.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return
  }
  var out = this.context.pop();
  if (out === types$1.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};

types.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
  this.exprAllowed = true;
};

types.dollarBraceL.updateContext = function() {
  this.context.push(types$1.b_tmpl);
  this.exprAllowed = true;
};

types.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
  this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
  this.exprAllowed = true;
};

types.incDec.updateContext = function() {
  // tokExprAllowed stays unchanged
};

types._function.updateContext = types._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else &&
      !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat))
    { this.context.push(types$1.f_expr); }
  else
    { this.context.push(types$1.f_stat); }
  this.exprAllowed = false;
};

types.backQuote.updateContext = function() {
  if (this.curContext() === types$1.q_tmpl)
    { this.context.pop(); }
  else
    { this.context.push(types$1.q_tmpl); }
  this.exprAllowed = false;
};

types.star.updateContext = function(prevType) {
  if (prevType === types._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types$1.f_expr)
      { this.context[index] = types$1.f_expr_gen; }
    else
      { this.context[index] = types$1.f_gen; }
  }
  this.exprAllowed = true;
};

types.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6) {
    if (this.value === "of" && !this.exprAllowed ||
        this.value === "yield" && this.inGeneratorContext())
      { allowed = true; }
  }
  this.exprAllowed = allowed;
};

var data = {
  "$LONE": [
    "ASCII",
    "ASCII_Hex_Digit",
    "AHex",
    "Alphabetic",
    "Alpha",
    "Any",
    "Assigned",
    "Bidi_Control",
    "Bidi_C",
    "Bidi_Mirrored",
    "Bidi_M",
    "Case_Ignorable",
    "CI",
    "Cased",
    "Changes_When_Casefolded",
    "CWCF",
    "Changes_When_Casemapped",
    "CWCM",
    "Changes_When_Lowercased",
    "CWL",
    "Changes_When_NFKC_Casefolded",
    "CWKCF",
    "Changes_When_Titlecased",
    "CWT",
    "Changes_When_Uppercased",
    "CWU",
    "Dash",
    "Default_Ignorable_Code_Point",
    "DI",
    "Deprecated",
    "Dep",
    "Diacritic",
    "Dia",
    "Emoji",
    "Emoji_Component",
    "Emoji_Modifier",
    "Emoji_Modifier_Base",
    "Emoji_Presentation",
    "Extender",
    "Ext",
    "Grapheme_Base",
    "Gr_Base",
    "Grapheme_Extend",
    "Gr_Ext",
    "Hex_Digit",
    "Hex",
    "IDS_Binary_Operator",
    "IDSB",
    "IDS_Trinary_Operator",
    "IDST",
    "ID_Continue",
    "IDC",
    "ID_Start",
    "IDS",
    "Ideographic",
    "Ideo",
    "Join_Control",
    "Join_C",
    "Logical_Order_Exception",
    "LOE",
    "Lowercase",
    "Lower",
    "Math",
    "Noncharacter_Code_Point",
    "NChar",
    "Pattern_Syntax",
    "Pat_Syn",
    "Pattern_White_Space",
    "Pat_WS",
    "Quotation_Mark",
    "QMark",
    "Radical",
    "Regional_Indicator",
    "RI",
    "Sentence_Terminal",
    "STerm",
    "Soft_Dotted",
    "SD",
    "Terminal_Punctuation",
    "Term",
    "Unified_Ideograph",
    "UIdeo",
    "Uppercase",
    "Upper",
    "Variation_Selector",
    "VS",
    "White_Space",
    "space",
    "XID_Continue",
    "XIDC",
    "XID_Start",
    "XIDS"
  ],
  "General_Category": [
    "Cased_Letter",
    "LC",
    "Close_Punctuation",
    "Pe",
    "Connector_Punctuation",
    "Pc",
    "Control",
    "Cc",
    "cntrl",
    "Currency_Symbol",
    "Sc",
    "Dash_Punctuation",
    "Pd",
    "Decimal_Number",
    "Nd",
    "digit",
    "Enclosing_Mark",
    "Me",
    "Final_Punctuation",
    "Pf",
    "Format",
    "Cf",
    "Initial_Punctuation",
    "Pi",
    "Letter",
    "L",
    "Letter_Number",
    "Nl",
    "Line_Separator",
    "Zl",
    "Lowercase_Letter",
    "Ll",
    "Mark",
    "M",
    "Combining_Mark",
    "Math_Symbol",
    "Sm",
    "Modifier_Letter",
    "Lm",
    "Modifier_Symbol",
    "Sk",
    "Nonspacing_Mark",
    "Mn",
    "Number",
    "N",
    "Open_Punctuation",
    "Ps",
    "Other",
    "C",
    "Other_Letter",
    "Lo",
    "Other_Number",
    "No",
    "Other_Punctuation",
    "Po",
    "Other_Symbol",
    "So",
    "Paragraph_Separator",
    "Zp",
    "Private_Use",
    "Co",
    "Punctuation",
    "P",
    "punct",
    "Separator",
    "Z",
    "Space_Separator",
    "Zs",
    "Spacing_Mark",
    "Mc",
    "Surrogate",
    "Cs",
    "Symbol",
    "S",
    "Titlecase_Letter",
    "Lt",
    "Unassigned",
    "Cn",
    "Uppercase_Letter",
    "Lu"
  ],
  "Script": [
    "Adlam",
    "Adlm",
    "Ahom",
    "Anatolian_Hieroglyphs",
    "Hluw",
    "Arabic",
    "Arab",
    "Armenian",
    "Armn",
    "Avestan",
    "Avst",
    "Balinese",
    "Bali",
    "Bamum",
    "Bamu",
    "Bassa_Vah",
    "Bass",
    "Batak",
    "Batk",
    "Bengali",
    "Beng",
    "Bhaiksuki",
    "Bhks",
    "Bopomofo",
    "Bopo",
    "Brahmi",
    "Brah",
    "Braille",
    "Brai",
    "Buginese",
    "Bugi",
    "Buhid",
    "Buhd",
    "Canadian_Aboriginal",
    "Cans",
    "Carian",
    "Cari",
    "Caucasian_Albanian",
    "Aghb",
    "Chakma",
    "Cakm",
    "Cham",
    "Cherokee",
    "Cher",
    "Common",
    "Zyyy",
    "Coptic",
    "Copt",
    "Qaac",
    "Cuneiform",
    "Xsux",
    "Cypriot",
    "Cprt",
    "Cyrillic",
    "Cyrl",
    "Deseret",
    "Dsrt",
    "Devanagari",
    "Deva",
    "Duployan",
    "Dupl",
    "Egyptian_Hieroglyphs",
    "Egyp",
    "Elbasan",
    "Elba",
    "Ethiopic",
    "Ethi",
    "Georgian",
    "Geor",
    "Glagolitic",
    "Glag",
    "Gothic",
    "Goth",
    "Grantha",
    "Gran",
    "Greek",
    "Grek",
    "Gujarati",
    "Gujr",
    "Gurmukhi",
    "Guru",
    "Han",
    "Hani",
    "Hangul",
    "Hang",
    "Hanunoo",
    "Hano",
    "Hatran",
    "Hatr",
    "Hebrew",
    "Hebr",
    "Hiragana",
    "Hira",
    "Imperial_Aramaic",
    "Armi",
    "Inherited",
    "Zinh",
    "Qaai",
    "Inscriptional_Pahlavi",
    "Phli",
    "Inscriptional_Parthian",
    "Prti",
    "Javanese",
    "Java",
    "Kaithi",
    "Kthi",
    "Kannada",
    "Knda",
    "Katakana",
    "Kana",
    "Kayah_Li",
    "Kali",
    "Kharoshthi",
    "Khar",
    "Khmer",
    "Khmr",
    "Khojki",
    "Khoj",
    "Khudawadi",
    "Sind",
    "Lao",
    "Laoo",
    "Latin",
    "Latn",
    "Lepcha",
    "Lepc",
    "Limbu",
    "Limb",
    "Linear_A",
    "Lina",
    "Linear_B",
    "Linb",
    "Lisu",
    "Lycian",
    "Lyci",
    "Lydian",
    "Lydi",
    "Mahajani",
    "Mahj",
    "Malayalam",
    "Mlym",
    "Mandaic",
    "Mand",
    "Manichaean",
    "Mani",
    "Marchen",
    "Marc",
    "Masaram_Gondi",
    "Gonm",
    "Meetei_Mayek",
    "Mtei",
    "Mende_Kikakui",
    "Mend",
    "Meroitic_Cursive",
    "Merc",
    "Meroitic_Hieroglyphs",
    "Mero",
    "Miao",
    "Plrd",
    "Modi",
    "Mongolian",
    "Mong",
    "Mro",
    "Mroo",
    "Multani",
    "Mult",
    "Myanmar",
    "Mymr",
    "Nabataean",
    "Nbat",
    "New_Tai_Lue",
    "Talu",
    "Newa",
    "Nko",
    "Nkoo",
    "Nushu",
    "Nshu",
    "Ogham",
    "Ogam",
    "Ol_Chiki",
    "Olck",
    "Old_Hungarian",
    "Hung",
    "Old_Italic",
    "Ital",
    "Old_North_Arabian",
    "Narb",
    "Old_Permic",
    "Perm",
    "Old_Persian",
    "Xpeo",
    "Old_South_Arabian",
    "Sarb",
    "Old_Turkic",
    "Orkh",
    "Oriya",
    "Orya",
    "Osage",
    "Osge",
    "Osmanya",
    "Osma",
    "Pahawh_Hmong",
    "Hmng",
    "Palmyrene",
    "Palm",
    "Pau_Cin_Hau",
    "Pauc",
    "Phags_Pa",
    "Phag",
    "Phoenician",
    "Phnx",
    "Psalter_Pahlavi",
    "Phlp",
    "Rejang",
    "Rjng",
    "Runic",
    "Runr",
    "Samaritan",
    "Samr",
    "Saurashtra",
    "Saur",
    "Sharada",
    "Shrd",
    "Shavian",
    "Shaw",
    "Siddham",
    "Sidd",
    "SignWriting",
    "Sgnw",
    "Sinhala",
    "Sinh",
    "Sora_Sompeng",
    "Sora",
    "Soyombo",
    "Soyo",
    "Sundanese",
    "Sund",
    "Syloti_Nagri",
    "Sylo",
    "Syriac",
    "Syrc",
    "Tagalog",
    "Tglg",
    "Tagbanwa",
    "Tagb",
    "Tai_Le",
    "Tale",
    "Tai_Tham",
    "Lana",
    "Tai_Viet",
    "Tavt",
    "Takri",
    "Takr",
    "Tamil",
    "Taml",
    "Tangut",
    "Tang",
    "Telugu",
    "Telu",
    "Thaana",
    "Thaa",
    "Thai",
    "Tibetan",
    "Tibt",
    "Tifinagh",
    "Tfng",
    "Tirhuta",
    "Tirh",
    "Ugaritic",
    "Ugar",
    "Vai",
    "Vaii",
    "Warang_Citi",
    "Wara",
    "Yi",
    "Yiii",
    "Zanabazar_Square",
    "Zanb"
  ]
};
Array.prototype.push.apply(data.$LONE, data.General_Category);
data.gc = data.General_Category;
data.sc = data.Script_Extensions = data.scx = data.Script;

var pp$9 = Parser.prototype;

var RegExpValidationState = function RegExpValidationState(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = [];
  this.backReferenceNames = [];
};

RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
  this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
};

RegExpValidationState.prototype.raise = function raise (message) {
  this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
};

// If u flag is given, this returns the code point at the index (it combines a surrogate pair).
// Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
RegExpValidationState.prototype.at = function at (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return c
  }
  return (c << 10) + s.charCodeAt(i + 1) - 0x35FDC00
};

RegExpValidationState.prototype.nextIndex = function nextIndex (i) {
  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l
  }
  var c = s.charCodeAt(i);
  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return i + 1
  }
  return i + 2
};

RegExpValidationState.prototype.current = function current () {
  return this.at(this.pos)
};

RegExpValidationState.prototype.lookahead = function lookahead () {
  return this.at(this.nextIndex(this.pos))
};

RegExpValidationState.prototype.advance = function advance () {
  this.pos = this.nextIndex(this.pos);
};

RegExpValidationState.prototype.eat = function eat (ch) {
  if (this.current() === ch) {
    this.advance();
    return true
  }
  return false
};

function codePointToString$1(ch) {
  if (ch <= 0xFFFF) { return String.fromCharCode(ch) }
  ch -= 0x10000;
  return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00)
}

/**
 * Validate the flags part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$9.validateRegExpFlags = function(state) {
  var this$1 = this;

  var validFlags = state.validFlags;
  var flags = state.flags;

  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this$1.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this$1.raise(state.start, "Duplicate regular expression flag");
    }
  }
};

/**
 * Validate the pattern part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$9.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);

  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
  // parsing contains a |GroupName|, reparse with the goal symbol
  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
  // exception if _P_ did not conform to the grammar, if any elements of _P_
  // were not matched by the parse, or if any Early Error conditions exist.
  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
pp$9.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames.length = 0;
  state.backReferenceNames.length = 0;

  this.regexp_disjunction(state);

  if (state.pos !== state.source.length) {
    // Make the same messages as V8.
    if (state.eat(0x29 /* ) */)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(0x5D /* [ */) || state.eat(0x7D /* } */)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
    var name = list[i];

    if (state.groupNames.indexOf(name) === -1) {
      state.raise("Invalid named capture referenced");
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
pp$9.regexp_disjunction = function(state) {
  var this$1 = this;

  this.regexp_alternative(state);
  while (state.eat(0x7C /* | */)) {
    this$1.regexp_alternative(state);
  }

  // Make the same message as V8.
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(0x7B /* { */)) {
    state.raise("Lone quantifier brackets");
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
pp$9.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state))
    {  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
pp$9.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    // Handle `QuantifiableAssertion Quantifier` alternative.
    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
    // is a QuantifiableAssertion.
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      // Make the same message as V8.
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true
  }

  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
pp$9.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;

  // ^, $
  if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
    return true
  }

  // \b \B
  if (state.eat(0x5C /* \ */)) {
    if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
      return true
    }
    state.pos = start;
  }

  // Lookahead / Lookbehind
  if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(0x3C /* < */);
    }
    if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
      this.regexp_disjunction(state);
      if (!state.eat(0x29 /* ) */)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true
    }
  }

  state.pos = start;
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
pp$9.regexp_eatQuantifier = function(state, noError) {
  if ( noError === void 0 ) noError = false;

  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(0x3F /* ? */);
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
pp$9.regexp_eatQuantifierPrefix = function(state, noError) {
  return (
    state.eat(0x2A /* * */) ||
    state.eat(0x2B /* + */) ||
    state.eat(0x3F /* ? */) ||
    this.regexp_eatBracedQuantifier(state, noError)
  )
};
pp$9.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(0x7B /* { */)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(0x7D /* } */)) {
        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
pp$9.regexp_eatAtom = function(state) {
  return (
    this.regexp_eatPatternCharacters(state) ||
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state)
  )
};
pp$9.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(0x28 /* ( */)) {
    if (state.eat(0x3F /* ? */) && state.eat(0x3A /* : */)) {
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        return true
      }
      state.raise("Unterminated group");
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatCapturingGroup = function(state) {
  if (state.eat(0x28 /* ( */)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 0x3F /* ? */) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(0x29 /* ) */)) {
      state.numCapturingParens += 1;
      return true
    }
    state.raise("Unterminated group");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
pp$9.regexp_eatExtendedAtom = function(state) {
  return (
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state) ||
    this.regexp_eatInvalidBracedQuantifier(state) ||
    this.regexp_eatExtendedPatternCharacter(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
pp$9.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
pp$9.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }
  return false
};
function isSyntaxCharacter(ch) {
  return (
    ch === 0x24 /* $ */ ||
    ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
    ch === 0x2E /* . */ ||
    ch === 0x3F /* ? */ ||
    ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
// But eat eager.
pp$9.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
pp$9.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (
    ch !== -1 &&
    ch !== 0x24 /* $ */ &&
    !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
    ch !== 0x2E /* . */ &&
    ch !== 0x3F /* ? */ &&
    ch !== 0x5B /* [ */ &&
    ch !== 0x5E /* ^ */ &&
    ch !== 0x7C /* | */
  ) {
    state.advance();
    return true
  }
  return false
};

// GroupSpecifier[U] ::
//   [empty]
//   `?` GroupName[?U]
pp$9.regexp_groupSpecifier = function(state) {
  if (state.eat(0x3F /* ? */)) {
    if (this.regexp_eatGroupName(state)) {
      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
        state.raise("Duplicate capture group name");
      }
      state.groupNames.push(state.lastStringValue);
      return
    }
    state.raise("Invalid group");
  }
};

// GroupName[U] ::
//   `<` RegExpIdentifierName[?U] `>`
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$9.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(0x3C /* < */)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
      return true
    }
    state.raise("Invalid capture group name");
  }
  return false
};

// RegExpIdentifierName[U] ::
//   RegExpIdentifierStart[?U]
//   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$9.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString$1(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString$1(state.lastIntValue);
    }
    return true
  }
  return false
};

// RegExpIdentifierStart[U] ::
//   UnicodeIDStart
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
pp$9.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
}

// RegExpIdentifierPart[U] ::
//   UnicodeIDContinue
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[?U]
//   <ZWNJ>
//   <ZWJ>
pp$9.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var ch = state.current();
  state.advance();

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
pp$9.regexp_eatAtomEscape = function(state) {
  if (
    this.regexp_eatBackReference(state) ||
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state) ||
    (state.switchN && this.regexp_eatKGroupName(state))
  ) {
    return true
  }
  if (state.switchU) {
    // Make the same message as V8.
    if (state.current() === 0x63 /* c */) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false
};
pp$9.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true
    }
    if (n <= state.numCapturingParens) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatKGroupName = function(state) {
  if (state.eat(0x6B /* k */)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true
    }
    state.raise("Invalid named reference");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
pp$9.regexp_eatCharacterEscape = function(state) {
  return (
    this.regexp_eatControlEscape(state) ||
    this.regexp_eatCControlLetter(state) ||
    this.regexp_eatZero(state) ||
    this.regexp_eatHexEscapeSequence(state) ||
    this.regexp_eatRegExpUnicodeEscapeSequence(state) ||
    (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
    this.regexp_eatIdentityEscape(state)
  )
};
pp$9.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(0x63 /* c */)) {
    if (this.regexp_eatControlLetter(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$9.regexp_eatZero = function(state) {
  if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
pp$9.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 0x74 /* t */) {
    state.lastIntValue = 0x09; /* \t */
    state.advance();
    return true
  }
  if (ch === 0x6E /* n */) {
    state.lastIntValue = 0x0A; /* \n */
    state.advance();
    return true
  }
  if (ch === 0x76 /* v */) {
    state.lastIntValue = 0x0B; /* \v */
    state.advance();
    return true
  }
  if (ch === 0x66 /* f */) {
    state.lastIntValue = 0x0C; /* \f */
    state.advance();
    return true
  }
  if (ch === 0x72 /* r */) {
    state.lastIntValue = 0x0D; /* \r */
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
pp$9.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};
function isControlLetter(ch) {
  return (
    (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
    (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
pp$9.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
  var start = state.pos;

  if (state.eat(0x75 /* u */)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 0xDC00 && trail <= 0xDFFF) {
            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
            return true
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true
    }
    if (
      state.switchU &&
      state.eat(0x7B /* { */) &&
      this.regexp_eatHexDigits(state) &&
      state.eat(0x7D /* } */) &&
      isValidUnicode(state.lastIntValue)
    ) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }

  return false
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 0x10FFFF
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
pp$9.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true
    }
    if (state.eat(0x2F /* / */)) {
      state.lastIntValue = 0x2F; /* / */
      return true
    }
    return false
  }

  var ch = state.current();
  if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
pp$9.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
pp$9.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();

  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return true
  }

  if (
    state.switchU &&
    this.options.ecmaVersion >= 9 &&
    (ch === 0x50 /* P */ || ch === 0x70 /* p */)
  ) {
    state.lastIntValue = -1;
    state.advance();
    if (
      state.eat(0x7B /* { */) &&
      this.regexp_eatUnicodePropertyValueExpression(state) &&
      state.eat(0x7D /* } */)
    ) {
      return true
    }
    state.raise("Invalid property name");
  }

  return false
};
function isCharacterClassEscape(ch) {
  return (
    ch === 0x64 /* d */ ||
    ch === 0x44 /* D */ ||
    ch === 0x73 /* s */ ||
    ch === 0x53 /* S */ ||
    ch === 0x77 /* w */ ||
    ch === 0x57 /* W */
  )
}

// UnicodePropertyValueExpression ::
//   UnicodePropertyName `=` UnicodePropertyValue
//   LoneUnicodePropertyNameOrValue
pp$9.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;

  // UnicodePropertyName `=` UnicodePropertyValue
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return true
    }
  }
  state.pos = start;

  // LoneUnicodePropertyNameOrValue
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    return true
  }
  return false
};
pp$9.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!data.hasOwnProperty(name) || data[name].indexOf(value) === -1) {
    state.raise("Invalid property name");
  }
};
pp$9.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (data.$LONE.indexOf(nameOrValue) === -1) {
    state.raise("Invalid property name");
  }
};

// UnicodePropertyName ::
//   UnicodePropertyNameCharacters
pp$9.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString$1(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 0x5F /* _ */
}

// UnicodePropertyValue ::
//   UnicodePropertyValueCharacters
pp$9.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString$1(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
}

// LoneUnicodePropertyNameOrValue ::
//   UnicodePropertyValueCharacters
pp$9.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state)
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
pp$9.regexp_eatCharacterClass = function(state) {
  if (state.eat(0x5B /* [ */)) {
    state.eat(0x5E /* ^ */);
    this.regexp_classRanges(state);
    if (state.eat(0x5D /* [ */)) {
      return true
    }
    // Unreachable since it threw "unterminated regular expression" error before.
    state.raise("Unterminated character class");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
pp$9.regexp_classRanges = function(state) {
  var this$1 = this;

  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(0x2D /* - */) && this$1.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
pp$9.regexp_eatClassAtom = function(state) {
  var start = state.pos;

  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatClassEscape(state)) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      var ch$1 = state.current();
      if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }

  var ch = state.current();
  if (ch !== 0x5D /* [ */) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
pp$9.regexp_eatClassEscape = function(state) {
  var start = state.pos;

  if (state.eat(0x62 /* b */)) {
    state.lastIntValue = 0x08; /* <BS> */
    return true
  }

  if (state.switchU && state.eat(0x2D /* - */)) {
    state.lastIntValue = 0x2D; /* - */
    return true
  }

  if (!state.switchU && state.eat(0x63 /* c */)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true
    }
    state.pos = start;
  }

  return (
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
pp$9.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$9.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(0x78 /* x */)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
pp$9.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
    state.advance();
  }
  return state.pos !== start
};
function isDecimalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
pp$9.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start
};
function isHexDigit(ch) {
  return (
    (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
    (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
    (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
  )
}
function hexToInt(ch) {
  if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
    return 10 + (ch - 0x41 /* A */)
  }
  if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
    return 10 + (ch - 0x61 /* a */)
  }
  return ch - 0x30 /* 0 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
// Allows only 0-377(octal) i.e. 0-255(decimal).
pp$9.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
pp$9.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 0x30; /* 0 */
    state.advance();
    return true
  }
  state.lastIntValue = 0;
  return false
};
function isOctalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$9.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true
};

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations)
    { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
  if (p.options.ranges)
    { this.range = [p.start, p.end]; }
};

// ## Tokenizer

var pp$8 = Parser.prototype;

// Move to the next token

pp$8.next = function() {
  if (this.options.onToken)
    { this.options.onToken(new Token(this)); }

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp$8.getToken = function() {
  this.next();
  return new Token(this)
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined")
  { pp$8[Symbol.iterator] = function() {
    var this$1 = this;

    return {
      next: function () {
        var token = this$1.getToken();
        return {
          done: token.type === types.eof,
          value: token
        }
      }
    }
  }; }

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp$8.curContext = function() {
  return this.context[this.context.length - 1]
};

// Read a single token, updating the parser object's token-related
// properties.

pp$8.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

  this.start = this.pos;
  if (this.options.locations) { this.startLoc = this.curPosition(); }
  if (this.pos >= this.input.length) { return this.finishToken(types.eof) }

  if (curContext.override) { return curContext.override(this) }
  else { this.readToken(this.fullCharCodeAtPos()); }
};

pp$8.readToken = function(code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
    { return this.readWord() }

  return this.getTokenFromCode(code)
};

pp$8.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xe000) { return code }
  var next = this.input.charCodeAt(this.pos + 1);
  return (code << 10) + next - 0x35fdc00
};

pp$8.skipBlockComment = function() {
  var this$1 = this;

  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
  this.pos = end + 2;
  if (this.options.locations) {
    lineBreakG.lastIndex = start;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this$1.curLine;
      this$1.lineStart = match.index + match[0].length;
    }
  }
  if (this.options.onComment)
    { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                           startLoc, this.curPosition()); }
};

pp$8.skipLineComment = function(startSkip) {
  var this$1 = this;

  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this$1.input.charCodeAt(++this$1.pos);
  }
  if (this.options.onComment)
    { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                           startLoc, this.curPosition()); }
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp$8.skipSpace = function() {
  var this$1 = this;

  loop: while (this.pos < this.input.length) {
    var ch = this$1.input.charCodeAt(this$1.pos);
    switch (ch) {
    case 32: case 160: // ' '
      ++this$1.pos;
      break
    case 13:
      if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
        ++this$1.pos;
      }
    case 10: case 8232: case 8233:
      ++this$1.pos;
      if (this$1.options.locations) {
        ++this$1.curLine;
        this$1.lineStart = this$1.pos;
      }
      break
    case 47: // '/'
      switch (this$1.input.charCodeAt(this$1.pos + 1)) {
      case 42: // '*'
        this$1.skipBlockComment();
        break
      case 47:
        this$1.skipLineComment(2);
        break
      default:
        break loop
      }
      break
    default:
      if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this$1.pos;
      } else {
        break loop
      }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp$8.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) { this.endLoc = this.curPosition(); }
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp$8.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) { return this.readNumber(true) }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(types.ellipsis)
  } else {
    ++this.pos;
    return this.finishToken(types.dot)
  }
};

pp$8.readToken_slash = function() { // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.slash, 1)
};

pp$8.readToken_mult_modulo_exp = function(code) { // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types.star : types.modulo;

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }

  if (next === 61) { return this.finishOp(types.assign, size + 1) }
  return this.finishOp(tokentype, size)
};

pp$8.readToken_pipe_amp = function(code) { // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) { return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2) }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1)
};

pp$8.readToken_caret = function() { // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.bitwiseXOR, 1)
};

pp$8.readToken_plus_min = function(code) { // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
        (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken()
    }
    return this.finishOp(types.incDec, 2)
  }
  if (next === 61) { return this.finishOp(types.assign, 2) }
  return this.finishOp(types.plusMin, 1)
};

pp$8.readToken_lt_gt = function(code) { // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types.assign, size + 1) }
    return this.finishOp(types.bitShift, size)
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
      this.input.charCodeAt(this.pos + 3) === 45) {
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken()
  }
  if (next === 61) { size = 2; }
  return this.finishOp(types.relational, size)
};

pp$8.readToken_eq_excl = function(code) { // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
    this.pos += 2;
    return this.finishToken(types.arrow)
  }
  return this.finishOp(code === 61 ? types.eq : types.prefix, 1)
};

pp$8.getTokenFromCode = function(code) {
  switch (code) {
  // The interpretation of a dot depends on whether it is followed
  // by a digit or another two dots.
  case 46: // '.'
    return this.readToken_dot()

  // Punctuation tokens.
  case 40: ++this.pos; return this.finishToken(types.parenL)
  case 41: ++this.pos; return this.finishToken(types.parenR)
  case 59: ++this.pos; return this.finishToken(types.semi)
  case 44: ++this.pos; return this.finishToken(types.comma)
  case 91: ++this.pos; return this.finishToken(types.bracketL)
  case 93: ++this.pos; return this.finishToken(types.bracketR)
  case 123: ++this.pos; return this.finishToken(types.braceL)
  case 125: ++this.pos; return this.finishToken(types.braceR)
  case 58: ++this.pos; return this.finishToken(types.colon)
  case 63: ++this.pos; return this.finishToken(types.question)

  case 96: // '`'
    if (this.options.ecmaVersion < 6) { break }
    ++this.pos;
    return this.finishToken(types.backQuote)

  case 48: // '0'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
    if (this.options.ecmaVersion >= 6) {
      if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
      if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
    }

  // Anything else beginning with a digit is an integer, octal
  // number, or float.
  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
    return this.readNumber(false)

  // Quotes produce strings.
  case 34: case 39: // '"', "'"
    return this.readString(code)

  // Operators are parsed inline in tiny state machines. '=' (61) is
  // often referred to. `finishOp` simply skips the amount of
  // characters it is given as second argument, and returns a token
  // of the type given by its first argument.

  case 47: // '/'
    return this.readToken_slash()

  case 37: case 42: // '%*'
    return this.readToken_mult_modulo_exp(code)

  case 124: case 38: // '|&'
    return this.readToken_pipe_amp(code)

  case 94: // '^'
    return this.readToken_caret()

  case 43: case 45: // '+-'
    return this.readToken_plus_min(code)

  case 60: case 62: // '<>'
    return this.readToken_lt_gt(code)

  case 61: case 33: // '=!'
    return this.readToken_eq_excl(code)

  case 126: // '~'
    return this.finishOp(types.prefix, 1)
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp$8.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str)
};

pp$8.readRegexp = function() {
  var this$1 = this;

  var escaped, inClass, start = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(start, "Unterminated regular expression"); }
    var ch = this$1.input.charAt(this$1.pos);
    if (lineBreak.test(ch)) { this$1.raise(start, "Unterminated regular expression"); }
    if (!escaped) {
      if (ch === "[") { inClass = true; }
      else if (ch === "]" && inClass) { inClass = false; }
      else if (ch === "/" && !inClass) { break }
      escaped = ch === "\\";
    } else { escaped = false; }
    ++this$1.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) { this.unexpected(flagsStart); }

  // Validate pattern
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);

  // Create Literal#value property value.
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {
    // ESTree requires null if it failed to instantiate RegExp object.
    // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
  }

  return this.finishToken(types.regexp, {pattern: pattern, flags: flags, value: value})
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp$8.readInt = function(radix, len) {
  var this$1 = this;

  var start = this.pos, total = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this$1.input.charCodeAt(this$1.pos), val = (void 0);
    if (code >= 97) { val = code - 97 + 10; } // a
    else if (code >= 65) { val = code - 65 + 10; } // A
    else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
    else { val = Infinity; }
    if (val >= radix) { break }
    ++this$1.pos;
    total = total * radix + val;
  }
  if (this.pos === start || len != null && this.pos - start !== len) { return null }

  return total
};

pp$8.readRadixNumber = function(radix) {
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
  return this.finishToken(types.num, val)
};

// Read an integer, octal integer, or floating-point number.

pp$8.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) { this.raise(start, "Invalid number"); }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
  var next = this.input.charCodeAt(this.pos);
  if (next === 46 && !octal) { // '.'
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) { // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) { ++this.pos; } // '+-'
    if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

  var str = this.input.slice(start, this.pos);
  var val = octal ? parseInt(str, 8) : parseFloat(str);
  return this.finishToken(types.num, val)
};

// Read a string value, interpreting backslash-escapes.

pp$8.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;

  if (ch === 123) { // '{'
    if (this.options.ecmaVersion < 6) { this.unexpected(); }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
  } else {
    code = this.readHexChar(4);
  }
  return code
};

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) { return String.fromCharCode(code) }
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

pp$8.readString = function(quote) {
  var this$1 = this;

  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated string constant"); }
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === quote) { break }
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(false);
      chunkStart = this$1.pos;
    } else {
      if (isNewLine(ch, this$1.options.ecmaVersion >= 10)) { this$1.raise(this$1.start, "Unterminated string constant"); }
      ++this$1.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types.string, out)
};

// Reads template string tokens.

var INVALID_TEMPLATE_ESCAPE_ERROR = {};

pp$8.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err
    }
  }

  this.inTemplateElement = false;
};

pp$8.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR
  } else {
    this.raise(position, message);
  }
};

pp$8.readTmplToken = function() {
  var this$1 = this;

  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated template"); }
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) { // '`', '${'
      if (this$1.pos === this$1.start && (this$1.type === types.template || this$1.type === types.invalidTemplate)) {
        if (ch === 36) {
          this$1.pos += 2;
          return this$1.finishToken(types.dollarBraceL)
        } else {
          ++this$1.pos;
          return this$1.finishToken(types.backQuote)
        }
      }
      out += this$1.input.slice(chunkStart, this$1.pos);
      return this$1.finishToken(types.template, out)
    }
    if (ch === 92) { // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(true);
      chunkStart = this$1.pos;
    } else if (isNewLine(ch)) {
      out += this$1.input.slice(chunkStart, this$1.pos);
      ++this$1.pos;
      switch (ch) {
      case 13:
        if (this$1.input.charCodeAt(this$1.pos) === 10) { ++this$1.pos; }
      case 10:
        out += "\n";
        break
      default:
        out += String.fromCharCode(ch);
        break
      }
      if (this$1.options.locations) {
        ++this$1.curLine;
        this$1.lineStart = this$1.pos;
      }
      chunkStart = this$1.pos;
    } else {
      ++this$1.pos;
    }
  }
};

// Reads a template token to search for the end, without validating any escape sequences
pp$8.readInvalidTemplateToken = function() {
  var this$1 = this;

  for (; this.pos < this.input.length; this.pos++) {
    switch (this$1.input[this$1.pos]) {
    case "\\":
      ++this$1.pos;
      break

    case "$":
      if (this$1.input[this$1.pos + 1] !== "{") {
        break
      }
    // falls through

    case "`":
      return this$1.finishToken(types.invalidTemplate, this$1.input.slice(this$1.start, this$1.pos))

    // no default
    }
  }
  this.raise(this.start, "Unterminated template");
};

// Used to read escaped characters

pp$8.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
  case 110: return "\n" // 'n' -> '\n'
  case 114: return "\r" // 'r' -> '\r'
  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
  case 117: return codePointToString(this.readCodePoint()) // 'u'
  case 116: return "\t" // 't' -> '\t'
  case 98: return "\b" // 'b' -> '\b'
  case 118: return "\u000b" // 'v' -> '\u000b'
  case 102: return "\f" // 'f' -> '\f'
  case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
  case 10: // ' \n'
    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
    return ""
  default:
    if (ch >= 48 && ch <= 55) {
      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
      var octal = parseInt(octalStr, 8);
      if (octal > 255) {
        octalStr = octalStr.slice(0, -1);
        octal = parseInt(octalStr, 8);
      }
      this.pos += octalStr.length - 1;
      ch = this.input.charCodeAt(this.pos);
      if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
        this.invalidStringToken(
          this.pos - 1 - octalStr.length,
          inTemplate
            ? "Octal literal in template string"
            : "Octal literal in strict mode"
        );
      }
      return String.fromCharCode(octal)
    }
    return String.fromCharCode(ch)
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp$8.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
  return n
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp$8.readWord1 = function() {
  var this$1 = this;

  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this$1.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this$1.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) { // "\"
      this$1.containsEsc = true;
      word += this$1.input.slice(chunkStart, this$1.pos);
      var escStart = this$1.pos;
      if (this$1.input.charCodeAt(++this$1.pos) !== 117) // "u"
        { this$1.invalidStringToken(this$1.pos, "Expecting Unicode escape sequence \\uXXXX"); }
      ++this$1.pos;
      var esc = this$1.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
        { this$1.invalidStringToken(escStart, "Invalid Unicode escape"); }
      word += codePointToString(esc);
      chunkStart = this$1.pos;
    } else {
      break
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos)
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp$8.readWord = function() {
  var word = this.readWord1();
  var type = types.name;
  if (this.keywords.test(word)) {
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword " + word); }
    type = keywords$1[word];
  }
  return this.finishToken(type, word)
};

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/acornjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/acornjs/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

var version = "5.7.1";

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

function parse(input, options) {
  return new Parser(options, input).parse()
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  var p = new Parser(options, input, pos);
  p.nextToken();
  return p.parseExpression()
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return new Parser(options, input)
}

// This is a terrible kludge to support the existing, pre-ES6
// interface where the loose parser module retroactively adds exports
// to this module.
var parse_dammit;
var LooseParser;
var pluginsLoose; // eslint-disable-line camelcase
function addLooseExports(parse, Parser$$1, plugins$$1) {
  parse_dammit = parse; // eslint-disable-line camelcase
  LooseParser = Parser$$1;
  pluginsLoose = plugins$$1;
}

var acorn = /*#__PURE__*/Object.freeze({
  version: version,
  parse: parse,
  parseExpressionAt: parseExpressionAt,
  tokenizer: tokenizer,
  get parse_dammit () { return parse_dammit; },
  get LooseParser () { return LooseParser; },
  get pluginsLoose () { return pluginsLoose; },
  addLooseExports: addLooseExports,
  Parser: Parser,
  plugins: plugins,
  defaultOptions: defaultOptions,
  Position: Position,
  SourceLocation: SourceLocation,
  getLineInfo: getLineInfo,
  Node: Node,
  TokenType: TokenType,
  tokTypes: types,
  keywordTypes: keywords$1,
  TokContext: TokContext,
  tokContexts: types$1,
  isIdentifierChar: isIdentifierChar,
  isIdentifierStart: isIdentifierStart,
  Token: Token,
  isNewLine: isNewLine,
  lineBreak: lineBreak,
  lineBreakG: lineBreakG,
  nonASCIIwhitespace: nonASCIIwhitespace
});

var inject = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = injectDynamicImport;
/* eslint-disable no-underscore-dangle */

var DynamicImportKey = exports.DynamicImportKey = 'Import';

function injectDynamicImport(acorn) {
  var tt = acorn.tokTypes;

  // NOTE: This allows `yield import()` to parse correctly.
  tt._import.startsExpr = true;

  function parseDynamicImport() {
    var node = this.startNode();
    this.next();
    if (this.type !== tt.parenL) {
      this.unexpected();
    }
    return this.finishNode(node, DynamicImportKey);
  }

  function peekNext() {
    return this.input[this.pos];
  }

  // eslint-disable-next-line no-param-reassign
  acorn.plugins.dynamicImport = function () {
    function dynamicImportPlugin(instance) {
      instance.extend('parseStatement', function (nextMethod) {
        return function () {
          function parseStatement() {
            var node = this.startNode();
            if (this.type === tt._import) {
              var nextToken = peekNext.call(this);
              if (nextToken === tt.parenL.label) {
                var expr = this.parseExpression();
                return this.parseExpressionStatement(node, expr);
              }
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return nextMethod.apply(this, args);
          }

          return parseStatement;
        }();
      });

      instance.extend('parseExprAtom', function (nextMethod) {
        return function () {
          function parseExprAtom(refDestructuringErrors) {
            if (this.type === tt._import) {
              return parseDynamicImport.call(this);
            }
            return nextMethod.call(this, refDestructuringErrors);
          }

          return parseExprAtom;
        }();
      });
    }

    return dynamicImportPlugin;
  }();

  return acorn;
}
});

var injectDynamicImportPlugin = unwrapExports(inject);
var inject_1 = inject.DynamicImportKey;

const skipWhiteSpace$1 = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var inject$1 = function (acorn) {
  const tt = acorn.tokTypes;

  const nextTokenIsDot = parser => {
    skipWhiteSpace$1.lastIndex = parser.pos;
    let skip = skipWhiteSpace$1.exec(parser.input);
    let next = parser.pos + skip[0].length;
    return parser.input.slice(next, next + 1) === "."
  };

  acorn.plugins.importMeta = function (instance) {

    instance.extend("parseExprAtom", function (superF) {
      return function(refDestructuringErrors) {
        if (this.type !== tt._import || !nextTokenIsDot(this)) return superF.call(this, refDestructuringErrors)

        if (!this.options.allowImportExportEverywhere && !this.inModule) {
          this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
        }

        let node = this.startNode();
        node.meta = this.parseIdent(true);
        this.expect(tt.dot);
        node.property = this.parseIdent(true);
        if (node.property.name !== "meta") {
          this.raiseRecoverable(node.property.start, "The only valid meta property for import is import.meta");
        }
        return this.finishNode(node, "MetaProperty")
      }
    });

    instance.extend("parseStatement", function (superF) {
      return function(declaration, topLevel, exports) {
        if (this.type !== tt._import) return superF.call(this, declaration, topLevel, exports)
        if (!nextTokenIsDot(this)) return superF.call(this, declaration, topLevel, exports)

        let node = this.startNode();
        let expr = this.parseExpression();
        return this.parseExpressionStatement(node, expr)
      }
    });
  };
  return acorn
};

var UndefinedVariable = /** @class */ (function (_super) {
    __extends(UndefinedVariable, _super);
    function UndefinedVariable() {
        return _super.call(this, 'undefined') || this;
    }
    UndefinedVariable.prototype.getLiteralValueAtPath = function () {
        return undefined;
    };
    return UndefinedVariable;
}(Variable));

var GlobalScope = /** @class */ (function (_super) {
    __extends(GlobalScope, _super);
    function GlobalScope() {
        var _this = _super.call(this) || this;
        _this.variables.undefined = new UndefinedVariable();
        return _this;
    }
    GlobalScope.prototype.findVariable = function (name) {
        if (!this.variables[name])
            return (this.variables[name] = new GlobalVariable(name));
        return this.variables[name];
    };
    GlobalScope.prototype.deshadow = function (names, children) {
        if (children === void 0) { children = this.children; }
        _super.prototype.deshadow.call(this, names, children);
    };
    return GlobalScope;
}(Scope));

var getNewTrackedPaths = function () { return ({
    tracked: false,
    unknownPath: null,
    paths: Object.create(null)
}); };
var EntityPathTracker = /** @class */ (function () {
    function EntityPathTracker() {
        this.entityPaths = new Map();
    }
    EntityPathTracker.prototype.track = function (entity, path$$1) {
        var trackedPaths = this.entityPaths.get(entity);
        if (!trackedPaths) {
            trackedPaths = getNewTrackedPaths();
            this.entityPaths.set(entity, trackedPaths);
        }
        var pathIndex = 0, trackedSubPaths;
        while (pathIndex < path$$1.length) {
            var key = path$$1[pathIndex];
            if (typeof key === 'string') {
                trackedSubPaths = trackedPaths.paths[key];
                if (!trackedSubPaths) {
                    trackedSubPaths = getNewTrackedPaths();
                    trackedPaths.paths[key] = trackedSubPaths;
                }
            }
            else {
                trackedSubPaths = trackedPaths.unknownPath;
                if (!trackedSubPaths) {
                    trackedSubPaths = getNewTrackedPaths();
                    trackedPaths.unknownPath = trackedSubPaths;
                }
            }
            trackedPaths = trackedSubPaths;
            pathIndex++;
        }
        var found = trackedPaths.tracked;
        trackedPaths.tracked = true;
        return found;
    };
    return EntityPathTracker;
}());

function getAssetFileName(asset, existingNames, assetFileNames) {
    if (asset.source === undefined)
        error({
            code: 'ASSET_SOURCE_NOT_FOUND',
            message: "Plugin error creating asset " + asset.name + " - no asset source set."
        });
    if (asset.fileName)
        return asset.fileName;
    return makeUnique(renderNamePattern(assetFileNames, 'assetFileNames', function (name) {
        switch (name) {
            case 'hash':
                var hash = _256();
                hash.update(name);
                hash.update(':');
                hash.update(asset.source);
                return hash.digest('hex').substr(0, 8);
            case 'name':
                return asset.name.substr(0, asset.name.length - extname(asset.name).length);
            case 'extname':
                return extname(asset.name);
            case 'ext':
                return extname(asset.name).substr(1);
        }
    }), existingNames);
}
function createAssetPluginHooks(assetsById, outputBundle, assetFileNames) {
    return {
        emitAsset: function (name, source) {
            if (typeof name !== 'string' || !isPlainName(name))
                error({
                    code: 'INVALID_ASSET_NAME',
                    message: "Plugin error creating asset, name is not a plain (non relative or absolute URL) string name."
                });
            var assetId;
            do {
                var assetHash = _256();
                if (assetId) {
                    // if there is a collision, chain until there isn't
                    assetHash.update(assetId);
                }
                else {
                    assetHash.update(name);
                }
                assetId = assetHash.digest('hex').substr(0, 8);
            } while (assetsById.has(assetId));
            var asset = { name: name, source: source, fileName: undefined };
            if (outputBundle && source !== undefined)
                finaliseAsset(asset, outputBundle, assetFileNames);
            assetsById.set(assetId, asset);
            return assetId;
        },
        setAssetSource: function (assetId, source) {
            var asset = assetsById.get(assetId);
            if (!asset)
                error({
                    code: 'ASSET_NOT_FOUND',
                    message: "Plugin error - Unable to set asset source for unknown asset " + assetId + "."
                });
            if (asset.source !== undefined)
                error({
                    code: 'ASSET_SOURCE_ALREADY_SET',
                    message: "Plugin error - Unable to set asset source for " + asset.name + ", source already set."
                });
            if (typeof source !== 'string' && !source)
                error({
                    code: 'ASSET_SOURCE_MISSING',
                    message: "Plugin error creating asset " + name + ", setAssetSource call without a source."
                });
            asset.source = source;
            if (outputBundle)
                finaliseAsset(asset, outputBundle, assetFileNames);
        },
        getAssetFileName: function (assetId) {
            var asset = assetsById.get(assetId);
            if (!asset)
                error({
                    code: 'ASSET_NOT_FOUND',
                    message: "Plugin error - Unable to get asset filename for unknown asset " + assetId + "."
                });
            if (asset.fileName === undefined)
                error({
                    code: 'ASSET_NOT_FINALISED',
                    message: "Plugin error - Unable to get asset file name for asset " + assetId + ". Ensure that the source is set and that generate is called first."
                });
            return asset.fileName;
        }
    };
}
function finaliseAsset(asset, outputBundle, assetFileNames) {
    var fileName = getAssetFileName(asset, outputBundle, assetFileNames);
    asset.fileName = fileName;
    outputBundle[fileName] = asset.source;
}
function createTransformEmitAsset(assetsById, emitAsset) {
    var assets = [];
    return {
        assets: assets,
        emitAsset: function (name, source) {
            var assetId = emitAsset(name, source);
            var asset = assetsById.get(assetId);
            // distinguish transform assets
            assets.push({
                name: asset.name,
                source: asset.source,
                fileName: undefined
            });
            return assetId;
        }
    };
}

var CHAR_CODE_A = 97;
var CHAR_CODE_0 = 48;
function intToHex(num) {
    if (num < 10)
        return String.fromCharCode(CHAR_CODE_0 + num);
    else
        return String.fromCharCode(CHAR_CODE_A + (num - 10));
}
function Uint8ArrayToHexString(buffer) {
    var str = '';
    // hex conversion - 2 chars per 8 bit component
    for (var i = 0; i < buffer.length; i++) {
        var num = buffer[i];
        // big endian conversion, but whatever
        str += intToHex(num >> 4);
        str += intToHex(num & 0xf);
    }
    return str;
}
function Uint8ArrayXor(to, from) {
    for (var i = 0; i < to.length; i++)
        to[i] = to[i] ^ from[i];
    return to;
}
function randomUint8Array(len) {
    var buffer = new Uint8Array(len);
    for (var i = 0; i < buffer.length; i++)
        buffer[i] = Math.random() * (2 << 8);
    return buffer;
}
function Uint8ArrayEqual(bufferA, bufferB) {
    for (var i = 0; i < bufferA.length; i++) {
        if (bufferA[i] !== bufferB[i])
            return false;
    }
    return true;
}

var version$1 = "0.65.0";

function mkdirpath(path$$1) {
    var dir = dirname(path$$1);
    try {
        readdirSync(dir);
    }
    catch (err) {
        mkdirpath(dir);
        try {
            mkdirSync(dir);
        }
        catch (err2) {
            if (err2.code !== 'EEXIST') {
                throw err2;
            }
        }
    }
}
function writeFile$1(dest, data) {
    return new Promise(function (fulfil, reject) {
        mkdirpath(dest);
        writeFile(dest, data, function (err) {
            if (err) {
                reject(err);
            }
            else {
                fulfil();
            }
        });
    });
}

function getRollupDefaultPlugin(options) {
    return {
        name: 'Rollup Core',
        resolveId: createResolveId(options),
        load: function (id) {
            return readFileSync(id, 'utf-8');
        },
        resolveDynamicImport: function (specifier, parentId) {
            if (typeof specifier === 'string')
                return this.resolveId(specifier, parentId);
        }
    };
}
function findFile(file, preserveSymlinks) {
    try {
        var stats = lstatSync(file);
        if (!preserveSymlinks && stats.isSymbolicLink())
            return findFile(realpathSync(file), preserveSymlinks);
        if ((preserveSymlinks && stats.isSymbolicLink()) || stats.isFile()) {
            // check case
            var name = basename(file);
            var files = readdirSync(dirname(file));
            if (files.indexOf(name) !== -1)
                return file;
        }
    }
    catch (err) {
        // suppress
    }
}
function addJsExtensionIfNecessary(file, preserveSymlinks) {
    var found = findFile(file, preserveSymlinks);
    if (found)
        return found;
    found = findFile(file + '.mjs', preserveSymlinks);
    if (found)
        return found;
    found = findFile(file + '.js', preserveSymlinks);
    return found;
}
function createResolveId(options) {
    return function (importee, importer) {
        if (typeof process === 'undefined') {
            error({
                code: 'MISSING_PROCESS',
                message: "It looks like you're using Rollup in a non-Node.js environment. This means you must supply a plugin with custom resolveId and load functions",
                url: 'https://github.com/rollup/rollup/wiki/Plugins'
            });
        }
        // external modules (non-entry modules that start with neither '.' or '/')
        // are skipped at this stage.
        if (importer !== undefined && !isAbsolute(importee) && importee[0] !== '.')
            return null;
        // `resolve` processes paths from right to left, prepending them until an
        // absolute path is created. Absolute importees therefore shortcircuit the
        // resolve call and require no special handing on our part.
        // See https://nodejs.org/api/path.html#path_path_resolve_paths
        return addJsExtensionIfNecessary(resolve(importer ? dirname(importer) : resolve(), importee), options.preserveSymlinks);
    };
}

function createPluginDriver(graph, options, pluginCache, watcher) {
    var plugins = (options.plugins || []).concat([getRollupDefaultPlugin(options)]);
    var _a = createAssetPluginHooks(graph.assetsById), emitAsset = _a.emitAsset, getAssetFileName$$1 = _a.getAssetFileName, setAssetSource = _a.setAssetSource;
    var existingPluginKeys = [];
    var hasLoadersOrTransforms = false;
    var pluginContexts = plugins.map(function (plugin) {
        var cacheable = true;
        if (typeof plugin.cacheKey !== 'string') {
            if (typeof plugin.name !== 'string') {
                cacheable = false;
            }
            else {
                if (existingPluginKeys.indexOf(plugin.name) !== -1)
                    cacheable = false;
                existingPluginKeys.push(plugin.name);
            }
        }
        if (!hasLoadersOrTransforms &&
            (plugin.load || plugin.transform || plugin.transformBundle || plugin.transformChunk))
            hasLoadersOrTransforms = true;
        var cacheInstance;
        if (!pluginCache) {
            cacheInstance = noCache;
        }
        else if (cacheable) {
            var cacheKey = plugin.cacheKey || plugin.name;
            cacheInstance = createPluginCache(pluginCache[cacheKey] || (pluginCache[cacheKey] = Object.create(null)));
        }
        else {
            cacheInstance = uncacheablePlugin(plugin.name);
        }
        var context = {
            addWatchFile: function (id) {
                if (graph.finished)
                    this.error('addWatchFile can only be called during the build.');
                graph.watchFiles[id] = true;
            },
            cache: cacheInstance,
            emitAsset: emitAsset,
            error: function (err) {
                if (typeof err === 'string')
                    err = { message: err };
                if (err.code)
                    err.pluginCode = err.code;
                err.code = 'PLUGIN_ERROR';
                err.plugin = plugin.name || '(anonymous plugin)';
                error(err);
            },
            isExternal: function (id, parentId, isResolved) {
                if (isResolved === void 0) { isResolved = false; }
                return graph.isExternal(id, parentId, isResolved);
            },
            getAssetFileName: getAssetFileName$$1,
            meta: {
                rollupVersion: version$1
            },
            parse: graph.contextParse,
            resolveId: function (id, parent) {
                return pluginDriver.hookFirst('resolveId', [id, parent]);
            },
            setAssetSource: setAssetSource,
            warn: function (warning) {
                if (typeof warning === 'string')
                    warning = { message: warning };
                if (warning.code)
                    warning.pluginCode = warning.code;
                warning.code = 'PLUGIN_WARNING';
                warning.plugin = plugin.name || '(anonymous plugin)';
                graph.warn(warning);
            },
            watcher: watcher
        };
        return context;
    });
    function runHookSync(hookName, args, pidx, permitValues, hookContext) {
        if (permitValues === void 0) { permitValues = false; }
        var plugin = plugins[pidx];
        var context = pluginContexts[pidx];
        var hook = plugin[hookName];
        if (!hook)
            return;
        if (hookContext) {
            context = hookContext(context, plugin);
            if (!context || context === pluginContexts[pidx])
                throw new Error('Internal Rollup error: hookContext must return a new context object.');
        }
        try {
            // permit values allows values to be returned instead of a functional hook
            if (typeof hook !== 'function') {
                if (permitValues)
                    return hook;
                error({
                    code: 'INVALID_PLUGIN_HOOK',
                    message: "Error running plugin hook " + hookName + " for " + (plugin.name ||
                        "Plugin at pos " + (pidx + 1)) + ", expected a function hook."
                });
            }
            return hook.apply(context, args);
        }
        catch (err) {
            if (typeof err === 'string')
                err = { message: err };
            if (err.code !== 'PLUGIN_ERROR') {
                if (err.code)
                    err.pluginCode = err.code;
                err.code = 'PLUGIN_ERROR';
            }
            err.plugin = plugin.name || "Plugin at pos " + pidx;
            err.hook = hookName;
            error(err);
        }
    }
    function runHook(hookName, args, pidx, permitValues, hookContext) {
        if (permitValues === void 0) { permitValues = false; }
        var plugin = plugins[pidx];
        var context = pluginContexts[pidx];
        var hook = plugin[hookName];
        if (!hook)
            return;
        if (hookContext) {
            context = hookContext(context, plugin);
            if (!context || context === pluginContexts[pidx])
                throw new Error('Internal Rollup error: hookContext must return a new context object.');
        }
        return Promise.resolve()
            .then(function () {
            // permit values allows values to be returned instead of a functional hook
            if (typeof hook !== 'function') {
                if (permitValues)
                    return hook;
                error({
                    code: 'INVALID_PLUGIN_HOOK',
                    message: "Error running plugin hook " + hookName + " for " + (plugin.name ||
                        "Plugin at pos " + (pidx + 1)) + ", expected a function hook."
                });
            }
            return hook.apply(context, args);
        })
            .catch(function (err) {
            if (typeof err === 'string')
                err = { message: err };
            if (err.code !== 'PLUGIN_ERROR') {
                if (err.code)
                    err.pluginCode = err.code;
                err.code = 'PLUGIN_ERROR';
            }
            err.plugin = plugin.name || "Plugin at pos " + pidx;
            err.hook = hookName;
            error(err);
        });
    }
    var pluginDriver = {
        emitAsset: emitAsset,
        getAssetFileName: getAssetFileName$$1,
        hasLoadersOrTransforms: hasLoadersOrTransforms,
        // chains, ignores returns
        hookSeq: function (name, args, hookContext) {
            var promise = Promise.resolve();
            var _loop_1 = function (i) {
                promise = promise.then(function () {
                    return runHook(name, args, i, false, hookContext);
                });
            };
            for (var i = 0; i < plugins.length; i++) {
                _loop_1(i);
            }
            return promise;
        },
        // chains, ignores returns
        hookSeqSync: function (name, args, hookContext) {
            for (var i = 0; i < plugins.length; i++)
                runHookSync(name, args, i, false, hookContext);
        },
        // chains, first non-null result stops and returns
        hookFirst: function (name, args, hookContext) {
            var promise = Promise.resolve();
            var _loop_2 = function (i) {
                promise = promise.then(function (result) {
                    if (result != null)
                        return result;
                    return runHook(name, args, i, false, hookContext);
                });
            };
            for (var i = 0; i < plugins.length; i++) {
                _loop_2(i);
            }
            return promise;
        },
        // parallel, ignores returns
        hookParallel: function (name, args, hookContext) {
            var promises = [];
            for (var i = 0; i < plugins.length; i++) {
                var hookPromise = runHook(name, args, i, false, hookContext);
                if (!hookPromise)
                    continue;
                promises.push(hookPromise);
            }
            return Promise.all(promises).then(function () { });
        },
        // chains, reduces returns of type R, to type T, handling the reduced value as the first hook argument
        hookReduceArg0: function (name, _a, reduce, hookContext) {
            var arg0 = _a[0], args = _a.slice(1);
            var promise = Promise.resolve(arg0);
            var _loop_3 = function (i) {
                promise = promise.then(function (arg0) {
                    var hookPromise = runHook(name, [arg0].concat(args), i, false, hookContext);
                    if (!hookPromise)
                        return arg0;
                    return hookPromise.then(function (result) {
                        return reduce(arg0, result, plugins[i]);
                    });
                });
            };
            for (var i = 0; i < plugins.length; i++) {
                _loop_3(i);
            }
            return promise;
        },
        // chains, reduces returns of type R, to type T, handling the reduced value separately. permits hooks as values.
        hookReduceValue: function (name, initial, args, reduce, hookContext) {
            var promise = Promise.resolve(initial);
            var _loop_4 = function (i) {
                promise = promise.then(function (value) {
                    var hookPromise = runHook(name, args, i, true, hookContext);
                    if (!hookPromise)
                        return value;
                    return hookPromise.then(function (result) {
                        return reduce(value, result, plugins[i]);
                    });
                });
            };
            for (var i = 0; i < plugins.length; i++) {
                _loop_4(i);
            }
            return promise;
        }
    };
    return pluginDriver;
}
function createPluginCache(cache) {
    return {
        has: function (id) {
            var item = cache[id];
            if (!item)
                return false;
            item[0] = 0;
            return true;
        },
        get: function (id) {
            var item = cache[id];
            if (!item)
                return undefined;
            item[0] = 0;
            return item[1];
        },
        set: function (id, value) {
            cache[id] = [0, value];
        },
        delete: function (id) {
            return delete cache[id];
        }
    };
}
function trackPluginCache(pluginCache) {
    var result = { used: false, cache: undefined };
    result.cache = {
        has: function (id) {
            result.used = true;
            return pluginCache.has(id);
        },
        get: function (id) {
            result.used = true;
            return pluginCache.get(id);
        },
        set: function (id, value) {
            result.used = true;
            return pluginCache.set(id, value);
        },
        delete: function (id) {
            result.used = true;
            return pluginCache.delete(id);
        }
    };
    return result;
}
var noCache = {
    has: function () {
        return false;
    },
    get: function () {
        return undefined;
    },
    set: function () { },
    delete: function () {
        return false;
    }
};
function uncacheablePluginError(pluginName) {
    if (!pluginName)
        error({
            code: 'ANONYMOUS_PLUGIN_CACHE',
            message: 'A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey.'
        });
    else
        error({
            code: 'DUPLICATE_PLUGIN_NAME',
            message: 'The plugin name ${pluginName} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).'
        });
}
var uncacheablePlugin = function (pluginName) { return ({
    has: function () {
        uncacheablePluginError(pluginName);
        return false;
    },
    get: function () {
        uncacheablePluginError(pluginName);
        return undefined;
    },
    set: function () {
        uncacheablePluginError(pluginName);
    },
    delete: function () {
        uncacheablePluginError(pluginName);
        return false;
    }
}); };

function transform(graph, source, module) {
    var id = module.id;
    var sourcemapChain = [];
    var originalSourcemap = typeof source.map === 'string' ? JSON.parse(source.map) : source.map;
    if (originalSourcemap && typeof originalSourcemap.mappings === 'string')
        originalSourcemap.mappings = decode(originalSourcemap.mappings);
    var baseEmitAsset = graph.pluginDriver.emitAsset;
    var originalCode = source.code;
    var ast = source.ast;
    var transformDependencies;
    var assets;
    var customTransformCache = false;
    var trackedPluginCache;
    var curSource = source.code;
    function transformReducer(code, result, plugin) {
        // track which plugins use the custom this.cache to opt-out of transform caching
        if (!customTransformCache && trackedPluginCache.used)
            customTransformCache = true;
        if (customTransformCache) {
            if (result && Array.isArray(result.dependencies)) {
                for (var _i = 0, _a = result.dependencies; _i < _a.length; _i++) {
                    var dep = _a[_i];
                    var depId = resolve(dirname(id), dep);
                    if (!graph.watchFiles[depId])
                        graph.watchFiles[depId] = true;
                }
            }
        }
        else {
            // assets emitted by transform are transformDependencies
            if (assets.length)
                module.transformAssets = assets;
            if (result && Array.isArray(result.dependencies)) {
                if (!transformDependencies)
                    transformDependencies = [];
                for (var _b = 0, _c = result.dependencies; _b < _c.length; _b++) {
                    var dep = _c[_b];
                    transformDependencies.push(resolve(dirname(id), dep));
                }
            }
        }
        if (result == null)
            return code;
        if (typeof result === 'string') {
            result = {
                code: result,
                ast: undefined,
                map: undefined
            };
        }
        else if (typeof result.map === 'string') {
            // `result.map` can only be a string if `result` isn't
            result.map = JSON.parse(result.map);
        }
        if (result.map && typeof result.map.mappings === 'string') {
            result.map.mappings = decode(result.map.mappings);
        }
        // strict null check allows 'null' maps to not be pushed to the chain, while 'undefined' gets the missing map warning
        if (result.map !== null) {
            sourcemapChain.push(result.map || { missing: true, plugin: plugin.name });
        }
        ast = result.ast;
        return result.code;
    }
    var setAssetSourceErr;
    return graph.pluginDriver
        .hookReduceArg0('transform', [curSource, id], transformReducer, function (pluginContext, plugin) {
        var _a;
        if (plugin.cacheKey)
            customTransformCache = true;
        else
            trackedPluginCache = trackPluginCache(pluginContext.cache);
        var emitAsset;
        (_a = createTransformEmitAsset(graph.assetsById, baseEmitAsset), assets = _a.assets, emitAsset = _a.emitAsset);
        return __assign({}, pluginContext, { cache: trackedPluginCache ? trackedPluginCache.cache : pluginContext.cache, warn: function (warning, pos) {
                if (typeof warning === 'string')
                    warning = { message: warning };
                if (pos)
                    augmentCodeLocation(warning, pos, curSource, id);
                if (warning.code)
                    warning.pluginCode = warning.code;
                warning.id = id;
                warning.code = 'PLUGIN_WARNING';
                warning.plugin = plugin.name || '(anonymous plugin)';
                warning.hook = 'transform';
                graph.warn(warning);
            },
            error: function (err, pos) {
                if (typeof err === 'string')
                    err = { message: err };
                if (pos)
                    augmentCodeLocation(err, pos, curSource, id);
                if (err.code)
                    err.pluginCode = err.code;
                err.id = id;
                err.code = 'PLUGIN_ERROR';
                err.plugin = plugin.name || '(anonymous plugin)';
                err.hook = 'transform';
                error(err);
            },
            emitAsset: emitAsset,
            setAssetSource: function (assetId, source) {
                pluginContext.setAssetSource(assetId, source);
                if (!customTransformCache && !setAssetSourceErr) {
                    try {
                        this.error({
                            code: 'INVALID_SETASSETSOURCE',
                            message: "setAssetSource cannot be called in transform for caching reasons. Use emitAsset with a source, or call setAssetSource in another hook."
                        });
                    }
                    catch (err) {
                        setAssetSourceErr = err;
                    }
                }
            } });
    })
        .catch(function (err) {
        if (typeof err === 'string')
            err = { message: err };
        if (err.code !== 'PLUGIN_ERROR') {
            if (err.code)
                err.pluginCode = err.code;
            err.code = 'PLUGIN_ERROR';
        }
        err.id = id;
        error(err);
    })
        .then(function (code) {
        if (!customTransformCache && setAssetSourceErr)
            throw setAssetSourceErr;
        return {
            code: code,
            transformDependencies: transformDependencies,
            originalCode: originalCode,
            originalSourcemap: originalSourcemap,
            ast: ast,
            sourcemapChain: sourcemapChain,
            customTransformCache: customTransformCache
        };
    });
}

function makeOnwarn() {
    var warned = Object.create(null);
    return function (warning) {
        var str = warning.toString();
        if (str in warned)
            return;
        console.error(str); //eslint-disable-line no-console
        warned[str] = true;
    };
}
var Graph = /** @class */ (function () {
    function Graph(options, watcher) {
        var _this = this;
        this.curChunkIndex = 0;
        this.externalModules = [];
        this.moduleById = new Map();
        this.assetsById = new Map();
        this.modules = [];
        this.watchFiles = Object.create(null);
        // track graph build status as each graph instance is used only once
        this.finished = false;
        this.curChunkIndex = 0;
        this.deoptimizationTracker = new EntityPathTracker();
        this.cachedModules = new Map();
        if (options.cache) {
            if (options.cache.modules)
                for (var _i = 0, _a = options.cache.modules; _i < _a.length; _i++) {
                    var module = _a[_i];
                    this.cachedModules.set(module.id, module);
                }
        }
        if (options.cache !== false) {
            this.pluginCache = (options.cache && options.cache.plugins) || Object.create(null);
            // increment access counter
            for (var name in this.pluginCache) {
                var cache = this.pluginCache[name];
                for (var _b = 0, _c = Object.keys(cache); _b < _c.length; _b++) {
                    var key = _c[_b];
                    cache[key][0]++;
                }
            }
        }
        this.cacheExpiry = options.experimentalCacheExpiry;
        if (!options.input) {
            throw new Error('You must supply options.input to rollup');
        }
        this.treeshake = options.treeshake !== false;
        if (this.treeshake) {
            this.treeshakingOptions = {
                propertyReadSideEffects: options.treeshake
                    ? options.treeshake.propertyReadSideEffects !== false
                    : true,
                pureExternalModules: options.treeshake
                    ? options.treeshake.pureExternalModules
                    : false
            };
            if (this.treeshakingOptions.pureExternalModules === true) {
                this.isPureExternalModule = function () { return true; };
            }
            else if (typeof this.treeshakingOptions.pureExternalModules === 'function') {
                this.isPureExternalModule = this.treeshakingOptions.pureExternalModules;
            }
            else if (Array.isArray(this.treeshakingOptions.pureExternalModules)) {
                var pureExternalModules_1 = new Set(this.treeshakingOptions.pureExternalModules);
                this.isPureExternalModule = function (id) { return pureExternalModules_1.has(id); };
            }
            else {
                this.isPureExternalModule = function () { return false; };
            }
        }
        else {
            this.isPureExternalModule = function () { return false; };
        }
        this.contextParse = function (code, options) {
            if (options === void 0) { options = {}; }
            return _this.acornParse(code, __assign({}, defaultAcornOptions, options, _this.acornOptions));
        };
        this.pluginDriver = createPluginDriver(this, options, this.pluginCache, watcher);
        if (watcher)
            watcher.on('change', function (id) { return _this.pluginDriver.hookSeqSync('watchChange', [id]); });
        if (typeof options.external === 'function') {
            var external_1 = options.external;
            this.isExternal = function (id, parentId, isResolved) {
                return !id.startsWith('\0') && external_1(id, parentId, isResolved);
            };
        }
        else {
            var external = options.external;
            var ids_1 = new Set(Array.isArray(external) ? external : external ? [external] : []);
            this.isExternal = function (id) { return ids_1.has(id); };
        }
        this.shimMissingExports = options.shimMissingExports;
        this.scope = new GlobalScope();
        // TODO strictly speaking, this only applies with non-ES6, non-default-only bundles
        for (var _d = 0, _e = ['module', 'exports', '_interopDefault']; _d < _e.length; _d++) {
            var name = _e[_d];
            this.scope.findVariable(name); // creates global variable as side-effect
        }
        this.exportShimVariable = this.scope.findVariable('_missingExportShim');
        this.context = String(options.context);
        var optionsModuleContext = options.moduleContext;
        if (typeof optionsModuleContext === 'function') {
            this.getModuleContext = function (id) { return optionsModuleContext(id) || _this.context; };
        }
        else if (typeof optionsModuleContext === 'object') {
            var moduleContext_1 = new Map();
            for (var key in optionsModuleContext) {
                moduleContext_1.set(resolve(key), optionsModuleContext[key]);
            }
            this.getModuleContext = function (id) { return moduleContext_1.get(id) || _this.context; };
        }
        else {
            this.getModuleContext = function () { return _this.context; };
        }
        this.onwarn = options.onwarn || makeOnwarn();
        this.varOrConst = options.preferConst ? 'const' : 'var';
        this.acornOptions = options.acorn || {};
        var acornPluginsToInject = [];
        acornPluginsToInject.push(injectDynamicImportPlugin);
        acornPluginsToInject.push(inject$1);
        this.acornOptions.plugins = this.acornOptions.plugins || {};
        this.acornOptions.plugins.dynamicImport = true;
        this.acornOptions.plugins.importMeta = true;
        if (options.experimentalTopLevelAwait) {
            this.acornOptions.allowAwaitOutsideFunction = true;
        }
        var acornInjectPlugins = options.acornInjectPlugins;
        acornPluginsToInject.push.apply(acornPluginsToInject, (Array.isArray(acornInjectPlugins)
            ? acornInjectPlugins
            : acornInjectPlugins
                ? [acornInjectPlugins]
                : []));
        this.acornParse = acornPluginsToInject.reduce(function (acc, plugin) { return plugin(acc); }, acorn).parse;
    }
    Graph.prototype.getCache = function () {
        // handle plugin cache eviction
        for (var name in this.pluginCache) {
            var cache = this.pluginCache[name];
            var allDeleted = true;
            for (var _i = 0, _a = Object.keys(cache); _i < _a.length; _i++) {
                var key = _a[_i];
                if (cache[key][0] >= this.cacheExpiry)
                    delete cache[key];
                else
                    allDeleted = false;
            }
            if (allDeleted)
                delete this.pluginCache[name];
        }
        return {
            modules: this.modules.map(function (module) { return module.toJSON(); }),
            plugins: this.pluginCache
        };
    };
    Graph.prototype.finaliseAssets = function (assetFileNames) {
        var outputBundle = Object.create(null);
        this.assetsById.forEach(function (asset) {
            if (asset.source !== undefined)
                finaliseAsset(asset, outputBundle, assetFileNames);
        });
        return outputBundle;
    };
    Graph.prototype.loadModule = function (entryName) {
        var _this = this;
        return this.pluginDriver
            .hookFirst('resolveId', [entryName, undefined])
            .then(function (id) {
            if (id === false) {
                error({
                    code: 'UNRESOLVED_ENTRY',
                    message: "Entry module cannot be external"
                });
            }
            if (id == null) {
                error({
                    code: 'UNRESOLVED_ENTRY',
                    message: "Could not resolve entry (" + entryName + ")"
                });
            }
            return _this.fetchModule(id, undefined);
        });
    };
    Graph.prototype.link = function () {
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var module = _a[_i];
            module.linkDependencies();
        }
        for (var _b = 0, _c = this.modules; _b < _c.length; _b++) {
            var module = _c[_b];
            module.bindReferences();
        }
    };
    Graph.prototype.includeMarked = function (modules) {
        if (this.treeshake) {
            var needsTreeshakingPass = void 0, treeshakingPass = 1;
            do {
                timeStart("treeshaking pass " + treeshakingPass, 3);
                needsTreeshakingPass = false;
                for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
                    var module = modules_1[_i];
                    if (module.include()) {
                        needsTreeshakingPass = true;
                    }
                }
                timeEnd("treeshaking pass " + treeshakingPass++, 3);
            } while (needsTreeshakingPass);
        }
        else {
            // Necessary to properly replace namespace imports
            for (var _a = 0, modules_2 = modules; _a < modules_2.length; _a++) {
                var module = modules_2[_a];
                module.includeAllInBundle();
            }
        }
    };
    Graph.prototype.loadEntryModules = function (entryModules, manualChunks) {
        var _this = this;
        var removeAliasExtensions = false;
        var entryModuleIds;
        var entryModuleAliases;
        if (typeof entryModules === 'string')
            entryModules = [entryModules];
        if (Array.isArray(entryModules)) {
            removeAliasExtensions = true;
            entryModuleAliases = entryModules.concat([]);
            entryModuleIds = entryModules;
        }
        else {
            entryModuleAliases = Object.keys(entryModules);
            entryModuleIds = entryModuleAliases.map(function (name) { return entryModules[name]; });
        }
        var entryAndManualChunkIds = entryModuleIds.concat([]);
        if (manualChunks) {
            Object.keys(manualChunks).forEach(function (name) {
                var manualChunkIds = manualChunks[name];
                manualChunkIds.forEach(function (id) {
                    if (entryAndManualChunkIds.indexOf(id) === -1)
                        entryAndManualChunkIds.push(id);
                });
            });
        }
        return Promise.all(entryAndManualChunkIds.map(function (id) { return _this.loadModule(id); })).then(function (entryAndChunkModules) {
            if (removeAliasExtensions) {
                for (var i = 0; i < entryModuleAliases.length; i++)
                    entryModuleAliases[i] = getAliasName(entryAndChunkModules[i].id, entryModuleAliases[i]);
            }
            var entryModules = entryAndChunkModules.slice(0, entryModuleIds.length);
            var manualChunkModules;
            if (manualChunks) {
                manualChunkModules = {};
                for (var _i = 0, _a = Object.keys(manualChunks); _i < _a.length; _i++) {
                    var chunkName = _a[_i];
                    var chunk = manualChunks[chunkName];
                    manualChunkModules[chunkName] = chunk.map(function (entryId) {
                        var entryIndex = entryAndManualChunkIds.indexOf(entryId);
                        return entryAndChunkModules[entryIndex];
                    });
                }
            }
            return { entryModules: entryModules, entryModuleAliases: entryModuleAliases, manualChunkModules: manualChunkModules };
        });
    };
    Graph.prototype.build = function (entryModules, manualChunks, inlineDynamicImports, preserveModules) {
        // Phase 1 – discovery. We load the entry module and find which
        // modules it imports, and import those, until we have all
        // of the entry module's dependencies
        var _this = this;
        timeStart('parse modules', 2);
        return this.loadEntryModules(entryModules, manualChunks).then(function (_a) {
            var entryModules = _a.entryModules, entryModuleAliases = _a.entryModuleAliases, manualChunkModules = _a.manualChunkModules;
            timeEnd('parse modules', 2);
            // Phase 2 - linking. We populate the module dependency links and
            // determine the topological execution order for the bundle
            timeStart('analyse dependency graph', 2);
            for (var i = 0; i < entryModules.length; i++) {
                var entryModule = entryModules[i];
                var duplicateIndex = entryModules.indexOf(entryModule, i + 1);
                if (duplicateIndex !== -1) {
                    error({
                        code: 'DUPLICATE_ENTRY_POINTS',
                        message: "Duplicate entry points detected. The input entries " + entryModuleAliases[i] + " and " + entryModuleAliases[duplicateIndex] + " both point to the same module, " + entryModule.id
                    });
                }
            }
            _this.link();
            var _b = _this.analyseExecution(entryModules, !preserveModules && !inlineDynamicImports, inlineDynamicImports, manualChunkModules), orderedModules = _b.orderedModules, dynamicImports = _b.dynamicImports, dynamicImportAliases = _b.dynamicImportAliases;
            if (entryModuleAliases) {
                for (var i = entryModules.length - 1; i >= 0; i--) {
                    entryModules[i].chunkAlias = entryModuleAliases[i];
                }
            }
            if (inlineDynamicImports) {
                var entryModule = entryModules[0];
                if (entryModules.length > 1)
                    throw new Error('Internal Error: can only inline dynamic imports for single-file builds.');
                for (var _i = 0, dynamicImports_1 = dynamicImports; _i < dynamicImports_1.length; _i++) {
                    var dynamicImportModule = dynamicImports_1[_i];
                    if (entryModule !== dynamicImportModule)
                        dynamicImportModule.markPublicExports();
                    dynamicImportModule.getOrCreateNamespace().include();
                }
            }
            else {
                for (var i = 0; i < dynamicImports.length; i++) {
                    var dynamicImportModule = dynamicImports[i];
                    if (entryModules.indexOf(dynamicImportModule) === -1) {
                        entryModules.push(dynamicImportModule);
                        if (!dynamicImportModule.chunkAlias)
                            dynamicImportModule.chunkAlias = dynamicImportAliases[i];
                    }
                }
            }
            timeEnd('analyse dependency graph', 2);
            // Phase 3 – marking. We include all statements that should be included
            timeStart('mark included statements', 2);
            for (var _c = 0, entryModules_1 = entryModules; _c < entryModules_1.length; _c++) {
                var entryModule = entryModules_1[_c];
                entryModule.markPublicExports();
            }
            // only include statements that should appear in the bundle
            _this.includeMarked(orderedModules);
            // check for unused external imports
            for (var _d = 0, _e = _this.externalModules; _d < _e.length; _d++) {
                var externalModule = _e[_d];
                externalModule.warnUnusedImports();
            }
            timeEnd('mark included statements', 2);
            // Phase 4 – we construct the chunks, working out the optimal chunking using
            // entry point graph colouring, before generating the import and export facades
            timeStart('generate chunks', 2);
            // TODO: there is one special edge case unhandled here and that is that any module
            //       exposed as an unresolvable export * (to a graph external export *,
            //       either as a namespace import reexported or top-level export *)
            //       should be made to be its own entry point module before chunking
            var chunkList = [];
            if (!preserveModules) {
                var chunkModules = {};
                for (var _f = 0, orderedModules_1 = orderedModules; _f < orderedModules_1.length; _f++) {
                    var module = orderedModules_1[_f];
                    var entryPointsHashStr = Uint8ArrayToHexString(module.entryPointsHash);
                    var curChunk = chunkModules[entryPointsHashStr];
                    if (curChunk) {
                        curChunk.push(module);
                    }
                    else {
                        chunkModules[entryPointsHashStr] = [module];
                    }
                }
                // create each chunk
                for (var entryHashSum in chunkModules) {
                    var chunkModuleList = chunkModules[entryHashSum];
                    var chunkModulesOrdered = chunkModuleList.sort(function (moduleA, moduleB) { return (moduleA.execIndex > moduleB.execIndex ? 1 : -1); });
                    var chunk = new Chunk$1(_this, chunkModulesOrdered);
                    chunkList.push(chunk);
                }
            }
            else {
                for (var _g = 0, orderedModules_2 = orderedModules; _g < orderedModules_2.length; _g++) {
                    var module = orderedModules_2[_g];
                    var chunkInstance = new Chunk$1(_this, [module]);
                    if (module.isEntryPoint || !chunkInstance.isEmpty)
                        chunkInstance.entryModule = module;
                    chunkList.push(chunkInstance);
                }
            }
            // for each chunk module, set up its imports to other
            // chunks, if those variables are included after treeshaking
            for (var _h = 0, chunkList_1 = chunkList; _h < chunkList_1.length; _h++) {
                var chunk = chunkList_1[_h];
                chunk.link();
            }
            // filter out empty dependencies
            chunkList = chunkList.filter(function (chunk) { return !chunk.isEmpty || chunk.entryModule || chunk.isManualChunk; });
            // then go over and ensure all entry chunks export their variables
            for (var _j = 0, chunkList_2 = chunkList; _j < chunkList_2.length; _j++) {
                var chunk = chunkList_2[_j];
                if (preserveModules || chunk.entryModule) {
                    chunk.populateEntryExports(preserveModules);
                }
            }
            // create entry point facades for entry module chunks that have tainted exports
            if (!preserveModules) {
                for (var _k = 0, entryModules_2 = entryModules; _k < entryModules_2.length; _k++) {
                    var entryModule = entryModules_2[_k];
                    if (!entryModule.chunk.isEntryModuleFacade) {
                        var entryPointFacade = new Chunk$1(_this, []);
                        entryPointFacade.linkFacade(entryModule);
                        chunkList.push(entryPointFacade);
                    }
                }
            }
            timeEnd('generate chunks', 2);
            _this.finished = true;
            return chunkList;
        });
    };
    Graph.prototype.analyseExecution = function (entryModules, graphColouring, inlineDynamicImports, chunkModules) {
        var _this = this;
        var _a, _b, _c;
        var curEntry, curEntryHash;
        var allSeen = {};
        var orderedModules = [];
        var dynamicImports = [];
        var dynamicImportAliases = [];
        var parents;
        var visit = function (module) {
            // Track entry point graph colouring by tracing all modules loaded by a given
            // entry point and colouring those modules by the hash of its id. Colours are mixed as
            // hash xors, providing the unique colouring of the graph into unique hash chunks.
            // This is really all there is to automated chunking, the rest is chunk wiring.
            if (graphColouring) {
                if (!curEntry.chunkAlias) {
                    Uint8ArrayXor(module.entryPointsHash, curEntryHash);
                }
                else {
                    // manual chunks are indicated in this phase by having a chunk alias
                    // they are treated as a single colour in the colouring
                    // and aren't divisable by future colourings
                    module.chunkAlias = curEntry.chunkAlias;
                    module.entryPointsHash = curEntryHash;
                }
            }
            for (var _i = 0, _a = module.dependencies; _i < _a.length; _i++) {
                var depModule = _a[_i];
                if (depModule instanceof ExternalModule)
                    continue;
                if (depModule.id in parents) {
                    if (!allSeen[depModule.id]) {
                        _this.warnCycle(depModule.id, module.id, parents);
                    }
                    continue;
                }
                parents[depModule.id] = module.id;
                if (!depModule.isEntryPoint && !depModule.chunkAlias)
                    visit(depModule);
            }
            for (var _b = 0, _c = module.dynamicImportResolutions; _b < _c.length; _b++) {
                var dynamicModule = _c[_b];
                if (!(dynamicModule.resolution instanceof Module))
                    continue;
                // If the parent module of a dynamic import is to a child module whose graph
                // colouring is the same as the parent module, then that dynamic import does
                // not need to be treated as a new entry point as it is in the static graph
                if (!graphColouring ||
                    (!dynamicModule.resolution.chunkAlias &&
                        !Uint8ArrayEqual(dynamicModule.resolution.entryPointsHash, curEntry.entryPointsHash))) {
                    if (dynamicImports.indexOf(dynamicModule.resolution) === -1) {
                        dynamicImports.push(dynamicModule.resolution);
                        dynamicImportAliases.push(dynamicModule.alias);
                    }
                }
            }
            if (allSeen[module.id])
                return;
            allSeen[module.id] = true;
            module.execIndex = orderedModules.length;
            orderedModules.push(module);
        };
        if (graphColouring && chunkModules) {
            for (var _i = 0, _d = Object.keys(chunkModules); _i < _d.length; _i++) {
                var chunkName = _d[_i];
                curEntryHash = randomUint8Array(10);
                for (var _e = 0, _f = chunkModules[chunkName]; _e < _f.length; _e++) {
                    curEntry = _f[_e];
                    if (curEntry.chunkAlias) {
                        error({
                            code: 'INVALID_CHUNK',
                            message: "Cannot assign " + relative(process.cwd(), curEntry.id) + " to the \"" + chunkName + "\" chunk as it is already in the \"" + curEntry.chunkAlias + "\" chunk.\nTry defining \"" + chunkName + "\" first in the manualChunks definitions of the Rollup configuration."
                        });
                    }
                    curEntry.chunkAlias = chunkName;
                    parents = (_a = {}, _a[curEntry.id] = null, _a);
                    visit(curEntry);
                }
            }
        }
        for (var _g = 0, entryModules_3 = entryModules; _g < entryModules_3.length; _g++) {
            curEntry = entryModules_3[_g];
            curEntry.isEntryPoint = true;
            curEntryHash = randomUint8Array(10);
            parents = (_b = {}, _b[curEntry.id] = null, _b);
            visit(curEntry);
        }
        // new items can be added during this loop
        for (var _h = 0, dynamicImports_2 = dynamicImports; _h < dynamicImports_2.length; _h++) {
            curEntry = dynamicImports_2[_h];
            if (curEntry.isEntryPoint)
                continue;
            if (!inlineDynamicImports)
                curEntry.isEntryPoint = true;
            curEntryHash = randomUint8Array(10);
            parents = (_c = {}, _c[curEntry.id] = null, _c);
            visit(curEntry);
        }
        return { orderedModules: orderedModules, dynamicImports: dynamicImports, dynamicImportAliases: dynamicImportAliases };
    };
    Graph.prototype.warnCycle = function (id, parentId, parents) {
        var path$$1 = [relativeId(id)];
        var curId = parentId;
        while (curId !== id) {
            path$$1.push(relativeId(curId));
            curId = parents[curId];
            if (!curId)
                break;
        }
        path$$1.push(path$$1[0]);
        path$$1.reverse();
        this.warn({
            code: 'CIRCULAR_DEPENDENCY',
            importer: path$$1[0],
            message: "Circular dependency: " + path$$1.join(' -> ')
        });
    };
    Graph.prototype.fetchModule = function (id, importer) {
        var _this = this;
        // short-circuit cycles
        var existingModule = this.moduleById.get(id);
        if (existingModule) {
            if (existingModule.isExternal)
                throw new Error("Cannot fetch external module " + id);
            return Promise.resolve(existingModule);
        }
        var module = new Module(this, id);
        this.moduleById.set(id, module);
        this.watchFiles[id] = true;
        timeStart('load modules', 3);
        return Promise.resolve(this.pluginDriver.hookFirst('load', [id]))
            .catch(function (err) {
            timeEnd('load modules', 3);
            var msg = "Could not load " + id;
            if (importer)
                msg += " (imported by " + importer + ")";
            msg += ": " + err.message;
            throw new Error(msg);
        })
            .then(function (source) {
            timeEnd('load modules', 3);
            if (typeof source === 'string')
                return source;
            if (source && typeof source === 'object' && typeof source.code === 'string')
                return source;
            // TODO report which plugin failed
            error({
                code: 'BAD_LOADER',
                message: "Error loading " + relativeId(id) + ": plugin load hook should return a string, a { code, map } object, or nothing/null"
            });
        })
            .then(function (source) {
            var sourceDescription = typeof source === 'string'
                ? {
                    code: source,
                    ast: null
                }
                : source;
            var cachedModule = _this.cachedModules.get(id);
            if (cachedModule &&
                !cachedModule.customTransformCache &&
                cachedModule.originalCode === sourceDescription.code) {
                // re-emit transform assets
                if (cachedModule.transformAssets) {
                    for (var _i = 0, _a = cachedModule.transformAssets; _i < _a.length; _i++) {
                        var asset = _a[_i];
                        _this.pluginDriver.emitAsset(asset.name, asset.source);
                    }
                }
                return cachedModule;
            }
            return transform(_this, sourceDescription, module);
        })
            .then(function (source) {
            module.setSource(source);
            _this.modules.push(module);
            _this.moduleById.set(id, module);
            return _this.fetchAllDependencies(module).then(function () {
                for (var name in module.exports) {
                    if (name !== 'default') {
                        module.exportsAll[name] = module.id;
                    }
                }
                module.exportAllSources.forEach(function (source) {
                    var id = module.resolvedIds[source];
                    var exportAllModule = _this.moduleById.get(id);
                    if (exportAllModule.isExternal)
                        return;
                    for (var name in exportAllModule.exportsAll) {
                        if (name in module.exportsAll) {
                            _this.warn({
                                code: 'NAMESPACE_CONFLICT',
                                reexporter: module.id,
                                name: name,
                                sources: [module.exportsAll[name], exportAllModule.exportsAll[name]],
                                message: "Conflicting namespaces: " + relativeId(module.id) + " re-exports '" + name + "' from both " + relativeId(module.exportsAll[name]) + " and " + relativeId(exportAllModule.exportsAll[name]) + " (will be ignored)"
                            });
                        }
                        else {
                            module.exportsAll[name] = exportAllModule.exportsAll[name];
                        }
                    }
                });
                return module;
            });
        });
    };
    Graph.prototype.fetchAllDependencies = function (module) {
        var _this = this;
        // resolve and fetch dynamic imports where possible
        var fetchDynamicImportsPromise = Promise.all(module.getDynamicImportExpressions().map(function (dynamicImportExpression, index) {
            return Promise.resolve(_this.pluginDriver.hookFirst('resolveDynamicImport', [dynamicImportExpression, module.id])).then(function (replacement) {
                if (!replacement) {
                    module.dynamicImportResolutions[index] = {
                        alias: undefined,
                        resolution: undefined
                    };
                    return;
                }
                var alias = getAliasName(replacement, typeof dynamicImportExpression === 'string' ? dynamicImportExpression : undefined);
                if (typeof dynamicImportExpression !== 'string') {
                    module.dynamicImportResolutions[index] = { alias: alias, resolution: replacement };
                }
                else if (_this.isExternal(replacement, module.id, true)) {
                    var externalModule = void 0;
                    if (!_this.moduleById.has(replacement)) {
                        externalModule = new ExternalModule({
                            graph: _this,
                            id: replacement
                        });
                        _this.externalModules.push(externalModule);
                        _this.moduleById.set(replacement, module);
                    }
                    else {
                        externalModule = _this.moduleById.get(replacement);
                    }
                    module.dynamicImportResolutions[index] = { alias: alias, resolution: externalModule };
                    externalModule.exportsNamespace = true;
                }
                else {
                    return _this.fetchModule(replacement, module.id).then(function (depModule) {
                        module.dynamicImportResolutions[index] = { alias: alias, resolution: depModule };
                    });
                }
            });
        })).then(function () { });
        fetchDynamicImportsPromise.catch(function () { });
        return Promise.all(module.sources.map(function (source) {
            return Promise.resolve()
                .then(function () {
                var resolvedId = module.resolvedIds[source];
                if (resolvedId)
                    return resolvedId;
                var isExternal = _this.isExternal(source, module.id, false);
                if (isExternal)
                    return false;
                return _this.pluginDriver.hookFirst('resolveId', [
                    source,
                    module.id
                ]);
            })
                .then(function (resolvedId) {
                // TODO types of `resolvedId` are not compatable with 'externalId'.
                // `this.resolveId` returns `string`, `void`, and `boolean`
                var externalId = resolvedId ||
                    (isRelative(source) ? resolve(module.id, '..', source) : source);
                var isExternal = resolvedId === false || _this.isExternal(externalId, module.id, true);
                if (!resolvedId && !isExternal) {
                    if (isRelative(source)) {
                        error({
                            code: 'UNRESOLVED_IMPORT',
                            message: "Could not resolve '" + source + "' from " + relativeId(module.id)
                        });
                    }
                    if (resolvedId !== false) {
                        _this.warn({
                            code: 'UNRESOLVED_IMPORT',
                            source: source,
                            importer: relativeId(module.id),
                            message: "'" + source + "' is imported by " + relativeId(module.id) + ", but could not be resolved \u2013 treating it as an external dependency",
                            url: 'https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency'
                        });
                    }
                    isExternal = true;
                }
                if (isExternal) {
                    module.resolvedIds[source] = externalId;
                    if (!_this.moduleById.has(externalId)) {
                        var module_1 = new ExternalModule({ graph: _this, id: externalId });
                        _this.externalModules.push(module_1);
                        _this.moduleById.set(externalId, module_1);
                    }
                    var externalModule = _this.moduleById.get(externalId);
                    if (externalModule instanceof ExternalModule === false) {
                        error({
                            code: 'INVALID_EXTERNAL_ID',
                            message: "'" + source + "' is imported as an external by " + relativeId(module.id) + ", but is already an existing non-external module id."
                        });
                    }
                    // add external declarations so we can detect which are never used
                    for (var name in module.imports) {
                        var importDeclaration = module.imports[name];
                        if (importDeclaration.source !== source)
                            return;
                        externalModule.traceExport(importDeclaration.name);
                    }
                }
                else {
                    module.resolvedIds[source] = resolvedId;
                    return _this.fetchModule(resolvedId, module.id);
                }
            });
        })).then(function () { return fetchDynamicImportsPromise; });
    };
    Graph.prototype.warn = function (warning) {
        warning.toString = function () {
            var str = '';
            if (warning.plugin)
                str += "(" + warning.plugin + " plugin) ";
            if (warning.loc)
                str += relativeId(warning.loc.file) + " (" + warning.loc.line + ":" + warning.loc.column + ") ";
            str += warning.message;
            return str;
        };
        this.onwarn(warning);
    };
    return Graph;
}());

function evalIfFn(strOrFn) {
    switch (typeof strOrFn) {
        case 'function':
            return strOrFn();
        case 'string':
            return strOrFn;
        default:
            return '';
    }
}
var concatSep = function (out, next) { return (next ? out + "\n" + next : out); };
var concatDblSep = function (out, next) { return (next ? out + "\n\n" + next : out); };
function createAddons(graph, options) {
    var pluginDriver = graph.pluginDriver;
    return Promise.all([
        pluginDriver.hookReduceValue('banner', evalIfFn(options.banner), [], concatSep),
        pluginDriver.hookReduceValue('footer', evalIfFn(options.footer), [], concatSep),
        pluginDriver.hookReduceValue('intro', evalIfFn(options.intro), [], concatDblSep),
        pluginDriver.hookReduceValue('outro', evalIfFn(options.outro), [], concatDblSep)
    ])
        .then(function (_a) {
        var banner = _a[0], footer = _a[1], intro = _a[2], outro = _a[3];
        if (intro)
            intro += '\n\n';
        if (outro)
            outro = "\n\n" + outro;
        if (banner.length)
            banner += '\n';
        if (footer.length)
            footer = '\n' + footer;
        var hash = new Uint8Array(4);
        return { intro: intro, outro: outro, banner: banner, footer: footer, hash: hash };
    })
        .catch(function (err) {
        error({
            code: 'ADDON_ERROR',
            message: "Could not retrieve " + err.hook + ". Check configuration of " + err.plugin + ".\n\tError Message: " + err.message
        });
    });
}

// ported from https://github.com/substack/node-commondir
function commondir(files) {
    if (files.length === 1)
        return dirname(files[0]);
    var commonSegments = files.slice(1).reduce(function (commonSegments, file) {
        var pathSegements = file.split(/\/+|\\+/);
        var i;
        for (i = 0; commonSegments[i] === pathSegements[i] &&
            i < Math.min(commonSegments.length, pathSegements.length); i++)
            ;
        return commonSegments.slice(0, i);
    }, files[0].split(/\/+|\\+/));
    // Windows correctly handles paths with forward-slashes
    return commonSegments.length > 1 ? commonSegments.join('/') : '/';
}

function badExports(option, keys) {
    error({
        code: 'INVALID_EXPORT_OPTION',
        message: "'" + option + "' was specified for output.exports, but entry module has following exports: " + keys.join(', ')
    });
}
function getExportMode(chunk, _a) {
    var exportMode = _a.exports, name = _a.name, format = _a.format;
    var exportKeys = chunk.getExportNames();
    if (exportMode === 'default') {
        if (exportKeys.length !== 1 || exportKeys[0] !== 'default') {
            badExports('default', exportKeys);
        }
    }
    else if (exportMode === 'none' && exportKeys.length) {
        badExports('none', exportKeys);
    }
    if (!exportMode || exportMode === 'auto') {
        if (exportKeys.length === 0) {
            exportMode = 'none';
        }
        else if (exportKeys.length === 1 && exportKeys[0] === 'default') {
            exportMode = 'default';
        }
        else {
            if (chunk.isEntryModuleFacade && format !== 'es' && exportKeys.indexOf('default') !== -1) {
                chunk.graph.warn({
                    code: 'MIXED_EXPORTS',
                    message: "Using named and default exports together. Consumers of your bundle will have to use " + (name ||
                        'bundle') + "['default'] to access the default export, which may not be what you want. Use `exports: 'named'` to disable this warning",
                    url: "https://rollupjs.org/#exports"
                });
            }
            exportMode = 'named';
        }
    }
    if (!/(?:default|named|none)/.test(exportMode)) {
        error({
            code: 'INVALID_EXPORT_OPTION',
            message: "output.exports must be 'default', 'named', 'none', 'auto', or left unspecified (defaults to 'auto')"
        });
    }
    return exportMode;
}

function deprecateOptions(options, deprecateConfig) {
    var deprecations = [];
    if (deprecateConfig.input)
        deprecateInputOptions();
    if (deprecateConfig.output)
        deprecateOutputOptions();
    return deprecations;
    function deprecateInputOptions() {
        if (!options.input && options.entry)
            deprecate('entry', 'input');
        if (options.dest)
            deprecateToOutputOption('dest', 'file');
        if (options.moduleName)
            deprecateToOutputOption('moduleName', 'name');
        if (options.name)
            deprecateToOutputOption('name', 'name');
        if (options.extend)
            deprecateToOutputOption('extend', 'extend');
        if (options.globals)
            deprecateToOutputOption('globals', 'globals');
        if (options.indent)
            deprecateToOutputOption('indent', 'indent');
        if (options.noConflict)
            deprecateToOutputOption('noConflict', 'noConflict');
        if (options.paths)
            deprecateToOutputOption('paths', 'paths');
        if (options.sourcemap)
            deprecateToOutputOption('sourcemap', 'sourcemap');
        if (options.sourceMap)
            deprecateToOutputOption('sourceMap', 'sourcemap');
        if (options.sourceMapFile)
            deprecateToOutputOption('sourceMapFile', 'sourcemapFile');
        if (options.useStrict)
            deprecateToOutputOption('useStrict', 'strict');
        if (options.strict)
            deprecateToOutputOption('strict', 'strict');
        if (options.format)
            deprecateToOutputOption('format', 'format');
        if (options.banner)
            deprecateToOutputOption('banner', 'banner');
        if (options.footer)
            deprecateToOutputOption('footer', 'footer');
        if (options.intro)
            deprecateToOutputOption('intro', 'intro');
        if (options.outro)
            deprecateToOutputOption('outro', 'outro');
        if (options.interop)
            deprecateToOutputOption('interop', 'interop');
        if (options.freeze)
            deprecateToOutputOption('freeze', 'freeze');
        if (options.exports)
            deprecateToOutputOption('exports', 'exports');
        if (options.targets) {
            deprecations.push({ old: 'targets', new: 'output' });
            // as targets is an array and we need to merge other output options
            // like sourcemap etc.
            options.output = options.targets.map(function (target) { return (__assign({}, target, options.output)); });
            delete options.targets;
            var deprecatedDest_1 = false;
            options.output.forEach(function (outputEntry) {
                if (outputEntry.dest) {
                    if (!deprecatedDest_1) {
                        deprecations.push({ old: 'targets.dest', new: 'output.file' });
                        deprecatedDest_1 = true;
                    }
                    outputEntry.file = outputEntry.dest;
                    delete outputEntry.dest;
                }
            });
        }
        if (options.pureExternalModules) {
            deprecations.push({
                old: 'pureExternalModules',
                new: 'treeshake.pureExternalModules'
            });
            if (options.treeshake === undefined) {
                options.treeshake = {};
            }
            if (options.treeshake) {
                options.treeshake.pureExternalModules = options.pureExternalModules;
            }
            delete options.pureExternalModules;
        }
    }
    function deprecateOutputOptions() {
        if (options.output && options.output.moduleId) {
            options.output.amd = { id: options.moduleId };
            deprecations.push({ old: 'moduleId', new: 'amd' });
            delete options.output.moduleId;
        }
    }
    function deprecate(oldOption, newOption) {
        deprecations.push({ new: newOption, old: oldOption });
        if (!(newOption in options)) {
            options[newOption] = options[oldOption];
        }
        delete options[oldOption];
    }
    function deprecateToOutputOption(oldOption, newOption) {
        deprecations.push({ new: "output." + newOption, old: oldOption });
        options.output = options.output || {};
        if (!(newOption in options.output)) {
            options.output[newOption] = options[oldOption];
        }
        delete options[oldOption];
    }
}

var createGetOption = function (config, command) { return function (name, defaultValue) {
    return command[name] !== undefined
        ? command[name]
        : config[name] !== undefined
            ? config[name]
            : defaultValue;
}; };
var normalizeObjectOptionValue = function (optionValue) {
    if (!optionValue) {
        return optionValue;
    }
    if (typeof optionValue !== 'object') {
        return {};
    }
    return optionValue;
};
var getObjectOption = function (config, command, name) {
    var commandOption = normalizeObjectOptionValue(command[name]);
    var configOption = normalizeObjectOptionValue(config[name]);
    if (commandOption !== undefined) {
        return commandOption && configOption ? __assign({}, configOption, commandOption) : commandOption;
    }
    return configOption;
};
var defaultOnWarn = function (warning) {
    if (typeof warning === 'string') {
        console.warn(warning); // eslint-disable-line no-console
    }
    else {
        console.warn(warning.message); // eslint-disable-line no-console
    }
};
var getOnWarn = function (config, command, defaultOnWarnHandler) {
    if (defaultOnWarnHandler === void 0) { defaultOnWarnHandler = defaultOnWarn; }
    return command.silent
        ? function () { }
        : config.onwarn
            ? function (warning) { return config.onwarn(warning, defaultOnWarnHandler); }
            : defaultOnWarnHandler;
};
var getExternal = function (config, command) {
    var configExternal = config.external;
    return typeof configExternal === 'function'
        ? function (id) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            return configExternal.apply(void 0, [id].concat(rest)) || command.external.indexOf(id) !== -1;
        }
        : (configExternal || []).concat(command.external);
};
var commandAliases = {
    c: 'config',
    e: 'external',
    f: 'format',
    g: 'globals',
    h: 'help',
    i: 'input',
    m: 'sourcemap',
    n: 'name',
    o: 'file',
    v: 'version',
    w: 'watch'
};
function mergeOptions(_a) {
    var _b = _a.config, config = _b === void 0 ? {} : _b, _c = _a.command, rawCommandOptions = _c === void 0 ? {} : _c, deprecateConfig = _a.deprecateConfig, defaultOnWarnHandler = _a.defaultOnWarnHandler;
    var deprecations = deprecate(config, rawCommandOptions, deprecateConfig);
    var command = getCommandOptions(rawCommandOptions);
    var inputOptions = getInputOptions(config, command, defaultOnWarnHandler);
    if (command.output) {
        Object.assign(command, command.output);
    }
    var output = config.output;
    var normalizedOutputOptions = Array.isArray(output) ? output : output ? [output] : [];
    if (normalizedOutputOptions.length === 0)
        normalizedOutputOptions.push({});
    var outputOptions = normalizedOutputOptions.map(function (singleOutputOptions) {
        return getOutputOptions(singleOutputOptions, command);
    });
    var unknownOptionErrors = [];
    var validInputOptions = Object.keys(inputOptions);
    addUnknownOptionErrors(unknownOptionErrors, Object.keys(config), validInputOptions, 'input option', /^output$/);
    var validOutputOptions = Object.keys(outputOptions[0]);
    addUnknownOptionErrors(unknownOptionErrors, outputOptions.reduce(function (allKeys, options) { return allKeys.concat(Object.keys(options)); }, []), validOutputOptions, 'output option');
    addUnknownOptionErrors(unknownOptionErrors, Object.keys(command), validInputOptions.concat(validOutputOptions, Object.keys(commandAliases), 'config', 'environment', 'silent'), 'CLI flag', /^_|output|(config.*)$/);
    return {
        inputOptions: inputOptions,
        outputOptions: outputOptions,
        deprecations: deprecations,
        optionError: unknownOptionErrors.length > 0 ? unknownOptionErrors.join('\n') : null
    };
}
function addUnknownOptionErrors(errors, options, validOptions, optionType, ignoredKeys) {
    if (ignoredKeys === void 0) { ignoredKeys = /$./; }
    var unknownOptions = options.filter(function (key) { return validOptions.indexOf(key) === -1 && !ignoredKeys.test(key); });
    if (unknownOptions.length > 0)
        errors.push("Unknown " + optionType + ": " + unknownOptions.join(', ') + ". Allowed options: " + validOptions.sort().join(', '));
}
function getCommandOptions(rawCommandOptions) {
    var command = __assign({}, rawCommandOptions);
    command.external = (rawCommandOptions.external || '').split(',');
    if (rawCommandOptions.globals) {
        command.globals = Object.create(null);
        rawCommandOptions.globals.split(',').forEach(function (str) {
            var names = str.split(':');
            command.globals[names[0]] = names[1];
            // Add missing Module IDs to external.
            if (command.external.indexOf(names[0]) === -1) {
                command.external.push(names[0]);
            }
        });
    }
    return command;
}
function getInputOptions(config, command, defaultOnWarnHandler) {
    if (command === void 0) { command = {}; }
    var getOption = createGetOption(config, command);
    var inputOptions = {
        acorn: config.acorn,
        acornInjectPlugins: config.acornInjectPlugins,
        cache: getOption('cache'),
        experimentalCacheExpiry: getOption('experimentalCacheExpiry', 10),
        context: config.context,
        experimentalCodeSplitting: getOption('experimentalCodeSplitting'),
        experimentalPreserveModules: getOption('experimentalPreserveModules'),
        experimentalTopLevelAwait: getOption('experimentalTopLevelAwait'),
        external: getExternal(config, command),
        inlineDynamicImports: getOption('inlineDynamicImports', false),
        input: getOption('input'),
        manualChunks: getOption('manualChunks'),
        chunkGroupingSize: getOption('chunkGroupingSize', 5000),
        optimizeChunks: getOption('optimizeChunks'),
        moduleContext: config.moduleContext,
        onwarn: getOnWarn(config, command, defaultOnWarnHandler),
        perf: getOption('perf', false),
        plugins: config.plugins,
        preferConst: getOption('preferConst'),
        preserveSymlinks: getOption('preserveSymlinks'),
        treeshake: getObjectOption(config, command, 'treeshake'),
        shimMissingExports: getOption('shimMissingExports'),
        watch: config.watch
    };
    // legacy to make sure certain plugins still work
    if (Array.isArray(inputOptions.input)) {
        inputOptions.entry = inputOptions.input[0];
    }
    else if (typeof inputOptions.input === 'object') {
        for (var name in inputOptions.input) {
            inputOptions.entry = inputOptions.input[name];
            break;
        }
    }
    else {
        inputOptions.entry = inputOptions.input;
    }
    return inputOptions;
}
function getOutputOptions(config, command) {
    if (command === void 0) { command = {}; }
    var getOption = createGetOption(config, command);
    var format = getOption('format');
    return {
        amd: __assign({}, config.amd, command.amd),
        assetFileNames: getOption('assetFileNames'),
        banner: getOption('banner'),
        dir: getOption('dir'),
        chunkFileNames: getOption('chunkFileNames'),
        compact: getOption('compact', false),
        entryFileNames: getOption('entryFileNames'),
        esModule: getOption('esModule', true),
        exports: getOption('exports'),
        extend: getOption('extend'),
        file: getOption('file'),
        footer: getOption('footer'),
        format: format === 'esm' ? 'es' : format,
        freeze: getOption('freeze', true),
        globals: getOption('globals'),
        indent: getOption('indent', true),
        interop: getOption('interop', true),
        intro: getOption('intro'),
        name: getOption('name'),
        namespaceToStringTag: getOption('namespaceToStringTag', false),
        noConflict: getOption('noConflict'),
        outro: getOption('outro'),
        paths: getOption('paths'),
        sourcemap: getOption('sourcemap'),
        sourcemapFile: getOption('sourcemapFile'),
        strict: getOption('strict', true)
    };
}
function deprecate(config, command, deprecateConfig) {
    if (command === void 0) { command = {}; }
    if (deprecateConfig === void 0) { deprecateConfig = { input: true, output: true }; }
    var deprecations = [];
    // CLI
    if (command.id) {
        deprecations.push({
            old: '-u/--id',
            new: '--amd.id'
        });
        (command.amd || (command.amd = {})).id = command.id;
    }
    if (typeof command.output === 'string') {
        deprecations.push({
            old: '--output',
            new: '--file'
        });
        command.output = { file: command.output };
    }
    if (command.d) {
        deprecations.push({
            old: '-d',
            new: '--indent'
        });
        command.indent = command.d;
    }
    // config file
    deprecations.push.apply(deprecations, deprecateOptions(config, deprecateConfig));
    return deprecations;
}

function addDeprecations(deprecations, warn) {
    var message = "The following options have been renamed \u2014 please update your config: " + deprecations
        .map(function (option) { return option.old + " -> " + option.new; })
        .join(', ');
    warn({
        code: 'DEPRECATED_OPTIONS',
        message: message,
        deprecations: deprecations
    });
}
function checkInputOptions(options) {
    if (options.transform || options.load || options.resolveId || options.resolveExternal) {
        throw new Error('The `transform`, `load`, `resolveId` and `resolveExternal` options are deprecated in favour of a unified plugin API. See https://github.com/rollup/rollup/wiki/Plugins for details');
    }
}
function checkOutputOptions(options) {
    if (options.format === 'es6') {
        error({
            message: 'The `es6` output format is deprecated – use `es` instead',
            url: "https://rollupjs.org/#format-f-output-format-"
        });
    }
    if (!options.format) {
        error({
            message: "You must specify output.format, which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'",
            url: "https://rollupjs.org/#format-f-output-format-"
        });
    }
    if (options.moduleId) {
        if (options.amd)
            throw new Error('Cannot have both output.amd and output.moduleId');
    }
}
var throwAsyncGenerateError = {
    get: function () {
        throw new Error("bundle.generate(...) now returns a Promise instead of a { code, map } object");
    }
};
function applyOptionHook(inputOptions, plugin) {
    if (plugin.options)
        return plugin.options(inputOptions) || inputOptions;
    return inputOptions;
}
function getInputOptions$1(rawInputOptions) {
    if (!rawInputOptions) {
        throw new Error('You must supply an options object to rollup');
    }
    var _a = mergeOptions({
        config: rawInputOptions,
        deprecateConfig: { input: true }
    }), inputOptions = _a.inputOptions, deprecations = _a.deprecations, optionError = _a.optionError;
    if (optionError)
        inputOptions.onwarn({ message: optionError, code: 'UNKNOWN_OPTION' });
    if (deprecations.length)
        addDeprecations(deprecations, inputOptions.onwarn);
    checkInputOptions(inputOptions);
    var plugins = inputOptions.plugins;
    inputOptions.plugins = Array.isArray(plugins) ? plugins : plugins ? [plugins] : [];
    inputOptions = inputOptions.plugins.reduce(applyOptionHook, inputOptions);
    if (!inputOptions.experimentalCodeSplitting) {
        inputOptions.inlineDynamicImports = true;
        if (inputOptions.manualChunks)
            error({
                code: 'INVALID_OPTION',
                message: '"manualChunks" option is only supported for experimentalCodeSplitting.'
            });
        if (inputOptions.optimizeChunks)
            error({
                code: 'INVALID_OPTION',
                message: '"optimizeChunks" option is only supported for experimentalCodeSplitting.'
            });
        if (inputOptions.input instanceof Array || typeof inputOptions.input === 'object')
            error({
                code: 'INVALID_OPTION',
                message: 'Multiple inputs are only supported for experimentalCodeSplitting.'
            });
    }
    if (inputOptions.inlineDynamicImports) {
        if (inputOptions.manualChunks)
            error({
                code: 'INVALID_OPTION',
                message: '"manualChunks" option is not supported for inlineDynamicImports.'
            });
        if (inputOptions.optimizeChunks)
            error({
                code: 'INVALID_OPTION',
                message: '"optimizeChunks" option is not supported for inlineDynamicImports.'
            });
        if (inputOptions.input instanceof Array || typeof inputOptions.input === 'object')
            error({
                code: 'INVALID_OPTION',
                message: 'Multiple inputs are not supported for inlineDynamicImports.'
            });
    }
    else if (inputOptions.experimentalPreserveModules) {
        if (inputOptions.inlineDynamicImports)
            error({
                code: 'INVALID_OPTION',
                message: "experimentalPreserveModules does not support the inlineDynamicImports option."
            });
        if (inputOptions.manualChunks)
            error({
                code: 'INVALID_OPTION',
                message: 'experimentalPreserveModules does not support the manualChunks option.'
            });
        if (inputOptions.optimizeChunks)
            error({
                code: 'INVALID_OPTION',
                message: 'experimentalPreserveModules does not support the optimizeChunks option.'
            });
    }
    return inputOptions;
}
var curWatcher;
function setWatcher(watcher) {
    curWatcher = watcher;
}
function rollup(rawInputOptions) {
    try {
        var inputOptions_1 = getInputOptions$1(rawInputOptions);
        initialiseTimers(inputOptions_1);
        var graph_1 = new Graph(inputOptions_1, curWatcher);
        curWatcher = undefined;
        timeStart('BUILD', 1);
        return graph_1.pluginDriver
            .hookParallel('buildStart')
            .then(function () {
            return graph_1.build(inputOptions_1.input, inputOptions_1.manualChunks, inputOptions_1.inlineDynamicImports, inputOptions_1.experimentalPreserveModules);
        })
            .then(function (chunks) {
            return graph_1.pluginDriver.hookParallel('buildEnd').then(function () {
                return chunks;
            });
        }, function (err) {
            return graph_1.pluginDriver.hookParallel('buildEnd', err).then(function () {
                throw err;
            });
        })
            .then(function (chunks) {
            timeEnd('BUILD', 1);
            // TODO: deprecate legacy single chunk return
            var singleChunk;
            var singleInput = typeof inputOptions_1.input === 'string' ||
                (inputOptions_1.input instanceof Array && inputOptions_1.input.length === 1);
            //let imports: string[], exports: string[];
            if (!inputOptions_1.experimentalPreserveModules) {
                if (singleInput) {
                    for (var _i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {
                        var chunk = chunks_1[_i];
                        if (chunk.entryModule === undefined)
                            continue;
                        if (singleChunk) {
                            singleChunk = undefined;
                            break;
                        }
                        singleChunk = chunk;
                    }
                }
            }
            // ensure we only do one optimization pass per build
            var optimized = false;
            function generate(rawOutputOptions, isWrite) {
                var outputOptions = normalizeOutputOptions(inputOptions_1, rawOutputOptions);
                if (inputOptions_1.experimentalCodeSplitting) {
                    if (typeof outputOptions.file === 'string' && typeof outputOptions.dir === 'string')
                        error({
                            code: 'INVALID_OPTION',
                            message: 'Build must set either output.file for a single-file build or output.dir when generating multiple chunks.'
                        });
                    if (chunks.length > 1) {
                        if (outputOptions.format === 'umd' || outputOptions.format === 'iife')
                            error({
                                code: 'INVALID_OPTION',
                                message: 'UMD and IIFE output formats are not supported with the experimentalCodeSplitting option.'
                            });
                        if (outputOptions.sourcemapFile)
                            error({
                                code: 'INVALID_OPTION',
                                message: '"sourcemapFile" is only supported for single-file builds.'
                            });
                    }
                    if (!singleChunk && typeof outputOptions.file === 'string')
                        error({
                            code: 'INVALID_OPTION',
                            message: singleInput
                                ? 'When building a bundle using dynamic imports, the output.dir option must be used, not output.file. Alternatively set inlineDynamicImports: true to output a single file.'
                                : 'When building multiple entry point inputs, the output.dir option must be used, not output.file.'
                        });
                }
                if (!outputOptions.file && inputOptions_1.experimentalCodeSplitting)
                    singleChunk = undefined;
                timeStart('GENERATE', 1);
                // populate asset files into output
                var assetFileNames = outputOptions.assetFileNames || 'assets/[name]-[hash][extname]';
                var outputBundle = graph_1.finaliseAssets(assetFileNames);
                var inputBase = commondir(chunks.filter(function (chunk) { return chunk.entryModule; }).map(function (chunk) { return chunk.entryModule.id; }));
                return createAddons(graph_1, outputOptions)
                    .then(function (addons) {
                    // pre-render all chunks
                    for (var _i = 0, chunks_2 = chunks; _i < chunks_2.length; _i++) {
                        var chunk = chunks_2[_i];
                        if (!inputOptions_1.experimentalPreserveModules)
                            chunk.generateInternalExports(outputOptions);
                        if (chunk.isEntryModuleFacade)
                            chunk.exportMode = getExportMode(chunk, outputOptions);
                    }
                    for (var _a = 0, chunks_3 = chunks; _a < chunks_3.length; _a++) {
                        var chunk = chunks_3[_a];
                        chunk.preRender(outputOptions, inputBase);
                    }
                    if (!optimized && inputOptions_1.optimizeChunks) {
                        optimizeChunks(chunks, outputOptions, inputOptions_1.chunkGroupingSize, inputBase);
                        optimized = true;
                    }
                    // name all chunks
                    for (var i = 0; i < chunks.length; i++) {
                        var chunk = chunks[i];
                        var imports = chunk.getImportIds();
                        var exports = chunk.getExportNames();
                        var modules = chunk.renderedModules;
                        if (chunk === singleChunk) {
                            singleChunk.id = basename(outputOptions.file ||
                                (inputOptions_1.input instanceof Array
                                    ? inputOptions_1.input[0]
                                    : inputOptions_1.input));
                        }
                        else if (inputOptions_1.experimentalPreserveModules) {
                            chunk.generateIdPreserveModules(inputBase);
                        }
                        else {
                            var pattern = void 0, patternName = void 0;
                            if (chunk.isEntryModuleFacade) {
                                pattern = outputOptions.entryFileNames || '[name].js';
                                patternName = 'output.entryFileNames';
                            }
                            else {
                                pattern = outputOptions.chunkFileNames || '[name]-[hash].js';
                                patternName = 'output.chunkFileNames';
                            }
                            chunk.generateId(pattern, patternName, addons, outputOptions, outputBundle);
                        }
                        outputBundle[chunk.id] = {
                            fileName: chunk.id,
                            isEntry: chunk.entryModule !== undefined,
                            imports: imports,
                            exports: exports,
                            modules: modules,
                            code: undefined,
                            map: undefined
                        };
                    }
                    return Promise.all(chunks.map(function (chunk) {
                        var outputChunk = outputBundle[chunk.id];
                        return chunk.render(outputOptions, addons, outputChunk).then(function (rendered) {
                            outputChunk.code = rendered.code;
                            outputChunk.map = rendered.map;
                            return graph_1.pluginDriver.hookParallel('ongenerate', [
                                __assign({ bundle: outputChunk }, outputOptions),
                                outputChunk
                            ]);
                        });
                    })).then(function () { });
                })
                    .then(function () {
                    // run generateBundle hook
                    // assets emitted during generateBundle are unique to that specific generate call
                    var assets = new Map(graph_1.assetsById);
                    var generateAssetPluginHooks = createAssetPluginHooks(assets, outputBundle, assetFileNames);
                    return graph_1.pluginDriver
                        .hookSeq('generateBundle', [outputOptions, outputBundle, isWrite], function (context) { return (__assign({}, context, generateAssetPluginHooks)); })
                        .then(function () {
                        // throw errors for assets not finalised with a source
                        assets.forEach(function (asset) {
                            if (asset.fileName === undefined)
                                finaliseAsset(asset, outputBundle, assetFileNames);
                        });
                    });
                })
                    .then(function () {
                    timeEnd('GENERATE', 1);
                    return outputBundle;
                });
            }
            var cache = rawInputOptions.cache === false ? undefined : graph_1.getCache();
            var result = {
                cache: cache,
                watchFiles: Object.keys(graph_1.watchFiles),
                generate: (function (rawOutputOptions) {
                    var promise = generate(rawOutputOptions, false).then(function (result) {
                        return inputOptions_1.experimentalCodeSplitting
                            ? { output: result }
                            : result[chunks[0].id];
                    });
                    Object.defineProperty(promise, 'code', throwAsyncGenerateError);
                    Object.defineProperty(promise, 'map', throwAsyncGenerateError);
                    return promise;
                }),
                write: (function (outputOptions) {
                    if (inputOptions_1.experimentalCodeSplitting &&
                        (!outputOptions || (!outputOptions.dir && !outputOptions.file))) {
                        error({
                            code: 'MISSING_OPTION',
                            message: 'You must specify output.file or output.dir for the build.'
                        });
                    }
                    else if (!inputOptions_1.experimentalCodeSplitting &&
                        (!outputOptions || !outputOptions.file)) {
                        error({
                            code: 'MISSING_OPTION',
                            message: 'You must specify output.file.'
                        });
                    }
                    return generate(outputOptions, true).then(function (outputBundle) {
                        return Promise.all(Object.keys(outputBundle).map(function (chunkId) {
                            return writeOutputFile(graph_1, result, chunkId, outputBundle[chunkId], outputOptions);
                        })).then(function () {
                            return inputOptions_1.experimentalCodeSplitting
                                ? { output: outputBundle }
                                : outputBundle[chunks[0].id];
                        });
                    });
                })
            };
            if (!inputOptions_1.experimentalCodeSplitting) {
                result.imports = singleChunk.getImportIds();
                result.exports = singleChunk.getExportNames();
                result.modules = (cache || graph_1.getCache()).modules;
            }
            if (inputOptions_1.perf === true)
                result.getTimings = getTimings;
            return result;
        });
    }
    catch (err) {
        return Promise.reject(err);
    }
}
function isOutputChunk(file) {
    return typeof file.code === 'string';
}
function writeOutputFile(graph, build, outputFileName, outputFile, outputOptions) {
    var filename = resolve(outputOptions.dir || dirname(outputOptions.file), outputFileName);
    var writeSourceMapPromise;
    var source;
    if (isOutputChunk(outputFile)) {
        source = outputFile.code;
        if (outputOptions.sourcemap && outputFile.map) {
            var url = void 0;
            if (outputOptions.sourcemap === 'inline') {
                url = outputFile.map.toUrl();
            }
            else {
                url = basename(outputFileName) + ".map";
                writeSourceMapPromise = writeFile$1(filename + ".map", outputFile.map.toString());
            }
            source += "//# " + SOURCEMAPPING_URL + "=" + url + "\n";
        }
    }
    else {
        source = outputFile;
    }
    return writeFile$1(filename, source)
        .then(function () { return writeSourceMapPromise; })
        .then(function () {
        return isOutputChunk(outputFile) &&
            graph.pluginDriver.hookSeq('onwrite', [
                __assign({ bundle: build }, outputOptions),
                outputFile
            ]);
    })
        .then(function () { });
}
function normalizeOutputOptions(inputOptions, rawOutputOptions) {
    if (!rawOutputOptions) {
        throw new Error('You must supply an options object');
    }
    // since deprecateOptions, adds the output properties
    // to `inputOptions` so adding that lastly
    var consolidatedOutputOptions = {
        output: __assign({}, rawOutputOptions, rawOutputOptions.output, inputOptions.output)
    };
    var mergedOptions = mergeOptions({
        // just for backward compatiblity to fallback on root
        // if the option isn't present in `output`
        config: consolidatedOutputOptions,
        deprecateConfig: { output: true }
    });
    if (mergedOptions.optionError)
        throw new Error(mergedOptions.optionError);
    // now outputOptions is an array, but rollup.rollup API doesn't support arrays
    var outputOptions = mergedOptions.outputOptions[0];
    var deprecations = mergedOptions.deprecations;
    if (deprecations.length)
        addDeprecations(deprecations, inputOptions.onwarn);
    checkOutputOptions(outputOptions);
    return outputOptions;
}

/*!
 * filename-regex <https://github.com/regexps/filename-regex>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert
 * Licensed under the MIT license.
 */

var filenameRegex = function filenameRegex() {
  return /([^\\\/]+)$/;
};

/*!
 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var arrFlatten = function (arr) {
  return flat(arr, []);
};

function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flat(cur, res) : res.push(cur);
  }
  return res;
}

var slice = [].slice;

/**
 * Return the difference between the first array and
 * additional arrays.
 *
 * ```js
 * var diff = require('{%= name %}');
 *
 * var a = ['a', 'b', 'c', 'd'];
 * var b = ['b', 'c'];
 *
 * console.log(diff(a, b))
 * //=> ['a', 'd']
 * ```
 *
 * @param  {Array} `a`
 * @param  {Array} `b`
 * @return {Array}
 * @api public
 */

function diff(arr, arrays) {
  var argsLen = arguments.length;
  var len = arr.length, i = -1;
  var res = [], arrays;

  if (argsLen === 1) {
    return arr;
  }

  if (argsLen > 2) {
    arrays = arrFlatten(slice.call(arguments, 1));
  }

  while (++i < len) {
    if (!~arrays.indexOf(arr[i])) {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * Expose `diff`
 */

var arrDiff = diff;

/*!
 * array-unique <https://github.com/jonschlinkert/array-unique>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var arrayUnique = function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var len = arr.length;
  var i = -1;

  while (i++ < len) {
    var j = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

var toString$2 = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString$2.call(arr) == '[object Array]';
};

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && isarray(val) === false;
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var toString$3 = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString$3.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer_1(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

var isNumber = function isNumber(num) {
  var type = kindOf(num);
  if (type !== 'number' && type !== 'string') {
    return false;
  }
  var n = +num;
  return (n - n + 1) >= 0 && num !== '';
};

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber$1 = function isNumber(num) {
  var type = typeof num;

  if (type === 'string' || num instanceof String) {
    // an empty string would be coerced to true with the below logic
    if (!num.trim()) return false;
  } else if (type !== 'number' && !(num instanceof Number)) {
    return false;
  }

  return (num - num + 1) >= 0;
};

var toString$4 = Object.prototype.toString;

var kindOf$1 = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray$1(val)) return 'array';
  if (isBuffer$1(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString$4.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}

function isArray$1(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer$1(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

var max = Math.pow(2, 32);

var node = random;
var cryptographic = true;

function random () {
  var buf = crypto
    .randomBytes(4)
    .toString('hex');

  return parseInt(buf, 16) / max
}
node.cryptographic = cryptographic;

/**
 * Expose `randomatic`
 */

var randomatic_1 = randomatic;
var isCrypto = !!node.cryptographic;

/**
 * Available mask characters
 */

var type = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  special: '~!@#$%^&()_+-={}[];\',.'
};

type.all = type.lower + type.upper + type.number + type.special;

/**
 * Generate random character sequences of a specified `length`,
 * based on the given `pattern`.
 *
 * @param {String} `pattern` The pattern to use for generating the random string.
 * @param {String} `length` The length of the string to generate.
 * @param {String} `options`
 * @return {String}
 * @api public
 */

function randomatic(pattern, length, options) {
  if (typeof pattern === 'undefined') {
    throw new Error('randomatic expects a string or number.');
  }

  var custom = false;
  if (arguments.length === 1) {
    if (typeof pattern === 'string') {
      length = pattern.length;

    } else if (isNumber$1(pattern)) {
      options = {};
      length = pattern;
      pattern = '*';
    }
  }

  if (kindOf$1(length) === 'object' && length.hasOwnProperty('chars')) {
    options = length;
    pattern = options.chars;
    length = pattern.length;
    custom = true;
  }

  var opts = options || {};
  var mask = '';
  var res = '';

  // Characters to be used
  if (pattern.indexOf('?') !== -1) mask += opts.chars;
  if (pattern.indexOf('a') !== -1) mask += type.lower;
  if (pattern.indexOf('A') !== -1) mask += type.upper;
  if (pattern.indexOf('0') !== -1) mask += type.number;
  if (pattern.indexOf('!') !== -1) mask += type.special;
  if (pattern.indexOf('*') !== -1) mask += type.all;
  if (custom) mask += pattern;

  while (length--) {
    res += mask.charAt(parseInt(node() * mask.length, 10));
  }
  return res;
}randomatic_1.isCrypto = isCrypto;

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

var repeatElement = function repeat(ele, num) {
  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};

/**
 * Expose `fillRange`
 */

var fillRange_1 = fillRange;

/**
 * Return a range of numbers or letters.
 *
 * @param  {String} `a` Start of the range
 * @param  {String} `b` End of the range
 * @param  {String} `step` Increment or decrement to use.
 * @param  {Function} `fn` Custom function to modify each element in the range.
 * @return {Array}
 */

function fillRange(a, b, step, options, fn) {
  if (a == null || b == null) {
    throw new Error('fill-range expects the first and second args to be strings.');
  }

  if (typeof step === 'function') {
    fn = step; options = {}; step = null;
  }

  if (typeof options === 'function') {
    fn = options; options = {};
  }

  if (isobject(step)) {
    options = step; step = '';
  }

  var expand, regex = false, sep$$1 = '';
  var opts = options || {};

  if (typeof opts.silent === 'undefined') {
    opts.silent = true;
  }

  step = step || opts.step;

  // store a ref to unmodified arg
  var origA = a, origB = b;

  b = (b.toString() === '-0') ? 0 : b;

  if (opts.optimize || opts.makeRe) {
    step = step ? (step += '~') : step;
    expand = true;
    regex = true;
    sep$$1 = '~';
  }

  // handle special step characters
  if (typeof step === 'string') {
    var match = stepRe().exec(step);

    if (match) {
      var i = match.index;
      var m = match[0];

      // repeat string
      if (m === '+') {
        return repeatElement(a, b);

      // randomize a, `b` times
      } else if (m === '?') {
        return [randomatic_1(a, b)];

      // expand right, no regex reduction
      } else if (m === '>') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;

      // expand to an array, or if valid create a reduced
      // string for a regex logic `or`
      } else if (m === '|') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;
        regex = true;
        sep$$1 = m;

      // expand to an array, or if valid create a reduced
      // string for a regex range
      } else if (m === '~') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;
        regex = true;
        sep$$1 = m;
      }
    } else if (!isNumber(step)) {
      if (!opts.silent) {
        throw new TypeError('fill-range: invalid step.');
      }
      return null;
    }
  }

  if (/[.&*()[\]^%$#@!]/.test(a) || /[.&*()[\]^%$#@!]/.test(b)) {
    if (!opts.silent) {
      throw new RangeError('fill-range: invalid range arguments.');
    }
    return null;
  }

  // has neither a letter nor number, or has both letters and numbers
  // this needs to be after the step logic
  if (!noAlphaNum(a) || !noAlphaNum(b) || hasBoth(a) || hasBoth(b)) {
    if (!opts.silent) {
      throw new RangeError('fill-range: invalid range arguments.');
    }
    return null;
  }

  // validate arguments
  var isNumA = isNumber(zeros(a));
  var isNumB = isNumber(zeros(b));

  if ((!isNumA && isNumB) || (isNumA && !isNumB)) {
    if (!opts.silent) {
      throw new TypeError('fill-range: first range argument is incompatible with second.');
    }
    return null;
  }

  // by this point both are the same, so we
  // can use A to check going forward.
  var isNum = isNumA;
  var num = formatStep(step);

  // is the range alphabetical? or numeric?
  if (isNum) {
    // if numeric, coerce to an integer
    a = +a; b = +b;
  } else {
    // otherwise, get the charCode to expand alpha ranges
    a = a.charCodeAt(0);
    b = b.charCodeAt(0);
  }

  // is the pattern descending?
  var isDescending = a > b;

  // don't create a character class if the args are < 0
  if (a < 0 || b < 0) {
    expand = false;
    regex = false;
  }

  // detect padding
  var padding = isPadded(origA, origB);
  var res, pad, arr = [];
  var ii = 0;

  // character classes, ranges and logical `or`
  if (regex) {
    if (shouldExpand(a, b, num, isNum, padding, opts)) {
      // make sure the correct separator is used
      if (sep$$1 === '|' || sep$$1 === '~') {
        sep$$1 = detectSeparator(a, b, num, isNum, isDescending);
      }
      return wrap([origA, origB], sep$$1, opts);
    }
  }

  while (isDescending ? (a >= b) : (a <= b)) {
    if (padding && isNum) {
      pad = padding(a);
    }

    // custom function
    if (typeof fn === 'function') {
      res = fn(a, isNum, pad, ii++);

    // letters
    } else if (!isNum) {
      if (regex && isInvalidChar(a)) {
        res = null;
      } else {
        res = String.fromCharCode(a);
      }

    // numbers
    } else {
      res = formatPadding(a, pad);
    }

    // add result to the array, filtering any nulled values
    if (res !== null) arr.push(res);

    // increment or decrement
    if (isDescending) {
      a -= num;
    } else {
      a += num;
    }
  }

  // now that the array is expanded, we need to handle regex
  // character classes, ranges or logical `or` that wasn't
  // already handled before the loop
  if ((regex || expand) && !opts.noexpand) {
    // make sure the correct separator is used
    if (sep$$1 === '|' || sep$$1 === '~') {
      sep$$1 = detectSeparator(a, b, num, isNum, isDescending);
    }
    if (arr.length === 1 || a < 0 || b < 0) { return arr; }
    return wrap(arr, sep$$1, opts);
  }

  return arr;
}

/**
 * Wrap the string with the correct regex
 * syntax.
 */

function wrap(arr, sep$$1, opts) {
  if (sep$$1 === '~') { sep$$1 = '-'; }
  var str = arr.join(sep$$1);
  var pre = opts && opts.regexPrefix;

  // regex logical `or`
  if (sep$$1 === '|') {
    str = pre ? pre + str : str;
    str = '(' + str + ')';
  }

  // regex character class
  if (sep$$1 === '-') {
    str = (pre && pre === '^')
      ? pre + str
      : str;
    str = '[' + str + ']';
  }
  return [str];
}

/**
 * Check for invalid characters
 */

function isCharClass(a, b, step, isNum, isDescending) {
  if (isDescending) { return false; }
  if (isNum) { return a <= 9 && b <= 9; }
  if (a < b) { return step === 1; }
  return false;
}

/**
 * Detect the correct separator to use
 */

function shouldExpand(a, b, num, isNum, padding, opts) {
  if (isNum && (a > 9 || b > 9)) { return false; }
  return !padding && num === 1 && a < b;
}

/**
 * Detect the correct separator to use
 */

function detectSeparator(a, b, step, isNum, isDescending) {
  var isChar = isCharClass(a, b, step, isNum, isDescending);
  if (!isChar) {
    return '|';
  }
  return '~';
}

/**
 * Correctly format the step based on type
 */

function formatStep(step) {
  return Math.abs(step >> 0) || 1;
}

/**
 * Format padding, taking leading `-` into account
 */

function formatPadding(ch, pad) {
  var res = pad ? pad + ch : ch;
  if (pad && ch.toString().charAt(0) === '-') {
    res = '-' + pad + ch.toString().substr(1);
  }
  return res.toString();
}

/**
 * Check for invalid characters
 */

function isInvalidChar(str) {
  var ch = toStr(str);
  return ch === '\\'
    || ch === '['
    || ch === ']'
    || ch === '^'
    || ch === '('
    || ch === ')'
    || ch === '`';
}

/**
 * Convert to a string from a charCode
 */

function toStr(ch) {
  return String.fromCharCode(ch);
}


/**
 * Step regex
 */

function stepRe() {
  return /\?|>|\||\+|\~/g;
}

/**
 * Return true if `val` has either a letter
 * or a number
 */

function noAlphaNum(val) {
  return /[a-z0-9]/i.test(val);
}

/**
 * Return true if `val` has both a letter and
 * a number (invalid)
 */

function hasBoth(val) {
  return /[a-z][0-9]|[0-9][a-z]/i.test(val);
}

/**
 * Normalize zeros for checks
 */

function zeros(val) {
  if (/^-*0+$/.test(val.toString())) {
    return '0';
  }
  return val;
}

/**
 * Return true if `val` has leading zeros,
 * or a similar valid pattern.
 */

function hasZeros(val) {
  return /[^.]\.|^-*0+[0-9]/.test(val);
}

/**
 * If the string is padded, returns a curried function with
 * the a cached padding string, or `false` if no padding.
 *
 * @param  {*} `origA` String or number.
 * @return {String|Boolean}
 */

function isPadded(origA, origB) {
  if (hasZeros(origA) || hasZeros(origB)) {
    var alen = length(origA);
    var blen = length(origB);

    var len = alen >= blen
      ? alen
      : blen;

    return function (a) {
      return repeatString('0', len - length(a));
    };
  }
  return false;
}

/**
 * Get the string length of `val`
 */

function length(val) {
  return val.toString().length;
}

var expandRange = function expandRange(str, options, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expand-range expects a string.');
  }

  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  if (typeof options === 'boolean') {
    options = {};
    options.makeRe = true;
  }

  // create arguments to pass to fill-range
  var opts = options || {};
  var args = str.split('..');
  var len = args.length;
  if (len > 3) { return str; }

  // if only one argument, it can't expand so return it
  if (len === 1) { return args; }

  // if `true`, tell fill-range to regexify the string
  if (typeof fn === 'boolean' && fn === true) {
    opts.makeRe = true;
  }

  args.push(opts);
  return fillRange_1.apply(null, args.concat(fn));
};

/*!
 * preserve <https://github.com/jonschlinkert/preserve>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

/**
 * Replace tokens in `str` with a temporary, heuristic placeholder.
 *
 * ```js
 * tokens.before('{a\\,b}');
 * //=> '{__ID1__}'
 * ```
 *
 * @param  {String} `str`
 * @return {String} String with placeholders.
 * @api public
 */

var before = function before(str, re) {
  return str.replace(re, function (match) {
    var id = randomize();
    cache$1[id] = match;
    return '__ID' + id + '__';
  });
};

/**
 * Replace placeholders in `str` with original tokens.
 *
 * ```js
 * tokens.after('{__ID1__}');
 * //=> '{a\\,b}'
 * ```
 *
 * @param  {String} `str` String with placeholders
 * @return {String} `str` String with original tokens.
 * @api public
 */

var after = function after(str) {
  return str.replace(/__ID(.{5})__/g, function (_, id) {
    return cache$1[id];
  });
};

function randomize() {
  return Math.random().toString().slice(2, 7);
}

var cache$1 = {};

var preserve = {
	before: before,
	after: after
};

/**
 * Module dependencies
 */





/**
 * Expose `braces`
 */

var braces_1 = function(str, options) {
  if (typeof str !== 'string') {
    throw new Error('braces expects a string');
  }
  return braces(str, options);
};

/**
 * Expand `{foo,bar}` or `{1..5}` braces in the
 * given `string`.
 *
 * @param  {String} `str`
 * @param  {Array} `arr`
 * @param  {Object} `options`
 * @return {Array}
 */

function braces(str, arr, options) {
  if (str === '') {
    return [];
  }

  if (!Array.isArray(arr)) {
    options = arr;
    arr = [];
  }

  var opts = options || {};
  arr = arr || [];

  if (typeof opts.nodupes === 'undefined') {
    opts.nodupes = true;
  }

  var fn = opts.fn;
  var es6;

  if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  }

  if (!(patternRe instanceof RegExp)) {
    patternRe = patternRegex();
  }

  var matches = str.match(patternRe) || [];
  var m = matches[0];

  switch(m) {
    case '\\,':
      return escapeCommas(str, arr, opts);
    case '\\.':
      return escapeDots(str, arr, opts);
    case '\/.':
      return escapePaths(str, arr, opts);
    case ' ':
      return splitWhitespace(str);
    case '{,}':
      return exponential(str, opts, braces);
    case '{}':
      return emptyBraces(str, arr, opts);
    case '\\{':
    case '\\}':
      return escapeBraces(str, arr, opts);
    case '${':
      if (!/\{[^{]+\{/.test(str)) {
        return arr.concat(str);
      } else {
        es6 = true;
        str = preserve.before(str, es6Regex());
      }
  }

  if (!(braceRe instanceof RegExp)) {
    braceRe = braceRegex();
  }

  var match = braceRe.exec(str);
  if (match == null) {
    return [str];
  }

  var outter = match[1];
  var inner = match[2];
  if (inner === '') { return [str]; }

  var segs, segsLength;

  if (inner.indexOf('..') !== -1) {
    segs = expandRange(inner, opts, fn) || inner.split(',');
    segsLength = segs.length;

  } else if (inner[0] === '"' || inner[0] === '\'') {
    return arr.concat(str.split(/['"]/).join(''));

  } else {
    segs = inner.split(',');
    if (opts.makeRe) {
      return braces(str.replace(outter, wrap$1(segs, '|')), opts);
    }

    segsLength = segs.length;
    if (segsLength === 1 && opts.bash) {
      segs[0] = wrap$1(segs[0], '\\');
    }
  }

  var len = segs.length;
  var i = 0, val;

  while (len--) {
    var path$$1 = segs[i++];

    if (/(\.[^.\/])/.test(path$$1)) {
      if (segsLength > 1) {
        return segs;
      } else {
        return [str];
      }
    }

    val = splice(str, outter, path$$1);

    if (/\{[^{}]+?\}/.test(val)) {
      arr = braces(val, arr, opts);
    } else if (val !== '') {
      if (opts.nodupes && arr.indexOf(val) !== -1) { continue; }
      arr.push(es6 ? preserve.after(val) : val);
    }
  }

  if (opts.strict) { return filter(arr, filterEmpty); }
  return arr;
}

/**
 * Expand exponential ranges
 *
 *   `a{,}{,}` => ['a', 'a', 'a', 'a']
 */

function exponential(str, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = null;
  }

  var opts = options || {};
  var esc = '__ESC_EXP__';
  var exp = 0;
  var res;

  var parts = str.split('{,}');
  if (opts.nodupes) {
    return fn(parts.join(''), opts);
  }

  exp = parts.length - 1;
  res = fn(parts.join(esc), opts);
  var len = res.length;
  var arr = [];
  var i = 0;

  while (len--) {
    var ele = res[i++];
    var idx = ele.indexOf(esc);

    if (idx === -1) {
      arr.push(ele);

    } else {
      ele = ele.split('__ESC_EXP__').join('');
      if (!!ele && opts.nodupes !== false) {
        arr.push(ele);

      } else {
        var num = Math.pow(2, exp);
        arr.push.apply(arr, repeatElement(ele, num));
      }
    }
  }
  return arr;
}

/**
 * Wrap a value with parens, brackets or braces,
 * based on the given character/separator.
 *
 * @param  {String|Array} `val`
 * @param  {String} `ch`
 * @return {String}
 */

function wrap$1(val, ch) {
  if (ch === '|') {
    return '(' + val.join(ch) + ')';
  }
  if (ch === ',') {
    return '{' + val.join(ch) + '}';
  }
  if (ch === '-') {
    return '[' + val.join(ch) + ']';
  }
  if (ch === '\\') {
    return '\\{' + val + '\\}';
  }
}

/**
 * Handle empty braces: `{}`
 */

function emptyBraces(str, arr, opts) {
  return braces(str.split('{}').join('\\{\\}'), arr, opts);
}

/**
 * Filter out empty-ish values
 */

function filterEmpty(ele) {
  return !!ele && ele !== '\\';
}

/**
 * Handle patterns with whitespace
 */

function splitWhitespace(str) {
  var segs = str.split(' ');
  var len = segs.length;
  var res = [];
  var i = 0;

  while (len--) {
    res.push.apply(res, braces(segs[i++]));
  }
  return res;
}

/**
 * Handle escaped braces: `\\{foo,bar}`
 */

function escapeBraces(str, arr, opts) {
  if (!/\{[^{]+\{/.test(str)) {
    return arr.concat(str.split('\\').join(''));
  } else {
    str = str.split('\\{').join('__LT_BRACE__');
    str = str.split('\\}').join('__RT_BRACE__');
    return map(braces(str, arr, opts), function(ele) {
      ele = ele.split('__LT_BRACE__').join('{');
      return ele.split('__RT_BRACE__').join('}');
    });
  }
}

/**
 * Handle escaped dots: `{1\\.2}`
 */

function escapeDots(str, arr, opts) {
  if (!/[^\\]\..+\\\./.test(str)) {
    return arr.concat(str.split('\\').join(''));
  } else {
    str = str.split('\\.').join('__ESC_DOT__');
    return map(braces(str, arr, opts), function(ele) {
      return ele.split('__ESC_DOT__').join('.');
    });
  }
}

/**
 * Handle escaped dots: `{1\\.2}`
 */

function escapePaths(str, arr, opts) {
  str = str.split('\/.').join('__ESC_PATH__');
  return map(braces(str, arr, opts), function(ele) {
    return ele.split('__ESC_PATH__').join('\/.');
  });
}

/**
 * Handle escaped commas: `{a\\,b}`
 */

function escapeCommas(str, arr, opts) {
  if (!/\w,/.test(str)) {
    return arr.concat(str.split('\\').join(''));
  } else {
    str = str.split('\\,').join('__ESC_COMMA__');
    return map(braces(str, arr, opts), function(ele) {
      return ele.split('__ESC_COMMA__').join(',');
    });
  }
}

/**
 * Regex for common patterns
 */

function patternRegex() {
  return /\${|( (?=[{,}])|(?=[{,}]) )|{}|{,}|\\,(?=.*[{}])|\/\.(?=.*[{}])|\\\.(?={)|\\{|\\}/;
}

/**
 * Braces regex.
 */

function braceRegex() {
  return /.*(\\?\{([^}]+)\})/;
}

/**
 * es6 delimiter regex.
 */

function es6Regex() {
  return /\$\{([^}]+)\}/;
}

var braceRe;
var patternRe;

/**
 * Faster alternative to `String.replace()` when the
 * index of the token to be replaces can't be supplied
 */

function splice(str, token, replacement) {
  var i = str.indexOf(token);
  return str.substr(0, i) + replacement
    + str.substr(i + token.length);
}

/**
 * Fast array map
 */

function map(arr, fn) {
  if (arr == null) {
    return [];
  }

  var len = arr.length;
  var res = new Array(len);
  var i = -1;

  while (++i < len) {
    res[i] = fn(arr[i], i, arr);
  }

  return res;
}

/**
 * Fast array filter
 */

function filter(arr, cb) {
  if (arr == null) return [];
  if (typeof cb !== 'function') {
    throw new TypeError('braces: filter expects a callback function.');
  }

  var len = arr.length;
  var res = arr.slice();
  var i = 0;

  while (len--) {
    if (!cb(arr[len], i++)) {
      res.splice(len, 1);
    }
  }
  return res;
}

/*!
 * is-posix-bracket <https://github.com/jonschlinkert/is-posix-bracket>
 *
 * Copyright (c) 2015-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isPosixBracket = function isPosixBracket(str) {
  return typeof str === 'string' && /\[([:.=+])(?:[^\[\]]|)+\1\]/.test(str);
};

/**
 * POSIX character classes
 */

var POSIX = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E',
  punct: '-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word:  'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9',
};

/**
 * Expose `brackets`
 */

var expandBrackets = brackets;

function brackets(str) {
  if (!isPosixBracket(str)) {
    return str;
  }

  var negated = false;
  if (str.indexOf('[^') !== -1) {
    negated = true;
    str = str.split('[^').join('[');
  }
  if (str.indexOf('[!') !== -1) {
    negated = true;
    str = str.split('[!').join('[');
  }

  var a = str.split('[');
  var b = str.split(']');
  var imbalanced = a.length !== b.length;

  var parts = str.split(/(?::\]\[:|\[?\[:|:\]\]?)/);
  var len = parts.length, i = 0;
  var end = '', beg = '';
  var res = [];

  // start at the end (innermost) first
  while (len--) {
    var inner = parts[i++];
    if (inner === '^[!' || inner === '[!') {
      inner = '';
      negated = true;
    }

    var prefix = negated ? '^' : '';
    var ch = POSIX[inner];

    if (ch) {
      res.push('[' + prefix + ch + ']');
    } else if (inner) {
      if (/^\[?\w-\w\]?$/.test(inner)) {
        if (i === parts.length) {
          res.push('[' + prefix + inner);
        } else if (i === 1) {
          res.push(prefix + inner + ']');
        } else {
          res.push(prefix + inner);
        }
      } else {
        if (i === 1) {
          beg += inner;
        } else if (i === parts.length) {
          end += inner;
        } else {
          res.push('[' + prefix + inner + ']');
        }
      }
    }
  }

  var result = res.join('|');
  var rlen = res.length || 1;
  if (rlen > 1) {
    result = '(?:' + result + ')';
    rlen = 1;
  }
  if (beg) {
    rlen++;
    if (beg.charAt(0) === '[') {
      if (imbalanced) {
        beg = '\\[' + beg.slice(1);
      } else {
        beg += ']';
      }
    }
    result = beg + result;
  }
  if (end) {
    rlen++;
    if (end.slice(-1) === ']') {
      if (imbalanced) {
        end = end.slice(0, end.length - 1) + '\\]';
      } else {
        end = '[' + end;
      }
    }
    result += end;
  }

  if (rlen > 1) {
    result = result.split('][').join(']|[');
    if (result.indexOf('|') !== -1 && !/\(\?/.test(result)) {
      result = '(?:' + result + ')';
    }
  }

  result = result.replace(/\[+=|=\]+/g, '\\b');
  return result;
}

brackets.makeRe = function(pattern) {
  try {
    return new RegExp(brackets(pattern));
  } catch (err) {}
};

brackets.isMatch = function(str, pattern) {
  try {
    return brackets.makeRe(pattern).test(str);
  } catch (err) {
    return false;
  }
};

brackets.match = function(arr, pattern) {
  var len = arr.length, i = 0;
  var res = arr.slice();

  var re = brackets.makeRe(pattern);
  while (i < len) {
    var ele = arr[i++];
    if (!re.test(ele)) {
      continue;
    }
    res.splice(i, 1);
  }
  return res;
};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob = function isExtglob(str) {
  return typeof str === 'string'
    && /[@?!+*]\(/.test(str);
};

/**
 * Module dependencies
 */


var re, cache$2 = {};

/**
 * Expose `extglob`
 */

var extglob_1 = extglob;

/**
 * Convert the given extglob `string` to a regex-compatible
 * string.
 *
 * ```js
 * var extglob = require('extglob');
 * extglob('!(a?(b))');
 * //=> '(?!a(?:b)?)[^/]*?'
 * ```
 *
 * @param {String} `str` The string to convert.
 * @param {Object} `options`
 *   @option {Boolean} [options] `esc` If `false` special characters will not be escaped. Defaults to `true`.
 *   @option {Boolean} [options] `regex` If `true` a regular expression is returned instead of a string.
 * @return {String}
 * @api public
 */


function extglob(str, opts) {
  opts = opts || {};
  var o = {}, i = 0;

  // fix common character reversals
  // '*!(.js)' => '*.!(js)'
  str = str.replace(/!\(([^\w*()])/g, '$1!(');

  // support file extension negation
  str = str.replace(/([*\/])\.!\([*]\)/g, function (m, ch) {
    if (ch === '/') {
      return escape('\\/[^.]+');
    }
    return escape('[^.]+');
  });

  // create a unique key for caching by
  // combining the string and options
  var key = str
    + String(!!opts.regex)
    + String(!!opts.contains)
    + String(!!opts.escape);

  if (cache$2.hasOwnProperty(key)) {
    return cache$2[key];
  }

  if (!(re instanceof RegExp)) {
    re = regex();
  }

  opts.negate = false;
  var m;

  while (m = re.exec(str)) {
    var prefix = m[1];
    var inner = m[3];
    if (prefix === '!') {
      opts.negate = true;
    }

    var id = '__EXTGLOB_' + (i++) + '__';
    // use the prefix of the _last_ (outtermost) pattern
    o[id] = wrap$2(inner, prefix, opts.escape);
    str = str.split(m[0]).join(id);
  }

  var keys = Object.keys(o);
  var len = keys.length;

  // we have to loop again to allow us to convert
  // patterns in reverse order (starting with the
  // innermost/last pattern first)
  while (len--) {
    var prop = keys[len];
    str = str.split(prop).join(o[prop]);
  }

  var result = opts.regex
    ? toRegex(str, opts.contains, opts.negate)
    : str;

  result = result.split('.').join('\\.');

  // cache the result and return it
  return (cache$2[key] = result);
}

/**
 * Convert `string` to a regex string.
 *
 * @param  {String} `str`
 * @param  {String} `prefix` Character that determines how to wrap the string.
 * @param  {Boolean} `esc` If `false` special characters will not be escaped. Defaults to `true`.
 * @return {String}
 */

function wrap$2(inner, prefix, esc) {
  if (esc) inner = escape(inner);

  switch (prefix) {
    case '!':
      return '(?!' + inner + ')[^/]' + (esc ? '%%%~' : '*?');
    case '@':
      return '(?:' + inner + ')';
    case '+':
      return '(?:' + inner + ')+';
    case '*':
      return '(?:' + inner + ')' + (esc ? '%%' : '*')
    case '?':
      return '(?:' + inner + '|)';
    default:
      return inner;
  }
}

function escape(str) {
  str = str.split('*').join('[^/]%%%~');
  str = str.split('.').join('\\.');
  return str;
}

/**
 * extglob regex.
 */

function regex() {
  return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/;
}

/**
 * Negation regex
 */

function negate(str) {
  return '(?!^' + str + ').*$';
}

/**
 * Create the regex to do the matching. If
 * the leading character in the `pattern` is `!`
 * a negation regex is returned.
 *
 * @param {String} `pattern`
 * @param {Boolean} `contains` Allow loose matching.
 * @param {Boolean} `isNegated` True if the pattern is a negation pattern.
 */

function toRegex(pattern, contains, isNegated) {
  var prefix = contains ? '^' : '';
  var after = contains ? '$' : '';
  pattern = ('(?:' + pattern + ')' + after);
  if (isNegated) {
    pattern = prefix + negate(pattern);
  }
  return new RegExp(prefix + pattern);
}

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isGlob = function isGlob(str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
     || isExtglob(str));
};

var isWin = process.platform === 'win32';

var removeTrailingSeparator = function (str) {
	var i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str, i) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var normalizePath = function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
};

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtendable = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var forIn = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};

var hasOwn = Object.prototype.hasOwnProperty;

var forOwn = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};

var object_omit = function omit(obj, keys) {
  if (!isExtendable(obj)) return {};

  keys = [].concat.apply([], [].slice.call(arguments, 1));
  var last = keys[keys.length - 1];
  var res = {}, fn;

  if (typeof last === 'function') {
    fn = keys.pop();
  }

  var isFunction = typeof fn === 'function';
  if (!keys.length && !isFunction) {
    return obj;
  }

  forOwn(obj, function(value, key) {
    if (keys.indexOf(key) === -1) {

      if (!isFunction) {
        res[key] = value;
      } else if (fn(value, key, obj)) {
        res[key] = value;
      }
    }
  });
  return res;
};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob$1 = function isExtglob(str) {
  return typeof str === 'string'
    && /[@?!+*]\(/.test(str);
};

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isGlob$1 = function isGlob(str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
     || isExtglob$1(str));
};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob$2 = function isExtglob(str) {
  return typeof str === 'string'
    && /[@?!+*]\(/.test(str);
};

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isGlob$2 = function isGlob(str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
     || isExtglob$2(str));
};

var globParent = function globParent(str) {
	str += 'a'; // preserves full path in case of trailing path separator
	do {str = path.dirname(str);} while (isGlob$2(str));
	return str;
};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob$3 = function isExtglob(str) {
  return typeof str === 'string'
    && /[@?!+*]\(/.test(str);
};

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isGlob$3 = function isGlob(str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
     || isExtglob$3(str));
};

var globBase = function globBase(pattern) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob-base expects a string.');
  }

  var res = {};
  res.base = globParent(pattern);
  res.isGlob = isGlob$3(pattern);

  if (res.base !== '.') {
    res.glob = pattern.substr(res.base.length);
    if (res.glob.charAt(0) === '/') {
      res.glob = res.glob.substr(1);
    }
  } else {
    res.glob = pattern;
  }

  if (!res.isGlob) {
    res.base = dirname$1(pattern);
    res.glob = res.base !== '.'
      ? pattern.substr(res.base.length)
      : pattern;
  }

  if (res.glob.substr(0, 2) === './') {
    res.glob = res.glob.substr(2);
  }
  if (res.glob.charAt(0) === '/') {
    res.glob = res.glob.substr(1);
  }
  return res;
};

function dirname$1(glob) {
  if (glob.slice(-1) === '/') return glob;
  return path.dirname(glob);
}

/*!
 * is-dotfile <https://github.com/jonschlinkert/is-dotfile>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isDotfile = function(str) {
  if (str.charCodeAt(0) === 46 /* . */ && str.indexOf('/', 1) === -1) {
    return true;
  }
  var slash = str.lastIndexOf('/');
  return slash !== -1 ? str.charCodeAt(slash + 1) === 46  /* . */ : false;
};

var parseGlob = createCommonjsModule(function (module) {






/**
 * Expose `cache`
 */

var cache = module.exports.cache = {};

/**
 * Parse a glob pattern into tokens.
 *
 * When no paths or '**' are in the glob, we use a
 * different strategy for parsing the filename, since
 * file names can contain braces and other difficult
 * patterns. such as:
 *
 *  - `*.{a,b}`
 *  - `(**|*.js)`
 */

module.exports = function parseGlob(glob) {
  if (cache.hasOwnProperty(glob)) {
    return cache[glob];
  }

  var tok = {};
  tok.orig = glob;
  tok.is = {};

  // unescape dots and slashes in braces/brackets
  glob = escape(glob);

  var parsed = globBase(glob);
  tok.is.glob = parsed.isGlob;

  tok.glob = parsed.glob;
  tok.base = parsed.base;
  var segs = /([^\/]*)$/.exec(glob);

  tok.path = {};
  tok.path.dirname = '';
  tok.path.basename = segs[1] || '';
  tok.path.dirname = glob.split(tok.path.basename).join('') || '';
  var basename$$1 = (tok.path.basename || '').split('.') || '';
  tok.path.filename = basename$$1[0] || '';
  tok.path.extname = basename$$1.slice(1).join('.') || '';
  tok.path.ext = '';

  if (isGlob$1(tok.path.dirname) && !tok.path.basename) {
    if (!/\/$/.test(tok.glob)) {
      tok.path.basename = tok.glob;
    }
    tok.path.dirname = tok.base;
  }

  if (glob.indexOf('/') === -1 && !tok.is.globstar) {
    tok.path.dirname = '';
    tok.path.basename = tok.orig;
  }

  var dot = tok.path.basename.indexOf('.');
  if (dot !== -1) {
    tok.path.filename = tok.path.basename.slice(0, dot);
    tok.path.extname = tok.path.basename.slice(dot);
  }

  if (tok.path.extname.charAt(0) === '.') {
    var exts = tok.path.extname.split('.');
    tok.path.ext = exts[exts.length - 1];
  }

  // unescape dots and slashes in braces/brackets
  tok.glob = unescape(tok.glob);
  tok.path.dirname = unescape(tok.path.dirname);
  tok.path.basename = unescape(tok.path.basename);
  tok.path.filename = unescape(tok.path.filename);
  tok.path.extname = unescape(tok.path.extname);

  // Booleans
  var is = (glob && tok.is.glob);
  tok.is.negated  = glob && glob.charAt(0) === '!';
  tok.is.extglob  = glob && isExtglob$1(glob);
  tok.is.braces   = has(is, glob, '{');
  tok.is.brackets = has(is, glob, '[:');
  tok.is.globstar = has(is, glob, '**');
  tok.is.dotfile  = isDotfile(tok.path.basename) || isDotfile(tok.path.filename);
  tok.is.dotdir   = dotdir(tok.path.dirname);
  return (cache[glob] = tok);
};

/**
 * Returns true if the glob matches dot-directories.
 *
 * @param  {Object} `tok` The tokens object
 * @param  {Object} `path` The path object
 * @return {Object}
 */

function dotdir(base) {
  if (base.indexOf('/.') !== -1) {
    return true;
  }
  if (base.charAt(0) === '.' && base.charAt(1) !== '/') {
    return true;
  }
  return false;
}

/**
 * Returns true if the pattern has the given `ch`aracter(s)
 *
 * @param  {Object} `glob` The glob pattern.
 * @param  {Object} `ch` The character to test for
 * @return {Object}
 */

function has(is, glob, ch) {
  return is && glob.indexOf(ch) !== -1;
}

/**
 * Escape/unescape utils
 */

function escape(str) {
  var re = /\{([^{}]*?)}|\(([^()]*?)\)|\[([^\[\]]*?)\]/g;
  return str.replace(re, function (outter, braces, parens, brackets) {
    var inner = braces || parens || brackets;
    if (!inner) { return outter; }
    return outter.split(inner).join(esc(inner));
  });
}

function esc(str) {
  str = str.split('/').join('__SLASH__');
  str = str.split('.').join('__DOT__');
  return str;
}

function unescape(str) {
  str = str.split('__SLASH__').join('/');
  str = str.split('__DOT__').join('.');
  return str;
}
});
var parseGlob_1 = parseGlob.cache;

/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// see http://jsperf.com/testing-value-is-primitive/7
var isPrimitive = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

var isEqualShallow = function isEqual(a, b) {
  if (!a && !b) { return true; }
  if (!a && b || a && !b) { return false; }

  var numKeysA = 0, numKeysB = 0, key;
  for (key in b) {
    numKeysB++;
    if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
      return false;
    }
  }
  for (key in a) {
    numKeysA++;
  }
  return numKeysA === numKeysB;
};

var basic = {};
var cache$3 = {};

/**
 * Expose `regexCache`
 */

var regexCache_1 = regexCache;

/**
 * Memoize the results of a call to the new RegExp constructor.
 *
 * @param  {Function} fn [description]
 * @param  {String} str [description]
 * @param  {Options} options [description]
 * @param  {Boolean} nocompare [description]
 * @return {RegExp}
 */

function regexCache(fn, str, opts) {
  var key = '_default_', regex, cached;

  if (!str && !opts) {
    if (typeof fn !== 'function') {
      return fn;
    }
    return basic[key] || (basic[key] = fn(str));
  }

  var isString = typeof str === 'string';
  if (isString) {
    if (!opts) {
      return basic[str] || (basic[str] = fn(str));
    }
    key = str;
  } else {
    opts = str;
  }

  cached = cache$3[key];
  if (cached && isEqualShallow(cached.opts, opts)) {
    return cached.regex;
  }

  memo(key, opts, (regex = fn(str, opts)));
  return regex;
}

function memo(key, opts, regex) {
  cache$3[key] = {regex: regex, opts: opts};
}

/**
 * Expose `cache`
 */

var cache_1 = cache$3;
var basic_1 = basic;
regexCache_1.cache = cache_1;
regexCache_1.basic = basic_1;

var utils_1 = createCommonjsModule(function (module) {

var win32 = process && process.platform === 'win32';


var utils = module.exports;

/**
 * Module dependencies
 */

utils.diff = arrDiff;
utils.unique = arrayUnique;
utils.braces = braces_1;
utils.brackets = expandBrackets;
utils.extglob = extglob_1;
utils.isExtglob = isExtglob;
utils.isGlob = isGlob;
utils.typeOf = kindOf;
utils.normalize = normalizePath;
utils.omit = object_omit;
utils.parseGlob = parseGlob;
utils.cache = regexCache_1;

/**
 * Get the filename of a filepath
 *
 * @param {String} `string`
 * @return {String}
 */

utils.filename = function filename(fp) {
  var seg = fp.match(filenameRegex());
  return seg && seg[0];
};

/**
 * Returns a function that returns true if the given
 * pattern is the same as a given `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.isPath = function isPath(pattern, opts) {
  opts = opts || {};
  return function(fp) {
    var unixified = utils.unixify(fp, opts);
    if(opts.nocase){
      return pattern.toLowerCase() === unixified.toLowerCase();
    }
    return pattern === unixified;
  };
};

/**
 * Returns a function that returns true if the given
 * pattern contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.hasPath = function hasPath(pattern, opts) {
  return function(fp) {
    return utils.unixify(pattern, opts).indexOf(fp) !== -1;
  };
};

/**
 * Returns a function that returns true if the given
 * pattern matches or contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.matchPath = function matchPath(pattern, opts) {
  var fn = (opts && opts.contains)
    ? utils.hasPath(pattern, opts)
    : utils.isPath(pattern, opts);
  return fn;
};

/**
 * Returns a function that returns true if the given
 * regex matches the `filename` of a file path.
 *
 * @param {RegExp} `re`
 * @return {Boolean}
 */

utils.hasFilename = function hasFilename(re) {
  return function(fp) {
    var name = utils.filename(fp);
    return name && re.test(name);
  };
};

/**
 * Coerce `val` to an array
 *
 * @param  {*} val
 * @return {Array}
 */

utils.arrayify = function arrayify(val) {
  return !Array.isArray(val)
    ? [val]
    : val;
};

/**
 * Normalize all slashes in a file path or glob pattern to
 * forward slashes.
 */

utils.unixify = function unixify(fp, opts) {
  if (opts && opts.unixify === false) return fp;
  if (opts && opts.unixify === true || win32 || path.sep === '\\') {
    return utils.normalize(fp, false);
  }
  if (opts && opts.unescape === true) {
    return fp ? fp.toString().replace(/\\(\w)/g, '$1') : '';
  }
  return fp;
};

/**
 * Escape/unescape utils
 */

utils.escapePath = function escapePath(fp) {
  return fp.replace(/[\\.]/g, '\\$&');
};

utils.unescapeGlob = function unescapeGlob(fp) {
  return fp.replace(/[\\"']/g, '');
};

utils.escapeRe = function escapeRe(str) {
  return str.replace(/[-[\\$*+?.#^\s{}(|)\]]/g, '\\$&');
};

/**
 * Expose `utils`
 */

module.exports = utils;
});

var chars$2 = {}, unesc, temp;

function reverse(object, prepender) {
  return Object.keys(object).reduce(function(reversed, key) {
    var newKey = prepender ? prepender + key : key; // Optionally prepend a string to key.
    reversed[object[key]] = newKey; // Swap key and value.
    return reversed; // Return the result.
  }, {});
}

/**
 * Regex for common characters
 */

chars$2.escapeRegex = {
  '?': /\?/g,
  '@': /\@/g,
  '!': /\!/g,
  '+': /\+/g,
  '*': /\*/g,
  '(': /\(/g,
  ')': /\)/g,
  '[': /\[/g,
  ']': /\]/g
};

/**
 * Escape characters
 */

chars$2.ESC = {
  '?': '__UNESC_QMRK__',
  '@': '__UNESC_AMPE__',
  '!': '__UNESC_EXCL__',
  '+': '__UNESC_PLUS__',
  '*': '__UNESC_STAR__',
  ',': '__UNESC_COMMA__',
  '(': '__UNESC_LTPAREN__',
  ')': '__UNESC_RTPAREN__',
  '[': '__UNESC_LTBRACK__',
  ']': '__UNESC_RTBRACK__'
};

/**
 * Unescape characters
 */

chars$2.UNESC = unesc || (unesc = reverse(chars$2.ESC, '\\'));

chars$2.ESC_TEMP = {
  '?': '__TEMP_QMRK__',
  '@': '__TEMP_AMPE__',
  '!': '__TEMP_EXCL__',
  '*': '__TEMP_STAR__',
  '+': '__TEMP_PLUS__',
  ',': '__TEMP_COMMA__',
  '(': '__TEMP_LTPAREN__',
  ')': '__TEMP_RTPAREN__',
  '[': '__TEMP_LTBRACK__',
  ']': '__TEMP_RTBRACK__'
};

chars$2.TEMP = temp || (temp = reverse(chars$2.ESC_TEMP));

var chars_1 = chars$2;

var glob = createCommonjsModule(function (module) {




/**
 * Expose `Glob`
 */

var Glob = module.exports = function Glob(pattern, options) {
  if (!(this instanceof Glob)) {
    return new Glob(pattern, options);
  }
  this.options = options || {};
  this.pattern = pattern;
  this.history = [];
  this.tokens = {};
  this.init(pattern);
};

/**
 * Initialize defaults
 */

Glob.prototype.init = function(pattern) {
  this.orig = pattern;
  this.negated = this.isNegated();
  this.options.track = this.options.track || false;
  this.options.makeRe = true;
};

/**
 * Push a change into `glob.history`. Useful
 * for debugging.
 */

Glob.prototype.track = function(msg) {
  if (this.options.track) {
    this.history.push({msg: msg, pattern: this.pattern});
  }
};

/**
 * Return true if `glob.pattern` was negated
 * with `!`, also remove the `!` from the pattern.
 *
 * @return {Boolean}
 */

Glob.prototype.isNegated = function() {
  if (this.pattern.charCodeAt(0) === 33 /* '!' */) {
    this.pattern = this.pattern.slice(1);
    return true;
  }
  return false;
};

/**
 * Expand braces in the given glob pattern.
 *
 * We only need to use the [braces] lib when
 * patterns are nested.
 */

Glob.prototype.braces = function() {
  if (this.options.nobraces !== true && this.options.nobrace !== true) {
    // naive/fast check for imbalanced characters
    var a = this.pattern.match(/[\{\(\[]/g);
    var b = this.pattern.match(/[\}\)\]]/g);

    // if imbalanced, don't optimize the pattern
    if (a && b && (a.length !== b.length)) {
      this.options.makeRe = false;
    }

    // expand brace patterns and join the resulting array
    var expanded = utils_1.braces(this.pattern, this.options);
    this.pattern = expanded.join('|');
  }
};

/**
 * Expand bracket expressions in `glob.pattern`
 */

Glob.prototype.brackets = function() {
  if (this.options.nobrackets !== true) {
    this.pattern = utils_1.brackets(this.pattern);
  }
};

/**
 * Expand bracket expressions in `glob.pattern`
 */

Glob.prototype.extglob = function() {
  if (this.options.noextglob === true) return;

  if (utils_1.isExtglob(this.pattern)) {
    this.pattern = utils_1.extglob(this.pattern, {escape: true});
  }
};

/**
 * Parse the given pattern
 */

Glob.prototype.parse = function(pattern) {
  this.tokens = utils_1.parseGlob(pattern || this.pattern, true);
  return this.tokens;
};

/**
 * Replace `a` with `b`. Also tracks the change before and
 * after each replacement. This is disabled by default, but
 * can be enabled by setting `options.track` to true.
 *
 * Also, when the pattern is a string, `.split()` is used,
 * because it's much faster than replace.
 *
 * @param  {RegExp|String} `a`
 * @param  {String} `b`
 * @param  {Boolean} `escape` When `true`, escapes `*` and `?` in the replacement.
 * @return {String}
 */

Glob.prototype._replace = function(a, b, escape) {
  this.track('before (find): "' + a + '" (replace with): "' + b + '"');
  if (escape) b = esc(b);
  if (a && b && typeof a === 'string') {
    this.pattern = this.pattern.split(a).join(b);
  } else {
    this.pattern = this.pattern.replace(a, b);
  }
  this.track('after');
};

/**
 * Escape special characters in the given string.
 *
 * @param  {String} `str` Glob pattern
 * @return {String}
 */

Glob.prototype.escape = function(str) {
  this.track('before escape: ');
  var re = /["\\](['"]?[^"'\\]['"]?)/g;

  this.pattern = str.replace(re, function($0, $1) {
    var o = chars_1.ESC;
    var ch = o && o[$1];
    if (ch) {
      return ch;
    }
    if (/[a-z]/i.test($0)) {
      return $0.split('\\').join('');
    }
    return $0;
  });

  this.track('after escape: ');
};

/**
 * Unescape special characters in the given string.
 *
 * @param  {String} `str`
 * @return {String}
 */

Glob.prototype.unescape = function(str) {
  var re = /__([A-Z]+)_([A-Z]+)__/g;
  this.pattern = str.replace(re, function($0, $1) {
    return chars_1[$1][$0];
  });
  this.pattern = unesc(this.pattern);
};

/**
 * Escape/unescape utils
 */

function esc(str) {
  str = str.split('?').join('%~');
  str = str.split('*').join('%%');
  return str;
}

function unesc(str) {
  str = str.split('%~').join('?');
  str = str.split('%%').join('*');
  return str;
}
});

/**
 * Expose `expand`
 */

var expand_1 = expand;

/**
 * Expand a glob pattern to resolve braces and
 * similar patterns before converting to regex.
 *
 * @param  {String|Array} `pattern`
 * @param  {Array} `files`
 * @param  {Options} `opts`
 * @return {Array}
 */

function expand(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('micromatch.expand(): argument should be a string.');
  }

  var glob$$1 = new glob(pattern, options || {});
  var opts = glob$$1.options;

  if (!utils_1.isGlob(pattern)) {
    glob$$1.pattern = glob$$1.pattern.replace(/([\/.])/g, '\\$1');
    return glob$$1;
  }

  glob$$1.pattern = glob$$1.pattern.replace(/(\+)(?!\()/g, '\\$1');
  glob$$1.pattern = glob$$1.pattern.split('$').join('\\$');

  if (typeof opts.braces !== 'boolean' && typeof opts.nobraces !== 'boolean') {
    opts.braces = true;
  }

  if (glob$$1.pattern === '.*') {
    return {
      pattern: '\\.' + star,
      tokens: tok,
      options: opts
    };
  }

  if (glob$$1.pattern === '*') {
    return {
      pattern: oneStar(opts.dot),
      tokens: tok,
      options: opts
    };
  }

  // parse the glob pattern into tokens
  glob$$1.parse();
  var tok = glob$$1.tokens;
  tok.is.negated = opts.negated;

  // dotfile handling
  if ((opts.dotfiles === true || tok.is.dotfile) && opts.dot !== false) {
    opts.dotfiles = true;
    opts.dot = true;
  }

  if ((opts.dotdirs === true || tok.is.dotdir) && opts.dot !== false) {
    opts.dotdirs = true;
    opts.dot = true;
  }

  // check for braces with a dotfile pattern
  if (/[{,]\./.test(glob$$1.pattern)) {
    opts.makeRe = false;
    opts.dot = true;
  }

  if (opts.nonegate !== true) {
    opts.negated = glob$$1.negated;
  }

  // if the leading character is a dot or a slash, escape it
  if (glob$$1.pattern.charAt(0) === '.' && glob$$1.pattern.charAt(1) !== '/') {
    glob$$1.pattern = '\\' + glob$$1.pattern;
  }

  /**
   * Extended globs
   */

  // expand braces, e.g `{1..5}`
  glob$$1.track('before braces');
  if (tok.is.braces) {
    glob$$1.braces();
  }
  glob$$1.track('after braces');

  // expand extglobs, e.g `foo/!(a|b)`
  glob$$1.track('before extglob');
  if (tok.is.extglob) {
    glob$$1.extglob();
  }
  glob$$1.track('after extglob');

  // expand brackets, e.g `[[:alpha:]]`
  glob$$1.track('before brackets');
  if (tok.is.brackets) {
    glob$$1.brackets();
  }
  glob$$1.track('after brackets');

  // special patterns
  glob$$1._replace('[!', '[^');
  glob$$1._replace('(?', '(%~');
  glob$$1._replace(/\[\]/, '\\[\\]');
  glob$$1._replace('/[', '/' + (opts.dot ? dotfiles : nodot) + '[', true);
  glob$$1._replace('/?', '/' + (opts.dot ? dotfiles : nodot) + '[^/]', true);
  glob$$1._replace('/.', '/(?=.)\\.', true);

  // windows drives
  glob$$1._replace(/^(\w):([\\\/]+?)/gi, '(?=.)$1:$2', true);

  // negate slashes in exclusion ranges
  if (glob$$1.pattern.indexOf('[^') !== -1) {
    glob$$1.pattern = negateSlash(glob$$1.pattern);
  }

  if (opts.globstar !== false && glob$$1.pattern === '**') {
    glob$$1.pattern = globstar(opts.dot);

  } else {
    glob$$1.pattern = balance(glob$$1.pattern, '[', ']');
    glob$$1.escape(glob$$1.pattern);

    // if the pattern has `**`
    if (tok.is.globstar) {
      glob$$1.pattern = collapse(glob$$1.pattern, '/**');
      glob$$1.pattern = collapse(glob$$1.pattern, '**/');
      glob$$1._replace('/**/', '(?:/' + globstar(opts.dot) + '/|/)', true);
      glob$$1._replace(/\*{2,}/g, '**');

      // 'foo/*'
      glob$$1._replace(/(\w+)\*(?!\/)/g, '$1[^/]*?', true);
      glob$$1._replace(/\*\*\/\*(\w)/g, globstar(opts.dot) + '\\/' + (opts.dot ? dotfiles : nodot) + '[^/]*?$1', true);

      if (opts.dot !== true) {
        glob$$1._replace(/\*\*\/(.)/g, '(?:**\\/|)$1');
      }

      // 'foo/**' or '{**,*}', but not 'foo**'
      if (tok.path.dirname !== '' || /,\*\*|\*\*,/.test(glob$$1.orig)) {
        glob$$1._replace('**', globstar(opts.dot), true);
      }
    }

    // ends with /*
    glob$$1._replace(/\/\*$/, '\\/' + oneStar(opts.dot), true);
    // ends with *, no slashes
    glob$$1._replace(/(?!\/)\*$/, star, true);
    // has 'n*.' (partial wildcard w/ file extension)
    glob$$1._replace(/([^\/]+)\*/, '$1' + oneStar(true), true);
    // has '*'
    glob$$1._replace('*', oneStar(opts.dot), true);
    glob$$1._replace('?.', '?\\.', true);
    glob$$1._replace('?:', '?:', true);

    glob$$1._replace(/\?+/g, function(match) {
      var len = match.length;
      if (len === 1) {
        return qmark;
      }
      return qmark + '{' + len + '}';
    });

    // escape '.abc' => '\\.abc'
    glob$$1._replace(/\.([*\w]+)/g, '\\.$1');
    // fix '[^\\\\/]'
    glob$$1._replace(/\[\^[\\\/]+\]/g, qmark);
    // '///' => '\/'
    glob$$1._replace(/\/+/g, '\\/');
    // '\\\\\\' => '\\'
    glob$$1._replace(/\\{2,}/g, '\\');
  }

  // unescape previously escaped patterns
  glob$$1.unescape(glob$$1.pattern);
  glob$$1._replace('__UNESC_STAR__', '*');

  // escape dots that follow qmarks
  glob$$1._replace('?.', '?\\.');

  // remove unnecessary slashes in character classes
  glob$$1._replace('[^\\/]', qmark);

  if (glob$$1.pattern.length > 1) {
    if (/^[\[?*]/.test(glob$$1.pattern)) {
      // only prepend the string if we don't want to match dotfiles
      glob$$1.pattern = (opts.dot ? dotfiles : nodot) + glob$$1.pattern;
    }
  }

  return glob$$1;
}

/**
 * Collapse repeated character sequences.
 *
 * ```js
 * collapse('a/../../../b', '../');
 * //=> 'a/../b'
 * ```
 *
 * @param  {String} `str`
 * @param  {String} `ch` Character sequence to collapse
 * @return {String}
 */

function collapse(str, ch) {
  var res = str.split(ch);
  var isFirst = res[0] === '';
  var isLast = res[res.length - 1] === '';
  res = res.filter(Boolean);
  if (isFirst) res.unshift('');
  if (isLast) res.push('');
  return res.join(ch);
}

/**
 * Negate slashes in exclusion ranges, per glob spec:
 *
 * ```js
 * negateSlash('[^foo]');
 * //=> '[^\\/foo]'
 * ```
 *
 * @param  {String} `str` glob pattern
 * @return {String}
 */

function negateSlash(str) {
  return str.replace(/\[\^([^\]]*?)\]/g, function(match, inner) {
    if (inner.indexOf('/') === -1) {
      inner = '\\/' + inner;
    }
    return '[^' + inner + ']';
  });
}

/**
 * Escape imbalanced braces/bracket. This is a very
 * basic, naive implementation that only does enough
 * to serve the purpose.
 */

function balance(str, a, b) {
  var aarr = str.split(a);
  var alen = aarr.join('').length;
  var blen = str.split(b).join('').length;

  if (alen !== blen) {
    str = aarr.join('\\' + a);
    return str.split(b).join('\\' + b);
  }
  return str;
}

/**
 * Special patterns to be converted to regex.
 * Heuristics are used to simplify patterns
 * and speed up processing.
 */

/* eslint no-multi-spaces: 0 */
var qmark       = '[^/]';
var star        = qmark + '*?';
var nodot       = '(?!\\.)(?=.)';
var dotfileGlob = '(?:\\/|^)\\.{1,2}($|\\/)';
var dotfiles    = '(?!' + dotfileGlob + ')(?=.)';
var twoStarDot  = '(?:(?!' + dotfileGlob + ').)*?';

/**
 * Create a regex for `*`.
 *
 * If `dot` is true, or the pattern does not begin with
 * a leading star, then return the simpler regex.
 */

function oneStar(dotfile) {
  return dotfile ? '(?!' + dotfileGlob + ')(?=.)' + star : (nodot + star);
}

function globstar(dotfile) {
  if (dotfile) { return twoStarDot; }
  return '(?:(?!(?:\\/|^)\\.).)*?';
}

/**
 * The main function. Pass an array of filepaths,
 * and a string or array of glob patterns
 *
 * @param  {Array|String} `files`
 * @param  {Array|String} `patterns`
 * @param  {Object} `opts`
 * @return {Array} Array of matches
 */

function micromatch(files, patterns, opts) {
  if (!files || !patterns) return [];
  opts = opts || {};

  if (typeof opts.cache === 'undefined') {
    opts.cache = true;
  }

  if (!Array.isArray(patterns)) {
    return match(files, patterns, opts);
  }

  var len = patterns.length, i = 0;
  var omit = [], keep = [];

  while (len--) {
    var glob = patterns[i++];
    if (typeof glob === 'string' && glob.charCodeAt(0) === 33 /* ! */) {
      omit.push.apply(omit, match(files, glob.slice(1), opts));
    } else {
      keep.push.apply(keep, match(files, glob, opts));
    }
  }
  return utils_1.diff(keep, omit);
}

/**
 * Return an array of files that match the given glob pattern.
 *
 * This function is called by the main `micromatch` function If you only
 * need to pass a single pattern you might get very minor speed improvements
 * using this function.
 *
 * @param  {Array} `files`
 * @param  {String} `pattern`
 * @param  {Object} `options`
 * @return {Array}
 */

function match(files, pattern, opts) {
  if (utils_1.typeOf(files) !== 'string' && !Array.isArray(files)) {
    throw new Error(msg('match', 'files', 'a string or array'));
  }

  files = utils_1.arrayify(files);
  opts = opts || {};

  var negate = opts.negate || false;
  var orig = pattern;

  if (typeof pattern === 'string') {
    negate = pattern.charAt(0) === '!';
    if (negate) {
      pattern = pattern.slice(1);
    }

    // we need to remove the character regardless,
    // so the above logic is still needed
    if (opts.nonegate === true) {
      negate = false;
    }
  }

  var _isMatch = matcher(pattern, opts);
  var len = files.length, i = 0;
  var res = [];

  while (i < len) {
    var file = files[i++];
    var fp = utils_1.unixify(file, opts);

    if (!_isMatch(fp)) { continue; }
    res.push(fp);
  }

  if (res.length === 0) {
    if (opts.failglob === true) {
      throw new Error('micromatch.match() found no matches for: "' + orig + '".');
    }

    if (opts.nonull || opts.nullglob) {
      res.push(utils_1.unescapeGlob(orig));
    }
  }

  // if `negate` was defined, diff negated files
  if (negate) { res = utils_1.diff(files, res); }

  // if `ignore` was defined, diff ignored filed
  if (opts.ignore && opts.ignore.length) {
    pattern = opts.ignore;
    opts = utils_1.omit(opts, ['ignore']);
    res = utils_1.diff(res, micromatch(res, pattern, opts));
  }

  if (opts.nodupes) {
    return utils_1.unique(res);
  }
  return res;
}

/**
 * Returns a function that takes a glob pattern or array of glob patterns
 * to be used with `Array#filter()`. (Internally this function generates
 * the matching function using the [matcher] method).
 *
 * ```js
 * var fn = mm.filter('[a-c]');
 * ['a', 'b', 'c', 'd', 'e'].filter(fn);
 * //=> ['a', 'b', 'c']
 * ```
 * @param  {String|Array} `patterns` Can be a glob or array of globs.
 * @param  {Options} `opts` Options to pass to the [matcher] method.
 * @return {Function} Filter function to be passed to `Array#filter()`.
 */

function filter$1(patterns, opts) {
  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
    throw new TypeError(msg('filter', 'patterns', 'a string or array'));
  }

  patterns = utils_1.arrayify(patterns);
  var len = patterns.length, i = 0;
  var patternMatchers = Array(len);
  while (i < len) {
    patternMatchers[i] = matcher(patterns[i++], opts);
  }

  return function(fp) {
    if (fp == null) return [];
    var len = patternMatchers.length, i = 0;
    var res = true;

    fp = utils_1.unixify(fp, opts);
    while (i < len) {
      var fn = patternMatchers[i++];
      if (!fn(fp)) {
        res = false;
        break;
      }
    }
    return res;
  };
}

/**
 * Returns true if the filepath contains the given
 * pattern. Can also return a function for matching.
 *
 * ```js
 * isMatch('foo.md', '*.md', {});
 * //=> true
 *
 * isMatch('*.md', {})('foo.md')
 * //=> true
 * ```
 * @param  {String} `fp`
 * @param  {String} `pattern`
 * @param  {Object} `opts`
 * @return {Boolean}
 */

function isMatch(fp, pattern, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError(msg('isMatch', 'filepath', 'a string'));
  }

  fp = utils_1.unixify(fp, opts);
  if (utils_1.typeOf(pattern) === 'object') {
    return matcher(fp, pattern);
  }
  return matcher(pattern, opts)(fp);
}

/**
 * Returns true if the filepath matches the
 * given pattern.
 */

function contains(fp, pattern, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError(msg('contains', 'pattern', 'a string'));
  }

  opts = opts || {};
  opts.contains = (pattern !== '');
  fp = utils_1.unixify(fp, opts);

  if (opts.contains && !utils_1.isGlob(pattern)) {
    return fp.indexOf(pattern) !== -1;
  }
  return matcher(pattern, opts)(fp);
}

/**
 * Returns true if a file path matches any of the
 * given patterns.
 *
 * @param  {String} `fp` The filepath to test.
 * @param  {String|Array} `patterns` Glob patterns to use.
 * @param  {Object} `opts` Options to pass to the `matcher()` function.
 * @return {String}
 */

function any(fp, patterns, opts) {
  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
    throw new TypeError(msg('any', 'patterns', 'a string or array'));
  }

  patterns = utils_1.arrayify(patterns);
  var len = patterns.length;

  fp = utils_1.unixify(fp, opts);
  while (len--) {
    var isMatch = matcher(patterns[len], opts);
    if (isMatch(fp)) {
      return true;
    }
  }
  return false;
}

/**
 * Filter the keys of an object with the given `glob` pattern
 * and `options`
 *
 * @param  {Object} `object`
 * @param  {Pattern} `object`
 * @return {Array}
 */

function matchKeys(obj, glob, options) {
  if (utils_1.typeOf(obj) !== 'object') {
    throw new TypeError(msg('matchKeys', 'first argument', 'an object'));
  }

  var fn = matcher(glob, options);
  var res = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && fn(key)) {
      res[key] = obj[key];
    }
  }
  return res;
}

/**
 * Return a function for matching based on the
 * given `pattern` and `options`.
 *
 * @param  {String} `pattern`
 * @param  {Object} `options`
 * @return {Function}
 */

function matcher(pattern, opts) {
  // pattern is a function
  if (typeof pattern === 'function') {
    return pattern;
  }
  // pattern is a regex
  if (pattern instanceof RegExp) {
    return function(fp) {
      return pattern.test(fp);
    };
  }

  if (typeof pattern !== 'string') {
    throw new TypeError(msg('matcher', 'pattern', 'a string, regex, or function'));
  }

  // strings, all the way down...
  pattern = utils_1.unixify(pattern, opts);

  // pattern is a non-glob string
  if (!utils_1.isGlob(pattern)) {
    return utils_1.matchPath(pattern, opts);
  }
  // pattern is a glob string
  var re = makeRe(pattern, opts);

  // `matchBase` is defined
  if (opts && opts.matchBase) {
    return utils_1.hasFilename(re, opts);
  }
  // `matchBase` is not defined
  return function(fp) {
    fp = utils_1.unixify(fp, opts);
    return re.test(fp);
  };
}

/**
 * Create and cache a regular expression for matching
 * file paths.
 *
 * If the leading character in the `glob` is `!`, a negation
 * regex is returned.
 *
 * @param  {String} `glob`
 * @param  {Object} `options`
 * @return {RegExp}
 */

function toRegex$1(glob, options) {
  // clone options to prevent  mutating the original object
  var opts = Object.create(options || {});
  var flags = opts.flags || '';
  if (opts.nocase && flags.indexOf('i') === -1) {
    flags += 'i';
  }

  var parsed = expand_1(glob, opts);

  // pass in tokens to avoid parsing more than once
  opts.negated = opts.negated || parsed.negated;
  opts.negate = opts.negated;
  glob = wrapGlob(parsed.pattern, opts);
  var re;

  try {
    re = new RegExp(glob, flags);
    return re;
  } catch (err) {
    err.reason = 'micromatch invalid regex: (' + re + ')';
    if (opts.strict) throw new SyntaxError(err);
  }

  // we're only here if a bad pattern was used and the user
  // passed `options.silent`, so match nothing
  return /$^/;
}

/**
 * Create the regex to do the matching. If the leading
 * character in the `glob` is `!` a negation regex is returned.
 *
 * @param {String} `glob`
 * @param {Boolean} `negate`
 */

function wrapGlob(glob, opts) {
  var prefix = (opts && !opts.contains) ? '^' : '';
  var after = (opts && !opts.contains) ? '$' : '';
  glob = ('(?:' + glob + ')' + after);
  if (opts && opts.negate) {
    return prefix + ('(?!^' + glob + ').*$');
  }
  return prefix + glob;
}

/**
 * Create and cache a regular expression for matching file paths.
 * If the leading character in the `glob` is `!`, a negation
 * regex is returned.
 *
 * @param  {String} `glob`
 * @param  {Object} `options`
 * @return {RegExp}
 */

function makeRe(glob, opts) {
  if (utils_1.typeOf(glob) !== 'string') {
    throw new Error(msg('makeRe', 'glob', 'a string'));
  }
  return utils_1.cache(toRegex$1, glob, opts);
}

/**
 * Make error messages consistent. Follows this format:
 *
 * ```js
 * msg(methodName, argNumber, nativeType);
 * // example:
 * msg('matchKeys', 'first', 'an object');
 * ```
 *
 * @param  {String} `method`
 * @param  {String} `num`
 * @param  {String} `type`
 * @return {String}
 */

function msg(method, what, type) {
  return 'micromatch.' + method + '(): ' + what + ' should be ' + type + '.';
}

/**
 * Public methods
 */

/* eslint no-multi-spaces: 0 */
micromatch.any       = any;
micromatch.braces    = micromatch.braceExpand = utils_1.braces;
micromatch.contains  = contains;
micromatch.expand    = expand_1;
micromatch.filter    = filter$1;
micromatch.isMatch   = isMatch;
micromatch.makeRe    = makeRe;
micromatch.match     = match;
micromatch.matcher   = matcher;
micromatch.matchKeys = matchKeys;

/**
 * Expose `micromatch`
 */

var micromatch_1 = micromatch;

function ensureArray ( thing ) {
	if ( Array.isArray( thing ) ) return thing;
	if ( thing == undefined ) return [];
	return [ thing ];
}

function createFilter ( include, exclude ) {
	const getMatcher = id => ( isRegexp$1( id ) ? id : { test: micromatch_1.matcher( resolve( id ) ) } );
	include = ensureArray( include ).map( getMatcher );
	exclude = ensureArray( exclude ).map( getMatcher );

	return function ( id ) {

		if ( typeof id !== 'string' ) return false;
		if ( /\0/.test( id ) ) return false;

		id = id.split( sep ).join( '/' );

		for ( let i = 0; i < exclude.length; ++i ) {
			const matcher = exclude[i];
			if ( matcher.test( id ) ) return false;
		}

		for ( let i = 0; i < include.length; ++i ) {
			const matcher = include[i];
			if ( matcher.test( id ) ) return true;
		}

		return !include.length;
	};
}

function isRegexp$1 ( val ) {
	return val instanceof RegExp;
}

var modules = {};

var getModule = function(dir) {
  var rootPath = dir ? path.resolve(dir) : process.cwd();
  var rootName = path.join(rootPath, '@root');
  var root = modules[rootName];
  if (!root) {
    root = new module$1(rootName);
    root.filename = rootName;
    root.paths = module$1._nodeModulePaths(rootPath);
    modules[rootName] = root;
  }
  return root;
};

var requireRelative = function(requested, relativeTo) {
  var root = getModule(relativeTo);
  return root.require(requested);
};

requireRelative.resolve = function(requested, relativeTo) {
  var root = getModule(relativeTo);
  return module$1._resolveFilename(requested, root);
};

var requireRelative_1 = requireRelative;

var chokidar;
try {
    chokidar = requireRelative_1('chokidar', process.cwd());
}
catch (err) {
    chokidar = null;
}
var chokidar$1 = chokidar;

var opts = { encoding: 'utf-8', persistent: true };
var watchers = new Map();
function addTask(id, task, chokidarOptions, chokidarOptionsHash, isTransformDependency) {
    if (!watchers.has(chokidarOptionsHash))
        watchers.set(chokidarOptionsHash, new Map());
    var group = watchers.get(chokidarOptionsHash);
    var watcher = group.get(id) || new FileWatcher(id, chokidarOptions, group);
    if (!watcher.fileExists) {
        if (isTransformDependency)
            throw new Error("Transform dependency " + id + " does not exist.");
    }
    else {
        watcher.addTask(task, isTransformDependency);
    }
}
function deleteTask(id, target, chokidarOptionsHash) {
    var group = watchers.get(chokidarOptionsHash);
    var watcher = group.get(id);
    if (watcher)
        watcher.deleteTask(target, group);
}
var FileWatcher = /** @class */ (function () {
    function FileWatcher(id, chokidarOptions, group) {
        var _this = this;
        this.id = id;
        this.tasks = new Set();
        this.transformDependencyTasks = new Set();
        var modifiedTime;
        try {
            var stats = statSync(id);
            modifiedTime = +stats.mtime;
            this.fileExists = true;
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                // can't watch files that don't exist (e.g. injected
                // by plugins somehow)
                this.fileExists = false;
                return;
            }
            else {
                throw err;
            }
        }
        var handleWatchEvent = function (event) {
            if (event === 'rename' || event === 'unlink') {
                _this.close();
                group.delete(id);
                _this.trigger(id);
            }
            else {
                var stats = void 0;
                try {
                    stats = statSync(id);
                }
                catch (err) {
                    if (err.code === 'ENOENT') {
                        modifiedTime = -1;
                        _this.trigger(id);
                        return;
                    }
                    throw err;
                }
                // debounce
                if (+stats.mtime - modifiedTime > 15)
                    _this.trigger(id);
            }
        };
        if (chokidarOptions) {
            this.fsWatcher = chokidar$1.watch(id, chokidarOptions).on('all', handleWatchEvent);
        }
        else {
            this.fsWatcher = watch(id, opts, handleWatchEvent);
        }
        group.set(id, this);
    }
    FileWatcher.prototype.addTask = function (task, isTransformDependency) {
        if (isTransformDependency === void 0) { isTransformDependency = false; }
        if (isTransformDependency)
            this.transformDependencyTasks.add(task);
        else
            this.tasks.add(task);
    };
    FileWatcher.prototype.deleteTask = function (task, group) {
        var deleted = this.tasks.delete(task);
        deleted = this.transformDependencyTasks.delete(task) || deleted;
        if (deleted && this.tasks.size === 0 && this.transformDependencyTasks.size === 0) {
            group.delete(this.id);
            this.close();
        }
    };
    FileWatcher.prototype.close = function () {
        this.fsWatcher.close();
    };
    FileWatcher.prototype.trigger = function (id) {
        this.tasks.forEach(function (task) {
            task.invalidate(id, false);
        });
        this.transformDependencyTasks.forEach(function (task) {
            task.invalidate(id, true);
        });
    };
    return FileWatcher;
}());

var DELAY = 200;
var Watcher = /** @class */ (function (_super) {
    __extends(Watcher, _super);
    function Watcher(configs) {
        if (configs === void 0) { configs = []; }
        var _this = _super.call(this) || this;
        _this.rerun = false;
        _this.succeeded = false;
        if (!Array.isArray(configs))
            configs = [configs];
        _this.tasks = configs.map(function (config) { return new Task(_this, config); });
        _this.running = true;
        process.nextTick(function () { return _this.run(); });
        return _this;
    }
    Watcher.prototype.close = function () {
        if (this.buildTimeout)
            clearTimeout(this.buildTimeout);
        this.tasks.forEach(function (task) {
            task.close();
        });
        this.removeAllListeners();
    };
    Watcher.prototype.invalidate = function () {
        var _this = this;
        if (this.running) {
            this.rerun = true;
            return;
        }
        if (this.buildTimeout)
            clearTimeout(this.buildTimeout);
        this.buildTimeout = setTimeout(function () {
            _this.buildTimeout = undefined;
            _this.run();
        }, DELAY);
    };
    Watcher.prototype.run = function () {
        var _this = this;
        this.running = true;
        this.emit('event', {
            code: 'START'
        });
        var taskPromise = Promise.resolve();
        var _loop_1 = function (task) {
            taskPromise = taskPromise.then(function () { return task.run(); });
        };
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            _loop_1(task);
        }
        return taskPromise
            .then(function () {
            _this.succeeded = true;
            _this.running = false;
            _this.emit('event', {
                code: 'END'
            });
        })
            .catch(function (error) {
            _this.running = false;
            _this.emit('event', {
                code: _this.succeeded ? 'ERROR' : 'FATAL',
                error: error
            });
        })
            .then(function () {
            if (_this.rerun) {
                _this.rerun = false;
                _this.invalidate();
            }
        });
    };
    return Watcher;
}(EventEmitter));
var Task = /** @class */ (function () {
    function Task(watcher, config) {
        this.invalidated = true;
        this.cache = null;
        this.watcher = watcher;
        this.closed = false;
        this.watched = new Set();
        var _a = mergeOptions({
            config: config
        }), inputOptions = _a.inputOptions, outputOptions = _a.outputOptions, deprecations = _a.deprecations;
        this.inputOptions = inputOptions;
        this.outputs = outputOptions;
        this.outputFiles = this.outputs.map(function (output) {
            if (output.file || output.dir)
                return path.resolve(output.file || output.dir);
        });
        var watchOptions = inputOptions.watch || {};
        if ('useChokidar' in watchOptions)
            watchOptions.chokidar = watchOptions.useChokidar;
        var chokidarOptions = 'chokidar' in watchOptions ? watchOptions.chokidar : !!chokidar$1;
        if (chokidarOptions) {
            chokidarOptions = __assign({}, (chokidarOptions === true ? {} : chokidarOptions), { ignoreInitial: true });
        }
        if (chokidarOptions && !chokidar$1) {
            throw new Error("watch.chokidar was provided, but chokidar could not be found. Have you installed it?");
        }
        this.chokidarOptions = chokidarOptions;
        this.chokidarOptionsHash = JSON.stringify(chokidarOptions);
        this.filter = createFilter(watchOptions.include, watchOptions.exclude);
        this.deprecations = deprecations.concat((watchOptions._deprecations || []));
    }
    Task.prototype.close = function () {
        var _this = this;
        this.closed = true;
        this.watched.forEach(function (id) {
            deleteTask(id, _this, _this.chokidarOptionsHash);
        });
    };
    Task.prototype.invalidate = function (id, isTransformDependency) {
        this.watcher.emit('change', id);
        this.invalidated = true;
        if (isTransformDependency) {
            this.cache.modules.forEach(function (module) {
                if (!module.transformDependencies || module.transformDependencies.indexOf(id) === -1)
                    return;
                // effective invalidation
                module.originalCode = null;
            });
        }
        this.watcher.invalidate();
    };
    Task.prototype.run = function () {
        var _this = this;
        if (!this.invalidated)
            return;
        this.invalidated = false;
        var options = __assign({}, this.inputOptions, { cache: this.cache });
        var start = Date.now();
        this.watcher.emit('event', {
            code: 'BUNDLE_START',
            input: this.inputOptions.input,
            output: this.outputFiles
        });
        if (this.deprecations.length) {
            this.inputOptions.onwarn({
                code: 'DEPRECATED_OPTIONS',
                deprecations: this.deprecations,
                message: "The following options have been renamed \u2014 please update your config: " + this.deprecations
                    .map(function (option) { return option.old + " -> " + option.new; })
                    .join(', ')
            });
        }
        setWatcher(this.watcher);
        return rollup(options)
            .then(function (result) {
            if (_this.closed)
                return;
            var watched = (_this.watched = new Set());
            _this.cache = result.cache;
            _this.watchFiles = result.watchFiles;
            _this.cache.modules.forEach(function (module) {
                if (module.transformDependencies) {
                    module.transformDependencies.forEach(function (depId) {
                        watched.add(depId);
                        _this.watchFile(depId, true);
                    });
                }
            });
            _this.watchFiles.forEach(function (id) {
                watched.add(id);
                _this.watchFile(id);
            });
            _this.watched.forEach(function (id) {
                if (!watched.has(id))
                    deleteTask(id, _this, _this.chokidarOptionsHash);
            });
            return Promise.all(_this.outputs.map(function (output) {
                return result.write(output);
            })).then(function () { return result; });
        })
            .then(function (result) {
            _this.watcher.emit('event', {
                code: 'BUNDLE_END',
                input: _this.inputOptions.input,
                output: _this.outputFiles,
                duration: Date.now() - start,
                result: result
            });
        })
            .catch(function (error) {
            if (_this.closed)
                return;
            if (_this.cache) {
                // this is necessary to ensure that any 'renamed' files
                // continue to be watched following an error
                if (_this.cache.modules) {
                    _this.cache.modules.forEach(function (module) {
                        if (module.transformDependencies) {
                            module.transformDependencies.forEach(function (depId) {
                                _this.watchFile(depId, true);
                            });
                        }
                    });
                }
                _this.watchFiles.forEach(function (id) {
                    _this.watchFile(id);
                });
            }
            throw error;
        });
    };
    Task.prototype.watchFile = function (id, isTransformDependency) {
        if (isTransformDependency === void 0) { isTransformDependency = false; }
        if (!this.filter(id))
            return;
        if (this.outputFiles.some(function (file) { return file === id; })) {
            throw new Error('Cannot import the generated bundle');
        }
        // this is necessary to ensure that any 'renamed' files
        // continue to be watched following an error
        addTask(id, this, this.chokidarOptions, this.chokidarOptionsHash, isTransformDependency);
    };
    return Task;
}());
function watch$1(configs) {
    return new Watcher(configs);
}

__exports.rollup = rollup; __exports.watch = watch$1; __exports.VERSION = version$1; /*export { rollup, watch$1 as watch, version$1 as VERSION }*/;
//# sourceMappingURL=rollup.es.js.map

});
//# sourceURL=bench/samples/rollup.js