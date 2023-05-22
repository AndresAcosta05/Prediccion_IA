from config import Connection
from flask import Response
from fpdf import FPDF
from referencias import *
import datetime
import os

class PDF(FPDF):

    def header(self):
        fecha = datetime.date.today()
        self.image(os.getcwd()+'/src/static/img/logo.png', x = 10, y = 10, w = 30, h = 30)

        self.set_font('Arial', '', 15)

        tcol_set(self, 'blue')
        tfont_size(self,45)
        tfont(self,'B')
        self.cell(w = 0, h = 20, txt = 'Reporte', border = 0, ln=1,
                align = 'C', fill = 0)

        tfont_size(self,10)
        tcol_set(self, 'black')
        tfont(self,'I')
        self.cell(w = 0, h = 10, txt = f'Generado el {fecha}', border = 0, ln=2,
                align = 'C', fill = 0)

        self.ln(5)
    
    
    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-20)

        # Arial italic 8
        self.set_font('Arial', 'I', 12)

        # Page number
        self.cell(w = 0, h = 10, txt =  'Pagina ' + str(self.page_no()) + '/{nb}',
                 border = 0,
                align = 'C', fill = 0)


    def generar():
        conn = None
        cursor = None
        try:
            conn = Connection.getConnection()
            cursor = conn.cursor()
            
            cursor.execute("SELECT id, document, name, user_l FROM users ORDER BY id ASC")
            result = cursor.fetchall()

            cursor.execute("SELECT id, document, names, us_email FROM user_requests ORDER BY id ASC")
            result2 = cursor.fetchall()

            pdf = PDF(orientation = 'P', unit = 'mm', format='A4') 
            pdf.alias_nb_pages()
            pdf.add_page()

            # TEXTO
            pdf.set_font('Arial', '', 15) 

            # 1er encabezado ----

            bcol_set(pdf, 'green')
            tfont_size(pdf,15)
            tfont(pdf,'B')
            pdf.multi_cell(w = 0, h = 15, txt = 'General', border = 0, align = 'C', fill = 1)
            tfont(pdf,'')

            h_sep = 15
            pdf.ln(3)
            tfont_size(pdf,12)

            # fila 1 --

            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Aplicacion:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black')         
            pdf.cell(w = 45, h = h_sep, txt = 'Predictors', border = 0,
                    align = 'L', fill = 0)

            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Correo de Prueba:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black') 
            pdf.multi_cell(w = 0, h = h_sep, txt = 'elmonotrix@gmail.com', border = 0,
                    align = 'L', fill = 0)


            # fila 2 --
            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Framework:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black')
            pdf.cell(w = 45, h = h_sep, txt = 'Flask', border = 0,
                    align = 'L', fill = 0)

            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Desarrollado en:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black')
            pdf.multi_cell(w = 0, h = h_sep, txt = 'Python', border = 0,
                    align = 'L', fill = 0)

            # fila 3 --
            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Tipo de prediccion:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black')
            pdf.cell(w = 45, h = h_sep, txt = 'Regresion Lineal Multiple', border = 0,
                    align = 'L', fill = 0)

            tcol_set(pdf, 'gray')
            pdf.cell(w = 45, h = h_sep, txt = 'Base de datos:', border = 0, 
                    align = 'R', fill = 0)

            tcol_set(pdf, 'black')
            pdf.multi_cell(w = 0, h = h_sep, txt = 'SupaBase', border = 0,
                    align = 'L', fill = 0)

            pdf.ln(15)            
            # tabla ----

            bcol_set(pdf, 'green')
            tfont_size(pdf,15)
            tfont(pdf,'B')
            pdf.cell(w = 0, h = 15, txt = 'Usuarios', border = 0,ln = 2, align = 'C', fill = 1)
            tfont(pdf,'')

            tfont_size(pdf,13)
            bcol_set(pdf, 'blue')

            pdf.cell(w = 20, h = 10, txt = 'ID', border = 0, align = 'C', fill = 1)
            pdf.cell(w = 40, h = 10, txt = 'Documento', border = 0, align = 'C', fill = 1)
            pdf.cell(w = 70, h = 10, txt = 'Nombres', border = 0, align = 'C', fill = 1)
            pdf.multi_cell(w = 0, h = 10, txt = 'Usuario', border = 0, align = 'C',
                        fill = 1)


            tfont_size(pdf,12)
            dcol_set(pdf, 'blue')
            tcol_set(pdf, 'gray')
            pdf.rect(x= 10, y= 60, w= 190, h= 53)
            c = 0

            for datos in result:
                c+=1
                if(c%2==0):bcol_set(pdf, 'gray2')
                else:bcol_set(pdf, 'white')
                pdf.cell(w = 20, h = 10, txt = str(datos[0]), border = 'TBL', align = 'C', fill = 1)
                pdf.cell(w = 40, h = 10, txt = datos[1], border = 'TB', align = 'C', fill = 1)
                pdf.cell(w = 70, h = 10, txt = datos[2], border = 'TB', align = 'C', fill = 1)
                pdf.multi_cell(w = 0, h = 10, txt = datos[3], border = 'TBR', align = 'C', fill = 1)
        

            pdf.ln(15)
            # tabla 2 ----

            bcol_set(pdf, 'green')
            tfont_size(pdf,15)
            tfont(pdf,'B')
            pdf.cell(w = 0, h = 15, txt = 'Peticiones', border = 0,ln = 2, align = 'C', fill = 1)
            tfont(pdf,'')

            tfont_size(pdf,13)
            bcol_set(pdf, 'blue')

            pdf.cell(w = 20, h = 10, txt = 'ID', border = 0, align = 'C', fill = 1)
            pdf.cell(w = 40, h = 10, txt = 'Documento', border = 0, align = 'C', fill = 1)
            pdf.cell(w = 70, h = 10, txt = 'Nombres', border = 0, align = 'C', fill = 1)
            pdf.multi_cell(w = 0, h = 10, txt = 'Usuario', border = 0, align = 'C',
                        fill = 1)


            tfont_size(pdf,12)
            dcol_set(pdf, 'blue')
            tcol_set(pdf, 'gray')
            pdf.rect(x= 10, y= 60, w= 190, h= 53)
            c = 0

            for datos in result2:
                c+=1
                if(c%2==0):bcol_set(pdf, 'gray2')
                else:bcol_set(pdf, 'white')
                pdf.cell(w = 20, h = 10, txt = str(datos[0]), border = 'TBL', align = 'C', fill = 1)
                pdf.cell(w = 40, h = 10, txt = datos[1], border = 'TB', align = 'C', fill = 1)
                pdf.cell(w = 70, h = 10, txt = datos[2], border = 'TB', align = 'C', fill = 1)
                pdf.multi_cell(w = 0, h = 10, txt = datos[3], border = 'TBR', align = 'C', fill = 1)
            
            
            
            return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition':'attachment;filename=Reporte.pdf'})
        except Exception as e:
            print(e)
 