import HeroSection from '@/components/home/HeroSection'
import ProjectFinder from '@/components/home/ProjectFinder'
import LearningLevelCards from '@/components/home/LearningLevelCards'
import PopularKits from '@/components/home/PopularKits'
import CategoryGrid from '@/components/home/CategoryGrid'
import ForSchools from '@/components/home/ForSchools'
import TrustStrip from '@/components/home/TrustStrip'
import LearningHubPreview from '@/components/home/LearningHubPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectFinder />
      <LearningLevelCards />
      <PopularKits />
      <CategoryGrid />
      <ForSchools />
      <TrustStrip />
      <LearningHubPreview />
    </>
  )
}
