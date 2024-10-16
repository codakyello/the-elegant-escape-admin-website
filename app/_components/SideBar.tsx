import Logo from "./Logo";
import Nav from "./Nav";

export default function SideBar() {
  return (
    <aside className="fixed border-r border-r-[var(--color-grey-100)] top-0 left-0 h-full flex py-[1.2rem] md:py-[3.2rem] md:px-[2.4rem] items-center flex-col gap-16 md:gap-14 row-span-2 z-30">
      <Logo />
      <Nav />
    </aside>
  );
}
