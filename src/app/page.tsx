import HeroSection from '@/components/home/HeroSection'
import ProjectFinder from '@/components/home/ProjectFinder'
import LearningLevelCards from '@/components/home/LearningLevelCards'
import PopularKits from '@/components/home/PopularKits'
import CategoryGrid from '@/components/home/CategoryGrid'
import ForSchools from '@/components/home/ForSchools'
import TrustStrip from '@/components/home/TrustStrip'
import LearningHubPreview from '@/components/home/LearningHubPreview'
import AnimateIn from '@/components/ui/AnimateIn'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimateIn><ProjectFinder /></AnimateIn>
      <AnimateIn delay={50}><LearningLevelCards /></AnimateIn>
      <AnimateIn delay={50}><PopularKits /></AnimateIn>
      <AnimateIn delay={50}><CategoryGrid /></AnimateIn>
      <AnimateIn delay={50}><ForSchools /></AnimateIn>
      <AnimateIn delay={50}><TrustStrip /></AnimateIn>
      <AnimateIn delay={50}><LearningHubPreview /></AnimateIn>
    </>
  )
}
