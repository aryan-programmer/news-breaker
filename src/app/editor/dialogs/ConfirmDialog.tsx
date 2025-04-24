"use client";

import { Button } from "@/components/ui/Button";
import { DialogClose, DialogFooter } from "@/components/ui/Dialog";
import { useCallback } from "react";
import { DialogStore } from "./DialogProvider";

export function ConfirmDialog({ resolve, yes, no }: { resolve: (v: boolean) => void; yes: string; no: string }): React.ReactNode {
	const onYes = useCallback(() => {
		resolve(true);
	}, [resolve]);
	return (
		<>
			<DialogFooter className="">
				<Button variant="default" onClick={onYes}>
					{yes}
				</Button>
				<DialogClose asChild>
					<Button type="button">{no}</Button>
				</DialogClose>
			</DialogFooter>
		</>
	);
}

export function showConfirmDialog(
	dialogStore: DialogStore,
	{ title, description, yes, no }: { title: string; description: string; yes: string; no: string },
) {
	return dialogStore.showDialog<boolean>({
		title,
		description,
		element(resolve, _reject) {
			return {
				content: <ConfirmDialog yes={yes} no={no} resolve={resolve} />,
				closeHandler() {
					resolve(false);
				},
			};
		},
	});
}
