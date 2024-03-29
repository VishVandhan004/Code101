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
# For-loop
mylist = [69,2,3]
for item in mylist:
    print(item)
  # printing only even numbers    
for num in mylist:
    if num%2==0:
        print(num)    
    else:
        print(f'Odd Number: {num}')  
   # printing the list sum 
list_sum = 0
for num in mylist:
    list_sum=list_sum+num
print(list_sum)   
    # for-loop in strings
str = 'Hello'
for c in str:
    print(c)   
    # for-loop in tuples
tup = (1,2,3)
for item in tup:
    print(item)
     # tuple unpacking
mlist = [(1,2),(3,4),(5,6)]
for loud in mlist:
    print(loud)
for (a,b) in mlist:
    print(a)
    print(b)
print(len(mlist))   
    # for-loop in dictionaries
d = {'k1':1,'k2':2,'k3':3}
for bsdk in d:
    print(bsdk)
for key,value in d.items():
    print(key)
    print(value)    
# While-loop
x = 0
while x<5:
    print(f'Value is:{x}')
    x+=1
  # pass keyword
x = [1,2]
for ko in x:
    pass
print('pass hogaya')     
    # continue keyword
str='kurchi'
for l in str:
    if l=='r':
        continue
    print(l)
    # break keyword
for l in str:
    if l=='r':
        break
    print(l)    
# Some important functions in py
    # range()
for num in range(0,10,2):
    print(num)
    # enumerate
word='abcde'
for index,letter in enumerate(word):
    print(index)
    print(letter)
    # zip
a = [1,2]
b = ['a','b']
for i in zip(a,b):
    print(i)
    # shuffle()
from random import shuffle
puka = [2,1,3,5,6,7]
shuffle(puka)
print(puka)
    # randint
from random import randint
int = randint(0,10)
print(int)
# List Comprehensions
l = [num**2 for num in range(0,11)]
print(l)
celcius = [20,35,40]
fahrenheit = [((9/5)*temp+32) for temp in celcius]
print(fahrenheit)
# Functions
def greet(name):
    print("Hello"+" "+name)
greet("Vishnu")
def sum(a,b):
    return a+b
result = sum(2,3)
print(result)       
#tuple unpacking using functions
# normal zindagi
stock = [('AAPL',400),('GOOG',200),('MSFT',300)]
for ticker,item in stock:
    print(ticker)
    print(item)           #tuple unpacking
# mentos zindagi
work = [('Abby',400),('Gary',200),('Marnus',300)]
def emp_c(work):
    current_max=0
    employee_m=''
    for employee,hours in work:
        if hours > current_max:
             current_max=hours
             employee_m=employee
        else:
            pass  
    return (employee_m,current_max)
print(emp_c(work)) # it'll return the person with more work hours
# how to use shuffle function???
exp = [1,2,3,4]
from random import shuffle
def slist(list):
    shuffle(list)
    return list
result=slist(exp)
print(result)
# 3 CUP MONTE
# mlist = ['', 'O', '']
# shuffle(mlist)  # shuffle the list in-place
# def player_guess():
#     user_guess = ''
#     while user_guess not in ['0', '1', '2']:
#         user_guess = input('Pick a number b/w 0, 1, 2: ')
#     return user_guess
# myindex = player_guess()
# print(myindex)
# def check_guess(mlist, myindex):
#     # Convert myindex to an integer
#     myindex_int = myindex
#     if mlist[myindex_int] == 'O':
#         print('correct')
#     else:
#         print('wrong')
# check_guess(mlist, myindex)  # use the same list variable
# *ARGS AND **KWARGS
def myfunc(*args):
    return sum(args) # type: ignore
def my(**kwargs):
    print(kwargs)
    if 'fruit' in kwargs:
        print("It is {}".format(kwargs['fruit']))
    else:
        print('Nahi Maalum')
my(fruit='apple')          
# Combination of both args and kwargs
def myfun(*args,**kwargs):
    print(args) # it gives a tuple
    print(kwargs) # it gives a dictionary
    print('I have {} {}'.format(args[0],kwargs['fruit']))
myfun(10,20,30,fruit='apple') 
# EXAMPLE  
def exp1(*args):
    even_list = []
    for num in args:
        if num % 2 == 0:
            even_list.append(num)
    return even_list
print(exp1(1,2,3,4,5,6))
def exp2(s):
    result = ""
    for index, letter in enumerate(s):
        if index % 2 == 0:
            result += letter.lower()
        else:
            result += letter.upper()
    return result
print(exp2('India'))
