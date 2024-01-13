# Meet Lua Expressions on AOS

## Step 1: Open the AOS Command-Line Interface

- After installing AOS, open your command-line interface (CLI).
- Type `aos` and press Enter. This will start the AOS CLI.

## Step 2: Familiarize with Basic Lua Expressions

- **Print a String**: Type `"Hello, aos!"` and press Enter. This should display "Hello, aos!" in the console.
- **Basic Arithmetic**: Try some basic arithmetic, like `5 + 3`. You should see the result `8`.

## Step 3: Learn About Variables

- **Setting a Variable**: Type `a = 10` and press Enter. This sets the variable `a` to 10.
- **Using the Variable**: Now type `a * 2`. You should get `20`, which is the result of multiplying `a` by 2.

## Step 4: Experiment with Conditional Statements

- **Basic If-Else**: Enter the following Lua code:

  In aos, type `.editor` and press Enter. This will open an in-line text editor within your command-line interface.

  ```lua
  b = 15
  if b > 10 then
      return "b is greater than 10"
  else
      return "b is not greater than 10"
  end
  ```

  Then, type `.done` and press Enter. This will complete the edit mode and submit the expression to your Process for evaluation.

  As a result, you should get "b is greater than 10".

## Step 5: Explore Functions

- **Creating a Function**: Define a simple function:

  In aos, type `.editor` and press Enter. This will open an in-line text editor within your command-line interface.

  ```lua
  function greet(name)
      return "Hello, " .. name
  end
  ```

  Then, type `.done` and press Enter. This will complete the edit mode and submit the expression to your Process for evaluation.

- **Using the Function**: Call the function with `greet("aos User")`. It should return "Hello, aos User".

## Step 6: Try Table Operations

- **Creating a Table**: Type `myTable = {1, 2, 3}` to create a simple table.
- **Accessing Table Elements**: Access an element with `myTable[2]`. It should return `2`.

## Conclusion

This tutorial provided you with basic steps to get started with Lua expressions in AOS. As you become more comfortable, you can delve into more complex topics and explore the full potential of Lua in the AOS environment. Happy coding!
