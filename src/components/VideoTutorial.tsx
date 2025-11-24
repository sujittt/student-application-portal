import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { useVideoProgress } from '../hooks/useVideoProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';

const TRANSCRIPT = `Welcome to the College Application Portal Tutorial.

In this comprehensive guide, we'll walk you through every step of the application process.

Section 1: Getting Started
First, you'll need to complete your personal information. Make sure all details are accurate as they will appear on your official application documents.

Section 2: Academic Information
Your academic history is crucial. Enter your GPA, test scores, and any relevant achievements. Don't worry if you don't have SAT or ACT scores - these are optional.

Section 3: Document Upload
You'll need to upload three PDF documents:
- Official transcript
- Personal essay
- Recommendation letter

Make sure all documents are clear and readable before uploading.

Section 4: Review and Submit
Before final submission, carefully review all information. Once submitted, you cannot make changes, so take your time to ensure everything is correct.

Section 5: Using the AI Assistant
Our AI assistant is available 24/7 to answer your questions about the application process. Feel free to ask anything!

Good luck with your application!`;

export function VideoTutorial() {
  const { progress, isPlaying, togglePlayPause, seek, reset } = useVideoProgress('tutorial');
  const [notes, setNotes] = useLocalStorage('tutorialNotes', '');
  const { isDark } = useTheme();

  // Format seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tutorial: How to Complete Your Application</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center">
                <button
                  onClick={togglePlayPause}
                  className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <FaPause className="w-12 h-12 text-white" />
                  ) : (
                    <FaPlay className="w-12 h-12 text-white ml-2" />
                  )}
                </button>
                <p className="text-white text-lg font-medium">College Application Tutorial</p>
                <p className="text-gray-400 text-sm mt-2">
                  {formatTime(progress.currentTime)} / {formatTime(progress.duration)}
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={togglePlayPause}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
              </button>
              <button
                onClick={reset}
                className={`p-3 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaRedo className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className={`flex justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  <span>{formatTime(progress.currentTime)}</span>
                  <span>{progress.watchedPercentage}%</span>
                  <span>{formatTime(progress.duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={progress.duration}
                  value={progress.currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${progress.watchedPercentage}%, ${isDark ? '#374151' : '#e5e7eb'} ${progress.watchedPercentage}%, ${isDark ? '#374151' : '#e5e7eb'} 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Video Transcript</h3>
            <div className={`prose prose-sm max-w-none ${isDark ? 'text-gray-300 prose-invert' : 'text-gray-700'} whitespace-pre-line leading-relaxed`}>
              {TRANSCRIPT}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 sticky top-4`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Your Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes while watching the tutorial..."
              className={`w-full h-96 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Your notes are automatically saved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
