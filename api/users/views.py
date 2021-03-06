from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from users.serializers import UserSerializer, LoginUserSerializer, UserLoggedInSerializer, GoogleLoginUserSerializer
import logging

@csrf_exempt
def register(request):
    if request.method == 'POST':
        logger = logging.getLogger('project.interesting.stuff')
        logger.warning('Watch ouxxxt!')
        data = JSONParser().parse(request)
        logger.warning(data)
        serializer = UserSerializer(data=data["body"])
        if serializer.is_valid():
            try:
                user = serializer.save()
            except:
                return JsonResponse({"password": "Passwords are not same"}, status=400)
            return JsonResponse({
                "loggedIn": "true",
                "message": "User has been logged in",
                "user" : {"email" : user.email, "avatar": user.avatar_url, "token" : user.token}
            }, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LoginUserSerializer(data=data)
        user = serializer.valid_login(data["body"]["email"], data["body"]["password"])
        if user:
            return JsonResponse({
                "loggedIn": "true",
                "message": "User has been logged in",
                "user" : {"user_id": user.id, "email" : user.email, "avatar": user.avatar_url, "token" : user.token}
            }, status=200)
        else:
            return JsonResponse({
                "LoggedIn": "false",
                "message" : "email or password doesn't match",
                "user" : data
            }, status=400)

@csrf_exempt
def loggedin(request):
    data = JSONParser().parse(request)
    serializer = UserLoggedInSerializer(data=data)
    if request.method == 'POST':
        user = serializer.valid_token(data["body"]["token"])
        if user != False:  
            return JsonResponse({"loggedIn": "true"}, status=200)
        else:
            return JsonResponse({"LoggedIn": "false"}, status=400)

@csrf_exempt
def logout(request):
    if request.method == 'POST':
        return JsonResponse({"LoggedIn": "false", "user": ""}, status=400)

@csrf_exempt
def googlelogin(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = GoogleLoginUserSerializer(data['body']['data']['profileObj'])
        user = serializer.save_data(data['body']['data']['profileObj'])
        if user:
            return JsonResponse({
                "loggedIn": "true",
                "message": "User has been logged in",
                "user" : {"user_id": user.id, "email" : user.email, "avatar": user.avatar_url, user.token : "token"}
            }, status=200)
        else:
            return JsonResponse({
                "LoggedIn": "false",
                "message" : "email or password doesn't match",
                "user" : data
            }, status=400)
