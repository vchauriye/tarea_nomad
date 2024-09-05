from django.urls import path
from .views import populate_products_view, generate_random_cart_view, process_cart_view

urlpatterns = [
    path('populate-products/', populate_products_view, name='populate-products'),
    path('generate-random-cart/', generate_random_cart_view, name='generate-random-cart'),
    path('process-cart/', process_cart_view, name='process-cart'),
]