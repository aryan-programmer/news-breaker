"use client";
import { Button } from "@/components/ui/Button";
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/Sidebar";
import { useStoreAsIs } from "@/hooks/useStore";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useCallback } from "react";
import { create } from "zustand";

export type ElementSettingsSidebarData = {
	name: string;
	element: ReactNode;
	id: string;
};

export type ElementSettingsSidebarStore = {
	data: ElementSettingsSidebarData | null;
	setData(data: ElementSettingsSidebarData | null): void;
};

export const useElementSettingsSidebarStore = create<ElementSettingsSidebarStore>((set) => ({
	data: null,
	setData(data: ElementSettingsSidebarData) {
		set({ data });
	},
}));

export function ElementSettingsSidebarProvider(props: { children: any }) {
	const store = useStoreAsIs(useElementSettingsSidebarStore);
	const onClose = useCallback(() => store?.setData(null), [store]);
	return (
		<SidebarProvider open={store?.data != null}>
			{props.children}
			<Sidebar side="right" variant="floating" collapsible="offcanvas">
				<SidebarHeader>
					<div className="flex justify-between items-center flex-row">
						<span>Settings for {store?.data?.name}</span>
						<Button variant="ghost" rounding="md" className="px-2 py-1" onClick={onClose}>
							<FontAwesomeIcon icon={faXmark} />
						</Button>
					</div>
				</SidebarHeader>
				{store?.data?.element}
			</Sidebar>
		</SidebarProvider>
	);
}
