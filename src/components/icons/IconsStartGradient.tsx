import { cn } from "@/utils";

const IconsStartGradient = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      viewBox="0 0 200 200"
      fill="none"
    >
      <g clipPath="url(#clip0_1_1377)">
        <path
          d="M15.5351 188.281C56.1889 157.612 76.5158 142.278 100 142.278C123.485 142.278 143.812 157.612 184.466 188.281L200 200L188.281 184.466C157.612 143.812 142.278 123.485 142.278 100C142.278 76.5158 157.612 56.1889 188.281 15.5351L200 0.000467187L184.466 11.7195C143.812 42.3881 123.485 57.7224 100 57.7224C76.5158 57.7224 56.1889 42.3881 15.5351 11.7194L0 0L11.7194 15.5351C42.3881 56.1889 57.7224 76.5158 57.7224 100C57.7224 123.485 42.3881 143.812 11.7195 184.465L0.000393621 200L15.5351 188.281Z"
          fill="url(#paint0_linear_1_1377)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_1377"
          x1="5.61798"
          y1="125"
          x2="204.334"
          y2="110.029"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF1F00" />
          <stop offset="1" stopColor="#FFD600" />
        </linearGradient>
        <clipPath id="clip0_1_1377">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconsStartGradient;
