import TopNav from '@/components/TopNav';
import Overview from '@/components/Overview';
import MetricStrip from '@/components/MetricStrip';
import TechStack from '@/components/TechStack';
import TimelineWithFilters from '@/components/TimelineWithFilters';
import ProjectDrawer from '@/components/ProjectDrawer';

export default function Home() {
  return (
    <main className="min-h-screen bg-warm-50">
      <TopNav />
      <Overview />
      <MetricStrip />
      <TimelineWithFilters />
      <ProjectDrawer />
      <TechStack />
    </main>
  );
}