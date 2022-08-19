import pyautogui
import time
import random

def put_basic_details():
	time.sleep(0.2)
	pyautogui.write('King Khaled Intl. Airport RUH, Riyadh') 
	'King Abdulaziz International Airport - JED , Jeddah SA'
	'Jeddah National Hospital, Jeddah Saudi Arabia'
	pyautogui.press(['tab']) 
	time.sleep(0.2)
	pyautogui.write('riyadh hotel') 
	time.sleep(0.5)
	pyautogui.press(['down','down','down','enter']) 
	time.sleep(0.5)
	pyautogui.press(['space','down','enter']) 
	pyautogui.press(['tab']*3) 
	pyautogui.press(['down','tab']*3) 

def put_travel_details():
	rseed=random.randrange(10000,10000000)
	time.sleep(0.2)
	pyautogui.write(f'testuser{rseed}@gmail.com') 
	pyautogui.press(['tab']) 
	pyautogui.write(f'Username {rseed}')
	pyautogui.press(['tab']) 
	pyautogui.write(f'{rseed}')
	pyautogui.press(['tab']) 
	pyautogui.press(['tab'])
	pyautogui.write(f'ABCD-1234')
	pyautogui.press(['tab'])
	pyautogui.press(['tab']) 
	pyautogui.write(f'Comment from User {rseed}')
	pyautogui.press(['tab','space']) 

if __name__ == '__main__':
	switch_chrome_window = pyautogui.hotkey('alt','tab')
	put_basic_details()
	# put_travel_details()
	