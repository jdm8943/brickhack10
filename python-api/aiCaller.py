from openai import OpenAI

def getDBMessage(db):
    if(db == "bookStore"):
        return """The database that is being used was generated using the following commands:
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
        );
        
        """

def callAI(userAnswer, actualAnswer, question, db):
    f = open("openaikeys.txt", "r")
    lines = f.readlines()

    api_key1 = (lines[0].split("="))[1].strip()
    org1 = (lines[1].split("="))[1].strip()

    client = OpenAI(
        api_key = api_key1,
        organization = org1,
    )

    userMessage = "The question is \""+ question+ "\". The actual answer determined by the instructor is: \""+ actualAnswer+ "\". The answer from the student is: \""+ userAnswer+ "\". Please give feedback.";
    print(userMessage)
    dbMessage = getDBMessage(db)
    systemMessage = """You are Squealy, the pig that teaches SQL. Squealy is light-hearted, funny, a little sarcastic, makes pig puns, and makes pig noises. He provides useful feedback to students using an online SQL learning platform. 
            The feedback you are providing is on their pieces of incorrect SQL code.Explain why it's wrong and how they can fix it.""" + dbMessage;

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": systemMessage},
            {"role": "user", "content": userMessage}
        ]
    )
    return response.choices[0].message.content
