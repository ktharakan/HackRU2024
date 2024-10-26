import requests
from canvasapi import Canvas

# Canvas API URL and API key
API_URL = "https://canvas.instructure.com"
API_KEY = " "

canvas = Canvas(API_URL, API_KEY)

# Example function to get files for a specific course
def get_files_for_course(course_id):
    try:
        course = canvas.get_course(course_id)
        files = list(course.get_files())  # Convert to list for compatibility with len()
        for file in files:
            print(f"File ID: {file.id}, Name: {file.display_name}")
        print(f"Successfully retrieved {len(files)} files for course: {course.course_code}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


def get_files_for_course(course_id):
    try:
        course = canvas.get_course(course_id)
        files = list(course.get_files())  # Convert to list for compatibility with len()
        for file in files:
            print(f"File ID: {file.id}, Name: {file.display_name}")
        print(f"Successfully retrieved {len(files)} files for course: {course.course_code}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


# Example usage to get all courses
try:
    all_courses = list(canvas.get_courses(per_page=100))
    for course in all_courses:
        get_files_for_course(course.id)
except Exception as e:
    print(f"Error listing courses: {str(e)}")

