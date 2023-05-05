from config import Connection
from models.entities.users import User

class UserModel:

    @classmethod
    def login_user(self, user):
        try:
            with Connection.getConnection().cursor() as cursor:
                sql = f"SELECT id, document, name, lastname, password, fullname FROM users WHERE user_l = '{user}'"
                print(sql)
                cursor.execute(sql)   
                user_r = cursor.fetchone()
                if user_r != None:
                    return User(user_r[0], user_r[1], user_r[2], user_r[3], user, user_r[4], user_r[5])
                else:
                    return None
        
        except Exception as ex:
            print(ex)
            return None
        
    @classmethod
    def get_by_id(self, id):
        try:
            with Connection.getConnection().cursor() as cursor:
                sql = f"SELECT document, name, lastname, user, password, fullname FROM users WHERE id = '{id}'"
                cursor.execute(sql)   
                user_r = cursor.fetchone()
                if user_r != None:
                    return User(id, user_r[0], user_r[1], user_r[2], user_r[3], user_r[4], user_r[5])
                else:
                    return None
        
        except Exception as ex:
            print(ex)
            return None