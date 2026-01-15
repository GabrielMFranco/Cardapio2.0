import { Upload as UploadImg} from 'lucide-react';


type Props = React.ComponentProps<"input"> & {
    legend: string
    filename?: string | null
}

export function Upload({filename = null,legend, ...rest}: Props){
    return(
        <div className="flex flex-col gap-2 group">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">
                {legend}
            </p>

            <label htmlFor="img" className="relative flex items-center justify-between bg-zinc-800/30 backdrop-blur-md border-2 border-dashed border-white/10 rounded-2xl p-4 cursor-pointer hover:border-cyan-500/40 hover:bg-zinc-800/50 transition-all duration-300 group/label">
                <input 
                    type="file"
                    id="img"
                    className="sr-only" 
                    {...rest}
                />

                <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="text-zinc-100 text-sm font-medium truncate">
                        {filename ?? "Selecionar imagem do Drink."}
                    </span>
                </div>

                <div className="
                    flex items-center justify-center 
                    w-12 h-12 rounded-xl 
                    bg-white/5 border border-white/5
                    group-hover/label:bg-cyan-500/10 group-hover/label:border-cyan-500/20
                    transition-all duration-300">
                    <UploadImg 
                        size={22} 
                        className="text-zinc-400 group-hover/label:text-cyan-400 group-hover/label:scale-110 transition-all duration-300" 
                    />
                </div>
            </label>
        </div>
    )
}