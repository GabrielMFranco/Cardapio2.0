type Props = React.ComponentProps<"input"> & {
    legend: string
}

export function Input({legend, type="text",...rest}: Props){
    return(
        <fieldset className="tw-full flex flex-col gap-2 pb-2">
            <legend className="text-zinc-400 text-xs uppercase font-bold tracking-widest ml-1 pb-1" >
                {legend}
            </legend>

            <input type={type} {...rest} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-600 outline-none transition-all focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"/>
        </fieldset>
    )
}