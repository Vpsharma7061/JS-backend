Task 1: Form Submission with Manual Validation
Prevent Default Action: Prevents the default form submission to validate inputs manually.
Get Inputs and Messages: Fetches user input values and message elements.
Clear Messages: Resets any old validation messages.
Validate: Checks each input field (username, email, password, confirm password) for validity and shows error messages if necessary.
Save Data: If all checks pass, saves user data to localStorage, displays a success message, and clears the form.

Task 2: Infinite Scroll with Pagination for Fetching Posts
Initialize: Set up container and loader elements, and define pagination settings.
Fetch and Display: Fetch posts from the API and display them, showing a loader during the fetch.
Infinite Scroll: Automatically loads more posts when scrolled near the bottom, incrementing the page number.
Initial Load: Fetches and displays the first set of posts when the page loads.

Task 3: Product Filtering by Category and Search Term
Fetch Products: The getProducts() function fetches product data from an API and stores it in a variable called allProducts.
Display Products: The displayProducts() function displays the products on the page by creating HTML elements for each product (title, price, image, etc.).
Load Categories for Filter: The loadCategories() function extracts unique product categories and populates a dropdown filter.
Filter Products: The filterProducts() function filters products based on the search bar's input and selected category in the dropdown.
Show Suggestions: The showSuggestions() function shows category suggestions based on user input in the search bar, allowing the user to click and apply a filter.
User Interaction: The search bar and category dropdown listen for changes, filtering products accordingly.
Display Filtered Results: Displays the filtered results on the page. If no products match, it shows a message: "No products found."

Task 4: Dynamic Collapsible Menu Generation
Fetch Data: Get the menu data from a menuData.json file.
Generate Menu: The createMenu() function dynamically generates menu list items and submenus.
Handle Submenu Toggle: Click events on parent items toggle the visibility of submenus.
Display Menu: Appends the dynamically generated HTML to the menuList element.


Task 5: Todo List with Add, Edit, Delete, and Clear All
Initial Setup:
Get the necessary elements (input box, buttons, and list container).
On page load, try to get stored tasks from localStorage. If no tasks exist, start with an empty list.
Displaying Todos:
The showTodos() function is responsible for rendering the to-do list. It loops through the tasks and displays them with text, the date/time they were added, and buttons for editing and deleting.
Adding a Todo:
When the user enters a task and clicks "Add", the addTodo() function is triggered. It checks if the input is valid, adds the new task with the current date/time to the todos array, and saves it to localStorage.
Editing a Todo:
When the "Edit" button is clicked, the editTodo() function prompts the user to edit the task. If the new text is valid, the task is updated with the new text and the current date/time.
Deleting a Todo:
When the "Delete" button is clicked, the deleteTodo() function removes the task from the todos array using its index and saves the updated list to localStorage.
Clearing All Todos:
The "Clear All" button calls the clearAll() function, which empties the todos array and clears localStorage. The page is re-rendered to reflect that there are no tasks left.
Event Listeners:
Listeners are set up for adding a new task when the "Add" button is clicked and clearing all tasks when the "Clear All" button is clicked.
