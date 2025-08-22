import { cn } from "@/lib/utils";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

import { Tooltip } from "@radix-ui/react-tooltip";
import React from "react";


export const CustomTooltip = ({
    content,
    children,
    className
  }: React.PropsWithChildren<{ content: string | React.ReactNode; className?: string }>) => {
    const [open, setOpen] = React.useState(false);
  
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip open={open}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn('cursor-pointer', className)}
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onTouchStart={() => setOpen(!open)}
              onKeyDown={(e) => {
                e.preventDefault();
                e.key === 'Enter' && setOpen(!open);
              }}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent className={!content ? 'hidden' : ''}>
            <span className="inline-block text-sm font-medium leading-relaxed bg-green-500 text-black p-2 rounded-md">{content}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };    