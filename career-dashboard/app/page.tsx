import TopNav from '@/components/TopNav';
import Overview from '@/components/Overview';
import MetricStrip from '@/components/MetricStrip';
import Influences from '@/components/Influences';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import ProjectDrawer from '@/components/ProjectDrawer';
import SkillGraph from '@/components/SkillGraph';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <TopNav />
      <Overview />
      <MetricStrip />
      <Influences />
      <Timeline />
      <ProjectDrawer />
      <SkillGraph />
      <TechStack />
    </main>
  );
}