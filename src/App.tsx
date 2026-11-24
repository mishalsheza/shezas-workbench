import { Footer } from './components/layout/Footer'
import { TopBar } from './components/layout/TopBar'
import { ResumeModeProvider } from './components/resume-mode/ResumeModeContext'
import { useResumeModeContext } from './components/resume-mode/resumeModeStore'
import { ResumeView } from './components/resume-mode/ResumeView'
import { WorkbenchPage } from './components/layout/WorkbenchPage'

function Site() {
  const { isResume } = useResumeModeContext()
  return (
    <div className={isResume ? 'bg-champagne' : 'grain'}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:rounded-full focus:bg-chestnut focus:px-4 focus:py-2 focus:text-champagne">
        Skip to content
      </a>
      <TopBar />
      {isResume ? <ResumeView /> : <WorkbenchPage />}
      {!isResume && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <ResumeModeProvider>
      <Site />
    </ResumeModeProvider>
  )
}
