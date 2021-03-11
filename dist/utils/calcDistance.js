"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = calcDistance;

function calcDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
}