from fastapi import FastAPI
import sqlite3

con = sqlite3.connect("tutorial.db")
cur = con.cursor()

app = FastAPI()

@app.get("/")
async def root():
    res = cur.execute("SELECT title FROM movie")
    
    return {"message": res.fetchall()}

