from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions,status
from rest_framework.response import Response
from producto.models import Articulo
from shop.models import DetallesPedido, Pedido, Pago, Factura
from shop.serializers import CartSerializer

class ShopView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self,request):
        serializer = CartSerializer(data=request.data,many=True)
        if serializer.is_valid(raise_exception=True):
            pedido = Pedido()
            pedido.usuario = request.user
            pedido.save()
            
            valor_total = 0
            for product in serializer.validated_data:
                articulo = Articulo.objects.filter(pk=product['id'])
                if articulo.exists():
                    articulo = articulo.get()
                    detalle = DetallesPedido()
                    detalle.pedido = pedido
                    detalle.articulo = articulo
                    detalle.cantidadSolicitada = product['amount']
                    
                    if articulo.promocion:
                        detalle.precioUnitario = articulo.promocion
                    else:
                        detalle.precioUnitario =  articulo.precio
                    
                    detalle.save()
                    
                    if articulo.stock >= product['amount']:
                        articulo.stock = int(articulo.stock) -  int(product['amount'])
                        articulo.save()
                    else:
                        articulo.stock = 0
                        articulo.save()
                    
                    valor_total += float(detalle.precioUnitario) * int(detalle.cantidadSolicitada)
            
            if valor_total != 0.0:
                pago = Pago.objects.create(valor=valor_total)
                pedido.total = valor_total
                pedido.save()
                Factura.objects.create(pago=pago,pedido=pedido)
                return Response({"msg":"Éxito al comprar sus productos."})
            
            return Response({"error":"No agregó porductos al carrito o ya no están disponibles."})
        

#class GraficoCompras(APIView):
    
    # def get(self,request):
    #     results = []
    #     for i in range(12):
    #         pedidos = Pedido.objects.filter(fechaCompra__month=i+1)
    #         cantidad = 0
    #         for pedido in pedidos:
    #             detalles = DetallesPedido.objects.filter(pedido=pedido)
    #             for detalle in detalles:
    #                 cantidad += detalle.cantidadSolicitada
    #         res_mes = {
    #             "mes" : i+1,
    #             "cantidad" : cantidad
    #         }
    #         results.append(res_mes)
    #     return Response({"data":results})
        