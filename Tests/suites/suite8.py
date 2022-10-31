from funciones import AuxiliarFunctions 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def registerPoint(name,cel,details,street,number,lat,long):
    btnGoToPoint = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[2]/a")
    btnGoToPoint.click()
    AuxiliarFunctions.waitFiveSeconds()
    btnNewPoint = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > header > div > nav > button:nth-child(1) > svg > path")
    btnNewPoint.click()
    AuxiliarFunctions.waitFiveSeconds()
    
    cpoName = AuxiliarFunctions.driver.find_element(By.ID,"id")
    cpoName.clear()
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()


    cpoCel = AuxiliarFunctions.driver.find_element(By.ID,"cel")
    cpoCel.clear()
    cpoCel.send_keys(cel)
    AuxiliarFunctions.waitFiveSeconds()

    cpoDetails = AuxiliarFunctions.driver.find_element(By.ID,"details")
    cpoDetails.clear()
    cpoDetails.send_keys(details)
    AuxiliarFunctions.waitFiveSeconds()

    cpoStreet = AuxiliarFunctions.driver.find_element(By.ID,"street")
    cpoStreet.clear()
    cpoStreet.send_keys(street)
    AuxiliarFunctions.waitFiveSeconds()

    cpoNumber = AuxiliarFunctions.driver.find_element(By.ID,"text")
    cpoNumber.clear()
    cpoNumber.send_keys(number)
    AuxiliarFunctions.waitFiveSeconds()
    print("campo numero")

    btnCoords = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/button[1]")
    btnCoords.click()

    btnAcceptCoords = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/div[2]/div/button")
    btnAcceptCoords.click()
    # cpoLat.click()
    # cpoLat.clear()
    # cpoLat.send_keys(lat)
    # AuxiliarFunctions.waitFiveSeconds()
    

    # cpoLong = AuxiliarFunctions.driver.find_element(By.ID,"lng")
    # cpoLong.click()
    # cpoLong.clear()
    # cpoLong.send_keys(long)
    # AuxiliarFunctions.waitFiveSeconds()

def modifyPoint():
    btnNewPoint = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[2]/a")
    btnNewPoint.click()
    AuxiliarFunctions.waitFiveSeconds()
 
