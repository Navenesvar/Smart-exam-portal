from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Exam, Question, Result
from .serializers import ExamSerializer, QuestionSerializer, ResultSerializer

@api_view(['POST'])
def signup(request):

    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():

        return Response({
            'error': 'Username already exists'
        }, status=400)

    User.objects.create_user(
        username=username,
        password=password
    )

    return Response({
        'message': 'User created successfully'
    })

@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        return Response({
            'message': 'Login successful',
            'username': user.username
        })

    return Response({
        'error': 'Invalid credentials'
    }, status=400)

@api_view(['GET'])
def get_exams(request):
    exams = Exam.objects.all()
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_questions(request, exam_id):
    questions = Question.objects.filter(exam_id=exam_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def save_result(request):
    serializer = ResultSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['GET'])
def leaderboard(request):

    exam_id = request.GET.get('exam_id')

    results = Result.objects.all()

    # ✅ THIS IS THE KEY FIX
    if exam_id:
        results = results.filter(exam_id=exam_id)

    data = []

    for r in results:
        data.append({
            "id": r.id,
            "student": r.student,
            "exam": r.exam.id,
            "score": r.score,
            "total": r.total
        })

    return Response(data)