import React from "react";
const dot = `rounded-full h-2 w-2 mx-0.5 bg-current animate-[blink_1s_ease_0s_infinite_normal_both]"`;
let style = { animationDelay: "0.2s" };
export const Loading = () => {
  return (React.createElement("span", { className: "inline-flex text-center items-center leading-7 h-6" },
    React.createElement("span", { className: dot, key: "dot_1" }),
    React.createElement("span", { className: dot, style: style, key: "dot_2" }),
    React.createElement("span", { className: dot, style: style, key: "dot_3" })));
};