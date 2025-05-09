'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useGetQuestionsQuery, useUpdateQuestionMutation } from '@/Apis/users';

interface EditQuestionPageProps {
  params: { id: string };
}

export default function EditQuestionPage({ params }: EditQuestionPageProps) {
  const router = useRouter();
  const { data: questions, isLoading: isFetching, error } = useGetQuestionsQuery();
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    correct_answer: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Find the question to edit
  const question:any = questions?.find((q) => q.id === parseInt(params.id));

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        correct_answer: question.correct_answer,
      });
    }
  }, [question]);

  if (isFetching) return <div>Loading...</div>;
  if (error || !question) return <div>Error loading question or question not found.</div>;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.question) newErrors.question = 'Question is required';
    if (!formData.option1) newErrors.option1 = 'Option 1 is required';
    if (!formData.option2) newErrors.option2 = 'Option 2 is required';
    if (!formData.option3) newErrors.option3 = 'Option 3 is required';
    if (!formData.correct_answer) {
      newErrors.correct_answer = 'Correct answer is required';
    } else if (
      ![formData.option1, formData.option2, formData.option3].includes(formData.correct_answer)
    ) {
      newErrors.correct_answer = 'Correct answer must match one of the options';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading('Updating question...');
    try {
      await updateQuestion({
        id: parseInt(params.id),
        body: {
          question: {
            question: formData.question,
            option1: formData.option1,
            option2: formData.option2,
            option3: formData.option3,
            correct_answer: formData.correct_answer,
          },
        },
      }).unwrap();
      toast.dismiss(loadingToast);
      toast.success('Question updated successfully!');
      router.push('/dashboard/question'); // Redirect to the question listing page
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update question. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Question</h2>
          <Link href="/dashboard/question">
            <Button variant="ghost" size="sm">
              <IconArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                type="text"
                placeholder="Enter the question"
                value={formData.question}
                onChange={handleInputChange}
                required
              />
              {errors.question && <p className="text-sm text-destructive">{errors.question}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="option1">Option 1</Label>
              <Input
                id="option1"
                name="option1"
                type="text"
                placeholder="Enter option 1"
                value={formData.option1}
                onChange={handleInputChange}
                required
              />
              {errors.option1 && <p className="text-sm text-destructive">{errors.option1}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="option2">Option 2</Label>
              <Input
                id="option2"
                name="option2"
                type="text"
                placeholder="Enter option 2"
                value={formData.option2}
                onChange={handleInputChange}
                required
              />
              {errors.option2 && <p className="text-sm text-destructive">{errors.option2}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="option3">Option 3</Label>
              <Input
                id="option3"
                name="option3"
                type="text"
                placeholder="Enter option 3"
                value={formData.option3}
                onChange={handleInputChange}
                required
              />
              {errors.option3 && <p className="text-sm text-destructive">{errors.option3}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="correct_answer">Correct Answer</Label>
              <Input
                id="correct_answer"
                name="correct_answer"
                type="text"
                placeholder="Enter the correct answer"
                value={formData.correct_answer}
                onChange={handleInputChange}
                required
              />
              {errors.correct_answer && (
                <p className="text-sm text-destructive">{errors.correct_answer}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Question'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}