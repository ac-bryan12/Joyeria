from django.db import models

class Blog(models.Model):
    titulo = models.CharField(max_length=300,null=True)
    descripcion = models.CharField(max_length=300,null=True)
    autor = models.CharField(max_length=300,null=True)
    img_portada = models.URLField(max_length=1024,null=True)
    contenido = models.BinaryField(null=True)
