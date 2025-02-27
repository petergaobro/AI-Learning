import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @PENGGAO
 * @link https://nerdcave.com/tailwind-cheat-sheet/ for how to categorize the tailwind css utility classes
 * @example
```
className={twcm(
      //? #description =========== container ===========
      //? =========== border ===========
      "border-b-2 border-gray-500",
      //? =========== spacing ===========
      "mb-4 p-2",
      //? #region=========== open ===========
      [open === false ? ["hidden"] : ["block"]]
)}
```
 * @description Merge tailwind utility classes with tailwind-merge and clsx to categorize them
 * @param {...ClassValue[]} classes
 */
export default function twcm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
