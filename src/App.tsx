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
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        p: 4
                    }}>
                        <header className="text-center mb-12">
                            <Typography variant="h1" component="h1" sx={{
                                fontWeight: 'extrabold',
                                color: 'white',
                                textShadow: '0 0 10px rgba(100, 200, 255, 0.5), 0 0 20px rgba(100, 200, 255, 0.3)'
                            }}>{cvData.name}</Typography>
                            <Typography variant="h5" component="p" sx={{
                                color: 'primary.light',
                                mt: 1,
                                textShadow: '0 0 5px rgba(100, 200, 255, 0.5)'
                            }}>{cvData.title}</Typography>
                            <Typography variant="body1" component="p" sx={{
                                color: 'grey.400',
                                mt: 2,
                                maxWidth: '600px',
                                mx: 'auto'
                            }}>{cvData.tagline}</Typography>
                        </header>

                        <Grid container spacing={4}>
                            <Card sx={{
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 0 20px rgba(0, 200, 255, 0.5)'
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
                                mb: 4, transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 0 15px rgba(0, 200, 255, 0.4)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>The Mission</Typography>
                                    <Typography variant="body2">{cvData.profile}</Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 0 15px rgba(0, 200, 255, 0.4)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>The Forge: Featured Work</Typography>
                                    {cvData.experience.map((exp, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.role}</Typography>
                                            <Typography variant="body2" sx={{ color: 'primary.light' }}>{exp.company} | {exp.dates}</Typography>
                                            <Typography variant="body2">{exp.description}</Typography>
                                        </Box>
                                    ))}
                                    {cvData.projects.map((project, index) => (
                                        <Box key={index} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{project.name}</Typography>
                                            <Typography variant="body2" sx={{ color: 'primary.light' }}>{project.context} | {project.dates}</Typography>
                                            <Typography variant="body2">{project.description}</Typography>
                                            <Box sx={{ mt: 1 }}>
                                                {project.stack.map(tech => <Chip key={tech} label={tech} size="small" sx={{ mr: 1, mb: 1 }} />)}
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
