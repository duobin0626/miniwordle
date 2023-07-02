""" from fastapi import FastAPI
app = FastAPI();

# /hello 라는 경로에 들어오면 message가 뜨게 하는 api를 생성
@app.get("/hello")
def sayHello():
    return {"message": "안녕하세요 슈퍼코딩!"}

# 기본 루트
@app.get("/")
def root():
    return {"message": "환영합니다!"} """
################################################################
""" from fastapi import FastAPI
app = FastAPI();

items = ['맥북','애플워치','아이폰','에어팟']

@app.get('/items')
def read_items():
    return items

# 특정 아이템에 접근하는 방식.
@app.get('/items/{id}')
def read_id_item(id):
    # return items[id]  # 문자열을 선택할 수 없기 때문에 int()로 감싸주어 숫자로 변환시켜준다.
    return items[int(id)]
 """
#################################################################
""" from fastapi import FastAPI
app = FastAPI();

items = ['맥북','애플워치','아이폰','에어팟']

@app.get('/items/{id}')
def read_id_item(id):
    return items[int(id)]

# Query 방식
# def read_items(skip:int=0,limit:int=10): 을 해석 해보면
# skip이라는 Query=int, 숫자 값이고 (초기에는 0이다.)=(아무것도 들어오지 않으면 0이다.)
# limit 은 최대 몇개까지 뽑아낼 거냐
# skip이라는 변수는 int고 0이라는 초기값을 갖는다.
# limit라는 변수도 int고(즉 정수(=숫자)고 아무것도 들어오지 않으면 10개까지 뽑아낸다.)

# return items[skip:skip+limit]
# /items?skip=1&limit=2 ← 주소창에 이와 같이 요청 하게되면 
# 애플워치, 아이폰 이 나온다.
# 1개를 skip 하고 2개를 뽑아주세요 라는 요청
@app.get('/items')
def read_items(skip:int=0,limit:int=10):
    return items[skip:skip+limit] """
##################################################################################
# RequestBody
# RequestBody 는 url이 아닌 body라는 다른 정보에 담겨서 간다.
# body에 담겨 가려면 자바스크립트로 어떤 통제를 해줘야 된다.
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI();

class Item(BaseModel):
    id:int
    content:str

items = ['맥북','애플워치','아이폰','에어팟']

# RequestBody 의 경우 Path , Query와 다르게 get요청이 아닌 post로 요청을 해야 한다.
# get ? 어떤 값을 조회할 때 사용하는 요청 
# post ? 어떤 값에 대해서 서버에 업데이트 or 서버에 새로 등록해주세요 요청
# 그렇게 때문에 RequestBody 즉 post의 경우는 어떤 값(정보)가 담아져서 들어올 것 이다.
@app.post('/items')
def post_item(item:Item): # fastAPI에서는 (item)정보가 담아져서 들어올 예정인 곳 의 포맷을 미리 정해줘야 함
    # .append = python에서 사용하는 추가할 때 쓰는 문법
    items.append(item.content)
    return '성공했습니다!'
