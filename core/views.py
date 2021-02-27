from django.shortcuts import render

def index(request):
    return render(request, 'django_itunes/index.html')
# Create your views here.
