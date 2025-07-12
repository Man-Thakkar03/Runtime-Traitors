import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export const Notifications = () => {
  return (
    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-[#1E1E1E] hover:bg-[#2E2E2E] transition-colors">
      <Bell className="h-4 w-4 text-[#9B9CA0]" />
    </Button>
  );
};