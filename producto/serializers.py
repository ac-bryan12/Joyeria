from django.db.models import query
from rest_framework import serializers
from .models import Articulo,Proveedor,Categoria

class ProveedorSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255)
    
    class Meta:
        model = Proveedor
        fields = ['id','nombre']
    
class CategoriaSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255,required=False)
    
    class Meta:
        model = Categoria
        fields = ['id','nombre']

class ArticuloSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=255)
    image_url = serializers.CharField(max_length=1024)
    categoria = CategoriaSerializer()
    promocion = serializers.DecimalField(max_digits=10,decimal_places=2, required=False)
    precio = serializers.DecimalField(max_digits=10 ,decimal_places=2)
    stock = serializers.IntegerField()
    # proveedor = ProveedorSerializer(required=False) 
    
    class Meta:
        model = Articulo
        fields = ['id','nombre','image_url','categoria','promocion','precio','stock']
        
        
    def create(self, validated_data):
        articulo = Articulo()
        articulo.nombre = validated_data['nombre']
        articulo.image_url = validated_data['image_url']
        articulo.precio = validated_data['precio']
        articulo.promocion = validated_data.get("promocion")
        articulo.stock = validated_data['stock']
        articulo.save()
        
        return articulo
    
    def update(self, instance, validated_data):
        
        instance.nombre = validated_data['nombre']
        instance.image_url = validated_data['image_url']
        instance.precio = validated_data['precio']
        instance.promocion = validated_data.get("promocion")
        instance.stock = validated_data['stock']
        instance.save()
        return instance