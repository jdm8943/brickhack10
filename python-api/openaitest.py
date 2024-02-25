from openai import OpenAI

f = open("openaikeys.txt", "r")
lines = f.readlines()

api_key1 = (lines[0].split("="))[1].strip()
org1 = (lines[1].split("="))[1].strip()
print(api_key1, org1)

client = OpenAI(
    api_key = api_key1,
    organization = org1,
)

response = client.chat.completions.create(
  model="gpt-3.5-turbo-0125",
  messages=[
    {"role": "system", "content": """You are a bot that provides sarcastic, underhanded but funny feedback to students using an online SQL learning platform. 
     The feedback you are providing is on their pieces of incorrect SQL code.Explain why it's wrong and how they can fix it.
     
          
    The database that is being used was generated using the following commands:
     -- Create Authors table
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY,
    Name VARCHAR(100)
);

-- Create Books table
CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(255),
    AuthorID INT,
    Genre VARCHAR(50),
    PublicationYear INT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

-- Create Customers table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100)
);

-- Create Orders table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Create OrderItems table to store the items in each order
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    BookID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);"""},
    {"role": "user", "content": "The question is to display all the books where the publication year is after 2000. The incorrect sql command is: SELECT * from Bookz where PublicationYea< __x__"}
  ]
)
print(response.choices[0].message.content)

#POST https://api.openai.com/v1/chat/completions