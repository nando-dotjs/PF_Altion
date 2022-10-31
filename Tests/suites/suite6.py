from funciones import AuxiliarFunctions 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

def registerUser(name,surname,mail,username,pasword,rol):
    BtnGoToUsers = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[2]/a") 
    BtnGoToUsers.click()
    AuxiliarFunctions.waitFiveSeconds() 
    BtnGoToNewUsers = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > header > div > nav > button:nth-child(1) > svg > path")
    BtnGoToNewUsers.click()
    AuxiliarFunctions.waitFiveSeconds()

    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.clear()
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()

    cpoSurname = AuxiliarFunctions.driver.find_element(By.ID, "surname")
    cpoSurname.clear()
    cpoSurname.send_keys(surname)
    AuxiliarFunctions.waitFiveSeconds()

    cpoMail = AuxiliarFunctions.driver.find_element(By.ID, "mail")
    cpoMail.clear()
    cpoMail.send_keys(mail)
    AuxiliarFunctions.waitFiveSeconds()

    cpoUserName = AuxiliarFunctions.driver.find_element(By.ID, "username")
    cpoUserName.clear()
    cpoUserName.send_keys(username)
    AuxiliarFunctions.waitFiveSeconds()

    cpoPassword = AuxiliarFunctions.driver.find_element(By.ID, "password")
    cpoPassword.clear()
    cpoPassword.send_keys(pasword)
    AuxiliarFunctions.waitFiveSeconds()

    cpoRepeatPassword = AuxiliarFunctions.driver.find_element(By.ID, "confirm_pwd")
    cpoRepeatPassword.clear()
    cpoRepeatPassword.send_keys(pasword)
    AuxiliarFunctions.waitFiveSeconds()

    cpoTipo = AuxiliarFunctions.driver.find_element(By.ID,"role")
    selected = Select(cpoTipo)
    selected.select_by_value(rol)
    AuxiliarFunctions.waitFiveSeconds()

    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()
    

def modifyUser(name,surname,mail,username,pasword,rol):
    BtnGoToUsers = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/section/p[2]/a") 
    BtnGoToUsers.click()
    AuxiliarFunctions.waitFiveSeconds() 
    BtnGoToModifyUsers = AuxiliarFunctions.driver.find_element(By.CSS_SELECTOR,"#root > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > button > svg > path")
    BtnGoToModifyUsers.click()
    AuxiliarFunctions.waitFiveSeconds()

    cpoName = AuxiliarFunctions.driver.find_element(By.ID, "name")
    cpoName.send_keys(Keys.CONTROL, "a")
    cpoName.send_keys(Keys.DELETE)
    cpoName.send_keys(name)
    AuxiliarFunctions.waitFiveSeconds()

    cpoSurname = AuxiliarFunctions.driver.find_element(By.ID, "surname")
    cpoSurname.send_keys(Keys.CONTROL, "a")
    cpoSurname.send_keys(Keys.DELETE)
    cpoSurname.send_keys(surname)
    AuxiliarFunctions.waitFiveSeconds()

    cpoMail = AuxiliarFunctions.driver.find_element(By.ID, "mail")
    cpoMail.send_keys(Keys.CONTROL, "a")
    cpoMail.send_keys(Keys.DELETE)
    cpoMail.send_keys(mail)
    AuxiliarFunctions.waitFiveSeconds()

    cpoUserName = AuxiliarFunctions.driver.find_element(By.ID, "username")
    cpoUserName.send_keys(Keys.CONTROL, "a")
    cpoUserName.send_keys(Keys.DELETE)
    cpoUserName.send_keys(username)
    AuxiliarFunctions.waitFiveSeconds()

    cpoPassword = AuxiliarFunctions.driver.find_element(By.ID, "password")
    cpoPassword.send_keys(Keys.CONTROL, "a")
    cpoPassword.send_keys(Keys.DELETE)
    cpoPassword.send_keys(pasword)
    AuxiliarFunctions.waitFiveSeconds()

    cpoRepeatPassword = AuxiliarFunctions.driver.find_element(By.ID, "confirm_pwd")
    cpoRepeatPassword.send_keys(Keys.CONTROL, "a")
    cpoRepeatPassword.send_keys(Keys.DELETE)
    cpoRepeatPassword.send_keys(pasword)
    AuxiliarFunctions.waitFiveSeconds()

    cpoTipo = AuxiliarFunctions.driver.find_element(By.ID,"role")
    selected = Select(cpoTipo)
    selected.select_by_value(rol)
    AuxiliarFunctions.waitFiveSeconds()

    btnConfirmar = AuxiliarFunctions.driver.find_element(By.XPATH,"/html/body/div/div/form/button")
    btnConfirmar.click()
    AuxiliarFunctions.waitFiveSeconds()