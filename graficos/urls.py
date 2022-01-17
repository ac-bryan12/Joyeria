from django.urls import path,include

from graficos.views import GraficoCompras, GraficoPrecio,GraficoCategorias

urlpatterns = [
    path("grafico-barras",GraficoPrecio.as_view()),
    path('grafico-pie', GraficoCategorias.as_view()),
    path('grafico-puntos',GraficoCompras.as_view())
]
