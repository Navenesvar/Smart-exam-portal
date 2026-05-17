from django.urls import path
from .views import *

urlpatterns = [
    path('exams/', get_exams),
    path('questions/<int:exam_id>/', get_questions),
    path('save-result/', save_result),
    path('leaderboard/', leaderboard),
    path('signup/', signup),
    path('login/', login),
]