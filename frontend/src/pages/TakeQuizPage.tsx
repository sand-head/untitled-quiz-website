import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import type { Quiz } from '../models/quiz';
import QuestionResponse from '../Components/QuestionResponse';
import { useForm } from 'react-hook-form';

const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

const loadQuiz = async (id: any): Promise<Quiz> => {
  // todo: don't hardcode quiz
  // const res = await fetch(`${SNOWPACK_PUBLIC_API_URL}/api/quiz/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    title: 'A sample quiz',
    questions: [
      {
        questionStr: 'How many fingers am I holding up?',
        // todo: send client array of answers so cheating isn't easy
        correctAnswer: '3',
        incorrectAnswer: '11',
        incorrectAnswer2: '0',
        incorrectAnswer3: 'do thumbs count'
      },
      {
        questionStr: 'What color is the sky?',
        // todo: send client array of answers so cheating isn't easy
        correctAnswer: 'Yellow',
        incorrectAnswer: 'Red',
        incorrectAnswer2: 'Blue',
        incorrectAnswer3: 'Green'
      },
    ]
  };
};

interface TakeQuizPageProps {
  id: any
}

const TakeQuizPage: React.FunctionComponent<TakeQuizPageProps> = ({ id }) => {
  const { register, handleSubmit } = useForm();
  const [quiz, setQuiz] = useState<Quiz>({
    questions: Array(5).fill({
      questionStr: null,
      correctAnswer: null,
      incorrectAnswer: null,
      incorrectAnswer2: null,
      incorrectAnswer3: null
    })
  });

  useEffect(() => {
    loadQuiz(id)
      .then(loadedQuiz => setQuiz(loadedQuiz));
  }, []);

  const submitAnswers = async (e: any) => {
    console.log(e);
  };

  return (
    <main>
      <h1>{quiz.title ?? <Skeleton />}</h1>
      <form onSubmit={handleSubmit(submitAnswers)}>
        {quiz.questions.map((question, i) => (
          <QuestionResponse id={i} title={question.questionStr} answers={[
            question.correctAnswer,
            question.incorrectAnswer,
            question.incorrectAnswer2,
            question.incorrectAnswer3
          ]} ref={register} key={i} />
        ))}
        <button onClick={submitAnswers}>Submit Answers</button>
      </form>
    </main>
  );
};

export default TakeQuizPage;