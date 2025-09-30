import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M2 7L12 12L22 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-semibold text-foreground">Noir Ledger</span>
    </div>
  );
}

export function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.5 10.2c.3-.8.5-1.7.5-2.7a5.5 5.5 0 0 0-11 0 5.5 5.5 0 0 0 .5 2.7" />
      <path d="M18.4 14.2c.8-.8.8-2 0-2.8l-1.6-1.6a2 2 0 0 0-2.8 0l-1.3 1.3" />
      <path d="m3.6 14.2-.8.8a2 2 0 0 0 0 2.8l1.6 1.6a2 2 0 0 0 2.8 0l1.3-1.3" />
      <path d="M12 18.5a5.5 5.5 0 0 0 5.5-5.5" />
      <path d="M12 18.5a5.5 5.5 0 0 1-5.5-5.5" />
      <path d="M15.5 10.2 12 13 8.5 10.2" />
    </svg>
  );
}
