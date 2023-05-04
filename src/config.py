import psycopg2

class Connection:
    
    def getConnection():
        try:
            conn = psycopg2.connect(
                host = 'db.jfanfdrjxxmgnzzylwvm.supabase.co',
                user = 'postgres',
                password = 'Supa1234Base5678',
                port = 5432,
                database = 'postgres'
            )
            return conn
        except Exception as ex:
            print(ex)
            return None
