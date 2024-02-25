import logging
from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel
from aiCaller import callAI
import os
import shutil

class command(BaseModel):
    cmd: str
    correct_cmd: str
    description: str
    db: str

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/check_cmd")
async def root(request: command ):
    shutil.copyfile(os.path.join("dbs", request.db + ".db"), os.path.join("dbs", request.db + "-local.db"))
    
    con = sqlite3.connect(os.path.join("dbs", request.db + "-local.db"))
    cur = con.cursor()
    
    try:
        userQuery = cur.execute(request.cmd).fetchall()
        correctQuery = cur.execute(request.correct_cmd).fetchall()
        logger.info(userQuery)
        logger.info(correctQuery)
        
        # very basic check to see if the output of the two commands is the same
        # should expand to actually check each value, not just assume they come out in the same order
        if userQuery == correctQuery:
            con.close()
            os.remove(os.path.join("dbs", request.db + "-local.db"))
            return {"message": None}
    
    except Exception as e:
        logger.info("SQL command failed! - " + request.cmd)
    
    returnMessage = callAI(request.cmd, request.correct_cmd, request.description, request.db)
    
    con.close()
    os.remove(os.path.join("dbs", request.db + "-local.db"))
    
    return {"message": returnMessage}
    
    

