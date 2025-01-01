"use client";
import { projects } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { scaleAnimation } from "@/utils/animation";
import Image from "next/image";
import gsap from "gsap";
const Work = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <section className="h-screen w-full">
      <div className="w-full flex flex-col items-center justify-center">
        {projects.map((project, i) => {
          return (
            <Project
              key={i}
              index={i}
              title={project.title}
              setModal={setModal}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </section>
  );
};

export default Work;

interface ProjectProps {
  index: number;
  title: string;
  setModal: Dispatch<
    SetStateAction<{
      active: boolean;
      index: number;
    }>
  >;
}

function Project({ index, setModal, title }: ProjectProps) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="project"
    >
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  );
}

interface ModalProps {
  modal: {
    active: boolean;
    index: number;
  };
  projects: {
    title: string;
    src: string;
    color: string;
  }[];
}
function Modal({ modal, projects }: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center rounded-xl"
      >
        <div style={{ top: index * -100 + "%" }} className="modalSlider">
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div
                className="h-full w-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                key={`modal_${index}`}
              >
                <Image
                  src={`${src}`}
                  width={300}
                  height={0}
                  className="h-auto rounded-lg"
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className="cursor"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        className="cursorLabel"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}
