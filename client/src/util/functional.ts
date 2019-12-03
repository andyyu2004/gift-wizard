

export function compose<T, U, V>(f: (a: U) => V, g: (b: T) => U): (c: T) => V {
    return x => f(g(x));
}