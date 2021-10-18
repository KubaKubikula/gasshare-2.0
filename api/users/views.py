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
                return JsonResponse({"password": "Passwords are not same"}, status=400)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LoginUserSerializer(data=data)
        user = serializer.valid_login(data["body"]["email"], data["body"]["password"])
        if user:
            request.session['loggedIn'] = True
            request.session['loggedInUser'] = data["body"]["email"]

            return JsonResponse({
                "loggedIn": "true",
                "message": "User has been logged in",
                "user" : {"id" : user.id, "email" : user.email}
            }, status=200)
        else:
            request.session['loggedIn'] = False
            request.session['loggedInUser'] = ""

            return JsonResponse({
                "LoggedIn": "false",
                "message" : "email or password doesn't match",
                "user" : "false"
            }, status=400)

@csrf_exempt
def loggedin(request):
    if request.method == 'GET':
        if 'loggedIn' in request.session and request.session['loggedIn']:  
            return JsonResponse({"loggedIn": "true", "user": request.session['loggedInUser']}, status=200)
        else:
            return JsonResponse({"LoggedIn": "false", "user": ""}, status=200)

@csrf_exempt
def logout(request):
    if request.method == 'POST':
        request.session['loggedIn'] = False
        request.session['loggedInUser'] = ""

        return JsonResponse({"LoggedIn": "false", "user": ""}, status=400)
