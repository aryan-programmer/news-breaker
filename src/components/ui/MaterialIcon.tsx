import React from "react";
import { cx, css } from "@emotion/css";
import "material-icons/iconfont/material-icons.css";

export const MaterialIcon = React.forwardRef<HTMLSpanElement, React.PropsWithoutRef<React.HTMLProps<HTMLSpanElement>>>(function Icon(
	{ className, ...props },
	ref,
) {
	return (
		<span
			{...props}
			ref={ref}
			className={cx(
				"material-icons",
				className,
				css`
					font-size: 18px;
					vertical-align: text-bottom;
				`,
			)}
		/>
	);
});
