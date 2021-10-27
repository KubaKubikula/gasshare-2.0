from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from drives.models import Drive
from drives.serializers import DriveSerializer
import logging

@csrf_exempt
def drive_list(request):
    if request.method == 'GET':
        drives = Drive.objects.all()
        serializer = DriveSerializer(drives, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DriveSerializer(data=data["body"])
        if serializer.is_valid():
            serializer.save()  
            return JsonResponse({"xx" : "ccc"}, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def drive_detail(request, pk):
    try:
        snippet = Drive.objects.get(pk=pk)
    except Drive.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DriveSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = DriveSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)