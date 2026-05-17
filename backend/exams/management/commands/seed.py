from django.core.management.base import BaseCommand
from exams.models import Exam, Question


class Command(BaseCommand):
    help = 'Seed database with multiple exams'

    def handle(self, *args, **kwargs):

        # Clear old data
        Question.objects.all().delete()
        Exam.objects.all().delete()

        exams_data = [
            {
                "title": "Python Basics",
                "description": "Python MCQ Test",
                "duration": 5,
                "questions": [
                    {
                        "question_text": "What is Python?",
                        "option1": "Programming Language",
                        "option2": "Snake",
                        "option3": "Database",
                        "option4": "OS",
                        "correct_option": 1
                    },
                    {
                        "question_text": "Which keyword defines a function?",
                        "option1": "func",
                        "option2": "define",
                        "option3": "def",
                        "option4": "function",
                        "correct_option": 3
                    },
                    {
                        "question_text": "Which data type is immutable?",
                        "option1": "list",
                        "option2": "dict",
                        "option3": "set",
                        "option4": "tuple",
                        "correct_option": 4
                    },
                    {
                        "question_text": "Which symbol is used for comments in Python?",
                        "option1": "//",
                        "option2": "#",
                        "option3": "/* */",
                        "option4": "--",
                        "correct_option": 2
                    },
                    {
                        "question_text": "Which function prints output?",
                        "option1": "echo()",
                        "option2": "print()",
                        "option3": "write()",
                        "option4": "output()",
                        "correct_option": 2
                    }
                ]
            },

            {
                "title": "Java Basics",
                "description": "Java MCQ Test",
                "duration": 10,
                "questions": [
                    {
                        "question_text": "Java is a?",
                        "option1": "Programming Language",
                        "option2": "Database",
                        "option3": "OS",
                        "option4": "Browser",
                        "correct_option": 1
                    },
                    {
                        "question_text": "JVM stands for?",
                        "option1": "Java Virtual Machine",
                        "option2": "Java Variable Method",
                        "option3": "Joint Virtual Model",
                        "option4": "None",
                        "correct_option": 1
                    },
                    {
                        "question_text": "Which keyword is used to inherit a class?",
                        "option1": "this",
                        "option2": "super",
                        "option3": "extends",
                        "option4": "implements",
                        "correct_option": 3
                    },
                    {
                        "question_text": "Which method is the entry point in Java?",
                        "option1": "start()",
                        "option2": "main()",
                        "option3": "run()",
                        "option4": "init()",
                        "correct_option": 2
                    },
                    {
                        "question_text": "Which of these is a primitive type?",
                        "option1": "String",
                        "option2": "Array",
                        "option3": "int",
                        "option4": "Class",
                        "correct_option": 3
                    }
                ]
            }
        ]

        # Create exams + questions
        for exam_data in exams_data:

            exam = Exam.objects.create(
                title=exam_data["title"],
                description=exam_data["description"],
                duration=exam_data["duration"]
            )

            for q in exam_data["questions"]:
                Question.objects.create(
                    exam=exam,
                    question_text=q["question_text"],
                    option1=q["option1"],
                    option2=q["option2"],
                    option3=q["option3"],
                    option4=q["option4"],
                    correct_option=q["correct_option"]
                )

        self.stdout.write(
            self.style.SUCCESS("Database seeded with 2 exams (5 questions each) successfully!")
        )