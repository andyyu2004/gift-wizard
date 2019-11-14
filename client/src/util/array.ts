
// export const getRandom = (xs: any[]) => xs[Math.floor(Math.random() * xs.length)];

export function getRandom<T>(xs: T[]) {
    return xs[Math.floor(Math.random() * xs.length)];
}
