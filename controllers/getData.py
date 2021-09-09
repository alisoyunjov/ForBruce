f1 = open('ronaldo.txt', 'a')
flag = False
samplelist = ''
query = ''
length = ''
identity = ''
rday = ''
f = open("parameters.txt", "r")
lines = f.readlines()
for line in lines:
    if flag:
        samplelist = samplelist + line
        f1.write(str(line))
    else:
        aline = line.split(': ')
        if aline[0] == 'Query':
            query = aline[1]
            f1.write(str(query))
        elif aline[0] == 'ReceivedDate':
            rday = aline[1]
            f1.write(str(rday))
        elif aline[0] == 'Identity':
            identity = aline[1]
            f1.write(str(identity))
        elif aline[0] == 'LengthOfBlast':
            length = aline[1]
            f1.write(str(length))
        elif aline[0] == 'Samplelist':
            flag = True
            samplelist = aline[1]
            f1.write(str(samplelist))
        
f1.close()