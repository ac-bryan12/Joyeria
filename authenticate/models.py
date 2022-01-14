from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User,related_name='profile',null=True,on_delete=models.CASCADE)
    telefono = models.CharField(max_length=10)
    direccion = models.CharField(max_length=254)
