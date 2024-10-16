import React, { useState, useEffect, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stack from '@mui/material/Stack';
import { Paper, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Lesson } from './Lesson';
import { Lessons } from './Lessons';

// Simulated lessons data
const mockedLessons: Lessons = {
  lessons: {
    '1': [
      {
        id: '1',
        title: '1. Basique - Leçon 1',
        content: 'chat soleil avion',
      },
      {
        id: '2',
        title: '1. Basique - Leçon 2',
        content: 'pomme rouge chien',
      },
      {
        id: '3',
        title: '1. Basique - Leçon 3',
        content: 'école voiture dessert',
      },
    ],
    '2': [
      {
        id: '1',
        title: '2. Intermédiaire - Leçon 1',
        content: 'La nature est pleine de merveilles à explorer.',
      },
      {
        id: '2',
        title: '2. Intermédiaire - Leçon 2',
        content: 'Le développement durable est important pour notre avenir.',
      },
      {
        id: '3',
        title: '2. Intermédiaire - Leçon 3',
        content:
          "Les ordinateurs permettent d'automatiser des tâches complexes.",
      },
    ],
    '3': [
      {
        id: '1',
        title: '3. Expert - Leçon 1',
        content:
          "L'intelligence artificielle est en train de transformer de nombreux secteurs, tels que la santé, l'éducation et les transports. Grâce aux algorithmes d'apprentissage automatique, les machines sont capables de traiter des quantités massives de données, de reconnaître des motifs et de prendre des décisions avec une précision croissante. Cela offre un potentiel énorme pour améliorer la productivité et résoudre des problèmes complexes.",
      },
      {
        id: '2',
        title: '3. Expert - Leçon 2',
        content:
          "Les algorithmes d'apprentissage profond, basés sur des réseaux de neurones artificiels, permettent d'analyser des données à une échelle sans précédent. Ils sont utilisés dans des domaines tels que la reconnaissance d'images, le traitement du langage naturel et les systèmes de recommandation. Ces algorithmes sont également capables d'apprendre de manière autonome à partir des données, ce qui ouvre la voie à de nouvelles découvertes scientifiques.",
      },
      {
        id: '3',
        title: '3. Expert - Leçon 3',
        content:
          "La cryptographie joue un rôle essentiel dans la sécurisation des communications numériques. Elle permet de protéger les informations sensibles, comme les données bancaires ou les messages personnels, contre les cyberattaques. Avec l'évolution des technologies, des techniques de cryptage toujours plus complexes sont développées pour assurer la confidentialité et l'intégrité des échanges sur internet.",
      },
    ],
  },
};

const TypingApp = () => {
  const [level, setLevel] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [globalErrorCount, setGlobalErrorCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [sessionData, setSessionData] = useState<{
    errors: number;
    time: number;
  } | null>(null);

  // Référence pour le champ TextField
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (level) {
      setLessons(mockedLessons.lessons[level] || []);
    }
  }, [level]);

  const handleLevelChange = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value as string);
    setSelectedLesson(null);
    setUserInput('');
    setErrorCount(0);
    setSessionData(null);
  };

  const handleLessonChange = (event: SelectChangeEvent<string>) => {
    const lessonId = event.target.value as string;
    const lesson = lessons.find((l) => l.id === lessonId) || null;
    setSelectedLesson(lesson);
    setUserInput('');
    setErrorCount(0);
    setSessionData(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInput(value);

    const originalText = selectedLesson?.content || '';

    // Diviser le texte original et la saisie de l'utilisateur en mots
    const originalWords = originalText.split(' ');
    const userWords = value.split(' ');

    let liveErrors = 0; // Erreurs en temps réel
    let tempGlobalErrors = globalErrorCount; // Pour mémoriser les erreurs globales
    let isCorrecting = false; // Pour savoir si l'utilisateur est en phase de correction

    // Comparer les mots jusqu'à la longueur de la saisie utilisateur
    const minLength = Math.min(originalWords.length, userWords.length);

    for (let i = 0; i < minLength; i++) {
      const originalWord = originalWords[i];
      const userWord = userWords[i];

      // Si le mot utilisateur est plus court que le mot attendu, on considère cela comme une correction
      if (userWord.length < originalWord.length) {
        isCorrecting = true; // L'utilisateur est en train de corriger
      }

      if (userWord.length <= originalWord.length) {
        // Si le mot saisi est partiel, on compare les caractères partiellement
        for (let j = 0; j < userWord.length; j++) {
          if (userWord[j] !== originalWord[j]) {
            liveErrors++;

            // Ajouter une erreur globale seulement si ce n'est pas une correction active
            if (!isCorrecting) {
              tempGlobalErrors++;
            }
          }
        }
      } else {
        // Si le mot est plus long que prévu, on compte ça comme une erreur entière
        liveErrors++;
        if (!isCorrecting) {
          tempGlobalErrors++;
        }
      }

      // Reset la correction une fois le mot complet est atteint
      if (userWord.length === originalWord.length) {
        isCorrecting = false; // Correction terminée
      }
    }

    // // Si l'utilisateur a écrit plus de mots que prévu (par exemple avec des espaces en trop)
    // if (userWords.length > originalWords.length) {
    //   liveErrors += userWords.length - originalWords.length;
    //   if (!isCorrecting) {
    //     tempGlobalErrors += userWords.length - originalWords.length;
    //   }
    // }

    // Mettre à jour les erreurs en temps réel
    setErrorCount(liveErrors);

    // Mettre à jour les erreurs globales seulement s'il n'y a pas de correction active
    setGlobalErrorCount(tempGlobalErrors);

    // Si l'utilisateur a saisi autant de caractères que le texte original ou plus, considérer la saisie comme terminée
    if (value.length >= originalText.length && liveErrors === 0) {
      stopTypingSession();
    }
  };

  const startTypingSession = () => {
    setIsTyping(true);
    setUserInput('');
    setErrorCount(0);
    setGlobalErrorCount(0);
    setTimer(0);
    setSessionData(null);

    // Donne le focus au champ de texte

    setTimeout(() => {
      textFieldRef.current?.focus();
    }, 100);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerInterval(intervalId);
  };

  const stopTypingSession = () => {
    setIsTyping(false);
    setSessionData({
      errors: globalErrorCount,
      time: timer,
    });

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const isComplete = userInput === selectedLesson?.content;

  const renderColoredInput = (text: string, input: string) => {
    const originalWords = text.split(' ');
    const inputWords = input.split(' ');

    const renderedText = [];

    for (let i = 0; i < originalWords.length; i++) {
      const originalWord = originalWords[i] || '';
      const inputWord = inputWords[i] || '';

      if (inputWord === originalWord) {
        // Le mot entier est correct
        renderedText.push(
          <span key={i} style={{ color: 'green', marginRight: '5px' }}>
            {originalWord}
          </span>,
        );
      } else {
        // Comparer chaque caractère du mot si le mot est partiel ou incorrect
        for (let j = 0; j < originalWord.length; j++) {
          const originalChar = originalWord[j] || '';
          const inputChar = inputWord[j] || '';

          if (inputChar === originalChar) {
            renderedText.push(
              <span key={`${i}-${j}`} style={{ color: 'green' }}>
                {inputChar}
              </span>,
            );
          } else if (inputChar) {
            renderedText.push(
              <span key={`${i}-${j}`} style={{ color: 'red' }}>
                {originalChar}
              </span>,
            );
          } else {
            renderedText.push(<span key={`${i}-${j}`}>{originalChar}</span>);
          }
        }
        renderedText.push(<span key={`space-${i}`}> </span>); // Ajouter un espace entre les mots
      }
    }

    return <span>{renderedText}</span>;
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, backgroundColor: 'white' }}>
      <Grid size={12}>
        <Typography variant="h4" component="h5" color="black">
          Outil d'aide à la frappe
        </Typography>
      </Grid>
      <Grid size={12}>
        <Paper
          elevation={3}
          component="section"
          sx={{ p: 2, backgroundColor: 'white' }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-level">Niveau</InputLabel>
              <Select
                labelId="select-level"
                id="level-select"
                value={level}
                onChange={handleLevelChange}
                label="Niveau"
              >
                <MenuItem value={1}>Débutant</MenuItem>
                <MenuItem value={2}>Intermédiaire</MenuItem>
                <MenuItem value={3}>Expert</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-lesson">Leçons</InputLabel>
              <Select
                labelId="select-lesson"
                id="lesson-select"
                value={selectedLesson?.id || ''}
                onChange={handleLessonChange}
                label="Leçon"
                disabled={!level}
              >
                {lessons.map((lesson) => (
                  <MenuItem key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Grid>

      {selectedLesson && (
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h5">Leçon: {selectedLesson.title}</Typography>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
              }}
            >
              <Grid size={6}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h6">
                    {renderColoredInput(selectedLesson.content, userInput)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={6}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrowIcon />}
                    disabled={
                      !selectedLesson || isTyping || sessionData !== null
                    }
                    onClick={startTypingSession}
                  >
                    Démarrer
                  </Button>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrowIcon />}
                    disabled={!selectedLesson || isTyping || !sessionData}
                    onClick={startTypingSession}
                  >
                    Recommencer
                  </Button>
                </FormControl>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Commencez à taper ici..."
                  error={errorCount > 0}
                  helperText={`Erreurs: ${errorCount}`}
                  disabled={!isTyping}
                  inputRef={textFieldRef} // Ajoute la référence ici
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}

      {sessionData && (
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 2 }}>
            {isComplete && (
              <Typography variant="h6" color="success.main">
                Félicitations, vous avez réussi !
              </Typography>
            )}
            <Typography variant="body1">
              Nombre d'erreurs: {sessionData.errors}
            </Typography>
            <Typography variant="body1">
              Temps écoulé: {sessionData.time}s
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default TypingApp;
