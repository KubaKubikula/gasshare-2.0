from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from users.serializers import UserSerializer, LoginUserSerializer
# Create your views here.

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return JsonResponse({"password": ["Passwords are not same"]}, status=400)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LoginUserSerializer(data=data)
        if serializer.valid_login():
            try:
                request.session['loggedIn'] = True
                return JsonResponse({"loggedIn": ["true"]}, status=200)
            except:
                return JsonResponse({"LoggedIn": ["false"]}, status=400)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def loggedin(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        serializer = LoginUserSerializer(data=data)
        if request.session['loggedIn']:            
            return JsonResponse({"loggedIn": ["true"]}, status=200)
        else:
            return JsonResponse({"LoggedIn": ["false"]}, status=400)
        