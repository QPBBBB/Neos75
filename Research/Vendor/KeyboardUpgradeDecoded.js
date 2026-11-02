const _0x4b8094 = _0x2769; /* string alignment removed */ /* string table removed */
var u = Object["defineProperty"],
    f = (_0x30fd9e, _0x34c5f0, _0x568738) => _0x34c5f0 in _0x30fd9e ? u(_0x30fd9e, _0x34c5f0, {
        'enumerable': !0x0,
        'configurable': !0x0,
        'writable': !0x0,
        'value': _0x568738
    }) : _0x30fd9e[_0x34c5f0] = _0x568738,
    o = (_0x3074f0, _0x20fd90, _0x9f2380) => f(_0x3074f0, typeof _0x20fd90 != "symbol" ? _0x20fd90 + '' : _0x20fd90, _0x9f2380);
import {
    U as _0xdc8b4f,
    l as _0x492914,
    m as _0x57cda4,
    r as _0x8f3aca,
    ah as _0xfaf50d,
    h as _0xdc867a,
    x as _0x35d021,
    be as _0x11d57a,
    bw as _0x287628
} from './index-CeAyNk8A.js';
import {
    g as _0xa6d61b
} from './DXP2vmE9.js';
import {
    g as _0x3108de,
    a as _0x3a495a
} from './eoiLKK-N.js';
import {
    U,
    D as _0x26ed36
} from './DjHZQ_th.js';
import {
    al as _0x5b1075
} from './TglCKVxb.js';
import './dsW7I39g.js';
import './DziNxeDg.js'; /* decoder removed */
class N {
    constructor(_0x52dac1, _0x5ab86d) {
        const _0x2ef292 = _0x4b8094;
        o(this, "store"), o(this, "ServiceDevice"), o(this, "defaultPageData"), o(this, "productVersion"), o(this, "upgradeCor" + 'e', null), o(this, "pendingFirmware", null), o(this, "activeData", _0x5b1075({
            'pdfUrl': '',
            'versionList': [],
            'progress': 0x0,
            'otherCondition': !0x1,
            'step': 0x1,
            'diaVisible': !0x1,
            'activeVersion': '',
            'activeBinBlob': [],
            'requestFinish': !0x1,
            'latestVersion': '',
            'downloadUrl': '',
            'driverGuideVisible': !0x1
        })), (this["store"] = _0x52dac1, this["ServiceDevice"] = _0x5ab86d, this["defaultPageData"] = _0xdc8b4f(this["activeData"]));
    }
    async ["onMountedF" + 'n']() {
        const _0x17727c = _0x4b8094;
        this["getPDF"](), await this["getAllBin"]();
    }
    async ["resetDevic" + 'e']() {
        const _0x5aca3e = _0x4b8094;
        await _0x492914["confirm"]('' + _0x57cda4["global"]['t']("reSet.message13"), '' + _0x57cda4["global"]['t']("reSet.titl" + 'e9'), {
            'confirmButtonText': _0x57cda4["global"]['t']("reSet.confirmText"),
            'cancelButtonText': _0x57cda4["global"]['t']("reSet.cancelText")
        })["then"](async () => {
            const _0x1f5d53 = _0x5aca3e;
            var _0x3a3702;
            await ((_0x3a3702 = this["ServiceDevice"]) == null ? void 0x0 : _0x3a3702["restoreDevParaToFactorySetting" + 's']()), await _0x8f3aca["push"]({
                'path': "/checkDevi" + 'ce'
            });
        })["catch"](() => {});
    }
    async ["goUpdate"]() {
        const _0x1024f2 = _0x4b8094;
        var _0x780eaa;
        this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["activeData"]["diaVisible"] = !0x0, (_0x780eaa = this["activeData"]["versionLis" + 't']) != null && _0x780eaa["length"] && (this["activeData"]["activeVersion"] = this["activeData"]["versionLis" + 't'][0x0]["version"], await this["getBinFile"](this["activeData"]["versionLis" + 't'][0x0]));
    } ["getPDF"]() {
        const _0x84d4ac = _0x4b8094;
        this["activeData"]["pdfUrl"] = '', _0xa6d61b({
            'pid': "AULA-Neos7" + '5',
            'vid': "AULA-Neos7" + '5',
            'productName': "AULA-Neos7" + '5'
        })["then"](_0x1aee01 => {
            const _0x2ef3e7 = _0x84d4ac;
            this["activeData"]["pdfUrl"] = _0xfaf50d + _0x1aee01;
        })["catch"](() => {});
    }
    async ["getAllBin"]() {
        const _0x2a089c = _0x4b8094;
        var _0x5b4495;
        const _0x5a0ea6 = this["store"]["deviceInfo"];
        if (_0x5a0ea6) try {
            const _0x1eb6c9 = await _0x3108de({
                    'pid': _0x5a0ea6["pId"],
                    'vid': _0x5a0ea6["vId"],
                    'productName': _0xdc867a(_0x5a0ea6["customName"]) ? _0x5a0ea6["customName"] : _0x5a0ea6["pName"]
                }),
                _0x136d1a = this["pickMcuFirmwareList"](_0x1eb6c9);
            if (!_0x136d1a["length"]) return;
            this["activeData"]["versionLis" + 't'] = [], _0x136d1a["forEach"](_0x1f7a61 => {
                const _0x3e0e39 = _0x2a089c,
                    _0x5c7450 = this["activeData"]["versionLis" + 't']["findIndex"](_0x15e650 => _0x15e650["version"] === _0x1f7a61["version"]);
                _0x5c7450 !== -0x1 ? this["activeData"]["versionLis" + 't'][_0x5c7450]["ids"]["push"]({
                    'label': _0x1f7a61["label"],
                    'id': _0x1f7a61['id']
                }) : this["activeData"]["versionLis" + 't']["push"]({
                    'version': _0x1f7a61["version"],
                    'ids': [{
                        'label': _0x1f7a61["label"],
                        'id': _0x1f7a61['id']
                    }]
                });
            }), this["activeData"]["latestVersion"] = ((_0x5b4495 = this["activeData"]["versionLis" + 't'][0x0]) == null ? void 0x0 : _0x5b4495["version"]) || '';
        } catch (_0x31ea19) {
            console["error"]("[yb] 获取云端固件失败:", _0x31ea19);
        }
    } ["pickMcuFirmwareList"](_0x4fc29e) {
        const _0x1cc086 = _0x4b8094;
        if (!(_0x4fc29e != null && _0x4fc29e["length"])) return [];
        console["log"]("[yb] 云端固件列" + '表:', _0x4fc29e);
        const _0x12d9ba = _0x4fc29e["filter"](_0x58e43a => /mcu|键盘|主控/i ["test"]((_0x58e43a == null ? void 0x0 : _0x58e43a["label"]) || '')),
            _0x3bd67c = _0x12d9ba["length"] ? _0x12d9ba : [..._0x4fc29e],
            _0x2fbe66 = _0x3bd67c["findIndex"](_0x2d9473 => _0x2d9473 == null ? void 0x0 : _0x2d9473["latest"]);
        return _0x2fbe66 > 0x0 && _0x3bd67c["unshift"](_0x3bd67c["splice"](_0x2fbe66, 0x1)[0x0]), _0x3bd67c;
    }
    async ["getBinFile"](_0x164065) {
        const _0xdabddb = _0x4b8094;
        var _0x5837b5;
        if (this["activeData"]["activeBinBlob"] = [], this["activeData"]["requestFinish"] = !0x0, (_0x5837b5 = _0x164065 == null ? void 0x0 : _0x164065["ids"]) != null && _0x5837b5["length"]) try {
            for (const _0x54588e of _0x164065["ids"]) {
                const _0x19fd55 = await _0x3a495a(_0x54588e['id']);
                this["activeData"]["activeBinBlob"]["push"]({
                    'label': _0x54588e["label"],
                    'blobFile': _0x19fd55
                });
            }
        } catch (_0x71df5e) {
            console["error"]("[yb] 下载固件失" + '败:', _0x71df5e);
        }
        this["activeData"]["requestFinish"] = !0x1;
    } ["changeBinVersion"]() {
        const _0x49b8c4 = _0x4b8094,
            _0x427584 = this["activeData"]["versionLis" + 't']["find"](_0x1eb294 => _0x1eb294["version"] === this["activeData"]["activeVersion"]);
        _0x427584 && this["getBinFile"](_0x427584);
    }
    async ["startUpdat" + 'e']() {
        const _0x4009b9 = _0x4b8094;
        var _0x446991;
        if (this["store"]["isBinUpdating"]) return;
        if (!((_0x446991 = this["activeData"]["activeBinBlob"]) != null && _0x446991["length"])) {
            await _0x492914["alert"](_0x57cda4["global"]['t']("dfu.noCloudFirmware"), _0x57cda4["global"]['t']("version.text10"));
            return;
        }
        try {
            await _0x492914["confirm"](_0x57cda4["global"]['t']("dfu.warnin" + 'g'), _0x57cda4["global"]['t']("version.text10"));
        } catch {
            return;
        }
        const _0x43a3bd = await this["resolveFirmware"]();
        if (!_0x43a3bd) return;
        const _0x139f00 = await this["getHidDevi" + 'ce']();
        if (!_0x139f00) {
            await _0x492914["alert"](_0x57cda4["global"]['t']("dfu.noDevi" + 'ce'), _0x57cda4["global"]['t']("version.text10"));
            return;
        }
        const _0x166615 = new U();
        _0x166615["setCallbac" + 'ks']({
            'onProgress': (_0x4d9125, _0x56246b) => {
                const _0x181140 = _0x4009b9;
                this["activeData"]["progress"] = _0x56246b === "erase" ? Math["round"](_0x4d9125 * 0.39) : 0x27 + Math["round"](_0x4d9125 * 0.6);
            }
        }), this["upgradeCor" + 'e'] = _0x166615, this["pendingFirmware"] = _0x43a3bd, this["activeData"]["step"] = 0x2, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["store"]["isBinUpdating"] = !0x0;
        try {
            await _0x166615["sendPrepareCommand"](_0x139f00), await _0x166615["sendDFUCommand"](_0x139f00);
        } catch (_0x2bf01e) {
            console["error"]("[yb] 进入升级模式失败:", _0x2bf01e), this["store"]["isBinUpdating"] = !0x1, this["resetUpgradeContext"](), this["resetProgress"](), await _0x492914["alert"]((_0x2bf01e == null ? void 0x0 : _0x2bf01e["message"]) || _0x57cda4["global"]['t']("dfu.failed"), _0x57cda4["global"]['t']("version.text10"));
            return;
        }
        await this["flashFirmware"]();
    }
    async ["retryUpdat" + 'e']() {
        const _0x55c704 = _0x4b8094;
        this["store"]["isBinUpdating"] || !this["upgradeCor" + 'e'] || !this["pendingFirmware"] || (this["activeData"]["driverGuideVisible"] = !0x1, this["activeData"]["diaVisible"] = !0x0, this["activeData"]["step"] = 0x2, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["store"]["isBinUpdating"] = !0x0, await this["flashFirmware"]());
    } ["cancelDriverGuide"]() {
        const _0x4339a5 = _0x4b8094;
        this["activeData"]["driverGuideVisible"] = !0x1, this["resetUpgradeContext"](), this["resetProgress"](), _0x35d021(_0x57cda4["global"]['t']("dfu.driverGuideAbort"), "warning");
    } ["downloadWinUSB"]() {
        _0x11d57a(_0x287628);
    }
    async ["flashFirmware"]() {
        const _0x408f8d = _0x4b8094,
            _0x21f2b7 = this["upgradeCor" + 'e'],
            _0x312e9d = this["pendingFirmware"];
        if (!_0x21f2b7 || !_0x312e9d) return;
        let _0x2b5ae3 = null;
        try {
            _0x2b5ae3 = await _0x21f2b7["connectDFUDevice"]();
            const _0x50b80c = _0x21f2b7["getCurrentConfig"]();
            if (!_0x50b80c) throw new Error(_0x57cda4["global"]['t']("dfu.configMissing"));
            if (_0x21f2b7["setCurrentUpgradeTyp" + 'e']("mcu"), !_0x21f2b7["isDfuSuffixValid"](_0x312e9d, _0x50b80c["mcuMax"], _0x50b80c["vendorId"], _0x50b80c["productId"], _0x50b80c["mcuCompare"], _0x50b80c["mcuFileCompareOffset"])) throw new Error(_0x57cda4["global"]['t']("dfu.invalidFile"));
            if (!await _0x21f2b7["readAndCompare"](_0x2b5ae3, _0x312e9d, _0x50b80c["mcuFileCompareEnable"], _0x50b80c["mcuFileCompareOffset"], _0x50b80c["mcuFileCompareLength"], _0x50b80c["mcuStartAd" + 'dr'])) throw new Error(_0x57cda4["global"]['t']("dfu.verifyFailed"));
            await _0x21f2b7["upgradeFirmware"](_0x2b5ae3, _0x312e9d, _0x50b80c["mcuStartAd" + 'dr']), this["activeData"]["progress"] = 0x64, this["activeData"]["otherCondition"] = !0x0, this["resetUpgradeContext"]();
        } catch (_0x1b0a63) {
            if (console["error"]("[yb] 固件升级失" + '败:', _0x1b0a63), this["resetProgress"](), _0x21f2b7["resetState"](), _0x1b0a63 instanceof _0x26ed36) {
                this["activeData"]["driverGuideVisible"] = !0x0, this["activeData"]["diaVisible"] = !0x1;
                return;
            }
            this["resetUpgradeContext"](), await _0x492914["alert"]((_0x1b0a63 == null ? void 0x0 : _0x1b0a63["message"]) || _0x57cda4["global"]['t']("dfu.failed"), _0x57cda4["global"]['t']("version.text10"));
        } finally {
            try {
                await _0x21f2b7["exitDfuMod" + 'e'](_0x2b5ae3);
            } catch (_0x4efc6c) {
                console["error"]("[yb] 退出DFU模式失败:", _0x4efc6c);
            }
            await new Promise(_0x3d1b43 => setTimeout(_0x3d1b43, 0x5dc)), this["store"]["isBinUpdating"] = !0x1;
        }
    } ["resetProgress"]() {
        const _0x8f116a = _0x4b8094;
        this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1;
    } ["resetUpgradeContext"]() {
        const _0x3fd05f = _0x4b8094;
        this["upgradeCor" + 'e'] = null, this["pendingFirmware"] = null;
    } ["closeDia"]() {
        const _0x5c2408 = _0x4b8094;
        this["activeData"]["step"] === 0x1 && (this["activeData"]["otherCondition"] = !0x1, this["activeData"]["activeVersion"] = '', this["activeData"]["activeBinBlob"] = [], this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["diaVisible"] = !0x1);
    } ["finishedUpdate"]() {
        const _0x7032f1 = _0x4b8094;
        this["resetClass"](), _0x8f3aca["push"]({
            'path': "/checkDevi" + 'ce'
        });
    }
    async ["resolveFirmware"]() {
        const _0x1e6810 = _0x4b8094;
        var _0x595cee, _0x1f605a;
        const _0xa97c29 = (_0x1f605a = (_0x595cee = this["activeData"]["activeBinBlob"]) == null ? void 0x0 : _0x595cee[0x0]) == null ? void 0x0 : _0x1f605a["blobFile"];
        return _0xa97c29 ? new Uint8Array(await _0xa97c29["arrayBuffe" + 'r']()) : (await _0x492914["alert"](_0x57cda4["global"]['t']("dfu.noCloudFirmware"), _0x57cda4["global"]['t']("version.text10")), null);
    }
    async ["getHidDevi" + 'ce']() {
        const _0x1c3741 = _0x4b8094;
        var _0x568285;
        const _0x38bf6c = this["store"]["deviceInfo"];
        if (!_0x38bf6c) return null;
        const _0x1e2dc5 = _0x38bf6c["hidPropert" + 'y'];
        if (_0x1e2dc5 != null && _0x1e2dc5["productId"] && typeof _0x1e2dc5["sendReport"] == "function") return _0x1e2dc5["opened"] || await _0x1e2dc5["open"](), _0x1e2dc5;
        const _0x496bc4 = await navigator["hid"]["getDevices"]();
        for (const _0x5375c0 of _0x496bc4)
            if (!(_0x5375c0["productId"] !== _0x38bf6c["pId"] || _0x5375c0["vendorId"] !== _0x38bf6c["vId"] || !((_0x568285 = _0x5375c0["collection" + 's']) != null && _0x568285["some"](_0x4d12d1 => _0x4d12d1["usagePage"] === _0x38bf6c["usagePage"] && _0x4d12d1["usage"] === _0x38bf6c["usage"])))) return _0x5375c0["opened"] || await _0x5375c0["open"](), _0x5375c0;
        return null;
    } ["resetClass"]() {
        const _0xb2ab41 = _0x4b8094;
        this["resetUpgradeContext"](), Object["assign"](this["activeData"], _0xdc8b4f(this["defaultPageData"]));
    }
}
export {
    N as
    default
};