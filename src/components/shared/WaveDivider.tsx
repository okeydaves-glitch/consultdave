interface WaveDividerProps {
  position?: "top" | "bottom";
  color?: string;
  flip?: boolean;
}

export function WaveDivider({ position = "bottom", color = "#5555ff", flip = false }: WaveDividerProps) {
  return (
    <div className={`absolute ${position === "top" ? "-top-[1px] left-0 rotate-180" : "bottom-0 left-0"} w-full overflow-hidden leading-none pointer-events-none`}>
      <svg
        className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[80px] ${flip ? "scale-x-[-1]" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C200,80 500,120 600,60 C700,0 1000,20 1200,40 L1200,120 L0,120 Z"
          fill={color}
          opacity="1"
        />
      </svg>
    </div>
  );
}

export function WaveDividerInverted({ position = "bottom", color = "#fafafa", flip = false }: WaveDividerProps) {
  return (
    <div className={`absolute ${position === "top" ? "-top-[1px] left-0 rotate-180" : "bottom-0 left-0"} w-full overflow-hidden leading-none pointer-events-none`}>
      <svg
        className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[80px] ${flip ? "scale-x-[-1]" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200,120 L0,120 L0,40 C300,120 700,100 1200,60 Z"
          fill={color}
          opacity="1"
        />
      </svg>
    </div>
  );
}

export function WaveDividerNavy({ position = "bottom", color = "#1a1a2e", flip = false }: WaveDividerProps) {
  return (
    <div className={`absolute ${position === "top" ? "-top-[1px] left-0 rotate-180" : "bottom-0 left-0"} w-full overflow-hidden leading-none pointer-events-none`}>
      <svg
        className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[80px] ${flip ? "scale-x-[-1]" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C200,80 500,120 600,60 C700,0 1000,20 1200,40 L1200,120 L0,120 Z"
          fill={color}
          opacity="1"
        />
      </svg>
    </div>
  );
}
