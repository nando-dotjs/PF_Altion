from funciones import AuxiliarFunctions 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select


def navegationLoginToRegister():
    AuxiliarFunctions.driver.get("http://localhost:3000/")
    AuxiliarFunctions.waitFiveSeconds()

    btnRegister = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/section/main/a")
    btnRegister.click()
    AuxiliarFunctions.waitFiveSeconds()

def navegationRegisterToLogin():
    AuxiliarFunctions.driver.get("http://localhost:3000/")
    AuxiliarFunctions.waitFiveSeconds()

    btnRegister = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/section/main/a")
    btnRegister.click()
    AuxiliarFunctions.waitFiveSeconds()

    btnLogin = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/section/main/p[2]/span/a")
    btnLogin.click()
    AuxiliarFunctions.waitFiveSeconds()