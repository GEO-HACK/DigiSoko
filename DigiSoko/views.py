from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.db.models import Q
from .forms import *

def home(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    products=Products.objects.filter(Q(Type__name__icontains=q)|
                                     Q(name__icontains=q)|
                                     Q(description__icontains=q)
                                     )
    categorys=Category.objects.all()
    context={'products':products,
             'categorys':categorys,
             }
    return render(request,'DigiSoko/home.html',context)
    
def about(request):
    return HttpResponse(render(request,'DigiSoko/about.html'))

def create_product(request):
    form=ProductForm()
    if request.method=='POST':
        form=ProductForm(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse("{% url 'home' %}")
    context={'form':form}


    return render(request,'DigiSoko/product_form.html',context)
