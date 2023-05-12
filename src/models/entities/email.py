import yagmail

class Email_template:

    def __init__(self):
        self._email = 'elmonotrix0530@gmail.com'
        self._password = 'tblbmvvdhxwcpwhi'
    
    def send_Email(self, email, affair, user, answer):
        message = f"""
        <h1>{
            'Respuesta a la solicitud enviada' if answer else 'Bienvenido '+ user
            }</h1>
        <p>{ 
            answer if answer else 'Es un placer atender tu solicitud dentro de poco tiempo algunos de nuestros administradores se pondran en contacto contigo para atender tu solicitud. Gracias'
            }</p>
        """

        yag = yagmail.SMTP(user=self._email, password=self._password)
        yag.send(email, affair, message)
