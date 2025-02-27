// adding more colours here?
// uncomment the compile below and copy to classlist
// at the bottom of this file
export type Color =
  | "primary"
  | "neutral"
  | "secondary"
  | "accent"
  | "info"
  | "dark-blue"
  | "process-green"
  | "dark-green"
  | "header-green"
  | "header-blue"
  | "stone"
  | "grey"
  | "midgrey"
  | "lightgrey"
  | "none";

export const map: Record<Color, string> = {
  primary: "green-1",
  neutral: "blue-1",
  secondary: "red-1",
  accent: "yellow-1",
  info: "blue-3",
  "dark-blue": "blue-2",
  "process-green": "green-3",
  "dark-green": "green-2",
  "header-green": "header-green",
  "header-blue": "header-blue",
  stone: "stone-1",
  grey: "grey-3",
  midgrey: "grey-2",
  lightgrey: "grey-1",
  none: "bg-transparent",
};

export const textMap: Record<Color, string> = {
  primary: "text-black",
  neutral: "text-white",
  secondary: "text-white",
  accent: "text-white",
  info: "text-black",
  "dark-blue": "text-white",
  "process-green": "text-black",
  "dark-green": "text-white",
  "header-green": "text-white",
  "header-blue": "text-white",
  stone: "text-white",
  grey: "text-white",
  midgrey: "text-black",
  lightgrey: "text-black",
  none: "text-black",
};

// adding more tailwind parts here?
// uncomment the compile below and copy to classlist
// at the bottom of this file
export type TWPart = "bg" | "border" | "text" | "border-l";
export const partMap: Record<TWPart, number> = {
  bg: 0,
  border: 0,
  text: 0,
  "border-l": 0,
};

export function colorise(prefix: TWPart, color: Color) {
  return `${prefix}-${map[color]}`;
}

export function textColor(color: Color) {
  return textMap[color];
}

export function compile() {
  let data = "/*\n";
  for (const color of Object.keys(map) as Color[]) {
    for (const part of Object.keys(partMap) as TWPart[]) {
      data += colorise(part, color);
      data += " ";
    }
  }
  data += "\n*/\n";
  console.log(data);
}

// compile();

// the comment below is needed so tailwind applies our classes

/*
bg-green-1 border-green-1 text-green-1 border-l-green-1 bg-blue-1 border-blue-1 text-blue-1 border-l-blue-1 bg-red-1 border-red-1 text-red-1 border-l-red-1 bg-yellow-1 border-yellow-1 text-yellow-1 border-l-yellow-1 bg-blue-2 border-blue-2 bg-blue-3 border-blue-3 text-blue-3 border-l-blue-3 bg-green-3 border-green-3 text-green-3 border-l-green-3 bg-green-2 border-green-2 text-green-2 border-l-green-2 bg-header-green border-header-green text-header-green border-l-header-green bg-header-blue border-header-blue text-header-blue border-l-header-blue bg-stone-1 border-stone-1 text-stone-1 border-l-stone-1 bg-grey-3 border-grey-3 text-grey-3 border-l-grey-3 bg-bg-transparent border-bg-transparent text-bg-transparent border-l-bg-transparent 
*/
