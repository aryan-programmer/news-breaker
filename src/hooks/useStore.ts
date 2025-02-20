import { useEffect, useState } from "react";

function useStore<T, F>(store: <U>(selector: (state: T) => U) => U, callback: (state: T) => F) {
	const result = store(callback);
	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
}

export function useStoreAsIs<T>(store: <V>(callback: (state: T) => V) => V) {
	const result = store((v) => v);
	const [data, setData] = useState<T>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
}

export default useStore;
