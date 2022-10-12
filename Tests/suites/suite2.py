
from funciones import AuxiliarFunctions 
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def Register(name,surname,mail,username,password,type):
    # Ingreso a login
    AuxiliarFunctions.driver.get("http://localhost:3000/register")
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Nombre.
    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.clear()
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Apellido.
    cpoSurname = AuxiliarFunctions.driver.find_element(By.ID, "surname")
    cpoSurname.clear()
    cpoSurname.send_keys(surname)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Mail.
    cpoMail = AuxiliarFunctions.driver.find_element(By.ID, "mail")
    cpoMail.clear()
    cpoMail.send_keys(mail)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Usuario.
    cpoSurname = AuxiliarFunctions.driver.find_element(By.ID, "username")
    cpoSurname.clear()
    cpoSurname.send_keys(username)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo contraseña.
    cpoContraseña = AuxiliarFunctions.driver.find_element(By.ID,"password")
    cpoContraseña.clear()
    cpoContraseña.send_keys(password)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Confirmar contraseña.
    cpoContraseña = AuxiliarFunctions.driver.find_element(By.ID,"confirm_pwd")
    cpoContraseña.clear()
    cpoContraseña.send_keys(password)
    AuxiliarFunctions.waitFiveSeconds()

    # Limpio y tipeo campo Confirmar Tipo.
    cpoTipo = AuxiliarFunctions.driver.find_element(By.ID,"roles")
    selected = Select(cpoTipo)
    selected.select_by_value(type)
    AuxiliarFunctions.waitFiveSeconds()



    # Presiono Botón Sign Up
    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/section/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()
