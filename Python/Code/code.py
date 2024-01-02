# String Slicing, Indexing and Methods
ch = "ENGINEERING" 
a = 'hello world'
print(ch[0])
print(ch[-1])
print(ch[4])
print(ch[1:12:2])
print(ch[2:])
print(ch[:3])
print(ch[3:6])
print(ch.lower())
print(a.split())
print(a.split('o'))

# String Concatenation
name = 'sam'
ll = name[1:]
print('p' + ll)
print(name + '5')

# Dictionaries
my_dict = {'key1':'value1','key2':'values2'}
print(my_dict['key1'])
d = {'k1':123,'k2':[0,1,2],'k3':{'inside':100}}
print(d['k2'])
print(d['k2'][2])
print(d['k3'])
print(d['k3']['inside'])
d['k4'] = 400 # adding a new element to the dictionary
print(d) 
d1 = {'k1':['a','b','c']}
print(d1['k1'])
print(d1['k1'][2])

# Tuples
t = (1,2,3)
t1 = ('one',2,3)
print(t[0])
print(t.count(1))
print(t.index(2))

# Sets
myset = set()
myset.add(1)
myset.add(2)
myset.add(2)
print(myset)

# Booleans
print(type(True))
print(type(False))
print(1>2)
print(2==2)

# Comparison Operators
print(2==2)
print(2>1)
print(2<1)
print(1<2>3)

# Control statements 
age = 17
if age>=20:
    print('You are a major')
elif age==19:
    print('You are about to be a major')    
else:
    print('you are fucking kiddo')    

# Looping Statements
# for-loop
mylist = [69,2,3]
for item in mylist:
    print(item)
     