import logging
from fastapi import FastAPI
import sqlite3

from pydantic import BaseModel


class command(BaseModel):
    cmd: str
    correct_cmd: str | None = None

con = sqlite3.connect("dbs/tutorial.db")
cur = con.cursor()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

app = FastAPI()

@app.post("/check_cmd")
async def root(request: command ):    
    res = cur.execute(request.cmd)
    
    logger.info(request.cmd)
    
    return {"message": res.fetchall()}

