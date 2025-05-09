// Define types for the question data
interface Question {
    id: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    correct_answer: string;
    created_at: string;
    updated_at: string;
  }
  
  interface CreateQuestionRequest {
    question: {
      question: string;
      option1: string;
      option2: string;
      option3: string;
      correct_answer: string;
    };
  }
  
  interface UpdateQuestionRequest {
    question: {
      question: string;
      option1: string;
      option2: string;
      option3: string;
      correct_answer: string;
    };
  }
  
  interface GetQuestionsResponse {
    questions: Question[];
    total: number; // Assuming the API returns the total number of questions
  }