export declare type Either<L, R> = Left<L, R> | Right<L, R>;
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
export declare class Right<L, R> implements IEither<L, R> {
    private rval;
    constructor(rval: R);
    tag: string;
    map<T>(f: (x: R) => T): IEither<L, T>;
    mapLeft<T>(f: (x: L) => T): IEither<T, R>;
    bind<T>(f: (x: R) => IEither<L, T>): IEither<L, T>;
    bindAsync<T>(f: (x: R) => Promise<IEither<L, T>>): Promise<IEither<L, T>>;
    match<T>(f: (l: L) => T, g: (r: R) => T): T;
    isLeft(): boolean;
    isRight(): boolean;
    unwrap(): R;
    err(): void;
    unwrapOrElse(f: (l: L) => R): R;
}
export declare class Left<L, R> implements IEither<L, R> {
    private lval;
    constructor(lval: L);
    tag: string;
    map<T>(f: (x: R) => T): IEither<L, T>;
    mapLeft<T>(f: (x: L) => T): IEither<T, R>;
    bind<T>(f: (x: R) => IEither<L, T>): IEither<L, T>;
    bindAsync<T>(f: (x: R) => Promise<IEither<L, T>>): Promise<IEither<L, T>>;
    match<T>(f: (l: L) => T, g: (r: R) => T): T;
    isLeft(): boolean;
    isRight(): boolean;
    unwrap(): void;
    err(): L;
    unwrapOrElse(f: (l: L) => R): R;
}
