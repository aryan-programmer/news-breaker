/*
 * Generated type guards for "editor-data-store.tsx".
 * WARNING: Do not manually change this file.
 */
import { TableCellPercentageWidthsRecord } from "./editor-data-store";

export function isTableCellPercentageWidthsRecord(obj: unknown): obj is TableCellPercentageWidthsRecord {
    const typedObj = obj as TableCellPercentageWidthsRecord
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Object.entries<any>(typedObj)
            .every(([key, value]) => (typeof value === "string" &&
                typeof key === "string"))
    )
}
