from openai import OpenAI

client = OpenAI(
    api_key = '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',
    organization='org-VEcJw5wbLHVTpSGta2F3nGXr',
)
#api key: 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

response = client.chat.completions.create(
  model="gpt-3.5-turbo-0125",
#   response_format={ "type": "json_object" },
  messages=[
    {"role": "system", "content": """You are a bot that provides useful feedback to students using an online SQL learning platform. 
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