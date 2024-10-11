import UserAvatar from "@/app/_components/UserAvatar";
import HeaderMenu from "@/app/_components/HeaderMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-[26rem] right-0 h-[7rem] z-10 flex items-center gap-10 justify-end py-[1.2rem] px-[2rem] ">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
