import UserAvatar from "@/app/_components/UserAvatar";
import HeaderMenu from "@/app/_components/HeaderMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 md:left-[26rem] bg-[var(--color-grey-0)] right-0 h-[7rem] z-10 flex items-center gap-10 justify-end py-[1.2rem] px-[2rem] ">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
