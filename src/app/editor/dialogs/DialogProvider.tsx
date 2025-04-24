"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useStoreAsIs } from "@/hooks/useStore";
import { ReactNode } from "react";
import { create } from "zustand";

export type DialogData = {
	title: string;
	description: string;
	content: ReactNode;
	closeHandler: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export type DialogStore = {
	data: DialogData | null;
	showDialog<T>(v: {
		title: string;
		description: string;
		element: (
			resolve: (value: T | PromiseLike<T>) => void,
			reject: (reason?: any) => void,
		) => {
			content: ReactNode;
			closeHandler: () => void;
		};
	}): Promise<T>;
};

export const useDialogStore = create<DialogStore>((set, get) => ({
	data: null,
	showDialog<T>({
		title,
		description,
		element,
	}: {
		title: string;
		description: string;
		element: (
			resolve: (value: T | PromiseLike<T>) => void,
			reject: (reason?: any) => void,
		) => {
			content: ReactNode;
			closeHandler: () => void;
		};
	}): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			let done = false;
			const setOpen = (open: boolean) => {
				if (!open) {
					closeHandler();
					const res = get();
					if (res != null && res.data != null) {
						set({ data: { ...res.data, open } });
					}
					setTimeout(() => {
						set({ data: null });
					}, 1000);
				}
			};
			function resolve2(value: T | PromiseLike<T>): void {
				if (done) return;
				done = true;
				resolve(value);
				setOpen(false);
			}
			function reject2(value?: any): void {
				if (done) return;
				done = true;
				// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
				reject(value);
				setOpen(false);
			}
			const { closeHandler, content } = element(resolve2, reject2);
			set({
				data: {
					title,
					description,
					content,
					closeHandler,
					open: true,
					setOpen,
				},
			});
		});
	},
}));

function DialogDisplayer({ dialogData }: { dialogData: DialogData }) {
	return (
		<Dialog open={dialogData.open} onOpenChange={dialogData.setOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{dialogData.title}</DialogTitle>
					<DialogDescription>{dialogData.description}</DialogDescription>
				</DialogHeader>
				{dialogData.content}
			</DialogContent>
		</Dialog>
	);
}

export function DialogProvider({ children }: { children: any }) {
	const store = useStoreAsIs(useDialogStore);
	return (
		<>
			{children}
			{store?.data == null ? null : <DialogDisplayer dialogData={store.data} />}
		</>
	);
}
