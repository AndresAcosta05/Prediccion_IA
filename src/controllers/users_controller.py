from models.users_model import UserModel

class UserController:

    @classmethod
    def check_user(self, user):
        respuesta = UserModel.login_user(user=user)
        if respuesta:
            return respuesta
        else:
            return None
    
    @classmethod
    def get_user_by_id(self, id):
        respuesta = UserModel.get_by_id(id = id)
        if respuesta:
            return respuesta
        else:
            return None