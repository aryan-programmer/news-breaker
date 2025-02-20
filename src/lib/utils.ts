import { clsx, type ClassValue } from "clsx";
import color from "color-string";
import React from "react";
import { twMerge } from "tailwind-merge";

export const DATA_GIF_URL =
	"data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function forwardFnDropAsync<TRes, TArgs extends unknown[]>(fn: (...args: TArgs) => PromiseLike<TRes>) {
	return (...args: TArgs) => {
		fn(...args);
	};
}

export function blockClick<T, E = MouseEvent>(ev: React.MouseEvent<T, E>) {
	ev.stopPropagation();
}

export function colorValidator(val: string) {
	try {
		return color.get(val) != null;
	} catch {
		return false;
	}
}
