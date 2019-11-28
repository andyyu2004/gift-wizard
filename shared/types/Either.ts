export type Either<L, R> = Left<L, R> | Right<L, R>;

export interface IEither<L, R> {
    tag: string;
    /** If left, then no change; if right, then apply f to the contained value */
    map<T>(f: (x: R) => T): IEither<L, T>;
    /** Similar to map, but applies on left instead of right */
    mapLeft<T>(f: (x: L) => T): IEither<T, R>;
    bind<T>(f: (x: R) => IEither<L, T>): IEither<L, T>;
    bindAsync<T>(f: (x: R) => Promise<IEither<L, T>>): Promise<IEither<L, T>>;
    match<T>(f: (l: L) => T, g: (r: R) => T): T;
    isLeft(): boolean;
    isRight(): boolean;
    /** Unwraps right */
    unwrap(): R | void;
    /** Unwraps the left */
    err(): L | void; 
    unwrapOrElse(f: (l: L) => R): R;
}

export class Right<L, R> implements IEither<L, R> {

    constructor(private rval: R) {}

    tag = "right";

    map<T>(f: (x: R) => T): IEither<L, T> {
        return new Right<L, T>(f(this.rval));
    }

    mapLeft<T>(f: (x: L) => T): IEither<T, R> {
        return new Right(this.rval);
    }

    bind<T>(f: (x: R) => IEither<L, T>): IEither<L, T> {
        return f(this.rval);
    }

    bindAsync<T>(f: (x: R) => Promise<IEither<L, T>>): Promise<IEither<L, T>> {
        return f(this.rval);
    }

    match<T>(f: (l: L) => T, g: (r: R) => T): T {
        return g(this.rval);
    }

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }

    unwrap() {
        return this.rval;
    }
    
    err() {
        throw new Error("Expected Left, found Right");
    }

    unwrapOrElse(f: (l: L) => R): R {
        return this.rval;
    }

}

export class Left<L, R> implements IEither<L, R> {

    constructor(private lval: L) { }

    tag = "left";

    map<T>(f: (x: R) => T): IEither<L, T> {
        return new Left(this.lval);
    }

    mapLeft<T>(f: (x: L) => T): IEither<T, R> {
        return new Left(f(this.lval));
    }

    bind<T>(f: (x: R) => IEither<L, T>): IEither<L, T> {
        return new Left(this.lval);
    }

    bindAsync<T>(f: (x: R) => Promise<IEither<L, T>>): Promise<IEither<L, T>> {
        return Promise.resolve(new Left(this.lval));
    }

    match<T>(f: (l: L) => T, g: (r: R) => T): T {
        return f(this.lval);
    }

    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }

    unwrap() {
        throw new Error("Unwrap of left either!");
    }

    err() {
        return this.lval;
    }

    unwrapOrElse(f: (l: L) => R): R {
        return f(this.lval);
    }

}

