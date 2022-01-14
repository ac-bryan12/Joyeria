import re
from django.db.models import query
from django.db.models.query import QuerySet
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Articulo, Categoria, Proveedor
from .serializers import ArticuloSerializer, CategoriaSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import JSONParser

class Articulos(APIView):
    
    def get(self, request):
        args = {}
        if request.GET.get("nombre"):
            nombre = request.GET.get("nombre")
            args["nombre__icontains"] =  nombre
            
        if request.GET.get("categoria"):
            categoria = request.GET.get("categoria")
            args["categoria__nombre__istartswith"] = categoria
            
        if request.GET.get("promocion"):
            promocion = not bool(request.GET.get("promocion"))
            args["promocion__isnull"] = promocion
        
        if len(args) > 0 :    
            query = Articulo.objects.filter(**args)
        else:
            query = Articulo.objects.all()
            
        serializer = ArticuloSerializer(query,many=True)

        return Response({"results":serializer.data}, status=status.HTTP_200_OK)


    def post(self,request):
        if request.user.is_authenticated:
            categoria = request.data["categoria"]['id']
            serializer = ArticuloSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                articulo = serializer.save()
                articulo.categoria = Categoria.objects.get(pk=categoria)
                articulo.proveedor = Proveedor.objects.get(pk=1)
                articulo.save()
                
            return Response({"msg":"Producto creado con éxito"})
        return Response({"error":"No autorizado"},status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self,request,id):
        if request.user.is_authenticated:
            articulo = Articulo.objects.filter(pk=id)
            if articulo.exists():
                categoria = request.data["categoria"]['id']
                articulo = articulo.get()
                serializer = ArticuloSerializer(articulo,data=request.data)
                if serializer.is_valid(raise_exception=True):
                    articulo = serializer.save()
                    articulo.categoria = Categoria.objects.get(pk=categoria)
                    articulo.save()
                    return Response({"msg":"Producto modificado con éxito"})
            return Response({"error":"El articulo o producto no existe."},status=status.HTTP_404_NOT_FOUND)
        return Response({"error":"No autorizado"},status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self,request,id):
        if request.user.is_authenticated:
            articulo = Articulo.objects.filter(pk=id)
            if articulo.exists():
                articulo = articulo.get()
                articulo.delete()
                return Response({"msg":"Éxito al borrar."})
            return Response({"error":"El articulo o producto no existe."},status=status.HTTP_404_NOT_FOUND)
        return Response({"error":"No autorizado"},status=status.HTTP_401_UNAUTHORIZED)
    

class Categorias(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        serializer = CategoriaSerializer(Categoria.objects.all(),many=True)
        return Response(serializer.data)
