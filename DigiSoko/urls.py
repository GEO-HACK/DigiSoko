from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    
    path('',views.home,name='home' ),
    path('about/',views.about ,name='about'),
    path('cart/',views.view_cart,name='cart'),

    path('create_product/',views.create_product,name='create_product'),
   path('add_to_cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    
]
