
import React from 'react';
import { Project } from '../types';
import { ExternalLink, Database, Server, Code, Sparkles } from 'lucide-react';

interface ProjectWindowProps {
  project: Project;
}

const ProjectWindow: React.FC<ProjectWindowProps> = ({ project }) => {
  return (
    <div className="h-full bg-[#0a0a0a] overflow-y-auto text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" className="flex items-center space-x-2 text-blue-400 hover:underline">
                <span>View Demo</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-xl text-white/60 leading-relaxed">{project.shortDescription}</p>
        </div>

        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
          <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-white/80">
              <Database size={18} className="mr-2 text-emerald-400" />
              Architecture
            </h3>
            <p className="text-white/60 leading-relaxed text-sm">
              {project.architecture}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-white/80">
              <Code size={18} className="mr-2 text-blue-400" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.aiUsage && (
          <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl space-y-3">
            <h3 className="flex items-center text-lg font-semibold text-cyan-300">
              <Sparkles size={18} className="mr-2" />
              AI Implementation
            </h3>
            <p className="text-cyan-100/70 leading-relaxed text-sm">
              {project.aiUsage}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-white/80">
            <Server size={18} className="mr-2 text-orange-400" />
            Engineering Details
          </h3>
          <p className="text-white/60 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectWindow;
