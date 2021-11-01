from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('loggedin/', views.loggedin),
    path('logout/', views.logout),
    path('googlelogin/', views.googlelogin),
]