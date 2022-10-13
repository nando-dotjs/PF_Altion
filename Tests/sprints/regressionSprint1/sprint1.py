from suites import suite1
from suites import suite2
from suites import suite3

def runSuite1():
    
    # ingreso con datos válidos
    suite1.login("Matias","1234")
    print("Comienzo ejecución casos de prueba de la Suite 1 - regresión Sprint 1")
    print('Caso de prueba 1 Ejecutado')

    # ingreso con datos faltantes
    suite1.login("Matias","")
    print('Caso de prueba 2 Ejecutado')

    # ingreso con datos válidos en usuario inactivo
    suite1.login("Dario","Dario1104@")
    print('Caso de prueba 3 Ejecutado')

def runSuite2():
    print("Comienzo ejecución casos de prueba de la Suite 2 - regresión Sprint 1")
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
    suite3.navegationLoginToRegister()
    print("Comienzo ejecución casos de prueba de la Suite 3 - regresión Sprint 1")
    print('Caso de prueba 1 Ejecutado')

    # redirección de Register a Login
    suite3.navegationRegisterToLogin()
    print('Caso de prueba 2 Ejecutado')