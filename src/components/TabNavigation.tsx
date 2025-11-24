import { FaFileAlt, FaComments, FaVideo } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

type Tab = 'application' | 'chat' | 'tutorial';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { isDark } = useTheme();

  const tabs = [
    { id: 'application' as Tab, label: 'Application', icon: FaFileAlt },
    { id: 'chat' as Tab, label: 'AI Assistant', icon: FaComments },
    { id: 'tutorial' as Tab, label: 'Tutorial', icon: FaVideo },
  ];

  return (
    <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : isDark
                    ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
