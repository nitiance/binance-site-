import { Link } from "react-router-dom";
import { ActivitySquare, Boxes, ChevronRight, MonitorSmartphone, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemCard } from "@/config/systems";

type SystemCardGridProps = {
  cards: SystemCard[];
  className?: string;
};

const iconById = {
  pos: ReceiptText,
  inventory: Boxes,
  analytics: ActivitySquare,
  "offline-sync": MonitorSmartphone,
} as const;

const SystemCardGrid = ({ cards, className }: SystemCardGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {cards.map((card) => {
        const Icon = iconById[card.id];

        return (
          <Link
            key={card.id}
            to={card.path}
            className="group rounded-xl border border-[#D8CEC2] bg-white/80 px-5 py-4 h-[140px] shadow-[0_6px_20px_rgba(43,52,64,0.08)] hover:shadow-[0_10px_24px_rgba(43,52,64,0.12)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B1F3B]"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="w-9 h-9 rounded-lg border border-[#D8CEC2] bg-white/70 flex items-center justify-center">
                  <Icon className="w-4 h-4" style={{ color: card.accent }} />
                </div>
                <span className="text-xs tracking-wide uppercase text-[#2B3440]/60">
                  System
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight text-[#0B0F14]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#2B3440]/75 mt-1">{card.shortLine}</p>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0B1F3B] group-hover:translate-x-0.5 transition-transform">
                View
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SystemCardGrid;
