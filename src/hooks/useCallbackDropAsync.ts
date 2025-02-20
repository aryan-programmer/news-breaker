import { DependencyList, useCallback } from "react";

export function useCallbackDropAsync<TRes, TArgs extends unknown[]>(
	fn: (...args: TArgs) => PromiseLike<TRes>,
	deps: DependencyList,
): (...args: TArgs) => void {
	return useCallback((...args: TArgs) => {
		fn(...args);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
