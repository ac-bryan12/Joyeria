from django.db import models

# Create your models here.
class Proveedor(models.Model):
    nombre = models.CharField(max_length=255)
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=255)

class Articulo(models.Model):
    nombre = models.CharField(max_length=255)
    image_url = models.CharField(max_length=1024)
    categoria = models.ForeignKey(Categoria,on_delete=models.SET_NULL,null=True)
    promocion = models.DecimalField(max_digits=10 ,decimal_places=2,null=True)
    precio = models.DecimalField(max_digits=10 ,decimal_places=2)
    proveedor = models.ForeignKey(Proveedor,on_delete=models.SET_NULL,null=True) 