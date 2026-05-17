from django.core.management.base import BaseCommand
from exams.models import Exam, Question


class Command(BaseCommand):
    help = 'Seed database with exam data'

    def handle(self, *args, **kwargs):

        # Delete old data
        Question.objects.all().delete()
        Exam.objects.all().delete()

        # Create exam
        exam = Exam.objects.create(
            title='Python Basics',
            description='Python MCQ Test',
            duration=5
        )

        questions = [
            {
                'question_text': 'What is Python?',
                'option1': 'Programming Language',
                'option2': 'Browser',
                'option3': 'Database',
                'option4': 'OS',
                'correct_option': 1
            },
            {
                'question_text': 'Which keyword defines function?',
                'option1': 'func',
                'option2': 'define',
                'option3': 'def',
                'option4': 'function',
                'correct_option': 3
            },
            {
                'question_text': 'Which data type stores text?',
                'option1': 'int',
                'option2': 'str',
                'option3': 'bool',
                'option4': 'float',
                'correct_option': 2
            },
            {
                'question_text': 'Which symbol is used for comments?',
                'option1': '//',
                'option2': '#',
                'option3': '--',
                'option4': '/*',
                'correct_option': 2
            },
            {
                'question_text': 'Which loop repeats until condition fails?',
                'option1': 'if',
                'option2': 'switch',
                'option3': 'while',
                'option4': 'case',
                'correct_option': 3
            }
        ]

        for q in questions:
            Question.objects.create(
                exam=exam,
                question_text=q['question_text'],
                option1=q['option1'],
                option2=q['option2'],
                option3=q['option3'],
                option4=q['option4'],
                correct_option=q['correct_option']
            )

        self.stdout.write(
            self.style.SUCCESS('Database seeded successfully!')
        )