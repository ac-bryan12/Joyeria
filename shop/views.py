from collections import OrderedDict
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions,status
from rest_framework.response import Response
from producto.models import Articulo
from producto.serializers import ArticuloSerializer
from shop.models import Pedido, Pago, Factura
from shop.mongodbs import NoSQLDB
from shop.serializers import CartSerializer, PedidoSerializer

class ShopView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        pedidos = Pedido.objects.filter(usuario=request.user)
        pedidos_list = []
        for pedido in pedidos:
            serializer_pedido = PedidoSerializer(pedido)
            datos_pedido = OrderedDict(serializer_pedido.data)
            noSQL = NoSQLDB()
            items = noSQL.get_detalle(pedido.pk)["items"]
            newItems = []
            for item in items:
                articulo = Articulo.objects.filter(pk=item["id"])
                if articulo.exists():
                    articulo = articulo.get()
                    serializer_articulo = ArticuloSerializer(articulo)
                    datos_articulo = OrderedDict(serializer_articulo.data)
                    datos_articulo.pop("image_url")
                    datos_articulo["amount"] = item["amount"]
                    newItems.append(datos_articulo)
                
            datos_pedido["items"] = newItems
            pedidos_list.append(datos_pedido)
            
        return Response({"pedidos":pedidos_list})
        
    
    def post(self,request):
        
        serializer = CartSerializer(data=request.data,many=True)
        if serializer.is_valid(raise_exception=True):
            pedido = Pedido()
            pedido.usuario = request.user
            pedido.save()
            
            valor_total = 0
            
            detalle = {}
            detalle["items"] = serializer.validated_data
            detalle["id_pedido"] = pedido.pk
            
            noSQL = NoSQLDB()
            
            if noSQL.create_detalle(detalle):
            
                for product in serializer.validated_data:
                    articulo = Articulo.objects.filter(pk=product['id'])
                    
                    if articulo.exists():
                        articulo = articulo.get()
                        
                        if articulo.promocion:
                            valor_total += float(articulo.promocion) * int(product['amount'])
                        else:
                            valor_total +=  float(articulo.precio) * int(product['amount'])
                        
                        articulo.stock = int(articulo.stock) -  int(product['amount'])
                        articulo.save()
                
                if valor_total != 0.0:
                    pago = Pago.objects.create(valor=valor_total)
                    pedido.total = valor_total
                    pedido.save()
                    Factura.objects.create(pago=pago,pedido=pedido)
                    return Response({"msg":"Éxito al crear su pedido"})
            else:
                pedido.delete()
                return Response({"error":"Ocurrió un error al crear el detalle del pedido"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    
    
    def put(self,request,id):
        
        if Pedido.objects.filter(pk=id,usuario=request.user).exists():
            pedido = Pedido.objects.get(pk=id)
            serializer = CartSerializer(pedido,data=request.data,many=True)
            
            if serializer.is_valid(raise_exception=True):
                noSQL = NoSQLDB()
                items = noSQL.get_detalle(pedido.pk)["items"]
                
                for item in items:
                    articulo = Articulo.objects.get(pk=item["id"])
                    articulo.stock += int(item["amount"])
                    articulo.save()
                
                detalle = {}
                detalle["items"] = serializer.validated_data
                detalle["id_pedido"] = pedido.pk
                
                if noSQL.change_detalle(pedido.pk,detalle):
                    
                    valor_total = 0
                    
                    for product in serializer.validated_data:
                        articulo = Articulo.objects.get(pk=product['id'])
                            
                        if articulo.promocion:
                            valor_total += float(articulo.promocion) * int(product['amount'])
                        else:
                            valor_total +=  float(articulo.precio) * int(product['amount'])
                        
                        articulo.stock = int(articulo.stock) -  int(product['amount'])
                        articulo.save()
                    
                        
                    pedido.total = valor_total
                    pedido.save()
                    return Response({"msg":"Éxito al actualizar su pedido"})
                    
                return Response({"error":"Ocurrió un error al actualizar el pedido"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"error":"No existe el pedido solicitado"},status=status.HTTP_404_NOT_FOUND)
    
    
    def delete(self,request,id):
        
        if Pedido.objects.filter(pk=id,usuario=request.user).exists():
            pedido = Pedido.objects.get(pk=id)
            
            noSQL = NoSQLDB()
            items = noSQL.get_detalle(pedido.pk)["items"]
                
            for item in items:
                articulo = Articulo.objects.get(pk=item["id"])
                articulo.stock += int(item["amount"])
                articulo.save()
            if noSQL.delete_detalle(pedido.pk):
                pedido.delete()
                return Response({"msg":"Se eliminó el pedido con éxito"})
            return Response({"error":"Ocurrió un error al borrar su pedido"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"error":"No existe el pedido solicitado"},status=status.HTTP_404_NOT_FOUND)
        