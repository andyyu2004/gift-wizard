"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Right {
    constructor(rval) {
        this.rval = rval;
        this.tag = "right";
    }
    map(f) {
        return new Right(f(this.rval));
    }
    mapLeft(f) {
        return new Right(this.rval);
    }
    bind(f) {
        return f(this.rval);
    }
    bindAsync(f) {
        return f(this.rval);
    }
    match(f, g) {
        return g(this.rval);
    }
    isLeft() {
        return false;
    }
    isRight() {
        return true;
    }
    unwrap() {
        return this.rval;
    }
    err() {
        throw new Error("Expected Left, found Right");
    }
    unwrapOrElse(f) {
        return this.rval;
    }
}
exports.Right = Right;
class Left {
    constructor(lval) {
        this.lval = lval;
        this.tag = "left";
    }
    map(f) {
        return new Left(this.lval);
    }
    mapLeft(f) {
        return new Left(f(this.lval));
    }
    bind(f) {
        return new Left(this.lval);
    }
    bindAsync(f) {
        return Promise.resolve(new Left(this.lval));
    }
    match(f, g) {
        return f(this.lval);
    }
    isLeft() {
        return true;
    }
    isRight() {
        return false;
    }
    unwrap() {
        throw new Error("Unwrap of left either!");
    }
    err() {
        return this.lval;
    }
    unwrapOrElse(f) {
        return f(this.lval);
    }
}
exports.Left = Left;
