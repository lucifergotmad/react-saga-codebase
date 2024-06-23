import { Input } from '@/shared/components/design/input';

export const SearchNav = () => {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="hidden md:block md:w-[300px]"
      />
    </div>
  );
};
