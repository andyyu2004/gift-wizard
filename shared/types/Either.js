"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Right = /** @class */ (function () {
    function Right(rval) {
        this.rval = rval;
        this.tag = "right";
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.rval));
    };
    Right.prototype.map_left = function (f) {
        return new Right(this.rval);
    };
    Right.prototype.bind = function (f) {
        return f(this.rval);
    };
    Right.prototype.match = function (f, g) {
        return g(this.rval);
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.unwrap = function () {
        return this.rval;
    };
    Right.prototype.err = function () {
        throw new Error("Expected Left, found Right");
    };
    Right.prototype.unwrapOrElse = function (f) {
        return this.rval;
    };
    return Right;
}());
exports.Right = Right;
var Left = /** @class */ (function () {
    function Left(lval) {
        this.lval = lval;
        this.tag = "left";
    }
    Left.prototype.map = function (f) {
        return new Left(this.lval);
    };
    Left.prototype.map_left = function (f) {
        return new Left(f(this.lval));
    };
    Left.prototype.bind = function (f) {
        return new Left(this.lval);
    };
    Left.prototype.match = function (f, g) {
        return f(this.lval);
    };
    Left.prototype.isLeft = function () {
        return true;
    };
    Left.prototype.isRight = function () {
        return false;
    };
    Left.prototype.unwrap = function () {
        throw new Error("Unwrap of left either!");
    };
    Left.prototype.err = function () {
        return this.lval;
    };
    Left.prototype.unwrapOrElse = function (f) {
        return f(this.lval);
    };
    return Left;
}());
exports.Left = Left;
