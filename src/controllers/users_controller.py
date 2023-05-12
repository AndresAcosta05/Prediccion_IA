from models.users_model import UserModel

class UserController:

    @classmethod
    def check_user(self, user):
        response = UserModel.login_user(user=user)
        return (response if response else None)
    
    @classmethod
    def get_user_by_id(self, id):
        response = UserModel.get_by_id(id = id)
        return (response if response else None)
    
    @classmethod
    def send_email_request(self, document, names, surnames, phone, email, affair):
        response = UserModel.send_email_request(document, names, surnames, phone, email, affair)
        return (response if response else None)
    
    @classmethod
    def get_email_requests(self):
        response = UserModel.get_email_requests()
        return (response if response else None)
            