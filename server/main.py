

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


@app.post("/s3/upload")
def upload(file: UploadFile):
    s3.upload_fileobj(file.file,'docurepo',file.filename)
    print('true')
    



