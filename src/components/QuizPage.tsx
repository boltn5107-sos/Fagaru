import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface QuizPageProps {
  language: string;
}

export default function QuizPage({ language }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const t = {
    wolof: {
      title: "Quiz & Aay",
      subtitle: "Jàng ci wér-gu-yaram",
      question: "Laaj",
      score: "Ay points",
      next: "Bi ci topp",
      finish: "Jeexël",
      correct: "Baax la!",
      incorrect: "Dëgg-dëgg",
      yourScore: "Sa score",
      excellent: "Baax na lool!",
      good: "Baax la!",
      tryAgain: "Jéemël ci kanam",
      restart: "Taamu ci kanam",
      tips: "Aay yu bari",
      tip1: "Sànk sa loxo bumu am 20 seconds",
      tip2: "Doxal yépp ay vaccin",
      tip3: "Naan ndox bu set",
      tip4: "Tëj ci barkkéefi"
    },
    french: {
      title: "Quiz & Conseils",
      subtitle: "Testez vos connaissances",
      question: "Question",
      score: "Score",
      next: "Suivant",
      finish: "Terminer",
      correct: "Correct !",
      incorrect: "Incorrect",
      yourScore: "Votre score",
      excellent: "Excellent !",
      good: "Bien !",
      tryAgain: "Réessayez",
      restart: "Recommencer",
      tips: "Conseils essentiels",
      tip1: "Lavez-vous les mains pendant 20 secondes",
      tip2: "Faites tous vos vaccins",
      tip3: "Buvez de l'eau potable",
      tip4: "Respectez la distanciation"
    }
  };

  const text = t[language as keyof typeof t] || t.wolof;

  const questions = language === 'wolof' ? [
    {
      question: "Lan mooy njëkk yu bari ci lakkat Korona?",
      answers: [
        "Sànk sa loxo bu bari",
        "Lekk ceebu jën bu bari",
        "Reg bu bari",
        "Toog ci kër"
      ],
      correct: 0
    },
    {
      question: "Naka la gën a lakkat sump (paludisme)?",
      answers: [
        "Dox dëkk bu mag",
        "Jëfandikoo muskiteer",
        "Lekk thiakry",
        "Dem ci dëkk"
      ],
      correct: 1
    },
    {
      question: "Lu tax vaccin dafa am solo?",
      answers: [
        "Dinaa am wér",
        "Dina ma faral sa liggéey",
        "Dinaa lakkat wér-gu-yaram yu bari",
        "Amul ko lu bari"
      ],
      correct: 2
    },
    {
      question: "Lan mooy simptoom bu njëkk ci COVID-19?",
      answers: [
        "Metit loxo ak febar",
        "Soxla ak febar",
        "Metit biir ak daanu yaram",
        "Yépp ci wone"
      ],
      correct: 1
    }
  ] : [
    {
      question: "Quelle est la meilleure façon de prévenir le COVID-19 ?",
      answers: [
        "Se laver les mains régulièrement",
        "Manger beaucoup de riz",
        "Dormir beaucoup",
        "Rester à la maison"
      ],
      correct: 0
    },
    {
      question: "Comment peut-on prévenir le paludisme ?",
      answers: [
        "Vivre en ville",
        "Utiliser des moustiquaires",
        "Manger du couscous",
        "Voyager souvent"
      ],
      correct: 1
    },
    {
      question: "Pourquoi la vaccination est-elle importante ?",
      answers: [
        "Je vais tomber malade",
        "Cela m'empêchera de travailler",
        "Cela prévient les maladies graves",
        "Ce n'est pas important"
      ],
      correct: 2
    },
    {
      question: "Quel est un symptôme commun du COVID-19 ?",
      answers: [
        "Maux de tête et fièvre",
        "Toux et fièvre",
        "Maux de ventre et perte de poids",
        "Tous ces symptômes"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Card className="p-8 text-center border-2 border-emerald-200">
          <div className="mb-6">
            <Award className={`w-24 h-24 mx-auto mb-4 ${percentage >= 75 ? 'text-yellow-500' : 'text-blue-500'}`} />
            <h2 className="text-slate-800 mb-2">{text.yourScore}</h2>
            <div className="text-emerald-600 mb-4">{score} / {questions.length}</div>
            <p className="text-slate-600 text-xl">
              {percentage >= 75 ? text.excellent : percentage >= 50 ? text.good : text.tryAgain}
            </p>
          </div>

          <div className="mb-8">
            <Progress value={percentage} className="h-3" />
            <p className="text-slate-500 mt-2">{Math.round(percentage)}%</p>
          </div>

          <Button 
            onClick={handleRestart}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700"
          >
            {text.restart}
          </Button>
        </Card>

        {/* Tips Section */}
        <Card className="p-6 mt-6 border-2 border-blue-200">
          <h3 className="text-blue-700 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {text.tips}
          </h3>
          <div className="space-y-3">
            {[text.tip1, text.tip2, text.tip3, text.tip4].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-emerald-700 mb-2">{text.title}</h1>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-600">
            {text.question} {currentQuestion + 1}/{questions.length}
          </span>
          <Badge className="bg-emerald-100 text-emerald-700">
            {text.score}: {score}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-8 mb-6 border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
            {currentQuestion + 1}
          </div>
          <h3 className="text-slate-800 pt-2">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].answers.map((answer, index) => {
            const isCorrect = index === questions[currentQuestion].correct;
            const isSelected = selectedAnswer === index;
            const showResult = selectedAnswer !== null;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-center gap-3
                  ${!showResult && 'hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'}
                  ${isSelected && isCorrect && 'bg-green-50 border-green-500'}
                  ${isSelected && !isCorrect && 'bg-red-50 border-red-500'}
                  ${!isSelected && showResult && isCorrect && 'bg-green-50 border-green-300'}
                  ${!isSelected && !showResult && 'border-slate-200'}
                  ${showResult && !isCorrect && !isSelected && 'opacity-50'}
                `}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected && isCorrect && 'bg-green-500 border-green-500'}
                  ${isSelected && !isCorrect && 'bg-red-500 border-red-500'}
                  ${!isSelected && showResult && isCorrect && 'bg-green-500 border-green-500'}
                  ${!showResult && 'border-slate-300'}
                `}>
                  {showResult && ((isSelected && isCorrect) || (!isSelected && isCorrect)) && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="text-slate-700">{answer}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700"
            >
              {currentQuestion === questions.length - 1 ? text.finish : text.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </Card>

      {/* Tips Card */}
      <Card className="p-6 bg-blue-50 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-blue-700 mb-2">{text.tips}</h4>
            <p className="text-slate-600">{[text.tip1, text.tip2, text.tip3, text.tip4][currentQuestion]}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
