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

export function FlexboxIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
				stroke="#292D32"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<g opacity="0.5">
				<path d="M10 2V22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 8.5H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 15.5H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</g>
		</svg>
	);
}

export function ImageAddIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M22.0206 16.8198L18.8906 9.49978C18.3206 8.15978 17.4706 7.39978 16.5006 7.34978C15.5406 7.29978 14.6106 7.96978 13.9006 9.24978L12.0006 12.6598C11.6006 13.3798 11.0306 13.8098 10.4106 13.8598C9.78063 13.9198 9.15063 13.5898 8.64063 12.9398L8.42063 12.6598C7.71063 11.7698 6.83063 11.3398 5.93063 11.4298C5.03063 11.5198 4.26063 12.1398 3.75063 13.1498L2.02063 16.5998C1.40063 17.8498 1.46063 19.2998 2.19063 20.4798C2.92063 21.6598 4.19063 22.3698 5.58063 22.3698H18.3406C19.6806 22.3698 20.9306 21.6998 21.6706 20.5798C22.4306 19.4598 22.5506 18.0498 22.0206 16.8198Z"
				fill="#292D32"
			/>
			<path
				d="M6.96984 8.38012C8.83657 8.38012 10.3498 6.86684 10.3498 5.00012C10.3498 3.13339 8.83657 1.62012 6.96984 1.62012C5.10312 1.62012 3.58984 3.13339 3.58984 5.00012C3.58984 6.86684 5.10312 8.38012 6.96984 8.38012Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function FileIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
				fill="#292D32"
			/>
			<path
				d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function FileUploadIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
				fill="#292D32"
			/>
			<path
				d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
				fill="#292D32"
			/>
			<path
				d="M11.5295 12.47L9.52945 10.47C9.51945 10.46 9.50945 10.46 9.50945 10.45C9.44945 10.39 9.36945 10.34 9.28945 10.3C9.27945 10.3 9.27945 10.3 9.26945 10.3C9.18945 10.27 9.10945 10.26 9.02945 10.25C8.99945 10.25 8.97945 10.25 8.94945 10.25C8.88945 10.25 8.81945 10.27 8.75945 10.29C8.72945 10.3 8.70945 10.31 8.68945 10.32C8.60945 10.36 8.52945 10.4 8.46945 10.47L6.46945 12.47C6.17945 12.76 6.17945 13.24 6.46945 13.53C6.75945 13.82 7.23945 13.82 7.52945 13.53L8.24945 12.81V17C8.24945 17.41 8.58945 17.75 8.99945 17.75C9.40945 17.75 9.74945 17.41 9.74945 17V12.81L10.4695 13.53C10.6195 13.68 10.8095 13.75 10.9995 13.75C11.1895 13.75 11.3795 13.68 11.5295 13.53C11.8195 13.24 11.8195 12.76 11.5295 12.47Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function FileDownloadIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
				fill="#292D32"
			/>
			<path
				d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
				fill="#292D32"
			/>
			<path
				d="M12.2795 14.72C11.9895 14.43 11.5095 14.43 11.2195 14.72L10.4995 15.44V11.25C10.4995 10.84 10.1595 10.5 9.74945 10.5C9.33945 10.5 8.99945 10.84 8.99945 11.25V15.44L8.27945 14.72C7.98945 14.43 7.50945 14.43 7.21945 14.72C6.92945 15.01 6.92945 15.49 7.21945 15.78L9.21945 17.78C9.22945 17.79 9.23945 17.79 9.23945 17.8C9.29945 17.86 9.37945 17.91 9.45945 17.95C9.55945 17.98 9.64945 18 9.74945 18C9.84945 18 9.93945 17.98 10.0295 17.94C10.1195 17.9 10.1995 17.85 10.2795 17.78L12.2795 15.78C12.5695 15.49 12.5695 15.01 12.2795 14.72Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function FileExportIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
				fill="#292D32"
			/>
			<path
				d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
				fill="#292D32"
			/>
			<path
				d="M11 17.7499C10.81 17.7499 10.62 17.6799 10.47 17.5299C10.18 17.2399 10.18 16.7599 10.47 16.4699L11.19 15.7499H7C6.59 15.7499 6.25 15.4099 6.25 14.9999C6.25 14.5899 6.59 14.2499 7 14.2499H11.19L10.47 13.5299C10.32 13.3799 10.25 13.1899 10.25 12.9999C10.25 12.8099 10.32 12.6199 10.47 12.4699C10.76 12.1799 11.24 12.1799 11.53 12.4699L13.53 14.4699C13.66 14.5999 13.73 14.7699 13.74 14.9299C13.74 14.9799 13.74 15.0399 13.74 15.0899C13.72 15.2299 13.66 15.3599 13.56 15.4799C13.55 15.4899 13.53 15.5099 13.52 15.5199L11.52 17.5199C11.38 17.6799 11.19 17.7499 11 17.7499Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function FileDeleteIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M16.1898 2H7.81978C4.17978 2 2.00977 4.17 2.00977 7.81V16.18C2.00977 19.82 4.17978 21.99 7.81978 21.99H16.1898C19.8298 21.99 21.9998 19.82 21.9998 16.18V7.81C21.9998 4.17 19.8298 2 16.1898 2Z"
				fill="#292D32"
			/>
			<path
				d="M16.8598 8.46008C16.0198 8.38008 15.2498 8.33008 14.4998 8.28008L14.4198 7.80008C14.3498 7.32008 14.1998 6.33008 12.6898 6.33008H11.2998C9.80979 6.33008 9.6498 7.28008 9.5698 7.79008L9.4898 8.26007C9.0598 8.29007 8.6398 8.31007 8.2098 8.35007L7.11979 8.46008C6.73979 8.50008 6.46979 8.83008 6.50979 9.21008C6.54979 9.56008 6.83979 9.83008 7.18979 9.83008C7.20979 9.83008 7.23979 9.83008 7.25979 9.83008L8.33979 9.72008C8.93979 9.67008 9.54979 9.62008 10.1498 9.59008C11.3698 9.54008 12.5898 9.56008 13.8198 9.62008C14.7298 9.66008 15.6798 9.73008 16.7198 9.83008C16.7398 9.83008 16.7598 9.83008 16.7798 9.83008C17.1298 9.83008 17.4298 9.56008 17.4598 9.21008C17.5098 8.83008 17.2398 8.49008 16.8598 8.46008Z"
				fill="#292D32"
			/>
			<path
				d="M15.8305 11.1001C15.6605 10.9101 15.4105 10.8101 15.1605 10.8101H8.84049C8.59049 10.8101 8.34049 10.9201 8.17049 11.1001C8.00049 11.2901 7.91048 11.5401 7.93048 11.7901L8.2405 15.7501C8.3005 16.6001 8.37049 17.6601 10.2905 17.6601H13.7105C15.6305 17.6601 15.7005 16.6001 15.7605 15.7501L16.0705 11.7901C16.0905 11.5401 16.0005 11.2901 15.8305 11.1001Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function EyeIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M21.25 9.14993C18.94 5.51993 15.56 3.42993 12 3.42993C10.22 3.42993 8.49 3.94993 6.91 4.91993C5.33 5.89993 3.91 7.32993 2.75 9.14993C1.75 10.7199 1.75 13.2699 2.75 14.8399C5.06 18.4799 8.44 20.5599 12 20.5599C13.78 20.5599 15.51 20.0399 17.09 19.0699C18.67 18.0899 20.09 16.6599 21.25 14.8399C22.25 13.2799 22.25 10.7199 21.25 9.14993ZM12 16.0399C9.76 16.0399 7.96 14.2299 7.96 11.9999C7.96 9.76993 9.76 7.95993 12 7.95993C14.24 7.95993 16.04 9.76993 16.04 11.9999C16.04 14.2299 14.24 16.0399 12 16.0399Z"
				fill="#292D32"
			/>
			<path
				d="M12.0004 9.13989C10.4304 9.13989 9.15039 10.4199 9.15039 11.9999C9.15039 13.5699 10.4304 14.8499 12.0004 14.8499C13.5704 14.8499 14.8604 13.5699 14.8604 11.9999C14.8604 10.4299 13.5704 9.13989 12.0004 9.13989Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function EyeSlashIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} viewBox="2 1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M21.2496 9.15004C20.7596 8.37004 20.1996 7.67004 19.6196 7.04004L15.8496 10.81C15.9696 11.18 16.0396 11.58 16.0396 12C16.0396 14.24 14.2296 16.04 11.9996 16.04C11.5796 16.04 11.1796 15.97 10.8096 15.85L7.34961 19.31C8.80961 20.13 10.3896 20.56 11.9996 20.56C13.7796 20.56 15.5096 20.04 17.0896 19.07C18.6696 18.09 20.0896 16.66 21.2496 14.84C22.2496 13.28 22.2496 10.72 21.2496 9.15004Z"
				fill="#292D32"
			/>
			<path
				d="M14.0206 9.97989L9.98062 14.0199C9.47062 13.4999 9.14062 12.7799 9.14062 11.9999C9.14062 10.4299 10.4206 9.13989 12.0006 9.13989C12.7806 9.13989 13.5006 9.46989 14.0206 9.97989Z"
				fill="#292D32"
			/>
			<path
				opacity="0.4"
				d="M18.25 5.74993L14.86 9.13993C14.13 8.39993 13.12 7.95993 12 7.95993C9.76 7.95993 7.96 9.76993 7.96 11.9999C7.96 13.1199 8.41 14.1299 9.14 14.8599L5.76 18.2499H5.75C4.64 17.3499 3.62 16.1999 2.75 14.8399C1.75 13.2699 1.75 10.7199 2.75 9.14993C3.91 7.32993 5.33 5.89993 6.91 4.91993C8.49 3.95993 10.22 3.42993 12 3.42993C14.23 3.42993 16.39 4.24993 18.25 5.74993Z"
				fill="#292D32"
			/>
			<path
				d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z"
				fill="#292D32"
			/>
			<path
				d="M21.7709 2.22988C21.4709 1.92988 20.9809 1.92988 20.6809 2.22988L2.23086 20.6899C1.93086 20.9899 1.93086 21.4799 2.23086 21.7799C2.38086 21.9199 2.57086 21.9999 2.77086 21.9999C2.97086 21.9999 3.16086 21.9199 3.31086 21.7699L21.7709 3.30988C22.0809 3.00988 22.0809 2.52988 21.7709 2.22988Z"
				fill="#292D32"
			/>
		</svg>
	);
}

export function CardIcon({ height = 24, width = 24 }: IconProps) {
	return (
		<svg width={width} height={height} fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M4,21H20a3,3,0,0,0,3-3V6a3,3,0,0,0-3-3H4A3,3,0,0,0,1,6V18A3,3,0,0,0,4,21ZM3,6A1,1,0,0,1,4,5H20a1,1,0,0,1,1,1V18a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1ZM5,16a1,1,0,0,1,1-1H9a1,1,0,0,1,0,2H6A1,1,0,0,1,5,16Zm0-3a1,1,0,0,1,1-1h6a1,1,0,0,1,0,2H6A1,1,0,0,1,5,13Z" />
		</svg>
	);
}
