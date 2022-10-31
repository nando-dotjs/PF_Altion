from funciones import AuxiliarFunctions 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def registerChofer(name,surname):
    BtnGoToChoferes = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[3]/a") 
    BtnGoToChoferes.click()
    AuxiliarFunctions.waitFiveSeconds()
    BtnGoToNewChoferes = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > header > div > nav > button:nth-child(1) > svg") 
    BtnGoToNewChoferes.click()
    AuxiliarFunctions.waitFiveSeconds()
    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.clear()
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()
    cpoSurname = AuxiliarFunctions.driver.find_element(By.ID, "surname")
    cpoSurname.clear()
    cpoSurname.send_keys(surname)
    AuxiliarFunctions.waitFiveSeconds()
    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()
    

def modifyChofer(name,surname):
    BtnGoToChoferes = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[3]/a") 
    BtnGoToChoferes.click()
    AuxiliarFunctions.waitFiveSeconds()
    BtnGotoModifyChoferes  = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > div > table > tbody > tr > td:nth-child(3) > button > svg") 
    BtnGotoModifyChoferes.click()
    AuxiliarFunctions.waitFiveSeconds()
    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.send_keys(Keys.CONTROL, "a")
    cpoName.send_keys(Keys.DELETE)
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()
    cpoDetail = AuxiliarFunctions.driver.find_element(By.ID, "surname")
    cpoDetail.send_keys(Keys.CONTROL, "a")
    cpoDetail.send_keys(Keys.DELETE)
    cpoDetail.send_keys(surname)
    AuxiliarFunctions.waitFiveSeconds()
    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/main/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()