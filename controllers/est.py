
import sys
def fileCreate():
	f = open("demofile2.txt", "a")
	f.write("Now the file has more content!")
	f.close()
	return f
print('p geldi')


print(fileCreate())
print('bitti')
