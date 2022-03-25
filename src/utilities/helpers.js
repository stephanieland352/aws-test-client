export const identity = i => i;

export const makeThrowError = type => error => {
    throw new Error(type, error)
}