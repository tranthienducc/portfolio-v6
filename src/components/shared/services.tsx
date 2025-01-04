import { cards } from "@/constants";
import { CardListProps } from "@/utils/types";
import Image from "next/image";

const Services = () => {
  return (
    <section className="my-[20rem] px-12 py-10">
      <h2 className="text-[121.531px] font-semibold uppercase text-[#d1d1c7] mb-20rem">
        how i can help you /
      </h2>
      <div className="flex flex-row items-start ml-[32rem] justify-center gap-[60px]">
        <span className="uppercase text-[#7e766c] font-medium text-base">
          (services)
        </span>
        <p className="text-2xl font-medium text-[#a29e9a] max-w-[500px] w-full">
          Frustrated with websites that don&apos;t reflect your brand or drive
          growth? I craft premium web experiences that captivate and help you
          focus on growing your business.
        </p>
      </div>

      {cards.map((card, index) => {
        return <Card key={index} i={index} card={card} />;
      })}
    </section>
  );
};

export default Services;

interface CardProps {
  card: CardListProps;
  i: number;
}

function Card({ card, i }: CardProps) {
  return (
    <>
      <div className="flex flex-col h-[550px] sticky top-44 mt-20">
        <div
          style={{
            top: `calc(-5vh + ${i * 80}px)`,
          }}
          className="flex flex-wrap absolute bg-[#080807] max-w-full w-full border-t border-[#2f2f2d]"
        >
          <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left text-heading-2 font-semibold text-[#d1d1c7] md:grid md:justify-between md:gap-x-fluid w-full">
            <span className="col-span-2">{card.number}</span>
            <h3 className="col-span-6 col-start-6 py-space-md 2xl:py-space-sm">
              {card.title}
            </h3>
            <Image
              src={card.images}
              alt={card.title}
              width={32}
              height={32}
              className="hidden size-6 justify-self-end opacity-30 sm:size-7 xl:flex 2xl:size-8"
            />
          </div>
          <div className="grid-gap relative flex min-h-[30vh] flex-col place-items-center pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12 w-full">
            <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm text-heading-4">
              <p className="min-w-[504px] w-full text-balance text-xl font-medium text-[#a29e9a]">
                {card.description}
              </p>
              <div className="flex flex-col divide-y divide-white/15">
                {card.tags.map((tag, index: number) => {
                  return (
                    <span
                      key={index}
                      className="flex items-start gap-x-space-sm py-space-3xs font-bold text-[#bfbfb1] xl:gap-x-space-md xl:py-space-2xs"
                    >
                      <span className="font-mono text-base font-medium leading-[200%] text-[#7e766c]">
                        {tag.quantity}
                      </span>
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
