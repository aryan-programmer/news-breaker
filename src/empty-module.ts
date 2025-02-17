const _EMPTY = {};
export default _EMPTY;
declare global {
	interface ReadonlyArray<T> {
		includes<U>(x: U & (T & U extends never ? never : unknown)): boolean;
	}
	interface Array<T> {
		includes<U>(x: U & (T & U extends never ? never : unknown)): boolean;
	}
}
