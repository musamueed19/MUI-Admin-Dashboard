The Ducks pattern is a modular approach to folder structure that organizes code by feature rather than by file type (actions, reducers, constants). The core idea is that "things that change together should stay together," making large, scalable applications easier to maintain. 
Core Principles
The original "ducks" proposal outlined several rules for a file to be considered a "duck": 
MUST export a function named reducer() as the default export.
MUST export its action creators as functions.
MUST have action types in the format npm-module-or-app/reducer/ACTION_TYPE to ensure global uniqueness.
MAY export action types as UPPER_SNAKE_CASE constants if an external reducer needs to listen for them. 
Typical Folder Structure
In a typical implementation, you move away from top-level actions/ and reducers/ folders. Instead, you have a high-level features/ or modules/ directory, with a dedicated folder for each feature, which is the "duck" itself. 
src/
|
├── app/
| ├── store.js # Central store setup, combining all feature reducers
| └── App.js 
|
├── features/ # Directory for all "ducks" (features)
| ├── user/
| | ├── userSlice.js # This file contains all user-related logic (actions, reducer, initial state)
| | ├── UserProfile.jsx # Components related to the feature
| | └── index.js # Exports relevant items for use elsewhere
| |
| └── products/
| ├── productsSlice.js # All product-related logic
| └── ProductsPage.jsx # Components related to the feature 
|
└── shared/ # Common components, utilities, or helpers used across features
├── Button.jsx
└── utils.js 

### Key Characteristics

*   **Colocation:** All Redux logic (actions, types, and the reducer) for a single feature is defined within a single file or folder.
*   **Modularity:** Each "duck" is a self-contained module, making features easy to add, remove, or even turn into reusable libraries.
*   **Scalability:** This structure helps manage the complexity of large applications by reducing the need to hunt for related files across multiple top-level directories.

This pattern is very similar to the "slices" approach recommended by [Redux Tool