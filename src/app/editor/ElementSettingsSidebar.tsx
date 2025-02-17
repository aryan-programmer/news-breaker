import { Button } from "@/components/ui/button";
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
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

const createElementSettingsSidebarStore = (data: ElementSettingsSidebarData | null) =>
	create<ElementSettingsSidebarStore>((set) => ({
		data,
		setData(data: ElementSettingsSidebarData) {
			set({ data });
		},
	}));

const ElementSettingsSidebarStoreContext = createContext<ReturnType<typeof createElementSettingsSidebarStore> | null>(null);

export const useElementSettingsSidebarStore = () => {
	const res = useContext(ElementSettingsSidebarStoreContext);
	if (!res) throw new Error("useElementSettingsSidebarStore must be used within a ElementSettingsSidebarStoreProvider");
	return res;
};

export function ElementSettingsSidebarProvider(props: { children: any }) {
	const [store] = useState(() => createElementSettingsSidebarStore(null));
	const storeRes = store();
	const onClose = useCallback(() => storeRes.setData(null), [storeRes]);
	return (
		<ElementSettingsSidebarStoreContext.Provider value={store}>
			<SidebarProvider open={storeRes.data != null}>
				{props.children}
				<Sidebar side="right" variant="floating" collapsible="offcanvas">
					<SidebarHeader>
						<div className="flex justify-between items-center flex-row">
							<span>Settings for {storeRes.data?.name}</span>
							<Button variant="ghost" rounding="md" className="px-2 py-1" onClick={onClose}>
								<FontAwesomeIcon icon={faXmark} />
							</Button>
						</div>
					</SidebarHeader>
					{storeRes.data?.element}
				</Sidebar>
			</SidebarProvider>
		</ElementSettingsSidebarStoreContext.Provider>
	);
}
