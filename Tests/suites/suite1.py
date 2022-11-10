
from funciones import AuxiliarFunctions 
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def login(mail,password):
    # Ingreso a login
    AuxiliarFunctions.driver.get("http://192.168.1.100:3000/")
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Usuario.
    cpoMail = AuxiliarFunctions.driver.find_element(By.ID, "mail")
    cpoMail.clear()
    cpoMail.send_keys(mail)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo contraseña.
    cpoContraseña = AuxiliarFunctions.driver.find_element(By.ID,"password")
    cpoContraseña.clear()
    cpoContraseña.send_keys(password)
    AuxiliarFunctions.waitFiveSeconds()

    # Presiono Botón Ingresar
    btnIngresar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/div/form/div/form/div[5]/button")
    btnIngresar.click()
    AuxiliarFunctions.waitFiveSeconds()

