import { NotificationScheduler } from '@/components/NotificationScheduler';
import { TabBar } from '@/components/TabBar';

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NotificationScheduler />
      {children}
      <TabBar />
    </>
  );
}
