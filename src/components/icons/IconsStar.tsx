import { cn } from "@/utils";

const IconsStar = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      width="126"
      height="126"
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
    >
      <ellipse
        cx="53.1981"
        cy="75.6365"
        rx="44.3967"
        ry="16.1682"
        transform="rotate(30 53.1981 75.6365)"
        stroke="#A9A9A9"
      />
      <ellipse
        cx="63.9881"
        cy="62.125"
        rx="44.3967"
        ry="16.1682"
        transform="rotate(30 63.9881 62.125)"
        stroke="#A9A9A9"
      />
      <path
        d="M112.227 72.5618C107.762 80.295 86.9285 76.6254 65.6939 64.3656C44.4593 52.1058 30.8646 35.8982 35.3293 28.1651C39.794 20.432 60.6275 24.1015 81.8621 36.3614C103.097 48.6212 116.691 64.8287 112.227 72.5618Z"
        stroke="#A9A9A9"
      />
    </svg>
  );
};

export default IconsStar;
