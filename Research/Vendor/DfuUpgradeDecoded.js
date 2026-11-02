const _0x105040 = _0x56a8; /* string alignment removed */
var T = Object["defineProperty"],
    A = (_0x41205f, _0x22c716, _0x587193) => _0x22c716 in _0x41205f ? T(_0x41205f, _0x22c716, {
        'enumerable': !0x0,
        'configurable': !0x0,
        'writable': !0x0,
        'value': _0x587193
    }) : _0x41205f[_0x22c716] = _0x587193,
    h = (_0x2ea4cd, _0x2bcc43, _0x1eb6ee) => A(_0x2ea4cd, typeof _0x2bcc43 != "symbol" ? _0x2bcc43 + '' : _0x2bcc43, _0x1eb6ee);
import {
    i as _0x44198d
} from './index-CeAyNk8A.js';
class b {
    constructor(_0x6cd6dd, _0x5b4aac) {
        const _0x25e47e = _0x105040;
        h(this, "device_"), h(this, "settings"), h(this, "intfNumber"), h(this, "disconnect" + 'ed', !0x1), h(this, "properties"), h(this, "dnload", this["download"]), h(this, "clrStatus", this["clearStatu" + 's']), (this["device_"] = _0x6cd6dd, this["settings"] = _0x5b4aac, this["intfNumber"] = _0x5b4aac["interface"]["interfaceNumber"]);
    } ["logDebug"](_0x1bb797) {} ["logInfo"](_0x54b1a8) {
        const _0x19ea41 = _0x105040;
        console["log"](_0x54b1a8);
    } ["logWarning"](_0xf17d64) {
        const _0x476455 = _0x105040;
        console["warn"](_0xf17d64);
    } ["logError"](_0x4e45c2) {
        const _0x58a090 = _0x105040;
        console["error"](_0x4e45c2);
    } ["logProgres" + 's'](_0x2b1361, _0x25733b) {}
    async ["open"]() {
        const _0x27f176 = _0x105040;
        await this["device_"]["open"]();
        const _0x3f0595 = this["settings"]["configuration"]["configurationValue"];
        (!this["device_"]["configuration"] || this["device_"]["configuration"]["configurationValue"] !== _0x3f0595) && await this["device_"]["selectConfiguration"](_0x3f0595);
        const _0x41d212 = this["settings"]["interface"]["interfaceNumber"];
        this["device_"]["configuration"] && this["device_"]["configuration"]["interfaces"][_0x41d212] && !this["device_"]["configuration"]["interfaces"][_0x41d212]["claimed"] && await this["device_"]["claimInterface"](_0x41d212);
        const _0x410f47 = this["settings"]["alternate"]["alternateSetting"];
        if (this["device_"]["configuration"]) {
            const _0x2bf67a = this["device_"]["configuration"]["interfaces"][_0x41d212];
            if (_0x2bf67a && (!_0x2bf67a["alternate"] || _0x2bf67a["alternate"]["alternateSetting"] !== _0x410f47 || _0x2bf67a["alternates"]["length"] > 0x1)) try {
                await this["device_"]["selectAlternateInterface"](_0x41d212, _0x410f47);
            } catch (_0x3ccf46) {
                if (_0x2bf67a["alternate"] && _0x2bf67a["alternate"]["alternateSetting"] === _0x410f47 && _0x3ccf46["toString"]()["includes"]("Unable to set device interface" + '.')) this["logWarning"]("Redundant SET_INTERFACE request to select altSetting " + _0x410f47 + " failed");
                else throw _0x3ccf46;
            }
        }
    }
    async ["close"]() {
        const _0x126a0f = _0x105040;
        try {
            await this["device_"]["close"]();
        } catch (_0x2ef56f) {
            console["log"](_0x2ef56f);
        }
    } ["readDeviceDescriptor"]() {
        const _0x2cdb61 = _0x105040;
        return this["device_"]["controlTransferIn"]({
            'requestType': "standard",
            'recipient': "device",
            'request': 0x6,
            'value': 0x100,
            'index': 0x0
        }, 0x12)["then"](_0x24c195 => _0x24c195["status"] === 'ok' && _0x24c195["data"] ? Promise["resolve"](_0x24c195["data"]) : Promise["reject"](_0x24c195["status"]));
    }
    async ["readStringDescriptor"](_0x4b422d, _0x4ed3b8 = 0x0) {
        const _0x5e2d5d = _0x105040,
            _0x52c3a8 = {
                'requestType': "standard",
                'recipient': "device",
                'request': 0x6,
                'value': 0x300 | _0x4b422d,
                'index': _0x4ed3b8
            };
        let _0x5ac08a = await this["device_"]["controlTransferIn"](_0x52c3a8, 0x1);
        if (_0x5ac08a["status"] === 'ok' && _0x5ac08a["data"]) {
            const _0x41ac2b = _0x5ac08a["data"]["getUint8"](0x0);
            if (_0x5ac08a = await this["device_"]["controlTransferIn"](_0x52c3a8, _0x41ac2b), _0x5ac08a["status"] === 'ok' && _0x5ac08a["data"]) {
                const _0x318ec5 = (_0x41ac2b - 0x2) / 0x2,
                    _0x162e6c = [];
                for (let _0x1ee6ac = 0x0; _0x1ee6ac < _0x318ec5; _0x1ee6ac++) _0x162e6c["push"](_0x5ac08a["data"]["getUint16"](0x2 + _0x1ee6ac * 0x2, !0x0));
                return _0x4ed3b8 === 0x0 ? _0x162e6c : String["fromCharCo" + 'de']["apply"](String, _0x162e6c);
            }
        }
        throw new Error("Failed to read string descriptor " + _0x4b422d + ':\x20' + _0x5ac08a["status"]);
    }
    async ["readInterfaceNames"]() {
        const _0x3736bf = _0x105040,
            _0x53a930 = {},
            _0x292763 = new Set();
        for (let _0x4ff783 = 0x0; _0x4ff783 < this["device_"]["configurations"]["length"]; _0x4ff783++) {
            const _0x45d37f = await this["readConfigurationDescriptor"](_0x4ff783),
                _0x498182 = d["parseConfigurationDescriptor"](_0x45d37f),
                _0x1fdffd = _0x498182["bConfigurationValue"];
            _0x53a930[_0x1fdffd] = {};
            for (const _0x3bd270 of _0x498182["descriptor" + 's']) _0x3bd270["bDescriptorType"] === 0x4 && (_0x3bd270["bInterfaceNumber"] in _0x53a930[_0x1fdffd] || (_0x53a930[_0x1fdffd][_0x3bd270["bInterfaceNumber"]] = {}), _0x53a930[_0x1fdffd][_0x3bd270["bInterfaceNumber"]][_0x3bd270["bAlternateSetting"]] = _0x3bd270["iInterface"], _0x3bd270["iInterface"] > 0x0 && _0x292763["add"](_0x3bd270["iInterface"]));
        }
        const _0x5821dd = {};
        for (const _0x51dd01 of _0x292763) try {
            const _0x2a32f5 = await this["readStringDescriptor"](_0x51dd01, 0x409);
            _0x5821dd[_0x51dd01] = typeof _0x2a32f5 == "string" ? _0x2a32f5 : null;
        } catch (_0x51fb0d) {
            console["log"](_0x51fb0d), _0x5821dd[_0x51dd01] = null;
        }
        const _0x5097de = {};
        for (const _0x1f2cbf in _0x53a930) {
            _0x5097de[_0x1f2cbf] = {};
            for (const _0x4b5612 in _0x53a930[_0x1f2cbf]) {
                _0x5097de[_0x1f2cbf][_0x4b5612] = {};
                for (const _0x1091b5 in _0x53a930[_0x1f2cbf][_0x4b5612]) {
                    const _0xa749f5 = _0x53a930[_0x1f2cbf][_0x4b5612][_0x1091b5];
                    _0x5097de[_0x1f2cbf][_0x4b5612][_0x1091b5] = _0x5821dd[_0xa749f5];
                }
            }
        }
        return _0x5097de;
    } ["readConfigurationDescriptor"](_0x5115ef) {
        const _0x170811 = _0x105040,
            _0x13c7ce = 0x200 | _0x5115ef;
        return this["device_"]["controlTransferIn"]({
            'requestType': "standard",
            'recipient': "device",
            'request': 0x6,
            'value': _0x13c7ce,
            'index': 0x0
        }, 0x4)["then"](_0x377a29 => {
            const _0x3b0c18 = _0x170811;
            if (_0x377a29["status"] === 'ok' && _0x377a29["data"]) {
                const _0x495232 = _0x377a29["data"]["getUint16"](0x2, !0x0);
                return this["device_"]["controlTransferIn"]({
                    'requestType': "standard",
                    'recipient': "device",
                    'request': 0x6,
                    'value': _0x13c7ce,
                    'index': 0x0
                }, _0x495232);
            }
            return Promise["reject"](_0x377a29["status"]);
        })["then"](_0xe73255 => _0xe73255["status"] === 'ok' && _0xe73255["data"] ? Promise["resolve"](_0xe73255["data"]) : Promise["reject"](_0xe73255["status"]));
    } ["requestOut"](_0x173c89, _0xcd3796, _0x11ffea = 0x0) {
        const _0xd08470 = _0x105040;
        return this["device_"]["controlTransferOut"]({
            'requestType': "class",
            'recipient': "interface",
            'request': _0x173c89,
            'value': _0x11ffea,
            'index': this["intfNumber"]
        }, _0xcd3796)["then"](_0x37e61e => _0x37e61e["status"] === 'ok' ? Promise["resolve"](_0x37e61e["bytesWritt" + 'en']) : Promise["reject"](_0x37e61e["status"]), _0x46eaf0 => Promise["reject"](new Error("ControlTransferOut failed: " + _0x46eaf0)));
    } ["requestIn"](_0x35d6db, _0x1087ff, _0xf91ce6 = 0x0) {
        const _0x1690f3 = _0x105040;
        return this["device_"]["controlTransferIn"]({
            'requestType': "class",
            'recipient': "interface",
            'request': _0x35d6db,
            'value': _0xf91ce6,
            'index': this["intfNumber"]
        }, _0x1087ff)["then"](_0x1cec1a => _0x1cec1a["status"] === 'ok' && _0x1cec1a["data"] ? Promise["resolve"](_0x1cec1a["data"]) : Promise["reject"](_0x1cec1a["status"]), _0x5f1a5a => Promise["reject"](new Error("ControlTransferIn failed: " + _0x5f1a5a)));
    } ["detach"]() {
        const _0x427932 = _0x105040;
        return this["requestOut"](d["DETACH"], void 0x0, 0x3e8);
    } ["waitDisconnected"](_0x2e15df) {
        const _0x57f7ef = _0x105040,
            _0x128de1 = this,
            _0x4889d3 = this["device_"];
        return new Promise(function(_0x4e04b4, _0x4668ee) {
            const _0x1e85b = _0x57f7ef;
            let _0x431f3d;
            _0x2e15df > 0x0 && (_0x431f3d = setTimeout(() => {
                const _0x1b6cc7 = _0x56a8;
                navigator["usb"]["removeEventListener"]("disconnect", _0x45f914), _0x128de1["disconnect" + 'ed'] !== !0x0 && _0x4668ee(new Error("Disconnect timeout expired"));
            }, _0x2e15df));

            function _0x45f914(_0x1585b2) {
                const _0x42d232 = _0x56a8;
                _0x1585b2["device"] === _0x4889d3 && (_0x2e15df > 0x0 && _0x431f3d && clearTimeout(_0x431f3d), _0x128de1["disconnect" + 'ed'] = !0x0, navigator["usb"]["removeEventListener"]("disconnect", _0x45f914), _0x4e04b4(_0x128de1));
            }
            navigator["usb"]["addEventListener"]("disconnect", _0x45f914);
        });
    } ["download"](_0x8e0e00, _0x58fbcf) {
        const _0x3c3e29 = _0x105040;
        return this["requestOut"](d["DNLOAD"], _0x8e0e00, _0x58fbcf);
    } ["upload"](_0x3e817d, _0x24d623) {
        const _0x1972aa = _0x105040;
        return this["requestIn"](d["UPLOAD"], _0x3e817d, _0x24d623);
    } ["clearStatu" + 's']() {
        const _0x59bfe7 = _0x105040;
        return this["requestOut"](d["CLRSTATUS"]);
    } ["getStatus"]() {
        const _0x476704 = _0x105040;
        return this["requestIn"](d["GETSTATUS"], 0x6)["then"](_0x11768a => Promise["resolve"]({
            'status': _0x11768a["getUint8"](0x0),
            'pollTimeout': _0x11768a["getUint32"](0x1, !0x0) & 0xffffff,
            'state': _0x11768a["getUint8"](0x4)
        }), _0x3fe6b5 => Promise["reject"](new Error("DFU GETSTATUS failed" + ':\x20' + _0x3fe6b5)));
    } ["getState"]() {
        const _0x1e118e = _0x105040;
        return this["requestIn"](d["GETSTATE"], 0x1)["then"](_0x28934d => Promise["resolve"](_0x28934d["getUint8"](0x0)), _0x1844f3 => Promise["reject"](new Error("DFU GETSTATE failed:" + '\x20' + _0x1844f3)));
    } ["abort"]() {
        const _0x5abf7a = _0x105040;
        return this["requestOut"](d["ABORT"]);
    }
    async ["abortToIdl" + 'e']() {
        const _0x127bd7 = _0x105040;
        await this["abort"](), await this["getState"]() === d["dfuERROR"] && await this["clearStatu" + 's']();
        const _0x5c4591 = await this["getState"]();
        if (_0x5c4591 !== d["dfuIDLE"]) throw new Error("Failed to return to idle state after abort: state " + _0x5c4591);
    }
    async ["do_upload"](_0x19c260, _0x30a5f1 = 0x1 / 0x0, _0x49b869 = 0x0) {
        const _0x1eac5d = _0x105040;
        let _0x4e044a = _0x49b869;
        const _0x37cba0 = [];
        let _0x5b9283 = 0x0;
        this["logInfo"]("Copying data from DFU device to browser"), this["logProgres" + 's'](0x0);
        let _0x2c0c4a, _0x3ab78f;
        do {
            if (_0x3ab78f = Math["min"](_0x19c260, _0x30a5f1 - _0x5b9283), _0x2c0c4a = await this["upload"](_0x3ab78f, _0x4e044a++), this["logDebug"]("Read " + _0x2c0c4a["byteLength"] + " bytes"), _0x2c0c4a["byteLength"] > 0x0) {
                const _0xa7e32b = new ArrayBuffer(_0x2c0c4a["byteLength"]),
                    _0x4e3100 = new Uint8Array(_0x2c0c4a["buffer"], _0x2c0c4a["byteOffset"], _0x2c0c4a["byteLength"]);
                new Uint8Array(_0xa7e32b)["set"](_0x4e3100), _0x37cba0["push"](_0xa7e32b), _0x5b9283 += _0x2c0c4a["byteLength"];
            }
            Number["isFinite"](_0x30a5f1) ? this["logProgres" + 's'](_0x5b9283, _0x30a5f1) : this["logProgres" + 's'](_0x5b9283);
        } while (_0x5b9283 < _0x30a5f1 && _0x2c0c4a["byteLength"] === _0x3ab78f);
        return _0x5b9283 === _0x30a5f1 && await this["abortToIdl" + 'e'](), this["logInfo"]("Read " + _0x5b9283 + " bytes"), new Blob(_0x37cba0, {
            'type': "application/octet-stream"
        });
    }
    async ["poll_until"](_0x37349d) {
        const _0x3adbba = _0x105040;
        let _0x314bf3 = await this["getStatus"]();
        const _0x143b12 = _0x26836c => new Promise(_0x38a810 => {
            const _0x11277e = _0x3adbba;
            this["logDebug"]("Sleeping for " + _0x26836c + 'ms'), setTimeout(_0x38a810, _0x26836c);
        });
        for (; !_0x37349d(_0x314bf3["state"]) && _0x314bf3["state"] !== d["dfuERROR"];) await _0x143b12(_0x314bf3["pollTimeou" + 't']), _0x314bf3 = await this["getStatus"]();
        return _0x314bf3;
    } ["poll_until_idle"](_0x21cbe6) {
        const _0x5540d2 = _0x105040;
        return this["poll_until"](_0xcdbeeb => _0xcdbeeb === _0x21cbe6);
    }
    async ["do_downloa" + 'd'](_0x2ed44a, _0x2dc5be, _0x398414 = !0x1) {
        const _0x229395 = _0x105040;
        let _0x2e9fa2 = 0x0;
        const _0x229f42 = _0x2dc5be["byteLength"];
        let _0x348f3f = 0x0;
        for (this["logInfo"]("Copying data from browser to DFU device"), this["logProgres" + 's'](_0x2e9fa2, _0x229f42); _0x2e9fa2 < _0x229f42;) {
            const _0x5279a7 = _0x229f42 - _0x2e9fa2,
                _0x31f3e7 = Math["min"](_0x5279a7, _0x2ed44a);
            let _0x14f6e9, _0xb19ef0;
            try {
                _0x14f6e9 = await this["download"](new Uint8Array(_0x2dc5be, _0x2e9fa2, _0x31f3e7), _0x348f3f++), this["logDebug"]("Sent " + _0x14f6e9 + " bytes"), _0xb19ef0 = await this["poll_until_idle"](d["dfuDNLOAD_IDLE"]);
            } catch (_0x69f267) {
                throw new Error("Error during DFU download: " + _0x69f267, {
                    'cause': _0x69f267
                });
            }
            if (_0xb19ef0["status"] !== d["STATUS_OK"]) throw new Error("DFU DOWNLOAD failed state=" + _0xb19ef0["state"] + ", status=" + _0xb19ef0["status"]);
            this["logDebug"]("Wrote " + _0x14f6e9 + " bytes"), _0x2e9fa2 += _0x14f6e9, this["logProgres" + 's'](_0x2e9fa2, _0x229f42);
        }
        this["logDebug"]("Sending empty block");
        try {
            await this["download"](new ArrayBuffer(0x0), _0x348f3f++);
        } catch (_0x3307ea) {
            throw new Error("Error during final DFU download: " + _0x3307ea, {
                'cause': _0x3307ea
            });
        }
        if (this["logInfo"]("Wrote " + _0x2e9fa2 + " bytes"), this["logInfo"]("Manifesting new firmware"), _0x398414) {
            let _0x415a46;
            try {
                if (_0x415a46 = await this["poll_until"](_0x5b7def => _0x5b7def === d["dfuIDLE"] || _0x5b7def === d["dfuMANIFEST_WAIT_RES" + 'ET']), _0x415a46["state"] === d["dfuMANIFEST_WAIT_RES" + 'ET'] && this["logDebug"]("Device transitioned to MANIFEST_WAIT_RESET even though it is manifestation tolerant"), _0x415a46["status"] !== d["STATUS_OK"]) throw new Error("DFU MANIFEST failed state=" + _0x415a46["state"] + ", status=" + _0x415a46["status"]);
            } catch (_0x3f918b) {
                if (_0x3f918b["toString"]()["includes"]("ControlTransferIn failed: NotFoundError: Device unavailable.") || _0x3f918b["toString"]()["includes"]("ControlTransferIn failed: NotFoundError: The device was disconnected.")) this["logWarning"]("Unable to poll final manifestation statu" + 's');
                else throw new Error("Error during DFU manifest: " + _0x3f918b, {
                    'cause': _0x3f918b
                });
            }
        } else try {
            const _0x4b83c8 = await this["getStatus"]();
            this["logDebug"]("Final DFU status: state=" + _0x4b83c8["state"] + ", status=" + _0x4b83c8["status"]);
        } catch (_0x14540f) {
            this["logDebug"]("Manifest GET_STATUS poll error" + ':\x20' + _0x14540f);
        }
        try {
            await this["device_"]["reset"]();
        } catch (_0x1b4067) {
            if (_0x1b4067["toString"]()["includes"]("NetworkError: Unable to reset the device" + '.') || _0x1b4067["toString"]()["includes"]("NotFoundError: Device unavailable.") || _0x1b4067["toString"]()["includes"]("NotFoundError: The device was disconnected.")) this["logDebug"]("Ignored reset error");
            else throw new Error("Error during reset for manifestation: " + _0x1b4067, {
                'cause': _0x1b4067
            });
        }
    }
}
const d = {
    'DETACH': 0x0,
    'DNLOAD': 0x1,
    'UPLOAD': 0x2,
    'GETSTATUS': 0x3,
    'CLRSTATUS': 0x4,
    'GETSTATE': 0x5,
    'ABORT': 0x6,
    'appIDLE': 0x0,
    'appDETACH': 0x1,
    'dfuIDLE': 0x2,
    'dfuDNLOAD_SYNC': 0x3,
    'dfuDNBUSY': 0x4,
    'dfuDNLOAD_IDLE': 0x5,
    'dfuMANIFEST_SYNC': 0x6,
    'dfuMANIFEST': 0x7,
    'dfuMANIFEST_WAIT_RESET': 0x8,
    'dfuUPLOAD_IDLE': 0x9,
    'dfuERROR': 0xa,
    'STATUS_OK': 0x0,
    'findDeviceDfuInterfaces': function(_0x8bf525) {
        const _0x4d31b7 = _0x105040,
            _0x2bf892 = [];
        for (const _0x280117 of _0x8bf525["configurations"])
            for (const _0x49aefa of _0x280117["interfaces"])
                for (const _0x38318e of _0x49aefa["alternates"]) _0x38318e["interfaceClass"] === 0xfe && _0x38318e["interfaceSubclass"] === 0x1 && (_0x38318e["interfaceProtocol"] === 0x1 || _0x38318e["interfaceProtocol"] === 0x2) && _0x2bf892["push"]({
                    'configuration': _0x280117,
                    'interface': _0x49aefa,
                    'alternate': _0x38318e,
                    'name': _0x38318e["interfaceName"] || void 0x0
                });
        return _0x2bf892;
    },
    'findAllDfuInterfaces': function() {
        const _0x3a5fd9 = _0x105040;
        return navigator["usb"]["getDevices"]()["then"](_0x115c00 => {
            const _0x1d95fc = _0x3a5fd9,
                _0x83f10d = [];
            for (const _0x2235e4 of _0x115c00) {
                const _0xab1e3a = d["findDeviceDfuInterfaces"](_0x2235e4);
                for (const _0xfffc0e of _0xab1e3a) _0x83f10d["push"](new b(_0x2235e4, _0xfffc0e));
            }
            return _0x83f10d;
        });
    },
    'parseDeviceDescriptor': function(_0x483b5a) {
        const _0x38f2c5 = _0x105040;
        return {
            'bLength': _0x483b5a["getUint8"](0x0),
            'bDescriptorType': _0x483b5a["getUint8"](0x1),
            'bcdUSB': _0x483b5a["getUint16"](0x2, !0x0),
            'bDeviceClass': _0x483b5a["getUint8"](0x4),
            'bDeviceSubClass': _0x483b5a["getUint8"](0x5),
            'bDeviceProtocol': _0x483b5a["getUint8"](0x6),
            'bMaxPacketSize': _0x483b5a["getUint8"](0x7),
            'idVendor': _0x483b5a["getUint16"](0x8, !0x0),
            'idProduct': _0x483b5a["getUint16"](0xa, !0x0),
            'bcdDevice': _0x483b5a["getUint16"](0xc, !0x0),
            'iManufacturer': _0x483b5a["getUint8"](0xe),
            'iProduct': _0x483b5a["getUint8"](0xf),
            'iSerialNumber': _0x483b5a["getUint8"](0x10),
            'bNumConfigurations': _0x483b5a["getUint8"](0x11)
        };
    },
    'parseConfigurationDescriptor': function(_0x348c23) {
        const _0x4e874c = _0x105040,
            _0x2ea53c = new DataView(_0x348c23["buffer"]["slice"](0x9)),
            _0x56d5a3 = d["parseSubDescriptors"](_0x2ea53c);
        return {
            'bLength': _0x348c23["getUint8"](0x0),
            'bDescriptorType': _0x348c23["getUint8"](0x1),
            'wTotalLength': _0x348c23["getUint16"](0x2, !0x0),
            'bNumInterfaces': _0x348c23["getUint8"](0x4),
            'bConfigurationValue': _0x348c23["getUint8"](0x5),
            'iConfiguration': _0x348c23["getUint8"](0x6),
            'bmAttributes': _0x348c23["getUint8"](0x7),
            'bMaxPower': _0x348c23["getUint8"](0x8),
            'descriptors': _0x56d5a3
        };
    },
    'parseInterfaceDescriptor': function(_0x274a7d) {
        const _0x5f4f35 = _0x105040;
        return {
            'bLength': _0x274a7d["getUint8"](0x0),
            'bDescriptorType': _0x274a7d["getUint8"](0x1),
            'bInterfaceNumber': _0x274a7d["getUint8"](0x2),
            'bAlternateSetting': _0x274a7d["getUint8"](0x3),
            'bNumEndpoints': _0x274a7d["getUint8"](0x4),
            'bInterfaceClass': _0x274a7d["getUint8"](0x5),
            'bInterfaceSubClass': _0x274a7d["getUint8"](0x6),
            'bInterfaceProtocol': _0x274a7d["getUint8"](0x7),
            'iInterface': _0x274a7d["getUint8"](0x8),
            'descriptors': []
        };
    },
    'parseFunctionalDescriptor': function(_0x2ca48b) {
        const _0x5aaca0 = _0x105040;
        return {
            'bLength': _0x2ca48b["getUint8"](0x0),
            'bDescriptorType': _0x2ca48b["getUint8"](0x1),
            'bmAttributes': _0x2ca48b["getUint8"](0x2),
            'wDetachTimeOut': _0x2ca48b["getUint16"](0x3, !0x0),
            'wTransferSize': _0x2ca48b["getUint16"](0x5, !0x0),
            'bcdDFUVersion': _0x2ca48b["getUint16"](0x7, !0x0)
        };
    },
    'parseSubDescriptors': function(_0x15f3cc) {
        const _0xbb28fa = _0x105040;
        let _0x5d5a71 = _0x15f3cc;
        const _0x3f8fee = [];
        let _0x15faff = null,
            _0x3a3f7 = !0x1;
        for (; _0x5d5a71["byteLength"] > 0x2;) {
            const _0x2a995d = _0x5d5a71["getUint8"](0x0),
                _0x85e0ed = _0x5d5a71["getUint8"](0x1),
                _0x3c612a = new DataView(_0x5d5a71["buffer"]["slice"](0x0, _0x2a995d));
            if (_0x85e0ed === 0x4) _0x15faff = d["parseInterfaceDescriptor"](_0x3c612a), _0x3a3f7 = _0x15faff["bInterfaceClass"] === 0xfe && _0x15faff["bInterfaceSubClass"] === 0x1, _0x3f8fee["push"](_0x15faff);
            else {
                if (_0x3a3f7 && _0x85e0ed === 0x21) {
                    const _0x49a44f = d["parseFunctionalDescriptor"](_0x3c612a);
                    _0x3f8fee["push"](_0x49a44f), _0x15faff["descriptor" + 's']["push"](_0x49a44f);
                } else {
                    const _0x1ad2b6 = {
                        'bLength': _0x2a995d,
                        'bDescriptorType': _0x85e0ed,
                        'data': _0x3c612a
                    };
                    _0x3f8fee["push"](_0x1ad2b6), _0x15faff && _0x15faff["descriptor" + 's']["push"](_0x1ad2b6);
                }
            }
            _0x5d5a71 = new DataView(_0x5d5a71["buffer"]["slice"](_0x2a995d));
        }
        return _0x3f8fee;
    }
};
class w extends b {
    constructor(_0x5c085a, _0x27c704) {
        const _0x5a2985 = _0x105040;
        super(_0x5c085a, _0x27c704), h(this, "memoryInfo", null), h(this, "startAddre" + 'ss', NaN), h(this, "eraseProgress", 0x0), h(this, "writeProgress", 0x0), h(this, "currentPha" + 'se', "idle"), _0x27c704["name"] && (this["memoryInfo"] = D["parseMemoryDescripto" + 'r'](_0x27c704["name"]));
    }
    async ["dfuseComma" + 'nd'](_0x2aafb1, _0x7bdcbc, _0x38041b) {
        const _0x2acd13 = _0x105040;
        typeof _0x7bdcbc > 'u' && typeof _0x38041b > 'u' && (_0x7bdcbc = 0x0, _0x38041b = 0x1);
        const _0x3b0cd9 = {
            0x0: "GET_COMMAN" + 'DS',
            0x21: "SET_ADDRES" + 'S',
            0x41: "ERASE_SECT" + 'OR'
        };
        if (_0x38041b === void 0x0 || _0x7bdcbc === void 0x0) throw new Error("Invalid parameters for dfuseCommand");
        const _0x2cbd5c = new ArrayBuffer(_0x38041b + 0x1),
            _0x4db722 = new DataView(_0x2cbd5c);
        if (_0x4db722["setUint8"](0x0, _0x2aafb1), _0x38041b === 0x1) _0x4db722["setUint8"](0x1, _0x7bdcbc);
        else {
            if (_0x38041b === 0x4) _0x4db722["setUint32"](0x1, _0x7bdcbc, !0x0);
            else throw new Error("Don't know how to handle data of len " + _0x38041b);
        }
        try {
            await this["download"](_0x2cbd5c, 0x0);
        } catch (_0x121ed3) {
            throw new Error("Error during special DfuSe command " + _0x3b0cd9[_0x2aafb1] + ':\x20' + _0x121ed3, {
                'cause': _0x121ed3
            });
        }
        if ((await this["poll_until"](_0x229186 => _0x229186 !== d["dfuDNBUSY"]))["status"] !== d["STATUS_OK"]) throw new Error("Special DfuSe comman" + 'd\x20' + _0x3b0cd9[_0x2aafb1] + " failed");
    } ["getSegment"](_0x3684e2) {
        const _0x4dba20 = _0x105040;
        if (!this["memoryInfo"] || !this["memoryInfo"]["segments"]) {
            this["logWarning"]("地址 0x" + _0x3684e2["toString"](0x10) + (" 查询时缺少内存映射信息，创建默认映射"));
            const _0x1d6183 = {
                'start': 0x0,
                'end': 0xffffffff,
                'sectorSize': 0x1000,
                'readable': !0x0,
                'erasable': !0x0,
                'writable': !0x0
            };
            return this["memoryInfo"] ? this["memoryInfo"]["segments"] = [_0x1d6183] : (this["memoryInfo"] = {
                'name': "DefaultFullMemoryMap",
                'segments': [_0x1d6183]
            }, this["logDebug"]("创建默认完整内存映射")), _0x1d6183;
        }
        for (const _0x8fcc8f of this["memoryInfo"]["segments"])
            if (_0x8fcc8f["start"] <= _0x3684e2 && _0x3684e2 < _0x8fcc8f["end"]) return _0x8fcc8f;
        let _0x5d6ea7 = null,
            _0x55c272 = 0x1 / 0x0;
        for (const _0x51e06a of this["memoryInfo"]["segments"])
            if (_0x3684e2 < _0x51e06a["start"]) {
                const _0x18f65a = _0x51e06a["start"] - _0x3684e2;
                _0x18f65a < _0x55c272 && (_0x55c272 = _0x18f65a, _0x5d6ea7 = _0x51e06a);
            } else {
                if (_0x3684e2 >= _0x51e06a["end"] && _0x51e06a === this["memoryInfo"]["segments"][this["memoryInfo"]["segments"]["length"] - 0x1]) return this["logWarning"]("地址 0x" + _0x3684e2["toString"](0x10) + (" 在最后一个段之后，扩展最后一个段")), _0x51e06a["end"] = Math["max"](_0x51e06a["end"], _0x3684e2 + 0x1000), _0x51e06a;
            } return _0x5d6ea7 ? (this["logWarning"]("地址 0x" + _0x3684e2["toString"](0x10) + (" 不在内存映射中，使用最近的段: 0x") + _0x5d6ea7["start"]["toString"](0x10) + "-0x" + _0x5d6ea7["end"]["toString"](0x10)), _0x5d6ea7) : this["memoryInfo"]["segments"]["length"] > 0x0 ? (this["logWarning"]("地址 0x" + _0x3684e2["toString"](0x10) + (" 不在内存映射中，强制使用第一个段")), this["memoryInfo"]["segments"][0x0]) : null;
    } ["getSectorStart"](_0x315b24, _0x1cbe8a) {
        const _0x304734 = _0x105040;
        if ((typeof _0x1cbe8a > 'u' || _0x1cbe8a === null) && (_0x1cbe8a = this["getSegment"](_0x315b24)), !_0x1cbe8a) throw new Error("Address " + _0x315b24["toString"](0x10) + (" outside of memory m" + 'ap'));
        const _0x4c11f5 = Math["floor"]((_0x315b24 - _0x1cbe8a["start"]) / _0x1cbe8a["sectorSize"]);
        return _0x1cbe8a["start"] + _0x4c11f5 * _0x1cbe8a["sectorSize"];
    } ["getSectorE" + 'nd'](_0x5ae247, _0x17c216) {
        const _0x3e381f = _0x105040;
        if ((typeof _0x17c216 > 'u' || _0x17c216 === null) && (_0x17c216 = this["getSegment"](_0x5ae247)), !_0x17c216) throw new Error("Address " + _0x5ae247["toString"](0x10) + (" outside of memory m" + 'ap'));
        const _0x3c6504 = Math["floor"]((_0x5ae247 - _0x17c216["start"]) / _0x17c216["sectorSize"]);
        return _0x17c216["start"] + (_0x3c6504 + 0x1) * _0x17c216["sectorSize"];
    } ["getFirstWritableSegment"]() {
        const _0x476c80 = _0x105040;
        if (!this["memoryInfo"] || !this["memoryInfo"]["segments"]) throw new Error("No memory map information available");
        for (const _0x2521a8 of this["memoryInfo"]["segments"])
            if (_0x2521a8["writable"]) return _0x2521a8;
        return null;
    } ["getMaxReadSize"](_0x1749ee) {
        const _0x37b8e1 = _0x105040;
        if (!this["memoryInfo"] || !this["memoryInfo"]["segments"]) throw new Error("No memory map information available");
        let _0xf66dd4 = 0x0;
        for (const _0x455f0c of this["memoryInfo"]["segments"])
            if (_0x455f0c["start"] <= _0x1749ee && _0x1749ee < _0x455f0c["end"]) {
                if (_0x455f0c["readable"]) _0xf66dd4 += _0x455f0c["end"] - _0x1749ee;
                else return 0x0;
            } else {
                if (_0x455f0c["start"] === _0x1749ee + _0xf66dd4) {
                    if (_0x455f0c["readable"]) _0xf66dd4 += _0x455f0c["end"] - _0x455f0c["start"];
                    else break;
                }
            } return _0xf66dd4;
    }
    async ["eraseMemor" + 'y'](_0xa896e7, _0x44db7b) {
        const _0xbf4705 = _0x105040;
        this["currentPha" + 'se'] = "erasing", this["eraseProgress"] = 0x0;
        try {
            this["logInfo"]("开始擦除Flash: 地址=0x" + _0xa896e7["toString"](0x10) + ", 长度=" + _0x44db7b + " 字节");
            let _0x4b8eca = 0x0;
            const _0x1f3be8 = _0x44db7b;
            this["logProgres" + 's'](0x0, _0x1f3be8);
            let _0x15d0b4 = _0xa896e7;
            const _0x2fea6a = _0xa896e7 + _0x44db7b;
            for (; _0x15d0b4 < _0x2fea6a;) {
                const _0x4dce12 = this["getSegment"](_0x15d0b4);
                if (!_0x4dce12) throw this["logError"]("无法为地址 0x" + _0x15d0b4["toString"](0x10) + " 获取内存段"), new Error("地址 0x" + _0x15d0b4["toString"](0x10) + " 无有效内存段");
                const _0x447e8c = Math["min"](_0x4dce12["end"], _0x2fea6a),
                    _0x5875b9 = _0x447e8c - _0x15d0b4;
                if (_0x5875b9 <= 0x0) {
                    this["logWarning"]("当前段无法处理地址 " + '0x' + _0x15d0b4["toString"](0x10) + "，跳过"), _0x15d0b4 = _0x4dce12["end"];
                    continue;
                }
                if (!_0x4dce12["erasable"]) {
                    this["logWarning"]("段 0x" + _0x4dce12["start"]["toString"](0x10) + "-0x" + _0x4dce12["end"]["toString"](0x10) + " 不可擦除，跳过"), _0x4b8eca += _0x5875b9, _0x15d0b4 = _0x447e8c, this["eraseProgress"] = Math["round"](_0x4b8eca / _0x1f3be8 * 0x64), this["logProgres" + 's'](_0x4b8eca, _0x1f3be8);
                    continue;
                }
                let _0x59a4e0 = this["getSectorStart"](_0x15d0b4, _0x4dce12);
                const _0x44b58a = this["getSectorE" + 'nd'](_0x447e8c - 0x1, _0x4dce12);
                for (; _0x59a4e0 < _0x44b58a;) {
                    const _0x278326 = Math["floor"]((_0x59a4e0 - _0x4dce12["start"]) / _0x4dce12["sectorSize"]),
                        _0x8b166c = _0x4dce12["start"] + _0x278326 * _0x4dce12["sectorSize"];
                    if (_0x8b166c >= _0x4dce12["end"]) break;
                    const _0x740924 = Math["min"](_0x8b166c + _0x4dce12["sectorSize"], _0x2fea6a) - _0x8b166c;
                    if (_0x740924 > 0x0) {
                        this["logDebug"]("擦除扇区: 地址=0" + 'x' + _0x8b166c["toString"](0x10) + ", 大小=" + _0x740924 + " 字节");
                        try {
                            await this["dfuseComma" + 'nd'](D["ERASE_SECT" + 'OR'], _0x8b166c, 0x4);
                        } catch (_0xd08f17) {
                            throw this["logError"]("擦除扇区失败: 0x" + _0x8b166c["toString"](0x10) + " - " + _0xd08f17), _0xd08f17;
                        }
                        _0x4b8eca += _0x740924, _0x59a4e0 += _0x4dce12["sectorSize"], this["eraseProgress"] = Math["round"](_0x4b8eca / _0x1f3be8 * 0x64), this["logProgres" + 's'](_0x4b8eca, _0x1f3be8);
                    }
                }
                _0x15d0b4 = _0x447e8c;
            }
            this["eraseProgress"] = 0x64, this["logInfo"]("擦除完成: " + _0x4b8eca + " 字节 (目标: " + _0x1f3be8 + " 字节)"), _0x4b8eca < _0x1f3be8 && this["logWarning"]("警告: 实际擦除 " + _0x4b8eca + " 字节，但目标需要 " + _0x1f3be8 + " 字节");
        } finally {
            this["currentPha" + 'se'] = "idle";
        }
    }
    async ["writeData"](_0x5334de, _0x175082, _0x24c5c2 = 0x1000) {
        const _0xcf2ed = _0x105040;
        this["currentPha" + 'se'] = "writing", this["writeProgress"] = 0x0;
        try {
            if (!this["memoryInfo"] || !this["memoryInfo"]["segments"]) throw new Error("No memory map available");
            let _0x5dc5cb = 0x0;
            const _0x37c7b0 = _0x5334de["byteLength"];
            this["logInfo"]("开始写入数据到DFU" + '设备');
            let _0x49ee72 = _0x175082;
            for (; _0x5dc5cb < _0x37c7b0;) {
                const _0x2168aa = _0x37c7b0 - _0x5dc5cb,
                    _0x2c0154 = Math["min"](_0x2168aa, _0x24c5c2);
                let _0xc6f167 = 0x0,
                    _0x2b2104;
                try {
                    await this["dfuseComma" + 'nd'](D["SET_ADDRES" + 'S'], _0x49ee72, 0x4), this["logDebug"]("Set address to 0x" + _0x49ee72["toString"](0x10)), _0xc6f167 = await this["download"](_0x5334de["slice"](_0x5dc5cb, _0x5dc5cb + _0x2c0154), 0x2), this["logDebug"]("Sent " + _0xc6f167 + " bytes"), _0x2b2104 = await this["poll_until_idle"](d["dfuDNLOAD_IDLE"]), _0x49ee72 += _0x2c0154;
                } catch (_0x3f8b93) {
                    throw new Error("Error during DfuSe download: " + _0x3f8b93, {
                        'cause': _0x3f8b93
                    });
                }
                if (_0x2b2104["status"] !== d["STATUS_OK"]) throw new Error("DFU DOWNLOAD failed state=" + _0x2b2104["state"] + ", status=" + _0x2b2104["status"]);
                this["logDebug"]("Wrote " + _0xc6f167 + " bytes"), _0x5dc5cb += _0xc6f167, this["writeProgress"] = Math["round"](_0x5dc5cb / _0x37c7b0 * 0x64), this["logProgres" + 's'](_0x5dc5cb, _0x37c7b0);
            }
            this["writeProgress"] = 0x64, this["logInfo"]("写入完成: " + _0x5dc5cb + " 字节");
        } finally {
            this["currentPha" + 'se'] = "idle";
        }
    }
    async ["manifest"](_0x126e8e) {
        const _0xc34e2d = _0x105040;
        this["currentPha" + 'se'] = "manifestin" + 'g';
        try {
            this["logInfo"]("固化新固件");
            try {
                await this["dfuseComma" + 'nd'](D["SET_ADDRES" + 'S'], _0x126e8e, 0x4), await this["download"](new ArrayBuffer(0x0), 0x0);
            } catch (_0x3d3dc6) {
                throw new Error("Error during DfuSe manifestation: " + _0x3d3dc6, {
                    'cause': _0x3d3dc6
                });
            }
            try {
                await this["poll_until"](_0x405535 => _0x405535 === d["dfuMANIFES" + 'T']);
            } catch (_0x1d30bf) {
                this["logError"](String(_0x1d30bf));
            }
            this["logInfo"]("固化完成");
        } finally {
            this["currentPha" + 'se'] = "idle";
        }
    }
    async ["do_downloa" + 'd'](_0x454024, _0x2c867c, _0x5024e8 = !0x1) {
        const _0x112101 = _0x105040;
        var _0x168d2c;
        let _0x117c27 = this["startAddre" + 'ss'];
        isNaN(_0x117c27) && (_0x117c27 = ((_0x168d2c = this["memoryInfo"]) == null ? void 0x0 : _0x168d2c["segments"][0x0]["start"]) || 0x0, this["logWarning"]("Using inferred start address 0" + 'x' + _0x117c27["toString"](0x10))), await this["eraseMemor" + 'y'](_0x117c27, _0x2c867c["byteLength"]), await this["writeData"](_0x2c867c, _0x117c27, _0x454024), await this["manifest"](_0x117c27);
    } ["getProgressStatus"]() {
        const _0x8ec5bb = _0x105040;
        return {
            'phase': this["currentPha" + 'se'],
            'eraseProgress': this["eraseProgress"],
            'writeProgress': this["writeProgress"]
        };
    }
    async ["do_upload"](_0x52faf0, _0x2fb9ff = 0x1 / 0x0, _0x2cf58b = 0x0) {
        const _0x422a15 = _0x105040;
        var _0xb2fb95;
        let _0x23fbe4 = this["startAddre" + 'ss'];
        return isNaN(_0x23fbe4) ? (_0x23fbe4 = ((_0xb2fb95 = this["memoryInfo"]) == null ? void 0x0 : _0xb2fb95["segments"][0x0]["start"]) || 0x0, this["logWarning"]("Using inferred start address 0" + 'x' + _0x23fbe4["toString"](0x10))) : this["getSegment"](_0x23fbe4) === null && this["logWarning"]("Start address 0x" + _0x23fbe4["toString"](0x10) + (" outside of memory map bounds")), this["logInfo"]("Reading up to 0x" + _0x2fb9ff["toString"](0x10) + (" bytes starting at 0" + 'x') + _0x23fbe4["toString"](0x10)), await this["getState"]() !== d["dfuIDLE"] && await this["abortToIdl" + 'e'](), await this["dfuseComma" + 'nd'](D["SET_ADDRES" + 'S'], _0x23fbe4, 0x4), await this["abortToIdl" + 'e'](), await super["do_upload"](_0x52faf0, _0x2fb9ff, 0x2);
    }
} /* string table removed */
const D = {
        'GET_COMMANDS': 0x0,
        'SET_ADDRESS': 0x21,
        'ERASE_SECTOR': 0x41,
        'parseMemoryDescriptor': function(_0x18af59) {
            const _0x77c382 = _0x105040,
                _0x5aed76 = _0x18af59["indexOf"]('/');
            if (!_0x18af59["startsWith"]('@') || _0x5aed76 === -0x1) throw new Error("Not a DfuSe memory descriptor:" + '\x20\x22' + _0x18af59 + '\x22');
            const _0x36adc3 = _0x18af59["substring"](0x1, _0x5aed76)["trim"](),
                _0x41de71 = _0x18af59["substring"](_0x5aed76),
                _0x29d3b9 = [],
                _0x208782 = {
                    '\x20': 0x1,
                    'B': 0x1,
                    'K': 0x400,
                    'M': 0x100000
                },
                _0x17cdd1 = /\/\s*(0x[0-9a-fA-F]{1,8})\s*\/(\s*[0-9]+\s*\*\s*[0-9]+\s?[ BKM]\s*[abcdefg]\s*,?\s*)+/g;
            let _0x20ffad;
            for (;
                (_0x20ffad = _0x17cdd1["exec"](_0x41de71)) !== null;) {
                const _0x15db39 = /([0-9]+)\s*\*\s*([0-9]+)\s?([ BKM])\s*([abcdefg])\s*,?\s*/g;
                let _0x20e928 = parseInt(_0x20ffad[0x1], 0x10),
                    _0x1ee3a9;
                for (;
                    (_0x1ee3a9 = _0x15db39["exec"](_0x20ffad[0x0])) !== null;) {
                    const _0x5b82f4 = parseInt(_0x1ee3a9[0x1], 0xa),
                        _0x2be67a = parseInt(_0x1ee3a9[0x2], 0xa) * _0x208782[_0x1ee3a9[0x3]],
                        _0x1d212c = _0x1ee3a9[0x4]["charCodeAt"](0x0) - 0x61 + 0x1;
                    _0x29d3b9["push"]({
                        'start': _0x20e928,
                        'sectorSize': _0x2be67a,
                        'end': _0x20e928 + _0x2be67a * _0x5b82f4,
                        'readable': (_0x1d212c & 0x1) !== 0x0,
                        'erasable': (_0x1d212c & 0x2) !== 0x0,
                        'writable': (_0x1d212c & 0x4) !== 0x0
                    }), _0x20e928 += _0x2be67a * _0x5b82f4;
                }
            }
            return {
                'name': _0x36adc3,
                'segments': _0x29d3b9
            };
        }
    },
    I = [{
        'vendorId': 0x2e3c,
        'productId': 0xdf11,
        'name': "UB32",
        'mcuMax': 0x100 * 0x400,
        'mcuStartAddr': 0x8000000,
        'dataMax': 0x0,
        'dataStartAddr': 0x8000000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x4400,
        'mcuFileCompareLength': 0x8,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x1000,
        'name': "UB32V1000",
        'mcuMax': 0x1e0 * 0x400,
        'mcuStartAddr': 0x8000,
        'dataMax': 0xf * 0x400 * 0x400 + 0x200 * 0x400,
        'dataStartAddr': 0x70080000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x1000,
        'mcuFileCompareLength': 0x32,
        'dataCompare': null,
        'dataFileCompareEnable': 0x1,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x26
    }, {
        'vendorId': 0x5542,
        'productId': 0x1001,
        'name': "UB32V1001",
        'mcuMax': 0x1e0 * 0x400,
        'mcuStartAddr': 0x8000,
        'dataMax': 0x10 * 0x400 * 0x400,
        'dataStartAddr': 0x70000000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x1000,
        'mcuFileCompareLength': 0x32,
        'dataCompare': null,
        'dataFileCompareEnable': 0x1,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x26
    }, {
        'vendorId': 0x5542,
        'productId': 0x8000,
        'name': "UB32V8000",
        'mcuMax': 0x1c0 * 0x400,
        'mcuStartAddr': 0x10010000,
        'dataMax': 0x10 * 0x400 * 0x400,
        'dataStartAddr': 0x10080000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x2000,
        'mcuFileCompareLength': 0x32,
        'dataCompare': null,
        'dataFileCompareEnable': 0x1,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x26
    }, {
        'vendorId': 0x5542,
        'productId': 0x341,
        'name': "UB32V0341",
        'mcuMax': 0x1e0 * 0x400,
        'mcuStartAddr': 0x8000,
        'dataMax': 0x10 * 0x400 * 0x400,
        'dataStartAddr': 0x70000000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x1000,
        'mcuFileCompareLength': 0x32,
        'dataCompare': null,
        'dataFileCompareEnable': 0x1,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x26
    }, {
        'vendorId': 0x5542,
        'productId': 0x101,
        'name': "UB32V105D (0101)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x102,
        'name': "UB32V105D (0102)",
        'mcuMax': 0xd8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x0,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x103,
        'name': "UB32V105D (0103)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x0,
        'mcuFileCompareOffset': 0x0,
        'mcuFileCompareLength': 0x0,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x104,
        'name': "UB32V105D (0104)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x105,
        'name': "UB32V105D (0105)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x106,
        'name': "UB32V105D (0106)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x107,
        'name': "UB32V105D (0107)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x6000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }, {
        'vendorId': 0x5542,
        'productId': 0x108,
        'name': "UB32V105D (0108)",
        'mcuMax': 0x1a8 * 0x400,
        'mcuStartAddr': 0x8000,
        'dataMax': 0x20 * 0x400,
        'dataStartAddr': 0x70000,
        'mcuCompare': null,
        'mcuFileCompareEnable': 0x1,
        'mcuFileCompareOffset': 0x10,
        'mcuFileCompareLength': 0x30,
        'dataCompare': null,
        'dataFileCompareEnable': 0x0,
        'dataFileCompareOffset': 0x0,
        'dataFileCompareLength': 0x0
    }],
    S = class S {
        constructor() {
            const _0x416e69 = _0x105040;
            h(this, "crc", 0xffffffff), S["table"] || (S["table"] = S["generateTable"]());
        }
        static["generateTable"]() {
            const _0x1f9c92 = [];
            for (let _0x12415f = 0x0; _0x12415f < 0x100; _0x12415f++) {
                let _0x1d14c5 = _0x12415f;
                for (let _0x36a51 = 0x0; _0x36a51 < 0x8; _0x36a51++) _0x1d14c5 = (_0x1d14c5 & 0x1) === 0x1 ? _0x1d14c5 >>> 0x1 ^ 0xedb88320 : _0x1d14c5 >>> 0x1;
                _0x1f9c92[_0x12415f] = _0x1d14c5;
            }
            return _0x1f9c92;
        } ["update"](_0x5337d0, _0x3d8016, _0x402fac) {
            const _0x24f0bb = _0x105040;
            for (let _0x180995 = _0x3d8016; _0x180995 < _0x402fac; _0x180995++) this["crc"] = S["table"][(this["crc"] ^ _0x5337d0[_0x180995]) & 0xff] ^ this["crc"] >>> 0x8;
        }
        get["value"]() {
            const _0x5a29f3 = _0x105040;
            return this["crc"] ^ 0xffffffff;
        }
    };
h(S, "table");
let y = S;

function x(_0x2ad949) {
    const _0x5aa7c4 = _0x105040,
        _0x27cd25 = new y();
    return _0x27cd25["update"](_0x2ad949, 0x0, _0x2ad949["length"]), _0x27cd25["value"];
}

function F(_0x2f0d0b, _0x164ca9, _0x638edc = 0x0, _0x266506 = 0x3e8) {
    const _0x20ef7e = _0x105040;
    if (!_0x2f0d0b || !_0x2f0d0b["opened"]) return console["error"]("设备未连接"), Promise["resolve"](null);
    const _0x2e1e6c = new Uint8Array(_0x164ca9);
    return _0x2f0d0b["sendReport"](_0x638edc, _0x2e1e6c)["then"](() => new Promise(_0x25ec58 => {
        const _0xb856ff = _0x20ef7e,
            _0x16ef30 = _0x2b4680 => {
                const _0x2bd0ec = _0x56a8;
                if (_0x2b4680["device"] !== _0x2f0d0b) return;
                _0x1e4815();
                const _0x1e4baa = _0x2b4680["data"];
                _0x25ec58(new Uint8Array(_0x1e4baa["buffer"], _0x1e4baa["byteOffset"], _0x1e4baa["byteLength"]));
            },
            _0x43a35d = setTimeout(() => {
                _0x1e4815(), _0x25ec58(null);
            }, _0x266506);

        function _0x1e4815() {
            const _0xd0b5e6 = _0x56a8;
            _0x2f0d0b["removeEventListener"]("inputrepor" + 't', _0x16ef30), clearTimeout(_0x43a35d);
        }
        _0x2f0d0b["addEventListener"]("inputrepor" + 't', _0x16ef30);
    }))["catch"](_0x494b08 => (console["error"]("发送命令失败:", _0x494b08), null));
}
const P = [0x7, 0x3, 0x1, 0x20]; /* decoder removed */
class E extends Error {
    constructor(_0x4a9c14) {
        const _0x3ebb18 = _0x105040;
        super(_0x4a9c14), this["name"] = "DfuDeviceNotFoundErr" + 'or';
    }
}
const v = 0x12c,
    $ = 0x4b0,
    L = 0x1388;
class R {
    constructor() {
        const _0xf1fe09 = _0x105040;
        h(this, "specialConfig"), h(this, "currentConfig", null), h(this, "transferSi" + 'ze', 0x400), h(this, "manifestationToleran" + 't', !0x0), h(this, "currentUpgradeType", null), h(this, "callbacks", {}), h(this, "progressStatus", {
            'phase': "idle",
            'eraseProgress': 0x0,
            'writeProgress': 0x0
        }), this["specialConfig"] = {
            'general': {
                'hidUsagePage': 0xff60,
                'hidUsage': 0x61,
                'dfuCommand': [0x13, 0x2, 0x0, 0x0, 0x0, 0x0, 0x30, 0xd2]
            },
            'specialDevices': {
                '5542-0001': {
                    'dfuCommand': [0x13, 0x2, 0x0, 0x0, 0x0, 0x0, 0x78, 0xb7]
                }
            }
        };
    } ["setCallbac" + 'ks'](_0x184511) {
        const _0x261f27 = _0x105040;
        this["callbacks"] = {
            ...this["callbacks"],
            ..._0x184511
        };
    } ["setCurrentUpgradeTyp" + 'e'](_0x55e510) {
        const _0x155822 = _0x105040;
        this["currentUpgradeType"] = _0x55e510;
    } ["log"](_0x334628) {
        const _0x19bde2 = _0x105040;
        var _0x45ffe4, _0x16f06f;
        console["log"](_0x334628), (_0x16f06f = (_0x45ffe4 = this["callbacks"])["onLog"]) == null || _0x16f06f["call"](_0x45ffe4, _0x334628);
    } ["bytesToHex"](_0x54619c) {
        const _0x124099 = _0x105040;
        return (Array["isArray"](_0x54619c) ? _0x54619c : Array["from"](_0x54619c))["map"](_0x46868a => _0x46868a["toString"](0x10)["padStart"](0x2, '0'))["join"]('\x20');
    } ["padHex"](_0x5204a8, _0x56c548 = 0x4) {
        const _0x1c7efc = _0x105040;
        return _0x5204a8["toString"](0x10)["toUpperCas" + 'e']()["padStart"](_0x56c548, '0');
    } ["getSpecialConfig"]() {
        const _0x46dbca = _0x105040;
        return this["specialConfig"];
    } ["findDeviceConfig"](_0x1a0c22, _0x97d9a6) {
        const _0x13250f = _0x105040;
        return I["find"](_0x35a99b => _0x35a99b["vendorId"] === _0x1a0c22 && _0x35a99b["productId"] === _0x97d9a6);
    } ["getDfuCommand"](_0x4bee69, _0x12f61c) {
        const _0x215279 = _0x105040,
            _0xfe7c31 = this["padHex"](_0x4bee69) + '-' + this["padHex"](_0x12f61c),
            _0x44aff0 = this["specialConfig"]["specialDevices"][_0xfe7c31];
        return _0x44aff0 && _0x44aff0["dfuCommand"] ? (this["log"]("使用特殊DFU命令:" + '\x20' + this["bytesToHex"](_0x44aff0["dfuCommand"])), _0x44aff0["dfuCommand"]) : (this["log"]("使用通用DFU命令:" + '\x20' + this["bytesToHex"](this["specialConfig"]["general"]["dfuCommand"])), this["specialConfig"]["general"]["dfuCommand"]);
    }
    async ["sendPrepareCommand"](_0x4263f8) {
        const _0x25f9f7 = _0x105040;
        return this["log"]("发送升级准备命令"), await F(_0x4263f8, new Uint8Array(P));
    }
    async ["readFirmwareVersion"](_0x2fd97b) {
        const _0x5c8af1 = _0x105040,
            _0x2397e6 = await F(_0x2fd97b, new Uint8Array([0x11, 0x2, 0x0, 0x0, 0x0, 0x0, 0xbc, 0x60]));
        return _0x2397e6 && new TextDecoder()["decode"](_0x2397e6["slice"](0x8))["replace"](/\0/g, '')["trim"]() || null;
    }
    async ["sendDFUCommand"](_0x2a10ad) {
        const _0x2f7a36 = _0x105040;
        if (!_0x2a10ad) throw new Error("没有连接的HID设备");
        try {
            const _0x1da19a = this["getDfuCommand"](_0x2a10ad["vendorId"], _0x2a10ad["productId"]);
            return this["log"]("发送DFU命令: " + this["bytesToHex"](_0x1da19a)), await _0x2a10ad["sendReport"](0x0, new Uint8Array(_0x1da19a)), this["log"]("DFU命令发送成功，等待设备重启..."), await new Promise(_0x50c3b8 => setTimeout(_0x50c3b8, 0x3e8)), this["log"]("设备重启完成，准备连接DFU设备"), !0x0;
        } catch (_0x253edc) {
            throw this["log"]("DFU命令失败: " + _0x253edc["message"]), _0x253edc;
        }
    }
    async ["connectDFUDevice"]() {
        const _0x2e9338 = _0x105040;
        try {
            if (!navigator["usb"]) throw new Error("当前环境不支持 USB 更新");
            this["log"]("寻找DFU设备...");
            const _0x3e112c = await this["pickDfuDevice"]();
            if (!_0x3e112c) throw new E("未选择设备");
            if (_0x3e112c["opened"]) {
                this["log"]("DFU设备处于打开状态，先关闭再接管");
                try {
                    await _0x3e112c["close"]();
                } catch (_0xdca4b) {
                    this["log"]("关闭已打开的DFU设备失败: " + _0xdca4b["message"]);
                }
            }
            const _0x28ef28 = this["findDeviceConfig"](_0x3e112c["vendorId"], _0x3e112c["productId"]);
            if (!_0x28ef28) throw new Error("未找到匹配的设备配置: VID=0x" + this["padHex"](_0x3e112c["vendorId"]) + ", PID=0x" + this["padHex"](_0x3e112c["productId"]));
            this["currentConfig"] = _0x28ef28, this["log"]("找到设备配置: " + this["currentConfig"]["name"]), this["log"]("DFU设备信息: VID=0x" + this["padHex"](_0x3e112c["vendorId"]) + ", PID=0x" + this["padHex"](_0x3e112c["productId"]) + ", 名称=" + this["currentConfig"]["name"]);
            const _0x4c2162 = d["findDeviceDfuInterfaces"](_0x3e112c);
            if (_0x4c2162["length"] === 0x0) throw new Error("该设备没有DFU接口");
            await this["fixInterfaceNames"](_0x3e112c, _0x4c2162);
            let _0x3788d4 = new b(_0x3e112c, _0x4c2162[0x0]);
            await _0x3788d4["open"]();
            const _0xb78e8 = await this["getDFUDescriptorProperties"](_0x3788d4);
            return _0xb78e8 && Object["keys"](_0xb78e8)["length"] > 0x0 && (_0x3788d4["properties"] = _0xb78e8, this["log"]("DFU功能描述符: WillDetach" + '=' + _0xb78e8["WillDetach"] + (", CanUploa" + 'd=') + _0xb78e8["CanUpload"] + (", CanDnloa" + 'd=') + _0xb78e8["CanDnload"] + (", TransferSize=") + _0xb78e8["TransferSi" + 'ze']), _0xb78e8["CanDnload"] && (this["manifestationToleran" + 't'] = _0xb78e8["ManifestationToleran" + 't'] ?? !0x0), _0xb78e8["DFUVersion"] === 0x11a && _0x3788d4["settings"]["alternate"]["interfaceProtocol"] === 0x2 && (_0x3788d4 = new w(_0x3e112c, _0x3788d4["settings"]), this["log"]("检测到DfuSe设备"))), this["setupCustomProgress"](_0x3788d4), this["log"]("DFU设备配置完成"), _0x3788d4;
        } catch (_0x32d856) {
            throw this["log"]("DFU连接失败: " + _0x32d856["message"]), _0x32d856;
        }
    }
    async ["pickDfuDevice"]() {
        const _0x289e32 = _0x105040,
            _0x3a0196 = _0x44198d(),
            _0x4b3b0a = this["buildDfuFilters"](),
            _0x4d71e9 = await this["pollGrantedDfuDevice"](_0x3a0196 ? $ : 0x0);
        if (_0x4d71e9) return this["log"]("已授权设备中存在 DFU 设备，跳过设备" + '选择'), _0x4d71e9;
        try {
            return await navigator["usb"]["requestDevice"]({
                'filters': _0x4b3b0a
            });
        } catch (_0x2a299a) {
            if (this["log"]("requestDevice 未取到设备:" + '\x20' + _0x2a299a["message"]), _0x3a0196) {
                const _0x44afd9 = await this["pollGrantedDfuDevice"](L);
                if (_0x44afd9) return this["log"]("Electron 环境：等待后从已授权设备中找到 DFU 设" + '备'), _0x44afd9;
                throw new E("未找到DFU设备，请确认设备已进入升级模" + '式');
            }
            throw new E("未找到DFU设备，请确认设备已进入升级模" + '式');
        }
    }
    async ["pollGrantedDfuDevice"](_0x5ebc49) {
        const _0x45b9e3 = _0x105040,
            _0x129a55 = Date["now"]() + _0x5ebc49;
        for (;;) {
            const _0x31727e = await this["findGrantedDfuDevice"]();
            if (_0x31727e) return _0x31727e;
            if (Date["now"]() >= _0x129a55) return null;
            await new Promise(_0x1c177a => setTimeout(_0x1c177a, v));
        }
    }
    async ["findGrantedDfuDevice"]() {
        const _0x9b1dc = _0x105040;
        try {
            return (await navigator["usb"]["getDevices"]())["find"](_0x57caec => !!this["findDeviceConfig"](_0x57caec["vendorId"], _0x57caec["productId"])) || null;
        } catch (_0x257634) {
            return this["log"]("读取已授权USB设备失败: " + _0x257634["message"]), null;
        }
    } ["buildDfuFilters"]() {
        const _0x2ea6ed = _0x105040;
        return I["map"](_0x23174b => ({
            'vendorId': _0x23174b["vendorId"],
            'productId': _0x23174b["productId"]
        }));
    } ["setupCustomProgress"](_0x4c414c) {
        const _0x3bf10a = _0x105040,
            _0x28dba8 = _0x4c414c["logProgres" + 's']["bind"](_0x4c414c);
        _0x4c414c["logProgres" + 's'] = (_0xdce3d, _0x5c0a57) => {
            const _0x33eb0e = _0x3bf10a;
            var _0x55550e, _0x21e8d7, _0x4b8fde, _0x7d3da7, _0x3126ca, _0x58a298;
            if (typeof _0x5c0a57 < 'u') {
                if (_0x4c414c instanceof w) {
                    const _0x2f58e7 = this["progressStatus"]["phase"],
                        _0x14d793 = _0x4c414c["getProgressStatus"]();
                    _0x14d793["phase"] === "erasing" ? (_0x21e8d7 = (_0x55550e = this["callbacks"])["onProgress"]) == null || _0x21e8d7["call"](_0x55550e, _0x14d793["eraseProgress"], "erase", this["currentUpgradeType"]) : _0x14d793["phase"] === "writing" && ((_0x7d3da7 = (_0x4b8fde = this["callbacks"])["onProgress"]) == null || _0x7d3da7["call"](_0x4b8fde, _0x14d793["writeProgress"], "write", this["currentUpgradeType"])), _0x14d793["phase"] !== _0x2f58e7 && ((_0x58a298 = (_0x3126ca = this["callbacks"])["onPhaseChange"]) == null || _0x58a298["call"](_0x3126ca, _0x14d793["phase"])), this["progressStatus"] = {
                        ..._0x14d793
                    };
                }
                this["log"]("进度: " + _0xdce3d + '/' + _0x5c0a57 + '\x20(' + Math["round"](_0xdce3d / _0x5c0a57 * 0x64) + '%)');
            }
            _0x28dba8(_0xdce3d, _0x5c0a57);
        };
    }
    async ["fixInterfaceNames"](_0x5e3584, _0x5bfafa) {
        const _0x425809 = _0x105040;
        var _0x3f0303, _0x40ebf3;
        if (_0x5bfafa["some"](_0x266db5 => _0x266db5["name"] == null)) {
            const _0xfc1fd0 = new b(_0x5e3584, _0x5bfafa[0x0]);
            await _0xfc1fd0["device_"]["open"](), await _0xfc1fd0["device_"]["selectConfiguration"](0x1);
            const _0x5b3373 = await _0xfc1fd0["readInterfaceNames"]();
            await _0xfc1fd0["close"]();
            for (const _0x1a5b19 of _0x5bfafa)
                if (_0x1a5b19["name"] === null || _0x1a5b19["name"] === void 0x0) {
                    const _0x3d9795 = _0x1a5b19["configuration"]["configurationValue"],
                        _0x807113 = _0x1a5b19["interface"]["interfaceNumber"],
                        _0x5558dc = _0x1a5b19["alternate"]["alternateSetting"],
                        _0xb2bee = ((_0x40ebf3 = (_0x3f0303 = _0x5b3373[_0x3d9795]) == null ? void 0x0 : _0x3f0303[_0x807113]) == null ? void 0x0 : _0x40ebf3[_0x5558dc]) || void 0x0;
                    _0xb2bee !== void 0x0 && (_0x1a5b19["name"] = _0xb2bee);
                }
        }
    }
    async ["getDFUDescriptorProperties"](_0x2aac2c) {
        const _0x1c2214 = _0x105040;
        try {
            const _0x55bd50 = await _0x2aac2c["readConfigurationDescriptor"](0x0),
                _0x450090 = d["parseConfigurationDescriptor"](_0x55bd50);
            let _0x5d0572 = null;
            const _0x4385b4 = _0x2aac2c["settings"]["configuration"]["configurationValue"];
            if (_0x450090["bConfigurationValue"] === _0x4385b4) {
                for (const _0x51f1cd of _0x450090["descriptor" + 's'])
                    if (_0x51f1cd["bDescriptorType"] === 0x21 && Object["prototype"]["hasOwnProperty"]["call"](_0x51f1cd, "bcdDFUVersion")) {
                        _0x5d0572 = _0x51f1cd;
                        break;
                    }
            }
            return _0x5d0572 ? {
                'WillDetach': (_0x5d0572["bmAttribut" + 'es'] & 0x8) !== 0x0,
                'ManifestationTolerant': (_0x5d0572["bmAttribut" + 'es'] & 0x4) !== 0x0,
                'CanUpload': (_0x5d0572["bmAttribut" + 'es'] & 0x2) !== 0x0,
                'CanDnload': (_0x5d0572["bmAttribut" + 'es'] & 0x1) !== 0x0,
                'TransferSize': _0x5d0572["wTransferSize"],
                'DetachTimeOut': _0x5d0572["wDetachTimeOut"],
                'DFUVersion': _0x5d0572["bcdDFUVersion"]
            } : {};
        } catch (_0x1ea703) {
            return this["log"]("读取DFU描述符失败" + ':\x20' + _0x1ea703), {};
        }
    }
    async ["readAndCompare"](_0x5114df, _0x3b83dc, _0x1592ad, _0x107298, _0x50e17a, _0xba8026) {
        const _0x1e8823 = _0x105040;
        if (!_0x1592ad || _0x107298 < 0x0) return !0x0;
        try {
            if (this["log"]("开始固件比较: 偏移=0x" + _0x107298["toString"](0x10) + ", 长度=" + _0x50e17a), _0x107298 >= _0x3b83dc["length"]) return this["log"]("比较偏移超出文件范围" + ':\x20' + _0x107298 + " >= " + _0x3b83dc["length"]), !0x1;
            const _0x52dba8 = Math["min"](_0x50e17a, _0x3b83dc["length"] - _0x107298);
            if (_0x52dba8 <= 0x0) return this["log"]("比较长度无效或超出文件范围"), !0x1;
            const _0x52d7e1 = _0x3b83dc["slice"](_0x107298, _0x107298 + _0x52dba8);
            this["log"]("固件比较数据已提取，长度: " + _0x52d7e1["length"] + " 字节"), _0x5114df instanceof w && (_0x5114df["startAddre" + 'ss'] = _0xba8026 + _0x107298, (!_0x5114df["memoryInfo"] || !_0x5114df["memoryInfo"]["segments"]) && (this["log"]("DfuSe设备缺少内存映射信息，使用默认" + '配置'), _0x5114df["memoryInfo"] = {
                'name': "Default",
                'segments': [{
                    'start': _0xba8026,
                    'end': _0xba8026 + _0x50e17a + 0x1000,
                    'sectorSize': 0x1000,
                    'readable': !0x0,
                    'erasable': !0x0,
                    'writable': !0x0
                }]
            }));
            const _0x54d410 = Math["min"](_0x50e17a, 0x100);
            this["log"]("尝试读取设备数据，长度: " + _0x54d410 + " 字节");
            const _0xc2e8d0 = await _0x5114df["do_upload"](this["transferSi" + 'ze'], _0x54d410 + 0x8),
                _0x5cb37a = new Uint8Array(await _0xc2e8d0["arrayBuffe" + 'r']());
            this["log"]("设备读取数据长度: " + _0x5cb37a["length"] + " 字节"), this["log"]("固件比较数据长度: " + _0x52d7e1["length"] + " 字节");
            const _0x3bf464 = Math["min"](_0x52d7e1["length"], _0x5cb37a["length"]);
            if (this["log"]("实际比较长度: " + _0x3bf464 + " 字节"), _0x3bf464 <= 0x0) return this["log"]("没有数据可供比较"), !0x1;
            for (let _0xd975a7 = 0x0; _0xd975a7 < _0x3bf464; _0xd975a7++)
                if (_0x52d7e1[_0xd975a7] !== _0x5cb37a[_0xd975a7]) return this["log"]('第\x20' + _0xd975a7 + (" 字节不匹配: 固件=0x") + _0x52d7e1[_0xd975a7]["toString"](0x10)["padStart"](0x2, '0') + ", 设备=0x" + _0x5cb37a[_0xd975a7]["toString"](0x10)["padStart"](0x2, '0')), !0x1;
            return this["log"]("固件比较成功"), !0x0;
        } catch (_0x880f25) {
            return this["log"]("固件比较过程中出错:" + '\x20' + _0x880f25), _0x880f25 instanceof Error && this["log"]("错误详情: " + _0x880f25["message"]), !0x1;
        }
    }
    async ["upgradeFirmware"](_0x31b7df, _0x4e968f, _0x3ea3ab) {
        const _0x57db29 = _0x105040;
        var _0x304ad8, _0x23d988;
        if (this["progressStatus"] = {
                'phase': "idle",
                'eraseProgress': 0x0,
                'writeProgress': 0x0
            }, this["detectBlockSize"](_0x4e968f), _0x31b7df instanceof w) {
            if (_0x31b7df["startAddre" + 'ss'] = _0x3ea3ab, !_0x31b7df["memoryInfo"] || !_0x31b7df["memoryInfo"]["segments"]) {
                this["log"]("DfuSe设备缺少内存映射信息，创建完整" + '映射');
                const _0x43e0f0 = _0x4e968f["length"],
                    _0x520074 = _0x43e0f0 > 0x200 * 0x400 ? 0x2000 : 0x1000,
                    _0x1d725c = Math["ceil"](_0x43e0f0 / _0x520074);
                _0x31b7df["memoryInfo"] = {
                    'name': "AutoGeneratedFirmwareMap",
                    'segments': [{
                        'start': _0x3ea3ab,
                        'end': _0x3ea3ab + _0x1d725c * _0x520074,
                        'sectorSize': _0x520074,
                        'readable': !0x0,
                        'erasable': !0x0,
                        'writable': !0x0
                    }]
                }, this["log"]("创建内存映射: 起始=0x" + _0x3ea3ab["toString"](0x10) + ", 结束=0x" + _0x31b7df["memoryInfo"]["segments"][0x0]["end"]["toString"](0x10) + ", 扇区大小=0x" + _0x520074["toString"](0x10) + ", 扇区数=" + _0x1d725c);
            } else {
                const _0x3d832d = _0x31b7df["getSegment"](_0x3ea3ab),
                    _0x5df246 = _0x31b7df["getSegment"](_0x3ea3ab + _0x4e968f["length"] - 0x1);
                if ((!_0x3d832d || !_0x5df246) && (this["log"]("现有内存映射不完整，扩展映射"), _0x31b7df["memoryInfo"]["segments"]["length"] > 0x0)) {
                    const _0x3d9531 = _0x31b7df["memoryInfo"]["segments"][0x0],
                        _0x222e94 = _0x3ea3ab + _0x4e968f["length"];
                    _0x222e94 > _0x3d9531["end"] && (this["log"]("扩展段: 从 0x" + _0x3d9531["end"]["toString"](0x10) + " 到 0x" + _0x222e94["toString"](0x10)), _0x3d9531["end"] = _0x222e94);
                }
            }
        }
        const _0x2da6e5 = new Uint8Array(_0x4e968f["buffer"])["buffer"],
            _0x1c4353 = _0x4e968f["length"],
            _0x5c655b = _0x3ea3ab + _0x1c4353;
        if (this["log"]("固件信息: 大小=" + _0x1c4353 + (" 字节, 起始地址=" + '0x') + _0x3ea3ab["toString"](0x10) + ", 结束地址=0x" + _0x5c655b["toString"](0x10)), _0x31b7df instanceof w) try {
            if (!_0x31b7df["getSegment"](_0x3ea3ab)) throw new Error("起始地址 0x" + _0x3ea3ab["toString"](0x10) + " 不在内存映射中");
            if (!_0x31b7df["getSegment"](_0x5c655b - 0x1)) throw new Error("结束地址 0x" + _0x5c655b["toString"](0x10) + " 不在内存映射中");
            this["log"]("内存映射验证通过");
        } catch (_0x5b807e) {
            this["log"]("内存映射检查失败: " + _0x5b807e);
            const _0x3000c6 = ((_0x23d988 = (_0x304ad8 = _0x31b7df["memoryInfo"]) == null ? void 0x0 : _0x304ad8["segments"][0x0]) == null ? void 0x0 : _0x23d988["sectorSize"]) || 0x1000,
                _0xba1ff2 = Math["ceil"](_0x5c655b / _0x3000c6) * _0x3000c6;
            _0x31b7df["memoryInfo"] = {
                'name': "AutoGeneratedMap",
                'segments': [{
                    'start': _0x3ea3ab,
                    'end': _0xba1ff2,
                    'sectorSize': _0x3000c6,
                    'readable': !0x0,
                    'erasable': !0x0,
                    'writable': !0x0
                }]
            }, this["log"]("重新生成内存映射: 起始=0x" + _0x3ea3ab["toString"](0x10) + ", 结束=0x" + _0xba1ff2["toString"](0x10));
        }
        await _0x31b7df["do_downloa" + 'd'](this["transferSi" + 'ze'], _0x2da6e5, this["manifestationToleran" + 't']), this["log"]("固件升级完成");
    } ["detectBlockSize"](_0x17246a) {
        const _0xba8a29 = _0x105040;
        this["transferSi" + 'ze'] = _0x17246a["length"] >= 0x1000 ? 0x1000 : 0x400, this["log"]("检测到块大小: " + this["transferSi" + 'ze'] + " 字节");
    }
    async ["performDfuReset"](_0x4726e3) {
        const _0x116332 = _0x105040;
        try {
            this["log"]("开始DFU复位流程." + '..');
            let _0x49d772;
            try {
                _0x49d772 = await _0x4726e3["getStatus"](), this["log"]("当前状态: state=0x" + _0x49d772["state"]["toString"](0x10) + (", status=0" + 'x') + _0x49d772["status"]["toString"](0x10));
            } catch {
                return this["log"]("无法获取设备状态，可能设备已自动重启"), !0x0;
            }
            const _0x3e79f1 = [d["dfuIDLE"], d["dfuDNLOAD_SYNC"], d["dfuDNBUSY"], d["dfuDNLOAD_IDLE"], d["dfuMANIFEST_SYNC"], d["dfuMANIFES" + 'T'], d["dfuMANIFEST_WAIT_RES" + 'ET'], d["dfuUPLOAD_IDLE"], d["dfuERROR"]];
            if (!_0x3e79f1["includes"](_0x49d772["state"])) return this["log"]("设备已处于应用模式(state=0x" + _0x49d772["state"]["toString"](0x10) + ")，无需复位"), !0x0;
            this["log"]("设备仍在DFU模式，需要复位"), _0x49d772["state"] === d["dfuERROR"] && (this["log"]("清除错误状态"), await _0x4726e3["clearStatu" + 's'](), _0x49d772 = await _0x4726e3["getStatus"](), this["log"]("清除后状态: state=0x" + _0x49d772["state"]["toString"](0x10))), this["log"]("发送零长度包完成manifestatio" + 'n'), await _0x4726e3["download"](new Uint8Array(0x0), 0x0), this["log"]("等待设备重启..."), await new Promise(_0x51b919 => setTimeout(_0x51b919, 0x7d0));
            try {
                const _0x134387 = await _0x4726e3["getStatus"]();
                this["log"]("复位后状态: state=0x" + _0x134387["state"]["toString"](0x10)), _0x3e79f1["includes"](_0x134387["state"]) && (this["log"]("设备仍在DFU模式，尝试强制复位"), await _0x4726e3["abort"](), await new Promise(_0x59c730 => setTimeout(_0x59c730, 0x3e8)));
            } catch {
                this["log"]("设备已重启，无法获取" + '状态');
            }
            return this["log"]("DFU复位流程完成"), !0x0;
        } catch (_0x1f8dd8) {
            return this["log"]("DFU复位流程失败:" + '\x20' + _0x1f8dd8["message"]), !0x1;
        }
    }
    async ["exitDfuMod" + 'e'](_0x17cb19) {
        const _0x4b6129 = _0x105040;
        if (!_0x17cb19) {
            this["log"]("没有DFU设备需要退" + '出');
            return;
        }
        try {
            this["log"]("安全退出DFU模式." + '..'), await this["performDfuReset"](_0x17cb19) || this["log"]("复位失败，尝试强制关" + '闭'), await _0x17cb19["close"](), this["log"]("DFU设备连接已关闭");
        } catch (_0x495b93) {
            this["log"]("退出DFU模式过程中出错: " + _0x495b93["message"]);
            try {
                await _0x17cb19["close"](), this["log"]("DFU设备已强制关闭");
            } catch (_0x1abe45) {
                this["log"]("关闭DFU设备失败:" + '\x20' + _0x1abe45["message"]);
            }
        }
    } ["isDfuSuffixValid"](_0x4bd179, _0x3ba96f, _0x8f6412, _0x27b05c, _0x144d31, _0x335504) {
        const _0x435afc = _0x105040;
        try {
            if (_0x4bd179["length"] < 0x10 || _0x4bd179["length"] > _0x3ba96f * 1.1) return this["log"]("文件大小检查失败"), !0x1;
            const _0x3cd3cd = _0x4bd179["slice"](_0x4bd179["length"] - 0x10);
            if (!(_0x3cd3cd[0x0] === 0xff && _0x3cd3cd[0x1] === 0xff && _0x3cd3cd[0x8] === 0x55 && _0x3cd3cd[0x9] === 0x46 && _0x3cd3cd[0xa] === 0x44 && _0x3cd3cd[0xb] === 0x10)) return this["log"]("DFU后缀格式错误"), !0x1;
            const _0x4bf325 = _0x3cd3cd[0x3] << 0x8 | _0x3cd3cd[0x2];
            if ((_0x3cd3cd[0x5] << 0x8 | _0x3cd3cd[0x4]) !== _0x8f6412 || _0x4bf325 !== _0x27b05c) return this["log"]("DFU后缀型号不匹配"), !0x1;
            let _0x459b07 = _0x3cd3cd[0xc] | _0x3cd3cd[0xd] << 0x8 | _0x3cd3cd[0xe] << 0x10 | _0x3cd3cd[0xf] << 0x18 >>> 0x0;
            _0x459b07 = _0x459b07 > 0x0 ? _0x459b07 : ~_0x459b07 | 0x0;
            const _0x4ede13 = _0x4bd179["slice"](0x0, _0x4bd179["length"] - 0x4);
            let _0x40096f = x(_0x4ede13);
            if (_0x40096f = _0x40096f > 0x0 ? _0x40096f : ~_0x40096f | 0x0, _0x459b07 !== _0x40096f) return this["log"]("DFU后缀校验和错误"), !0x1;
            if (_0x144d31 !== null) {
                if (_0x335504 < 0x0 || _0x335504 + _0x144d31["length"] > _0x4bd179["length"]) return this["log"]("比较偏移量超出范围"), !0x1;
                if (new TextDecoder()["decode"](_0x4bd179["slice"](_0x335504, _0x335504 + _0x144d31["length"])) !== _0x144d31) return this["log"]("固件内容不匹配"), !0x1;
            }
            return !0x0;
        } catch (_0x5dd864) {
            return this["log"]("处理文件时出错: " + _0x5dd864), !0x1;
        }
    } ["getCurrentConfig"]() {
        const _0x1fdccb = _0x105040;
        return this["currentConfig"];
    } ["getAllDeviceConfigs"]() {
        return I;
    } ["getProgressStatus"]() {
        const _0x46cd47 = _0x105040;
        return {
            ...this["progressStatus"]
        };
    } ["resetState"]() {
        const _0x1d615f = _0x105040;
        this["currentUpgradeType"] = null, this["progressStatus"] = {
            'phase': "idle",
            'eraseProgress': 0x0,
            'writeProgress': 0x0
        };
    }
}
export {
    E as D, R as U, x as c, F as s
};