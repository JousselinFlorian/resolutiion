/* eslint-disable @typescript-eslint/no-explicit-any */

export const Title = ({
	children,
	...props
}: any) => (
	<h1 className={`tracking-tight inline font-bold text-4xl md:text-5xl whitespace-pre ${props?.className ?? ""}`}>
		{children}
	</h1>
)

export const Body = ({
	children,
	...props
}: any) => {
	const defaultTextColor = props?.className?.includes("text-") ? "" : "text-neutral-500 dark:text-neutral-400"
	return (
		<p className={`text-md ${defaultTextColor} ${props?.className ?? ""}`}>
			{children}
		</p>
	)
}