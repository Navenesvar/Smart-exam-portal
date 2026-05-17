from rest_framework import serializers
from .models import Exam, Question, Result


class ExamSerializer(serializers.ModelSerializer):

    class Meta:

        model = Exam

        fields = [
            'id',
            'title',
            'description',
            'duration'
        ]
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'