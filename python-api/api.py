import traceback

import logging
from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel
from aiCaller import callAI
import os

class command(BaseModel):
    cmd: str
    correct_cmd: str
    description: str
    db: str

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

app = FastAPI()

@app.post("/check_cmd")
async def root(request: command ):
    con = sqlite3.connect(os.path.join("dbs", request.db + ".db"))
    cur = con.cursor()
    
    try:
        cur.execute(request.cmd)
        return {"message": "You did great"}
    
    except Exception as e:
        logger.info("SQL command failed! - " + request.cmd)
    
    returnMessage = callAI(request.cmd, request.correct_cmd, request.description, request.db)
    
    return {"message": returnMessage}
    
    

