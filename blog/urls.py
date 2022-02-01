from django.urls import path

from blog.views import BlogListView, BlogView

urlpatterns = [
    path("publicacion/<int:id>",BlogView.as_view()),
    path("publicacion/",BlogView.as_view()),
    path("list_publicacion/",BlogListView.as_view()),
]