
from funciones import AuxiliarFunctions 
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def login(user,password):
    # Ingreso a login
    AuxiliarFunctions.driver.get("http://localhost:3000/login")
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Usuario.
    cpoUsuario = AuxiliarFunctions.driver.find_element(By.ID, "username")
    cpoUsuario.clear()
    cpoUsuario.send_keys(user)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo contraseña.
    cpoContraseña = AuxiliarFunctions.driver.find_element(By.ID,"password")
    cpoContraseña.clear()
    cpoContraseña.send_keys(password)
    AuxiliarFunctions.waitFiveSeconds()

    # Presiono Botón Ingresar
    btnIngresar = AuxiliarFunctions.driver.find_element(By.CLASS_NAME,"form__submit-button")
    btnIngresar.click()
    AuxiliarFunctions.waitFiveSeconds()

