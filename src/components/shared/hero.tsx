import IconsStar from "@/components/icons/IconsStar";

const Hero = () => {
  return (
    <section className="relative mb-[19%] flex flex-col gap-[14rem] justify-around">
      <div className="mx-auto flex flex-col items-center text-center text-[32px] font-medium leading-[1] font-Pangaia italic pt-[22%]">
        <span>tran</span>
        <span>thienduc</span>
      </div>

      <h1 className="font-size-custom gap-8 font-BiggerDisplay font-bold uppercase flex flex-row items-center justify-center w-full tracking-[1px]">
        frontend
        <IconsStar />
        developer
      </h1>
    </section>
  );
};

export default Hero;
