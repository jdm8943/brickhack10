#!/bin/bash
cd python-api/
npm run dev & uvicorn api:app --reload
