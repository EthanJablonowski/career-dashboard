import TopNav from '@/components/TopNav';
import Overview from '@/components/Overview';
import MetricStrip from '@/components/MetricStrip';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import ProjectDrawer from '@/components/ProjectDrawer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <TopNav />
      <Overview />
      <MetricStrip />
      <Timeline />
      <ProjectDrawer />
      <TechStack />
    </main>
  );
}