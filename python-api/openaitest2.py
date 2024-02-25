from openai import OpenAI
import aiCaller


print(aiCaller.callAI("SELECT * from Books where PublicationYear< 2000", "SELECT * from Books where PublicationYear> 2000", "Print out all the books published after 2000 year", "bookStore"))