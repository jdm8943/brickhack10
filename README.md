# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#  Installation

npm install reactfire
npm install react-bootstrap
- uses reactfire framework

# Firebase Data Model

## ========= User ============
    uid: string
    type: string
    email: string
    ELO: number
    classCodes: string[]
    questionTags: string[]
    [...classId: string = rank: number]

## ======== Questions =========
    subjects: collections (sql, relational algebra, python...)
        Question: Document
            difficulty: string
            questionText: string
            answer: string
            format: string

## ========= Courses ===========
    instructor: uid of User
    students: [] of uid's
    courseCode: string
    difficultyTags: string[]
    subject: string