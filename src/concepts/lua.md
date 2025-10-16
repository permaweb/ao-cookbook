# A whistle stop tour of Lua.

Before we can explore ao in greater depth, let's take a moment to learn the basics of Lua: your companion for commanding aos processes.

Lua is a simple language with few surprises. If you know Javascript, it will feel like a simplified, purer version. If you are learning from-scratch, it will seem like a tiny language that focuses on the important stuff: Clean computation with sane syntax.

In this section we will cover the basics of Lua in just a few minutes. If you already know Lua, jump right through to the [next chapter]()

## Jumping back into your aos process.

For the purpose of this tutorial, we will be assuming that you have already completed the [Welcome & Quick Start](/welcome/) guide. If not, complete that first.

If you logged out of your process, you can always re-open it by running `aos` on your command line, optionally specifying your key file with `--wallet [location]`.

## Basic Lua expressions.

In the remainder of this primer we will quickly run through Lua's core features and syntax.

Try out on the examples on your aos process as you go, or skip them if they are intuitive to you.

- **Basic arithmetic**: Try some basic arithmetic, like `5 + 3`. After processing, you will see the result `8`. `+`, `-`, `*`, `/`, and `^` all work as you might expect. `%` is the symbol that Lua uses for modulus.
- **Setting variables**: Type `a = 10` and press enter. This sets the variable `a` to 10. By convention (not enforced by the language), global variables start with a capital letter in Lua (for example `Handlers`).

- **Using variables**: Now type `a * 2`. You will see `20` returned on the command line.
- **String concatenation**: Say hello to yourself by executing `"Hello, " .. ao.id`.

::: info
Note that while global variables conventionally start with a capital letter in Lua, this is not enforced by the language. For example, the `ao` module is a global variable that was intentionally lowercased for stylistic purposes.
:::

## Experimenting with conditional statements.

- **If-Else**: Like most programming languages, Lua uses if-else blocks to conditionally execute code.

  In your aos process, type `.editor` and press enter. This will open an in-line text editor within your command-line interface.

  ```lua
  aos_coolness = 9001
  if aos_coolness > 9000 then
      return "aos has a coolness level over 9000!"
  else
      return "Oh. 🤷"
  end
  ```

  Once you are finished editing on your terminal, type `.done` on a new line and press enter. This will terminate edit mode and submit the expression to your process for evaluation.

  As a result, you will see that aos coolness is >9,000 cool. Good to know.

  `if` statements in Lua can also have additional `elseif [condition] then` blocks, making conditional execution hierarchies easier.

## Looping in Lua.

There are a few different ways to loop in your code in Lua. Here are our favorites:

- **While loops**:

  Start by initializing your counter to zero by typing `n = 0` and pressing enter.

  Then open the inline editor again with `.editor` .

  ```lua
  while n < 5 do
    n = n + 1
  end
  ```

  Type `.done` on a new line to execute the while loop. You can check the result of the loop by simply running `n`.

- **For loops**:

  Lua can also execute python-style `for` loops between a set of values. For example, use the `.editor` to enter the following code block:

  ```lua
  for m = 1, 100 do
          n = n + m
  end
  ```

  Request the new value of the variable by running `n` again.

## Getting functional.

- **Define a function**:

  Using the `.editor` once again, submit the following lines:

  ```lua
  function greeting(name)
      return "Hello, " .. name
  end
  ```

  Lua also has 'anonymous' or 'higher order' functions. These essentially allow you to use functions themselves as if they are normal data -- to be passed as arguments to other functions, etc. The following example defines an anonymous function and is equivalent to the above:

  ```lua
  greeting =
  		function(name)
      	return "Hello, " .. name
  		end
  ```

- **Calling the function**: Call the function with `greeting("Earthling")`. aos will return `"Hello, Earthling"`.

::: info
Handlers in ao commonly utilize anonymous functions. When using `Handlers.add()`, the third argument is an anonymous function in the form `function(msg) ... end`. This is a key pattern you'll see frequently when working with ao processes.

:::

## Defining deep objects with tables.

Tables are Lua's only compound data structure. They map `keys` to `values`, but can also be used like traditional arrays.

- **Create a simple table**: Type `ao_is = {"hyper", "parallel", "compute"}`to create a simple table.
- **Accessing the table's elements**: Access an element with `ao_is[2]`. aos will return `parallel`. Note: Indices in Lua start from 1!
- **Count a table's elements**: The size of a table in Lua is found with the operator `#`. For example, running `#ao_is` will return `3`.
- **Set a named element**: Type `ao_is["cool"] = true` to add a new named key to the table. Named elements can also be accessed with the `.` operator (e.g. `ao_is.cool`), but only if the key is a valid identifier - for other keys like `"my key"`, use brackets.

## Lua Wats.

aos uses Lua because it is a simple, clean language that most experienced programmers can learn very quickly, and is an increasingly popular first programming language, too, thanks to its use in video games like Roblox.

Nonetheless, there are a few things about the language that are prone to trip up rookie Lua builders. Tastes may vary, but here is our exhaustive list of Lua [wat](https://www.destroyallsoftware.com/talks/wat)s:

- **Remember:** Table indexing starts from 1 not 0!
- **Remember:** 'Not equals' is expressed with `~=`, rather than `!=` or similar.
- **Remember:** Objects in Lua are called 'tables', rather than their more common names.

## Let's go!

With this in mind, you now know everything you need in order to build awesome decentralized processes with Lua! In the next chapter we will begin to build parallel processes with Lua and aos.
