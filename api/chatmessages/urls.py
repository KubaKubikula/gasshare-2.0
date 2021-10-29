from django.urls import path
from chatmessages import views

urlpatterns = [
    path('chatmessages/', views.message_list),
    path('chatmessages/<int:pk>/', views.message_detail),
]