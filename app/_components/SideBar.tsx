import Logo from "./Logo";
import Nav from "./Nav";

export default function SideBar() {
  return (
    <aside className="fixed top-0 left-0 h-full flex py-[1.2rem] md:py-[3.2rem] md:px-[2.4rem] flex-col gap-7 md:gap-14 row-span-2">
      <Logo />
      <Nav />
    </aside>
  );
}
