from django.db import models
from django.contrib.auth.models import User

class Pedido(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    fechaCompra = models.DateField(auto_now_add=True)
    total = models.DecimalField(max_digits=10,decimal_places=2,null=True)


class Pago(models.Model):
    valor = models.DecimalField(max_digits=10,decimal_places=2)
    

class Factura(models.Model):
    pago = models.ForeignKey(Pago,on_delete=models.SET_NULL,null=True)
    fechaFacturacion = models.DateField(auto_now_add=True)
    pedido = models.ForeignKey(Pedido,on_delete=models.CASCADE)
    
    
    