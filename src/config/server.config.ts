export const serverConfig = {
  quizQuestionCount: parseInt(process.env.QUIZ_QUESTION_COUNT, 10) || 50,
  sessionSecret: process.env.SESSION_SECRET || 'session_secret',
  serverPort: parseInt(process.env.PORT, 10) || 3001,
};

export default serverConfig;
