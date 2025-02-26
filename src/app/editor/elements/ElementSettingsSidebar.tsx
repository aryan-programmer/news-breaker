"use client";
import { Button } from "@/components/ui/Button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/Sidebar";
import { useStoreAsIs } from "@/hooks/useStore";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useCallback } from "react";
import { Path } from "slate";
import { create } from "zustand";
import { CustomElement } from "../types";

export type ElementSettingsSidebarData = {
	name: string;
	sidebarContent: ReactNode;
	element: CustomElement;
	path: Path;
};

export type ElementSettingsSidebarStore = {
	data: ElementSettingsSidebarData | null;
	setData(data: ElementSettingsSidebarData | null): void;
	updateElementData(element: CustomElement): void;
};

export const useElementSettingsSidebarStore = create<ElementSettingsSidebarStore>((set, get) => ({
	data: null,
	setData(data: ElementSettingsSidebarData) {
		set({ data });
	},
	updateElementData(element) {
		const v = get();
		if (v.data != null && element.id === v.data.element.id) {
			set({ data: { ...v.data, element } });
		}
	},
}));

export function ElementSettingsSidebarProvider(props: { children: any }) {
	const store = useStoreAsIs(useElementSettingsSidebarStore);
	const onClose = useCallback(() => store?.setData(null), [store]);
	return (
		<SidebarProvider open={store?.data != null}>
			{props.children}
			<Sidebar side="right" variant="floating" collapsible="offcanvas" key={store?.data?.element?.id}>
				<SidebarHeader>
					<div className="flex justify-between items-center flex-row">
						<span>Settings for {store?.data?.name}</span>
						<Button variant="ghost" rounding="md" className="px-2 py-1" onClick={onClose}>
							<FontAwesomeIcon icon={faXmark} />
						</Button>
					</div>
				</SidebarHeader>
				<SidebarContent>{store?.data?.sidebarContent}</SidebarContent>
			</Sidebar>
		</SidebarProvider>
	);
}
