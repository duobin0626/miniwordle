from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
# StaticFiles : 정적파일
app = FastAPI()

# 오늘의 정답
answer='TRAIN'

# 정답을 확인하는 코드경로 추가
@app.get('/answer')
def get_answer():
    return {'answer':answer}

# "/" : 경로 , 정적파일관련(directory:파일명,html=True를 추가해주면 깔끔해진다.)
# 파일명인 static 이라는 폴더를 생성하여 정적파일인 html,css,js 폴더 및 파일을 넣어주면
# 해당 경로로 접근하게 되면 directory(static)에 있는 index.html을 보여준다(css,js도 같이).
app.mount("/", StaticFiles(directory="static",html=True), name="static")