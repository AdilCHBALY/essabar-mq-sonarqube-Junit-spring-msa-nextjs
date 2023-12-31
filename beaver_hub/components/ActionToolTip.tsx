import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
const ActionToolTip = ({children}:{children:React.ReactNode}) => {
  return (
    <TooltipProvider>
    <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="bottom">
        <p className="text-xs">More Actions</p>
        </TooltipContent>
    </Tooltip>
    </TooltipProvider>

  )
}

export default ActionToolTip