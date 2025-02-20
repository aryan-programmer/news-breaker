interface IconProps {
	height?: number;
	width?: number;
}

export function UndoIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
		</svg>
	);
}

export function BoldIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"></path>
			<path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"></path>
		</svg>
	);
}

export function ItalicIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M11 5l6 0"></path>
			<path d="M7 19l6 0"></path>
			<path d="M14 5l-4 14"></path>
		</svg>
	);
}

export function UnderlineIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M7 5v5a5 5 0 0 0 10 0v-5"></path>
			<path d="M5 19h14"></path>
		</svg>
	);
}

export function TableIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
			<path d="M3 10h18"></path>
			<path d="M10 3v18"></path>
		</svg>
	);
}

export function TableFilledIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path
				d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z"
				strokeWidth="0"
				fill="currentColor"></path>
			<path
				d="M21 12v6a3 3 0 0 1 -2.824 2.995l-.176 .005h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1z"
				strokeWidth="0"
				fill="currentColor"></path>
			<path
				d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z"
				strokeWidth="0"
				fill="currentColor"></path>
			<path
				d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z"
				strokeWidth="0"
				fill="currentColor"></path>
		</svg>
	);
}

export function TablePlusIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path>
			<path d="M3 10h18"></path>
			<path d="M10 3v18"></path>
			<path d="M16 19h6"></path>
			<path d="M19 16v6"></path>
		</svg>
	);
}

export function TableMinusIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10"></path>
			<path d="M3 10h18"></path>
			<path d="M10 3v18"></path>
			<path d="M16 19h6"></path>
		</svg>
	);
}

export function RowIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
			<path d="M9 3l-6 6"></path>
			<path d="M14 3l-7 7"></path>
			<path d="M19 3l-7 7"></path>
			<path d="M21 6l-4 4"></path>
			<path d="M3 10h18"></path>
			<path d="M10 10v11"></path>
		</svg>
	);
}

export function RowInsertBottomIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z"></path>
			<path d="M12 15l0 4"></path>
			<path d="M14 17l-4 0"></path>
		</svg>
	);
}

export function RowInsertTopIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M4 18v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z"></path>
			<path d="M12 9v-4"></path>
			<path d="M10 7l4 0"></path>
		</svg>
	);
}

export function RowRemoveIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z"></path>
			<path d="M10 16l4 4"></path>
			<path d="M10 20l4 -4"></path>
		</svg>
	);
}

export function ColumnIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
			<path d="M10 10h11"></path>
			<path d="M10 3v18"></path>
			<path d="M9 3l-6 6"></path>
			<path d="M10 7l-7 7"></path>
			<path d="M10 12l-7 7"></path>
			<path d="M10 17l-4 4"></path>
		</svg>
	);
}

export function ColumnInsertLeftIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z"></path>
			<path d="M5 12l4 0"></path>
			<path d="M7 10l0 4"></path>
		</svg>
	);
}

export function ColumnInsertRightIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z"></path>
			<path d="M15 12l4 0"></path>
			<path d="M17 10l0 4"></path>
		</svg>
	);
}

export function ColumnRemoveIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z"></path>
			<path d="M16 10l4 4"></path>
			<path d="M16 14l4 -4"></path>
		</svg>
	);
}

export function MergeCellIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
			<path d="M15 3l-12 12"></path>
			<path d="M9.5 3l-6 6"></path>
			<path d="M20 3.5l-5.5 5.5"></path>
			<path d="M9 15l-5 5"></path>
			<path d="M21 9h-12v12"></path>
		</svg>
	);
}

export function SplitCellIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
			<path d="M15 3l-12 12"></path>
			<path d="M9.5 3l-6 6"></path>
			<path d="M20 3.5l-5.5 5.5"></path>
			<path d="M9 15l-5 5"></path>
			<path d="M21 9h-12v12"></path>
			<path d="M13 13l4 4"></path>
			<path d="M13 17l4 -4"></path>
		</svg>
	);
}

export function ChevronDownIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M6 9l6 6l6 -6"></path>
		</svg>
	);
}

export function BrandGithubIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
		</svg>
	);
}

export function ClipboardIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
			<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
		</svg>
	);
}

export function ClipboardCheckIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
			<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
			<path d="M9 14l2 2l4 -4"></path>
		</svg>
	);
}

export function PageBreakIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
			<path d="M1,6 L3,6 C3.55228475,6 4,6.44771525 4,7 C4,7.55228475 3.55228475,8 3,8 L1,8 C0.44771525,8 0,7.55228475 0,7 C0,6.44771525 0.44771525,6 1,6 Z M11,6 L13,6 C13.5522847,6 14,6.44771525 14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 C10,6.44771525 10.4477153,6 11,6 Z M6,6 L8,6 C8.55228475,6 9,6.44771525 9,7 C9,7.55228475 8.55228475,8 8,8 L6,8 C5.44771525,8 5,7.55228475 5,7 C5,6.44771525 5.44771525,6 6,6 Z M0,1 C0,0.44771525 0.44771525,-2.26485497e-13 1,-2.26485497e-13 C1.55228475,-2.26485497e-13 2,0.44771525 2,1 L2,3.0142458 L12,3.0142458 L12,1 C12,0.44771525 12.4477153,-2.26485497e-13 13,-2.26485497e-13 C13.5522847,-2.26485497e-13 14,0.44771525 14,1 L14,3.0142458 C14,4.1188153 13.1045695,5.0142458 12,5.0142458 L2,5.0142458 C0.8954305,5.0142458 0,4.1188153 0,3.0142458 L0,1 Z M0,13.0142458 L0,11 C0,9.8954305 0.8954305,9 2,9 L12,9 C13.1045695,9 14,9.8954305 14,11 L14,13.0142458 C14,13.5665305 13.5522847,14.0142458 13,14.0142458 C12.4477153,14.0142458 12,13.5665305 12,13.0142458 L12,11 L2,11 L2,13.0142458 C2,13.5665305 1.55228475,14.0142458 1,14.0142458 C0.44771525,14.0142458 0,13.5665305 0,13.0142458 Z" />
		</svg>
	);
}

export function HeaderFooterIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17.7447 1.99585C18.9356 1.99585 19.9104 2.92101 19.9896 4.0918L19.9947 4.24585V19.7439C19.9947 20.9348 19.0696 21.9096 17.8988 21.9887L17.7447 21.9939H6.24487C5.05401 21.9939 4.07923 21.0688 4.00006 19.898L3.99487 19.7439V4.24585C3.99487 3.05499 4.92003 2.0802 6.09082 2.00104L6.24487 1.99585H17.7447ZM17.7447 3.49585H6.24487C5.86518 3.49585 5.55138 3.778 5.50172 4.14408L5.49487 4.24585V19.7439C5.49487 20.1236 5.77703 20.4374 6.1431 20.4871L6.24487 20.4939H17.7447C18.1244 20.4939 18.4382 20.2118 18.4879 19.8457L18.4947 19.7439V4.24585C18.4947 3.86615 18.2126 3.55236 17.8465 3.5027L17.7447 3.49585Z"
				fill="#212121"
			/>
			<path
				d="M7.00006 6.75006C7.00006 5.78357 7.78357 5.00006 8.75006 5.00006H15.2501C16.2166 5.00006 17.0001 5.78357 17.0001 6.75006V8.25006C17.0001 9.21656 16.2166 10.0001 15.2501 10.0001H8.75006C7.78357 10.0001 7.00006 9.21656 7.00006 8.25006V6.75006ZM8.75006 6.50006C8.61199 6.50006 8.50006 6.61199 8.50006 6.75006V8.25006C8.50006 8.38814 8.61199 8.50006 8.75006 8.50006H15.2501C15.3881 8.50006 15.5001 8.38814 15.5001 8.25006V6.75006C15.5001 6.61199 15.3881 6.50006 15.2501 6.50006H8.75006Z"
				fill="#212121"
			/>
			<path
				d="M7.00006 15.7501C7.00006 14.7836 7.78357 14.0001 8.75006 14.0001H15.2501C16.2166 14.0001 17.0001 14.7836 17.0001 15.7501V17.2501C17.0001 18.2166 16.2166 19.0001 15.2501 19.0001H8.75006C7.78357 19.0001 7.00006 18.2166 7.00006 17.2501V15.7501ZM8.75006 15.5001C8.61199 15.5001 8.50006 15.612 8.50006 15.7501V17.2501C8.50006 17.3881 8.61199 17.5001 8.75006 17.5001H15.2501C15.3881 17.5001 15.5001 17.3881 15.5001 17.2501V15.7501C15.5001 15.612 15.3881 15.5001 15.2501 15.5001H8.75006Z"
				fill="#212121"
			/>
		</svg>
	);
}

export function PageNumberIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17.7447 1.99579C18.9356 1.99579 19.9104 2.92095 19.9896 4.09174L19.9947 4.24579V19.7439C19.9947 20.9347 19.0696 21.9095 17.8988 21.9887L17.7447 21.9939H6.24487C5.05401 21.9939 4.07923 21.0687 4.00006 19.8979L3.99487 19.7439V4.24579C3.99487 3.05492 4.92003 2.08014 6.09082 2.00098L6.24487 1.99579H17.7447ZM17.7447 3.49579H6.24487C5.86518 3.49579 5.55138 3.77794 5.50172 4.14402L5.49487 4.24579V19.7439C5.49487 20.1236 5.77703 20.4373 6.1431 20.487L6.24487 20.4939H17.7447C18.1244 20.4939 18.4382 20.2117 18.4879 19.8456L18.4947 19.7439V4.24579C18.4947 3.86609 18.2126 3.5523 17.8465 3.50264L17.7447 3.49579Z"
				fill="#212121"
			/>
			<path
				d="M13.0189 16.0189C12.6098 15.9541 12.3307 15.5699 12.3954 15.1608L12.5001 14.5H11.0188L10.877 15.3954C10.8122 15.8045 10.428 16.0836 10.0189 16.0189C9.60979 15.9541 9.33065 15.5699 9.39543 15.1608L9.50006 14.5H8.75006C8.33585 14.5 8.00006 14.1642 8.00006 13.75C8.00006 13.3357 8.33585 13 8.75006 13H9.73757L9.97507 11.5H9.25006C8.83585 11.5 8.50006 11.1642 8.50006 10.75C8.50006 10.3357 8.83585 9.99996 9.25007 9.99996H10.2126L10.4119 8.74078C10.4767 8.33166 10.8609 8.05252 11.27 8.11729C11.6791 8.18207 11.9583 8.56624 11.8935 8.97536L11.7313 9.99996H13.2126L13.4119 8.74078C13.4767 8.33166 13.8609 8.05252 14.27 8.11729C14.6791 8.18207 14.9583 8.56624 14.8935 8.97536L14.7313 9.99996H15.2501C15.6643 9.99996 16.0001 10.3357 16.0001 10.75C16.0001 11.1642 15.6643 11.5 15.2501 11.5H14.4938L14.2563 13H14.7501C15.1643 13 15.5001 13.3357 15.5001 13.75C15.5001 14.1642 15.1643 14.5 14.7501 14.5H14.0188L13.877 15.3954C13.8122 15.8045 13.428 16.0836 13.0189 16.0189ZM11.4938 11.5L11.2563 13H12.7376L12.9751 11.5H11.4938Z"
				fill="#212121"
			/>
		</svg>
	);
}
