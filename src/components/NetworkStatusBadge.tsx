import { Badge } from "konsta/react";
import { useNetworkSync } from "../hooks/useNetworkSync";

interface NetworkStatusBadgeProps {
  userId?: string;
}

export function NetworkStatusBadge({ userId }: NetworkStatusBadgeProps) {
  const { isOnline, isSyncing } = useNetworkSync(userId);

  if (isSyncing) {
    return (
      <Badge className="bg-amber-500 text-white font-medium flex items-center gap-1.5
        px-2.5 py-1 rounded-full text-xs animate-pulse">
        <svg
          className="w-3 h-3 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Sincronizando...</span>
      </Badge>
    );
  }

  if (!isOnline) {
    return (
      <Badge className="bg-rose-500 text-white font-medium flex items-center
        gap-1.5 px-2.5 py-1 rounded-full text-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"/>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span>Online</span>
      </Badge>
    )
  }
}
