import sqlite3

con = sqlite3.connect("tutorial.db")
cur = con.cursor()


res = cur.execute("SELECT title FROM movie")
con.commit()

print("message", res.fetchall())
