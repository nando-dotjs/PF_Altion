from suites import suite1
from suites import suite2
from suites import suite3
from suites import suite5
from suites import suite6
from suites import suite7
from suites import suite8
from suites import suite9


def runSuite1():
    
    # ingreso con datos válidos
    suite1.login("Matias","Matt9412@")
    print("Comienzo ejecución casos de prueba de la Suite 1 - regresión Sprint 2")
    print('Caso de prueba 1 Ejecutado')

    # ingreso con datos faltantes
    suite1.login("Matias","")
    print('Caso de prueba 2 Ejecutado')

    # ingreso con datos válidos en usuario inactivo
    suite1.login("Inactivo","Matt9412@")
    print('Caso de prueba 3 Ejecutado')

def runSuite2():
    print("Comienzo ejecución casos de prueba de la Suite 2 - regresión Sprint 2")
    # omitir campos obligatorios
    suite2.Register("Matias","Garcia","matias.garcia1@gmail.com","MatiasPrueba","","Empresa")
    print('Caso de prueba 1 Ejecutado')

    # ingreso con mail erroneo
    suite2.Register("Matias","Garcia","matias.garciagmailcom","Matias1","Matias1104@","Empresa")
    print('Caso de prueba 2 Ejecutado')

    # ingreso con datos válidos.
    suite2.Register("Matias","Garcia","matias.garcia.leenen@gmail.com","MatiasNuevo","Matias1104@","Empresa")
    print('Caso de prueba 3 Ejecutado')

    # chequear que se creo con con estado activo.
    suite1.login("MatiasNuevo","Matias1104@")
    print('Caso de prueba 4 Ejecutado')

    # ingresar mail de usuario ya creado.
    suite2.Register("Matias","Garcia","matias.garcia.leenen@gmail.com","Matiasnuevo2","Matias1104@","Empresa")
    print('Caso de prueba 5 Ejecutado')

    # ingreso nombre usuario ya creado.
    suite2.Register("Matias","Garcia","matias.garciaNuevo@gmail.com","MatiasNuevo","Matias1104@","Empresa")
    print('Caso de prueba 6 Ejecutado')
    
def runSuite3():
    # redirección de Login a Register
    suite3.navegationLogin()
    print("Comienzo ejecución casos de prueba de la Suite 3 - regresión Sprint 2")
    print('Casos de prueba 1 y 2 Ejecutados')

    # Acceder a gestión de puntos con Usuario CEV/Empresa
    suite1.login("Matias_CEV","Matt9412@")
    suite3.navegationPointsCEVEMP()
    suite1.login("Matias_Empresa","Matt9412@")
    suite3.navegationPointsCEVEMP()
    print('Casos de prueba 4 y 9 Ejecutados')

    #Acceder a gestión de Choferes y regresar CP005-10-11-12
    suite1.login("Matias","Matt9412@")
    suite3.navegationChoferes()
    print('Casos de prueba 5,10,11 y 12 Ejecutados')

    #Acceder a gestión de Usuarios y regresar
    suite1.login("Matias","Matt9412@")
    suite3.navegationUsers()
    print('Casos de prueba 6,13,14,15 Ejecutados')

    # Acceder a gestión de Puntos CEV/EMP y regresar
    suite1.login("Matias","Matt9412@")
    suite3.navegationAdminPoints()
    print('Casos de prueba 7,16,17 y 18 Ejecutados')

    #Acceder a gestion de Zonas y Regresar
    suite1.login("Matias","Matt9412@")
    suite3.navegationZones()
    print('Casos de prueba 19,20,21 y 22 Ejecutados')


def runSuite5():
    #Alta de Chofer con datos correctos
    suite1.login("Matias","Matt9412@")
    suite5.registerChofer("Choferrr","Apelli")
    print("Comienzo ejecución casos de prueba de la Suite 5 - regresión Sprint 2")
    print('Caso de prueba 1 Ejecutado')

    #Alta de Chofer con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite5.registerChofer("","Apellido")
    print('Caso de prueba 2 Ejecutado')

    #Modificación de Chofer con datos correctos
    suite1.login("Matias","Matt9412@")
    suite5.modifyChofer("NomSela","ApeSela")
    print('Caso de prueba 3 Ejecutado')

    #Modificación de Chofer con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite5.modifyChofer("Matias","")
    print('Caso de prueba 4 Ejecutado')

def runSuite6():
    # #Alta de Usuario con datos correctos
    suite1.login("Matias","Matt9412@")
    suite6.registerUser("Sergio","Baudine","Sergio@gmail.com","SergioHarringy","Prueba1104@","Empresa")
    print("Comienzo ejecución casos de prueba de la Suite 6 - regresión Sprint 2")
    print('Caso de prueba 1 Ejecutado')
    
    # #Alta de usuario con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite6.registerUser("","Baudine","Sergio@gmail.com","SergioHarringy","Prueba1104@","Empresa")
    print('Caso de prueba 2 Ejecutado')

    # #Alta de usuario con formato mail inválido
    suite1.login("Matias","Matt9412@")
    suite6.registerUser("Sergio","Baudine","Sergiogmail.com","SergioHarringy","Prueba1104@","Empresa")
    print('Caso de prueba 3 Ejecutado')
    
    # #Alta de usuario con mail existente
    suite1.login("Matias","Matt9412@")
    suite6.registerUser("Sergio","Baudine","Sergio@gmail.com","Sergio","Prueba1104@","Empresa")
    print('Caso de prueba 4 Ejecutado')

    #Modificación de usuario con datos correctos
    suite1.login("Matias","Matt9412@")
    suite6.modifyUser("Matias","Leenen","mati@gmail.com","Matias","Matt9412@","Admin")
    print('Caso de prueba 5 Ejecutado')

    # #Modificación de usuario con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite6.modifyUser("Sergio","","Sergio@gmail.com","SergioHarringy","Prueba1104@","Empresa")
    print('Caso de prueba 6 Ejecutado')

    # #Modificación de usuario con formato mail inválido
    suite1.login("Matias","Matt9412@")
    suite6.modifyUser("Sergio","Baudine","Sergiogmail.com","SergioHarringy","Prueba1104@","Empresa")
    print('Caso de prueba 7 Ejecutado')

    #Modificación de usuario con nombre usuario existente
    suite1.login("Matias","Matt9412@")
    suite6.modifyUser("Sergio","Baudine","Sergio@gmail.com","SergioHarringy","Prueba1104@","Empresa")
    print('Caso de prueba 8 Ejecutado')


def runSuite8():
    #Alta de punto con datos correctos
    suite1.login("Matias_CEV","Matt9412@")
    suite8.registerPoint("puntito","099443745","detalledepuntito","tomas gomez ","122","100","100")

def runSuite9():
    #Alta de zona con datos correctos
    suite1.login("Matias","Matt9412@")
    suite9.registerZone("ZonaNuev","DetalleNuev")
    print("Comienzo ejecución casos de prueba de la Suite 9 - regresión Sprint 2")
    print('Caso de prueba 1 Ejecutado')

    #Alta de zona con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite9.registerZone("","Detalle")
    print('Caso de prueba 2 Ejecutado')

    #Alta de zona con nombre repetido
    suite1.login("Matias","Matt9412@")
    suite9.registerZone("ZonaNuev","DetalleNuev")
    print('Caso de prueba 3 Ejecutado')

    #Modificación de zona con datos correctos
    suite1.login("Matias","Matt9412@")
    suite9.modifyZone("ZonaModif","DetalleModif")
    print('Caso de prueba 4 Ejecutado')

    #Modificación de zona con datos incompletos
    suite1.login("Matias","Matt9412@")
    suite9.modifyZone("","Detalle")
    print('Caso de prueba 5 Ejecutado')

    #Modificacíon de zona a un nombre de zona ya existente
    suite1.login("Matias","Matt9412@")
    suite9.modifyZone("ZonaNuev","Detalle")
    print('Caso de prueba 6 Ejecutado')