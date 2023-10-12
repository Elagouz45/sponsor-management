Step 1: Project Setup
Set up an Angular Project: Create a new Angular project using the Angular CLI.
Step 2: Design the User Interface
Design the UI: Create the user interface for displaying leads and potential duplicates. Utilize Angular Material
components for a clean and responsive design. Define the layout, tables, and any interactive elements.
Step 3: Create Angular Components
Create Components: Develop Angular components for displaying leads and handling lead management operations.
Step 4: Set Up Services
Set Up Services: Create Angular services to interact with the Autovance Leads API. Implement methods for retrieving lead
data, identifying potential duplicates, and marking duplicates.
Step 5: Fetch and Display Leads
Fetch and Display Leads: In lead list component,I used the service to fetch and display the list of leads. Bind the
retrieved data to the HTML template.
Step 6: Identify Potential Duplicates
Identify Potential Duplicates: For each lead in the list, utilize the service to fetch potential duplicates associated
with that lead. Display this information in the Collapsed Table.
Step 7: Mark Duplicates
Mark Duplicates: Implement a mechanism in my Collapsed Table ( Button) that allows sales staff to select potential
duplicates and mark them as actual duplicates. Use the service to send PUT requests to the Autovance Leads API to update
the duplicate_of field.
Step 8: Error Handling
Error Handling: Implement error handling to gracefully handle scenarios such as lead not found or API request failures.
Provide appropriate error messages or feedback to the user.
Step 9: Styling
Styling: Apply styles using SCSS or CSS to ensure a visually appealing and consistent user interface. Use Angular
Material's theming and components for a modern look.
