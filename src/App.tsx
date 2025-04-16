import React, { useState } from 'react';
import { Loader2, Rocket, Search } from 'lucide-react';
import type { Milestone as MilestoneType } from './types';
import { Milestone } from './components/Milestone';

const API_KEY = "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";

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);

  const searchRoadmap = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setMilestones([]);

    const prompt = `You are a career guidance assistant. Given any career goal (e.g., "doctor", "fireman", "prompt engineer"), generate a detailed career roadmap to help someone achieve that goal, starting from school level if needed.

Your response must include:

Career Goal
Estimated Completion Time** (e.g., "10-12 years")
Success Rate (High / Medium / Low)
Roadmap Type (Linear / Branching)

Then list each step in one block  clearly, like this:
make all of this is one block-
🧭 Title (e.g., "Class 10th with Science")
📌 Description (what to do in this stage)
⏳ Timeline (duration or age range, e.g., "2 years", "Age 14–16")
📚 What to Study (subjects, skills, or concepts)
🔗 Resources and connections (linkedin or other contact details of people doing it , articles etc links online material, syllabus, YouTube, or books – provide links if possible)
🧪 Certifications or Projects (if applicable then mention else dont)
🧠 Skill Focus (key skills developed in this stage)


End the roadmap with a motivating note about career scope or demand if possible.

Career Goal: ${input}
 `;

    try {
      console.log('Sending request to API...');
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://sambhavpath-utkarsh",
          "X-Title": "SambhavPath AI Roadmap"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
        setError('The AI model did not return a valid response. Please try again or rephrase your input. If the issue persists, check the API documentation for the expected response format.');
        return;
      }

      const content = data.choices[0].message.content;
      console.log('Content received:', content);

      // Simple parsing of the content
      const steps = content.split('\n\n').filter(Boolean);
      const parsedMilestones = steps.map((step, index) => ({
        step: index + 1,
        content: step.trim()
      }));

      setMilestones(parsedMilestones);
    } catch (err) {
      console.error('Error in searchRoadmap:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Rocket className="w-10 h-10" />
            SambhavPath
          </h1>
          <p className="text-xl text-gray-300">
            Discover your path to success with AI-powered career roadmaps
          </p>
        </div>

        <div className="relative flex gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your dream career (e.g., Data Scientist, Full Stack Developer)"
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && searchRoadmap()}
            />
          </div>
          <button
            onClick={searchRoadmap}
            disabled={loading}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 text-lg shadow-lg hover:shadow-xl"
          >
            Generate Roadmap
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 text-gray-300 py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xl">Creating your personalized roadmap...</span>
          </div>
        )}

        {error && (
          <div className="text-red-400 text-center p-6 bg-red-400/10 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {milestones.map((milestone) => (
            <Milestone key={milestone.step} {...milestone} />
          ))}
        </div>

        {milestones.length > 0 && (
          <div className="text-center mt-8 text-gray-400">
            <p>This roadmap is generated by AI and should be used as a general guide. Always verify information and consult with industry professionals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
