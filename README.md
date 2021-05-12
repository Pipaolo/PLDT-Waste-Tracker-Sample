This is a website that support server side rendering and has it's own working API Backend. 

**Powered by NextJS.**
## Getting Started
Run the development Server

```bash
npm run dev
# or
yarn dev
```

## Routes

| Route Path                                             | Method | Description                                         | Data                                                                                |
| ------------------------------------------------------ | ------ | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| localhost:3000/wastes                                  | GET    | Gets all the stored waste data                      | N/A                                                                                 |
| localhost:3000/wastes?phoneNumber={INSERT_PHONENUMBER} | GET    | Gets the wastes data of a single user               | N/A                                                                                 |
| localhost:3000/wastes                                  | POST   | Creates and Updates the waste data of a single user | ```json{"phoneNumber": string, "batteries": int, "phones": int,  "chargers":int}``` |
   

   
