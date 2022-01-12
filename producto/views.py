from django.db.models.query import QuerySet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Articulo
from .serializers import ArticuloSerializer

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


