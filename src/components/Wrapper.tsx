import { ChildProps } from "@/utils/types";
import React from "react";

const Wrapper = ({ children }: ChildProps) => {
  return <main className="max-w-full w-full">{children}</main>;
};

export default Wrapper;
