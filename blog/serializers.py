import base64
from rest_framework import serializers
from blog.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(max_length=300)
    descripcion = serializers.CharField(max_length=300)
    autor = serializers.CharField(max_length=300)
    img_portada = serializers.URLField(max_length=1024)
    contenido = serializers.CharField(write_only=True)
    
    class Meta:
        model = Blog
        fields = ["id","titulo","descripcion","autor","img_portada","contenido"]
    
    
    def create(self, validated_data):
        blog:Blog = Blog()
        blog.titulo = validated_data["titulo"]
        blog.descripcion = validated_data["descripcion"]
        blog.autor = validated_data["autor"]
        blog.img_portada = validated_data["img_portada"]
        blog.contenido = validated_data["contenido"].encode()
        blog.save()
        
        return blog
    
    def update(self, instance, validated_data):
        instance.titulo = validated_data["titulo"]
        instance.descripcion = validated_data["descripcion"]
        instance.autor = validated_data["autor"]
        instance.img_portada = validated_data["img_portada"]
        instance.contenido = validated_data["contenido"].encode()
        instance.save()
        
        return instance
    