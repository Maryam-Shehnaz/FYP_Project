# 🩺 Smart AI Solution for Automated Medical Prescription Digitization

An AI-powered healthcare application designed to digitize handwritten medical prescriptions, provide medication information, assist users through an AI chatbot, and securely maintain prescription history.

## 📖 Project Overview

Handwritten medical prescriptions are often difficult to understand due to illegible handwriting, which can lead to confusion regarding medications, dosages, and usage instructions. Paper prescriptions can also be lost or damaged, making it difficult for patients to maintain and access their medical history.

This project provides an AI-powered solution that allows users to scan handwritten medical prescriptions and convert them into clear, structured digital records.

The application also provides medication information, supports medicine identification through images, offers pediatric dosage guidance based on the child's weight, and securely stores prescription history.

## ✨ Key Features

- **Prescription Digitization**  
  Scan handwritten medical prescriptions and convert them into digital text using AI-powered OCR.

- **Medication Information**  
  Provides information about prescribed medicines, including dosage instructions, uses, side effects, and guidelines.

- **AI Medical Chatbot**  
  Allows users to ask questions related to medicines and receive AI-generated responses to their medication-related queries.

- **Medicine Image Recognition**  
  Users can upload an image of a medicine or tablet to obtain information about the medicine and its purpose.

- **Alternative Medicine Information**  
  Provides alternative options when a prescribed medicine may not be available.

- **Prescription History**  
  Stores prescription records locally so users can access their previous prescriptions even if the original paper prescription is lost or damaged.
  
## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Front-end** | React Native |
| **Back-end** | Node.js with Express.js |
| **OCR Engine** | Llama Vision OCR API |
| **Database** | JSON-based Medical Database (250,000+ medicines) |
| **Storage** | Async Local Storage |
| **AI Chatbot** | Custom-trained NLP Chatbot |

## AI & OCR

The application uses **Llama Vision OCR API** to extract information from handwritten medical prescriptions and convert it into digital text.

A **custom-trained NLP chatbot** is also integrated into the application, allowing users to ask medicine-related questions and receive relevant responses.

## Problem Statement

Patients frequently struggle to interpret handwritten prescriptions because of illegible handwriting. This can result in confusion regarding medication names, dosage instructions, and potential side effects.

Additionally, paper prescriptions can easily be lost or damaged, making it difficult for patients to maintain a reliable record of their medical history.

## Proposed Solution

The proposed application combines **AI, OCR, image processing, and a digital prescription management system** to provide a more accessible and organized way of managing medical prescriptions.

Users can digitize handwritten prescriptions, obtain medication information, ask medicine-related questions through the AI chatbot, and maintain their prescription history digitally.
