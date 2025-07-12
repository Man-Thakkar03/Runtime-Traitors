import React from 'react';
import { SearchIcon } from 'lucide-react';
import {Input} from '@/components/ui/input';

type Props = object;

const Search = () => {
  return (
    <div className="flex items-center gap-x-2 px-3 py-2 bg-[#1E1E1E] rounded-full w-[280px] border border-[#333336] hover:border-[#3352CC] transition-colors">
      <SearchIcon className="w-4 h-4 text-[#9B9CA0]" />
      <Input
        placeholder="Search by name, email or status"
        className="border-0 bg-transparent text-sm text-white placeholder:text-[#9B9CA0] focus-visible:ring-0 p-0"
      />
    </div>
  );
};

export default Search;