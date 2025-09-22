import React, { useState } from 'react';
import SandboxCanvas from './components/SandboxCanvas';
import ElementPalette from './components/ElementPalette';
import {ELEMENT_TYPES, type ElementType} from "./constants/SandboxConstants.ts";
import cvData from './model/cvData.ts';
import {GlassCard, SectionTitle, Tag} from "./components/UIBaseComponents.tsx";
import {
  DownloadIcon, EyeIcon,
  EyeSlashIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon
} from "./components/IconComponents.tsx";

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementType>(ELEMENT_TYPES.REACT);
  const [sandboxKey, setSandboxKey] = useState<number>(0);
  const [isCvVisible, setIsCvVisible] = useState<boolean>(true);

  const handleReset = () => {
    setSandboxKey(prevKey => prevKey + 1);
  };

  return (
      <div className="min-h-screen relative overflow-x-hidden">
        <SandboxCanvas key={sandboxKey} selectedElement={selectedElement} isPaused={false} />

        <main className={`max-w-5xl mx-auto p-4 sm:p-8 transition-opacity duration-500 ${isCvVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter">{cvData.name}</h1>
            <p className="text-sky-300 mt-2 text-lg sm:text-xl">{cvData.title}</p>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">{cvData.tagline}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-8">
              <GlassCard>
                <SectionTitle>Contact & Links</SectionTitle>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center"><PhoneIcon /> {cvData.contact.phone}</p>
                  <p className="flex items-center"><MailIcon /> {cvData.contact.email}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-cyan-400 transition-colors"><LinkedinIcon /></a>
                    <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-400 hover:text-cyan-400 transition-colors"><GithubIcon /></a>
                  </div>
                </div>
                <a href={cvData.contact.pdf} download="ViktorKuceraCV.pdf" className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition-colors">
                  <DownloadIcon /> Download PDF
                </a>
              </GlassCard>

              <GlassCard>
                <SectionTitle>The Toolkit</SectionTitle>
                <h3 className="font-semibold text-sky-400 mb-2">Core Stack</h3>
                <div>{cvData.skills.proficient.map(skill => <Tag key={skill}>{skill}</Tag>)}</div>
                <h3 className="font-semibold text-sky-400 mt-4 mb-2">Explorations</h3>
                <div>{cvData.skills.familiar.map(skill => <Tag key={skill}>{skill}</Tag>)}</div>
              </GlassCard>
            </aside>

            <div className="lg:col-span-2 space-y-8">
              <GlassCard>
                <SectionTitle>The Mission</SectionTitle>
                <p className="text-gray-300 leading-relaxed">{cvData.profile}</p>
              </GlassCard>

              <GlassCard>
                <SectionTitle>The Forge: Featured Work</SectionTitle>
                <div className='mb-8'>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg text-white">{cvData.experience[0].role}</h3>
                    <p className="text-sm text-gray-400">{cvData.experience[0].dates}</p>
                  </div>
                  <p className="text-sky-400 font-medium">{cvData.experience[0].company}</p>
                  <p className="mt-2 text-gray-300 leading-relaxed">{cvData.experience[0].description}</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg text-white">{cvData.projects[0].name}</h3>
                    <p className="text-sm text-gray-400">{cvData.projects[0].dates}</p>
                  </div>
                  <p className="text-sky-400 font-medium">{cvData.projects[0].context}</p>
                  <p className="mt-2 text-gray-300 leading-relaxed">{cvData.projects[0].description}</p>
                  <div className="mt-4">
                    {cvData.projects[0].stack.map(tech => <Tag key={tech}>{tech}</Tag>)}
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <SectionTitle>Education & Languages</SectionTitle>
                <div>
                  <h3 className="font-bold text-lg text-white">{cvData.education.degree}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sky-400 font-medium">{cvData.education.university}</p>
                    <p className="text-sm text-gray-400">{cvData.education.dates}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-400/20">
                  <ul className="list-disc list-inside text-gray-300">
                    {cvData.languages.map(lang => <li key={lang}>{lang}</li>)}
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>

        <div className="fixed top-4 right-4 z-50">
          <button
              onClick={() => setIsCvVisible(!isCvVisible)}
              className="p-3 bg-gray-900/60 backdrop-blur-md border border-gray-400/20 rounded-full text-white hover:bg-gray-800/80 transition-colors"
              title={isCvVisible ? "Hide CV" : "Show CV"}
          >
            {isCvVisible ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
        <ElementPalette selectedElement={selectedElement} setSelectedElement={setSelectedElement} onReset={handleReset}/>
      </div>
  );
}

export default App;

