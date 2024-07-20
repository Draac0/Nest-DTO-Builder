# Nest DTO Builder



Nest DTO Builder is a powerful tool for developers to effortlessly convert JSON objects into NestJS DTO (Data Transfer Object) classes. This tool not only generates the basic structure but also includes additional options like class validators and Swagger annotations, making it easier for developers to ensure data validation and API documentation.

## Live site
[Nest dto builder live site](https://nest-dto-builder.vercel.app/)

## Features



- **JSON to NestJS DTO Conversion**: Convert JSON objects into well-structured NestJS DTO classes.

- **Class Validators**: Option to add class validators for automatic data validation.

- **Swagger Annotations**: Option to add Swagger annotations for better API documentation.

- **Case Conversion**: Supports various case conversions including camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE.

- **Copy to Clipboard**: Easily copy the generated DTO classes to your clipboard.

- **Snackbar Notifications**: Provides user feedback with notifications.



## Getting Started



### Prerequisites



- Node.js

- npm or yarn



### Installation



1. **Clone the repository**:

    ```bash
    
    git clone https://github.com/Draac0/Nest-DTO-Builder.git
    
    cd nest-dto-builder
    
    ```



2. **Install dependencies**:

    ```bash
    
    npm install
    
    # or
    
    yarn install
    
    ```



3. **Run the development server**:

    ```bash
    
    npm run dev
    
    # or
    
    yarn dev
    
    ```



4. **Open the application**:

    Open [http://localhost:3000](http://localhost:3000) in your browser.



## Usage



1. **Enter JSON**: Paste your JSON object into the input field.

2. **Class Name**: Provide a class name for your DTO.

3. **Options**: Select additional options like adding class validators, Swagger annotations, and choosing the case format.

4. **Convert**: Click the "Convert" button to generate the DTO class.

5. **Copy**: Use the "Copy" button next to each generated class to copy it to your clipboard. A notification will confirm the action.



## Directory Structure



```

app/

 |_ favicon.ico

 |_ globals.css

 |_ layout.tsx

 |_ page.tsx

public/

 |_ favicon.ico

 |_ nest-dto-builder.ico

utils/

 |_ formatCode.ts

 |_ jsonToNestJsDto.ts

```



## Future Scope



- **Support for More Annotations**: Add support for additional annotations and decorators.

- **Extended Case Options**: Include more case transformation options.

- **Improved UI/UX**: Enhance the user interface and experience.

- **Customization Options**: Allow users to customize the generated DTO classes further.

- **API Integration**: Provide an API for automated DTO generation.



## Contributing



We welcome contributions from the community. To contribute:



1. **Fork the repository**.

2. **Create a new branch**:

    ```bash
    
    git checkout -b feature-branch
    
    ```

3. **Make your changes**.

4. **Commit your changes**:

    ```bash
    
    git commit -m 'Add some feature'
    
    ```

5. **Push to the branch**:

    ```bash
    
    git push origin feature-branch
    
    ```

6. **Open a pull request**.



## License



This project is licensed under the MIT License - see the [LICENSE](https://github.com/Draac0/Nest-DTO-Builder/blob/main/LICENSE) file for details.



## Acknowledgements



- Special thanks to the contributors and the open-source community for their continuous support and contributions.



## Contact



For any queries or feedback, please reach out to us at [asriram098@gmail.com](mailto:asriram098@gmail.com).



---



Thank you for using Nest DTO Builder! We hope it makes your development process smoother and more efficient.



---



