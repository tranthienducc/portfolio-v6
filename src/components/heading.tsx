import { cn } from "@/utils";

type HeadingProps = {
  className?: string;
  heading: string;
  subheading: string | string[]; // có thể là string hoặc array of strings
};
const Heading = ({ className, heading, subheading }: HeadingProps) => {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-3">
      <h1
        className={cn(
          "text-[204.302px] font-bold leading-[133.85px] font-InterDisplay text-[#ebe5d9]",
          className || ""
        )}
      >
        {heading}
      </h1>
      <div className="flex items-center justify-between w-full">
        {Array.isArray(subheading) ? (
          subheading.map((line, idx) => (
            <span
              key={idx}
              className="text-[11.5px] font-semibold leading-[20.7px] text-[#ebe5d9] mix-blend-difference uppercase"
            >
              {line}
            </span>
          ))
        ) : (
          <span className="text-[11.5px] font-semibold leading-[20.7px] text-[#ebe5d9] mix-blend-difference uppercase">
            {subheading}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading;
