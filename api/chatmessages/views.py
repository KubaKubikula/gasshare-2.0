from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from drives.models import Drive
from drives.serializers import DriveSerializer
import logging

@csrf_exempt
def message_list(request):
    return False

@csrf_exempt
def message_detail(request, pk):
    return False