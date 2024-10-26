import requests
from canvasapi import Canvas
import dotenv


# Canvas API URL and API key
API_URL = "https://canvas.instructure.com"
API_KEY = " "


canvas = Canvas(API_URL, API_KEY)


#Function to download a file's content from a URL
# def download_file_content(file_url):
#     response = requests.get(file_url)
#     response.raise_for_status()  # Check for successful response
#     return response.content

# # Get all of the active courses a user is currently enrolled in
# courses =canvas.get_courses(enrollment_state='active')  # Updated to use user object
# print(courses)


try:
    course = canvas.get_course(69480000000290213)
    files = course.get_files() 
    for file in files:
        print(f"File ID: {file.id}, Name: {file.display_name}")
    print(f"Successfully retrieved {len(files)} files for course: {course.name}")
except Exception as e:
    print(f"An error occurred: {str(e)}")

# List accessible courses
print("\nListing accessible courses:")
try:
    courses = canvas.get_courses()
    for course in courses:
        print(f"Course ID: {course.id}, Name: {course.name}")
except Exception as e:
    print(f"Error listing courses: {str(e)}")

# Function to retrieve all courses
def get_all_courses():
    all_courses = []
    page = 1

    while True:  # Infinite loop to retrieve all courses
        courses = canvas.get_courses(per_page=100, page=page)  # Adjust per_page as needed
        if not courses:
            break
        all_courses.extend(courses)  # Add all courses without limit
        page += 1

    return all_courses

# Example usage to get all courses
try:
    all_courses = get_all_courses()
    for course in all_courses:
        print(f"Course ID: {course.id}, Name: {course.name}")
except Exception as e:
    print(f"Error listing courses: {str(e)}")
