from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Product
import random

DUMMYJSON_API_URL = "https://dummyjson.com/products"




@api_view(['GET'])
def generate_random_cart_view(request):
    try:
        products = list(Product.objects.all())
        
        if not products:
            response = populate_products_view()
            if response.status_code == 200:
                products = list(Product.objects.all())
                if not products:
                    return Response({"error": "Failed to populate products."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error": "Failed to populate products."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        cart = []
        cart_size = random.randint(3, 8)
        for _ in range(cart_size):
            product = random.choice(products)
            quantity = random.randint(1, 10)
            discount = random.randint(0, 20)

            cart.append({
                "productId": product.product_id,
                "price": product.price,
                "quantity": quantity,
                "discount": discount,
            })
        
        return Response(cart, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def process_cart_view(request):
    cart = request.data
    cart_valid = True

    for item in cart:
        product = Product.objects.filter(product_id=item['productId']).first()
        if product:
            Sr = product.stock / product.rating
            print(f"Product ID: {item['productId']}, Name: {product.title}, Price: {item['price']}, "
                  f"Discount: {item['discount']}%, Quantity: {item['quantity']}, "
                  f"Stock: {product.stock}, Rating: {product.rating}, Real Stock (Sr): {Sr}")

            if Sr < item['quantity']:
                cart_valid = False
        else:
            print(f"Product ID: {item['productId']} not found.")
            cart_valid = False

    return Response({"can_process_cart": cart_valid}, status=status.HTTP_200_OK)

def populate_products_view():
    try:
        limit = 10
        skip = 0
        while True:
            response = requests.get(f"{DUMMYJSON_API_URL}?limit={limit}&skip={skip}")
            data = response.json()
            for product_data in data['products']:
                Product.objects.update_or_create(
                    product_id=product_data['id'],
                    defaults={
                        'title': product_data['title'],
                        'price': product_data['price'],
                        'stock': product_data['stock'],
                        'rating': product_data['rating'],
                    }
                )
            if skip + limit >= data['total']:
                break
            skip += limit

        return Response({"message": "Products have been populated successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
