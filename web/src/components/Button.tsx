type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
}

export function Button({
    children,
    isLoading, 
    type="button", 
    ...rest
}: Props) {
    return(
        <button
            type={type}
            disabled={isLoading} 
            className="flex items-center justify-center bg-purple-950 text-white cursor-pointer rounded-lg w-40 p-1.5 mt-1.5 hover:bg-purple-800 transition ease-linear disabled:opacity-45 disabled:cursor-not-allowed h-12"
            {...rest}
        >
            {children}
        </button>
    )
}