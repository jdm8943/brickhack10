# Run Instructions
To run the project, run
> run.bat

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#  Installation

'''
npm install reactfire
npm install react-bootstrap
python -m pip install -r requirements.txt
```
Also create a openaikeys.txt inside of python-api/ containing your login credentials.

# Firestore Data Model

## ========= User ============
    uid: string
    type: string
    email: string
    ELO: number
    classCodes: Course[] (reference's)
    questionTags: string[]
    [...classId: string = rank: number]

## ======== Questions =========
    subject: string
    difficulty: string : easy, intermediate, challenging
    questionText: string
    answer: string
    format: string

## ========= Courses ===========
    instructor: uid reference of User
    name: string
    students: [] of uid reference's
    difficultyTags: string[]
    subject: string
    description: string
