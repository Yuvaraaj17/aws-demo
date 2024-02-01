

from fastapi import FastAPI,UploadFile
import boto3
from fastapi.middleware.cors import CORSMiddleware
import key_config


origins = [
    
    "http://localhost:3000",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


s3=boto3.client('s3',aws_access_key_id=key_config.Access_key_ID,aws_secret_access_key=key_config.Secret_access_key,region_name='ap-south-1')
dynamodb=boto3.resource('dynamodb',aws_access_key_id=key_config.Access_key_ID,aws_secret_access_key=key_config.Secret_access_key,region_name='ap-south-1')

@app.post("/s3/upload")
def upload(file: UploadFile):
    s3.upload_fileobj(file.file,'docurepo',file.filename)
    print('true')

@app.post("/s3/download")
def download(name: dict):
    filename=name['filename']
    print(filename)
    s3.download_file('docurepo',filename,'C:/Users/yuvaraaj.s/Downloads/'+filename)
    
    return True

@app.post("/dynamodb/add")
def add_record(record: dict):
    table=dynamodb.Table('User_Details')
    table.put_item(Item=record)


@app.get("/dynamodb/get")
def get_items():
    table=dynamodb.Table('User_Details')
    resp=table.scan()
    return resp['Items']


# @app.post("/dynamodb/get") #get a item by the primary key
# def getitems(key : dict):
#     table=dynamodb.Table('User_Details')
#     response=table.get_item(Key=key)
#     return response["Item"]
    

