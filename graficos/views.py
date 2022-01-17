from rest_framework.response import Response
from django.shortcuts import render
from producto.models import Articulo, Categoria
from rest_framework import permissions
from rest_framework.views import APIView
from producto.serializers import ArticuloSerializer
from shop.models import DetallesPedido, Pedido

# Create your views here.

class GraficoPrecio(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticuloSerializer
    def get(self,request):
        datos = self.serializer_class(Articulo.objects.all(),many=True)
        return Response({'data':datos.data})

class GraficoCategorias(APIView):
    permission_classes = [permissions.AllowAny]

    def count(self):
        lista = Categoria.objects.all()
        listaart = Articulo.objects.all()
        dic = {}
        for categoria in lista:
            for articulo in listaart:
                if articulo.categoria.id==categoria.id:
                    if dic.get(categoria.nombre)!=None:
                        dic[categoria.nombre]=dic[categoria.nombre]+1
                    else:
                        dic[categoria.nombre]=1
        return dic

    def get(self,request):   
        return Response({'data':self.count()})       


class GraficoCompras(APIView):
    
    def get(self,request):
        results = []
        for i in range(12):
            pedidos = Pedido.objects.filter(fechaCompra__month=i+1)
            cantidad = 0
            for pedido in pedidos:
                detalles = DetallesPedido.objects.filter(pedido=pedido)
                for detalle in detalles:
                    cantidad += detalle.cantidadSolicitada
            res_mes = {
                "mes" : i+1,
                "cantidad" : cantidad
            }
            results.append(res_mes)
        return Response({"data":results})