const frontendExamData = [
    {
        examId: "BE101",
        title: "Node Js BackEnd Basics",
        duration: "45 minutes",
        totalQuestions: 5,
        questions: [
            {
                questionId: "q1",
                questionText: "What is Node js used for?",
                options: [
                    { optionId: "o1", text: "Node js is an open-source, cross-platform for server-side applications" },
                    { optionId: "o2", text: "Node js is for frontend development" },
                    { optionId: "o3", text: "Node js is used for backend development" },
                    { optionId: "o4", text: "Node js is a javascript libary for IOT applications" }
                ],
                correctOptionId: "o1",
                difficulty: "Easy"
            },
            {
                questionId: "q2",
                questionText: "What are the key features of Node.js",
                options: [
                    { optionId: "o1", text: "Asynchronous and Event-Driven" },
                    { optionId: "o2", text: "Fast Execution" },
                    { optionId: "o3", text: "Single Threaded" },
                    { optionId: "o4", text: "All of the above" }
                ],
                correctOptionId: "o4",
                difficulty: "Easy"
            },
            {
                questionId: "q3",
                questionText: "What is the difference between Node.js and JavaScript?",
                options: [
                    { optionId: "o1", text: "JavaScript is a programming language that runs in the browser" },
                    { optionId: "o2", text: "tNode.js is a runtime environment" },
                    { optionId: "o3", text: "both a and b" },
                    { optionId: "o4", text: "non of the above" }
                ],
                correctOptionId: "o3",
                difficulty: "Medium"
            },
            {
                questionId: "q4",
                questionText: "What is the purpose of require in Node.js?",
                options: [
                    { optionId: "o1", text: "require is a function used to include modules" },
                    { optionId: "o2", text: "Equality of value and type" },
                    { optionId: "o3", text: "Equality of objects" },
                    { optionId: "o4", text: "None of the above" }
                ],
                correctOptionId: "o1",
                difficulty: "Medium"
            },
            {
                questionId: "q5",
                questionText: "What is npm?",
                options: [
                    { optionId: "o1", text: "npm stands for Node Package Manager" },
                    { optionId: "o2", text: "Managing dependencies for Node.js applications" },
                    { optionId: "o3", text: "Sharing and reusing code as packages" },
                    { optionId: "o4", text: "all of the above" }
                ],
                correctOptionId: "o4",
                difficulty: "Easy"
            }
        ]
    },
    {
        examId: "BE102",
        title: "Backend Development",
        duration: "30 minutes",
        totalQuestions: 5,
        questions: [
            {
                questionId: "q1",
                questionText: "What are modules in Node.js?",
                options: [
                    { optionId: "o1", text: "Modules are reusable blocks of code in Node.js" },
                    { optionId: "o2", text: "Core Modules" },
                    { optionId: "o3", text: "Local Modules" },
                    { optionId: "o4", text: "all of the above" }
                ],
                correctOptionId: "o4",
                difficulty: "Easy"
            },
            {
                questionId: "q2",
                questionText: "What is the event loop in Node.js?",
                options: [
                    { optionId: "o1", text: "The event loop is a mechanism in Node.js that handles asynchronous operations." },
                    { optionId: "o2", text: "To apply styles conditionally based on device properties" },
                    { optionId: "o3", text: "To debug CSS styles" },
                    { optionId: "o4", text: "To set the screen resolution" }
                ],
                correctOptionId: "o1",
                difficulty: "Medium"
            },
            {
                questionId: "q3",
                questionText: "What is middleware in Node.js?",
                options: [
                    { optionId: "o1", text: "Modify the request and response objects" },
                    { optionId: "o2", text: "End the request-response cycle." },
                    { optionId: "o3", text: "Call the next middleware in the stack." },
                    { optionId: "o4", text: "all of the above" }
                ],
                correctOptionId: "o4",
                difficulty: "Medium"
            },
            {
                questionId: "q4",
                questionText: "What are streams in Node.js?",
                options: [
                    { optionId: "o1", text: "Readable: For reading data." },
                    { optionId: "o2", text: "Foundation" },
                    { optionId: "o3", text: "Bulma" },
                    { optionId: "o4", text: "All of the above" }
                ],
                correctOptionId: "o1",
                difficulty: "Easy"
            },
            {
                questionId: "q5",
                questionText: "How do you handle errors in Node.js?",
                options: [
                    { optionId: "o1", text: "Try-Catch Blocks" },
                    { optionId: "o2", text: "console.error" },
                    { optionId: "o3", text: "order" },
                    { optionId: "o4", text: "index" }
                ],
                correctOptionId: "o1",
                difficulty: "Medium"
            }
        ]
    },


    {
        examId: "BE103",
        title: "Backend development",
        duration: "30 minutes",
        totalQuestions: 5,
        questions: [
            {
                questionId: "q1",
                questionText: "What is the purpose of buffer in Node.js?",
                options: [
                    { optionId: "o1", text: "The Buffer class is used to handle binary data." },
                    { optionId: "o2", text: "The Buffer class is used to handle mono data." },
                    { optionId: "o3", text: "The Buffer class is used to handle triple data." },
                    { optionId: "o4", text: "background" }
                ],
                correctOptionId: "o1",
                difficulty: "Easy"
            },
            {
                questionId: "q2",
                questionText: "What is clustering in Node.js?",
                options: [
                    { optionId: "o1", text: "Clustering allows a Node.js application to scale by creating child processes" },
                    { optionId: "o2", text: "To apply styles conditionally based on device properties" },
                    { optionId: "o3", text: "To debug CSS styles" },
                    { optionId: "o4", text: "To set the screen resolution" }
                ],
                correctOptionId: "o2",
                difficulty: "Medium"
            },
            {
                questionId: "q3",
                questionText: "What does 'flex: 1' mean in CSS Flexbox?",
                options: [
                    { optionId: "o1", text: "The element takes all available space" },
                    { optionId: "o2", text: "The element shrinks if necessary" },
                    { optionId: "o3", text: "The element grows to fill available space proportionally" },
                    { optionId: "o4", text: "The element remains static" }
                ],
                correctOptionId: "o3",
                difficulty: "Medium"
            },
            {
                questionId: "q4",
                questionText: "What are streams in Node.js?",
                options: [
                    { optionId: "o1", text: "Readable: For reading data." },
                    { optionId: "o2", text: "Foundation" },
                    { optionId: "o3", text: "Bulma" },
                    { optionId: "o4", text: "All of the above" }
                ],
                correctOptionId: "o1",
                difficulty: "Easy"
            },
            {
                questionId: "q5",
                questionText: "How do you handle errors in Node.js?",
                options: [
                    { optionId: "o1", text: "Try-Catch Blocks" },
                    { optionId: "o2", text: "console.error" },
                    { optionId: "o3", text: "order" },
                    { optionId: "o4", text: "index" }
                ],
                correctOptionId: "o1",
                difficulty: "Medium"
            }
        ]
    },


   
];

export default frontendExamData;
