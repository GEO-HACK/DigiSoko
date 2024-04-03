from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def home(request):
    products=Products.objects.all()
    context={'products':products}
    return HttpResponse(render(request,'DigiSoko/home.html',context))
    
def about(request):
    return HttpResponse(render(request,'DigiSoko/about.html'))
