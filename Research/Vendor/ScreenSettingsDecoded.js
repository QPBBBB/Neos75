const _0x37e8dc = _0xb958; /* string alignment removed */
var L = Object["defineProperty"],
    O = (_0x3c7306, _0x3df783, _0x4cac27) => _0x3df783 in _0x3c7306 ? L(_0x3c7306, _0x3df783, {
        'enumerable': !0x0,
        'configurable': !0x0,
        'writable': !0x0,
        'value': _0x4cac27
    }) : _0x3c7306[_0x3df783] = _0x4cac27,
    f = (_0x2f3adb, _0x4de84e, _0x1716a5) => O(_0x2f3adb, typeof _0x4de84e != "symbol" ? _0x4de84e + '' : _0x4de84e, _0x1716a5);
import {
    bx as _0x4198e1,
    U as _0x444346,
    x as _0x5d1778,
    m as _0x409c0c,
    l as _0x3ea3c2,
    by as _0x1c6809,
    be as _0x18cb21,
    bw as _0x52a40f
} from './index-CeAyNk8A.js';
import {
    c as _0x3c7c1d,
    s as _0x1394f2,
    U as _0x225cde,
    D as _0x568e0b
} from './DjHZQ_th.js';
import {
    g as _0x4c6f39,
    a as _0x108fec
} from './eoiLKK-N.js';
import {
    b as _0x57819e,
    e as _0x5a8da2,
    a as _0x38feb4
} from './B3pNWZgf.js';
import {
    i as _0x5ced20,
    d as _0x4f32f8
} from './9ef2jTqP.js';
import {
    al as _0x38b51f,
    aJ as _0x334e9c,
    av as _0x1edae9
} from './TglCKVxb.js';
import './dsW7I39g.js';
import './DziNxeDg.js'; /* decoder removed */
const p = {
        'CONNECTED': "ybScreen:connected",
        'DISCONNECTED': "ybScreen:disconnecte" + 'd'
    },
    C = [{
        'vId': 0x5542,
        'pId': 0x1,
        'pName': "AULA-Neos75 Screen"
    }],
    S = {
        'SET_NEW': 0xa5,
        'TIME_SETTINGS': 0x38,
        'SCREEN_CONTROL': 0x39,
        'GET_DEVICE_INFO': 0x41,
        'FACTORY_SETTINGS': 0x34
    },
    j = 0x1,
    ee = 0x2,
    T = {
        'IMAGE_SPACE': 0x10,
        'GIF_SPACE': 0x11,
        'COMBINED_DATA': 0x14
    },
    y = {
        'UPDATE': 0xba,
        'JPG_FRAME_HEAD': [0x6, 0xaa, 0xb0],
        'RGB565_FRAME_HEAD': [0x6, 0xaa, 0xfc],
        'JPG_HEADER': [0x55, 0x42],
        'RGB565_HEADER': [0x57, 0x51],
        'SUCCESS': 0xfe
    },
    B = 0x3e,
    w = 0x1000,
    N = 0x40,
    _ = 0.9,
    te = 0x5dc,
    F = "YbScreen",
    E = {
        'FLIP_DOWN': 0x1,
        'FLIP_UP': 0x2,
        'BRIGHTNESS_PLUS': 0xa1,
        'BRIGHTNESS_REDUCTION': 0xa2
    };
class he {
    constructor(_0x56aa13, _0x206c7d) {
        const _0x14ba3c = _0x37e8dc;
        f(this, "store"), f(this, "ServiceDevice"), f(this, "defaultPageData"), f(this, "emitter", new _0x4198e1()), f(this, "listening", !0x1), f(this, "updateType", "mcu"), f(this, "upgradeCor" + 'e', null), f(this, "pendingFirmware", null), f(this, "pendingFirmwareType", null), f(this, "mcuVersionList", []), f(this, "uiVersionList", []), f(this, "pictureSaveQueue", Promise["resolve"]()), f(this, "activeData", _0x38b51f({
            'device': null,
            'versionList': [],
            'activeVersion': '',
            'activeBinBlob': [],
            'requestFinish': !0x1,
            'step': 0x1,
            'progress': 0x0,
            'otherCondition': !0x1,
            'diaVisible': !0x1,
            'latestVersion': '',
            'screenInfo': null,
            'pictureData': '',
            'pictureCrop': '',
            'pictureRect': null,
            'driverGuideVisible': !0x1,
            'pictureApply': {
                'diaVisible': !0x1,
                'gifProgress': 0x0
            }
        })), f(this, "onHidConne" + 'ct', _0x3312d6 => {
            const _0x17c9bc = _0x14ba3c;
            this["isScreenDevice"](_0x3312d6["device"]) && this["emitter"]["emit"](p["CONNECTED"], _0x3312d6["device"]);
        }), f(this, "onHidDisconnect", _0x592f62 => {
            const _0x45e203 = _0x14ba3c;
            this["isCurrentScreenDevic" + 'e'](_0x592f62["device"]) && this["emitter"]["emit"](p["DISCONNECT" + 'ED'], _0x592f62["device"]);
        }), f(this, "onDeviceConnected", async _0x154c82 => {
            const _0x5b0632 = _0x14ba3c;
            if (_0x154c82) {
                if (!_0x154c82["opened"]) try {
                    await _0x154c82["open"]();
                } catch (_0x5525ad) {
                    console["error"]("[ybScreen] 打开屏幕设备失败:", _0x5525ad), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.authFailed"), "error");
                    return;
                }
                this["activeData"]["device"] = _0x1edae9(_0x154c82), console["log"]("[ybScreen] 屏幕设备已就绪:", _0x154c82["productNam" + 'e'], _0x154c82["vendorId"], _0x154c82["productId"]), await this["getScreenInfo"](), await this["loadSavedPicture"]();
            }
        }), f(this, "onDeviceDisconnected", _0x15dd69 => {
            const _0x19b583 = _0x14ba3c;
            this["isCurrentScreenDevic" + 'e'](_0x15dd69) && (this["activeData"]["device"] = null, this["activeData"]["screenInfo"] = null, console["log"]("[ybScreen] 屏幕设备已断开:", _0x15dd69["productNam" + 'e']));
        }), (this["store"] = _0x56aa13, this["ServiceDevice"] = _0x206c7d, this["defaultPageData"] = _0x444346(this["activeData"]));
    }
    async ["onMountedF" + 'n']() {
        const _0x1c4b2b = _0x37e8dc;
        this["bindDeviceListener"](), await this["loadSavedPicture"]();
        const [_0x1bbcdf] = await Promise["all"]([this["findAuthorizedScreenDevice"](), this["getAllScreenBin"]()]);
        if (_0x1bbcdf) {
            this["emitter"]["emit"](p["CONNECTED"], _0x1bbcdf);
            return;
        }
        const _0x59231c = await this["requestScreenDevice"]();
        _0x59231c && this["emitter"]["emit"](p["CONNECTED"], _0x59231c);
    }
    async ["onAuthDeviceClick"]() {
        const _0xa0c751 = _0x37e8dc;
        if (!navigator["hid"]) return;
        this["bindDeviceListener"]();
        const _0x366981 = await this["findAuthorizedScreenDevice"]();
        if (_0x366981) {
            this["emitter"]["emit"](p["CONNECTED"], _0x366981), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.authorized"));
            return;
        }
        const _0x407d55 = await this["requestScreenDevice"]();
        _0x407d55 && (this["emitter"]["emit"](p["CONNECTED"], _0x407d55), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.authorized")));
    }
    async ["authDevice"]() {
        const _0x39b293 = _0x37e8dc;
        if (!navigator["hid"]) return;
        const _0x38298e = await this["findAuthorizedScreenDevice"]();
        if (_0x38298e) {
            this["emitter"]["emit"](p["CONNECTED"], _0x38298e);
            return;
        }
        const _0x264d7e = await this["requestScreenDevice"]();
        _0x264d7e && this["emitter"]["emit"](p["CONNECTED"], _0x264d7e);
    }
    async ["requestScreenDevice"]() {
        const _0x4a6213 = _0x37e8dc;
        if (!navigator["hid"]) return null;
        try {
            const _0x2ffa9f = await navigator["hid"]["requestDevice"]({
                'filters': this["buildFilte" + 'rs']()
            });
            return _0x2ffa9f["find"](_0x11d303 => this["isScreenDevice"](_0x11d303)) || _0x2ffa9f[0x0] || null;
        } catch (_0x5d6103) {
            return console["log"]("[ybScreen] 取消屏幕设备授权:", _0x5d6103), null;
        }
    } ["bindDeviceListener"]() {
        const _0x5a974a = _0x37e8dc;
        this["listening"] || !navigator["hid"] || (this["listening"] = !0x0, navigator["hid"]["addEventListener"]("connect", this["onHidConne" + 'ct']), navigator["hid"]["addEventListener"]("disconnect", this["onHidDisconnect"]), this["emitter"]['on'](p["CONNECTED"], this["onDeviceConnected"]), this["emitter"]['on'](p["DISCONNECT" + 'ED'], this["onDeviceDisconnected"]));
    } ["unbindDeviceListener"]() {
        const _0x15ad78 = _0x37e8dc;
        this["listening"] && (this["listening"] = !0x1, navigator["hid"]["removeEventListener"]("connect", this["onHidConne" + 'ct']), navigator["hid"]["removeEventListener"]("disconnect", this["onHidDisconnect"]), this["emitter"]["removeAll"]());
    } ["getDevice"]() {
        const _0xdb4c7e = _0x37e8dc;
        return _0x334e9c(this["activeData"]["device"]);
    }
    async ["updateTime"]() {
        const _0x3e18ec = _0x37e8dc,
            _0x1bd55b = new Date(),
            _0x9ede4e = [0x1, Math["floor"](_0x1bd55b["getFullYea" + 'r']() / 0x100), _0x1bd55b["getFullYea" + 'r']() % 0x100, _0x1bd55b["getMonth"]() + 0x1, _0x1bd55b["getDate"](), _0x1bd55b["getHours"](), _0x1bd55b["getMinutes"](), _0x1bd55b["getSeconds"](), _0x1bd55b["getDay"]()];
        await this["sendScreenCommand"](S["TIME_SETTINGS"], _0x9ede4e) !== null && _0x5d1778(_0x409c0c["global"]['t']("ybScreen.timeUpdated"));
    }
    async ["restartScreen"]() {
        const _0x12a71a = _0x37e8dc;
        await this["sendScreenCommand"](S["FACTORY_SETTINGS"], [j]) !== null && _0x5d1778(_0x409c0c["global"]['t']("ybScreen.screenRestarted"));
    }
    async ["restoreScreen"]() {
        const _0xdb9daa = _0x37e8dc;
        try {
            await _0x3ea3c2["confirm"](_0x409c0c["global"]['t']("ybScreen.factoryResetConfirm"), _0x409c0c["global"]['t']("reSet.titl" + 'e9'), {
                'confirmButtonText': _0x409c0c["global"]['t']("reSet.confirmText"),
                'cancelButtonText': _0x409c0c["global"]['t']("reSet.cancelText")
            });
        } catch {
            return;
        }
        await this["sendScreenCommand"](S["FACTORY_SETTINGS"], [ee]) !== null && _0x5d1778(_0x409c0c["global"]['t']("ybScreen.screenRestored"));
    }
    async ["previousIt" + 'em']() {
        const _0x387e81 = _0x37e8dc;
        await this["sendScreenControl"](E["FLIP_UP"]);
    }
    async ["nextItem"]() {
        const _0x51aed0 = _0x37e8dc;
        await this["sendScreenControl"](E["FLIP_DOWN"]);
    }
    async ["brightness" + 'Up']() {
        const _0x46b91b = _0x37e8dc;
        await this["sendScreenControl"](E["BRIGHTNESS_PLUS"]);
    }
    async ["brightnessDown"]() {
        const _0xa65105 = _0x37e8dc;
        await this["sendScreenControl"](E["BRIGHTNESS_REDUCTION"]);
    }
    async ["sendScreenControl"](_0x560f95) {
        const _0x5066bf = _0x37e8dc;
        await this["sendScreenCommand"](S["SCREEN_CONTROL"], [_0x560f95]);
    }
    async ["readScreenInfo"](_0x81b535) {
        const _0x5b2fa8 = _0x37e8dc,
            _0x32d5dc = await this["sendScreenPacket"](this["buildScreenReadPacke" + 't'](_0x81b535));
        return _0x32d5dc ? _0x32d5dc[0x0] !== S["SET_NEW"] || _0x32d5dc[0x1] !== S["GET_DEVICE_INFO"] || _0x32d5dc[0x4] !== _0x81b535 ? (console["log"]("[ybScreen] 读屏幕信息应答不匹" + '配:', Array["from"](_0x32d5dc)), null) : _0x32d5dc["slice"](0x5) : null;
    }
    async ["getScreenInfo"]() {
        const _0xa400d1 = _0x37e8dc,
            _0x22fd07 = await this["readScreenInfo"](T["COMBINED_DATA"]);
        if (!_0x22fd07 || _0x22fd07["length"] < 0x8) return console["log"]("[ybScreen] 未读到屏幕参数"), null;
        const _0x3cea92 = {
            'vendorId': _0x22fd07[0x0] | _0x22fd07[0x1] << 0x8,
            'productId': _0x22fd07[0x2] | _0x22fd07[0x3] << 0x8,
            'width': _0x22fd07[0x4] | _0x22fd07[0x5] << 0x8,
            'height': _0x22fd07[0x6] | _0x22fd07[0x7] << 0x8,
            'screenType': _0x22fd07[0x8] ?? 0x0,
            'supportWinUsb': _0x22fd07[0x9] === 0x1,
            'supportJpg': _0x22fd07[0xa] === 0x1
        };
        return this["activeData"]["screenInfo"] = _0x3cea92, console["log"]("[ybScreen] 屏幕参数:", _0x3cea92), _0x3cea92;
    } ["getScreenModel"]() {
        const _0x27b5e2 = _0x37e8dc;
        var _0x2aaa94;
        return ((_0x2aaa94 = this["activeData"]["device"]) == null ? void 0x0 : _0x2aaa94["productNam" + 'e']) || C[0x0]["pName"];
    }
    async ["loadSavedPicture"]() {
        const _0xaee77d = _0x37e8dc;
        try {
            const _0x3af759 = (await _0x1c6809[F]["where"]("name")["equals"](this["getScreenModel"]())["toArray"]())[0x0];
            this["activeData"]["pictureDat" + 'a'] = (_0x3af759 == null ? void 0x0 : _0x3af759["data"]) || '', this["activeData"]["pictureCro" + 'p'] = (_0x3af759 == null ? void 0x0 : _0x3af759["crop"]) || '', this["activeData"]["pictureRec" + 't'] = (_0x3af759 == null ? void 0x0 : _0x3af759["rect"]) || null;
        } catch (_0x300177) {
            console["error"]("[ybScreen] 读取保存的壁纸失败" + ':', _0x300177), this["activeData"]["pictureDat" + 'a'] = '', this["activeData"]["pictureCro" + 'p'] = '', this["activeData"]["pictureRec" + 't'] = null;
        }
    }
    async ["saveOriginalPicture"](_0x1355d0) {
        const _0x7f564 = _0x37e8dc;
        await this["savePictureRow"]({
            'data': await this["blobToDataUrl"](_0x1355d0),
            'crop': '',
            'rect': null
        });
    }
    async ["saveCropPicture"](_0x4b8123, _0x577ea5) {
        const _0x372292 = _0x37e8dc;
        await this["savePictureRow"]({
            'crop': await this["blobToDataUrl"](_0x4b8123),
            'rect': _0x577ea5
        });
    } ["clearSavedPicture"]() {
        const _0x640886 = _0x37e8dc;
        return this["pictureSaveQueue"] = this["pictureSaveQueue"]["then"](() => this["deletePictureRow"]())["catch"](() => {}), this["pictureSaveQueue"];
    }
    async ["deletePictureRow"]() {
        const _0x22c12d = _0x37e8dc;
        var _0x49c8f6;
        try {
            const _0x3345e8 = _0x1c6809[F],
                _0x3313d9 = await _0x3345e8["where"]("name")["equals"](this["getScreenModel"]())["toArray"]();
            ((_0x49c8f6 = _0x3313d9[0x0]) == null ? void 0x0 : _0x49c8f6['id']) !== void 0x0 && await _0x3345e8["delete"](_0x3313d9[0x0]['id']);
        } catch (_0x54b310) {
            console["error"]("[ybScreen] 删除壁纸缓存失败:", _0x54b310);
        }
        this["activeData"]["pictureDat" + 'a'] = '', this["activeData"]["pictureCro" + 'p'] = '', this["activeData"]["pictureRec" + 't'] = null;
    } ["savePictureRow"](_0x1e1112) {
        const _0x4c4632 = _0x37e8dc;
        return this["pictureSaveQueue"] = this["pictureSaveQueue"]["then"](() => this["writePictureRow"](_0x1e1112))["catch"](() => {}), this["pictureSaveQueue"];
    }
    async ["writePictureRow"](_0x209340) {
        const _0x43c068 = _0x37e8dc;
        try {
            const _0x483152 = this["getScreenModel"](),
                _0x353c12 = _0x1c6809[F],
                _0x45d206 = (await _0x353c12["where"]("name")["equals"](_0x483152)["toArray"]())[0x0],
                _0x166613 = {
                    'name': _0x483152,
                    'data': _0x209340["data"] ?? (_0x45d206 == null ? void 0x0 : _0x45d206["data"]) ?? '',
                    'crop': _0x209340["crop"] ?? (_0x45d206 == null ? void 0x0 : _0x45d206["crop"]) ?? '',
                    'rect': _0x209340["rect"] !== void 0x0 ? _0x209340["rect"] : (_0x45d206 == null ? void 0x0 : _0x45d206["rect"]) || null,
                    'time': Date["now"]()
                };
            _0x45d206 ? await _0x353c12["put"]({
                ..._0x166613,
                'id': _0x45d206['id']
            }) : await _0x353c12["add"](_0x166613), this["activeData"]["pictureDat" + 'a'] = _0x166613["data"], this["activeData"]["pictureCro" + 'p'] = _0x166613["crop"], this["activeData"]["pictureRec" + 't'] = _0x166613["rect"];
        } catch (_0x3b91c2) {
            console["error"]("[ybScreen] 保存壁纸失败:", _0x3b91c2);
        }
    }
    async ["uploadPicture"](_0x220022, _0x1dcd20) {
        const _0x2be881 = _0x37e8dc;
        var _0x510091;
        const _0x43f077 = this["getDevice"]();
        if (!_0x43f077) return _0x5d1778(_0x409c0c["global"]['t']("ybScreen.disconnecte" + 'd'), "error"), !0x1;
        if (!_0x43f077["opened"]) try {
            await _0x43f077["open"]();
        } catch (_0x1e9748) {
            return console["error"]("[ybScreen] 打开屏幕设备失败:", _0x1e9748), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.authFailed"), "error"), !0x1;
        }
        this["activeData"]["screenInfo"] || await this["getScreenInfo"]();
        const _0x21e425 = await this["resolveAnimation"](_0x220022);
        if (_0x21e425) return await this["uploadAnimation"](_0x43f077, _0x21e425, _0x1dcd20);
        const _0x1da14d = ((_0x510091 = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x510091["supportJpg"]) ?? !0x0,
            _0x59d9a7 = await this["renderPicture"](_0x220022, _0x1da14d);
        if (!_0x59d9a7) return _0x5d1778(_0x409c0c["global"]['t']("ybScreen.pictureFail" + 'ed'), "error"), !0x1;
        const _0x5af404 = await this["readScreenSpace"](T["IMAGE_SPAC" + 'E']);
        if (_0x5af404 && _0x59d9a7["picture"]["length"] > _0x5af404) return console["log"]("[ybScreen] 图片超出屏幕空间:" + '\x20' + _0x59d9a7["picture"]["length"] + " > " + _0x5af404), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.pictureTooLarge"), "error"), !0x1;
        const _0xcbb15c = this["buildPictureStream"]([_0x59d9a7["picture"]], [0x0], _0x59d9a7["width"], _0x59d9a7["height"], _0x1da14d);
        return console["log"]("[ybScreen] 下发图片: " + (_0x1da14d ? "JPG" : "RGB565") + '\x20' + _0x59d9a7["width"] + '×' + _0x59d9a7["height"] + ", 数据流 " + _0xcbb15c["length"] + " 字节"), await this["applyPictureStream"](_0x43f077, _0xcbb15c, _0x1da14d);
    }
    async ["resolveAnimation"](_0x187230) {
        const _0x4ac1bd = _0x37e8dc;
        try {
            if (!await _0x5ced20(_0x187230)) return null;
            const _0x25e92c = await _0x4f32f8(_0x187230);
            return _0x25e92c["frameCount"] < 0x2 ? null : _0x25e92c;
        } catch (_0x47ce8f) {
            return console["warn"]("[ybScreen] GIF 拆帧失败，按静态图处理:", _0x47ce8f), null;
        }
    }
    async ["uploadAnimation"](_0x51877a, _0x307730, _0x2dbb46) {
        const _0x54fc46 = _0x37e8dc;
        var _0x2bb4bc, _0xa60598, _0x52ef3c, _0x3a50fe, _0x5ae3fa;
        const _0xd9a1f1 = ((_0x2bb4bc = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x2bb4bc["supportJpg"]) ?? !0x0;
        let _0x360931 = null;
        try {
            const _0x3f18f3 = await this["readScreenSpace"](T["GIF_SPACE"]);
            _0x360931 = await _0x57819e({
                'seq': _0x307730,
                'crop': _0x2dbb46,
                'width': ((_0xa60598 = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0xa60598["width"]) || _0x307730["width"],
                'height': ((_0x52ef3c = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x52ef3c["height"]) || _0x307730["height"],
                'supportJpg': _0xd9a1f1,
                'spaceSize': _0x3f18f3,
                'jpegQuality': _
            });
        } catch (_0x2bbecf) {
            console["error"]("[ybScreen] 动图出图失败:", _0x2bbecf);
        }
        if (!_0x360931) return _0x5d1778(_0x409c0c["global"]['t']("ybScreen.pictureFail" + 'ed'), "error"), !0x1;
        const _0x342441 = ((_0x3a50fe = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x3a50fe["width"]) || _0x307730["width"],
            _0x4e298f = ((_0x5ae3fa = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x5ae3fa["height"]) || _0x307730["height"],
            _0x5affe6 = this["buildPictureStream"](_0x360931["frames"], _0x360931["delays10"], _0x342441, _0x4e298f, _0xd9a1f1);
        console["log"]("[ybScreen] 下发动图: " + (_0xd9a1f1 ? "JPG" : "RGB565") + '\x20' + _0x342441 + '×' + _0x4e298f + ',\x20' + _0x360931["frames"]["length"] + " 帧 / " + _0x360931["keptMs"] + "ms（源 " + _0x307730["frameCount"] + " 帧 / " + _0x360931["originalMs"] + 'ms' + (_0x360931["truncated"] ? "，受动图空间限制已截" + '断' : '') + "）, 数据流 " + _0x5affe6["length"] + " 字节");
        const _0x20ec19 = await this["applyPictureStream"](_0x51877a, _0x5affe6, _0xd9a1f1);
        return _0x20ec19 && _0x360931["truncated"] && _0x5d1778(_0x409c0c["global"]['t']("ybScreen.pictureTruncated", {
            'count': _0x360931["frames"]["length"]
        }), "warning"), _0x20ec19;
    }
    async ["applyPictureStream"](_0x2fbe5c, _0x11f27f, _0x369fa5) {
        const _0x5262ef = _0x37e8dc;
        this["activeData"]["pictureApp" + 'ly']["gifProgres" + 's'] = 0x0, this["activeData"]["pictureApp" + 'ly']["diaVisible"] = !0x0;
        let _0xe0450f = !0x1;
        try {
            _0xe0450f = await this["sendPictureStream"](_0x2fbe5c, _0x11f27f, _0x369fa5), _0xe0450f && (this["activeData"]["pictureApp" + 'ly']["gifProgres" + 's'] = 0x64, await new Promise(_0x42c145 => setTimeout(_0x42c145, 0x190)));
        } finally {
            this["activeData"]["pictureApp" + 'ly']["diaVisible"] = !0x1;
        }
        return _0x5d1778(_0x409c0c["global"]['t'](_0xe0450f ? "ybScreen.pictureSuccess" : "ybScreen.pictureFail" + 'ed'), _0xe0450f ? "success" : "error"), _0xe0450f;
    }
    async ["readScreenSpace"](_0x54a1db) {
        const _0x4e7deb = _0x37e8dc,
            _0x583620 = await this["readScreenInfo"](_0x54a1db);
        return !_0x583620 || _0x583620["length"] < 0x4 ? null : _0x583620[0x0] + (_0x583620[0x1] << 0x8) + (_0x583620[0x2] << 0x10) + _0x583620[0x3] * 0x1000000;
    }
    async ["renderPicture"](_0x5f5551, _0x4d472b) {
        const _0x50b633 = _0x37e8dc;
        var _0x1a6669, _0x1c6abe, _0x19bd76, _0x1feea8;
        try {
            const _0x45f6ab = await createImageBitmap(_0x5f5551),
                _0x3ac62f = ((_0x1a6669 = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x1a6669["width"]) || _0x45f6ab["width"],
                _0x34097b = ((_0x1c6abe = this["activeData"]["screenInfo"]) == null ? void 0x0 : _0x1c6abe["height"]) || _0x45f6ab["height"],
                _0x4ee79d = document["createElement"]("canvas");
            _0x4ee79d["width"] = _0x3ac62f, _0x4ee79d["height"] = _0x34097b;
            const _0x3bb7de = _0x4ee79d["getContext"]('2d', {
                'willReadFrequently': !_0x4d472b
            });
            if (!_0x3bb7de) return (_0x19bd76 = _0x45f6ab["close"]) == null || _0x19bd76["call"](_0x45f6ab), null;
            if (_0x3bb7de["fillStyle"] = "#000000", _0x3bb7de["fillRect"](0x0, 0x0, _0x3ac62f, _0x34097b), _0x3bb7de["drawImage"](_0x45f6ab, 0x0, 0x0, _0x3ac62f, _0x34097b), (_0x1feea8 = _0x45f6ab["close"]) == null || _0x1feea8["call"](_0x45f6ab), !_0x4d472b) return {
                'picture': _0x5a8da2(_0x3bb7de, _0x3ac62f, _0x34097b),
                'width': _0x3ac62f,
                'height': _0x34097b
            };
            const _0x26b1a8 = await _0x38feb4(_0x4ee79d, _);
            return _0x26b1a8 ? {
                'picture': this["stripJpegApp2"](_0x26b1a8),
                'width': _0x3ac62f,
                'height': _0x34097b
            } : null;
        } catch (_0x118f4f) {
            return console["error"]("[ybScreen] 图片转码失败:", _0x118f4f), null;
        }
    } ["stripJpegApp2"](_0x168e8b) {
        const _0x49d6c5 = _0x37e8dc;
        if (_0x168e8b["length"] < 0x4 || _0x168e8b[0x0] !== 0xff || _0x168e8b[0x1] !== 0xd8) return _0x168e8b;
        const _0x4f4838 = [_0x168e8b["subarray"](0x0, 0x2)];
        let _0xa27bf8 = 0x2,
            _0x416fd6 = 0x2;
        for (; _0x416fd6 + 0x4 <= _0x168e8b["length"];) {
            if (_0x168e8b[_0x416fd6] !== 0xff) return _0x168e8b;
            const _0x548b29 = _0x168e8b[_0x416fd6 + 0x1],
                _0xc05e88 = _0x416fd6 + 0x2 + (_0x168e8b[_0x416fd6 + 0x2] << 0x8 | _0x168e8b[_0x416fd6 + 0x3]);
            if (_0xc05e88 > _0x168e8b["length"]) return _0x168e8b;
            if (_0x548b29 !== 0xe2 && (_0x4f4838["push"](_0x168e8b["subarray"](_0x416fd6, _0xc05e88)), _0xa27bf8 += _0xc05e88 - _0x416fd6), _0x548b29 === 0xda) {
                _0x4f4838["push"](_0x168e8b["subarray"](_0xc05e88)), _0xa27bf8 += _0x168e8b["length"] - _0xc05e88;
                break;
            }
            _0x416fd6 = _0xc05e88;
        }
        const _0x40b0e1 = new Uint8Array(_0xa27bf8);
        let _0x3d4a28 = 0x0;
        for (const _0x2b021a of _0x4f4838) _0x40b0e1["set"](_0x2b021a, _0x3d4a28), _0x3d4a28 += _0x2b021a["length"];
        return _0x40b0e1;
    } ["buildPictureStream"](_0x7ab3a, _0x1d54f8, _0x4e816c, _0x2731f6, _0x56e071) {
        const _0x2c54bd = _0x37e8dc,
            _0x4fd7a6 = [..._0x56e071 ? y["JPG_HEADER"] : y["RGB565_HEADER"], ...this["toHighByteFirst16"](_0x4e816c), ...this["toHighByteFirst16"](_0x2731f6), ...this["toHighByteFirst16"](_0x7ab3a["length"]), ..._0x7ab3a["map"]((_0x166ee2, _0x5ce40c) => (_0x1d54f8[_0x5ce40c] ?? 0x1) & 0xff)],
            _0xfa9169 = _0x56e071 ? _0x7ab3a["length"] * 0x4 : 0x0,
            _0x2b3e7d = _0x7ab3a["reduce"]((_0x239748, _0x536f63) => _0x239748 + _0x536f63["length"], 0x0),
            _0x5f28f0 = new Uint8Array(_0x4fd7a6["length"] + _0xfa9169 + _0x2b3e7d);
        _0x5f28f0["set"](_0x4fd7a6, 0x0);
        let _0x4c1b5a = _0x4fd7a6["length"];
        if (_0x56e071) {
            for (const _0x498220 of _0x7ab3a) _0x5f28f0["set"](this["toHighByteFirst32"](_0x498220["length"]), _0x4c1b5a), _0x4c1b5a += 0x4;
        }
        for (const _0x49b25f of _0x7ab3a) _0x5f28f0["set"](_0x49b25f, _0x4c1b5a), _0x4c1b5a += _0x49b25f["length"];
        return _0x5f28f0;
    }
    async ["sendPictureStream"](_0x2f9e30, _0x1bce45, _0x1eb291) {
        const _0x52d8db = _0x37e8dc,
            _0x1fb349 = [..._0x1eb291 ? y["JPG_FRAME_HEAD"] : y["RGB565_FRAME_HEAD"], ...this["toHighByteFirst32"](_0x1bce45["length"])];
        if (!await this["sendPictureFrame"](_0x2f9e30, _0x1fb349, "required")) return console["log"]("[ybScreen] 图片首帧无应答，终止下发"), !0x1;
        const _0x541015 = Math["floor"](_0x1bce45["length"] / w),
            _0x1e1902 = _0x541015 * w;
        let _0xca1f1e = 0x0;
        const _0x561295 = async (_0x425ea4, _0x5608e4) => await this["sendPictureFrame"](_0x2f9e30, _0x425ea4, _0x5608e4 ? "required" : "none") ? (_0xca1f1e += _0x425ea4[0x0], this["activeData"]["pictureApp" + 'ly']["gifProgres" + 's'] = Math["min"](0x63, Math["round"](_0xca1f1e / _0x1bce45["length"] * 0x64)), !0x0) : !0x1;
        for (let _0x198b05 = 0x0; _0x198b05 < _0x1e1902; _0x198b05 += w) {
            const _0x3fe033 = _0x198b05 + w,
                _0x217755 = this["toLowByteFirst32"](_0x3c7c1d(_0x1bce45["subarray"](_0x198b05, _0x3fe033)));
            for (let _0x3a98ec = _0x198b05; _0x3a98ec < _0x3fe033;) {
                const _0x25f492 = Math["min"](B, _0x3fe033 - _0x3a98ec),
                    _0x32cd40 = _0x3a98ec + _0x25f492 >= _0x3fe033,
                    _0x2d77be = [_0x25f492, ..._0x1bce45["slice"](_0x3a98ec, _0x3a98ec + _0x25f492)];
                if (_0x32cd40 && _0x2d77be["push"](..._0x217755), !await _0x561295(_0x2d77be, _0x32cd40)) return console["log"]("[ybScreen] 图片数据块 " + (_0x198b05 / w + 0x1) + '/' + _0x541015 + " 无应答，终止下发"), !0x1;
                _0x3a98ec += _0x25f492;
            }
        }
        for (let _0x7dff2c = _0x1e1902; _0x7dff2c < _0x1bce45["length"];) {
            const _0x3ea897 = Math["min"](B, _0x1bce45["length"] - _0x7dff2c);
            if (!await _0x561295([_0x3ea897, ..._0x1bce45["slice"](_0x7dff2c, _0x7dff2c + _0x3ea897)], !0x1)) return console["log"]("[ybScreen] 图片尾部数据帧发送失败，终止下发"), !0x1;
            _0x7dff2c += _0x3ea897;
        }
        return !0x0;
    }
    async ["sendPictureFrame"](_0x3638df, _0xcb48e3, _0x2af969) {
        const _0x1f77bb = _0x37e8dc,
            _0x2d23c0 = new Uint8Array(N);
        _0x2d23c0[0x0] = y["UPDATE"], _0x2d23c0["set"](_0xcb48e3["slice"](0x0, N - 0x1), 0x1);
        try {
            const _0x25d0f3 = _0x2af969 === "none" ? null : this["waitPictureAck"](_0x3638df);
            if (await _0x3638df["sendReport"](0x0, _0x2d23c0), !_0x25d0f3) return !0x0;
            const _0x3a8975 = await _0x25d0f3;
            return !!_0x3a8975 && _0x3a8975[0x6] === y["SUCCESS"];
        } catch (_0x3377de) {
            return console["log"]("[ybScreen] 图片帧发送失败: " + _0x3377de["message"]), !0x1;
        }
    } ["waitPictureAck"](_0x16ee98) {
        return new Promise(_0x5d252d => {
            const _0x5cd490 = _0xb958,
                _0x4e6ff7 = _0x264ea8 => {
                    const _0x363b93 = _0xb958;
                    if (_0x264ea8["device"] !== _0x16ee98 || _0x264ea8["data"]["byteLength"] < 0x7) return;
                    const _0x5e7e89 = new Uint8Array(_0x264ea8["data"]["buffer"], _0x264ea8["data"]["byteOffset"], _0x264ea8["data"]["byteLength"]);
                    _0x5e7e89[0x0] === y["UPDATE"] && (_0x1ae3f3(), _0x5d252d(_0x5e7e89));
                },
                _0x5201f8 = setTimeout(() => {
                    _0x1ae3f3(), _0x5d252d(null);
                }, te);

            function _0x1ae3f3() {
                const _0x1ba255 = _0xb958;
                _0x16ee98["removeEventListener"]("inputrepor" + 't', _0x4e6ff7), clearTimeout(_0x5201f8);
            }
            _0x16ee98["addEventListener"]("inputrepor" + 't', _0x4e6ff7);
        });
    } ["toHighByteFirst16"](_0xa2e40c) {
        return [_0xa2e40c >> 0x8 & 0xff, _0xa2e40c & 0xff];
    } ["toHighByteFirst32"](_0x361c6a) {
        return [_0x361c6a >> 0x18 & 0xff, _0x361c6a >> 0x10 & 0xff, _0x361c6a >> 0x8 & 0xff, _0x361c6a & 0xff];
    } ["toLowByteFirst32"](_0xb21f66) {
        return [_0xb21f66 & 0xff, _0xb21f66 >>> 0x8 & 0xff, _0xb21f66 >>> 0x10 & 0xff, _0xb21f66 >>> 0x18 & 0xff];
    } ["blobToDataUrl"](_0x4fd4ae) {
        return new Promise((_0x1bf3a6, _0x50960f) => {
            const _0x412583 = _0xb958,
                _0x2c6ce3 = new FileReader();
            _0x2c6ce3["onload"] = () => _0x1bf3a6(String(_0x2c6ce3["result"])), _0x2c6ce3["onerror"] = () => _0x50960f(_0x2c6ce3["error"]), _0x2c6ce3["readAsDataURL"](_0x4fd4ae);
        });
    }
    async ["sendScreenCommand"](_0xd2f4f6, _0x36bf55) {
        const _0x5626e8 = _0x37e8dc;
        return this["sendScreenPacket"](this["buildScreenPacket"](_0xd2f4f6, _0x36bf55));
    }
    async ["sendScreenPacket"](_0x5c1c3f) {
        const _0x2308fb = _0x37e8dc,
            _0x5648e8 = this["getDevice"]();
        if (!_0x5648e8) return _0x5d1778(_0x409c0c["global"]['t']("ybScreen.disconnecte" + 'd'), "error"), null;
        if (!_0x5648e8["opened"]) try {
            await _0x5648e8["open"]();
        } catch (_0x3257b1) {
            return console["error"]("[ybScreen] 打开屏幕设备失败:", _0x3257b1), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.authFailed"), "error"), null;
        }
        console["log"]("[ybScreen] 下发屏幕命令:", Array["from"](_0x5c1c3f));
        const _0x204fcf = await _0x1394f2(_0x5648e8, _0x5c1c3f);
        return _0x204fcf || console["log"]("[ybScreen] 屏幕命令无应答"), _0x204fcf;
    } ["buildScreenPacket"](_0x589a23, _0x1bfc73) {
        const _0x5c0e64 = _0x37e8dc,
            _0x37d68c = [_0x589a23, 0x0, _0x1bfc73["length"] + 0x1, 0x0, ..._0x1bfc73];
        return this["buildScreenBytes"](_0x37d68c);
    } ["buildScreenReadPacke" + 't'](_0x233f82) {
        const _0x31d450 = _0x37e8dc;
        return this["buildScreenBytes"]([S["GET_DEVICE_INFO"], 0x0, 0x1, _0x233f82]);
    } ["buildScreenBytes"](_0x384ff5) {
        const _0x4ec04d = _0x37e8dc,
            _0x1c5d1d = _0x384ff5["reduce"]((_0x2d54b1, _0x2ae31b) => _0x2d54b1 + _0x2ae31b, 0x0) ^ 0xff;
        return new Uint8Array([S["SET_NEW"], ..._0x384ff5, _0x1c5d1d & 0xff]);
    }
    async ["getAllScreenBin"]() {
        const _0xa04853 = _0x37e8dc,
            _0x49d0ec = C[0x0];
        try {
            const _0x30c613 = await _0x4c6f39({
                'pid': _0x49d0ec["pId"],
                'vid': _0x49d0ec["vId"],
                'productName': _0x49d0ec["pName"]
            });
            if (!(_0x30c613 != null && _0x30c613["length"])) return;
            console["log"]("[ybScreen] 云端固件列表:", _0x30c613);
            const _0x251c9a = _0x30c613["filter"](_0x2f7f48 => _0x2f7f48["label"] === 'UI'),
                _0x4c1b80 = _0x30c613["filter"](_0x321681 => _0x321681["label"] === "MCU");
            this["mcuVersionList"] = this["buildVersionList"](_0x4c1b80), this["uiVersionList"] = this["buildVersionList"](_0x251c9a), console["log"]("[ybScreen] MCU固件:", this["mcuVersionList"], "UI固件:", this["uiVersionList"]);
        } catch (_0x35edbe) {
            console["error"]("[ybScreen] 获取云端固件失败:", _0x35edbe);
        }
    }
    async ["openUpdate"](_0x92879b) {
        const _0x570dbf = _0x37e8dc;
        this["updateType"] = _0x92879b, this["getCurrentVersionLis" + 't']()["length"] || await this["getAllScreenBin"]();
        const _0x1ce9db = this["getCurrentVersionLis" + 't']();
        if (!_0x1ce9db["length"]) {
            _0x5d1778(_0x409c0c["global"]['t']("dfu.noCloudFirmware"), "error");
            return;
        }
        this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["activeData"]["versionLis" + 't'] = _0x1ce9db, this["activeData"]["latestVersion"] = _0x1ce9db[0x0]["version"], this["activeData"]["activeVersion"] = _0x1ce9db[0x0]["version"], this["activeData"]["diaVisible"] = !0x0, await this["getBinFile"](_0x1ce9db[0x0]);
    }
    async ["getBinFile"](_0x25bddd) {
        const _0x20aed2 = _0x37e8dc;
        var _0xb7083a;
        if (this["activeData"]["activeBinBlob"] = [], this["activeData"]["requestFinish"] = !0x0, (_0xb7083a = _0x25bddd == null ? void 0x0 : _0x25bddd["ids"]) != null && _0xb7083a["length"]) try {
            for (const _0x5d136b of _0x25bddd["ids"]) {
                const _0x4e0474 = await _0x108fec(_0x5d136b['id']);
                this["activeData"]["activeBinBlob"]["push"]({
                    'label': _0x5d136b["label"],
                    'blobFile': _0x4e0474
                });
            }
        } catch (_0x19711d) {
            console["error"]("[ybScreen] 下载固件失败:", _0x19711d);
        }
        this["activeData"]["requestFinish"] = !0x1;
    } ["changeBinVersion"]() {
        const _0x479a4c = _0x37e8dc,
            _0x348774 = this["activeData"]["versionLis" + 't']["find"](_0x39d33c => _0x39d33c["version"] === this["activeData"]["activeVersion"]);
        _0x348774 && this["getBinFile"](_0x348774);
    }
    async ["startUpdat" + 'e']() {
        const _0x5b8beb = _0x37e8dc;
        var _0x53a9a2, _0x31d13f;
        if (this["store"]["isBinUpdating"]) return;
        if (!((_0x53a9a2 = this["activeData"]["activeBinBlob"]) != null && _0x53a9a2["length"])) {
            _0x5d1778(_0x409c0c["global"]['t']("dfu.noCloudFirmware"), "error");
            return;
        }
        const _0x7a626c = this["getDevice"]();
        if (!_0x7a626c) {
            _0x5d1778(_0x409c0c["global"]['t']("ybScreen.disconnecte" + 'd'), "error");
            return;
        }
        try {
            await _0x3ea3c2["confirm"](_0x409c0c["global"]['t']("dfu.warnin" + 'g'), _0x409c0c["global"]['t']("version.text10"));
        } catch {
            return;
        }
        const _0x57d051 = (_0x31d13f = this["activeData"]["activeBinBlob"][0x0]) == null ? void 0x0 : _0x31d13f["blobFile"];
        if (!_0x57d051) {
            _0x5d1778(_0x409c0c["global"]['t']("dfu.noCloudFirmware"), "error");
            return;
        }
        const _0x315472 = new Uint8Array(await _0x57d051["arrayBuffe" + 'r']()),
            _0x37c780 = this["updateType"] === 'ui',
            _0x372f3f = new _0x225cde();
        _0x372f3f["setCallbac" + 'ks']({
            'onProgress': (_0x64c40b, _0x1c5bd5) => {
                const _0x47abdd = _0x5b8beb;
                this["activeData"]["progress"] = _0x1c5bd5 === "erase" ? Math["round"](_0x64c40b * 0.39) : 0x27 + Math["round"](_0x64c40b * 0.6);
            }
        }), this["upgradeCor" + 'e'] = _0x372f3f, this["pendingFirmware"] = _0x315472, this["pendingFirmwareType"] = _0x37c780 ? "data" : "mcu", this["activeData"]["step"] = 0x2, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["store"]["isBinUpdating"] = !0x0;
        try {
            await _0x372f3f["sendPrepareCommand"](_0x7a626c), await _0x372f3f["sendDFUCommand"](_0x7a626c);
        } catch (_0x398efc) {
            console["error"]("[ybScreen] 进入升级模式失败:", _0x398efc), this["store"]["isBinUpdating"] = !0x1, this["resetUpgradeContext"](), this["resetProgress"](), _0x5d1778((_0x398efc == null ? void 0x0 : _0x398efc["message"]) || _0x409c0c["global"]['t']("dfu.failed"), "error");
            return;
        }
        await this["flashFirmware"]();
    }
    async ["retryUpdat" + 'e']() {
        const _0x2874af = _0x37e8dc;
        this["store"]["isBinUpdating"] || !this["upgradeCor" + 'e'] || !this["pendingFirmware"] || !this["pendingFirmwareType"] || (this["activeData"]["driverGuideVisible"] = !0x1, this["activeData"]["diaVisible"] = !0x0, this["activeData"]["step"] = 0x2, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["store"]["isBinUpdating"] = !0x0, await this["flashFirmware"]());
    } ["cancelDriverGuide"]() {
        const _0x39b588 = _0x37e8dc;
        this["activeData"]["driverGuideVisible"] = !0x1, this["resetUpgradeContext"](), this["resetUpdateData"](), _0x5d1778(_0x409c0c["global"]['t']("dfu.driverGuideAbort"), "warning");
    } ["downloadWinUSB"]() {
        _0x18cb21(_0x52a40f);
    }
    async ["flashFirmware"]() {
        const _0x2bd9d1 = _0x37e8dc,
            _0x4b9689 = this["upgradeCor" + 'e'],
            _0x24fd5b = this["pendingFirmware"],
            _0x33b13b = this["pendingFirmwareType"];
        if (!_0x4b9689 || !_0x24fd5b || !_0x33b13b) return;
        const _0x54cd9d = _0x33b13b === "data";
        let _0x4bff66 = null;
        try {
            _0x4bff66 = await _0x4b9689["connectDFUDevice"]();
            const _0xf0a38a = _0x4b9689["getCurrentConfig"]();
            if (!_0xf0a38a) throw new Error(_0x409c0c["global"]['t']("dfu.configMissing"));
            if (_0x4b9689["setCurrentUpgradeTyp" + 'e'](_0x33b13b), !_0x4b9689["isDfuSuffixValid"](_0x24fd5b, _0x54cd9d ? _0xf0a38a["dataMax"] : _0xf0a38a["mcuMax"], _0xf0a38a["vendorId"], _0xf0a38a["productId"], _0x54cd9d ? _0xf0a38a["dataCompar" + 'e'] : _0xf0a38a["mcuCompare"], _0x54cd9d ? _0xf0a38a["dataFileCompareOffse" + 't'] : _0xf0a38a["mcuFileCompareOffset"])) throw new Error(_0x409c0c["global"]['t']("dfu.invalidFile"));
            if (!await _0x4b9689["readAndCompare"](_0x4bff66, _0x24fd5b, _0x54cd9d ? _0xf0a38a["dataFileCompareEnabl" + 'e'] : _0xf0a38a["mcuFileCompareEnable"], _0x54cd9d ? _0xf0a38a["dataFileCompareOffse" + 't'] : _0xf0a38a["mcuFileCompareOffset"], _0x54cd9d ? _0xf0a38a["dataFileCompareLengt" + 'h'] : _0xf0a38a["mcuFileCompareLength"], _0x54cd9d ? _0xf0a38a["dataStartAddr"] : _0xf0a38a["mcuStartAd" + 'dr'])) throw new Error(_0x409c0c["global"]['t']("dfu.verifyFailed"));
            await _0x4b9689["upgradeFirmware"](_0x4bff66, _0x24fd5b, _0x54cd9d ? _0xf0a38a["dataStartAddr"] : _0xf0a38a["mcuStartAd" + 'dr']), this["activeData"]["progress"] = 0x64, this["activeData"]["otherCondition"] = !0x0, this["resetUpgradeContext"]();
        } catch (_0x534630) {
            if (console["error"]("[ybScreen] 屏幕固件升级失败:", _0x534630), this["resetProgress"](), _0x4b9689["resetState"](), _0x534630 instanceof _0x568e0b) {
                this["activeData"]["driverGuideVisible"] = !0x0, this["activeData"]["diaVisible"] = !0x1;
                return;
            }
            this["resetUpgradeContext"](), _0x5d1778((_0x534630 == null ? void 0x0 : _0x534630["message"]) || _0x409c0c["global"]['t']("dfu.failed"), "error");
        } finally {
            try {
                await _0x4b9689["exitDfuMod" + 'e'](_0x4bff66);
            } catch (_0x36d7e2) {
                console["error"]("[ybScreen] 退出DFU模式失败" + ':', _0x36d7e2);
            }
            await new Promise(_0x559912 => setTimeout(_0x559912, 0x5dc)), this["store"]["isBinUpdating"] = !0x1;
        }
    } ["resetProgress"]() {
        const _0x385cf3 = _0x37e8dc;
        this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1;
    } ["resetUpgradeContext"]() {
        const _0x2cc19f = _0x37e8dc;
        this["upgradeCor" + 'e'] = null, this["pendingFirmware"] = null, this["pendingFirmwareType"] = null;
    } ["closeDia"]() {
        const _0x20d135 = _0x37e8dc;
        this["activeData"]["step"] === 0x1 && (this["activeData"]["otherCondition"] = !0x1, this["activeData"]["activeVersion"] = '', this["activeData"]["activeBinBlob"] = [], this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["diaVisible"] = !0x1);
    } ["finishedUpdate"]() {
        const _0x451be4 = _0x37e8dc;
        this["activeData"]["diaVisible"] = !0x1, this["resetUpdateData"](), _0x5d1778(_0x409c0c["global"]['t']("ybScreen.updateSucce" + 'ss'));
    } ["getCurrentVersionLis" + 't']() {
        const _0x15af62 = _0x37e8dc;
        return this["updateType"] === 'ui' ? this["uiVersionList"] : this["mcuVersionList"];
    } ["buildVersionList"](_0x146b4d) {
        const _0x264888 = _0x37e8dc,
            _0x1f84a0 = [],
            _0x181796 = [..._0x146b4d],
            _0xd3d4e3 = _0x181796["findIndex"](_0x1bc3c6 => _0x1bc3c6 == null ? void 0x0 : _0x1bc3c6["latest"]);
        return _0xd3d4e3 > 0x0 && _0x181796["unshift"](_0x181796["splice"](_0xd3d4e3, 0x1)[0x0]), _0x181796["forEach"](_0x5a647c => {
            const _0x120fbf = _0x264888,
                _0x525fd4 = _0x1f84a0["findIndex"](_0x5e4bcf => _0x5e4bcf["version"] === _0x5a647c["version"]);
            _0x525fd4 !== -0x1 ? _0x1f84a0[_0x525fd4]["ids"]["push"]({
                'label': _0x5a647c["label"],
                'id': _0x5a647c['id']
            }) : _0x1f84a0["push"]({
                'version': _0x5a647c["version"],
                'ids': [{
                    'label': _0x5a647c["label"],
                    'id': _0x5a647c['id']
                }]
            });
        }), _0x1f84a0;
    } ["resetUpdateData"]() {
        const _0x1b94e5 = _0x37e8dc;
        this["activeData"]["driverGuideVisible"] = !0x1, this["activeData"]["versionLis" + 't'] = [], this["activeData"]["activeVersion"] = '', this["activeData"]["activeBinBlob"] = [], this["activeData"]["requestFinish"] = !0x1, this["activeData"]["step"] = 0x1, this["activeData"]["progress"] = 0x0, this["activeData"]["otherCondition"] = !0x1, this["activeData"]["latestVersion"] = '';
    }
    async ["findAuthorizedScreenDevice"]() {
        const _0x518b45 = _0x37e8dc,
            _0x3e8bf8 = (await navigator["hid"]["getDevices"]())["find"](_0x5a598e => this["isScreenDevice"](_0x5a598e));
        if (!_0x3e8bf8) return null;
        if (!_0x3e8bf8["opened"]) try {
            await _0x3e8bf8["open"]();
        } catch (_0x344081) {
            return console["error"]("[ybScreen] 打开已授权屏幕设备失败:", _0x344081), null;
        }
        return _0x3e8bf8;
    } ["buildFilte" + 'rs']() {
        const _0x2a0d3e = _0x37e8dc;
        return C["map"](_0x161045 => ({
            'vendorId': _0x161045["vId"],
            'productId': _0x161045["pId"]
        }));
    } ["isScreenDevice"](_0x28a99a) {
        const _0x38b145 = _0x37e8dc;
        return _0x28a99a ? C["some"](_0xbe64e7 => {
            const _0x3dd86e = _0x38b145;
            if (_0x28a99a["vendorId"] !== _0xbe64e7["vId"] || _0x28a99a["productId"] !== _0xbe64e7["pId"]) return !0x1;
            const _0x2df8e4 = _0x28a99a["productNam" + 'e'] || '';
            return _0x2df8e4 === _0xbe64e7["pName"] || _0x2df8e4["toLowerCas" + 'e']()["includes"]("screen");
        }) : !0x1;
    } ["isCurrentScreenDevic" + 'e'](_0x307fd9) {
        const _0x4d67f0 = _0x37e8dc,
            _0x258f05 = _0x334e9c(this["activeData"]["device"]);
        return !_0x258f05 || !_0x307fd9 ? !0x1 : _0x258f05 === _0x307fd9 || _0x258f05["vendorId"] === _0x307fd9["vendorId"] && _0x258f05["productId"] === _0x307fd9["productId"] && _0x258f05["productNam" + 'e'] === _0x307fd9["productNam" + 'e'];
    } ["resetClass"]() {
        const _0x580137 = _0x37e8dc;
        this["unbindDeviceListener"](), this["resetUpgradeContext"](), this["resetUpdateData"](), Object["assign"](this["activeData"], _0x444346(this["defaultPageData"]));
    } ["resetData"]() {
        const _0x8acb6 = _0x37e8dc;
        this["resetClass"]();
    }
}
export {
    C as YbScreenDevices, p as YbScreenEvent, he as
    default
}; /* string table removed */