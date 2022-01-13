from rest_framework import serializers
from .models import Articulo,Proveedor,Categoria

class ProveedorSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255)
    
    class Meta:
        model = Proveedor
        fields = ['id','nombre']
    
class CategoriaSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255)
    
    class Meta:
        model = Categoria
        fields = ['id','nombre']

class ArticuloSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255)
    image_url = serializers.CharField(max_length=1024)
    categoria = CategoriaSerializer()
    promocion = serializers.DecimalField(max_digits=10,decimal_places=2, required=False)
    precio = serializers.DecimalField(max_digits=10 ,decimal_places=2)
    proveedor = ProveedorSerializer() 
    
    class Meta:
        model = Articulo
        fields = ['id','nombre','image_url','categoria','promocion','precio','proveedor']