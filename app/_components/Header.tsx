import UserAvatar from "@/app/_components/UserAvatar";
import HeaderMenu from "@/app/_components/HeaderMenu";

export default function Header() {
  return (
    <header className="fixed left-[5rem] border-b border-b-[var(--color-grey-100)] top-0 md:left-[23rem] bg-[var(--color-grey-0)] right-0 h-[7rem] z-10 flex items-center gap-10 justify-end py-[1.2rem] px-[4.8rem] ">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
