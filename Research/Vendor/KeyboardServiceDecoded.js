const _0x47670a = _0x1e27; /* string alignment removed */
var H = Object["defineProperty"],
    W = (_0x306a5c, _0x1610c9, _0x48f193) => _0x1610c9 in _0x306a5c ? H(_0x306a5c, _0x1610c9, {
        'enumerable': !0x0,
        'configurable': !0x0,
        'writable': !0x0,
        'value': _0x48f193
    }) : _0x306a5c[_0x1610c9] = _0x48f193,
    f = (_0x21819d, _0x24e826, _0x89b4b1) => W(_0x21819d, typeof _0x24e826 != "symbol" ? _0x24e826 + '' : _0x24e826, _0x89b4b1);
import {
    U as _0x42e134,
    h as _0x3c7f3a,
    m as _0x3304c6
} from './index-CeAyNk8A.js';
import {
    Y,
    a as _0x52e316
} from './BJXkBFdS.js';
import {
    av as _0x3156af
} from './TglCKVxb.js';
import './dsW7I39g.js';
import './DziNxeDg.js';
class A extends Error {
    constructor(_0x4bd6b9, _0x2e5ce3 = "SDK_ERROR") {
        const _0xdc4fa1 = _0x47670a;
        super(_0x4bd6b9), this["code"] = _0x2e5ce3, this["name"] = "SDKError";
    }
}
class G extends A {
    constructor(_0x39aa42, _0x2799f6) {
        const _0x302276 = _0x47670a;
        super(_0x39aa42, "DEVICE_ERR" + 'OR'), this["deviceId"] = _0x2799f6, this["name"] = "DeviceErro" + 'r';
    }
}
class q extends G {
    constructor(_0x5293f1) {
        const _0x506557 = _0x47670a;
        super("Device not found: " + _0x5293f1, _0x5293f1), this["name"] = "DeviceNotFoundError", this["code"] = "DEVICE_NOT_FOUND";
    }
}
class Z extends G {
    constructor(_0x103315 = "Permission denied for device access") {
        const _0x5ed901 = _0x47670a;
        super(_0x103315), this["name"] = "DevicePermissionErro" + 'r', this["code"] = "DEVICE_PERMISSION_ERROR";
    }
} /* decoder removed */
class v extends A {
    constructor(_0x495e66) {
        const _0x38500d = _0x47670a;
        super(_0x495e66, "CONFIG_ERR" + 'OR'), this["name"] = "ConfigErro" + 'r';
    }
}
class X extends A {
    constructor(_0x12730b) {
        const _0x3a12eb = _0x47670a;
        super("Browser does not support " + _0x12730b + (". Please use a modern browser that supports WebHID API.")), this["name"] = "BrowserCompatibilityError", this["code"] = "BROWSER_COMPATIBILITY_ERROR";
    }
}
class Q extends A {
    constructor(_0x56056d, _0xce41e2) {
        const _0x49c71e = _0x47670a;
        super("WebHID Error: " + _0x56056d, "WEBHID_ERR" + 'OR'), this["hidError"] = _0xce41e2, this["name"] = "WebHIDErro" + 'r';
    }
}
class R {
    static["handleErro" + 'r'](_0x2a527f, _0x258251 = "SDK") {
        const _0x4039f2 = _0x47670a;
        throw _0x2a527f instanceof A ? (console["error"]('[' + _0x258251 + ']\x20' + _0x2a527f["name"] + ':\x20' + _0x2a527f["message"], _0x2a527f), _0x2a527f) : _0x2a527f instanceof DOMException ? _0x2a527f["name"] === "SecurityError" ? new Z(_0x2a527f["message"]) : _0x2a527f["name"] === "NotFoundError" ? new G("Device not found or not accessible") : new Q(_0x2a527f["message"], _0x2a527f) : (console["error"]('[' + _0x258251 + ("] Unexpected error:"), _0x2a527f), new A("Unexpected error: " + String(_0x2a527f)));
    }
    static["checkBrowserCompatibility"]() {
        const _0x22a60e = _0x47670a;
        if (!("hid" in navigator)) throw new X("WebHID API");
    }
    static["validateConfig"](_0x4b9cc3) {
        const _0x4b9d27 = _0x47670a;
        if (!_0x4b9cc3 || typeof _0x4b9cc3 != "object") throw new v("Configuration is required and must be an object");
        if (!Array["isArray"](_0x4b9cc3["configs"]) || _0x4b9cc3["configs"]["length"] === 0x0) throw new v("Configuration must contain at least one device filter");
        for (const _0x34ab21 of _0x4b9cc3["configs"])
            if (typeof _0x34ab21["vendorId"] != "number" || typeof _0x34ab21["productId"] != "number") throw new v("Device filter must contain vendorId and productId as numbers");
    }
}
async function y(_0x20a319, _0x542760 = {}) {
    const _0x1cf314 = _0x47670a,
        {
            maxRetries: _0x3fc23c = 0x3,
            delay: _0x13e5c2 = 0x3e8,
            exponential: _0x11006c = !0x0,
            onRetry: _0x26c6a5
        } = _0x542760;
    let _0x5d98eb;
    for (let _0x2ec61d = 0x0; _0x2ec61d <= _0x3fc23c; _0x2ec61d++) try {
        return await _0x20a319();
    } catch (_0x3500a6) {
        if (_0x5d98eb = _0x3500a6, _0x2ec61d < _0x3fc23c) {
            _0x26c6a5 && _0x26c6a5(_0x5d98eb, _0x2ec61d + 0x1);
            const _0x3ca86e = _0x11006c ? _0x13e5c2 * Math["pow"](0x2, _0x2ec61d) : _0x13e5c2;
            await new Promise(_0x2b2186 => setTimeout(_0x2b2186, _0x3ca86e));
        }
    }
    throw _0x5d98eb;
}
class J {
    constructor() {
        const _0x16abc6 = _0x47670a;
        this["listeners"] = [];
    } ['on'](_0x5b9c0b) {
        const _0x3f8673 = _0x47670a;
        this["listeners"]["push"](_0x5b9c0b);
    } ["off"](_0x26b461) {
        const _0x4cf58b = _0x47670a;
        this["listeners"] = this["listeners"]["filter"](_0x2cc74b => _0x2cc74b !== _0x26b461);
    } ["emit"](_0x46ff3b) {
        const _0x33e989 = _0x47670a;
        this["listeners"]["forEach"](_0x1c4038 => _0x1c4038(_0x46ff3b));
    }
}
const ee = new Uint16Array([0x0, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0xa50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0xc60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0xe70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0xa1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x2b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x8e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0xaf1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0xcc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0xed1, 0x1ef0]);

function x(_0x37c6cf) {
    const _0x39ae95 = _0x47670a;
    let _0x1fbfa2 = 0xffff;
    for (let _0x3dd1c6 = 0x0; _0x3dd1c6 < _0x37c6cf["length"]; _0x3dd1c6++) _0x1fbfa2 = _0x1fbfa2 << 0x8 ^ ee[(_0x1fbfa2 >> 0x8 ^ _0x37c6cf[_0x3dd1c6]) & 0xff];
    return _0x1fbfa2 = (_0x1fbfa2 & 0xff) * 0x100 + (_0x1fbfa2 >> 0x8 & 0xff), _0x1fbfa2;
}

function L(_0x529f62) {
    const _0x34a2f2 = _0x47670a;
    return Array["from"](_0x529f62)["map"](_0x2c64d0 => _0x2c64d0["toString"](0x10)["padStart"](0x2, '0'))["join"]('\x20');
}

function re(_0x5d81c1) {
    const _0x25d17c = _0x47670a,
        _0x2eded5 = Array["from"](_0x5d81c1),
        _0x3e9fbf = 0x10;
    for (let _0x1bf06c = 0x0; _0x1bf06c < _0x2eded5["length"]; _0x1bf06c += _0x3e9fbf) {
        const _0x5d9506 = _0x2eded5["slice"](_0x1bf06c, _0x1bf06c + _0x3e9fbf),
            _0x1058ab = _0x5d9506["map"](_0x656d6a => _0x656d6a["toString"](0x10)["padStart"](0x2, '0'))["join"]('\x20'),
            _0x4a212d = _0x5d9506["map"](_0x4e5e65 => _0x4e5e65 >= 0x20 && _0x4e5e65 <= 0x7e ? String["fromCharCo" + 'de'](_0x4e5e65) : _0x4e5e65 === 0x0 ? '\x5c0' : _0x4e5e65 === 0x1 ? "\\x01" : _0x4e5e65 === 0x4 ? "\\x04" : _0x4e5e65 === 0x7c ? '|' : '.')["join"](''),
            _0x20f74c = _0x1bf06c["toString"](0x10)["padStart"](0x4, '0');
        console["log"](_0x20f74c + ':\x20' + _0x1058ab["padEnd"](_0x3e9fbf * 0x3) + '\x20\x20' + _0x4a212d);
    }
}

function b(_0x3215bf, _0x523e6a, _0x4d5b58) {
    const _0x4efd35 = _0x47670a;
    if (!Number["isInteger"](_0x3215bf) || !Number["isInteger"](_0x523e6a)) throw new Error("输入必须为整数");
    const _0x1528c6 = Math["max"](0x0, Math["min"](0x14, Math["floor"](_0x4d5b58)));
    return (_0x3215bf / _0x523e6a)["toFixed"](_0x1528c6);
}

function te(_0x280846, _0x3ee869, _0x193b62, _0x4e2135 = 0x1) {
    const _0x3641c9 = _0x47670a,
        _0x34fb90 = _0x280846 / 0xff,
        _0x412f22 = _0x3ee869 / 0xff,
        _0x166e4c = _0x193b62 / 0xff,
        _0x26df9e = Math["max"](_0x34fb90, _0x412f22, _0x166e4c),
        _0x54e9a9 = Math["min"](_0x34fb90, _0x412f22, _0x166e4c),
        _0x3c70a4 = _0x26df9e - _0x54e9a9;
    let _0x324569 = 0x0,
        _0x3d96de = 0x0;
    const _0x21e706 = _0x26df9e,
        _0x357c36 = _0x4e2135;
    if (_0x3c70a4 !== 0x0) {
        let _0x40b6dd;
        _0x26df9e === _0x34fb90 ? _0x40b6dd = (_0x412f22 - _0x166e4c) / _0x3c70a4 % 0x6 : _0x26df9e === _0x412f22 ? _0x40b6dd = (_0x166e4c - _0x34fb90) / _0x3c70a4 + 0x2 : _0x40b6dd = (_0x34fb90 - _0x412f22) / _0x3c70a4 + 0x4, _0x324569 = _0x40b6dd / 0x6, _0x324569 < 0x0 && (_0x324569 += 0x1);
    }
    return _0x26df9e !== 0x0 && (_0x3d96de = _0x3c70a4 / _0x26df9e), {
        'h': _0x324569,
        's': _0x3d96de,
        'v': _0x21e706,
        'a': _0x357c36
    };
}

function O(_0x446b85, _0x382d12, _0x13de62 = 0xff) {
    const _0x53f9cb = _0x47670a,
        _0x566367 = _0x446b85 / 0xff,
        _0x5c4910 = _0x382d12 / 0xff,
        _0x44a11a = _0x13de62 / 0xff,
        _0x29f8ff = Math["floor"](_0x566367 * 0x6),
        _0x167a13 = _0x566367 * 0x6 - _0x29f8ff,
        _0x3c656b = _0x44a11a * (0x1 - _0x5c4910),
        _0x4e0723 = _0x44a11a * (0x1 - _0x167a13 * _0x5c4910),
        _0x58997e = _0x44a11a * (0x1 - (0x1 - _0x167a13) * _0x5c4910);
    let _0x3e4eb5, _0x145037, _0x510dc6;
    switch (_0x29f8ff % 0x6) {
        case 0x0:
            _0x3e4eb5 = _0x44a11a, _0x145037 = _0x58997e, _0x510dc6 = _0x3c656b;
            break;
        case 0x1:
            _0x3e4eb5 = _0x4e0723, _0x145037 = _0x44a11a, _0x510dc6 = _0x3c656b;
            break;
        case 0x2:
            _0x3e4eb5 = _0x3c656b, _0x145037 = _0x44a11a, _0x510dc6 = _0x58997e;
            break;
        case 0x3:
            _0x3e4eb5 = _0x3c656b, _0x145037 = _0x4e0723, _0x510dc6 = _0x44a11a;
            break;
        case 0x4:
            _0x3e4eb5 = _0x58997e, _0x145037 = _0x3c656b, _0x510dc6 = _0x44a11a;
            break;
        case 0x5:
            _0x3e4eb5 = _0x44a11a, _0x145037 = _0x3c656b, _0x510dc6 = _0x4e0723;
            break;
        default:
            _0x3e4eb5 = 0x0, _0x145037 = 0x0, _0x510dc6 = 0x0;
    }
    return {
        'r': Math["round"](_0x3e4eb5 * 0xff),
        'g': Math["round"](_0x145037 * 0xff),
        'b': Math["round"](_0x510dc6 * 0xff)
    };
}
const c = {
        'CMD_VIA_WRITE_DATA': 0x0,
        'CMD_VIA_GET_PROTOCOL_VERSION': 0x1,
        'CMD_VIA_GET_KEYBOARD_VALUE': 0x2,
        'CMD_VIA_SET_KEYBOARD_VALUE': 0x3,
        'CMD_VIA_GET_KEYCODE': 0x4,
        'CMD_VIA_SET_KEYCODE': 0x5,
        'CMD_VIA_LIGHTING_SET_VALUE': 0x7,
        'CMD_VIA_LIGHTING_GET_VALUE': 0x8,
        'CMD_VIA_LIGHTING_SAVE': 0x9,
        'CMD_VIA_MACRO_GET_COUNT': 0xc,
        'CMD_VIA_MACRO_GET_BUFFER_SIZE': 0xd,
        'CMD_VIA_MACRO_GET_BUFFER': 0xe,
        'CMD_VIA_MACRO_SET_BUFFER': 0xf,
        'CMD_VIA_GET_LAYER_COUNT': 0x11,
        'CMD_VIA_KEYMAP_GET_BUFFER': 0x12,
        'CMD_VIA_VIAL_PREFIX': 0xfe,
        'CMD_VIA_SET_KEYBOARD_PARA': 0xaa,
        'CMD_VIA_GET_KEYBOARD_PARA': 0xab
    },
    g = {
        'VIA_LIGHTING_BRIGHTNESS': 0x1,
        'VIA_LIGHTING_EFFECT': 0x2,
        'VIA_LIGHTING_EFFECT_SPEED': 0x3,
        'VIA_LIGHTING_COLOR': 0x4
    },
    N = {
        'CMD_VIAL_GET_KEYBOARD_ID': 0x0,
        'CMD_VIAL_GET_SIZE': 0x1,
        'CMD_VIAL_GET_DEFINITION': 0x2,
        'CMD_VIAL_GET_ENCODER': 0x3,
        'CMD_VIAL_SET_ENCODER': 0x4,
        'CMD_VIAL_GET_UNLOCK_STATUS': 0x5,
        'CMD_VIAL_UNLOCK_START': 0x6,
        'CMD_VIAL_UNLOCK_POLL': 0x7,
        'CMD_VIAL_LOCK': 0x8,
        'CMD_VIAL_ADVANCED_KEY': 0xd
    }; /* string table removed */
class E {
    static["selectProtocol"](_0x1d3595) {
        const _0xb30955 = _0x47670a;
        return _0x1d3595["usagePage"] === 0xffa0 && _0x1d3595["usage"] === 0x1 ? "keyboard" : _0x1d3595["usagePage"] === 0xffa1 && _0x1d3595["usage"] === 0x1 ? "screen" : "generic";
    }
    static["encodeReadKeyboardDataCommand"](_0x1356e5, _0x4de9f1, _0x5e55e4) {
        const _0x47990a = _0x47670a,
            _0x33f246 = new Uint8Array(0x20);
        _0x33f246[0x0] = _0x1356e5, _0x33f246[0x1] = _0x4de9f1;
        for (let _0x1f72eb = 0x2; _0x1f72eb < 0x20; _0x1f72eb++) _0x33f246[_0x1f72eb] = 0x0;
        _0x1356e5 == 0x1d && (_0x33f246[0x2] = _0x5e55e4['T'], _0x33f246[0x3] = _0x5e55e4['M'], _0x33f246[0x4] = _0x5e55e4["row"], _0x33f246[0x5] = _0x5e55e4["col"], (_0x5e55e4['T'] === 0x5 || _0x5e55e4['T'] === 0x6 || _0x5e55e4['T'] === 0x7 || _0x5e55e4['T'] === 0x8) && (_0x33f246[0x8] = 0x1, _0x33f246[0x9] = _0x5e55e4["index"]));
        const _0x4b8dcb = x(_0x33f246);
        return _0x33f246[0x6] = _0x4b8dcb >> 0x8, _0x33f246[0x7] = _0x4b8dcb & 0xff, _0x33f246;
    }
    static["encodeReadKeyboardDataCommand_via"](_0x15db4b, _0xcbccc7, _0x18c021) {
        const _0x51c3d8 = _0x47670a,
            _0x17fdfc = new Uint8Array(0x20);
        for (let _0xbf892a = 0x0; _0xbf892a < 0x20; _0xbf892a++) _0x17fdfc[_0xbf892a] = 0x0;
        switch (_0x17fdfc[0x0] = _0x15db4b, _0x15db4b) {
            case c["CMD_VIA_GET_KEYCODE"]:
                _0x17fdfc[0x1] = _0x18c021["layer"], _0x17fdfc[0x2] = _0x18c021["row"], _0x17fdfc[0x3] = _0x18c021["col"];
                break;
            case c["CMD_VIA_LIGHTING_GET_VALUE"]:
                _0x17fdfc[0x1] = 0x3, _0x17fdfc[0x2] = _0x18c021["dataid"];
                break;
            case c["CMD_VIA_MACRO_GET_BUFFER"]:
                _0x17fdfc[0x1] = _0x18c021["offset"] / 0x100, _0x17fdfc[0x2] = _0x18c021["offset"] % 0x100, _0x17fdfc[0x3] = _0x18c021["size"];
                break;
            case c["CMD_VIA_KEYMAP_GET_BUFFER"]:
                _0x17fdfc[0x1] = Math["floor"](_0x18c021["offset"] / 0x100), _0x17fdfc[0x2] = _0x18c021["offset"] % 0x100, _0x17fdfc[0x3] = _0x18c021["size"];
                break;
            case c["CMD_VIA_VIAL_PREFIX"]:
                _0x17fdfc[0x1] = _0xcbccc7, _0xcbccc7 === N["CMD_VIAL_GET_DEFINITION"] ? (_0x17fdfc[0x2] = _0x18c021["block"] % 0x100, _0x17fdfc[0x3] = _0x18c021["block"] / 0x100) : _0xcbccc7 === N["CMD_VIAL_ADVANCED_KE" + 'Y'] && (_0x17fdfc[0x2] = 0x1, _0x17fdfc[0x3] = _0x18c021["index"]);
                break;
            case c["CMD_VIA_GET_KEYBOARD_PARA"]:
                _0x17fdfc[0x0] = 0x8, _0x17fdfc[0x1] = 0x0, _0x17fdfc[0x2] = 0x4, _0x17fdfc[0x3] = _0x18c021["dataItem"];
                break;
        }
        return _0x17fdfc;
    }
    static["decodeReadKeyboardDataResponse"](_0x39bc0e, _0x44d3fc, _0x2729a4) {
        const _0x462618 = _0x47670a;
        if (_0x2729a4["length"] < 0x20) throw new Error("Invalid response length: " + _0x2729a4["length"] + (", expected 32"));
        let _0x255dfe = '';
        if (_0x2729a4[0x0] !== _0x39bc0e || _0x2729a4[0x1] !== _0x44d3fc) throw new Error("Invalid response CMD/MODE: 0x" + _0x2729a4[0x0]["toString"](0x10) + "/0x" + _0x2729a4[0x1]["toString"](0x10));
        if (_0x39bc0e !== 0x1d && _0x2729a4[0x2] !== 0x0) throw new Error("Invalid STA: 0x" + _0x2729a4[0x2]["toString"](0x10));
        let _0x33f14e = _0x2729a4[0x5];
        if (_0x39bc0e === 0x1d && (_0x33f14e = _0x2729a4[0x8]), _0x33f14e < 0x1) return _0x255dfe;
        if (_0x39bc0e === 0x1d) {
            if (_0x2729a4[0x2] === 0x1) {
                if (_0x2729a4[0x3] === 0x0) _0x255dfe = (_0x2729a4[0xa] * 0x100 + _0x2729a4[0x9])["toString"]();
                else {
                    if (_0x2729a4[0x3] === 0x1) _0x255dfe = b(_0x2729a4[0xa] * 0x100 + _0x2729a4[0x9], 0x3e8, 0x3);
                    else {
                        if (_0x2729a4[0x3] === 0x2) _0x255dfe = (_0x2729a4[0xa] * 0x100 + _0x2729a4[0x9])["toString"](), _0x255dfe += ',' + b(_0x2729a4[0xc] * 0x100 + _0x2729a4[0xb], 0x3e8, 0x3);
                        else {
                            if (_0x2729a4[0x3] === 0x3) _0x255dfe = _0x2729a4[0x9]["toString"]();
                            else {
                                if (_0x2729a4[0x3] === 0x4 || _0x2729a4[0x3] === 0x5) _0x255dfe = _0x2729a4[0x9]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xa]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xb]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xc]["toString"](0x10)["padStart"](0x2, '0');
                                else {
                                    if (_0x2729a4[0x3] === 0x6) _0x255dfe = _0x2729a4[0x9]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xa]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xb]["toString"](0x10)["padStart"](0x2, '0'), _0x255dfe += ',' + _0x2729a4[0xc]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xd]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xe]["toString"](0x10)["padStart"](0x2, '0'), _0x255dfe += ',' + _0x2729a4[0xf]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x10]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x11]["toString"](0x10)["padStart"](0x2, '0');
                                    else {
                                        if (_0x2729a4[0x3] === 0x7) {
                                            for (let _0x1ee818 = 0x0; _0x1ee818 < 0x5; _0x1ee818++) _0x1ee818 > 0x0 && (_0x255dfe += ','), _0x255dfe += (_0x2729a4[0xa + _0x1ee818 * 0x4] * 0x100 + _0x2729a4[0x9 + _0x1ee818 * 0x4])["toString"](), _0x255dfe += ',' + b(_0x2729a4[0xc + _0x1ee818 * 0x4] * 0x100 + _0x2729a4[0xb + _0x1ee818 * 0x4], 0x3e8, 0x3);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (_0x2729a4[0x2] === 0x2) _0x2729a4[0x3] === 0x0 || _0x2729a4[0x3] === 0x1 ? _0x255dfe = _0x2729a4[0x9]["toString"]() : _0x2729a4[0x3] === 0x2 ? _0x255dfe = b(_0x2729a4[0xa] * 0x100 + _0x2729a4[0x9], 0x3e8, 0x3) : _0x2729a4[0x3] === 0x3 || _0x2729a4[0x3] === 0x4 ? _0x255dfe = (_0x2729a4[0xa] * 0x100 + _0x2729a4[0x9])["toString"]() : _0x2729a4[0x3] === 0x5 || _0x2729a4[0x3] === 0x6 ? _0x255dfe = _0x2729a4[0x9]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xa]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xb]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xc]["toString"](0x10)["padStart"](0x2, '0') : _0x2729a4[0x3] === 0xff && (_0x255dfe = _0x2729a4[0x9]["toString"](), _0x255dfe += ',' + _0x2729a4[0xa]["toString"](), _0x255dfe += ',' + b(_0x2729a4[0xc] * 0x100 + _0x2729a4[0xb], 0x3e8, 0x3), _0x255dfe += ',' + (_0x2729a4[0xe] * 0x100 + _0x2729a4[0xd])["toString"](), _0x255dfe += ',' + (_0x2729a4[0x10] * 0x100 + _0x2729a4[0xf])["toString"](), _0x255dfe += ',' + _0x2729a4[0x11]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x12]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x13]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x14]["toString"](0x10)["padStart"](0x2, '0'), _0x255dfe += ',' + _0x2729a4[0x15]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x16]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x17]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x18]["toString"](0x10)["padStart"](0x2, '0'));
                else {
                    if (_0x2729a4[0x2] === 0x4 && _0x2729a4[0x3] === 0xff) {
                        _0x255dfe = _0x2729a4[0x9]["toString"](), _0x255dfe += ',' + _0x2729a4[0xa]["toString"]();
                        for (let _0x3f4c8e = 0x0; _0x3f4c8e < 0xa; _0x3f4c8e++) _0x255dfe += ',' + b(_0x2729a4[0xc + _0x3f4c8e * 0x2] * 0x100 + _0x2729a4[0xb + _0x3f4c8e * 0x2], 0x3e8, 0x3);
                    } else {
                        if (_0x2729a4[0x2] === 0x5 && _0x2729a4[0x3] === 0xff) {
                            _0x255dfe = _0x2729a4[0x1]["toString"](), _0x255dfe += ',' + _0x2729a4[0x4]["toString"](), _0x255dfe += ',' + _0x2729a4[0x5]["toString"](), _0x255dfe += ',' + _0x2729a4[0x9]["toString"](), _0x255dfe += ',' + _0x2729a4[0xb]["toString"]();
                            for (let _0x219733 = 0x0; _0x219733 < 0x4; _0x219733++) _0x255dfe += ',' + b(_0x2729a4[0xd + _0x219733 * 0x2] * 0x100 + _0x2729a4[0xc + _0x219733 * 0x2], 0x3e8, 0x3);
                        } else {
                            if (_0x2729a4[0x2] === 0x6 && _0x2729a4[0x3] === 0xff) {
                                for (let _0x470a43 = 0x0; _0x470a43 < 0x14; _0x470a43++) _0x470a43 > 0x0 && (_0x255dfe += ','), _0x255dfe += _0x2729a4[0xa + _0x470a43]["toString"]();
                            } else _0x2729a4[0x2] === 0x7 && _0x2729a4[0x3] === 0xff ? (_0x255dfe = _0x2729a4[0x1]["toString"](), _0x255dfe += ',' + _0x2729a4[0x4]["toString"](), _0x255dfe += ',' + _0x2729a4[0x5]["toString"](), _0x255dfe += ',' + _0x2729a4[0x9]["toString"](), _0x255dfe += ',' + _0x2729a4[0xa]["toString"](), _0x255dfe += ',' + _0x2729a4[0xb]["toString"](), _0x255dfe += ',' + _0x2729a4[0xc]["toString"](), _0x255dfe += ',' + _0x2729a4[0xd]["toString"](), _0x255dfe += ',' + b(_0x2729a4[0xf] * 0x100 + _0x2729a4[0xe], 0x3e8, 0x3)) : _0x2729a4[0x2] === 0x8 && _0x2729a4[0x3] === 0xff && (_0x255dfe = _0x2729a4[0x1]["toString"](), _0x255dfe += ',' + _0x2729a4[0x4]["toString"](), _0x255dfe += ',' + _0x2729a4[0x5]["toString"](), _0x255dfe += ',' + _0x2729a4[0x9]["toString"](), _0x255dfe += ',' + _0x2729a4[0xa]["toString"](), _0x255dfe += ',' + _0x2729a4[0xb]["toString"](), _0x255dfe += ',' + _0x2729a4[0xc]["toString"](), _0x255dfe += ',' + _0x2729a4[0xd]["toString"](), _0x255dfe += ',' + _0x2729a4[0xe]["toString"](), _0x255dfe += ',' + b(_0x2729a4[0x10] * 0x100 + _0x2729a4[0xf], 0x3e8, 0x3));
                        }
                    }
                }
            }
        } else switch (_0x44d3fc) {
            case 0xd:
                _0x255dfe = this["mapRateValueToString"](_0x2729a4[0x8]);
                break;
            case 0x1:
            case 0x2:
            case 0x3:
            case 0x4:
            case 0x9:
            case 0xa:
            case 0xb:
                const _0x3c4046 = _0x2729a4["slice"](0x8, 0x8 + _0x33f14e),
                    _0x25f046 = new Uint8Array(_0x3c4046["length"]);
                let _0x21f5e1 = 0x0;
                for (let _0x3b0148 = 0x0; _0x3b0148 < _0x3c4046["length"]; _0x3b0148++) _0x3c4046[_0x3b0148] !== 0x0 && (_0x25f046[_0x21f5e1++] = _0x3c4046[_0x3b0148]);
                const _0x2d8529 = _0x25f046["slice"](0x0, _0x21f5e1);
                _0x255dfe = new TextDecoder("ascii")["decode"](_0x2d8529);
                break;
            case 0x5:
            case 0x6:
                const _0x2c4507 = _0x2729a4["slice"](0x8, 0x8 + _0x33f14e);
                _0x255dfe = Array["from"](_0x2c4507)["map"](_0x27a890 => _0x27a890["toString"](0x10)["padStart"](0x2, '0'))["join"]('');
                break;
            case 0x7:
                _0x255dfe = _0x2729a4[0x9]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0x8]["toString"](0x10)["padStart"](0x2, '0'), _0x255dfe += ',' + _0x2729a4[0xb]["toString"](0x10)["padStart"](0x2, '0') + _0x2729a4[0xa]["toString"](0x10)["padStart"](0x2, '0');
                break;
            case 0x8:
                _0x255dfe = _0x2729a4[0x8]["toString"]() + ',' + _0x2729a4[0x9]["toString"]();
                break;
            case 0xc:
            case 0xe:
            case 0xf:
            case 0x10:
            case 0x11:
            case 0x12:
                _0x255dfe = _0x2729a4[0x8]["toString"]();
                break;
            case 0x16:
                _0x255dfe = _0x2729a4[0x8]["toString"]() + ',' + _0x2729a4[0x9]["toString"]();
                break;
        }
        return _0x255dfe;
    }
    static["decodeReadKeyboardDataResponse_via"](_0x465a4a, _0x4220c9, _0x3526be, _0x4752c6) {
        const _0x37d0b0 = _0x47670a;
        if (_0x3526be["length"] < 0x20) throw new Error("Invalid response length: " + _0x3526be["length"] + (", expected 32"));
        let _0x2d0325;
        if (_0x465a4a === c["CMD_VIA_VIAL_PREFIX"]) return _0x4220c9 === N["CMD_VIAL_GET_SIZE"] ? _0x2d0325 = _0x3526be[0x3] << 0x18 | _0x3526be[0x2] << 0x10 | _0x3526be[0x1] << 0x8 | _0x3526be[0x0] : _0x4220c9 === N["CMD_VIAL_GET_DEFINITION"] ? _0x2d0325 = _0x3526be : _0x4220c9 === N["CMD_VIAL_ADVANCED_KE" + 'Y'] && _0x3526be[0x0] === 0x0 && (_0x4752c6["index"] < 0x40 ? (_0x2d0325 = _0x4752c6["index"]["toString"](), _0x2d0325 += ',' + (_0x3526be[0x2] * 0x100 + _0x3526be[0x1])["toString"](), _0x2d0325 += ',' + (_0x3526be[0x4] * 0x100 + _0x3526be[0x3])["toString"](), _0x2d0325 += ',' + (_0x3526be[0xa] * 0x100 + _0x3526be[0x9])["toString"]()) : (_0x2d0325 = (_0x4752c6["index"] - 0x40)["toString"](), _0x2d0325 += ',' + (_0x3526be[0x4] * 0x100 + _0x3526be[0x3])["toString"](), _0x2d0325 += ',' + (_0x3526be[0xa] * 0x100 + _0x3526be[0x9])["toString"]())), _0x2d0325;
        if (_0x465a4a === c["CMD_VIA_GET_KEYBOARD_PARA"]) return _0x3526be[0x4];
        if (_0x3526be[0x0] !== _0x465a4a) throw new Error("Invalid response mode: 0x" + _0x3526be[0x0]["toString"](0x10));
        switch (_0x465a4a) {
            case c["CMD_VIA_GET_PROTOCOL_VERSION"]:
                _0x2d0325 = _0x3526be[0x2];
                break;
            case c["CMD_VIA_GET_LAYER_COUNT"]:
                _0x2d0325 = _0x3526be[0x1];
                break;
            case c["CMD_VIA_GET_KEYCODE"]:
                _0x2d0325 = _0x3526be[0x4] * 0x100 + _0x3526be[0x5];
                break;
            case c["CMD_VIA_LIGHTING_GET_VALUE"]:
                if (_0x3526be[0x2] === g["VIA_LIGHTING_COLOR"]) {
                    const _0xab1e13 = O(_0x3526be[0x3], _0x3526be[0x4], 0xff);
                    _0x2d0325 = _0xab1e13['r'] * 0x100 * 0x100 + _0xab1e13['g'] * 0x100 + _0xab1e13['b'], console["log"]("返回RGB: " + _0x2d0325);
                } else _0x2d0325 = _0x3526be[0x3];
                break;
            case c["CMD_VIA_MACRO_GET_COUNT"]:
                _0x2d0325 = _0x3526be[0x1];
                break;
            case c["CMD_VIA_MACRO_GET_BUFFER_SIZE"]:
                _0x2d0325 = _0x3526be[0x1] * 0x100 + _0x3526be[0x2];
                break;
            case c["CMD_VIA_MACRO_GET_BUFFER"]:
                _0x2d0325 = _0x3526be["length"] >= 0x4 ? _0x3526be["slice"](0x4) : new Uint8Array(0x0);
                break;
            case c["CMD_VIA_KEYMAP_GET_BUFFER"]: {
                const _0x404432 = _0x3526be[0x1] << 0x8 | _0x3526be[0x2];
                if (_0x3526be[0x0] !== c["CMD_VIA_KEYMAP_GET_BUFFER"] || _0x404432 !== (_0x4752c6 == null ? void 0x0 : _0x4752c6["offset"])) throw new Error("Invalid keymap buffer response: cmd=0x" + _0x3526be[0x0]["toString"](0x10) + (", echoOffset=") + _0x404432 + (", expected offset=") + (_0x4752c6 == null ? void 0x0 : _0x4752c6["offset"]));
                const _0x2dc2eb = _0x3526be[0x3],
                    _0x24909d = Math["max"](0x0, Math["min"](_0x2dc2eb, _0x3526be["length"] - 0x4));
                _0x2d0325 = _0x24909d > 0x0 ? _0x3526be["slice"](0x4, 0x4 + _0x24909d) : new Uint8Array(0x0);
                break;
            }
        }
        return _0x2d0325;
    }
    static["decodeLightingUploadResponse"](_0x2e9ee0) {
        const _0x4399b9 = _0x47670a;
        if (_0x2e9ee0["length"] < 0x20 || _0x2e9ee0[0x0] !== c["CMD_VIA_LIGHTING_GET_VALUE"] || _0x2e9ee0[0x1] !== 0x3) return null;
        const _0x3628a6 = _0x2e9ee0[0x2];
        if (_0x3628a6 !== g["VIA_LIGHTING_BRIGHTNESS"] && _0x3628a6 !== g["VIA_LIGHTING_EFFECT"] && _0x3628a6 !== g["VIA_LIGHTING_EFFECT_SPEED"] && _0x3628a6 !== g["VIA_LIGHTING_COLOR"]) return null;
        let _0x526660;
        if (_0x3628a6 === g["VIA_LIGHTING_COLOR"]) {
            const _0x389936 = O(_0x2e9ee0[0x3], _0x2e9ee0[0x4], 0xff);
            _0x526660 = _0x389936['r'] * 0x100 * 0x100 + _0x389936['g'] * 0x100 + _0x389936['b'];
        } else _0x526660 = _0x2e9ee0[0x3];
        return {
            'dataid': _0x3628a6,
            'value': _0x526660
        };
    }
    static["encodeWriteKeyboardDataCommand"](_0x5c636e, _0x498799, _0x2668b1) {
        const _0x24fdd6 = _0x47670a,
            _0x533b7c = new Uint8Array(0x20);
        _0x533b7c[0x0] = _0x5c636e, _0x533b7c[0x1] = _0x498799;
        for (let _0x1f072d = 0x2; _0x1f072d < 0x20; _0x1f072d++) _0x533b7c[_0x1f072d] = 0x0;
        if (_0x5c636e == 0x1d) {
            if (_0x533b7c[0x2] = _0x2668b1['T'], _0x533b7c[0x3] = _0x2668b1['M'], _0x533b7c[0x4] = _0x2668b1["param"]["row"], _0x533b7c[0x5] = _0x2668b1["param"]["col"], _0x2668b1['T'] === 0x4 && _0x2668b1['M'] === 0xff) _0x533b7c[0x8] = 0x16, _0x533b7c[0x9] = _0x2668b1["param"]["RTEnable"], _0x533b7c[0xa] = _0x2668b1["param"]["conRTEnabl" + 'e'], this["writeFloatToBuffer"](_0x2668b1["param"]["bottomDeadZone"], 0x3e8, _0x533b7c, 0xb, 0xc), this["writeFloatToBuffer"](_0x2668b1["param"]["nonRTTrigDistancePre" + 'ss'], 0x3e8, _0x533b7c, 0xd, 0xe), this["writeFloatToBuffer"](_0x2668b1["param"]["nonRTTrigDistanceRelease"], 0x3e8, _0x533b7c, 0xf, 0x10), this["writeFloatToBuffer"](_0x2668b1["param"]["conRTTrigDistancePre" + 'ss'], 0x3e8, _0x533b7c, 0x11, 0x12), this["writeFloatToBuffer"](_0x2668b1["param"]["conRTTrigDistanceRelease"], 0x3e8, _0x533b7c, 0x13, 0x14), this["writeFloatToBuffer"](_0x2668b1["param"]["RTDeadZone" + 'Up'], 0x3e8, _0x533b7c, 0x15, 0x16), this["writeFloatToBuffer"](_0x2668b1["param"]["RTDeadZoneDown"], 0x3e8, _0x533b7c, 0x17, 0x18), this["writeFloatToBuffer"](_0x2668b1["param"]["RTTrigDeadZone"], 0x3e8, _0x533b7c, 0x19, 0x1a), this["writeFloatToBuffer"](_0x2668b1["param"]["RTTrigDistancePress"], 0x3e8, _0x533b7c, 0x1b, 0x1c), this["writeFloatToBuffer"](_0x2668b1["param"]["RTTrigDistanceReleas" + 'e'], 0x3e8, _0x533b7c, 0x1d, 0x1e);
            else {
                if (_0x2668b1['T'] === 0x5 && _0x2668b1['M'] === 0xff) _0x533b7c[0x8] = 0xb, _0x533b7c[0x9] = _0x2668b1["param"]["index"], _0x533b7c[0xa] = 0x1, _0x533b7c[0xb] = _0x2668b1["param"]["data"]["dbs"], this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["trps"][0x0], 0x3e8, _0x533b7c, 0xc, 0xd), this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["trps"][0x1], 0x3e8, _0x533b7c, 0xe, 0xf), this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["trps"][0x2], 0x3e8, _0x533b7c, 0x10, 0x11), this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["trps"][0x3], 0x3e8, _0x533b7c, 0x12, 0x13);
                else {
                    if (_0x2668b1['T'] === 0x6 && _0x2668b1['M'] === 0xff) {
                        _0x533b7c[0x8] = 0x15, _0x533b7c[0x9] = _0x2668b1["param"]["index"];
                        for (let _0x5e4508 = 0x0; _0x5e4508 < 0x14; _0x5e4508++) _0x533b7c[0xa + _0x5e4508] = _0x2668b1["param"]["data"]["kcs"][_0x5e4508];
                    } else {
                        if (_0x2668b1['T'] === 0x7 && _0x2668b1['M'] === 0xff) _0x533b7c[0x8] = 0x7, _0x533b7c[0x9] = _0x2668b1["param"]["index"], _0x533b7c[0xa] = _0x2668b1["param"]["data"]["rsEnable"], _0x533b7c[0xb] = _0x2668b1["param"]["row2"], _0x533b7c[0xc] = _0x2668b1["param"]["col2"], _0x533b7c[0xd] = _0x2668b1["param"]["data"]["rtEnable"], this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["startPoint"], 0x3e8, _0x533b7c, 0xe, 0xf);
                        else {
                            if (_0x2668b1['T'] === 0x8 && _0x2668b1['M'] === 0xff) _0x533b7c[0x8] = 0x8, _0x533b7c[0x9] = _0x2668b1["param"]["index"], _0x533b7c[0xa] = _0x2668b1["param"]["data"]["socdEnable"], _0x533b7c[0xb] = _0x2668b1["param"]["row2"], _0x533b7c[0xc] = _0x2668b1["param"]["col2"], _0x533b7c[0xd] = _0x2668b1["param"]["data"]["rtEnable"], _0x533b7c[0xe] = _0x2668b1["param"]["data"]["socdFunc"], this["writeFloatToBuffer"](_0x2668b1["param"]["data"]["startPoint"], 0x3e8, _0x533b7c, 0xf, 0x10);
                            else {
                                if (_0x2668b1['T'] === 0x0 && _0x2668b1['M'] === 0x0) _0x533b7c[0x8] = 0x3, _0x533b7c[0x9] = _0x2668b1["param"]["caliEnable"], this["writeFloatToBuffer"](_0x2668b1["param"]["time"], 0x1, _0x533b7c, 0xa, 0xb);
                                else {
                                    if (_0x2668b1['T'] === 0x2) {
                                        if (_0x2668b1['M'] === 0x0 || _0x2668b1['M'] === 0x1) _0x533b7c[0x8] = 0x1, _0x533b7c[0x9] = _0x2668b1["param"]["dataValue"][0x0];
                                        else {
                                            if (_0x2668b1['M'] === 0x2) _0x533b7c[0x8] = 0x1, this["writeFloatToBuffer"](_0x2668b1["param"]["dataValue"][0x0], 0x3e8, _0x533b7c, 0x9, 0xa);
                                            else {
                                                if (_0x2668b1['M'] === 0x3 || _0x2668b1['M'] === 0x4) _0x533b7c[0x8] = 0x2, this["writeFloatToBuffer"](_0x2668b1["param"]["dataValue"][0x0], 0x1, _0x533b7c, 0x9, 0xa);
                                                else {
                                                    if (_0x2668b1['M'] === 0x5 || _0x2668b1['M'] === 0x6) {
                                                        _0x533b7c[0x8] = 0x4;
                                                        const _0x45ec5d = _0x2668b1["param"]["dataValue"][0x0]["padStart"](0x8, '0')["slice"](-0x8);
                                                        for (let _0x35d599 = 0x0; _0x35d599 < 0x4; _0x35d599++) {
                                                            const _0x173b68 = _0x45ec5d["substring"](_0x35d599 * 0x2, _0x35d599 * 0x2 + 0x2);
                                                            _0x533b7c[0x9 + _0x35d599] = parseInt(_0x173b68, 0x10);
                                                        }
                                                    } else {
                                                        if (_0x2668b1['M'] === 0xff) {
                                                            _0x533b7c[0x8] = 0x14, _0x533b7c[0x9] = _0x2668b1["param"]["dataValue"][0x0], _0x533b7c[0xa] = _0x2668b1["param"]["dataValue"][0x1], this["writeFloatToBuffer"](_0x2668b1["param"]["dataValue"][0x2], 0x3e8, _0x533b7c, 0xb, 0xc), this["writeFloatToBuffer"](_0x2668b1["param"]["dataValue"][0x3], 0x1, _0x533b7c, 0xd, 0xe), this["writeFloatToBuffer"](_0x2668b1["param"]["dataValue"][0x4], 0x1, _0x533b7c, 0xf, 0x10);
                                                            const _0x1458c0 = _0x2668b1["param"]["dataValue"][0x5]["padStart"](0x8, '0')["slice"](-0x8);
                                                            for (let _0x37d737 = 0x0; _0x37d737 < 0x4; _0x37d737++) {
                                                                const _0x413746 = _0x1458c0["substring"](_0x37d737 * 0x2, _0x37d737 * 0x2 + 0x2);
                                                                _0x533b7c[0x11 + _0x37d737] = parseInt(_0x413746, 0x10);
                                                            }
                                                            const _0xa5e379 = _0x2668b1["param"]["dataValue"][0x6]["padStart"](0x8, '0')["slice"](-0x8);
                                                            for (let _0x4d37d5 = 0x0; _0x4d37d5 < 0x4; _0x4d37d5++) {
                                                                const _0x49b790 = _0xa5e379["substring"](_0x4d37d5 * 0x2, _0x4d37d5 * 0x2 + 0x2);
                                                                _0x533b7c[0x15 + _0x4d37d5] = parseInt(_0x49b790, 0x10);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else _0x5c636e == 0xfe ? _0x498799 === 0xd ? (_0x533b7c[0x2] = 0x2, _0x533b7c[0x3] = _0x2668b1["index"], _0x533b7c[0x4] = _0x2668b1["data"]["tapKeyCode"] % 0x100, _0x533b7c[0x5] = _0x2668b1["data"]["tapKeyCode"] / 0x100, _0x533b7c[0x6] = _0x2668b1["data"]["moKeyCode"] % 0x100, _0x533b7c[0x7] = _0x2668b1["data"]["moKeyCode"] / 0x100, _0x533b7c[0xc] = _0x2668b1["data"]["delayTime"] % 0x100, _0x533b7c[0xd] = _0x2668b1["data"]["delayTime"] / 0x100) : _0x498799 === 0xe && (_0x533b7c[0x1] = 0xd, _0x533b7c[0x2] = 0x2, _0x533b7c[0x3] = 0x40 + _0x2668b1["index"], _0x533b7c[0x6] = _0x2668b1["data"]["tglKeyCode"] % 0x100, _0x533b7c[0x7] = _0x2668b1["data"]["tglKeyCode"] / 0x100, _0x533b7c[0xa] = _0x2668b1["data"]["tglKeyCode"] % 0x100, _0x533b7c[0xb] = _0x2668b1["data"]["tglKeyCode"] / 0x100, _0x533b7c[0xc] = _0x2668b1["data"]["pressTime"] % 0x100, _0x533b7c[0xd] = _0x2668b1["data"]["pressTime"] / 0x100) : _0x498799 === 0x6 && (_0x533b7c[0x2] = _0x2668b1["dataValue"], _0x533b7c[0x5] = 0x1);
        if (_0x5c636e !== 0xfe) {
            const _0xab53f0 = x(_0x533b7c);
            _0x533b7c[0x6] = _0xab53f0 >> 0x8, _0x533b7c[0x7] = _0xab53f0 & 0xff;
        }
        return _0x533b7c;
    }
    static["writeFloatToBuffer"](_0x1f8845, _0x5c2cf7, _0x59f8df, _0x53a7ac, _0x18cc9b) {
        const _0x5ecc2c = _0x47670a,
            _0x42557f = Math["round"](_0x1f8845 * _0x5c2cf7) & 0xffff,
            _0x4c74a1 = _0x42557f & 0xff,
            _0x222705 = _0x42557f >> 0x8 & 0xff;
        _0x59f8df[_0x53a7ac] = _0x4c74a1, _0x59f8df[_0x18cc9b] = _0x222705;
    }
    static["encodeWriteKeyboardDataCommand_via"](_0x145383, _0x217ea4) {
        const _0x25a314 = _0x47670a,
            _0x1447f6 = new Uint8Array(0x20);
        for (let _0x1dd7b4 = 0x0; _0x1dd7b4 < 0x20; _0x1dd7b4++) _0x1447f6[_0x1dd7b4] = 0x0;
        switch (_0x1447f6[0x0] = _0x145383, _0x145383) {
            case c["CMD_VIA_SET_KEYCODE"]:
                _0x1447f6[0x1] = _0x217ea4["layer"], _0x1447f6[0x2] = _0x217ea4["row"], _0x1447f6[0x3] = _0x217ea4["col"], _0x1447f6[0x4] = _0x217ea4["keycode"] / 0x100, _0x1447f6[0x5] = _0x217ea4["keycode"] % 0x100;
                break;
            case c["CMD_VIA_LIGHTING_SET_VALUE"]:
                if (_0x1447f6[0x1] = 0x3, _0x1447f6[0x2] = _0x217ea4["dataid"], _0x217ea4["dataid"] === g["VIA_LIGHTING_COLOR"]) {
                    console["log"]("RGB: " + _0x217ea4["dataValue"]);
                    const _0x5abcd8 = Math["floor"](_0x217ea4["dataValue"] / 0x10000),
                        _0x3db625 = Math["floor"](_0x217ea4["dataValue"] % 0x10000 / 0x100),
                        _0x2ee4b0 = _0x217ea4["dataValue"] % 0x100;
                    console["log"]("R: " + _0x5abcd8 + "，G: " + _0x3db625 + "，B: " + _0x2ee4b0);
                    const _0xd09bc9 = te(_0x5abcd8, _0x3db625, _0x2ee4b0);
                    _0xd09bc9['h'] < 0x0 ? _0x1447f6[0x3] = 0x0 : _0x1447f6[0x3] = _0xd09bc9['h'] * 0xff, _0x1447f6[0x4] = _0xd09bc9['s'] * 0xff, console["log"]("色相: " + _0x1447f6[0x3] + "，饱和度: " + _0x1447f6[0x4]);
                } else _0x1447f6[0x3] = _0x217ea4["dataValue"];
                break;
            case c["CMD_VIA_LIGHTING_SAV" + 'E']:
                _0x1447f6[0x1] = 0x3;
                break;
            case c["CMD_VIA_WRITE_DATA"]:
                _0x1447f6["set"](_0x217ea4["data"], 0x0);
                break;
            case c["CMD_VIA_MACRO_SET_BUFFER"]:
                _0x1447f6[0x1] = _0x217ea4["offset"] / 0x100, _0x1447f6[0x2] = _0x217ea4["offset"] % 0x100, _0x1447f6[0x3] = _0x217ea4["data"]["length"], _0x1447f6["set"](_0x217ea4["data"], 0x4);
                break;
            case c["CMD_VIA_SET_KEYBOARD_PARA"]:
                _0x1447f6[0x0] = 0x7, _0x1447f6[0x1] = 0x0, _0x1447f6[0x2] = 0x4, _0x1447f6[0x3] = _0x217ea4["dataItem"], _0x1447f6[0x4] = _0x217ea4["dataValue"];
                break;
        }
        return _0x1447f6;
    }
    static["decodeWriteKeyboardDataRespons" + 'e'](_0xb3c94b, _0x780884, _0x575b90) {
        const _0x326060 = _0x47670a;
        if (_0x575b90["length"] < 0x20) throw new Error("Invalid response length: " + _0x575b90["length"] + (", expected 32"));
        if (_0xb3c94b === 0x1d) {
            if (_0x575b90[0x0] !== _0xb3c94b) throw new Error("Invalid response CMD: 0x" + _0x575b90[0x0]["toString"](0x10));
        } else {
            if (_0xb3c94b === 0xfe) {
                if (_0x575b90[0x1] !== 0xd) throw new Error("Invalid response MODE: 0x" + _0x575b90[0x1]["toString"](0x10));
            } else {
                if (_0x575b90[0x0] !== _0xb3c94b || _0x575b90[0x1] !== _0x780884) throw new Error("Invalid response CMD/MODE: 0x" + _0x575b90[0x0]["toString"](0x10) + "/0x" + _0x575b90[0x1]["toString"](0x10));
            }
        }
        if (_0xb3c94b !== 0xfe && _0xb3c94b !== 0x15 && _0x575b90[0x2] !== 0x0) throw new Error("Invalid STA: 0x" + _0x575b90[0x2]["toString"](0x10));
        return '';
    }
    static["decodeWriteKeyboardDataResponse_via"](_0x15d190, _0x981d31) {
        const _0x4441d0 = _0x47670a;
        if (_0x981d31["length"] < 0x20) throw new Error("Invalid response length: " + _0x981d31["length"] + (", expected 32"));
        let _0x16d459;
        if (_0x15d190 === 0x0 || _0x15d190 === 0xaa) return _0x16d459;
        if (_0x981d31[0x0] !== _0x15d190) throw new Error("Invalid response mode: 0x" + _0x981d31[0x0]["toString"](0x10));
        switch (_0x15d190) {
            case c["CMD_VIA_SET_KEYCODE"]:
                _0x16d459 = _0x981d31[0x4] * 0x100 + _0x981d31[0x5];
                break;
            case c["CMD_VIA_LIGHTING_SET_VALUE"]:
                if (_0x981d31[0x2] === g["VIA_LIGHTING_COLOR"]) {
                    const _0xbf420f = O(_0x981d31[0x3], _0x981d31[0x4], 0xff);
                    _0x16d459 = _0xbf420f['r'] * 0x100 * 0x100 + _0xbf420f['g'] * 0x100 + _0xbf420f['b'], console["log"]("返回RGB: " + _0x16d459);
                } else _0x16d459 = _0x981d31[0x3];
                break;
        }
        return _0x16d459;
    }
    static["mapRateValueToString"](_0x16e212) {
        const _0x3c463b = _0x47670a;
        return {
            0x1: "R1KHz",
            0x2: "R2KHz",
            0x3: "R3KHz",
            0x4: "R4KHz",
            0x5: "R5KHz",
            0x6: "R6KHz",
            0x7: "R7KHz",
            0x8: "R8KHz"
        } [_0x16e212] || 'R' + _0x16e212 + "KHz";
    }
    static["encodeKeyCode"](_0x3d770f, _0x3fd212) {
        return new Uint8Array([0x0, 0x0]);
    }
    static["decodeKeyCode"](_0x5ab1ae) {
        return '';
    }
    static["encodeLightingComman" + 'd'](_0x17fdf7, _0x2830e5, _0x41b6ac) {
        return new Uint8Array([0x0, 0x0, 0x0, 0x0]);
    }
    static["encodeMacroCommand"](_0x1c1592, _0x327386) {
        return new Uint8Array([0x0, 0x0]);
    }
}
class ae {
    constructor() {
        const _0x156a07 = _0x47670a;
        this["devices"] = new Map(), this["changeEmitter"] = new J(), this["isMonitori" + 'ng'] = !0x1, this["connectHandler"] = null, this["disconnectHandler"] = null, this["currentDevice"] = null, this["inputReportHandlers"] = new Map(), this["unsolicitedReportListeners"] = new Set(), this["handleConnect"] = _0x105953 => {
            const _0x7cf93 = _0x156a07,
                _0x13114e = _0x105953["device"],
                _0x25d228 = this["createDeviceInfo"](_0x13114e);
            this["devices"]["set"](_0x25d228['id'], _0x25d228), this["changeEmitter"]["emit"]({
                'type': "connect",
                'device': _0x25d228,
                'reconnect': !0x1
            }), this["currentDevice"] = _0x13114e, this["setupDeviceInputRepo" + 'rt'](_0x13114e);
        }, this["handleDisconnect"] = _0x5852e5 => {
            const _0x26ff0a = _0x156a07,
                _0x556b88 = _0x5852e5["device"],
                _0x5ec844 = this["getDeviceI" + 'd'](_0x556b88),
                _0x4a2870 = this["devices"]["get"](_0x5ec844);
            _0x4a2870 && (_0x4a2870["connected"] = !0x1, this["changeEmitter"]["emit"]({
                'type': "disconnect",
                'device': _0x4a2870
            }), setTimeout(() => {
                const _0x4b7092 = _0x26ff0a;
                this["devices"]["delete"](_0x5ec844);
            }, 0x1388)), this["currentDevice"] === _0x556b88 && (this["currentDevice"] = null), this["inputReportHandlers"]["clear"](), _0x556b88["oninputreport"] && (_0x556b88["oninputreport"] = null);
        };
    } ["addUnsolicitedReportListener"](_0x2bab7e) {
        const _0x34c1fa = _0x47670a;
        this["unsolicitedReportListeners"]["add"](_0x2bab7e);
    } ["removeUnsolicitedReportListene" + 'r'](_0x3373a6) {
        const _0x276fd6 = _0x47670a;
        this["unsolicitedReportListeners"]["delete"](_0x3373a6);
    }
    async ["startMonitoring"](_0x41b3fd, _0x36bd57) {
        const _0x500c4d = _0x47670a;
        if (!this["isMonitori" + 'ng']) {
            if (!navigator["hid"]) throw new Error("WebHID is not supported in this browser");
            try {
                let _0x163dfd = [];
                const _0x1236d8 = await navigator["hid"]["getDevices"]();
                console["log"]("已授权的设备:", _0x1236d8["length"]);
                const _0x194f4b = this["getFiltersFromConfig"](_0x41b3fd);
                console["log"]("使用配置过滤设备:", _0x194f4b);
                for (const _0x21c40c of _0x194f4b) {
                    const _0x39d02e = _0x1236d8["filter"](_0x199ef3 => {
                        const _0x11428d = _0x500c4d,
                            _0x365e75 = !_0x21c40c["vendorId"] || _0x199ef3["vendorId"] === _0x21c40c["vendorId"],
                            _0x13f55d = !_0x21c40c["productId"] || _0x199ef3["productId"] === _0x21c40c["productId"],
                            _0x3acd17 = !_0x21c40c["usagePage"] || _0x199ef3["collection" + 's']["some"](_0x2f9530 => _0x2f9530["usagePage"] === _0x21c40c["usagePage"]),
                            _0x572818 = !_0x21c40c["usage"] || _0x199ef3["collection" + 's']["some"](_0x31961a => _0x31961a["usage"] === _0x21c40c["usage"]);
                        return _0x365e75 && _0x13f55d && _0x3acd17 && _0x572818;
                    });
                    if (_0x39d02e["length"] > 0x0) {
                        _0x163dfd = _0x39d02e, console["log"]("找到匹配的设备: " + _0x39d02e[0x0]["productNam" + 'e']);
                        break;
                    }
                }
                if (_0x163dfd["length"] === 0x0) throw console["log"]("未找到已授权的设备！"), new Error("未找到已授权的设备！");
                await this["handleConnectedDevic" + 'es'](_0x163dfd), this["connectHandler"] = _0x4dd969 => this["handleConnect"](_0x4dd969), this["disconnectHandler"] = _0x4dfa24 => this["handleDisconnect"](_0x4dfa24), navigator["hid"]["onconnect"] = this["connectHandler"], navigator["hid"]["ondisconne" + 'ct'] = this["disconnectHandler"], this["isMonitori" + 'ng'] = !0x0;
            } catch (_0x3ccdb0) {
                throw console["error"]("Failed to start USB monitoring" + ':', _0x3ccdb0), _0x3ccdb0;
            }
        }
    } ["registerExternalDevi" + 'ce'](_0x3b52ce) {
        const _0x25dd45 = _0x47670a,
            _0x58e21a = this["createDeviceInfo"](_0x3b52ce);
        this["devices"]["set"](_0x58e21a['id'], _0x58e21a), this["changeEmitter"]["emit"]({
            'type': "connect",
            'device': _0x58e21a,
            'reconnect': !0x0
        }), this["currentDevice"] = _0x3b52ce, this["setupDeviceInputRepo" + 'rt'](_0x3b52ce), console["log"]("External device registered: " + _0x3b52ce["productNam" + 'e']);
    } ["getFiltersFromConfig"](_0x49c081) {
        const _0xb30064 = _0x47670a,
            _0x3062d7 = [];
        if (!_0x49c081 || !_0x49c081["configs"] || _0x49c081["configs"]["length"] === 0x0) return console["warn"]("No device configuration found, returning empty filters"), _0x3062d7;
        console["log"]("Found " + _0x49c081["configs"]["length"] + (" device configuratio" + 'ns'));
        for (const _0xfbf117 of _0x49c081["configs"]) {
            const _0x8ea63c = {};
            _0xfbf117["vendorId"] && _0xfbf117["vendorId"] !== 0x0 && (_0x8ea63c["vendorId"] = _0xfbf117["vendorId"]), _0xfbf117["productId"] && _0xfbf117["productId"] !== 0x0 && (_0x8ea63c["productId"] = _0xfbf117["productId"]), _0xfbf117["usagePage"] !== void 0x0 && (_0x8ea63c["usagePage"] = _0xfbf117["usagePage"]), _0xfbf117["usage"] !== void 0x0 && (_0x8ea63c["usage"] = _0xfbf117["usage"]), _0x3062d7["push"](_0x8ea63c), console["log"]("Added filter:", {
                'vendorId': _0x8ea63c["vendorId"] ? '0x' + _0x8ea63c["vendorId"]["toString"](0x10) : "any",
                'productId': _0x8ea63c["productId"] ? '0x' + _0x8ea63c["productId"]["toString"](0x10) : "any",
                'usagePage': _0x8ea63c["usagePage"] ? '0x' + _0x8ea63c["usagePage"]["toString"](0x10) : "any",
                'usage': _0x8ea63c["usage"] ? '0x' + _0x8ea63c["usage"]["toString"](0x10) : "any"
            });
        }
        return _0x3062d7;
    } ["stopMonitoring"]() {
        const _0x30ab28 = _0x47670a;
        navigator["hid"] && (navigator["hid"]["onconnect"] = null, navigator["hid"]["ondisconne" + 'ct'] = null, this["connectHandler"] = null, this["disconnectHandler"] = null), this["isMonitori" + 'ng'] = !0x1;
    } ["getDevices"]() {
        const _0x58eb52 = _0x47670a;
        return Array["from"](this["devices"]["values"]());
    } ["setCurrentDevice"](_0x925418) {
        const _0x20f76d = _0x47670a;
        this["currentDevice"] = _0x925418, console["log"]("HIDManager current device set to: " + _0x925418["productNam" + 'e']);
    } ["getCurrentDevice"]() {
        const _0x32b89b = _0x47670a;
        return this["currentDevice"];
    } ["onUSBChang" + 'e'](_0x5193e2) {
        const _0x57bf8c = _0x47670a;
        this["changeEmitter"]['on'](_0x5193e2);
    } ["offUSBChan" + 'ge'](_0x80673a) {
        const _0x450dd8 = _0x47670a;
        this["changeEmitter"]["off"](_0x80673a);
    }
    async ["sendReadKeyboardDataCommand"](_0x45e825, _0x1217a1, _0x1344c4, _0x42bb97) {
        const _0x3a5f2a = _0x47670a,
            _0x2cb20a = this["currentDevice"];
        if (!_0x2cb20a) throw new Error("No device connected. Please connect to a device first.");
        return new Promise(async (_0x37569f, _0x265c36) => {
            const _0x183e58 = _0x3a5f2a;
            let _0x39a9be = null;
            const _0x24593d = (_0x3eed0e, _0x3455c0) => {
                const _0x51f384 = _0x1e27;
                if (this["currentDevice"] && _0x3eed0e === 0x0) {
                    _0x39a9be !== null && (clearTimeout(_0x39a9be), _0x39a9be = null);
                    const _0x511d84 = new Uint8Array(_0x3455c0["byteLength"]);
                    for (let _0x2b8576 = 0x0; _0x2b8576 < _0x3455c0["byteLength"]; _0x2b8576++) _0x511d84[_0x2b8576] = _0x3455c0["getUint8"](_0x2b8576);
                    console["log"]("接收读键盘数据命令应答报文:", L(_0x511d84));
                    try {
                        let _0x525775;
                        _0x1344c4 ? _0x525775 = E["decodeReadKeyboardDataResponse_via"](_0x45e825, _0x1217a1, _0x511d84, _0x42bb97) : _0x525775 = E["decodeReadKeyboardDataResponse"](_0x45e825, _0x1217a1, _0x511d84), _0x37569f(_0x525775);
                    } catch (_0x4315ad) {
                        _0x265c36(_0x4315ad);
                    } finally {
                        this["removeInputReportHandler"](_0x3eed0e, _0x24593d);
                    }
                }
            };
            try {
                let _0x3524d2;
                _0x1344c4 ? _0x3524d2 = E["encodeReadKeyboardDataCommand_via"](_0x45e825, _0x1217a1, _0x42bb97) : _0x3524d2 = E["encodeReadKeyboardDataCommand"](_0x45e825, _0x1217a1, _0x42bb97), console["log"]("发送读键盘数据命令:", L(_0x3524d2)), _0x2cb20a["opened"] || await _0x2cb20a["open"]();
                const _0x38860c = new Uint8Array(_0x3524d2);
                await _0x2cb20a["sendReport"](0x0, _0x38860c), _0x39a9be = window["setTimeout"](() => {
                    const _0x3ede41 = _0x183e58;
                    _0x265c36(new Error("Timeout waiting for device response")), this["removeInputReportHandler"](0x0, _0x24593d);
                }, 0x3e8), this["addInputReportHandle" + 'r'](0x0, _0x24593d);
            } catch (_0x3a0e67) {
                _0x39a9be !== null && clearTimeout(_0x39a9be), console["error"]("发送读键盘数据命令失" + '败:', _0x3a0e67), _0x265c36(_0x3a0e67);
            }
        });
    }
    async ["sendWriteKeyboardDataCommand"](_0x481891, _0xc549a4, _0x250b00, _0x27300d) {
        const _0x179210 = _0x47670a,
            _0x3178ac = this["currentDevice"];
        if (!_0x3178ac) throw new Error("No device connected. Please connect to a device first.");
        return new Promise(async (_0x27907c, _0x1eec63) => {
            const _0x23ad21 = _0x179210;
            let _0x3582cc = null;
            const _0x3554a2 = (_0x3316d1, _0x369a1f) => {
                const _0x3eae83 = _0x1e27;
                if (this["currentDevice"] && _0x3316d1 === 0x0) {
                    _0x3582cc !== null && (clearTimeout(_0x3582cc), _0x3582cc = null);
                    const _0x5558be = new Uint8Array(_0x369a1f["byteLength"]);
                    for (let _0xf92dfe = 0x0; _0xf92dfe < _0x369a1f["byteLength"]; _0xf92dfe++) _0x5558be[_0xf92dfe] = _0x369a1f["getUint8"](_0xf92dfe);
                    console["log"]("接收写键盘数据命令应答报文:", L(_0x5558be));
                    try {
                        let _0x55ae8f = '';
                        _0x250b00 ? _0x55ae8f = E["decodeWriteKeyboardDataResponse_via"](_0x481891, _0x5558be) : _0x55ae8f = E["decodeWriteKeyboardDataRespons" + 'e'](_0x481891, _0xc549a4, _0x5558be), _0x27907c(_0x55ae8f);
                    } catch (_0x59b454) {
                        _0x1eec63(_0x59b454);
                    } finally {
                        this["removeInputReportHandler"](_0x3316d1, _0x3554a2);
                    }
                }
            };
            try {
                let _0x231b56;
                _0x250b00 ? _0x231b56 = E["encodeWriteKeyboardDataCommand_via"](_0x481891, _0x27300d) : _0x231b56 = E["encodeWriteKeyboardDataCommand"](_0x481891, _0xc549a4, _0x27300d), console["log"]("发送写键盘数据命令:", L(_0x231b56)), _0x3178ac["opened"] || await _0x3178ac["open"]();
                const _0xce63ab = new Uint8Array(_0x231b56);
                await _0x3178ac["sendReport"](0x0, _0xce63ab), _0x3582cc = window["setTimeout"](() => {
                    const _0x4766e5 = _0x23ad21;
                    _0x1eec63(new Error("Timeout waiting for device response")), this["removeInputReportHandler"](0x0, _0x3554a2);
                }, 0x3e8), this["addInputReportHandle" + 'r'](0x0, _0x3554a2);
            } catch (_0x6a758) {
                _0x3582cc !== null && clearTimeout(_0x3582cc), console["error"]("发送写键盘数据命令失" + '败:', _0x6a758), _0x1eec63(_0x6a758);
            }
        });
    } ["addInputReportHandle" + 'r'](_0x216015, _0x3a078e) {
        const _0x4c09e0 = _0x47670a,
            _0x360991 = _0x477d08 => {
                const _0x16a958 = _0x1e27;
                _0x3a078e(_0x477d08["reportId"], _0x477d08["data"]);
            };
        this["inputReportHandlers"]["set"](_0x216015, {
            'originalHandler': _0x3a078e,
            'adaptedHandler': _0x360991
        });
    } ["removeInputReportHandler"](_0x310dc7, _0x1ae005) {
        const _0x15da64 = _0x47670a,
            _0x5b39b8 = this["inputReportHandlers"]["get"](_0x310dc7);
        _0x5b39b8 && _0x5b39b8["originalHandler"] === _0x1ae005 && this["inputReportHandlers"]["delete"](_0x310dc7);
    } ["setupDeviceInputRepo" + 'rt'](_0xdd1e94) {
        const _0x2f01a3 = _0x47670a;
        _0xdd1e94["addEventListener"]("inputrepor" + 't', _0x58dabb => {
            const _0x45daf2 = _0x2f01a3,
                _0x49ba31 = _0x58dabb["reportId"],
                _0x495a59 = this["inputReportHandlers"]["get"](_0x49ba31);
            if (_0x495a59) {
                const _0x5b4621 = {
                    'device': _0xdd1e94,
                    'reportId': _0x49ba31,
                    'data': _0x58dabb["data"]
                };
                _0x495a59["adaptedHandler"](_0x5b4621);
            } else this["unsolicitedReportListeners"]["size"] > 0x0 && this["unsolicitedReportListeners"]["forEach"](_0x30020d => {
                const _0x56fd94 = _0x45daf2;
                try {
                    _0x30020d(_0x49ba31, _0x58dabb["data"]);
                } catch (_0x59356a) {
                    console["error"]("设备主动上送数据监听器处理异常:", _0x59356a);
                }
            });
        });
    }
    async ["handleConnectedDevic" + 'es'](_0x175d4b) {
        const _0x251208 = _0x47670a;
        for (const _0x2473f3 of _0x175d4b) {
            const _0x1878f8 = _0x2473f3,
                _0x570d3e = this["createDeviceInfo"](_0x1878f8);
            this["devices"]["set"](_0x570d3e['id'], _0x570d3e), this["changeEmitter"]["emit"]({
                'type': "connect",
                'device': _0x570d3e,
                'reconnect': !0x0
            }), this["currentDevice"] = _0x1878f8, this["setupDeviceInputRepo" + 'rt'](_0x1878f8);
        }
    } ["createDeviceInfo"](_0x3456fb) {
        const _0x4e1d01 = _0x47670a;
        return {
            'id': this["getDeviceI" + 'd'](_0x3456fb),
            'usage': _0x3456fb["usage"] || 0x61,
            'usagePage': _0x3456fb["usagePage"] || 0xff60,
            'vendorId': _0x3456fb["vendorId"],
            'productId': _0x3456fb["productId"],
            'productName': _0x3456fb["productNam" + 'e'] || "Device_" + _0x3456fb["vendorId"] + '_' + _0x3456fb["productId"],
            'manufacturerName': _0x3456fb["manufacturerName"],
            'serialNumber': _0x3456fb["serialNumb" + 'er'],
            'connected': !0x0,
            'collections': _0x3456fb["collection" + 's']["map"](_0x48997a => ({
                'usage': _0x48997a["usage"],
                'usagePage': _0x48997a["usagePage"],
                'reportId': _0x48997a["reportId"],
                'inputs': _0x48997a["inputRepor" + 'ts'],
                'outputs': _0x48997a["outputReports"]
            })),
            'data': {}
        };
    } ["getDeviceI" + 'd'](_0x9c47a0) {
        const _0x4ee727 = _0x47670a;
        return _0x9c47a0["vendorId"] + '-' + _0x9c47a0["productId"];
    }
}
class ne {
    constructor(_0x5eda83, _0x1ad687) {
        const _0x1a7f02 = _0x47670a;
        this["initializedDevices"] = new Map(), this["hidManager"] = _0x5eda83, this["config"] = _0x1ad687;
    }
    async ["getDevices"]() {
        const _0x1b0879 = _0x47670a;
        return this["hidManager"]["getDevices"]()["filter"](_0x1b3525 => this["config"]["configs"]["some"](_0x435c8c => _0x1b3525["vendorId"] === _0x435c8c["vendorId"] && _0x1b3525["productId"] === _0x435c8c["productId"] && _0x1b3525["usagePage"] === _0x435c8c["usagePage"] && _0x1b3525["usage"] === _0x435c8c["usage"]));
    }
    async ["init"](_0x426a88) {
        const _0xac8810 = _0x47670a,
            _0x3d0d2e = this["hidManager"]["getDevices"]()["find"](_0x35f7e5 => _0x35f7e5['id'] === _0x426a88);
        if (!_0x3d0d2e) throw new Error("Device with ID " + _0x426a88 + " not found");
        try {
            console["log"]("Initializing device:" + '\x20' + _0x3d0d2e["productNam" + 'e'] + " (ID: " + _0x426a88 + ')');
            const _0x5053a1 = await y(async () => {
                const _0x2f0588 = _0xac8810;
                try {
                    return await this["hidManager"]["sendReadKeyboardDataCommand"](c["CMD_VIA_GET_PROTOCOL_VERSION"], 0x0, !0x0);
                } catch (_0x2f02a9) {
                    throw _0x2f02a9;
                }
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x59f062, _0x3de816) => {
                    const _0x2c4ea8 = _0xac8810;
                    console["warn"]("Retry " + _0x3de816 + (" to get protocol of return after error:"), _0x59f062["message"]);
                }
            });
            return _0x5053a1 === null || _0x5053a1 === '' ? !0x1 : (this["initializedDevices"]["set"](_0x426a88, {
                'device': _0x3d0d2e,
                'protocolType': _0x5053a1,
                'status': "initialize" + 'd'
            }), console["log"]("Device " + _0x3d0d2e["productNam" + 'e'] + (" initialized successfully with protocol type ") + _0x5053a1), !0x0);
        } catch (_0x1d244f) {
            throw console["error"]("Failed to initialize device " + _0x426a88 + ':', _0x1d244f), _0x1d244f;
        }
    }
    async ["initByDevi" + 'ce'](_0x253e95) {
        const _0x11087f = _0x47670a;
        try {
            console["log"]("Initializing device:" + '\x20' + _0x253e95["productNam" + 'e'] + " (ID: " + _0x253e95['id'] + ')'), _0x253e95["opened"] || (await _0x253e95["open"](), console["log"]("Device " + _0x253e95["productNam" + 'e'] + (" opened in DeviceManager"))), this["hidManager"]["setCurrentDevice"](_0x253e95);
            const _0x2c2679 = await y(async () => {
                const _0x47a39d = _0x11087f;
                try {
                    return await this["hidManager"]["sendReadKeyboardDataCommand"](c["CMD_VIA_GET_PROTOCOL_VERSION"], 0x0, !0x0);
                } catch (_0x33f798) {
                    throw _0x33f798;
                }
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x517414, _0x2a393d) => {
                    const _0x567cdb = _0x11087f;
                    console["warn"]("Retry " + _0x2a393d + (" to get protocol of return after error:"), _0x517414["message"]);
                }
            });
            return _0x2c2679 === null || _0x2c2679 === '' ? !0x1 : (console["log"]("Device " + _0x253e95["productNam" + 'e'] + (" initialized successfully with protocol type ") + _0x2c2679), !0x0);
        } catch (_0x247b29) {
            throw console["error"]("Failed to initialize device " + _0x253e95['id'] + ':', _0x247b29), _0x247b29;
        }
    }
    async ["close"](_0x4b7270) {
        const _0x95542a = _0x47670a,
            _0x3ca27f = this["initializedDevices"]["get"](_0x4b7270);
        if (!_0x3ca27f) throw new Error("Device with ID " + _0x4b7270 + (" not initialized"));
        try {
            return console["log"]("Closing device: " + _0x3ca27f["device"]["productNam" + 'e']), this["initializedDevices"]["delete"](_0x4b7270), !0x0;
        } catch (_0x18e7b2) {
            throw console["error"]("Failed to close device " + _0x4b7270 + ':', _0x18e7b2), _0x18e7b2;
        }
    }
    async ["sendComman" + 'd'](_0x346f5b, _0x55a38e, _0x58653a) {
        const _0x20c692 = _0x47670a;
        try {
            if (console["log"]("Sending command to device " + _0x346f5b + ':', _0x55a38e), _0x55a38e["type"] === "readKeyboardData" && _0x55a38e["mode"] !== void 0x0) return {
                'success': !0x0,
                'data': {
                    'key': await this["hidManager"]["sendReadKeyboardDataCommand"](_0x55a38e["cmd"], _0x55a38e["mode"], _0x55a38e["isVIA"], _0x58653a)
                }
            };
            if (_0x55a38e["type"] === "writeKeyboardData" && _0x55a38e["mode"] !== void 0x0) return {
                'success': !0x0,
                'data': {
                    'key': await this["hidManager"]["sendWriteKeyboardDataCommand"](_0x55a38e["cmd"], _0x55a38e["mode"], _0x55a38e["isVIA"], _0x58653a)
                }
            };
            throw new Error("Unsupported command type: " + _0x55a38e["type"]);
        } catch (_0x46a91e) {
            throw console["error"]("Failed to send command to device " + _0x346f5b + ':', _0x46a91e), _0x46a91e;
        }
    }
}
var I = (_0x3546c6 => (_0x3546c6[_0x3546c6["text"] = 0x0] = "text", _0x3546c6[_0x3546c6["tap"] = 0x1] = "tap", _0x3546c6[_0x3546c6["down"] = 0x2] = "down", _0x3546c6[_0x3546c6['up'] = 0x3] = 'up', _0x3546c6[_0x3546c6["delay"] = 0x4] = "delay", _0x3546c6))(I || {});
class U {
    static["serializeMacroData"](_0x37a5f3, _0x56314d) {
        const _0x3b4d36 = _0x47670a,
            _0x4d44ac = [];
        for (let _0x4e6dcd = 0x0; _0x4e6dcd < _0x56314d; _0x4e6dcd++) {
            const _0x72e07e = _0x37a5f3["find"](_0x2e51ed => _0x2e51ed['id'] === _0x4e6dcd);
            if (_0x72e07e && _0x72e07e["actions"] && _0x72e07e["actions"]["length"] > 0x0)
                for (let _0x21d867 = 0x0; _0x21d867 < _0x72e07e["actions"]["length"]; _0x21d867++) {
                    const _0x5af79a = _0x72e07e["actions"][_0x21d867];
                    switch (Number(_0x5af79a["action"])) {
                        case I["text"]:
                            for (let _0x231eee = 0x0; _0x231eee < _0x5af79a["value"]["length"]; _0x231eee++) {
                                const _0x593ab5 = _0x5af79a["value"]["charCodeAt"](_0x231eee);
                                _0x593ab5 >= 0x20 && _0x593ab5 <= 0x7e && _0x4d44ac["push"](_0x593ab5);
                            }
                            break;
                        case I["tap"]:
                            const _0x8c1043 = parseInt(_0x5af79a["value"]);
                            _0x8c1043 >= 0x0 && _0x8c1043 <= 0xff && _0x4d44ac["push"](0x1, 0x1, _0x8c1043);
                            break;
                        case I["down"]:
                            const _0x4ab62a = parseInt(_0x5af79a["value"]);
                            _0x4ab62a >= 0x0 && _0x4ab62a <= 0xff && _0x4d44ac["push"](0x1, 0x2, _0x4ab62a);
                            break;
                        case I['up']:
                            const _0x4f6e19 = parseInt(_0x5af79a["value"]);
                            _0x4f6e19 >= 0x0 && _0x4f6e19 <= 0xff && _0x4d44ac["push"](0x1, 0x3, _0x4f6e19);
                            break;
                        case I["delay"]:
                            _0x4d44ac["push"](0x1, 0x4);
                            for (let _0x56c8e1 = 0x0; _0x56c8e1 < _0x5af79a["value"]["length"]; _0x56c8e1++) {
                                const _0x14a118 = _0x5af79a["value"]["charCodeAt"](_0x56c8e1);
                                _0x14a118 >= 0x30 && _0x14a118 <= 0x39 && _0x4d44ac["push"](_0x14a118);
                            }
                            _0x4d44ac["push"](0x7c);
                            break;
                    }
                }
            _0x4d44ac["push"](0x0);
        }
        return new Uint8Array(_0x4d44ac);
    }
    static["deserializeMacroData"](_0x3457d7, _0x2cf797 = 0x10) {
        const _0x2b8983 = _0x47670a,
            _0x240a94 = [],
            _0x2309c8 = _0x3457d7 instanceof ArrayBuffer ? new Uint8Array(_0x3457d7) : _0x3457d7;
        let _0x100cee = 0x0,
            _0x32c6f8 = 0x0;
        for (; _0x100cee < _0x2309c8["length"] && _0x32c6f8 < _0x2cf797;) {
            if (_0x2309c8[_0x100cee] === 0x0) {
                _0x240a94["push"]({
                    'id': _0x32c6f8
                }), _0x32c6f8++, _0x100cee++;
                continue;
            }
            const _0x5dd9a1 = [];
            let _0x3489c0 = !0x1;
            for (; _0x100cee < _0x2309c8["length"] && !_0x3489c0;) {
                if (_0x2309c8[_0x100cee] === 0x0) {
                    _0x3489c0 = !0x0, _0x100cee++;
                    break;
                }
                const _0x7d9439 = this["parseMacroAction"](_0x2309c8, _0x100cee);
                if (_0x7d9439) _0x5dd9a1["push"]({
                    'action': _0x7d9439["action"],
                    'value': _0x7d9439["value"]
                }), _0x100cee = _0x7d9439["nextPositi" + 'on'];
                else {
                    if (_0x100cee++, _0x100cee < _0x2309c8["length"]) {
                        const _0x55111f = _0x2309c8[_0x100cee];
                        (_0x55111f === 0x0 || _0x55111f === 0x1 || _0x55111f >= 0x20 && _0x55111f <= 0x7e) && (_0x3489c0 = !0x0);
                    }
                }
            }
            _0x240a94["push"]({
                'id': _0x32c6f8,
                'actions': _0x5dd9a1["length"] > 0x0 ? _0x5dd9a1 : void 0x0
            }), _0x32c6f8++;
        }
        return this["ensureCompleteMacros"](_0x240a94, _0x2cf797);
    }
    static["parseMacroAction"](_0x3ada47, _0xfee9b9) {
        const _0x598c6e = _0x47670a;
        if (_0xfee9b9 >= _0x3ada47["length"]) return null;
        const _0x263123 = _0x3ada47[_0xfee9b9];
        let _0x398198 = _0xfee9b9;
        if (_0x263123 === 0x1) {
            if (_0x398198 + 0x1 >= _0x3ada47["length"]) return null;
            const _0x4daa5e = _0x3ada47[_0x398198 + 0x1],
                _0x2a26dd = {
                    0x1: I["tap"],
                    0x2: I["down"],
                    0x3: I['up']
                };
            if (!(_0x4daa5e in _0x2a26dd)) return null;
            const _0x506348 = _0x2a26dd[_0x4daa5e],
                _0x5adabd = (_0x3ada47[_0x398198 + 0x2] || 0x0)["toString"](0xa);
            return {
                'action': _0x506348,
                'value': _0x5adabd,
                'nextPosition': _0x398198 + 0x3
            };
        }
        if (_0x263123 === 0x4) {
            _0x398198++;
            let _0x51ec5b = [];
            for (; _0x398198 < _0x3ada47["length"];) {
                const _0x3a02d8 = _0x3ada47[_0x398198];
                if (_0x3a02d8 === 0x7c) {
                    _0x398198++;
                    break;
                }
                if (_0x3a02d8 >= 0x30 && _0x3a02d8 <= 0x39) _0x51ec5b["push"](_0x3a02d8);
                else break;
                _0x398198++;
            }
            const _0x1eaaee = _0x51ec5b["length"] > 0x0 ? String["fromCharCo" + 'de'](..._0x51ec5b) : '0';
            return {
                'action': I["delay"],
                'value': _0x1eaaee,
                'nextPosition': _0x398198
            };
        }
        if (_0x263123 >= 0x20 && _0x263123 <= 0x7e) {
            let _0x45ee1f = [];
            for (; _0x398198 < _0x3ada47["length"];) {
                const _0x38d132 = _0x3ada47[_0x398198];
                if (_0x38d132 === 0x0 || _0x38d132 === 0x1 || _0x38d132 === 0x4) break;
                if (_0x38d132 >= 0x20 && _0x38d132 <= 0x7e) _0x45ee1f["push"](_0x38d132), _0x398198++;
                else break;
            }
            const _0x2eebfc = String["fromCharCo" + 'de'](..._0x45ee1f);
            return {
                'action': I["text"],
                'value': _0x2eebfc,
                'nextPosition': _0x398198
            };
        }
        return null;
    }
    static["ensureCompleteMacros"](_0x18309b, _0x2d84ba) {
        const _0x493484 = _0x47670a,
            _0x53a116 = [];
        for (let _0x21821c = 0x0; _0x21821c < _0x2d84ba; _0x21821c++) {
            const _0x77811b = _0x18309b["find"](_0x402215 => _0x402215['id'] === _0x21821c);
            _0x77811b ? _0x53a116["push"](_0x77811b) : _0x53a116["push"]({
                'id': _0x21821c
            });
        }
        return _0x53a116;
    }
}
const B = [{
    'file': "AULA-Era pad Dongle_via_v3.jso" + 'n',
    'name': "AULA-Era p" + 'ad',
    'json': "{\r\n  \"name\": \"AULA-Era pad\",\r\n  \"vendorId\": \"0x6D66\",\r\n  \"productId\": \"0x0917\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 5,\r\n    \"cols\": 4\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80m" + ("s\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", ") + ("16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t}\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"shortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Slee") + ("p\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortNam") + ("e\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snappy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snapp") + ("y Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n    \"layouts\": {\r\n        \"keymap\": [\r\n            [\r\n                {\r\n                    \"y\": 0.2\r\n                },\r\n                \"0,0\",\r\n                \"0,1\",\r\n                \"0,2\",\r\n                \"0,3\",\r\n\t\t\t\t\"2,3\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\"\r\n            ],\r\n            [\r\n                \"1,0\",\r\n                \"1,1\",\r\n                \"1,2\",\r\n                {\r\n                    \"h\": 2\r\n                },\r\n                \"1,3\",\r\n\t\t\t\t\"3,3\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\"\r\n            ],\r\n            [\r\n                \"2,0\",\r\n                \"2,1\",\r\n                \"2,2\"\r\n            ],\r\n            [\r\n                \"3,0\",\r\n                \"3,1\",\r\n                \"3,2\",\r\n                {\r\n                    \"h\": 2\r\n                },\r\n                \"4,3\"\r\n            ],\r\n            [\r\n                {\r\n                    \"w\": 2\r\n                },\r") + ("\n                \"4,1\",\r\n                \"4,2\"\r\n            ]\r\n        ]\r\n    }\r\n}\r\n\r\n")
}, {
    'file': "AULA-Era pad_via_v3.json",
    'name': "AULA-Era p" + 'ad',
    'json': "{\r\n  \"name\": \"AULA-Era pad\",\r\n  \"vendorId\": \"0x6D67\",\r\n  \"productId\": \"0x0917\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 5,\r\n    \"cols\": 4\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80m" + ("s\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", ") + ("16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t}\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"shortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Slee") + ("p\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortNam") + ("e\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snappy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snapp") + ("y Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n    \"layouts\": {\r\n        \"keymap\": [\r\n            [\r\n                {\r\n                    \"y\": 0.2\r\n                },\r\n                \"0,0\",\r\n                \"0,1\",\r\n                \"0,2\",\r\n                \"0,3\",\r\n\t\t\t\t\"2,3\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\"\r\n            ],\r\n            [\r\n                \"1,0\",\r\n                \"1,1\",\r\n                \"1,2\",\r\n                {\r\n                    \"h\": 2\r\n                },\r\n                \"1,3\",\r\n\t\t\t\t\"3,3\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\"\r\n            ],\r\n            [\r\n                \"2,0\",\r\n                \"2,1\",\r\n                \"2,2\"\r\n            ],\r\n            [\r\n                \"3,0\",\r\n                \"3,1\",\r\n                \"3,2\",\r\n                {\r\n                    \"h\": 2\r\n                },\r\n                \"4,3\"\r\n            ],\r\n            [\r\n                {\r\n                    \"w\": 2\r\n                },\r") + ("\n                \"4,1\",\r\n                \"4,2\"\r\n            ]\r\n        ]\r\n    }\r\n}\r\n\r\n")
}, {
    'file': "AULA-Era68 Dongle_via_v3.json",
    'name': "AULA-Era68",
    'json': "{\r\n  \"name\": \"AULA-Era68\",\r\n  \"vendorId\": \"0x6D66\",\r\n  \"productId\": \"0x0868\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 5,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms" + ("\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 1") + ("6],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t}\t\t\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"sho") + ("rtName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"sh") + ("ortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snap") + ("py Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\r\n\t\t\"4,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n        \"0,4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"0,13\",\r\n        \"0,14\"\r\n      ],\r\n      [\r\n\t\t\"4,9\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\",\r\n        {\r\n\t\t  \"x\": 0.25,\r\n          \"w\": 1.5\r\n        },\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n ") + ("       \"1,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"1,13\",\r\n        \"1,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.75\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"2,12\",\r\n        \"2,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 2.25\r\n        },\r\n        \"3,0\",\r\n\t\t\"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"3,11\",\r\n        \"3,13\",\r\n\t\t\"3,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"x\": 1.25,\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"4,3\",\r\n\t\t\"4,6\",\r\n\t\t\"4,7\",\r\n\t\t\"4,11\",\r\n\t\t\"4,12\",\r") + ("\n\t\t\"4,13\",\r\n\t\t\"4,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}, {
    'file': "AULA-Era68_via_v3.js" + 'on',
    'name': "AULA-Era68",
    'json': "{\r\n  \"name\": \"AULA-Era68\",\r\n  \"vendorId\": \"0x6D67\",\r\n  \"productId\": \"0x0868\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 5,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms" + ("\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 1") + ("6],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t}\t\t\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"sho") + ("rtName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"sh") + ("ortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snap") + ("py Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\r\n\t\t\"4,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n        \"0,4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"0,13\",\r\n        \"0,14\"\r\n      ],\r\n      [\r\n\t\t\"4,9\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\",\r\n        {\r\n\t\t  \"x\": 0.25,\r\n          \"w\": 1.5\r\n        },\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n ") + ("       \"1,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"1,13\",\r\n        \"1,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.75\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"2,12\",\r\n        \"2,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 2.25\r\n        },\r\n        \"3,0\",\r\n\t\t\"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"3,11\",\r\n        \"3,13\",\r\n\t\t\"3,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"x\": 1.25,\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"4,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"4,3\",\r\n\t\t\"4,6\",\r\n\t\t\"4,7\",\r\n\t\t\"4,11\",\r\n\t\t\"4,12\",\r") + ("\n\t\t\"4,13\",\r\n\t\t\"4,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}, {
    'file': "AULA-Era75 Dongle_via_v3.json",
    'name': "AULA-Era75",
    'json': "{\r\n  \"name\": \"AULA-Era75\",\r\n  \"vendorId\": \"0x6D66\",\r\n  \"productId\": \"0x0784\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 7,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms" + ("\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 1") + ("6],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t}\t\t\t\t\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"s") + ("hortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"") + ("shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Sn") + ("appy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\t\r\n\t\t\"5,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n        \"0,4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        \"0,13\",\r\n\t\t\"3,13\",\r\n\t\t\"0,14\"\r\n      ],\r\n      [\r\n\r\n        {\r\n          \"y\": 0.25\r\n        },\t\r\n\t\t\"6,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\",\r\n        {\r\n          \"x\": 0.25\r\n        },\t\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n ") + ("       \"1,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"1,13\",\r\n        \"1,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.5\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        \"2,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"2,13\",\r\n        \"2,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.75\r\n        },\r\n        \"3,0\",\r\n        \"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        \"3,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"3,12\",\r\n        \"3,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 2.25\r\n        },\r\n        \"4,0\",\r\n\t\t\"4,1\",\r\n        \"4,2\",\r\n        \"4,3\",\r\n        \"4,4\",\r\n        \"4,5\",\r\n        \"4,6\",\r\n        \"4") + (",7\",\r\n        \"4,8\",\r\n        \"4,9\",\r\n        \"4,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"4,11\",\r\n        \"4,13\",\r\n\t\t\"4,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"x\": 1.25,\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"5,3\",\r\n\t\t\"5,6\",\r\n\t\t\"5,7\",\r\n\t\t\"5,11\",\r\n\t\t\"5,12\",\r\n\t\t\"5,13\",\r\n\t\t\"5,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}, {
    'file': "AULA-Era75_via_v3.js" + 'on',
    'name': "AULA-Era75",
    'json': "{\r\n  \"name\": \"AULA-Era75\",\r\n  \"vendorId\": \"0x6D67\",\r\n  \"productId\": \"0x0784\",\r\n  \"keycodes\": [\"qmk_lighting\",\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 7,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\"qmk_rgblight\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\t\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms" + ("\", 80], [\"90ms\", 90],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_sleep\", 0, 4, 6]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 1") + ("6],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t}\t\t\t\t\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"s") + ("hortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"") + ("shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Sn") + ("appy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<->KC_A)\", \"shortName\": \"D_A\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\t\r\n\t\t\"5,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n        \"0,4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        \"0,13\",\r\n\t\t\"3,13\",\r\n\t\t\"0,14\"\r\n      ],\r\n      [\r\n\r\n        {\r\n          \"y\": 0.25\r\n        },\t\r\n\t\t\"6,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\",\r\n        {\r\n          \"x\": 0.25\r\n        },\t\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n ") + ("       \"1,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"1,13\",\r\n        \"1,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.5\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        \"2,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"2,13\",\r\n        \"2,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 1.75\r\n        },\r\n        \"3,0\",\r\n        \"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        \"3,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"3,12\",\r\n        \"3,14\"\r\n      ],\r\n      [\r\n        {\r\n\t\t  \"x\": 1.25,\r\n          \"w\": 2.25\r\n        },\r\n        \"4,0\",\r\n\t\t\"4,1\",\r\n        \"4,2\",\r\n        \"4,3\",\r\n        \"4,4\",\r\n        \"4,5\",\r\n        \"4,6\",\r\n        \"4") + (",7\",\r\n        \"4,8\",\r\n        \"4,9\",\r\n        \"4,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"4,11\",\r\n        \"4,13\",\r\n\t\t\"4,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"x\": 1.25,\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"5,3\",\r\n\t\t\"5,6\",\r\n\t\t\"5,7\",\r\n\t\t\"5,11\",\r\n\t\t\"5,12\",\r\n\t\t\"5,13\",\r\n\t\t\"5,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}, {
    'file': "AULA-Neos75 Dongle_via_v3.json",
    'name': "AULA-Neos75 Dongle",
    'json': "{\r\n  \"name\": \"AULA-Neos75 Dongle\",\r\n  \"vendorId\": \"0x6D66\",\r\n  \"productId\": \"0x8572\",\r\n  \"keycodes\": [\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 7,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce config\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms\", 80], [\"90ms\", 9" + ("0],[\"100ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"online rgb\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"enable\", \"disable\"],\r\n\t\t\t\t\t\"content\": [\"id_system_online_rgb\", 0, 4, 4]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t") + ("\t\t\"label\": \"Induction wake-up\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [ \"disable\",\"enable\"],\r\n\t\t\t\t\t\"content\": [\"id_system_sensor\", 0, 4, 9]\r\n\t\t\t\t}\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"shortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output U") + ("SB\", \"shortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"s") + ("hortName\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snappy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy") + (" (KC_D<->KC_A)\", \"shortName\": \"D_A\"},\r\n\t{\"name\": \"LCD CALC\", \"title\": \"Lcd calc toggle\", \"shortName\": \"LCD_CALC\"},\r\n\t{\"name\": \"LCD reset\", \"title\": \"Lcd to reset/factory/dfu\", \"shortName\": \"LCD_RST\"},\r\n\t{\"name\": \"ONLINE RGB TOGG\", \"title\": \"Online lighting effect switch\", \"shortName\": \"OLRGB_TOG\"},\r\n\t{\"name\": \"PROFILE +\", \"title\": \"profile config next\", \"shortName\": \"PROFILE+\"},\r\n\t{\"name\": \"PROFILE -\", \"title\": \"profile config previous\", \"shortName\": \"PROFILE-\"},\r\n\t{\"name\": \"SENSOR TOGG\", \"title\": \"profile config previous\", \"shortName\": \"SENSOR_TOG\"},\r\n\t{\"name\": \"LCD start\", \"title\": \"lcd timer control start\", \"shortName\": \"LCD_START\"},\r\n\t{\"name\": \"LCD pause\", \"title\": \"lcd timer control pause\", \"shortName\": \"LCD_PAUSE\"},\r\n\t{\"name\": \"LCD stop\", \"title\": \"lcd timer control stop\", \"shortName\": \"LCD_STOP\"},\r\n\t{\"name\": \"VIA\", \"title\": \"open via website\", \"shortName\": \"VIA\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n    ") + ("    \"0,4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        \"0,13\",\r\n\t\t\"3,13\",\r\n\t\t\"0,14\",\r\n        {\r\n          \"x\": 1.25\r\n        },\t\t\r\n\t\t\"6,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\"\r\n      ],\r\n      [\r\n        {\r\n          \"y\": 0.25\r\n        },\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n        \"1,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"1,13\",\r\n        \"1,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\t\t\r\n\t\t\"5,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        \"2,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n   ") + ("     \"2,13\",\r\n        \"2,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n\t\t\"5,10\",\r\n\t\t\"6,9\",\r\n\t\t\"6,10\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"3,0\",\r\n        \"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        \"3,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"3,12\",\r\n        \"3,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n\t\t\"5,9\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"4,0\",\r\n\t\t\"4,1\",\r\n        \"4,2\",\r\n        \"4,3\",\r\n        \"4,4\",\r\n        \"4,5\",\r\n        \"4,6\",\r\n        \"4,7\",\r\n        \"4,8\",\r\n        \"4,9\",\r\n        \"4,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"4,11\",\r\n        \"4,13\",\r\n\t\t\"4,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"5,3\",\r\n\t\t\"5,6\",\r\n\t\t\"5,7\",\r\n\t") + ("\t\"5,11\",\r\n\t\t\"5,12\",\r\n\t\t\"5,13\",\r\n\t\t\"5,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}, {
    'file': "AULA-Neos75_via_v3.json",
    'name': "AULA-Neos7" + '5',
    'json': "{\r\n  \"name\": \"AULA-Neos75\",\r\n  \"vendorId\": \"0x1EA7\",\r\n  \"productId\": \"0x4884\",\r\n  \"keycodes\": [\"qmk_lighting\"],\r\n  \"matrix\": {\r\n    \"rows\": 7,\r\n    \"cols\": 15\r\n  },\r\n  \"menus\": [\"qmk_rgb_matrix\",\r\n   {\r\n\t  \"label\": \"Tools\",\r\n      \"content\": [\r\n\t\t{\r\n\t\t\t\"label\": \"System\",\r\n\t\t\t\"content\": [\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"debounce config\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"none\", \"send to debounce\", \"debounce to send\"],\r\n\t\t\t\t\t\"content\": [\"id_system_debounce\", 0, 4, 2]\r\n\t\t\t\t},\t\t\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard speed (smaller the number the faster)\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1ms\", 1],[\"2ms\", 2],[\"3ms\", 3], [\"4ms\", 4],[\"5ms\", 5],[\"6ms\", 6],[\"7ms\", 7],[\"8ms\", 8],[\"9ms\", 9], [\"10ms\", 10],\r\n\t\t\t\t\t\t\t\t[\"11ms\", 11],[\"12ms\", 12],[\"13ms\", 13], [\"14ms\", 14],[\"15ms\", 15],[\"16ms\", 16],[\"17ms\", 17],[\"18ms\", 18],[\"19ms\", 19], [\"20ms\", 20],\r\n\t\t\t\t\t\t\t\t[\"25ms\", 25],[\"30ms\", 30],[\"35ms\", 35], [\"40ms\", 40],[\"45ms\", 45],[\"50ms\", 50],[\"60ms\", 60],[\"70ms\", 70],[\"80ms\", 80], [\"90ms\", 90],[\"10" + ("0ms\", 100], [\"200ms\", 200]],\r\n\t\t\t\t\t\"content\": [\"id_system_keyboard_speed\", 0, 4, 1]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"online rgb\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"enable\", \"disable\"],\r\n\t\t\t\t\t\"content\": [\"id_system_online_rgb\", 0, 4, 4]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard deep sleep time\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [[\"1 min\", 1],[\"2 min\", 2],[\"3 min\", 3], [\"4 min\", 4],[\"5 min\", 5],[\"6 min\", 6],[\"7 min\", 7],[\"8 min\", 8],[\"9 min\", 9], [\"10 min\", 10],\r\n\t\t\t\t\t\t\t\t[\"11 min\", 11],[\"12 min\", 12],[\"13 min\", 13], [\"14 min\", 14],[\"15 min\", 15],[\"16 min\", 16],[\"17 min\", 17],[\"18 min\", 18],[\"19 min\", 19], [\"20 min\", 20],\r\n\t\t\t\t\t\t\t\t[\"25 min\", 25],[\"30 min\", 30],[\"35 min\", 35], [\"40 min\", 40],[\"45 min\", 45],[\"50 min\", 50],[\"60 min\", 60]],\r\n\t\t\t\t\t\"content\": [\"id_system_deep_sleep\", 0, 4, 7]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"label\": \"keyboard system\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [\"Windows\", \"macOS\"],\r\n\t\t\t\t\t\"content\": [\"id_system_win_mac\", 0, 4, 5]\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"labe") + ("l\": \"Induction wake-up\",\r\n\t\t\t\t\t\"type\": \"dropdown\",\r\n\t\t\t\t\t\"options\": [ \"disable\",\"enable\"],\r\n\t\t\t\t\t\"content\": [\"id_system_sensor\", 0, 4, 9]\r\n\t\t\t\t}\r\n\t\t\t]\r\n        }\r\n      ]\r\n    }  \r\n  ],\t\r\n  \"customKeycodes\": [\r\n    {\"name\": \"Mission Control\", \"title\": \"F3 Mission Control in macOS\", \"shortName\": \"Mission Control\"},\r\n    {\"name\": \"Launch Pad\", \"title\": \"F4 Launch Pad in macOS\", \"shortName\": \"Launch Pad\"},\r\n    {\"name\": \"Task View\", \"title\": \"F3 Task View in windows\", \"shortName\": \"Task View\"},\r\n    {\"name\": \"File Explorer\", \"title\": \"F4 File Explorer in windows\", \"shortName\": \"File Explorer\"},\r\n    {\"name\": \"Win Mode\", \"title\": \"Working in Windows\", \"shortName\": \"Win Mode\"},\r\n    {\"name\": \"Mac Mode\", \"title\": \"Working in macOS\", \"shortName\": \"Mac Mode\"},\r\n    {\"name\": \"Lamp Test\", \"title\": \"Led Lamp Test\", \"shortName\": \"Lamp Test\"},\r\n    {\"name\": \"Deep Sleep\", \"title\": \"Keyboard into Deep Sleep\", \"shortName\": \"Deep Sleep\"},\r\n    {\"name\": \"Out Usb\", \"title\": \"Keyboard data output USB\", \"s") + ("hortName\": \"Out Usb\"},\r\n    {\"name\": \"Bluetooth 1\", \"title\": \"Bluetooth working connection 1\", \"shortName\": \"BT 1\"},\r\n    {\"name\": \"Bluetooth 2\", \"title\": \"Bluetooth working connection 2\", \"shortName\": \"BT 2\"},\r\n    {\"name\": \"Bluetooth 3\", \"title\": \"Bluetooth working connection 3\", \"shortName\": \"BT 3\"},\r\n\t{\"name\": \"TOGG GUI\", \"title\": \"Toggle gui\", \"shortName\": \"TG_GUI\"},\r\n\t{\"name\": \"OUT RF\", \"title\": \"Keyboard data output RF 2.4G\", \"shortName\": \"OUT RF\"},\r\n\t{\"name\": \"LCD TOGG\", \"title\": \"Lcd toggle\", \"shortName\": \"LCD_TG\"},\r\n\t{\"name\": \"LCD mode+\", \"title\": \"Next/up lcd mode \", \"shortName\": \"LCD_MI\"},\r\n\t{\"name\": \"LCD mode-\", \"title\": \"Previous/down lcd mode \", \"shortName\": \"LCD_MD\"},\r\n\t{\"name\": \"Siri\", \"title\": \"Siri in macOS\", \"shortName\": \"Siri\"},\r\n\t{\"name\": \"Screen Shot\",\"title\": \"Screenshot in macOS\",\"shortName\": \"SShot\"},\r\n    {\"name\": \"Cortana\", \"title\": \"Cortana in windows\", \"shortName\": \"Cortana\"},\r\n\t{\"name\": \"BYC TOGG\",\"title\": \"Switching of charging indicator light\",\"shortNam") + ("e\": \"BYC\"},\r\n    {\"name\": \"RBHL TOGG\", \"title\": \"Battery highlight switching\", \"shortName\": \"RBHL\"},\r\n\t{\"name\": \"LCD return\", \"title\": \"return lcd mode\", \"shortName\": \"LCD_RETURN\"},\r\n\t{\"name\": \"LCD enter\", \"title\": \"enter lcd mode \", \"shortName\": \"LCD_ENTER\"},\r\n\t{\"name\": \"LCD up togg\", \"title\": \"Lcd up message toggle\", \"shortName\": \"LCD_UTOG\"},\r\n\t{\"name\": \"SOCD UP\", \"title\": \"Snappy Tappy (KC_UP<->KC_DOWN)\", \"shortName\": \"U_D\"},\r\n\t{\"name\": \"SOCD LEFT\",\"title\": \"Snappy Tappy (KC_LEFT<->KC_RIGHT)\",\"shortName\": \"L_R\"},\r\n    {\"name\": \"SOCD DOWN\", \"title\": \"Snappy Tappy (KC_DOWN<->KC_UP)\", \"shortName\": \"D_U\"},\r\n\t{\"name\": \"SOCD RIGHT\",\"title\": \"Snappy Tappy (KC_RIGHT<->KC_LEFT)\",\"shortName\": \"R_L\"},\r\n    {\"name\": \"SOCD W\", \"title\": \"Snappy Tappy (KC_W<->KC_S)\", \"shortName\": \"W_S\"},\r\n\t{\"name\": \"SOCD A\", \"title\": \"Snappy Tappy (KC_A<->KC_D)\", \"shortName\": \"A_D\"},\r\n\t{\"name\": \"SOCD S\", \"title\": \"Snappy Tappy (KC_S<->KC_W) \", \"shortName\": \"S_W\"},\r\n\t{\"name\": \"SOCD D\", \"title\": \"Snappy Tappy (KC_D<") + ("->KC_A)\", \"shortName\": \"D_A\"},\r\n\t{\"name\": \"LCD CALC\", \"title\": \"Lcd calc toggle\", \"shortName\": \"LCD_CALC\"},\r\n\t{\"name\": \"LCD reset\", \"title\": \"Lcd to reset/factory/dfu\", \"shortName\": \"LCD_RST\"},\r\n\t{\"name\": \"ONLINE RGB TOGG\", \"title\": \"Online lighting effect switch\", \"shortName\": \"OLRGB_TOG\"},\r\n\t{\"name\": \"PROFILE +\", \"title\": \"profile config next\", \"shortName\": \"PROFILE+\"},\r\n\t{\"name\": \"PROFILE -\", \"title\": \"profile config previous\", \"shortName\": \"PROFILE-\"},\r\n\t{\"name\": \"SENSOR TOGG\", \"title\": \"profile config previous\", \"shortName\": \"SENSOR_TOG\"},\r\n\t{\"name\": \"LCD start\", \"title\": \"lcd timer control start\", \"shortName\": \"LCD_START\"},\r\n\t{\"name\": \"LCD pause\", \"title\": \"lcd timer control pause\", \"shortName\": \"LCD_PAUSE\"},\r\n\t{\"name\": \"LCD stop\", \"title\": \"lcd timer control stop\", \"shortName\": \"LCD_STOP\"},\r\n\t{\"name\": \"VIA\", \"title\": \"open via website\", \"shortName\": \"VIA\"}\r\n  ],\r\n  \"layouts\": {\r\n    \"keymap\": [\r\n      [\r\n        \"0,0\",\r\n        \"0,1\",\r\n        \"0,2\",\r\n        \"0,3\",\r\n        \"0,") + ("4\",\r\n        \"0,5\",\r\n        \"0,6\",\r\n        \"0,7\",\r\n        \"0,8\",\r\n        \"0,9\",\r\n        \"0,10\",\r\n        \"0,11\",\r\n        \"0,12\",\r\n        \"0,13\",\r\n\t\t\"3,13\",\r\n\t\t\"0,14\",\r\n        {\r\n          \"x\": 1.25\r\n        },\t\t\r\n\t\t\"6,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne0\"\r\n      ],\r\n      [\r\n        {\r\n          \"y\": 0.25\r\n        },\r\n        \"1,0\",\r\n        \"1,1\",\r\n        \"1,2\",\r\n        \"1,3\",\r\n        \"1,4\",\r\n        \"1,5\",\r\n        \"1,6\",\r\n        \"1,7\",\r\n        \"1,8\",\r\n        \"1,9\",\r\n        \"1,10\",\r\n        \"1,11\",\r\n        \"1,12\",\r\n        {\r\n          \"w\": 2\r\n        },\r\n        \"1,13\",\r\n        \"1,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\t\t\r\n\t\t\"5,8\\n\\n\\n\\n\\n\\n\\n\\n\\ne1\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"2,0\",\r\n        \"2,1\",\r\n        \"2,2\",\r\n        \"2,3\",\r\n        \"2,4\",\r\n        \"2,5\",\r\n        \"2,6\",\r\n        \"2,7\",\r\n        \"2,8\",\r\n        \"2,9\",\r\n        \"2,10\",\r\n        \"2,11\",\r\n        \"2,12\",\r\n        {\r\n          \"w\": 1.5\r\n        },\r\n        \"2") + (",13\",\r\n        \"2,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n\t\t\"5,10\",\r\n\t\t\"6,9\",\r\n\t\t\"6,10\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"3,0\",\r\n        \"3,1\",\r\n        \"3,2\",\r\n        \"3,3\",\r\n        \"3,4\",\r\n        \"3,5\",\r\n        \"3,6\",\r\n        \"3,7\",\r\n        \"3,8\",\r\n        \"3,9\",\r\n        \"3,10\",\r\n        \"3,11\",\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"3,12\",\r\n        \"3,14\",\r\n        {\r\n          \"x\": 0.25\r\n        },\r\n\t\t\"5,9\"\r\n      ],\r\n      [\r\n        {\r\n          \"w\": 2.25\r\n        },\r\n        \"4,0\",\r\n\t\t\"4,1\",\r\n        \"4,2\",\r\n        \"4,3\",\r\n        \"4,4\",\r\n        \"4,5\",\r\n        \"4,6\",\r\n        \"4,7\",\r\n        \"4,8\",\r\n        \"4,9\",\r\n        \"4,10\",\r\n        {\r\n          \"w\": 1.75\r\n        },\r\n        \"4,11\",\r\n        \"4,13\",\r\n\t\t\"4,14\"\r\n      ],\r\n      [\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,0\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,1\",\r\n\t\t{\r\n\t\t  \"w\": 1.25\r\n\t\t},\r\n\t\t\"5,2\",\r\n\t\t{\r\n\t\t  \"w\": 6.25\r\n\t\t},\r\n\t\t\"5,3\",\r\n\t\t\"5,6\",\r\n\t\t\"5,7\",\r\n\t\t\"5,11\"") + (",\r\n\t\t\"5,12\",\r\n\t\t\"5,13\",\r\n\t\t\"5,14\"\r\n\t  ]\r\n    ]\r\n  }\r\n}\r\n")
}];

function P(_0x500485) {
    const _0x5d4c70 = _0x47670a;
    if (typeof _0x500485 == "number") return _0x500485;
    const _0x727bb9 = String(_0x500485)["trim"]()["toLowerCas" + 'e']();
    if (_0x727bb9 === '') return NaN;
    if (_0x727bb9["startsWith"]('0x')) return parseInt(_0x727bb9["slice"](0x2), 0x10);
    if (/^[0-9]+$/ ["test"](_0x727bb9)) return parseInt(_0x727bb9, 0xa);
    const _0x43a157 = parseInt(_0x727bb9, 0x10);
    return Number["isNaN"](_0x43a157) ? NaN : _0x43a157;
}

function F(_0x46921a) {
    const _0xcae5b1 = _0x47670a;
    if (typeof _0x46921a == "number") return Number["isNaN"](_0x46921a) ? [] : [_0x46921a];
    const _0x4b0ca8 = String(_0x46921a)["trim"]()["toLowerCas" + 'e']();
    if (_0x4b0ca8 === '') return [];
    if (_0x4b0ca8["startsWith"]('0x')) {
        const _0x16bbb3 = parseInt(_0x4b0ca8["slice"](0x2), 0x10);
        return Number["isNaN"](_0x16bbb3) ? [] : [_0x16bbb3];
    }
    const _0x53310d = /^[0-9]+$/ ["test"](_0x4b0ca8) ? parseInt(_0x4b0ca8, 0xa) : NaN,
        _0x5489ba = parseInt(_0x4b0ca8, 0x10),
        _0x507407 = [];
    return Number["isNaN"](_0x53310d) || _0x507407["push"](_0x53310d), !Number["isNaN"](_0x5489ba) && _0x5489ba !== _0x53310d && _0x507407["push"](_0x5489ba), _0x507407;
}

function ie(_0x5ca6d9, _0x4a16c1) {
    const _0xcec21e = _0x47670a,
        _0x2ba379 = F(_0x5ca6d9),
        _0x4c62c8 = F(_0x4a16c1);
    if (_0x2ba379["length"] === 0x0 || _0x4c62c8["length"] === 0x0) return null;
    for (const _0x33c259 of B) try {
        const _0x7a753f = JSON["parse"](_0x33c259["json"]),
            _0x4d31c2 = P(_0x7a753f["vendorId"]),
            _0x3bc0e9 = P(_0x7a753f["productId"]);
        if (_0x2ba379["includes"](_0x4d31c2) && _0x4c62c8["includes"](_0x3bc0e9)) return _0x33c259;
    } catch {}
    return null;
}

function oe() {
    return B;
}
class se {
    constructor(_0x3ab941) {
        const _0x5c3c38 = _0x47670a;
        this["isStarted"] = !0x1, this["currentDevice"] = null, this["lightingUploadListeners"] = new Set(), this["lightingUploadHandle" + 'r'] = (_0x562fbf, _0xf51eda) => {
            const _0x13620c = _0x5c3c38;
            if (_0x562fbf !== 0x0) return;
            const _0x44a22e = new Uint8Array(_0xf51eda["byteLength"]);
            for (let _0x127de4 = 0x0; _0x127de4 < _0xf51eda["byteLength"]; _0x127de4++) _0x44a22e[_0x127de4] = _0xf51eda["getUint8"](_0x127de4);
            const _0x1ba832 = E["decodeLightingUploadResponse"](_0x44a22e);
            if (!_0x1ba832) return;
            console["log"]("接收键盘主动上送灯光信息报文:", L(_0x44a22e));
            let _0xaee486 = 0x0,
                _0x2c76e4 = 0x0,
                _0x1bc20e = !0x1;
            switch (_0x1ba832["dataid"]) {
                case g["VIA_LIGHTING_EFFECT"]:
                    _0xaee486 = 0x1, _0x2c76e4 = _0x1ba832["value"], _0x1bc20e = !0x0;
                    break;
                case g["VIA_LIGHTING_BRIGHTNESS"]:
                    _0xaee486 = 0x2, _0x2c76e4 = _0x1ba832["value"];
                    break;
                case g["VIA_LIGHTING_EFFECT_SPEED"]:
                    _0xaee486 = 0x3, _0x2c76e4 = _0x1ba832["value"];
                    break;
                case g["VIA_LIGHTING_COLOR"]:
                    _0xaee486 = 0x4, _0x2c76e4 = _0x1ba832["value"];
                    break;
            }
            const _0x10e171 = {
                'area': "Keyboard",
                'open': _0x1bc20e ? _0x2c76e4 === 0x0 ? "Close" : "Open" : '',
                'mode': _0xaee486 === 0x1 ? _0x2c76e4 : '',
                'luminance': _0xaee486 === 0x2 ? _0x2c76e4 : '',
                'speed': _0xaee486 === 0x3 ? _0x2c76e4 : '',
                'direction': "Forward",
                'selectStaticColor': _0xaee486 === 0x4 ? _0x2c76e4 : '',
                'changedItem': _0xaee486
            };
            console["log"]("键盘主动上送灯光信息[changedItem=" + _0xaee486 + ']:', JSON["stringify"](_0x10e171)), this["lightingUploadListeners"]["forEach"](_0x3b842f => {
                const _0x1b66be = _0x13620c;
                try {
                    _0x3b842f(_0x10e171);
                } catch (_0x3a08fd) {
                    console["error"]("灯光主动上送监听器处理异常:", _0x3a08fd);
                }
            });
        }, R["checkBrowserCompatibility"](), R["validateConfig"](_0x3ab941), this["config"] = _0x3ab941, this["hidManager"] = new ae(), this["deviceManager"] = new ne(this["hidManager"], _0x3ab941), this["setupEventForwarding"]();
    }
    async ["startByDevice"](_0x394d55) {
        const _0x10a50d = _0x47670a;
        if (!this["isStarted"]) try {
            console["log"]("startByDevice: Starting with device " + (_0x394d55["productNam" + 'e'] || _0x394d55["productId"])), _0x394d55["opened"] || (await _0x394d55["open"](), console["log"]("Device " + _0x394d55["productNam" + 'e'] + (" opened successfully")));
            const _0x49664f = _0x394d55;
            if (_0x49664f['id'] = _0x394d55["productId"]["toString"](), await this["hidManager"]["startMonitoring"](this["config"], _0x49664f), this["currentDevice"] = _0x49664f, !await this["deviceManager"]["initByDevi" + 'ce'](this["currentDevice"])) throw new Error("Failed to initialize device " + this["currentDevice"]['id']);
            console["log"]("startByDevice: Devic" + 'e\x20' + (_0x394d55["productNam" + 'e'] || this["currentDevice"]['id']) + (" started successfull" + 'y')), this["isStarted"] = !0x0;
        } catch (_0x5264e6) {
            R["handleErro" + 'r'](_0x5264e6, "KeyboardSDK.startByDevice");
        }
    }
    async ["start"]() {
        const _0x4a8243 = _0x47670a;
        if (!this["isStarted"]) try {
            await this["hidManager"]["startMonitoring"](this["config"]), this["isStarted"] = !0x0;
        } catch (_0x3366d1) {
            R["handleErro" + 'r'](_0x3366d1, "KeyboardSDK.start");
        }
    }
    async ["stop"]() {
        const _0xc61a7d = _0x47670a;
        if (this["isStarted"]) try {
            this["hidManager"]["stopMonitoring"](), this["isStarted"] = !0x1;
        } catch (_0x3402fd) {
            R["handleErro" + 'r'](_0x3402fd, "KeyboardSDK.stop");
        }
    }
    async ["getDevices"]() {
        const _0x5aa570 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => this["deviceManager"]["getDevices"](), {
                'maxRetries': 0x2,
                'delay': 0x1f4,
                'onRetry': (_0x4d359b, _0x1b39e8) => {}
            });
        } catch (_0x37a119) {
            R["handleErro" + 'r'](_0x37a119, "KeyboardSDK.getDevic" + 'es');
        }
    }
    async ["init"](_0x2d7705) {
        const _0x452d2d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => this["deviceManager"]["init"](_0x2d7705), {
                'maxRetries': 0x3,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x55915a, _0x599ddc) => {}
            });
        } catch (_0x4855e3) {
            if (_0x4855e3 instanceof q) throw _0x4855e3;
            R["handleErro" + 'r'](_0x4855e3, "KeyboardSDK.init");
        }
    }
    async ["close"](_0x4637ee) {
        const _0x576d8e = _0x47670a;
        try {
            return await this["deviceManager"]["close"](_0x4637ee);
        } catch (_0x146911) {
            R["handleErro" + 'r'](_0x146911, "KeyboardSDK.close");
        }
    } ['on'](_0x2125c4, _0x559bed) {
        const _0x2d971b = _0x47670a;
        this["hidManager"]["onUSBChang" + 'e'](_0x559bed);
    } ["off"](_0x3e663d, _0x23a5ea) {
        const _0x2ea618 = _0x47670a;
        this["hidManager"]["offUSBChan" + 'ge'](_0x23a5ea);
    }
    static["isHIDSupported"]() {
        const _0x465201 = _0x47670a;
        return "hid" in navigator;
    }
    static["getVersion"]() {
        const _0x18a22b = _0x47670a;
        return "1.0.0";
    } ["setupEventForwarding"]() {
        const _0x5179a6 = _0x47670a;
        this["hidManager"]["onUSBChang" + 'e'](_0x4d06ea => {});
    }
    async ["getDevicesInfo"]() {
        const _0x5ab56d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x2dcc9e = _0x5ab56d,
                    _0x92889b = await this["getCurDevi" + 'ce'](),
                    _0x419da8 = [];
                for (let _0x295152 = 0x1; _0x295152 < 0x9; _0x295152 += 0x1) {
                    if (_0x295152 == 0x1 || _0x295152 == 0x3 || _0x295152 == 0x4) {
                        console["log"]("【获取设备信息】mode " + _0x295152 + ": 跳过"), _0x419da8["push"]('');
                        continue;
                    }
                    const _0x17cde5 = await this["deviceManager"]["sendComman" + 'd'](_0x92889b['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x11,
                        'mode': _0x295152,
                        'isVIA': !0x1
                    });
                    if (_0x17cde5 && _0x17cde5["data"] && _0x17cde5["data"]["key"] !== void 0x0) {
                        const _0x2be24f = _0x17cde5["data"]["key"];
                        _0x419da8["push"](_0x2be24f), console["log"]("【获取设备信息】mode " + _0x295152 + ": 结果 = " + _0x2be24f);
                    } else console["warn"]("【获取设备信息】mode " + _0x295152 + (": 无效响应，使用默" + '认值')), _0x419da8["push"]('');
                    await new Promise(_0x4d30a9 => setTimeout(_0x4d30a9, 0x2));
                }
                return {
                    'hardware_ver': _0x419da8[0x0],
                    'software_ver': _0x419da8[0x1],
                    'ctrl_chip_model': _0x419da8[0x2],
                    'ctrl_chip_flash': _0x419da8[0x3],
                    'device_id': _0x419da8[0x4],
                    'model_id': _0x419da8[0x5],
                    'pid_vid': _0x419da8[0x6],
                    'keyboard_matrix': _0x419da8[0x7]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1459d7, _0x162980) => {}
            });
        } catch (_0x128f6c) {
            throw console["error"]("获取设备信息失败:", _0x128f6c), _0x128f6c;
        }
    }
    async ["getProtocolVersion"]() {
        const _0x23a308 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return {
                'data': await y(async () => {
                    const _0x351627 = _0x23a308,
                        _0x57c724 = await this["getCurDevi" + 'ce']();
                    return (await this["deviceManager"]["sendComman" + 'd'](_0x57c724['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_GET_PROTOCOL_VERSION"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }))["data"]["key"];
                }, {
                    'maxRetries': 0x2,
                    'delay': 0x3e8,
                    'exponential': !0x0,
                    'onRetry': (_0xb08b6a, _0x285ed6) => {}
                })
            };
        } catch (_0x14f7b7) {
            throw console["error"]("获取当前回报率失败:", _0x14f7b7), _0x14f7b7;
        }
    }
    async ["getBatteryInformatio" + 'n']() {
        const _0x40c9d8 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x198a5b = _0x40c9d8,
                    _0x3b8ac9 = await this["getCurDevi" + 'ce']();
                let _0x5a4583 = {
                    'electricity': '',
                    'charging_status': ''
                };
                const _0x5b86fc = await this["deviceManager"]["sendComman" + 'd'](_0x3b8ac9['id'], {
                    'type': "readKeyboardData",
                    'cmd': 0x51,
                    'mode': 0x16,
                    'isVIA': !0x1
                });
                if (_0x5b86fc && _0x5b86fc["data"] && _0x5b86fc["data"]["key"] !== void 0x0 && _0x5b86fc["data"]["key"] !== '') {
                    const _0x2aecf4 = _0x5b86fc["data"]["key"],
                        _0x521fdb = _0x5b86fc["data"]["key"]["split"](',');
                    return console["log"]("【获取设备电池信息】: 结果 = " + _0x2aecf4), {
                        'electricity': _0x521fdb[0x0],
                        'charging_status': _0x521fdb[0x1]
                    };
                } else console["warn"]("【获取设备电池信息】: 无效响应.");
                return _0x5a4583;
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x3b09fb, _0x4a1ebc) => {}
            });
        } catch (_0x3abc64) {
            throw console["error"]("获取设备信息失败:", _0x3abc64), _0x3abc64;
        }
    }
    async ["getRateOfReturnList"]() {
        const _0x8f0751 = _0x47670a,
            _0x1930d8 = ["R1KHz", "R2KHz", "R3KHz", "R4KHz", "R5KHz", "R6KHz", "R7KHz", "R8KHz"];
        return Promise["resolve"]({
            'list': _0x1930d8
        });
    }
    async ["getCurDevi" + 'ce']() {
        const _0xae6d53 = _0x47670a;
        try {
            const _0xa418da = await this["getDevices"]();
            if (_0xa418da["length"] === 0x0) throw new Error("No device available. Please connect a device first" + '.');
            return _0xa418da[0x0];
        } catch (_0x624dc1) {
            throw console["error"]("获取当前设备ID失败" + ':', _0x624dc1), _0x624dc1;
        }
    }
    async ["getRateOfReturn"]() {
        const _0x11c93a = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return {
                'key': await y(async () => {
                    const _0xf98e53 = _0x11c93a,
                        _0x248690 = await this["getCurDevi" + 'ce']();
                    return (await this["deviceManager"]["sendComman" + 'd'](_0x248690['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x11,
                        'mode': 0xd,
                        'isVIA': !0x1
                    }))["data"]["key"];
                }, {
                    'maxRetries': 0x2,
                    'delay': 0x3e8,
                    'exponential': !0x0,
                    'onRetry': (_0x5a4b1d, _0x443dca) => {}
                })
            };
        } catch (_0x25ac75) {
            throw console["error"]("获取当前回报率失败:", _0x25ac75), _0x25ac75;
        }
    }
    async ["setRateOfReturn"](_0x3d7a86) {
        const _0x173331 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x513757 = _0x173331,
                    _0xa8b0ff = await this["getCurDevi" + 'ce'](),
                    _0x9ce6f7 = {
                        'R1KHz': 0x1,
                        'R2KHz': 0x2,
                        'R3KHz': 0x3,
                        'R4KHz': 0x4,
                        'R5KHz': 0x5,
                        'R6KHz': 0x6,
                        'R7KHz': 0x7,
                        'R8KHz': 0x8
                    } [_0x3d7a86],
                    _0x48f9bc = await this["deviceManager"]["sendComman" + 'd'](_0xa8b0ff['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x13,
                        'mode': 0x6,
                        'isVIA': !0x1
                    }, {
                        'dataValue': _0x9ce6f7
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x725edd, _0x2dbea0) => {}
            });
        } catch (_0xfbe334) {
            throw console["error"]("设置设备当前回报率失" + '败:', _0xfbe334), _0xfbe334;
        }
    }
    async ["restoreDevParaToFactorySetting" + 's']() {
        const _0x3fa90f = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x412af4 = _0x3fa90f,
                    _0x4133d5 = await this["getCurDevi" + 'ce'](),
                    _0x136897 = await this["deviceManager"]["sendComman" + 'd'](_0x4133d5['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x53,
                        'mode': 0x3,
                        'isVIA': !0x1
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2a2acb, _0x1ace1f) => {}
            });
        } catch (_0x1bc984) {
            throw console["error"]("设备参数恢复出厂设置失败:", _0x1bc984), _0x1bc984;
        }
    }
    async ["getKeybordPara"](_0x2f3952) {
        const _0x599869 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x64f893 = _0x599869,
                    _0x56e186 = await this["getCurDevi" + 'ce']();
                return (await this["deviceManager"]["sendComman" + 'd'](_0x56e186['id'], {
                    'type': "readKeyboardData",
                    'cmd': 0xab,
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataItem': _0x2f3952
                }))["data"]["key"];
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x49dcbb, _0x24b3b1) => {}
            });
        } catch (_0x365503) {
            throw console["error"]("读取键盘参数失败:", _0x365503), _0x365503;
        }
    }
    async ["setKeybordPara"](_0x47cbff, _0x17165e) {
        const _0x1e38d1 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0xc1f844 = _0x1e38d1,
                    _0x1c87fa = await this["getCurDevi" + 'ce'](),
                    _0x57ece3 = await this["deviceManager"]["sendComman" + 'd'](_0x1c87fa['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0xaa,
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'dataItem': _0x47cbff,
                        'dataValue': _0x17165e
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x57a8b2, _0x4793db) => {}
            });
        } catch (_0x10d537) {
            throw console["error"]("设置键盘参数失败:", _0x10d537), _0x10d537;
        }
    }
    async ["getKeyCode"](_0x5b1752) {
        const _0x599b4d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x39af07 = _0x599b4d,
                    _0x4f38e9 = await this["getCurDevi" + 'ce'](),
                    _0x5e3837 = await this["deviceManager"]["sendComman" + 'd'](_0x4f38e9['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_GET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, _0x5b1752);
                return {
                    'layer': _0x5b1752["layer"],
                    'row': _0x5b1752["row"],
                    'col': _0x5b1752["col"],
                    'keycode': _0x5e3837["data"]["key"]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x44fc4a, _0x41f505) => {}
            });
        } catch (_0x445709) {
            throw console["error"]("获取按键编码失败:", _0x445709), _0x445709;
        }
    }
    async ["setKeyCode"](_0x128926) {
        const _0x4c22de = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x4a1b4e = _0x4c22de,
                    _0x5a125e = await this["getCurDevi" + 'ce'](),
                    _0x58f354 = await this["deviceManager"]["sendComman" + 'd'](_0x5a125e['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, _0x128926);
                await new Promise(_0x3778e3 => setTimeout(_0x3778e3, 0x2));
                const _0x288c7e = await this["deviceManager"]["sendComman" + 'd'](_0x5a125e['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
                return {
                    'layer': _0x128926["layer"],
                    'row': _0x128926["row"],
                    'col': _0x128926["col"],
                    'keycode': _0x58f354["data"]["key"]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2da49d, _0x5c4a76) => {}
            });
        } catch (_0x57fec5) {
            throw console["error"]("设置按键编码失败:", _0x57fec5), _0x57fec5;
        }
    }
    async ["getLayerCount"]() {
        const _0x17bf9e = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return {
                'data': await y(async () => {
                    const _0x5a0b8f = _0x17bf9e,
                        _0x23a301 = await this["getCurDevi" + 'ce']();
                    return (await this["deviceManager"]["sendComman" + 'd'](_0x23a301['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_GET_LAYER_COUNT"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }))["data"]["key"];
                }, {
                    'maxRetries': 0x2,
                    'delay': 0x3e8,
                    'exponential': !0x0,
                    'onRetry': (_0x2f889d, _0x3e2a01) => {}
                })
            };
        } catch (_0x29e421) {
            throw console["error"]("获取键盘层数量失败:", _0x29e421), _0x29e421;
        }
    }
    async ["getKeyLayo" + 'ut']() {
        const _0x55dcf3 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x5af50e = _0x55dcf3,
                    _0x43336c = await this["getCurDevi" + 'ce']();
                if ((await this["deviceManager"]["sendComman" + 'd'](_0x43336c['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_GET_PROTOCOL_VERSION"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }))["data"]["key"] < 0xc) throw new Error("The device protocol does not support this function" + '.');
                await new Promise(_0x142f06 => setTimeout(_0x142f06, 0x2));
                const _0x1c2922 = (await this["deviceManager"]["sendComman" + 'd'](_0x43336c['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_VIAL_PREFIX"],
                    'mode': N["CMD_VIAL_GET_SIZE"],
                    'isVIA': !0x0
                }))["data"]["key"];
                if (_0x1c2922 <= 0x0) throw new Error("No keyboard layout data available.");
                await new Promise(_0x329434 => setTimeout(_0x329434, 0x2));
                let _0x38e92b = new Uint8Array(0x0),
                    _0x53c301 = 0x0,
                    _0x46533c = _0x1c2922;
                const _0x3f8d38 = 0x20;
                for (; _0x46533c > 0x0;) {
                    const _0xb799ba = await this["deviceManager"]["sendComman" + 'd'](_0x43336c['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_VIAL_PREFIX"],
                        'mode': N["CMD_VIAL_GET_DEFINITION"],
                        'isVIA': !0x0
                    }, {
                        'block': _0x53c301
                    });
                    let _0x5239f3 = null;
                    if (_0xb799ba["data"] instanceof Uint8Array ? _0x5239f3 = _0xb799ba["data"] : _0xb799ba["data"] && typeof _0xb799ba["data"] == "object" && ("bufferData" in _0xb799ba["data"] && _0xb799ba["data"]["bufferData"] instanceof Uint8Array ? _0x5239f3 = _0xb799ba["data"]["bufferData"] : "key" in _0xb799ba["data"] && _0xb799ba["data"]["key"] instanceof Uint8Array ? _0x5239f3 = _0xb799ba["data"]["key"] : Array["isArray"](_0xb799ba["data"]) ? _0x5239f3 = new Uint8Array(_0xb799ba["data"]) : _0xb799ba["data"]["bufferData"] && Array["isArray"](_0xb799ba["data"]["bufferData"]) && (_0x5239f3 = new Uint8Array(_0xb799ba["data"]["bufferData"]))), !_0x5239f3 || _0x5239f3["length"] === 0x0) {
                        console["warn"]("【获取键盘布局】块 " + _0x53c301 + " 无有效数据");
                        break;
                    }
                    _0x46533c < _0x3f8d38 && (_0x5239f3 = _0x5239f3["slice"](0x0, _0x46533c));
                    const _0x247218 = new Uint8Array(_0x38e92b["length"] + _0x5239f3["length"]);
                    _0x247218["set"](_0x38e92b), _0x247218["set"](_0x5239f3, _0x38e92b["length"]), _0x38e92b = _0x247218, _0x53c301++, _0x46533c -= _0x5239f3["length"], await new Promise(_0x1d5795 => setTimeout(_0x1d5795, 0x1));
                }
                if (_0x38e92b["length"] === 0x0) throw new Error("Failed to read keyboard layout data.");
                const _0x788540 = Array["from"](_0x38e92b["slice"](0x0, 0x10))["map"](_0x4e3afd => _0x4e3afd["toString"](0x10)["padStart"](0x2, '0'))["join"]('\x20');
                return _0x38e92b;
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1e0c4a, _0xb51e37) => {
                    const _0x2bc510 = _0x55dcf3;
                    let _0x3ed399 = "Unknown error";
                    _0x1e0c4a instanceof Error ? _0x3ed399 = _0x1e0c4a["message"] : typeof _0x1e0c4a == "string" ? _0x3ed399 = _0x1e0c4a : _0x1e0c4a && typeof _0x1e0c4a == "object" && "message" in _0x1e0c4a && (_0x3ed399 = String(_0x1e0c4a["message"])), console["warn"]("【获取键盘布局】重试" + '\x20' + _0xb51e37 + " 次:", _0x3ed399);
                }
            });
        } catch (_0x58770c) {
            throw console["error"]("获取键盘布局失败:", _0x58770c), _0x58770c;
        }
    }
    async ["getRowKeyM" + 'ap'](_0x4dad66) {
        const _0x180593 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x352a00 = _0x180593,
                    _0x20ba30 = await this["getCurDevi" + 'ce'](),
                    _0x42fb44 = [];
                for (let _0x52caa9 = 0x0; _0x52caa9 < _0x4dad66["cols"]; _0x52caa9 += 0x1) {
                    const _0x185560 = await this["deviceManager"]["sendComman" + 'd'](_0x20ba30['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_GET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'layer': _0x4dad66["layer"],
                        'row': _0x4dad66["row"],
                        'col': _0x52caa9
                    });
                    if (_0x185560 && _0x185560["data"] && _0x185560["data"]["key"] !== void 0x0) {
                        const _0xf345f7 = _0x185560["data"]["key"];
                        _0x42fb44["push"](_0xf345f7);
                    } else _0x42fb44["push"](0x0);
                    _0x52caa9 < _0x4dad66["cols"] - 0x1 && await new Promise(_0x4ed524 => setTimeout(_0x4ed524, 0x1));
                }
                return {
                    'layer': _0x4dad66["layer"],
                    'row': _0x4dad66["row"],
                    'keyboardLayout': _0x42fb44
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x459105, _0x4e5dcc) => {}
            });
        } catch (_0x154b3a) {
            throw console["error"]("获取行键值配置失败:", _0x154b3a), _0x154b3a;
        }
    }
    async ["getKeymapBuffer"](_0x530140) {
        const _0x1b462a = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x1abbce = _0x1b462a;
                var _0x4cf76d;
                const _0x860e3a = await this["getCurDevi" + 'ce'](),
                    {
                        layer: _0x3348a6,
                        rows: _0x497dc7,
                        cols: _0x360715
                    } = _0x530140;
                if (_0x3348a6 < 0x0 || _0x497dc7 <= 0x0 || _0x360715 <= 0x0) throw new Error("参数非法.");
                const _0x45d888 = _0x497dc7 * _0x360715 * 0x2,
                    _0x9eba96 = _0x3348a6 * _0x45d888;
                if (_0x9eba96 + _0x45d888 > 0xffff) throw new Error("参数非法：偏移越界.");
                const _0x49af77 = _0x45d888;
                if (_0x49af77 <= 0x0) throw new Error("参数非法.");
                let _0x191436 = new Uint8Array(0x0),
                    _0x48f048 = 0x0;
                const _0x435247 = 0x1c;
                for (; _0x48f048 < _0x49af77;) {
                    const _0x3daf40 = Math["min"](_0x435247, _0x49af77 - _0x48f048),
                        _0x319ff2 = await this["deviceManager"]["sendComman" + 'd'](_0x860e3a['id'], {
                            'type': "readKeyboardData",
                            'cmd': c["CMD_VIA_KEYMAP_GET_BUFFER"],
                            'mode': 0x0,
                            'isVIA': !0x0
                        }, {
                            'offset': _0x9eba96 + _0x48f048,
                            'size': _0x3daf40
                        });
                    let _0x2ea53c = null;
                    const _0x5799fe = (_0x4cf76d = _0x319ff2 == null ? void 0x0 : _0x319ff2["data"]) == null ? void 0x0 : _0x4cf76d["key"];
                    if (_0x5799fe instanceof Uint8Array ? _0x2ea53c = _0x5799fe : Array["isArray"](_0x5799fe) && (_0x2ea53c = new Uint8Array(_0x5799fe)), !_0x2ea53c || _0x2ea53c["length"] === 0x0) throw new Error("读键值缓冲区失败：偏" + '移\x20' + (_0x9eba96 + _0x48f048) + " 分片无有效数据");
                    _0x2ea53c["length"] > _0x435247 && (_0x2ea53c = _0x2ea53c["slice"](0x0, _0x435247));
                    const _0x4e6bb0 = new Uint8Array(_0x191436["length"] + _0x2ea53c["length"]);
                    _0x4e6bb0["set"](_0x191436), _0x4e6bb0["set"](_0x2ea53c, _0x191436["length"]), _0x191436 = _0x4e6bb0, _0x48f048 += _0x2ea53c["length"], await new Promise(_0x52050a => setTimeout(_0x52050a, 0x1));
                }
                if (_0x191436["length"] === 0x0) throw new Error("Failed to read keyboard layout data.");
                _0x191436["length"] !== _0x49af77 && console["warn"]("【读键值缓冲区】数据不完整：期望 " + _0x49af77 + " 字节，实际 " + _0x191436["length"] + " 字节");
                const _0x54d6e8 = Array["from"](_0x191436["slice"](0x0, 0x10))["map"](_0x1d4c0a => _0x1d4c0a["toString"](0x10)["padStart"](0x2, '0'))["join"]('\x20');
                return _0x191436;
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x16cd5a, _0x419cbd) => {
                    const _0x5120ec = _0x1b462a;
                    let _0x27571f = "Unknown error";
                    _0x16cd5a instanceof Error ? _0x27571f = _0x16cd5a["message"] : typeof _0x16cd5a == "string" ? _0x27571f = _0x16cd5a : _0x16cd5a && typeof _0x16cd5a == "object" && "message" in _0x16cd5a && (_0x27571f = String(_0x16cd5a["message"])), console["warn"]("【读键值缓冲区】重试" + '\x20' + _0x419cbd + " 次:", _0x27571f);
                }
            });
        } catch (_0x256822) {
            throw console["error"]("读键值缓冲区失败:", _0x256822), _0x256822;
        }
    }
    async ["getLightingBase"](_0x5d5930) {
        const _0x552852 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x22766f = _0x552852,
                    _0xbb8a3e = await this["getCurDevi" + 'ce'](),
                    _0x24e317 = await this["deviceManager"]["sendComman" + 'd'](_0xbb8a3e['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_LIGHTING_GET_VALUE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'dataid': g["VIA_LIGHTING_EFFECT"]
                    });
                await new Promise(_0x1b9882 => setTimeout(_0x1b9882, 0x2));
                const _0x5da8ac = await this["deviceManager"]["sendComman" + 'd'](_0xbb8a3e['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_GET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_BRIGHTNESS"]
                });
                await new Promise(_0x423d31 => setTimeout(_0x423d31, 0x2));
                const _0x2e8995 = await this["deviceManager"]["sendComman" + 'd'](_0xbb8a3e['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_GET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_EFFECT_SPEED"]
                });
                await new Promise(_0x3c67c9 => setTimeout(_0x3c67c9, 0x2));
                const _0x2b49f7 = await this["deviceManager"]["sendComman" + 'd'](_0xbb8a3e['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_GET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_COLOR"]
                });
                return {
                    'area': "Keyboard",
                    'open': _0x24e317["data"]["key"] === 0x0 ? "Close" : "Open",
                    'mode': _0x24e317["data"]["key"],
                    'luminance': _0x5da8ac["data"]["key"],
                    'speed': _0x2e8995["data"]["key"],
                    'direction': "Forward",
                    'selectStaticColor': _0x2b49f7["data"]["key"]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x59f5f4, _0x5a6078) => {}
            });
        } catch (_0x718da6) {
            throw console["error"]("获取灯光基础配置失败" + ':', _0x718da6), _0x718da6;
        }
    }
    async ["setLightingBase"](_0x5f3dd7) {
        const _0x803561 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        if (_0x5f3dd7["optitem"] !== 0x0 && _0x5f3dd7["optitem"] !== 0x1 && _0x5f3dd7["optitem"] !== 0x2 && _0x5f3dd7["optitem"] !== 0x3 && _0x5f3dd7["optitem"] !== 0x4) throw new Error("Invalid optitem.");
        try {
            return await y(async () => {
                const _0x5946c0 = _0x803561,
                    _0x8d761a = await this["getCurDevi" + 'ce']();
                let _0x150fe5;
                (_0x5f3dd7["optitem"] === 0x0 || _0x5f3dd7["optitem"] === 0x1) && (_0x150fe5 = await this["deviceManager"]["sendComman" + 'd'](_0x8d761a['id'], {
                    'type': "writeKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_SET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_EFFECT"],
                    'dataValue': _0x5f3dd7["data"]["open"] === "Close" ? 0x0 : _0x5f3dd7["data"]["mode"]
                }), await new Promise(_0x57264f => setTimeout(_0x57264f, 0x2)));
                let _0x4c4cd0;
                (_0x5f3dd7["optitem"] === 0x0 || _0x5f3dd7["optitem"] === 0x2) && (_0x4c4cd0 = await this["deviceManager"]["sendComman" + 'd'](_0x8d761a['id'], {
                    'type': "writeKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_SET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_BRIGHTNESS"],
                    'dataValue': _0x5f3dd7["data"]["luminance"]
                }), await new Promise(_0x44dfe9 => setTimeout(_0x44dfe9, 0x2)));
                let _0xf90705;
                (_0x5f3dd7["optitem"] === 0x0 || _0x5f3dd7["optitem"] === 0x3) && (_0xf90705 = await this["deviceManager"]["sendComman" + 'd'](_0x8d761a['id'], {
                    'type': "writeKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_SET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_EFFECT_SPEED"],
                    'dataValue': _0x5f3dd7["data"]["speed"]
                }), await new Promise(_0x3e8842 => setTimeout(_0x3e8842, 0x2)));
                let _0xb104b9;
                (_0x5f3dd7["optitem"] === 0x0 || _0x5f3dd7["optitem"] === 0x4) && (_0xb104b9 = await this["deviceManager"]["sendComman" + 'd'](_0x8d761a['id'], {
                    'type': "writeKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_SET_VALUE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }, {
                    'dataid': g["VIA_LIGHTING_COLOR"],
                    'dataValue': _0x5f3dd7["data"]["selectStaticColor"]
                }), await new Promise(_0x536bbc => setTimeout(_0x536bbc, 0x2)));
                const _0xff0ec7 = await this["deviceManager"]["sendComman" + 'd'](_0x8d761a['id'], {
                    'type': "writeKeyboardData",
                    'cmd': c["CMD_VIA_LIGHTING_SAV" + 'E'],
                    'mode': 0x0,
                    'isVIA': !0x0
                });
                let _0x24385a = '';
                return _0x150fe5 != null && (_0x24385a = _0x150fe5["data"]["key"] === 0x0 ? "Close" : "Open"), {
                    'area': "Keyboard",
                    'open': _0x24385a,
                    'mode': _0x150fe5 == null ? -0x1 : _0x150fe5["data"]["key"],
                    'luminance': _0x4c4cd0 == null ? -0x1 : _0x4c4cd0["data"]["key"],
                    'speed': _0xf90705 == null ? -0x1 : _0xf90705["data"]["key"],
                    'direction': "Forward",
                    'selectStaticColor': _0xb104b9 == null ? -0x1 : _0xb104b9["data"]["key"]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x5616e4, _0x14a10d) => {}
            });
        } catch (_0x1a10b8) {
            throw console["error"]("设置灯光基础配置失败" + ':', _0x1a10b8), _0x1a10b8;
        }
    } ["onLightingUpload"](_0x12cc01) {
        const _0x2b90f4 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        this["lightingUploadListeners"]["add"](_0x12cc01), this["lightingUploadListeners"]["size"] === 0x1 && this["hidManager"]["addUnsolicitedReportListener"](this["lightingUploadHandle" + 'r']);
    } ["offLightingUpload"](_0x27511d) {
        const _0x222927 = _0x47670a;
        this["lightingUploadListeners"]["delete"](_0x27511d), this["lightingUploadListeners"]["size"] === 0x0 && this["hidManager"]["removeUnsolicitedReportListene" + 'r'](this["lightingUploadHandle" + 'r']);
    }
    async ["getMacroSpaceInfo"]() {
        const _0x5811fe = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0xa033e = _0x5811fe,
                    _0x4f1d84 = await this["getCurDevi" + 'ce'](),
                    _0x47de42 = await this["deviceManager"]["sendComman" + 'd'](_0x4f1d84['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_MACRO_GET_COUNT"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    });
                await new Promise(_0x156498 => setTimeout(_0x156498, 0x2));
                const _0x36d056 = await this["deviceManager"]["sendComman" + 'd'](_0x4f1d84['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_MACRO_GET_BUFFER_SIZE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                });
                return {
                    'macroCount': _0x47de42["data"]["key"],
                    'macroBufferSize': _0x36d056["data"]["key"]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x322ed6, _0x2cbe61) => {}
            });
        } catch (_0x54e1c6) {
            throw console["error"]("获取宏空间信息失败:", _0x54e1c6), _0x54e1c6;
        }
    }
    async ["getMacroDa" + 'ta']() {
        const _0x4983f1 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x4b95d2 = _0x4983f1,
                    _0x2943ee = await this["getCurDevi" + 'ce'](),
                    _0x34bff5 = (await this["deviceManager"]["sendComman" + 'd'](_0x2943ee['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_MACRO_GET_COUNT"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }))["data"]["key"];
                await new Promise(_0x43a7db => setTimeout(_0x43a7db, 0x2));
                const _0x492991 = (await this["deviceManager"]["sendComman" + 'd'](_0x2943ee['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_MACRO_GET_BUFFER_SIZE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }))["data"]["key"];
                await new Promise(_0x496edd => setTimeout(_0x496edd, 0x2));
                let _0x59ef49 = new Uint8Array(0x0);
                if (_0x492991 > 0x0)
                    for (let _0x4ea03c = 0x0; _0x4ea03c < _0x492991; _0x4ea03c += 0x1c) {
                        const _0x6f034d = Math["min"](0x1c, _0x492991 - _0x4ea03c),
                            _0x40764d = await this["deviceManager"]["sendComman" + 'd'](_0x2943ee['id'], {
                                'type': "readKeyboardData",
                                'cmd': c["CMD_VIA_MACRO_GET_BUFFER"],
                                'mode': 0x0,
                                'isVIA': !0x0
                            }, {
                                'offset': _0x4ea03c,
                                'size': _0x6f034d
                            });
                        let _0x578460 = null;
                        if (_0x40764d["data"] instanceof Uint8Array ? _0x578460 = _0x40764d["data"] : _0x40764d["data"] && typeof _0x40764d["data"] == "object" && ("bufferData" in _0x40764d["data"] && _0x40764d["data"]["bufferData"] instanceof Uint8Array ? _0x578460 = _0x40764d["data"]["bufferData"] : "key" in _0x40764d["data"] && _0x40764d["data"]["key"] instanceof Uint8Array ? _0x578460 = _0x40764d["data"]["key"] : Array["isArray"](_0x40764d["data"]) ? _0x578460 = new Uint8Array(_0x40764d["data"]) : _0x40764d["data"]["bufferData"] && Array["isArray"](_0x40764d["data"]["bufferData"]) && (_0x578460 = new Uint8Array(_0x40764d["data"]["bufferData"]))), !_0x578460 || _0x578460["length"] === 0x0) continue;
                        const _0x3e314f = new Uint8Array(_0x59ef49["length"] + _0x578460["length"]);
                        if (_0x3e314f["set"](_0x59ef49), _0x3e314f["set"](_0x578460, _0x59ef49["length"]), _0x59ef49 = _0x3e314f, Array["from"](_0x59ef49)["filter"](_0x53aa8e => _0x53aa8e === 0x0)["length"] >= _0x34bff5 && _0x34bff5 > 0x0) break;
                        await new Promise(_0x1c52c7 => setTimeout(_0x1c52c7, 0x1));
                    }
                let _0x1e72b2 = [];
                if (_0x59ef49["length"] > 0x0) try {
                    _0x1e72b2 = U["deserializeMacroData"](_0x59ef49, _0x34bff5);
                } catch (_0x326186) {
                    console["error"]("【宏数据调试】解析宏数据失败:", _0x326186), _0x1e72b2 = this["createEmptyMacros"](_0x34bff5);
                } else _0x1e72b2 = this["createEmptyMacros"](_0x34bff5);
                if (_0x1e72b2["length"] !== _0x34bff5) {
                    if (_0x1e72b2["length"] < _0x34bff5) {
                        for (let _0x546c30 = _0x1e72b2["length"]; _0x546c30 < _0x34bff5; _0x546c30++) _0x1e72b2["push"]({
                            'id': _0x546c30
                        });
                    } else _0x1e72b2["length"] > _0x34bff5 && (_0x1e72b2 = _0x1e72b2["slice"](0x0, _0x34bff5));
                }
                return {
                    'macroCount': _0x34bff5,
                    'macroBufferSize': _0x492991,
                    'macros': _0x1e72b2
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2ae4c4, _0x6a2194) => {}
            });
        } catch (_0x4a3170) {
            throw console["error"]("获取宏空间信息失败:", _0x4a3170), _0x4a3170;
        }
    } ["createEmptyMacros"](_0x5333cd) {
        const _0x474c51 = _0x47670a,
            _0x46cdcd = [];
        for (let _0x1b819c = 0x0; _0x1b819c < _0x5333cd; _0x1b819c++) _0x46cdcd["push"]({
            'id': _0x1b819c
        });
        return _0x46cdcd;
    }
    async ["setMacroDa" + 'ta'](_0x6f0385) {
        const _0x452fca = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x472f75 = _0x452fca,
                    _0x2e874d = await this["getCurDevi" + 'ce'](),
                    _0x23fea3 = (await this["deviceManager"]["sendComman" + 'd'](_0x2e874d['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_MACRO_GET_COUNT"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }))["data"]["key"];
                if (console["log"]("当前设备支持最大宏数量: " + _0x23fea3), _0x6f0385["length"] === 0x0) throw new Error("宏数据不能为空数组");
                const _0x4217f1 = Math["max"](..._0x6f0385["map"](_0x4920fc => _0x4920fc['id']));
                if (console["log"]("传入的宏数据中最大ID: " + _0x4217f1), _0x4217f1 >= _0x23fea3) throw new Error("宏ID " + _0x4217f1 + (" 超过设备支持的最大宏数量(") + _0x23fea3 + (")，宏ID必须从0开始且小于") + _0x23fea3);
                const _0xc79c7f = _0x6f0385["map"](_0x1cb54d => _0x1cb54d['id'])["sort"]((_0x26b3b3, _0x43f24b) => _0x26b3b3 - _0x43f24b);
                for (let _0x40c4d9 = 0x0; _0x40c4d9 < _0xc79c7f["length"]; _0x40c4d9++) _0xc79c7f[_0x40c4d9] !== _0x40c4d9 && console["warn"]("宏ID不连续: 缺少ID " + _0x40c4d9);
                const _0x4a0f45 = (await this["deviceManager"]["sendComman" + 'd'](_0x2e874d['id'], {
                    'type': "readKeyboardData",
                    'cmd': c["CMD_VIA_MACRO_GET_BUFFER_SIZE"],
                    'mode': 0x0,
                    'isVIA': !0x0
                }))["data"]["key"];
                console["log"]("当前设备宏数据存储容量: " + _0x4a0f45 + " 字节"), console["log"]("序列化前的宏数据:"), console["log"](JSON["stringify"](_0x6f0385, null, 0x2)), console["log"]("=== 宏数据详细分析 ==="), _0x6f0385["forEach"]((_0x183ad0, _0x1a537b) => {
                    const _0x368332 = _0x472f75;
                    console["log"]('宏[' + _0x1a537b + "] - ID: " + _0x183ad0['id']), _0x183ad0["actions"] && _0x183ad0["actions"]["length"] > 0x0 ? (console["log"]("  动作数量: " + _0x183ad0["actions"]["length"]), _0x183ad0["actions"]["forEach"]((_0x39de0b, _0x3e7d1d) => {
                        const _0x171c5c = _0x368332;
                        console["log"]("  动作[" + _0x3e7d1d + "]: 类型=" + _0x39de0b["action"] + ", 值=" + _0x39de0b["value"]);
                    })) : console["log"]("  无动作");
                }), console["log"]("==================");
                const _0x13d779 = U["serializeMacroData"](_0x6f0385, _0x23fea3);
                if (console["log"]("序列化后的宏数据大小" + ':\x20' + _0x13d779["length"] + " 字节"), console["log"]("序列化后的宏数据 (16进制):"), re(_0x13d779), _0x13d779["length"] > _0x4a0f45) throw new Error("宏数据大小(" + _0x13d779["length"] + ("字节)超过设备存储容" + '量(') + _0x4a0f45 + "字节)");
                return console["log"]("发送宏配置开始命令." + '..'), await this["sendMacroConfigStartCommand"](_0x2e874d), console["log"]("发送写入宏数据命令." + '..'), await this["writeMacroData"](_0x2e874d, _0x13d779), console["log"]("发送宏配置结束命令." + '..'), await this["sendMacroConfigEndCommand"](_0x2e874d), {
                    'success': !0x0,
                    'message': "宏数据设置成功，写入" + _0x13d779["length"] + "字节，最大宏ID=" + _0x4217f1
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0xf6bf7b, _0x3c4101) => {
                    const _0x1fe2de = _0x452fca;
                    console["warn"]("Retry " + _0x3c4101 + (" to set macro data after error" + ':'), _0xf6bf7b["message"]);
                }
            });
        } catch (_0x433af6) {
            throw console["error"]("设置宏数据失败:", _0x433af6), _0x433af6;
        }
    }
    async ["sendMacroConfigStartCommand"](_0x2de9bf) {
        const _0x59fda3 = _0x47670a;
        await this["deviceManager"]["sendComman" + 'd'](_0x2de9bf['id'], {
            'type': "writeKeyboardData",
            'cmd': c["CMD_VIA_WRITE_DATA"],
            'mode': 0x0,
            'isVIA': !0x0
        }, {
            'data': new Uint8Array([0xd])
        }), await new Promise(_0x3ef451 => setTimeout(_0x3ef451, 0x5)), await this["deviceManager"]["sendComman" + 'd'](_0x2de9bf['id'], {
            'type': "writeKeyboardData",
            'cmd': c["CMD_VIA_WRITE_DATA"],
            'mode': 0x0,
            'isVIA': !0x0
        }, {
            'data': new Uint8Array([0x10])
        }), await new Promise(_0x548281 => setTimeout(_0x548281, 0x5)), await this["deviceManager"]["sendComman" + 'd'](_0x2de9bf['id'], {
            'type': "writeKeyboardData",
            'cmd': c["CMD_VIA_WRITE_DATA"],
            'mode': 0x0,
            'isVIA': !0x0
        }, {
            'data': new Uint8Array([0xf, 0x7, 0x5f, 0x1])
        }), await new Promise(_0x324cc7 => setTimeout(_0x324cc7, 0x5));
    }
    async ["writeMacroData"](_0x12bb98, _0x1a9897) {
        const _0xe3ae9 = _0x47670a;
        for (let _0x4702e0 = 0x0; _0x4702e0 < _0x1a9897["length"]; _0x4702e0 += 0x1c) {
            const _0x17ebb4 = Math["min"](0x1c, _0x1a9897["length"] - _0x4702e0),
                _0x141fe4 = _0x1a9897["slice"](_0x4702e0, _0x4702e0 + _0x17ebb4);
            console["log"]("写入宏数据块: 偏移" + '=' + _0x4702e0 + ", 大小=" + _0x17ebb4), await this["deviceManager"]["sendComman" + 'd'](_0x12bb98['id'], {
                'type': "writeKeyboardData",
                'cmd': c["CMD_VIA_MACRO_SET_BUFFER"],
                'mode': 0x0,
                'isVIA': !0x0
            }, {
                'offset': _0x4702e0,
                'data': _0x141fe4
            }), await new Promise(_0x460848 => setTimeout(_0x460848, 0x1));
        }
    }
    async ["sendMacroConfigEndCommand"](_0x38fc7c) {
        const _0x56b4f8 = _0x47670a;
        await new Promise(_0x352143 => setTimeout(_0x352143, 0x5)), await this["deviceManager"]["sendComman" + 'd'](_0x38fc7c['id'], {
            'type': "writeKeyboardData",
            'cmd': c["CMD_VIA_WRITE_DATA"],
            'mode': 0x0,
            'isVIA': !0x0
        }, {
            'data': new Uint8Array([0xf, 0x7, 0x5f, 0x1])
        });
    }
    async ["setMacroKe" + 'y'](_0x552a16) {
        const _0x502e52 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x2cd022 = _0x502e52,
                    _0x28f854 = await this["getCurDevi" + 'ce'](),
                    _0x20a0bb = await this["deviceManager"]["sendComman" + 'd'](_0x28f854['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x1,
                        'isVIA': !0x0
                    }, {
                        'layer': _0x552a16["layer"],
                        'row': _0x552a16["row"],
                        'col': _0x552a16["col"],
                        'keycode': _0x552a16["macroid"] + 0x7700
                    });
                await new Promise(_0x5dffaa => setTimeout(_0x5dffaa, 0x2));
                const _0x4227ee = await this["deviceManager"]["sendComman" + 'd'](_0x28f854['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
                return {
                    'layer': _0x552a16["layer"],
                    'row': _0x552a16["row"],
                    'col': _0x552a16["col"],
                    'macroid': _0x20a0bb["data"]["key"] - 0x7700
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2c3f2f, _0x1f7062) => {}
            });
        } catch (_0x2bef12) {
            throw console["error"]("设置宏按键失败:", _0x2bef12), _0x2bef12;
        }
    }
    async ["getPerformance"](_0x4bb8ac) {
        const _0x5d4406 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x34bf7c = _0x5d4406,
                    _0x328d48 = await this["getCurDevi" + 'ce'](),
                    _0x38ea0a = (await this["deviceManager"]["sendComman" + 'd'](_0x328d48['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x0,
                        'isVIA': !0x1
                    }, {
                        'T': 0x4,
                        'M': 0xff,
                        'row': _0x4bb8ac["row"],
                        'col': _0x4bb8ac["col"]
                    }))["data"]["key"]["split"](',');
                return {
                    'row': _0x4bb8ac["row"],
                    'col': _0x4bb8ac["col"],
                    'RTEnable': _0x38ea0a[0x0],
                    'conRTEnable': _0x38ea0a[0x1],
                    'bottomDeadZone': _0x38ea0a[0x2],
                    'nonRTTrigDistancePress': _0x38ea0a[0x3],
                    'nonRTTrigDistanceRelease': _0x38ea0a[0x4],
                    'conRTTrigDistancePress': _0x38ea0a[0x5],
                    'conRTTrigDistanceRelease': _0x38ea0a[0x6],
                    'RTDeadZoneUp': _0x38ea0a[0x7],
                    'RTDeadZoneDown': _0x38ea0a[0x8],
                    'RTTrigDeadZone': _0x38ea0a[0x9],
                    'RTTrigDistancePress': _0x38ea0a[0xa],
                    'RTTrigDistanceRelease': _0x38ea0a[0xb]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x4577f0, _0x4a38eb) => {}
            });
        } catch (_0x378efe) {
            throw console["error"]("获取按键性能配置失败" + ':', _0x378efe), _0x378efe;
        }
    }
    async ["setPerformance"](_0x49b481) {
        const _0x231b12 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x1d0384 = _0x231b12,
                    _0x2ebf71 = await this["getCurDevi" + 'ce'](),
                    _0x4401b1 = await this["deviceManager"]["sendComman" + 'd'](_0x2ebf71['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40,
                        'isVIA': !0x1
                    }, {
                        'T': 0x4,
                        'M': 0xff,
                        'param': _0x49b481
                    });
                await new Promise(_0x54d3f8 => setTimeout(_0x54d3f8, 0x2));
                const _0x363502 = await this["deviceManager"]["sendComman" + 'd'](_0x2ebf71['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
                return {
                    'row': _0x49b481["row"],
                    'col': _0x49b481["col"],
                    'RTEnable': _0x49b481["RTEnable"],
                    'conRTEnable': _0x49b481["conRTEnabl" + 'e'],
                    'bottomDeadZone': _0x49b481["bottomDeadZone"],
                    'nonRTTrigDistancePress': _0x49b481["nonRTTrigDistancePre" + 'ss'],
                    'nonRTTrigDistanceRelease': _0x49b481["nonRTTrigDistanceRelease"],
                    'conRTTrigDistancePress': _0x49b481["conRTTrigDistancePre" + 'ss'],
                    'conRTTrigDistanceRelease': _0x49b481["conRTTrigDistanceRelease"],
                    'RTDeadZoneUp': _0x49b481["RTDeadZone" + 'Up'],
                    'RTDeadZoneDown': _0x49b481["RTDeadZoneDown"],
                    'RTTrigDeadZone': _0x49b481["RTTrigDeadZone"],
                    'RTTrigDistancePress': _0x49b481["RTTrigDistancePress"],
                    'RTTrigDistanceRelease': _0x49b481["RTTrigDistanceReleas" + 'e']
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0xc7a84f, _0x1a052c) => {}
            });
        } catch (_0x1b3d57) {
            throw console["error"]("设置按键编码失败:", _0x1b3d57), _0x1b3d57;
        }
    }
    async ["getHigherKeyDKS"](_0x52602f) {
        const _0x4df4ec = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0xa4bc76 = _0x4df4ec,
                    _0x25d3ea = await this["getCurDevi" + 'ce'](),
                    _0x26659e = await this["deviceManager"]["sendComman" + 'd'](_0x25d3ea['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x0,
                        'isVIA': !0x1
                    }, {
                        'T': 0x5,
                        'M': 0xff,
                        'row': 0x0,
                        'col': 0x0,
                        'index': _0x52602f["index"]
                    });
                await new Promise(_0x1d5109 => setTimeout(_0x1d5109, 0x2));
                const _0xb44269 = await this["deviceManager"]["sendComman" + 'd'](_0x25d3ea['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x0,
                        'isVIA': !0x1
                    }, {
                        'T': 0x6,
                        'M': 0xff,
                        'row': 0x0,
                        'col': 0x0,
                        'index': _0x52602f["index"]
                    }),
                    _0x3b8a36 = _0x26659e["data"]["key"]["split"](','),
                    _0x371e25 = _0xb44269["data"]["key"]["split"](',');
                return {
                    'layer': _0x3b8a36[0x0],
                    'row': _0x3b8a36[0x1],
                    'col': _0x3b8a36[0x2],
                    'index': _0x3b8a36[0x3],
                    'dbs': _0x3b8a36[0x4],
                    'trps': _0x3b8a36["slice"](0x5, 0x9)["map"](Number),
                    'kcs': _0x371e25["slice"](0x0, 0x14)["map"](Number)
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x12b03d, _0x4b3d9b) => {}
            });
        } catch (_0x22f41f) {
            throw console["error"]("读取DKS高级键失败" + ':', _0x22f41f), _0x22f41f;
        }
    }
    async ["setHigherKeyDKS"](_0x294c05) {
        const _0x281fdd = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x10c7f6 = await y(async () => {
                const _0x2d4f49 = _0x281fdd,
                    _0x462467 = await this["getCurDevi" + 'ce'](),
                    _0x1485ae = await this["deviceManager"]["sendComman" + 'd'](_0x462467['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40 + _0x294c05["layer"],
                        'isVIA': !0x1
                    }, {
                        'T': 0x5,
                        'M': 0xff,
                        'param': _0x294c05
                    });
                await new Promise(_0x35f098 => setTimeout(_0x35f098, 0x2));
                const _0x5374c5 = await this["deviceManager"]["sendComman" + 'd'](_0x462467['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x1d,
                    'mode': 0x40 + _0x294c05["layer"],
                    'isVIA': !0x1
                }, {
                    'T': 0x6,
                    'M': 0xff,
                    'param': _0x294c05
                });
                await new Promise(_0x3d648d => setTimeout(_0x3d648d, 0x2));
                const _0x4de1fc = await this["deviceManager"]["sendComman" + 'd'](_0x462467['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x145588, _0x169036) => {}
            });
            return;
        } catch (_0x151215) {
            throw console["error"]("设置DKS高级键失败" + ':', _0x151215), _0x151215;
        }
    }
    async ["getHigherKeyRS"](_0x58536f) {
        const _0x4fa7e8 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x2565df = _0x4fa7e8,
                    _0x2d3817 = await this["getCurDevi" + 'ce'](),
                    _0x13fb95 = (await this["deviceManager"]["sendComman" + 'd'](_0x2d3817['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x0,
                        'isVIA': !0x1
                    }, {
                        'T': 0x7,
                        'M': 0xff,
                        'row': 0x0,
                        'col': 0x0,
                        'index': _0x58536f["index"]
                    }))["data"]["key"]["split"](',');
                return {
                    'layer': _0x13fb95[0x0],
                    'row': _0x13fb95[0x1],
                    'col': _0x13fb95[0x2],
                    'index': _0x13fb95[0x3],
                    'rsEnable': _0x13fb95[0x4],
                    'row2': _0x13fb95[0x5],
                    'col2': _0x13fb95[0x6],
                    'rtEnable': _0x13fb95[0x7],
                    'startPoint': _0x13fb95[0x8]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x4bf9db, _0x5973cb) => {}
            });
        } catch (_0x4026f0) {
            throw console["error"]("读取RS高级键失败:", _0x4026f0), _0x4026f0;
        }
    }
    async ["setHigherKeyRS"](_0x5aec6e) {
        const _0x1b71d4 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x174962 = await y(async () => {
                const _0x568914 = _0x1b71d4,
                    _0x4e924d = await this["getCurDevi" + 'ce'](),
                    _0x4db0f1 = await this["deviceManager"]["sendComman" + 'd'](_0x4e924d['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40 + _0x5aec6e["layer"],
                        'isVIA': !0x1
                    }, {
                        'T': 0x7,
                        'M': 0xff,
                        'param': _0x5aec6e
                    });
                await new Promise(_0x330d65 => setTimeout(_0x330d65, 0x2));
                const _0x408e84 = await this["deviceManager"]["sendComman" + 'd'](_0x4e924d['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x26845, _0x187fc4) => {}
            });
            return;
        } catch (_0xce6e9f) {
            throw console["error"]("设置RS高级键失败:", _0xce6e9f), _0xce6e9f;
        }
    }
    async ["getHigherKeySOCD"](_0x549fcd) {
        const _0x516bf2 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x4cb9ad = _0x516bf2,
                    _0x23547b = await this["getCurDevi" + 'ce'](),
                    _0x102fd9 = (await this["deviceManager"]["sendComman" + 'd'](_0x23547b['id'], {
                        'type': "readKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x0,
                        'isVIA': !0x1
                    }, {
                        'T': 0x8,
                        'M': 0xff,
                        'row': 0x0,
                        'col': 0x0,
                        'index': _0x549fcd["index"]
                    }))["data"]["key"]["split"](',');
                return {
                    'layer': _0x102fd9[0x0],
                    'row': _0x102fd9[0x1],
                    'col': _0x102fd9[0x2],
                    'index': _0x102fd9[0x3],
                    'socdEnable': _0x102fd9[0x4],
                    'row2': _0x102fd9[0x5],
                    'col2': _0x102fd9[0x6],
                    'rtEnable': _0x102fd9[0x7],
                    'socdFunc': _0x102fd9[0x8],
                    'startPoint': _0x102fd9[0x9]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0xd5ef28, _0x30ffe4) => {}
            });
        } catch (_0x1a1c33) {
            throw console["error"]("读取SOCD高级键失" + '败:', _0x1a1c33), _0x1a1c33;
        }
    }
    async ["setHigherKeySOCD"](_0xc16848) {
        const _0x3bd626 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0xeffdb2 = await y(async () => {
                const _0x38d7a8 = _0x3bd626,
                    _0x15a609 = await this["getCurDevi" + 'ce'](),
                    _0xfff042 = await this["deviceManager"]["sendComman" + 'd'](_0x15a609['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40 + _0xc16848["layer"],
                        'isVIA': !0x1
                    }, {
                        'T': 0x8,
                        'M': 0xff,
                        'param': _0xc16848
                    });
                await new Promise(_0x344b2c => setTimeout(_0x344b2c, 0x2));
                const _0x1ddee2 = await this["deviceManager"]["sendComman" + 'd'](_0x15a609['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1967d7, _0x92baad) => {}
            });
            return;
        } catch (_0x47dbac) {
            throw console["error"]("设置SOCD高级键失" + '败:', _0x47dbac), _0x47dbac;
        }
    }
    async ["setHigherKeyMT"](_0xe02a3) {
        const _0x19f382 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0xdf9418 = await y(async () => {
                const _0x5954fe = _0x19f382,
                    _0x2e7ffc = await this["getCurDevi" + 'ce'](),
                    _0x2d16ef = await this["deviceManager"]["sendComman" + 'd'](_0x2e7ffc['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'layer': _0xe02a3["layer"],
                        'row': _0xe02a3["row"],
                        'col': _0xe02a3["col"],
                        'keycode': 0x5700 + _0xe02a3["index"]
                    });
                await new Promise(_0x472b05 => setTimeout(_0x472b05, 0x2));
                const _0x12937c = await this["deviceManager"]["sendComman" + 'd'](_0x2e7ffc['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0xfe,
                    'mode': 0xd,
                    'isVIA': !0x1
                }, _0xe02a3);
                await new Promise(_0x265c11 => setTimeout(_0x265c11, 0x2));
                const _0x46e9d5 = await this["deviceManager"]["sendComman" + 'd'](_0x2e7ffc['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2811ac, _0x277aaf) => {}
            });
            return;
        } catch (_0xfdb2a1) {
            throw console["error"]("设置MT高级键失败:", _0xfdb2a1), _0xfdb2a1;
        }
    }
    async ["setHigherKeyMTPara"](_0x3812c0) {
        const _0x4c3725 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x4d9977 = await y(async () => {
                const _0x4c0649 = _0x4c3725,
                    _0x565faa = await this["getCurDevi" + 'ce'](),
                    _0x446e6a = await this["deviceManager"]["sendComman" + 'd'](_0x565faa['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0xfe,
                        'mode': 0xd,
                        'isVIA': !0x1
                    }, _0x3812c0);
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1796f9, _0x3c3497) => {}
            });
            return;
        } catch (_0x198bef) {
            throw console["error"]("设置MT高级键参数失" + '败:', _0x198bef), _0x198bef;
        }
    }
    async ["bindHigherKeyMT"](_0x318ccc) {
        const _0x24cd8d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x12fa27 = await y(async () => {
                const _0x19730c = _0x24cd8d,
                    _0x4a55a5 = await this["getCurDevi" + 'ce'](),
                    _0x413880 = await this["deviceManager"]["sendComman" + 'd'](_0x4a55a5['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'layer': _0x318ccc["layer"],
                        'row': _0x318ccc["row"],
                        'col': _0x318ccc["col"],
                        'keycode': 0x5700 + _0x318ccc["index"]
                    });
                await new Promise(_0xe569a1 => setTimeout(_0xe569a1, 0x2));
                const _0x361d70 = await this["deviceManager"]["sendComman" + 'd'](_0x4a55a5['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x4d4251, _0x1b9bde) => {}
            });
            return;
        } catch (_0x131e72) {
            throw console["error"]("绑定MT高级键失败:", _0x131e72), _0x131e72;
        }
    }
    async ["getHigherKeyMTPara"](_0x57e88e) {
        const _0x2444f5 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x380d4f = _0x2444f5,
                    _0x129e5c = await this["getCurDevi" + 'ce'](),
                    _0x2118c2 = (await this["deviceManager"]["sendComman" + 'd'](_0x129e5c['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_VIAL_PREFIX"],
                        'mode': N["CMD_VIAL_ADVANCED_KE" + 'Y'],
                        'isVIA': !0x0
                    }, {
                        'index': _0x57e88e["index"]
                    }))["data"]["key"]["split"](',');
                return {
                    'index': _0x2118c2[0x0],
                    'tapKeyCode': _0x2118c2[0x1],
                    'moKeyCode': _0x2118c2[0x2],
                    'delayTime': _0x2118c2[0x3]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x26a2c5, _0x2c4f0e) => {}
            });
        } catch (_0x32010e) {
            throw console["error"]("读取MT高级键失败:", _0x32010e), _0x32010e;
        }
    }
    async ["setHigherKeyTGL"](_0x283b18) {
        const _0x4cc00d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x2ce6f1 = await y(async () => {
                const _0x56f896 = _0x4cc00d,
                    _0x4125d9 = await this["getCurDevi" + 'ce'](),
                    _0x4fa6db = await this["deviceManager"]["sendComman" + 'd'](_0x4125d9['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'layer': _0x283b18["layer"],
                        'row': _0x283b18["row"],
                        'col': _0x283b18["col"],
                        'keycode': 0x5740 + _0x283b18["index"]
                    });
                await new Promise(_0x4f6769 => setTimeout(_0x4f6769, 0x2));
                const _0x38e89c = await this["deviceManager"]["sendComman" + 'd'](_0x4125d9['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0xfe,
                    'mode': 0xe,
                    'isVIA': !0x1
                }, _0x283b18);
                await new Promise(_0xd56a73 => setTimeout(_0xd56a73, 0x2));
                const _0x223df1 = await this["deviceManager"]["sendComman" + 'd'](_0x4125d9['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x2af949, _0x12112c) => {}
            });
            return;
        } catch (_0x1f3222) {
            throw console["error"]("设置MT高级键失败:", _0x1f3222), _0x1f3222;
        }
    }
    async ["setHigherKeyTGLPara"](_0x535972) {
        const _0x4396ab = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x243513 = await y(async () => {
                const _0x2bbaf4 = _0x4396ab,
                    _0x5254d3 = await this["getCurDevi" + 'ce'](),
                    _0x54da3d = await this["deviceManager"]["sendComman" + 'd'](_0x5254d3['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0xfe,
                        'mode': 0xe,
                        'isVIA': !0x1
                    }, _0x535972);
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x23d030, _0x5e399e) => {}
            });
            return;
        } catch (_0x5f0e86) {
            throw console["error"]("设置MT高级键参数失" + '败:', _0x5f0e86), _0x5f0e86;
        }
    }
    async ["bindHigherKeyTGL"](_0x4e2a3e) {
        const _0xb02d56 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x5d1ca7 = await y(async () => {
                const _0x59c8f0 = _0xb02d56,
                    _0x4d68e2 = await this["getCurDevi" + 'ce'](),
                    _0x148ec5 = await this["deviceManager"]["sendComman" + 'd'](_0x4d68e2['id'], {
                        'type': "writeKeyboardData",
                        'cmd': c["CMD_VIA_SET_KEYCODE"],
                        'mode': 0x0,
                        'isVIA': !0x0
                    }, {
                        'layer': _0x4e2a3e["layer"],
                        'row': _0x4e2a3e["row"],
                        'col': _0x4e2a3e["col"],
                        'keycode': 0x5740 + _0x4e2a3e["index"]
                    });
                await new Promise(_0x1aeca4 => setTimeout(_0x1aeca4, 0x2));
                const _0x488981 = await this["deviceManager"]["sendComman" + 'd'](_0x4d68e2['id'], {
                    'type': "writeKeyboardData",
                    'cmd': 0x15,
                    'mode': 0x1,
                    'isVIA': !0x1
                });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1005fc, _0x3f265d) => {}
            });
            return;
        } catch (_0x46789d) {
            throw console["error"]("绑定MT高级键失败:", _0x46789d), _0x46789d;
        }
    }
    async ["getHigherKeyTGLPara"](_0x3deff4) {
        const _0x185dd3 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x370d57 = _0x185dd3,
                    _0x411e4d = await this["getCurDevi" + 'ce'](),
                    _0x43f111 = (await this["deviceManager"]["sendComman" + 'd'](_0x411e4d['id'], {
                        'type': "readKeyboardData",
                        'cmd': c["CMD_VIA_VIAL_PREFIX"],
                        'mode': N["CMD_VIAL_ADVANCED_KE" + 'Y'],
                        'isVIA': !0x0
                    }, {
                        'index': 0x40 + _0x3deff4["index"]
                    }))["data"]["key"]["split"](',');
                return {
                    'index': _0x43f111[0x0],
                    'tglKeyCode': _0x43f111[0x1],
                    'pressTime': _0x43f111[0x2]
                };
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x15d762, _0xdc1efe) => {}
            });
        } catch (_0x33f7cd) {
            throw console["error"]("读取TGL高级键失败" + ':', _0x33f7cd), _0x33f7cd;
        }
    }
    async ["setZeroPointCalibration"](_0xc9be42) {
        const _0x35e010 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x52c326 = await y(async () => {
                const _0x4c94fa = _0x35e010,
                    _0x291dc6 = await this["getCurDevi" + 'ce'](),
                    _0x1d8710 = await this["deviceManager"]["sendComman" + 'd'](_0x291dc6['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40,
                        'isVIA': !0x1
                    }, {
                        'T': 0x0,
                        'M': 0x0,
                        'param': {
                            'row': 0x1,
                            'col': 0xff,
                            'caliEnable': _0xc9be42["caliEnable"],
                            'time': _0xc9be42["time"]
                        }
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1ab49a, _0xa91ee7) => {}
            });
            return;
        } catch (_0x17c26a) {
            throw console["error"]("零漂（零点）校准配置失败:", _0x17c26a), _0x17c26a;
        }
    }
    async ["setSingleKeyCalibration"](_0xf6ddec) {
        const _0xda137d = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x247296 = await y(async () => {
                const _0x68cf65 = _0xda137d,
                    _0x2fef3b = await this["getCurDevi" + 'ce'](),
                    _0xf4d047 = await this["deviceManager"]["sendComman" + 'd'](_0x2fef3b['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40,
                        'isVIA': !0x1
                    }, {
                        'T': 0x0,
                        'M': 0x0,
                        'param': {
                            'row': 0x2,
                            'col': 0xff,
                            'caliEnable': _0xf6ddec["caliEnable"],
                            'time': _0xf6ddec["time"]
                        }
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x55657d, _0xff91c3) => {}
            });
            return;
        } catch (_0x2fccb2) {
            throw console["error"]("局（单键）校准配置失" + '败:', _0x2fccb2), _0x2fccb2;
        }
    }
    async ["getRealTimeStatus"](_0x2f9627) {
        const _0x5b2dbd = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x383a3a = _0x5b2dbd,
                    _0x1caeb7 = await this["getCurDevi" + 'ce']();
                return (await this["deviceManager"]["sendComman" + 'd'](_0x1caeb7['id'], {
                    'type': "readKeyboardData",
                    'cmd': 0x1d,
                    'mode': 0x0,
                    'isVIA': !0x1
                }, {
                    'T': 0x1,
                    'M': _0x2f9627["dataType"],
                    'row': _0x2f9627["row"],
                    'col': _0x2f9627["col"]
                }))["data"]["key"]["split"](',');
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x88e27c, _0x12ca50) => {}
            });
        } catch (_0x3cfbeb) {
            throw console["error"]("读取实时状态失败:", _0x3cfbeb), _0x3cfbeb;
        }
    }
    async ["getKeyCalibrationConfig"](_0x1772af) {
        const _0x2e087f = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            return await y(async () => {
                const _0x31b05b = _0x2e087f,
                    _0x1a4d6a = await this["getCurDevi" + 'ce']();
                return (await this["deviceManager"]["sendComman" + 'd'](_0x1a4d6a['id'], {
                    'type': "readKeyboardData",
                    'cmd': 0x1d,
                    'mode': 0x0,
                    'isVIA': !0x1
                }, {
                    'T': 0x2,
                    'M': _0x1772af["dataType"],
                    'row': _0x1772af["row"],
                    'col': _0x1772af["col"]
                }))["data"]["key"]["split"](',');
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x29e936, _0x1c9cd1) => {}
            });
        } catch (_0x638524) {
            throw console["error"]("读取按键校准配置失败" + ':', _0x638524), _0x638524;
        }
    }
    async ["setKeyCalibrationConfig"](_0x22e7a7) {
        const _0x3885b6 = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x44e979 = await y(async () => {
                const _0x537897 = _0x3885b6,
                    _0x469429 = await this["getCurDevi" + 'ce'](),
                    _0x55c8ce = await this["deviceManager"]["sendComman" + 'd'](_0x469429['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40,
                        'isVIA': !0x1
                    }, {
                        'T': 0x2,
                        'M': _0x22e7a7["dataType"],
                        'param': _0x22e7a7
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x1320ae, _0x1bb8a2) => {}
            });
            return;
        } catch (_0x4c49a2) {
            throw console["error"]("设置单个按键校准配置失败:", _0x4c49a2), _0x4c49a2;
        }
    }
    async ["setAllKeyCalibrationConfig"](_0x375b19) {
        const _0x3eeef = _0x47670a;
        if (!this["isStarted"]) throw new Error("SDK is not started. Please call start() first.");
        try {
            const _0x58c447 = await y(async () => {
                const _0xb91a4a = _0x3eeef,
                    _0x4f8642 = await this["getCurDevi" + 'ce'](),
                    _0x55da49 = await this["deviceManager"]["sendComman" + 'd'](_0x4f8642['id'], {
                        'type': "writeKeyboardData",
                        'cmd': 0x1d,
                        'mode': 0x40,
                        'isVIA': !0x1
                    }, {
                        'T': 0x2,
                        'M': 0xff,
                        'param': {
                            'row': 0xff,
                            'col': 0xff,
                            'dataValue': _0x375b19["dataValue"]
                        }
                    });
            }, {
                'maxRetries': 0x2,
                'delay': 0x3e8,
                'exponential': !0x0,
                'onRetry': (_0x25e7a9, _0x456f5e) => {}
            });
            return;
        } catch (_0x28f1a9) {
            throw console["error"]("设置全部按键校准配置失败:", _0x28f1a9), _0x28f1a9;
        }
    }
    async ["getKeyboardDefinitio" + 'n'](_0x2fa27d, _0x1ba7d2) {
        const _0x130b40 = _0x47670a;
        try {
            const _0x374973 = ie(_0x2fa27d, _0x1ba7d2);
            if (!_0x374973) throw new Error("未找到匹配的键盘布局定义：vendorI" + 'd=' + _0x2fa27d + (", productI" + 'd=') + _0x1ba7d2);
            return _0x374973["json"];
        } catch (_0x23a19d) {
            throw console["error"]("获取固化键盘布局定义失败:", _0x23a19d), _0x23a19d;
        }
    }
    async ["getKeyboardDefinitionList"]() {
        return oe();
    }
}
const K = _0xcac700 => {
        const _0x45b48f = _0x47670a;
        if (typeof _0xcac700 == "number") return _0xcac700;
        const _0x1d4879 = String(_0xcac700 ?? '')["trim"]()["toLowerCas" + 'e']();
        return _0x1d4879 ? _0x1d4879["startsWith"]('0x') ? parseInt(_0x1d4879["slice"](0x2), 0x10) : /^[0-9]+$/ ["test"](_0x1d4879) ? parseInt(_0x1d4879, 0xa) : parseInt(_0x1d4879, 0x10) : NaN;
    },
    V = new Map();
class ye {
    constructor(_0x526c91) {
        const _0x2208fb = _0x47670a;
        f(this, "store"), f(this, "ServiceDevice"), f(this, "deviceRout" + 'e'), f(this, "keyboardMa" + 'p'), f(this, "sdkModuleName"), f(this, "layout"), f(this, "layoutMap", []), f(this, "matrixRows", 0x0), f(this, "matrixCols", 0x0), f(this, "batteryTim" + 'er', null), f(this, "batteryStartTimer", null), f(this, "initPendin" + 'g', !0x1), (this["store"] = _0x526c91, this["ServiceDevice"] = null, this["keyboardMa" + 'p'] = Y, this["deviceRout" + 'e'] = ["lightSet", "ybScreenSe" + 't', "keySet", "highSet", "perfSet", "versionSet"], this["sdkModuleName"] = 'yb', this["layout"] = _0x52e316);
    }
    async ["initModule"]() {
        const _0x1f01c8 = _0x47670a,
            _0x56d432 = this["store"]["deviceInfo"];
        this["ServiceDevice"] = _0x3156af(new se({
            'configs': [{
                'vendorId': _0x56d432 == null ? void 0x0 : _0x56d432["vId"],
                'productId': _0x56d432 == null ? void 0x0 : _0x56d432["pId"],
                'usagePage': _0x56d432 == null ? void 0x0 : _0x56d432["usagePage"],
                'usage': _0x56d432 == null ? void 0x0 : _0x56d432["usage"]
            }],
            'usagePage': _0x56d432 == null ? void 0x0 : _0x56d432["usagePage"],
            'usage': _0x56d432 == null ? void 0x0 : _0x56d432["usage"]
        })), await this["ServiceDevice"]["start"](), this["store"]["sdkModuleName"] = this["sdkModuleName"];
    }
    async ["getDevices"]() {
        const _0x2012d7 = _0x47670a;
        return await this["ServiceDevice"]["getDevices"]();
    }
    async ["getDefinitionLayout"]() {
        const _0x4acdd6 = _0x47670a;
        var _0x25528b, _0x521f66, _0x489c98;
        const _0x3e6c18 = K((_0x25528b = this["store"]["deviceInfo"]) == null ? void 0x0 : _0x25528b["vId"]),
            _0x5e79f7 = K((_0x521f66 = this["store"]["deviceInfo"]) == null ? void 0x0 : _0x521f66["pId"]);
        if (!Number["isFinite"](_0x3e6c18) || !Number["isFinite"](_0x5e79f7)) return null;
        if (typeof((_0x489c98 = this["ServiceDevice"]) == null ? void 0x0 : _0x489c98["getKeyboardDefinitionList"]) != "function") return console["error"]("[yb] 当前 SDK 不支持 getKeyboardDefinitionList，无法获取布局定义"), null;
        const _0x554e20 = _0x3e6c18 + '-' + _0x5e79f7;
        if (V["has"](_0x554e20)) return V["get"](_0x554e20);
        const _0x101ffb = await this["ServiceDevice"]["getKeyboardDefinitionList"]() || [];
        for (const _0x2db2a8 of _0x101ffb) try {
            const _0x5cf6e7 = JSON["parse"]((_0x2db2a8 == null ? void 0x0 : _0x2db2a8["json"]) ?? '');
            if (K(_0x5cf6e7 == null ? void 0x0 : _0x5cf6e7["vendorId"]) === _0x3e6c18 && K(_0x5cf6e7 == null ? void 0x0 : _0x5cf6e7["productId"]) === _0x5e79f7) return V["set"](_0x554e20, _0x5cf6e7), _0x5cf6e7;
        } catch {}
        return console["error"]("[yb] 固化布局定义中未匹配到该型号：vendorId=" + _0x3e6c18 + (", productI" + 'd=') + _0x5e79f7), null;
    }
    async ["initDeviceLayout"](_0xf615c7 = 0x0) {
        const _0x38bfb1 = _0x47670a;
        var _0x32be05, _0x84a1f8, _0x202b2f;
        try {
            const _0x36a063 = await this["getDefinitionLayout"](),
                _0x541c55 = (_0x32be05 = _0x36a063 == null ? void 0x0 : _0x36a063["layouts"]) == null ? void 0x0 : _0x32be05["keymap"];
            this["matrixRows"] = Number((_0x84a1f8 = _0x36a063 == null ? void 0x0 : _0x36a063["matrix"]) == null ? void 0x0 : _0x84a1f8["rows"]) || 0x0, this["matrixCols"] = Number((_0x202b2f = _0x36a063 == null ? void 0x0 : _0x36a063["matrix"]) == null ? void 0x0 : _0x202b2f["cols"]) || 0x0, this["layoutMap"] = [], _0x541c55 != null && _0x541c55["length"] && (_0x541c55["forEach"](_0x1b9fca => {
                const _0x50e85b = _0x38bfb1;
                if (!Array["isArray"](_0x1b9fca)) return;
                const _0x4b3b81 = _0x1b9fca["filter"](_0x306930 => typeof _0x306930 == "string" && /^\d+,\d+$/ ["test"](_0x306930))["map"](_0x917a9c => _0x917a9c["split"](','));
                this["layoutMap"]["push"](_0x4b3b81);
            }), await this["initFnLayo" + 'ut'](), await this["getAllHighList"]());
        } finally {
            this["initPendin" + 'g'] = !0x1;
        }
    }
    async ["initFnLayo" + 'ut'](_0x1a218c = 0x0) {
        const _0x2d361d = _0x47670a;
        var _0x4dc1cb, _0x952521, _0x4f34ce;
        const _0x3d9029 = _0x42e134(this["layout"]),
            _0x128ff1 = this["layoutMap"] || [],
            _0x21553a = _0x128ff1["reduce"]((_0x5797e0, _0x2d7b28) => {
                const _0xfbefbf = _0x2d361d;
                for (const _0x155ec2 of _0x2d7b28 || []) {
                    const _0x446256 = Number(_0x155ec2 == null ? void 0x0 : _0x155ec2[0x0]);
                    Number["isFinite"](_0x446256) && (_0x5797e0 = Math["max"](_0x5797e0, _0x446256 + 0x1));
                }
                return _0x5797e0;
            }, _0x128ff1["length"]),
            _0x4a89bb = _0x128ff1["reduce"]((_0x17454b, _0x68a1ac) => {
                const _0x3970df = _0x2d361d;
                for (const _0x5380c3 of _0x68a1ac || []) {
                    const _0x53a0c2 = Number(_0x5380c3 == null ? void 0x0 : _0x5380c3[0x1]);
                    Number["isFinite"](_0x53a0c2) && (_0x17454b = Math["max"](_0x17454b, _0x53a0c2 + 0x1));
                }
                return _0x17454b;
            }, 0x1),
            _0x18ac7d = Math["max"](_0x21553a, this["matrixRows"]),
            _0x3d47d4 = Math["max"](_0x4a89bb, this["matrixCols"], 0x1),
            _0x1bd36b = await ((_0x4dc1cb = this["ServiceDevice"]) == null ? void 0x0 : _0x4dc1cb["getKeymapBuffer"]({
                'layer': _0x1a218c,
                'rows': _0x18ac7d,
                'cols': _0x3d47d4
            })) || new Uint8Array(0x0),
            _0x15ab94 = (_0x32d856, _0x3d8c9e) => {
                const _0x30a4cf = (_0x32d856 * _0x3d47d4 + _0x3d8c9e) * 0x2;
                return (_0x1bd36b[_0x30a4cf] ?? 0x0) << 0x8 | (_0x1bd36b[_0x30a4cf + 0x1] ?? 0x0);
            };
        for (let _0x4f52a9 = 0x0; _0x4f52a9 < (_0x3d9029 == null ? void 0x0 : _0x3d9029["length"]); _0x4f52a9++) {
            const {
                row: _0x4c84f6,
                col: _0x13fae0
            } = _0x3d9029[_0x4f52a9], _0x120647 = (_0x952521 = _0x128ff1 == null ? void 0x0 : _0x128ff1[_0x4c84f6]) == null ? void 0x0 : _0x952521[_0x13fae0];
            if (!_0x120647) continue;
            _0x3d9029[_0x4f52a9]["row"] = Number(_0x120647[0x0]), _0x3d9029[_0x4f52a9]["col"] = Number(_0x120647[0x1]);
            const _0x11e2ca = _0x15ab94(_0x3d9029[_0x4f52a9]["row"], _0x3d9029[_0x4f52a9]["col"]);
            let _0x266e67 = this["keyboardMa" + 'p'][Number((_0x4f34ce = _0x3d9029[_0x4f52a9]) == null ? void 0x0 : _0x4f34ce["keyValue"])],
                _0x2c3c1a = this["keyboardMa" + 'p'][_0x11e2ca];
            _0x3d9029[_0x4f52a9]["fnValue"] = _0x11e2ca, _0x3d9029[_0x4f52a9]["name"] = _0x2c3c1a ? _0x2c3c1a == null ? void 0x0 : _0x2c3c1a["defaultKey"] : _0x266e67 == null ? void 0x0 : _0x266e67["defaultKey"], _0x2c3c1a && (_0x2c3c1a != null && _0x2c3c1a["icon"]) && (_0x3d9029[_0x4f52a9]["icon"] = _0x2c3c1a == null ? void 0x0 : _0x2c3c1a["icon"]), _0x11e2ca >= 0x5700 && _0x11e2ca <= 0x573f ? _0x3d9029[_0x4f52a9]["highMode"] = 'MT' : _0x11e2ca >= 0x5740 && _0x11e2ca <= 0x577f ? _0x3d9029[_0x4f52a9]["highMode"] = "TGL" : _0x11e2ca >= 0x7700 && _0x11e2ca <= 0x770f && (_0x3d9029[_0x4f52a9]["highMode"] = "MACRO"), _0x3d9029[_0x4f52a9]["browserCod" + 'e'] = _0x266e67 == null ? void 0x0 : _0x266e67["browserCod" + 'e'], _0x3d9029[_0x4f52a9]["browserVal" + 'ue'] = _0x266e67 == null ? void 0x0 : _0x266e67["browserVal" + 'ue'];
        }
        this["store"]["deviceLayo" + 'ut'] = _0x42e134(_0x3d9029);
    }
    async ["getAllHighList"]() {
        const _0xea4e09 = _0x47670a,
            _0x241bfb = [],
            _0x2e960b = _0x42e134(this["store"]["getProductAdvanceLis" + 't'] || []);
        for (const _0x1c6991 of this["store"]["deviceLayo" + 'ut']) {
            const _0x50241e = Number(_0x1c6991["fnValue"]);
            let _0x2a4af1 = null,
                _0x3a6975 = -0x1;
            if (_0x50241e >= 0x5700 && _0x50241e <= 0x573f ? (_0x2a4af1 = 'MT', _0x3a6975 = _0x50241e - 0x5700) : _0x50241e >= 0x5740 && _0x50241e <= 0x577f && (_0x2a4af1 = "TGL", _0x3a6975 = _0x50241e - 0x5740), !_0x2a4af1 || _0x3a6975 < 0x0) continue;
            const _0xf5a889 = _0x2e960b["find"](_0x2e6167 => {
                const _0x444d2e = _0xea4e09;
                var _0x14f9ce;
                return _0x2e6167["icon"] === _0x2a4af1 && Number((_0x14f9ce = _0x2e6167["anyAlias"]) == null ? void 0x0 : _0x14f9ce["index"]) === _0x3a6975;
            });
            _0xf5a889 ? _0x241bfb["push"]({
                ..._0xf5a889,
                'deviceKey': [_0x1c6991["keyValue"]]
            }) : _0x241bfb["push"]({
                'deviceKey': [_0x1c6991["keyValue"]],
                'browserCode': _0x2a4af1 === 'MT' ? ['', ''] : [''],
                'sliderValue': 0xc8,
                'icon': _0x2a4af1,
                'anyAlias': {
                    'index': _0x3a6975
                }
            });
        }
        return this["store"]["setProductAdvanceLis" + 't'](_0x42e134(_0x241bfb)), _0x241bfb;
    }
    async ["initDevice"](_0xe3b4d6) {
        const _0xadffed = _0x47670a;
        var _0x922ced;
        return _0x3c7f3a(_0xe3b4d6 == null ? void 0x0 : _0xe3b4d6['id']) && await ((_0x922ced = this["ServiceDevice"]) == null ? void 0x0 : _0x922ced["init"](_0xe3b4d6 == null ? void 0x0 : _0xe3b4d6['id'])) ? _0xe3b4d6 : null;
    }
    async ["getBaseInf" + 'o'](_0x4f5050) {
        const _0x17e26d = _0x47670a;
        var _0x387ad0, _0x4eedc4, _0x1d4c51, _0x43d8fa;
        this["initPendin" + 'g'] = !0x0;
        try {
            const _0x4206cd = await this["ServiceDevice"]["getDevicesInfo"]();
            _0x4206cd && (this["store"]["deviceInfo"]["binVersion"] = ((_0x4eedc4 = (_0x387ad0 = _0x4206cd == null ? void 0x0 : _0x4206cd["hardware_v" + 'er']) == null ? void 0x0 : _0x387ad0["match"](/V\d+(?:\.\d+)*/i)) == null ? void 0x0 : _0x4eedc4[0x0]) ?? '', this["store"]["deviceInfo"]["deviceId"] = _0x4206cd == null ? void 0x0 : _0x4206cd["deviceId"]), (_0x1d4c51 = this["store"]["deviceInfo"]) != null && _0x1d4c51["wireless"] && (this["deviceRout" + 'e'] = ["lightSet", "keySet", "highSet", "perfSet", "versionSet"]);
            const _0x27c843 = await ((_0x43d8fa = this["ServiceDevice"]) == null ? void 0x0 : _0x43d8fa["getKeybordPara"](0x5));
            this["store"]["deviceInfo"]["FnMode"] = _0x27c843 ? "Mac" : "Win";
        } catch (_0x57fb1e) {
            console["error"]("[yb] 读取设备信息失败，跳过，不影响页面显示", _0x57fb1e);
        }
    } ["getKeyValueByBrowserCode"](_0x4f6e03) {
        const _0x35ee13 = _0x47670a;
        var _0x1314cf;
        let _0x3e8da1 = 0x0;
        for (const _0x28a14b in this["keyboardMa" + 'p'])
            if (((_0x1314cf = this["keyboardMa" + 'p'][_0x28a14b]) == null ? void 0x0 : _0x1314cf["browserCod" + 'e']) === _0x4f6e03) {
                _0x3e8da1 = Number(_0x28a14b);
                break;
            } return _0x3e8da1;
    }
    async ["getProfileList"]() {
        const _0xd5e817 = _0x47670a,
            _0x1fa3dc = [{
                'value': 0x0,
                'label': _0x3304c6["global"]['t']("profileConfig.config" + '1')
            }];
        return this["store"]["profileInd" + 'ex'] = 0x0, _0x1fa3dc;
    }
    async ["readBatter" + 'y']() {
        const _0x517a46 = _0x47670a;
        var _0x527121;
        try {
            if (this["initPendin" + 'g']) return null;
            const _0x2129f0 = await ((_0x527121 = this["ServiceDevice"]) == null ? void 0x0 : _0x527121["getBatteryInformatio" + 'n']()),
                _0x5161e5 = Number(_0x2129f0 == null ? void 0x0 : _0x2129f0["electricit" + 'y']);
            if (!_0x3c7f3a(_0x2129f0 == null ? void 0x0 : _0x2129f0["electricit" + 'y']) || Number["isNaN"](_0x5161e5)) return null;
            const _0x28e424 = [0x1, 0x2]["includes"](Number(_0x2129f0 == null ? void 0x0 : _0x2129f0["charging_status"]));
            return this["store"]["deviceInfo"]["battery"] = _0x5161e5, this["store"]["deviceInfo"]["isCharging"] = _0x28e424, {
                'battery': _0x5161e5,
                'isCharging': _0x28e424
            };
        } catch {
            return null;
        }
    }
    async ["pollBatter" + 'y'](_0xff872b = 0xea60) {
        const _0x35e11c = _0x47670a;
        this["stopPollBattery"]();
        const _0x456eba = async () => {
            const _0x458afb = _0x35e11c;
            await this["readBatter" + 'y']();
        };
        _0x456eba(), this["batteryTim" + 'er'] = setInterval(_0x456eba, _0xff872b);
    } ["stopPollBattery"]() {
        const _0x517601 = _0x47670a;
        this["batteryTim" + 'er'] !== null && (clearInterval(this["batteryTim" + 'er']), this["batteryTim" + 'er'] = null), this["batteryStartTimer"] !== null && (clearTimeout(this["batteryStartTimer"]), this["batteryStartTimer"] = null);
    }
    async ["resetClass"]() {
        const _0x5b1992 = _0x47670a;
        this["initPendin" + 'g'] = !0x1, this["stopPollBattery"]();
    }
}
export {
    ye as
    default
};