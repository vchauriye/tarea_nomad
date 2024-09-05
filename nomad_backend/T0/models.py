from django.db import models

class Product(models.Model):
    product_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    price = models.FloatField()
    stock = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return self.title
