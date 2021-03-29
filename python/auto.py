import pywinauto , time 
from pywinauto.application import Application
from pywinauto import keyboard
import pyautogui
import requests

import urllib.request



def runMarker():
        sparkle = "C:/Program Files/Sparkle Laser Marking Software v13.0.13/Sparkle.exe"

        app = Application().start(sparkle)
        # print(app.windows())
        # print(app.window(title_re=".Sparkle Laser Marking Software"))


        location =  None

        while location == None:
                location = pyautogui.locateCenterOnScreen('./images/import-file.PNG')
                print(location)

        pyautogui.click(location)
        location = None
        
        while location == None:
                location = pyautogui.locateCenterOnScreen('./images/sample1.PNG')
                print(location)

        pyautogui.doubleClick(location)

        location = None

      

        while location == None:
                location = pyautogui.locateCenterOnScreen('./images/print.PNG')
                print(location)
                
        pyautogui.click(location)
        location = None
        pyautogui.moveTo(100, 200)
        while location == None:
                location = pyautogui.locateCenterOnScreen('./images/print.PNG')
                print("Cant get confirmation")

        location = None
        pyautogui.hotkey('alt' , 'F4')
        


while True:
       print("InLoop")
       time.sleep(0.8)

       response = requests.get("http://172.105.54.193:3001/check-file").json()
       print(response)
       if response['msg'] == 'new':
               req = requests.get("http://172.105.54.193:3001/new-file" , allow_redirects=True)
               open('C:/Users/Administrator/Desktop/Automation/sample1.PNG','wb').write(req.content)
               print('file updated')
               runMarker()



print("Out of Loop")