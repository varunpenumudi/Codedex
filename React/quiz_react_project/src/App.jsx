import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import Header  from "./components/Header"
import Question from "./components/Question"
import Results from "./components/Results"
import UserForm from "./components/UserForm"
import { UserProvider } from "./components/UserContext"

function App() {

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "How do you make decisions?",
      options: ["📊 Analytical", "🧠 Instinctive", "🗨️ Consultative","🤔 Considerate"],
    },
    {
      questions: "How do you prefer to spend your free time?",
      options: ["📖 Reading", "🎉 Socializing", "🎮 Gaming", "🏋️‍♂️ Exercising"],
    },
    {
      question: "How do you prefer to learn?",
      options: ["📖 Reading", "🛠️ Hands-on", "🗣️ Discussion", "👀 Observation"],
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    // Continue mapping all your possible options to a keyword
    "📊 Analytical": "Fire", 
    "🧠 Instinctive": "Water", 
    "🗨️ Consultative": "Earth",
    "🤔 Considerate" : "Air",

    "🍿 Movies": "Fire",
    "🎉 Socializing": "Water",
    "🎮 Gaming": "Earth",
    "🏋️‍♂️ Exercising": "Air",

    "📖 Reading": "Fire",
    "🛠️ Hands-on": "Water",
    "🗣️ Discussion": "Earth",
    "👀 Observation": "Air",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers]  = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchArtwork(keyword) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
    const data = await response.json();

    const artwork_id = data.objectIDs[Math.floor(Math.random() * data.total)];
    const art_response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork_id}`);
    const artwork = await art_response.json();

    setArtwork(artwork);
  }
  
  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div id='app'>
      <UserProvider value={{ name: userName, setName: setUserName }} >
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App
