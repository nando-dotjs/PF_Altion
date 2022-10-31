from funciones import AuxiliarFunctions 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def registerZone(name,detail):
    BtnGoToZones = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[4]/a") 
    BtnGoToZones.click()
    AuxiliarFunctions.waitFiveSeconds()
    BtnGoToNewZones = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > header > div > nav > button:nth-child(1) > svg > path")
    BtnGoToNewZones.click()
    AuxiliarFunctions.waitFiveSeconds()

    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.clear()
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()
    cpoDetail = AuxiliarFunctions.driver.find_element(By.ID, "details")
    cpoDetail.clear()
    cpoDetail.send_keys(detail)
    AuxiliarFunctions.waitFiveSeconds()
    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()
    

def modifyZone(name,detail):
    BtnGoToZones = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[4]/a") 
    BtnGoToZones.click()
    AuxiliarFunctions.waitFiveSeconds()
    BtnGoToModifyZones = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > div > table > tbody > tr > td:nth-child(3) > button > svg")
    BtnGoToModifyZones.click()
    AuxiliarFunctions.waitFiveSeconds()
    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.send_keys(Keys.CONTROL, "a")
    cpoName.send_keys(Keys.DELETE)
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()
    cpoDetail = AuxiliarFunctions.driver.find_element(By.ID, "details")
    cpoDetail.send_keys(Keys.CONTROL, "a")
    cpoDetail.send_keys(Keys.DELETE)
    cpoDetail.send_keys(detail)
    AuxiliarFunctions.waitFiveSeconds()
    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/main/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()