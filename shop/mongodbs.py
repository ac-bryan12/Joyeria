from django.conf import settings
from pymongo import MongoClient
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication

class NoSQLDB(APIView):
    
    # Database
    connection = None
    db_name = settings.MONGO_DB
    host = settings.MONGO_HOST
    port = settings.MONGO_PORT
    username = settings.MONGO_USERNAME
    password = settings.MONGO_PASSWORD

    # Auth
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def __init__(self):
        try:
            if self.host and self.port and self.username and self.password and self.db_name:
                mongo_client = MongoClient(host=self.host,
                                              port=int(self.port),
                                              username=self.username,
                                              password=self.password
                                              )
                self.connection = mongo_client[self.db_name]
            else:
                mongo_client = MongoClient()
                self.connection = mongo_client[self.db_name]
        except Exception as e:
            raise e

    def get_detalle(self,id):
        mongo_db = self.connection
        detalles = mongo_db['DetallesPedido']
        det = detalles.find_one({'id_pedido': id})
        return det
    
    def create_detalle(self,detalle):
        mongo_db = self.connection
        detalles = mongo_db['DetallesPedido']
        res = detalles.insert_one(detalle).inserted_id
        if res:
            return True
        else:
            return False
    
    def change_detalle(self,id,detalle):
        mongo_db = self.connection
        detalles = mongo_db['DetallesPedido']
        res = detalles.replace_one({"id_pedido":id},detalle).modified_count
        if res:
            return True
        else:
            return False
    
    def delete_detalle(self,id):
        mongo_db = self.connection
        detalles = mongo_db['DetallesPedido']
        res = detalles.delete_one({"id_pedido":id})
        if res:
            return True
        else:
            return False

