class Key:
    SECRET_KEY = '9FSSbRHjf1JbMA7mO0rcCZ4PPTMbJoGm'

class DevConfig(Key):
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = ''

class ProdConfig(Key):
    DEBUG = False
    MYSQL_HOST = ''
    MYSQL_USER = ''
    MYSQL_PASSWORD = ''
    MYSQL_DB = ''

config = {
    'development' : DevConfig,
    'production': ProdConfig
}
