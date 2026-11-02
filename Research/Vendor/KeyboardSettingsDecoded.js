const _0x313417 = _0x2fb5; /* string alignment removed */
var M = Object["defineProperty"],
    w = (_0x5ad1ec, _0x4f2b47, _0x48923f) => _0x4f2b47 in _0x5ad1ec ? M(_0x5ad1ec, _0x4f2b47, {
        'enumerable': !0x0,
        'configurable': !0x0,
        'writable': !0x0,
        'value': _0x48923f
    }) : _0x5ad1ec[_0x4f2b47] = _0x48923f,
    y = (_0x47c0c2, _0x1e7e23, _0x141d8e) => w(_0x47c0c2, typeof _0x1e7e23 != "symbol" ? _0x1e7e23 + '' : _0x1e7e23, _0x141d8e);
import {
    U as _0x546a84,
    m as _0x49e218,
    l as _0x3ce5ea,
    h as _0xe2c83c,
    as as _0x3a298f
} from './index-CeAyNk8A.js'; /* string table removed */
import {
    Y as _0x2c9fb3
} from './BJXkBFdS.js'; /* decoder removed */
import {
    al as _0x2a6a5b,
    n as _0x43121b
} from './TglCKVxb.js';
import './dsW7I39g.js';
import './DziNxeDg.js';
class V {
    constructor(_0x18aa18, _0x139bcd) {
        const _0x3a393f = _0x313417;
        y(this, "store"), y(this, "keyboardMa" + 'p'), y(this, "defaultPageData"), y(this, "MACROOptio" + 'ns'), y(this, "maxSize"), y(this, "ServiceDevice"), y(this, "activeData", _0x2a6a5b({
            'chooseLength': 0x0,
            'pageData': [],
            'FnMenu': [],
            'FnLevel': 0x0,
            'macroList': [],
            'advancedActions': [],
            'activeTab': 0x0,
            'loadKeySet': !0x1,
            'activeKey': [],
            'showPage': "common",
            'isMacroKey': !0x1,
            'singleHighData': {
                'deviceKey': [''],
                'macroId': '',
                'behaviorMode': 0x0
            }
        })), (this["store"] = _0x18aa18, this["keyboardMa" + 'p'] = _0x2c9fb3, this["defaultPageData"] = _0x546a84(this["activeData"]), this["maxSize"] = 0x0, this["ServiceDevice"] = _0x139bcd, this["MACROOptio" + 'ns'] = [{
            'label': _0x49e218["global"]['t']("macro.text" + '11'),
            'value': 0x0
        }]);
    } ["Key_Disabl" + 'ed']() {
        const _0x239fbe = _0x313417;
        var _0xacb08e, _0x1d33cc;
        return {
            'resetDisabled': ((_0xacb08e = this["activeData"]["activeKey"]) == null ? void 0x0 : _0xacb08e["length"]) <= 0x0,
            'setMacroDisabled': ((_0x1d33cc = this["activeData"]["activeKey"]) == null ? void 0x0 : _0x1d33cc["length"]) !== 0x1
        };
    }
    async ["sdkReport"](_0x27cb3e, _0x947cf4, _0x498f23) {
        const _0x3bf157 = _0x313417;
        switch (_0x947cf4) {
            case "delMacro": {
                await _0x3ce5ea["confirm"]('' + _0x49e218["global"]['t']("reSet.message6"), '' + _0x49e218["global"]['t']("reSet.titl" + 'e5'), {
                    'confirmButtonText': _0x49e218["global"]['t']("reSet.confirmText"),
                    'cancelButtonText': _0x49e218["global"]['t']("reSet.cancelText")
                })["then"](async () => {
                    const _0x27a731 = _0x3bf157;
                    try {
                        let _0x22e240 = this["activeData"]["macroList"]["filter"](_0x3b57ab => _0x3b57ab['id'] !== (_0x27cb3e == null ? void 0x0 : _0x27cb3e['id']));
                        await this["setMacroToList"](_0x22e240), await this["getMacroLi" + 'st']();
                    } catch (_0x5525d2) {
                        console["error"](_0x5525d2);
                    }
                })["catch"](() => {});
                break;
            }
        }
    } ["changeActiveTab"](_0x2227e1) {
        const _0x337395 = _0x313417;
        this["activeData"]["activeTab"] !== _0x2227e1 && (this["activeData"]["activeTab"] = _0x2227e1);
    }
    async ["resetKey"]() {
        const _0x510a18 = _0x313417;
        await _0x3ce5ea["confirm"]('' + _0x49e218["global"]['t']("reSet.message7"), '' + _0x49e218["global"]['t']("reSet.titl" + 'e1'), {
            'confirmButtonText': _0x49e218["global"]['t']("reSet.confirmText"),
            'cancelButtonText': _0x49e218["global"]['t']("reSet.cancelText")
        })["then"](async () => {
            const _0x2ccde0 = _0x510a18;
            var _0x5e1d2a;
            this["activeData"]["loadKeySet"] = !0x0;
            let _0x582a86 = !0x1;
            try {
                for (let _0x509bfb of this["activeData"]["activeKey"]) {
                    let _0x5503fa = this["store"]["deviceLayo" + 'ut']["find"](_0x94ffda => _0x94ffda["keyValue"] === _0x509bfb);
                    if (_0x5503fa) try {
                        await ((_0x5e1d2a = this["ServiceDevice"]) == null ? void 0x0 : _0x5e1d2a["setKeyCode"]({
                            'layer': this["activeData"]["FnLevel"],
                            'row': _0x5503fa["row"] || 0x0,
                            'col': _0x5503fa["col"] || 0x0,
                            'keycode': _0x5503fa["keyValue"]
                        }));
                    } catch {}
                }
                await this["getKeyCode"](this["activeData"]["activeKey"]), _0x582a86 = !0x0;
            } catch (_0x10eb5f) {
                console["error"](_0x10eb5f);
            }
            _0x582a86 && this["cancelSetMacro"](), this["activeData"]["loadKeySet"] = !0x1;
        })["catch"](() => {
            const _0x4e48be = _0x510a18;
            this["activeData"]["loadKeySet"] = !0x1;
        });
    }
    async ["setActiveK" + 'ey'](_0x56c77b) {
        const _0x3cbe65 = _0x313417;
        var _0x5b325a;
        (_0x5b325a = this["activeData"]["activeKey"]) != null && _0x5b325a["length"] && (await this["setKey"](Number(_0x56c77b)), this["activeData"]["activeKey"]["length"] = 0x0);
    }
    async ["changeFnLevel"](_0x226e25) {
        const _0x489a21 = _0x313417;
        var _0x388500;
        this["activeData"]["FnLevel"] !== _0x226e25 && (this["cancelSetMacro"](), this["activeData"]["loadKeySet"] = !0x0, this["activeData"]["FnLevel"] = _0x226e25, await ((_0x388500 = this["store"]["deviceInstance"]) == null ? void 0x0 : _0x388500["Info_Class"]["initFnLayo" + 'ut'](_0x226e25)), await this["getAllHighList"](), this["activeData"]["loadKeySet"] = !0x1);
    }
    async ["highChoose"](_0x412a15, _0x59d8a8) {
        const _0x37561e = _0x313417;
        try {
            if (_0x412a15["highMode"] === "MACRO") {
                const _0x531777 = Number(_0x412a15["fnValue"]) - 0x7700;
                this["activeData"]["showPage"] = "MACRO", this["activeData"]["chooseLeng" + 'th'] = 0x1, this["activeData"]["isMacroKey"] = !0x0, this["activeData"]["activeKey"] = [_0x412a15["keyValue"]], this["activeData"]["singleHighData"]["macroId"] = _0x531777, this["activeData"]["singleHighData"]["behaviorMo" + 'de'] = 0x0, await _0x43121b(() => {
                    const _0x3fe0f9 = _0x37561e;
                    _0x59d8a8["value"] && _0x59d8a8["value"]["setOldMacr" + 'o'](_0x546a84(this["activeData"]["singleHighData"]));
                });
            }
        } catch {}
    }
    async ["updateList"](_0x16a29b, _0x4aead7, _0x316997) {
        const _0x425d6e = _0x313417;
        let _0x9084a4 = !0x1;
        const _0xb2afe6 = this["activeData"]["macroList"]["find"](_0x412191 => _0x412191["name"] === _0x4aead7["name"]),
            _0xe04c02 = async () => _0x3ce5ea["confirm"]('' + _0x49e218["global"]['t']("reSet.message8"), '' + _0x49e218["global"]['t']("reSet.titl" + 'e4'), {
                'confirmButtonText': _0x49e218["global"]['t']("reSet.confirmText"),
                'showCancel': !0x1
            });
        if (_0xb2afe6 && (_0x16a29b === "Add" || _0xb2afe6['id'] !== _0x4aead7['id'])) {
            await _0xe04c02();
            return;
        }
        const _0xb8a57f = _0x546a84(_0x4aead7);
        _0x9084a4 = await this["updateMacr" + 'o'](_0xb8a57f), _0x9084a4 && (await this["getMacroLi" + 'st'](), await _0x43121b(() => {
            const _0x33e574 = _0x425d6e;
            _0x316997["value"] && _0x316997["value"]["clearValue"]();
        }));
    } ["cancelSetMacro"]() {
        const _0x362d2a = _0x313417;
        this["activeData"]["activeKey"]["length"] = 0x0, this["activeData"]["showPage"] = "common", this["resetChooseLength"]();
    }
    async ["unBindMacr" + 'o'](_0x11ce89) {
        const _0xda99a4 = _0x313417;
        await _0x3ce5ea["confirm"]('' + _0x49e218["global"]['t']("reSet.message9"), '' + _0x49e218["global"]['t']("reSet.titl" + 'e6'), {
            'confirmButtonText': _0x49e218["global"]['t']("reSet.confirmText"),
            'cancelButtonText': _0x49e218["global"]['t']("reSet.cancelText")
        })["then"](async () => {
            const _0x4a3e6e = _0xda99a4;
            var _0x26813e, _0x59faf2;
            if ((_0x26813e = _0x11ce89 == null ? void 0x0 : _0x11ce89["deviceKey"]) != null && _0x26813e["length"]) {
                for (let _0x4d722c of _0x11ce89["deviceKey"]) {
                    let _0x24c4b6 = this["store"]["deviceLayo" + 'ut']["find"](_0x1a96c8 => _0x1a96c8["keyValue"] === Number(_0x4d722c));
                    _0x24c4b6 && await ((_0x59faf2 = this["ServiceDevice"]) == null ? void 0x0 : _0x59faf2["setKeyCode"]({
                        'layer': this["activeData"]["FnLevel"],
                        'row': _0x24c4b6["row"] || 0x0,
                        'col': _0x24c4b6["col"] || 0x0,
                        'keycode': _0x4d722c
                    }));
                }
                await this["getKeyCode"](_0x11ce89 == null ? void 0x0 : _0x11ce89["deviceKey"]), this["cancelSetMacro"]();
            }
        })["catch"](() => {});
    }
    async ["setMacroToKey"](_0x3f043e) {
        const _0x502a9e = _0x313417;
        var _0x358585;
        this["activeData"]["loadKeySet"] = !0x0;
        try {
            await this["setMACROToDevice"](_0x3f043e) && (await this["getKeyCode"]((_0x358585 = this["activeData"]["singleHighData"]) == null ? void 0x0 : _0x358585["deviceKey"]), this["cancelSetMacro"](), await this["getAllHighList"]());
        } catch (_0x30b310) {
            console["error"](_0x30b310);
        }
        this["activeData"]["loadKeySet"] = !0x1;
    } ["bindMacro"](_0x5cae6c) {
        const _0x48cce8 = _0x313417;
        this["setMacroAddData"](), this["activeData"]["singleHighData"]["deviceKey"] = _0x546a84(this["activeData"]["activeKey"]), _0xe2c83c(_0x5cae6c == null ? void 0x0 : _0x5cae6c['id']) && (this["activeData"]["singleHighData"]["macroId"] = _0x5cae6c == null ? void 0x0 : _0x5cae6c['id']), this["activeData"]["showPage"] = "MACRO", this["activeData"]["isMacroKey"] = !0x1, this["activeData"]["chooseLeng" + 'th'] = 0x1;
    } ["clearActiveKey"](_0x3a037e) {
        const _0x26c389 = _0x313417;
        this["activeData"]["activeKey"] = this["activeData"]["activeKey"]["filter"](_0x5d30af => _0x5d30af !== _0x3a037e);
    } ["resetChooseLength"]() {
        const _0x211af5 = _0x313417;
        this["activeData"]["chooseLeng" + 'th'] = this["store"]["deviceLayo" + 'ut']["length"];
    } ["setPageDat" + 'a']() {
        const _0x1ef7f4 = _0x313417;
        var _0x20c38b, _0x3a33a0, _0x4f4fb4, _0x4266d0;
        const _0x3c640a = [],
            _0x2b2135 = [];
        this["activeData"]["pageData"] = [{
            'label': _0x49e218["global"]['t']("keySet.byKey.label1"),
            'data': []
        }, {
            'label': _0x49e218["global"]['t']("keySet.byKey.label2"),
            'data': []
        }, {
            'label': _0x49e218["global"]['t']("keySet.byKey.label7"),
            'data': []
        }, {
            'label': _0x49e218["global"]['t']("keySet.rlwKey.label4"),
            'data': []
        }, {
            'label': _0x49e218["global"]['t']("keySet.byKey.label6"),
            'data': []
        }];
        for (let _0x46c6b0 in this["keyboardMa" + 'p'])
            if (_0xe2c83c((_0x20c38b = this["keyboardMa" + 'p'][_0x46c6b0]) == null ? void 0x0 : _0x20c38b['x']) && _0x3c640a["push"]({
                    ...this["keyboardMa" + 'p'][_0x46c6b0],
                    'keyValue': Number(_0x46c6b0)
                }), _0xe2c83c((_0x3a33a0 = this["keyboardMa" + 'p'][_0x46c6b0]) == null ? void 0x0 : _0x3a33a0["type"])) {
                const _0x13c871 = (_0x4f4fb4 = this["keyboardMa" + 'p'][_0x46c6b0]) == null ? void 0x0 : _0x4f4fb4["type"];
                _0x2b2135[_0x13c871] ?? (_0x2b2135[_0x13c871] = []), _0x2b2135[_0x13c871]["push"]({
                    'keyValue': Number(_0x46c6b0),
                    'title': this["keyboardMa" + 'p'][_0x46c6b0]["defaultKey"],
                    'icon': ((_0x4266d0 = this["keyboardMa" + 'p'][_0x46c6b0]) == null ? void 0x0 : _0x4266d0["icon"]) || ''
                });
            } this["activeData"]["pageData"]["forEach"]((_0x41db45, _0x32ea91) => {
            const _0x23f4d0 = _0x1ef7f4;
            _0x32ea91 ? _0x41db45["data"] = _0x2b2135[_0x32ea91 - 0x1] : _0x41db45["data"] = _0x3c640a;
        });
    }
    async ["getFnList"]() {
        const _0x501ecb = _0x313417;
        this["changeListToPage"]();
    }
    async ["getAllHighList"]() {
        const _0x185070 = _0x313417;
        this["activeData"]["advancedActions"] = [];
        const _0x3731a6 = this["store"]["getProductAdvanceLis" + 't'] || [];
        for (let _0x366711 of this["store"]["deviceLayo" + 'ut']) {
            const _0x2475ca = _0x3731a6["find"](_0x5aef0e => {
                    const _0x113ac2 = _0x185070;
                    var _0x5296d4;
                    return (_0x5296d4 = _0x5aef0e["deviceKey"]) == null ? void 0x0 : _0x5296d4["includes"](_0x366711["keyValue"]);
                }),
                _0x382083 = Number(_0x366711["fnValue"]),
                _0x3154b1 = _0x382083 >= 0x7700 && _0x382083 <= 0x770f;
            _0x366711["highMode"] = (_0x2475ca == null ? void 0x0 : _0x2475ca["icon"]) || (_0x3154b1 ? "MACRO" : '');
        }
    }
    async ["getMacroLi" + 'st']() {
        const _0x281601 = _0x313417;
        var _0x34ea18, _0x292e71;
        this["activeData"]["macroList"] = [];
        const _0x5dc8b6 = await this["ServiceDevice"]["getMacroDa" + 'ta'](),
            _0x1d4e41 = this["store"]["getProductMacroList"];
        if ((_0x34ea18 = _0x5dc8b6 == null ? void 0x0 : _0x5dc8b6["macros"]) != null && _0x34ea18["length"]) {
            const _0x9c6072 = {
                0x2: "keydown",
                0x3: "keyup"
            };
            (_0x292e71 = _0x5dc8b6 == null ? void 0x0 : _0x5dc8b6["macros"]) == null || _0x292e71["forEach"]((_0x26c5a0, _0x420799) => {
                const _0x5d9703 = _0x281601;
                var _0x39a117;
                let _0x1155c2 = [];
                (_0x39a117 = _0x26c5a0["actions"]) != null && _0x39a117["length"] && _0x26c5a0["actions"]["forEach"](_0x3c8c91 => {
                    const _0x315c16 = _0x5d9703;
                    [0x2, 0x3]["includes"](_0x3c8c91["action"]) && _0x1155c2["push"]({
                        'keyStatus': _0x9c6072[_0x3c8c91["action"]],
                        'id': _0x3a298f(),
                        'time': 0xa,
                        'keyValue': _0x2c9fb3[_0x3c8c91["value"]]["browserCod" + 'e']
                    }), _0x3c8c91["action"] === 0x4 && _0xe2c83c(_0x1155c2[_0x1155c2["length"] - 0x1]) && (_0x1155c2[_0x1155c2["length"] - 0x1]["time"] = Math["max"](0xa, Number(_0x3c8c91["value"])));
                });
                let _0x27d895 = 'M' + (_0x420799 + 0x1);
                if (_0x1d4e41 != null && _0x1d4e41["length"]) {
                    let _0x29bb2e = _0x1d4e41["find"](_0x1ce52c => _0x1ce52c['id'] === _0x26c5a0['id']);
                    _0x29bb2e && (_0x27d895 = _0x29bb2e["name"]);
                }
                this["activeData"]["macroList"]["push"]({
                    'id': _0x26c5a0['id'],
                    'name': _0x27d895,
                    'actions': _0x1155c2
                });
            });
        }
    } ["specialSetKey"](_0x5a3f10) {
        const _0x33da1b = _0x313417,
            _0x45656d = _0x546a84(this["defaultPageData"]["singleHighData"]["deviceKey"])["length"],
            _0x198d4f = Array["from"](new Set(_0x5a3f10));
        this["activeData"]["singleHighData"]["deviceKey"] = Array["from"]({
            'length': _0x45656d
        }, (_0x260efa, _0x4642eb) => _0x198d4f[_0x4642eb] ?? '');
    }
    async ["onMountedF" + 'n']() {
        const _0x4cb516 = _0x313417;
        this["activeData"]["loadKeySet"] = !0x0, this["resetChooseLength"](), await this["getFnList"](), await this["getMacroLi" + 'st'](), await this["getAllHighList"](), this["setPageDat" + 'a'](), this["activeData"]["loadKeySet"] = !0x1;
    }
    async ["getKeyCode"](_0x5389f7) {
        const _0x33ce7a = _0x313417;
        var _0x305b8c, _0x248d9a, _0x5cdfda, _0x112a37, _0xb6d7cd;
        if (_0x5389f7["length"])
            for (let _0x53e95a of this["store"]["deviceLayo" + 'ut']) {
                if (!_0x5389f7["includes"](Number(_0x53e95a["keyValue"]))) continue;
                let _0x4fbcd3 = this["store"]["deviceLayo" + 'ut']["find"](_0x15b2a9 => _0x15b2a9["keyValue"] === _0x53e95a["keyValue"]);
                if (!_0x4fbcd3) continue;
                const _0x477408 = await ((_0x305b8c = this["ServiceDevice"]) == null ? void 0x0 : _0x305b8c["getKeyCode"]({
                    'layer': this["activeData"]["FnLevel"],
                    'row': _0x4fbcd3["row"] || 0x0,
                    'col': _0x4fbcd3["col"] || 0x0
                }));
                if (_0x477408) {
                    let _0x28c02 = Object["keys"]((_0x5cdfda = (_0x248d9a = this["store"]["deviceInstance"]) == null ? void 0x0 : _0x248d9a["Info_Class"]) == null ? void 0x0 : _0x5cdfda["keyboardMa" + 'p'])["find"](_0x10be42 => Number(_0x10be42) === _0x477408["keycode"]);
                    if (_0x53e95a["fnValue"] = _0x477408["keycode"], _0x53e95a["highMode"] = '', _0x28c02) {
                        let _0x4406ac = (_0xb6d7cd = (_0x112a37 = this["store"]["deviceInstance"]) == null ? void 0x0 : _0x112a37["Info_Class"]) == null ? void 0x0 : _0xb6d7cd["keyboardMa" + 'p'][Number(_0x28c02)];
                        _0x53e95a["name"] = _0x4406ac["defaultKey"], _0x53e95a["browserCod" + 'e'] = _0x4406ac["browserCod" + 'e'], _0x53e95a["browserVal" + 'ue'] = _0x4406ac["browserVal" + 'ue'], _0x53e95a["icon"] = (_0x4406ac == null ? void 0x0 : _0x4406ac["icon"]) || '';
                    }
                    _0x477408["keycode"] >= 0x5700 && _0x477408["keycode"] <= 0x573f ? _0x53e95a["highMode"] = 'MT' : _0x477408["keycode"] >= 0x5740 && _0x477408["keycode"] <= 0x577f ? _0x53e95a["highMode"] = "TGL" : _0x477408["keycode"] >= 0x7700 && _0x477408["keycode"] <= 0x770f && (_0x53e95a["highMode"] = "MACRO");
                }
            }
    }
    async ["setKey"](_0x12d7ac) {
        const _0x282098 = _0x313417;
        var _0x25bfe8;
        let _0x152fb4 = [];
        if (this["activeData"]["activeKey"]["forEach"](_0x2d2689 => {
                const _0x369efe = _0x282098;
                let _0x57be24 = this["store"]["deviceLayo" + 'ut']["find"](_0x54d492 => _0x54d492["keyValue"] === _0x2d2689);
                _0x57be24 && _0x152fb4["push"]({
                    'row': _0x57be24["row"] || 0x0,
                    'col': _0x57be24["col"] || 0x0
                });
            }), _0x152fb4 != null && _0x152fb4["length"]) {
            for (let {
                    row: _0x4b6a92,
                    col: _0xa70e38
                }
                of _0x152fb4) try {
                await ((_0x25bfe8 = this["ServiceDevice"]) == null ? void 0x0 : _0x25bfe8["setKeyCode"]({
                    'layer': this["activeData"]["FnLevel"],
                    'row': _0x4b6a92,
                    'col': _0xa70e38,
                    'keycode': _0x12d7ac
                }));
            } catch {}
            await this["getKeyCode"](this["activeData"]["activeKey"]);
        }
    } ["changeListToPage"]() {
        const _0x46ad4a = _0x313417;
        this["activeData"]["FnMenu"] = this["store"]["deviceInfo"]["FnMode"] === "Win" ? [{
            'icon': "winBase",
            'label': "Win Base"
        }, {
            'icon': "winBase",
            'label': "Win Fn"
        }, {
            'icon': "winBase",
            'label': "Win Fn1"
        }] : [{
            'icon': "macBase",
            'label': "Mac Base"
        }, {
            'icon': "macBase",
            'label': "Mac Fn"
        }, {
            'icon': "macBase",
            'label': "Mac Fn1"
        }];
    } ["setMacroAddData"]() {
        const _0x2f0b42 = _0x313417;
        for (let _0xa5adf4 in _0x546a84(this["defaultPageData"]["singleHighData"])) {
            const _0x5c395b = _0xa5adf4;
            this["activeData"]["singleHighData"][_0x5c395b] = _0x546a84(this["defaultPageData"]["singleHighData"][_0x5c395b]);
        }
    }
    async ["setMACROToDevice"](_0x2d9063) {
        const _0x13f898 = _0x313417;
        let _0x2b184d = !0x1;
        if (this["activeData"]["singleHighData"]["deviceKey"]["includes"]('') || !_0xe2c83c(this["activeData"]["singleHighData"]["macroId"])) return _0x2b184d;
        try {
            this["activeData"]["isMacroKey"] && await this["deleteHighAction"](_0x2d9063);
            let _0x1cc87c = this["store"]["deviceLayo" + 'ut']["find"](_0x921475 => _0x921475["keyValue"] === this["activeData"]["singleHighData"]["deviceKey"][0x0]);
            _0x1cc87c && await this["ServiceDevice"]["setMacroKe" + 'y']({
                'layer': this["activeData"]["FnLevel"],
                'row': _0x1cc87c["row"] || 0x0,
                'col': _0x1cc87c["col"] || 0x0,
                'macroid': this["activeData"]["singleHighData"]["macroId"]
            }), _0x2b184d = !0x0;
        } catch (_0x3c95d8) {
            console["error"](_0x3c95d8);
        }
        return _0x2b184d;
    }
    async ["deleteHighAction"](_0x343e3f) {
        const _0x5bab75 = _0x313417;
        var _0x198a53, _0x538801;
        let _0x4a3948 = !0x1;
        try {
            if ((_0x198a53 = _0x343e3f == null ? void 0x0 : _0x343e3f["deviceKey"]) != null && _0x198a53["length"]) {
                for (let _0x173c02 of (_0x343e3f == null ? void 0x0 : _0x343e3f["deviceKey"]) ?? []) {
                    let _0x11ab5b = this["store"]["deviceLayo" + 'ut']["find"](_0x18ffd2 => _0x18ffd2["keyValue"] === Number(_0x173c02));
                    _0x11ab5b && await ((_0x538801 = this["ServiceDevice"]) == null ? void 0x0 : _0x538801["setKeyCode"]({
                        'layer': this["activeData"]["FnLevel"],
                        'row': _0x11ab5b["row"] || 0x0,
                        'col': _0x11ab5b["col"] || 0x0,
                        'keycode': _0x173c02
                    }));
                }
                await this["getKeyCode"](_0x343e3f == null ? void 0x0 : _0x343e3f["deviceKey"]);
            }
            _0x4a3948 = !0x0;
        } catch (_0x4df2e3) {
            console["error"](_0x4df2e3);
        }
        return _0x4a3948;
    }
    async ["updateMacr" + 'o'](_0x3d97e1) {
        const _0x496c11 = _0x313417;
        let _0x3ab1ba = !0x1;
        try {
            const _0x2ed210 = _0x546a84(this["activeData"]["macroList"]),
                _0x3e84a4 = _0x2ed210["findIndex"](_0x5c6208 => _0x5c6208['id'] === _0x3d97e1['id']);
            _0x3e84a4 !== -0x1 && (_0x2ed210[_0x3e84a4] = _0x546a84(_0x3d97e1), await this["setMacroToList"](_0x2ed210), this["store"]["setProductMacroList"](_0x2ed210), _0x3ab1ba = !0x0);
        } catch (_0x537f6a) {
            console["error"](_0x537f6a);
        }
        return _0x3ab1ba;
    }
    async ["setMacroToList"](_0x31ac3c) {
        const _0x2d4155 = _0x313417;
        var _0x2c49e4;
        let _0x292411 = [];
        _0x31ac3c != null && _0x31ac3c["length"] && _0x31ac3c["forEach"](_0x3e3b45 => {
            const _0x5b7eca = _0x2d4155;
            let _0x2dfb02 = [];
            _0x3e3b45["actions"]["forEach"]((_0x2088c7, _0x298eee) => {
                const _0xff4c5e = _0x5b7eca;
                let _0x307765 = Object["keys"](_0x2c9fb3)["find"](_0x3aefe4 => _0x2c9fb3[_0x3aefe4]["browserCod" + 'e'] === _0x2088c7["keyValue"]);
                _0x307765 && _0x2dfb02["push"]({
                    'action': _0x2088c7["keyStatus"] === "keydown" ? 0x2 : 0x3,
                    'value': _0x307765["toString"]()
                }, {
                    'action': 0x4,
                    'value': _0x2088c7["time"]["toString"]()
                });
            }), _0x292411["push"]({
                'id': _0x3e3b45['id'],
                'actions': _0x2dfb02
            });
        }), await ((_0x2c49e4 = this["ServiceDevice"]) == null ? void 0x0 : _0x2c49e4["setMacroDa" + 'ta'](_0x292411));
    }
    async ["resetClass"]() {
        const _0x5df63e = _0x313417;
        await this["changeFnLevel"](0x0), Object["assign"](this["activeData"], _0x546a84(this["defaultPageData"]));
    }
}
export {
    V as
    default
};