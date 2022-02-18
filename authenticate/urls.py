from django.urls import path
from authenticate.views import Login, Logout, UserView,UserCredentials

urlpatterns = [
    path('login/',Login.as_view()),
    path('logout/',Logout.as_view()),
    path('signup/',UserView.as_view()),
    path('user_credentials/',UserCredentials.as_view())
]