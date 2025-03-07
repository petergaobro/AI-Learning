import { Redressed } from "next/font/google";
import Link from "next/link";

import Container from "../Container";
import UserMenu from "./UserMenu";
import { type SafeUser } from "~/app/types/safeUser";
// import SearchBar from "./SearchBar";

interface NavBarProps {
  currentUser: SafeUser | null;
}

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div
      className="
    sticky
    w-full
    bg-slate-200
    z-30
    shadow-sm
    top-0
    "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0
          "
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              Identity app
            </Link>
            <div className="hidden md:block">
              {/* <SearchBar /> */}
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <p className="text-green-700 text-xl font-bold">{currentUser?.name}</p>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
