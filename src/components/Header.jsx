import { Film } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-base-200 shadow-md">
      <div className="container mx-auto flex items-center gap-3 p-4">
        <Film size={32} className="text-primary" />
        <h1 className="text-2xl font-bold">Movies Rating</h1>
      </div>
    </header>
  );
};

export default Header;