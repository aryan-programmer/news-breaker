import { clsx, type ClassValue } from "clsx";
import color from "color-string";
import React from "react";
import { twMerge } from "tailwind-merge";

export const DATA_GIF_URL =
	"data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

export const DEMO_IMAGE_URL =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Standard_Model_of_Elementary_Particles.svg/2140px-Standard_Model_of_Elementary_Particles.svg.png";

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

const char_a = "a".charCodeAt(0);

export function pageNumberToLowerAlpha(i: number) {
	if (i <= 26) {
		return String.fromCharCode(char_a + i - 1);
	}
	let res = "";
	while (i > 0) {
		const rem = i % 26;

		if (rem === 0) {
			res = "z" + res;
			i = Math.floor(i / 26) - 1;
		} else {
			res = String.fromCharCode(rem - 1 + char_a) + res;
			i = Math.floor(i / 26);
		}
	}
	return res;
}

export function isNonNullAndNonEmpty(v: string | null | undefined): v is string {
	return !(v == null || v.length === 0);
}

export function coreceEmptyToUndef(v: string | null | undefined): string | undefined {
	return v == null || v.length === 0 ? undefined : v;
}

export function coreceEmptyOrTransparentToUndef(v: string | null | undefined): string | undefined {
	return v == null || v.length === 0 || v === "#00000000" ? undefined : v;
}

export function anchorXToJustifyContentClass(anchorX: "left" | "right" | "center" | null | undefined) {
	switch (anchorX) {
		case "left":
			return "justify-start";
		case "right":
			return "justify-end";
		case "center":
		case undefined:
		case null:
		default:
			return "justify-center";
	}
}

export function anchorYToAlignItemsClass(anchorX: "top" | "bottom" | "center" | null | undefined) {
	switch (anchorX) {
		case "top":
			return "items-start";
		case "bottom":
			return "items-end";
		case "center":
		case undefined:
		case null:
		default:
			return "items-center";
	}
}

export function prefixUrlWithSiteNameIfNecessary(url: string): string;
export function prefixUrlWithSiteNameIfNecessary(url: string | null | undefined): string | null | undefined;
export function prefixUrlWithSiteNameIfNecessary(url: string | null | undefined): string | null | undefined {
	if (url == null) return url;
	else if (url.startsWith("/")) return window.location.origin + url;
	else return url;
}

export function isNumeric(value: string): boolean {
	// @ts-expect-error Req see https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172
	return !isNaN(value - parseFloat(value));
}
