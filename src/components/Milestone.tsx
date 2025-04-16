import React from 'react';
import type { Milestone } from '../types';
import { Clock, Link as LinkIcon, Sparkles } from 'lucide-react';

export function Milestone({ step, content, links, timeline, skills }: Milestone) {
  // Extract any URLs from the content
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const extractedLinks = content.match(urlRegex) || [];
  const finalLinks = [...new Set([...(links || []), ...extractedLinks])];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left transition-all hover:bg-white/15">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white px-4 py-1 rounded-full text-sm font-medium">
          Step {step}
        </span>
        {timeline && (
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{timeline}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-200 text-lg mb-4">{content}</p>

      {skills && skills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Key Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-white/5 px-3 py-1 rounded-full text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {finalLinks.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <LinkIcon className="w-4 h-4" />
            <span className="font-medium">Useful Resources</span>
          </div>
          <div className="space-y-2">
            {finalLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
