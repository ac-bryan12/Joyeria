from django.urls import path,include

from shop.views import ShopView

urlpatterns = [
    path("pedido",ShopView.as_view()),
    #path("reporte",ReporteCompras.as_view())
]