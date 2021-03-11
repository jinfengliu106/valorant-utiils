"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(match) {
  var _match$players$;

  return (match === null || match === void 0 ? void 0 : (_match$players$ = match.players[0]) === null || _match$players$ === void 0 ? void 0 : _match$players$.puuid) ? 'puuid' : 'subject';
};

exports["default"] = _default;