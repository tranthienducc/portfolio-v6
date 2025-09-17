import { cn } from "@/utils";

type HeadingProps = {
  className?: string;
  heading: string;
  subheading: string | string[];
};
const Heading = ({ className, heading, subheading }: HeadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <h1
        className={cn(
          "text-[366.688px] leading-[103.75px] font-bold font-NeuroX uppercase text-[#ebe5d9] whitespace-nowrap mb-16",
          className || ""
        )}
      >
        {heading} *
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
