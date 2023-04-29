class UserController:

    @classmethod
    def check_user(self, data):
        if data['user'] and data['pass']:
            return data
        else:
            return (False, 'Informacion incompleta')