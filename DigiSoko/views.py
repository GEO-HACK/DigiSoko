from django.shortcuts import render,redirect
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
            return redirect('home')
    context={'form':form}


    return render(request,'DigiSoko/product_form.html',context)

def view_cart(request):
    cart = request.session.get('cart', [])
    total_price = sum(item['price'] for item in cart)
    return render(request, 'DigiSoko/cart.html', {'cart': cart, 'total_price': total_price})

from django.http import JsonResponse

def add_to_cart(request, product_id):
    product = Products.objects.get(id=product_id)
    cart = request.session.get('cart', [])

    # Check if the product is already in the cart
    for item in cart:
        if item['id'] == product.id:
            # If the product is already in the cart, update its quantity
            item['quantity'] = item.get('quantity', 1) + 1  # Increment quantity by 1
            request.session['cart'] = cart
            return redirect('cart')
    
    # If the product is not in the cart, add it with an initial quantity of 1
    cart.append({
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'quantity': 1,  # Initial quantity is 1
        # Add other product details here if needed
    })

    request.session['cart'] = cart
    return redirect('home')


