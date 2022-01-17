from django.urls import path,include

from graficos.views import GraficoPrecio,GraficoCategorias

urlpatterns = [
    path("grafico-barras",GraficoPrecio.as_view()),
    path('grafico-pie', GraficoCategorias.as_view()),
]
