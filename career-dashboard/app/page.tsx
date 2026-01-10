import TopNav from '@/components/TopNav';
import Overview from '@/components/Overview';
import MetricStrip from '@/components/MetricStrip';
import Influences from '@/components/Influences';
import TechStack from '@/components/TechStack';
import TimelineWithFilters from '@/components/TimelineWithFilters';
import ProjectDrawer from '@/components/ProjectDrawer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <TopNav />
      <Overview />
      <MetricStrip />
      <Influences />
      <TimelineWithFilters />
      <ProjectDrawer />
      <TechStack />
    </main>
  );
}