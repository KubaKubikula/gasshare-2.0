from django.urls import path
from drives import views

urlpatterns = [
    path('drives/', views.drive_list),
    path('drives/<int:pk>/', views.drive_detail),
]