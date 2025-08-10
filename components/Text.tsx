/* eslint-disable @typescript-eslint/no-explicit-any */

export const Title = ({
	children,
	...props
}: any) => (
	<h1 className={`tracking-tight inline font-bold text-4xl md:text-5xl whitespace-pre ${props?.className ?? ""}`}>
		{children}
	</h1>
)
