from rest_framework.response import Response
from graficos.serializers import DateSerializer
from producto.models import Articulo, Categoria
from rest_framework import permissions,status
from rest_framework.views import APIView
from producto.serializers import ArticuloSerializer
from shop.models import Pedido
from shop.mongodbs import NoSQLDB
from rest_framework.authentication import TokenAuthentication


# Create your views here.
lista = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

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
    permission_classes = [permissions.AllowAny]
    
    def get(self,request):
        results = []
        for i in range(12):
            pedidos = Pedido.objects.filter(fechaCompra__month=i+1)
            cantidad = 0
            for pedido in pedidos:
                noSQL = NoSQLDB()
                detalle = noSQL.get_detalle(pedido.pk)
                for item in detalle["items"]:
                    cantidad += item["amount"]
            res_mes = {
                "mes" : lista[i],
                "cantidad" : cantidad
            }
            results.append(res_mes)
        return Response({"data":results})


class Reporte(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request):
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            fechaInicio = serializer.validated_data['fechaInicio']
            fechaFin = serializer.validated_data['fechaFin']
            if(fechaFin>fechaInicio):
                pedidos = Pedido.objects.filter(fechaCompra__range=[fechaInicio,fechaFin])
                if pedidos.exists():
                    noSQL = NoSQLDB()
                    data = {}
                    for pedido in pedidos:
                        cantidad = 0
                        detalle = noSQL.get_detalle(pedido.id)
                        for item in detalle["items"]:
                            cantidad = item["amount"]
                            producto = Articulo.objects.filter(id=item["id"])[0]
                            if producto.id not in data:
                                data[producto.id]={"nombre":producto.nombre,"cantidad":cantidad,"cliente":pedido.usuario.username}
                            else:
                                data[producto.id]["cantidad"] = data[producto.id]["cantidad"]+cantidad
                    return Response({"data":data},status=status.HTTP_200_OK)
                return Response({"error":"Revise que el rango de fechas"},status=status.HTTP_400_BAD_REQUEST)
            return Response({"error":"Revise que el rango de fechas"},status=status.HTTP_400_BAD_REQUEST)