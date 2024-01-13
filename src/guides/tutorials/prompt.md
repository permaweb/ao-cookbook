# Customizing the Prompt in aos

## Step 1: Open aos and Start the Editor

- Launch the aos command-line interface.
- Enter `.editor` to open the inline text editor.

## Step 2: Write the Custom Prompt Function

- In the editor, define your custom prompt function. For example:
  ```lua
  function customPrompt()
      return "YourName@aos> "
  end
  ```
  Customize `"YourName@aos> "` to your preferred prompt text.

## Step 3: Overwrite the Default Prompt

- Next, overwrite the existing `Prompt` function with your new function:
  ```lua
  Prompt = customPrompt
  ```

## Step 4: Exit and Run Your Code

- To exit the editor and execute your code, type `.done` and then press Enter.
- Your aos prompt should now display the new custom format.

## Step 5: Save for Future Use (Optional)

- If you wish to use this prompt in future aos sessions, save your script in a Lua file.
- In subsequent sessions, load this script to apply your custom prompt.

## Additional Guidance:

- **Creativity in Prompt Design**: You're encouraged to incorporate various elements into your prompt, including dynamic data, special symbols, or colors.
- **Syntax Accuracy**: Ensure correct Lua syntax to avoid any errors in your prompt.
- **Reverting Back**: To return to the original prompt, restart aos or reset `Prompt` to its default function.

## Conclusion

This tutorial guides you through customizing your aos prompt, enhancing your command-line interface experience. Experiment with different styles and functionalities to create a prompt that best fits your needs in the aos environment.
