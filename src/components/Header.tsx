import { HeaderProps } from '../types/props';

function Header({ heading = 'header', subheading }: HeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-10 space-y-3 p-6">
      <h1 className="text-6xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-2xl">
        {heading}
      </h1>
      {subheading && (
        <h2 className="text-2xl font-semibold capitalize text-white drop-shadow-lg mt-3">
          {subheading}
        </h2>
      )}
    </div>
  );
}

export default Header;
