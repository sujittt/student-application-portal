import { useState } from 'react';
import { ApplicationForm } from './components/ApplicationForm';
import { ChatInterface } from './components/ChatInterface';
import { VideoTutorial } from './components/VideoTutorial';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';

type Tab = 'application' | 'chat' | 'tutorial';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('application');
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'application' && <ApplicationForm />}
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'tutorial' && <VideoTutorial />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
