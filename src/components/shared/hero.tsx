import IconsStar from "@/components/icons/IconsStar";
import SplitText from "@/components/SplitText";

const Hero = () => {
  return (
    <section className="relative mb-[19%] flex flex-col gap-[14rem] justify-around px-12 py-10">
      <div className="mx-auto flex flex-col items-center text-center text-[32px] font-medium leading-[1] font-Pangaia italic pt-[22%]">
        <SplitText title="tran"></SplitText>
        <SplitText title="thienduc"></SplitText>
      </div>

      <h1 className="font-size-custom gap-8 font-BiggerDisplay font-bold uppercase flex flex-row items-center justify-center w-full tracking-[1px]">
        <SplitText title="frontend"></SplitText>
        <IconsStar />
        <SplitText title="developer"></SplitText>
      </h1>
    </section>
  );
};

export default Hero;
