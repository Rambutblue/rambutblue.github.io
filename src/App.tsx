import React, { useState } from 'react';
import SandboxCanvas from './components/SandboxCanvas';
import ElementPalette from './components/ElementPalette';
import cvData from "./model/cvData";
import { DownloadIcon, EyeIcon, EyeSlashIcon, GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "./components/IconComponents";
import { ELEMENT_TYPES, type ElementType } from './constants/SandboxConstants';
import { Card, CardContent, Typography, Button, Grid, Chip, Box, Container } from '@mui/material';

const App: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<ElementType>(ELEMENT_TYPES.REACT);
    const [sandboxKey, setSandboxKey] = useState<number>(0);
    const [isCvVisible, setIsCvVisible] = useState<boolean>(true);

    const handleReset = () => {
        setSandboxKey(prevKey => prevKey + 1);
    };

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <SandboxCanvas key={sandboxKey} selectedElement={selectedElement} isPaused={false} />

            {isCvVisible && (
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                    <Box sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(2px)',
                        border: '4px solid #fff',
                        boxShadow: '0 0 0 4px #000',
                        p: 4,
                        imageRendering: 'pixelated',
                    }}>
                        <header className="text-center mb-12">
                            <Typography variant="h1" component="h1">{cvData.name}</Typography>
                            <Typography variant="h5" component="p" sx={{ color: 'primary.main', mt: 1 }}>{cvData.title}</Typography>
                            <Typography variant="body1" component="p" sx={{ color: 'grey.400', mt: 2, maxWidth: '600px', mx: 'auto' }}>{cvData.tagline}</Typography>
                        </header>

                        <Grid container spacing={4}>
                            <Card sx={{
                                border: '2px solid #fff',
                                boxShadow: '4px 4px #000',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translate(-4px, -4px)',
                                    boxShadow: '8px 8px #000'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Contact & Links</Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><PhoneIcon /> &nbsp; {cvData.contact.phone}</Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><MailIcon /> &nbsp; {cvData.contact.email}</Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon /></a>
                                        <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer"><GithubIcon /></a>
                                    </Box>
                                    <Button variant="contained" startIcon={<DownloadIcon />} href={cvData.contact.pdf} download="ViktorKuceraCV.pdf" fullWidth>
                                        Download PDF
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card sx={{
                                mb: 4, border: '2px solid #fff',
                                boxShadow: '4px 4px #000',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translate(-2px, -2px)',
                                    boxShadow: '6px 6px #000'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>The Mission</Typography>
                                    <Typography variant="body2">{cvData.profile}</Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{
                                border: '2px solid #fff',
                                boxShadow: '4px 4px #000',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translate(-2px, -2px)',
                                    boxShadow: '6px 6px #000'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>The Forge: Featured Work</Typography>
                                    {cvData.experience.map((exp, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.role}</Typography>
                                            <Typography variant="body2" sx={{ color: 'primary.main' }}>{exp.company} | {exp.dates}</Typography>
                                            <Typography variant="body2">{exp.description}</Typography>
                                        </Box>
                                    ))}
                                    {cvData.projects.map((project, index) => (
                                        <Box key={index} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{project.name}</Typography>
                                            <Typography variant="body2" sx={{ color: 'primary.main' }}>{project.context} | {project.dates}</Typography>
                                            <Typography variant="body2">{project.description}</Typography>
                                            <Box sx={{ mt: 1 }}>
                                                {project.stack.map(tech => <Chip key={tech} label={tech} size="small" sx={{ mr: 1, mb: 1, fontFamily: 'monospace' }} />)}
                                            </Box>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Box>
                </Container>
            )}

            <div className="fixed top-4 right-4 z-50">
                <Button
                    onClick={() => setIsCvVisible(!isCvVisible)}
                    sx={{
                        p: 1.5,
                        minWidth: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: '2px solid #fff',
                        boxShadow: '2px 2px #000',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                    }}
                >
                    {isCvVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </Button>
            </div>
            <ElementPalette selectedElement={selectedElement} setSelectedElement={setSelectedElement} onReset={handleReset} />
        </Box>
    );
}

export default App;